/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process'
import path from 'path'
import ts from 'typescript'
import base from './base/index.json'
import semantic from './semantic/index.json'
import component from './component/index.json'
import grammarMigrationList from './grammarMigration.allowlist.json'
import resolved from '../styles/tokens.json'
import { findTokenReads, projectConfig, ROOT, type TokenRead } from './tokenReads'

// Deprecation is data, not prose (decision 0033, #200): a deprecated token has a DTCG
// `$deprecated` string saying why, and `$extensions["studio.commonorigin"].replacedBy` when one
// token replaces it. Descriptions say when to use a token, without values.

// Empty once every family has migrated (#189); typed so the checks below still compile
const grammarMigration: string[] = grammarMigrationList

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

const all = [...tokens(base as Node), ...tokens(semantic as Node), ...tokens(component as Node)]
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

// The semantic grammar renames (decision 0031, #189) add every new name beside the old one at the
// same value, so the 2.x migration changes nothing visible. No new name may resolve to another
// value than the name it replaces.
describe('grammar renames (decision 0031)', () => {
  const renamed = deprecated.filter((token) => /decision 0031/.test(String(token.$deprecated)))
  const value = (path: string) => path.split('.').reduce<unknown>((node, key) => (node as Node)?.[key], resolved)

  it('finds the renamed tokens', () => {
    expect(renamed.length).toBeGreaterThan(0)
  })

  it('resolve to the same value as their replacement', () => {
    const problems = renamed.flatMap((token) => {
      const target = replacedBy(token)
      if (typeof target !== 'string') return []
      return value(token.path) === value(target) ? [] : [`${token.path} (${String(value(token.path))}) -> ${target} (${String(value(target))})`]
    })
    expect(problems).toEqual([])
  })
})

// Only these deprecated tokens are deliberately still read, listed by exact path with the reason:
// Button's `emphasis` variant aliases the accent tokens until 3.0 (decision 0016).
const STILL_READ = [/^component\.button\.variants\.emphasis\./]

// Reads the type checker can't follow on purpose, by file, with the reason. Each entry must still
// match a read (checked below), so a fixed read takes its entry with it.
const ALLOWED: { file: string; paths?: RegExp; argumentOf?: string; reason: string }[] = [
  {
    file: 'src/components/layout/GridSystem/GridSystem.tsx',
    paths: /^base\.spacing\./,
    reason: 'The gap props are typed as base.spacing keys (public API) until 3.0 moves them to base.dimension (#99)',
  },
  {
    file: 'src/components/layout/GridSystem/GridSystem.test.tsx',
    paths: /^base\.spacing\./,
    reason: "Tests GridSystem's base.spacing gap props (above)",
  },
  { file: 'src/tokens.ts', reason: 'Publishes the whole token set; deprecated tokens stay in it until 3.0' },
  {
    file: 'src/lib/cssTokens.ts',
    reason: 'Builds the CSS-variable mirror of the whole token set (decision 0041); reads of the mirror are traced through its Tokens type',
  },
  { file: 'src/lib/cssVariables.test.ts', reason: 'Checks that every token, deprecated or not, maps to a variable in tokens.css' },
  {
    file: 'src/lib/docgen/tokenPaths.ts',
    argumentOf: 'reduce',
    reason: 'Resolves token-path strings for docs pages; the strings themselves are checked by the text search below',
  },
  { file: 'src/lib/docsTokenPaths.test.ts', argumentOf: 'reduce', reason: 'Resolves the docs pages\' token-path strings (above)' },
  { file: 'pages/tokens.tsx', argumentOf: 'inUse', reason: 'inUse() drops deprecated tokens before the tokens page lists a group' },
]

