/**
 * @jest-environment node
 */
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import resolver from './resolver.json'
import { contrastRatio } from '../test-utils/contrast'

// Token modes (decision 0032): src/tokens/resolver.json describes them as DTCG Resolver modifiers,
// and the token build writes a [data-co-<mode>="<context>"] block into tokens.css for each context.

const css = readFileSync(join(__dirname, '../styles/tokens.css'), 'utf8')
const declarations = (text: string) =>
  new Map([...text.matchAll(/^\s*(--[a-z0-9-]+):\s*(.*?);(?:\s*\/\*\*.*\*\/)?\s*$/gm)].map((m) => [m[1], m[2]]))
const root = declarations(css.split('/* Mode:')[0])
const block = (mode: string, context: string) => {
  const match = css.match(new RegExp(`\\[data-co-${mode}="${context}"\\] \\{([\\s\\S]*?)\\n\\}`))
  if (!match) throw new Error(`no [data-co-${mode}="${context}"] block in tokens.css`)
  return declarations(match[1])
}

// A variable's value with every var() replaced, reading `overrides` before the :root block
function resolve(value: string, overrides = new Map<string, string>(), seen: string[] = []): string {
  return value.replace(/var\((--[a-z0-9-]+)\)/g, (_, name: string) => {
    if (seen.includes(name)) throw new Error(`circular reference: ${[...seen, name].join(' -> ')}`)
    const target = overrides.get(name) ?? root.get(name)
    if (target === undefined) throw new Error(`undefined variable ${name}`)
    return resolve(target, overrides, [...seen, name])
  })
}

const rem = (value: string) => Number(value.replace('rem', '')) * 16

// What each mode may change (0032's table, narrowed for density by #191 to controls, then rows by 0051)
const ALLOWED: Record<string, RegExp> = {
  density: /^semantic\.(size\.control|size\.row|space\.inset)\./,
  // Colour and shadow only (decision 0054): base colour values, plus semantic colour exceptions
  theme: /^base\.(color\.|shadow\.|opacity\.scrim$)/,
}

type Node = { [key: string]: unknown }
const overridden = (node: Node, at: string[] = []): string[] =>
  Object.entries(node).flatMap(([key, child]) => {
    if (key.startsWith('$') || !child || typeof child !== 'object') return []
    return '$value' in (child as Node) ? [[...at, key].join('.')] : overridden(child as Node, [...at, key])
  })

describe('the resolver document', () => {
  it('is DTCG Resolver 2025.10 and every $ref it names exists', () => {
    expect(resolver.version).toBe('2025.10')
    const refs = [
      ...Object.values(resolver.sets).flatMap((set) => set.sources),
      ...Object.values(resolver.modifiers).flatMap((modifier) => Object.values(modifier.contexts).flat()),
    ].map((source) => source.$ref)
    expect(refs.filter((ref) => !existsSync(join(__dirname, ref)))).toEqual([])
    for (const { $ref } of resolver.resolutionOrder) {
      const [, kind, name] = $ref.split('/')
      expect((resolver as unknown as Record<string, Record<string, unknown>>)[kind]?.[name]).toBeDefined()
    }
  })
})

describe.each(Object.entries(resolver.modifiers))('the %s mode', (mode, modifier) => {
  const contexts = Object.entries(modifier.contexts as Record<string, { $ref: string }[]>)

  it('overrides only the groups it may change, and never the touch target', () => {
    const paths = contexts.flatMap(([, sources]) =>
      sources.flatMap(({ $ref }) => overridden(JSON.parse(readFileSync(join(__dirname, $ref), 'utf8'))))
    )
    expect(paths.length).toBeGreaterThan(0)
    expect(paths.filter((path) => !ALLOWED[mode].test(path) || path === 'semantic.size.touchTarget')).toEqual([])
  })

  it.each(contexts.map(([context]) => context))('has a block for %s that redeclares exactly what changes', (context) => {
    const overrides = block(mode, context)
    // Everything it redeclares is a real variable
    expect([...overrides.keys()].filter((name) => !root.has(name))).toEqual([])
    // Complete: any variable whose resolved value changes in this context is redeclared in the
    // block, or a region would keep the :root value of an alias (decision 0041)
    if (context !== modifier.default) {
      const stale = [...root.keys()].filter(
        (name) => !overrides.has(name) && resolve(root.get(name) as string, overrides) !== resolve(root.get(name) as string)
      )
      expect(stale).toEqual([])
    }
  })

  // A context nested inside another must override everything the outer one set, or it inherits
  // the outer context's value for tokens it leaves at the default
  it('declares the same variables in every context, so contexts nest', () => {
    const sets = contexts.map(([context]) => [...block(mode, context).keys()].sort().join(' '))
    expect(new Set(sets).size).toBe(1)
  })

  it('resets every redeclared variable to its :root value in the default block', () => {
    const reset = block(mode, modifier.default)
    const others = new Set(contexts.flatMap(([context]) => (context === modifier.default ? [] : [...block(mode, context).keys()])))
    expect([...others].filter((name) => !reset.has(name))).toEqual([])
    expect([...reset].filter(([name, value]) => value !== root.get(name)).map(([name]) => name)).toEqual([])
  })
})

