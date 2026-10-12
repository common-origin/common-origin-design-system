/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process'
import semantic from './semantic/index.json'
import component from './component/index.json'
import valueAllowlist from './descriptionValues.allowlist.json'

// Deprecation is data, not prose (decision 0033, #200): a deprecated token has a DTCG
// `$deprecated` string saying why, and `$extensions["studio.commonorigin"].replacedBy` when one
// token replaces it. Descriptions say when to use a token, without values.

type Node = { [key: string]: unknown }
type Token = {
  path: string
  $description?: unknown
  $deprecated?: unknown
  $extensions?: { 'studio.commonorigin'?: { replacedBy?: unknown } }
}

function tokens(node: Node, path: string[] = []): Token[] {
  return Object.entries(node)
    .filter(([key, child]) => !key.startsWith('$') && child && typeof child === 'object')
    .flatMap(([key, child]) =>
      '$value' in (child as Node)
        ? [{ path: [...path, key].join('.'), ...(child as Omit<Token, 'path'>) }]
        : tokens(child as Node, [...path, key])
    )
}

const all = [...tokens(semantic as Node), ...tokens(component as Node)]
const byPath = new Map(all.map((token) => [token.path, token]))
const deprecated = all.filter((token) => token.$deprecated !== undefined)
const replacedBy = (token: Token) => token.$extensions?.['studio.commonorigin']?.replacedBy

describe('deprecated tokens (decision 0033)', () => {
  it('finds the deprecated tokens', () => {
    expect(deprecated.length).toBeGreaterThan(0)
  })

  it('mark deprecation with $deprecated, not a "Deprecated" description', () => {
    const prose = all.filter((token) => /^deprecated/i.test(String(token.$description ?? ''))).map((token) => token.path)
    expect(prose).toEqual([])
  })

  it('say why in a non-empty $deprecated string', () => {
    const problems = deprecated
      .filter((token) => typeof token.$deprecated !== 'string' || !token.$deprecated.trim())
      .map((token) => token.path)
    expect(problems).toEqual([])
  })

  it('point replacedBy at a token that exists and is not itself deprecated', () => {
    const problems = all.flatMap((token) => {
      const target = replacedBy(token)
      if (target === undefined) return []
      if (token.$deprecated === undefined) return [`${token.path}: replacedBy on a token that isn't deprecated`]
      const replacement = typeof target === 'string' ? byPath.get(target) : undefined
      if (!replacement) return [`${token.path}: replacedBy ${String(target)} doesn't exist`]
      if (replacement.$deprecated !== undefined) return [`${token.path}: replacedBy ${target} is deprecated`]
      return []
    })
    expect(problems).toEqual([])
  })
})

// Only these deprecated tokens are deliberately still read, listed by exact path with the reason:
// Button's `emphasis` variant aliases the accent tokens until 3.0 (decision 0016).
const STILL_READ = [/^component\.button\.variants\.emphasis\./]

describe('deprecated tokens are not read', () => {
  // Matches dotted paths in source text, so a read through a destructured or aliased object
  // (`const { count } = badge`, then `count.paddingX`) isn't caught. Read tokens by full path.
  it('by components, patterns, tests or the docs site', () => {
    // Match the path after its tier and component group (`button.sizes.small.padding`,
    // `color.category.blue-emphasis`) or in full, excluding only the token sources and builds.
    // Tests are included, so none asserts a token that 3.0 removes. No `\b`: macOS's regex lacks it.
    const retired = deprecated
      .map((token) => token.path)
      .filter((path) => !STILL_READ.some((pattern) => pattern.test(path)))
      .map((path) => path.replace(/^(component|semantic)\./, ''))
    const pattern = retired.map((path) => path.replace(/[.-]/g, (c) => `\\${c}`)).join('|')
    let hits = ''
    try {
      hits = execFileSync(
        'git',
        ['grep', '-nE', `(${pattern})([^A-Za-z0-9_-]|$)`, '--', 'src', 'pages', ':!src/tokens', ':!src/styles'],
        { encoding: 'utf8' }
      )
    } catch (error) {
      // git grep exits 1 when nothing matches; anything else is a real failure
      if ((error as { status?: number }).status !== 1) throw error
    }
    expect(hits.trim().split('\n').filter(Boolean)).toEqual([])
  })
})

// A description names the token's job, never its value: values change, the job shouldn't.
// The tokens on the allowlist predate the rule; #189 rewrites them until the list is empty.
const VALUE = /#[0-9a-fA-F]{3,8}\b|\b\d*\.?\d+(px|rem)\b|Approved under/

describe('descriptions of tokens in use', () => {
  const offending = all
    .filter((token) => token.$deprecated === undefined && VALUE.test(String(token.$description ?? '')))
    .map((token) => token.path)

  it('contain no hex, px or rem values and no "Approved under", outside the allowlist', () => {
    expect(offending.filter((path) => !valueAllowlist.includes(path))).toEqual([])
  })

  it('keep the allowlist current: every entry still exists and still breaks the rule', () => {
    expect(valueAllowlist.filter((path) => !offending.includes(path))).toEqual([])
  })
})