describe('deprecated tokens are not read', () => {
  const renamed = new Set(deprecated.filter((token) => /decision 0031/.test(String(token.$deprecated))).map((token) => token.path))
  const retired = new Set(deprecated.filter((token) => !STILL_READ.some((pattern) => pattern.test(token.path))).map((token) => token.path))
  const allowedBy = (read: TokenRead, token: string) =>
    ALLOWED.find(
      (entry) =>
        entry.file === read.file &&
        (!entry.paths || entry.paths.test(token)) &&
        (!entry.argumentOf || entry.argumentOf === read.argumentOf)
    )
  let reads: TokenRead[]

  // Every read in src and pages, resolved through the TypeScript type checker (#229): through
  // destructures, aliases, typed parameters, helpers and computed keys. A read it can't pin down
  // (an unknown key, a group cast or passed out of the type system) counts as every token under
  // its group, so it fails whenever it could reach a deprecated token.
  beforeAll(() => {
    const config = projectConfig()
    reads = findTokenReads(ts.createProgram(config.fileNames, config.options), (source) => {
      const file = path.relative(ROOT, source.fileName)
      return /^(src|pages)\//.test(file) && !/^src\/(tokens|styles)\//.test(file)
    })
  }, 120_000)

  it('by code in components, patterns, tests or the docs site', () => {
    const problems = reads.flatMap((read) =>
      read.paths
        .filter((token) => retired.has(token) && !allowedBy(read, token))
        // Files still waiting for the grammar migration may read the old semantic names (#189)
        .filter((token) => !(renamed.has(token) && grammarMigration.includes(read.file)))
        .map((token) => {
          const how = read.how === 'exact' ? '' : ` (${read.how}${read.argumentOf ? ` into ${read.argumentOf}()` : ''})`
          return `${read.file}:${read.line} reads ${token}${how}`
        })
    )
    expect(problems).toEqual([])
  })

  it('keeps the allow-list current: every entry still matches a deprecated read', () => {
    const used = new Set(reads.flatMap((read) => read.paths.filter((token) => retired.has(token)).map((token) => allowedBy(read, token))))
    expect(ALLOWED.filter((entry) => !used.has(entry)).map((entry) => entry.file)).toEqual([])
  })

  // Token paths written as text (docs token lists, READMEs, comments) aren't reads the type
  // checker sees, so they're found by searching for each deprecated path in the source text.
  it('as token-path strings in components, patterns, tests or the docs site', () => {
    // Match the path after its tier and component group (`button.sizes.small.padding`,
    // `color.category.blue-emphasis`) or in full, excluding only the token sources and builds.
    // No `\b`: macOS's regex lacks it.
    const retiredTokens = deprecated.filter((token) => retired.has(token.path))
    const [renamedTokens, others] = [
      retiredTokens.filter((token) => renamed.has(token.path)),
      retiredTokens.filter((token) => !renamed.has(token.path)),
    ]
    const waiting = (hit: string) => grammarMigration.includes(hit.split(':')[0])
    expect([...readers(others), ...readers(renamedTokens).filter((hit) => !waiting(hit))]).toEqual([])
  })

  it('keep the grammar migration list current: every file on it still reads an old name', () => {
    const files = new Set([
      ...readers(deprecated.filter((token) => renamed.has(token.path))).map((hit) => hit.split(':')[0]),
      ...reads.filter((read) => read.paths.some((token) => renamed.has(token))).map((read) => read.file),
    ])
    expect(grammarMigration.filter((file) => !files.has(file))).toEqual([])
  })
})

function readers(retired: Token[]): string[] {
  if (retired.length === 0) return []
  const pattern = retired
    .map((token) => token.path.replace(/^(component|semantic)\./, ''))
    .map((path) => path.replace(/[.-]/g, (c) => `\\${c}`))
    .join('|')
  try {
    const hits = execFileSync(
      'git',
      ['grep', '-nE', `(${pattern})([^A-Za-z0-9_-]|$)`, '--', 'src', 'pages', ':!src/tokens', ':!src/styles'],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }
    )
    return hits.trim().split('\n').filter(Boolean)
  } catch (error) {
    // git grep exits 1 when nothing matches; anything else is a real failure
    if ((error as { status?: number }).status !== 1) throw error
    return []
  }
}

// A description names the token's job, never its value: values change, the job shouldn't
// (decision 0033). Deprecated tokens keep their old text until 3.0.
const VALUE = /#[0-9a-fA-F]{3,8}\b|\b\d*\.?\d+(px|rem)\b|Approved under/

describe('descriptions of tokens in use', () => {
  it('contain no hex, px or rem values and no "Approved under"', () => {
    const offending = all
      .filter((token) => token.$deprecated === undefined && VALUE.test(String(token.$description ?? '')))
      .map((token) => token.path)
    expect(offending).toEqual([])
  })
})
