/**
 * @jest-environment node
 */
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'
import resolver from './resolver.json'

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

// What each mode may change (0032's table, narrowed for density by #191: controls only)
const ALLOWED: Record<string, RegExp> = {
  density: /^semantic\.(size\.control|space\.inset)\./,
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
  const control = (context: string, step: string) => {
    const name = `--co-semantic-size-control-${step}`
    return rem(resolve(`var(${name})`, context === 'default' ? new Map() : block('density', context)))
  }

  it('shifts control heights one 8px step per context (decision 0034)', () => {
    expect(['sm', 'md', 'lg'].map((step) => control('compact', step))).toEqual([24, 32, 40])
    expect(['sm', 'md', 'lg'].map((step) => control('default', step))).toEqual([32, 40, 48])
    expect(['sm', 'md', 'lg'].map((step) => control('comfortable', step))).toEqual([40, 48, 56])
  })

  it('keeps every compact control at least 24px, the WCAG 2.5.8 minimum target', () => {
    expect(Math.min(...['sm', 'md', 'lg'].map((step) => control('compact', step)))).toBeGreaterThanOrEqual(24)
  })
})