describe('density (#191)', () => {
  const height = (group: string) => (context: string, step: string) => {
    const name = `--co-semantic-size-${group}-${step}`
    return rem(resolve(`var(${name})`, context === 'default' ? new Map() : block('density', context)))
  }
  const control = height('control')
  const row = height('row')

  it('shifts control heights one 8px step per context (decision 0034)', () => {
    expect(['sm', 'md', 'lg'].map((step) => control('compact', step))).toEqual([24, 32, 40])
    expect(['sm', 'md', 'lg'].map((step) => control('default', step))).toEqual([32, 40, 48])
    expect(['sm', 'md', 'lg'].map((step) => control('comfortable', step))).toEqual([40, 48, 56])
  })

  it('keeps every compact control at least 24px, the WCAG 2.5.8 minimum target', () => {
    expect(Math.min(...['sm', 'md', 'lg'].map((step) => control('compact', step)))).toBeGreaterThanOrEqual(24)
  })

  it('shifts row heights per context, keeping today\'s rows at default (decision 0051)', () => {
    expect(['sm', 'md', 'lg'].map((step) => row('compact', step))).toEqual([24, 40, 64])
    expect(['sm', 'md', 'lg'].map((step) => row('default', step))).toEqual([32, 48, 72])
    expect(['sm', 'md', 'lg'].map((step) => row('comfortable', step))).toEqual([40, 56, 80])
  })

  it('keeps every compact row at least 24px on every pointer type (decision 0051)', () => {
    expect(Math.min(...['sm', 'md', 'lg'].map((step) => row('compact', step)))).toBeGreaterThanOrEqual(24)
  })
})

describe('theme (#358)', () => {
  const dark = block('theme', 'dark')
  const hex = (name: string) => resolve(`var(${name})`, dark)
  const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value)
  const luminance = (value: string) => {
    if (!isHex(value)) throw new Error(`not a resolved hex colour: ${value}`)
    const n = parseInt(value.slice(1), 16)
    const c = (v: number) => (v / 255 <= 0.04045 ? v / 255 / 12.92 : ((v / 255 + 0.055) / 1.055) ** 2.4)
    return 0.2126 * c((n >> 16) & 255) + 0.7152 * c((n >> 8) & 255) + 0.0722 * c(n & 255)
  }
  // Throws on anything but two hex colours, so a value the test can't read never passes as NaN
  const contrast = (a: string, b: string) => {
    if (!isHex(a) || !isHex(b)) throw new Error(`not resolved hex colours: ${a}, ${b}`)
    return contrastRatio(a, b)
  }

  it('tells the browser the colour scheme in each context', () => {
    expect(css).toMatch(/\[data-co-theme="light"\] \{\n {2}color-scheme: light;/)
    expect(css).toMatch(/\[data-co-theme="dark"\] \{\n {2}color-scheme: dark;/)
  })

  it('never turns dark by itself: there is no prefers-color-scheme block', () => {
    expect(css).not.toMatch(/@media[^{]*prefers-color-scheme/)
  })

  it('puts primary and secondary text on the dark page and surfaces at 4.5:1 or more', () => {
    for (const surface of ['--co-semantic-surface-base', '--co-semantic-surface-raised']) {
      expect(contrast(hex('--co-semantic-color-text-default'), hex(surface))).toBeGreaterThanOrEqual(4.5)
      expect(contrast(hex('--co-semantic-color-text-muted'), hex(surface))).toBeGreaterThanOrEqual(4.5)
    }
  })

  // color-mix(in srgb, A, B calc(N * 100%)) with resolved hex values, as the state tokens use (0048)
  const mixed = (value: string) => {
    const m = value.match(/^color-mix\(in srgb, (#[0-9a-f]{6}), (#[0-9a-f]{6}) calc\(([\d.]+) \* 100%\)\)$/)
    if (!m) return value
    const [a, b, t] = [m[1], m[2], Number(m[3])]
    const channel = (hexValue: string, i: number) => parseInt(hexValue.slice(1 + i * 2, 3 + i * 2), 16)
    return `#${[0, 1, 2].map((i) => Math.round(channel(a, i) * (1 - t) + channel(b, i) * t).toString(16).padStart(2, '0')).join('')}`
  }

  it('keeps on-fill text at 4.5:1 or more on every coloured fill and its states (#355)', () => {
    const onFill = hex('--co-semantic-color-text-on-fill')
    const fills = ['accent', 'accent-hover', 'accent-pressed', 'danger', 'danger-hover', 'danger-pressed', 'success', 'warning', 'serious']
    const low = fills
      .map((fill) => [fill, contrast(onFill, mixed(hex(`--co-semantic-color-fill-${fill}`)))] as const)
      .filter(([, ratio]) => ratio < 4.5)
    expect(low).toEqual([])
  })

  // One set of rules for both themes (decision 0056): the theme supplies base values only, so
  // semantic and component tokens read the same paths in light and dark
  it('overrides base tokens only, never a semantic or component token', () => {
    const files = (resolver.modifiers.theme.contexts as Record<string, { $ref: string }[]>).dark
    const paths = files.flatMap(({ $ref }) => overridden(JSON.parse(readFileSync(join(__dirname, $ref), 'utf8'))))
    expect(paths.filter((path) => !path.startsWith('base.'))).toEqual([])
  })

  it('keeps inverse text at 4.5:1 or more on the emphasis fill', () => {
    expect(contrast(hex('--co-semantic-color-text-inverse'), hex('--co-semantic-color-fill-emphasis'))).toBeGreaterThanOrEqual(4.5)
  })

  it('layers the dark surfaces: page, then raised, then overlay (#356)', () => {
    const [page, raised, overlay] = ['base', 'raised', 'overlay'].map((s) => luminance(hex(`--co-semantic-surface-${s}`)))
    expect(raised).toBeGreaterThan(page)
    expect(overlay).toBeGreaterThan(raised)
  })

  // Translucent fills sit on whatever surface is below them (decision 0056), so text on them is
  // checked over every surface, in both themes, not only over white
  const over = (fill: string, surface: string) => {
    const m = fill.match(/^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/)
    if (!m) return fill
    const a = Number(m[4])
    const s = [1, 3, 5].map((i) => parseInt(surface.slice(i, i + 2), 16))
    return `#${[1, 2, 3].map((i) => Math.round(a * Number(m[i]) + (1 - a) * s[i - 1]).toString(16).padStart(2, '0')).join('')}`
  }
  const textOnFills: [string, string][] = [
    ...['default', 'muted'].flatMap((text) =>
      ['default', 'default-hover', 'default-pressed', 'muted'].map((fill) => [text, fill] as [string, string])
    ),
    ...['accent', 'danger', 'success', 'warning', 'serious'].map((role) => [role, `${role}-muted`] as [string, string]),
  ]
  it.each(['light', 'dark'])('keeps text at 4.5:1 or more on every translucent fill over every %s surface', (theme) => {
    const value = (name: string) => (theme === 'dark' ? hex(name) : resolve(`var(${name})`))
    const low = ['base', 'raised', 'overlay'].flatMap((surface) => {
      const ground = value(`--co-semantic-surface-${surface}`)
      return textOnFills
        .map(([text, fill]) => {
          const ratio = contrast(value(`--co-semantic-color-text-${text}`), over(value(`--co-semantic-color-fill-${fill}`), ground))
          return [`text.${text} on fill.${fill} over surface.${surface}`, ratio] as const
        })
        .filter(([, ratio]) => ratio < 4.5)
    })
    expect(low).toEqual([])
  })

  it('makes raised surfaces lighter than the dark page (#356)', () => {
    expect(luminance(hex('--co-semantic-surface-raised'))).toBeGreaterThan(luminance(hex('--co-semantic-surface-base')))
  })

  // Density and theme change different groups, so a region can set both, in either order
  it('shares no variable with the density mode', () => {
    const density = new Set(block('density', 'compact').keys())
    expect([...dark.keys()].filter((name) => density.has(name))).toEqual([])
  })
})
