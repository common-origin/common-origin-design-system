/**
 * @jest-environment node
 */
import path from 'path'
import ts from 'typescript'
import { deprecatedTokens, findTokenReads, projectConfig, ROOT } from './tokenReads'

// Each fixture reads `semantic.color.background.subtle` (or a category `-emphasis` name), both
// deprecated by decision 0031, in one of the ways #229 lists. The checker must find every one,
// and must not flag the clean controls.

const FIXTURES: Record<string, string> = {
  direct: `
    import tokens from '@/styles/tokens.json'
    export const a = tokens.semantic.color.background.subtle`,
  nestedDestructure: `
    import tokens from '@/styles/tokens.json'
    const { semantic: { color: { background: bg } } } = tokens
    export const a = bg.subtle`,
  renamedBinding: `
    import tokens from '@/styles/tokens.json'
    const { background: rowBackground } = tokens.semantic.color
    export const a = rowBackground.subtle`,
  destructuredLeaf: `
    import tokens from '@/styles/tokens.json'
    const { subtle } = tokens.semantic.color.background
    export const a = subtle`,
  alias: `
    import tokens from '@/styles/tokens.json'
    const color = tokens.semantic.color
    const background = color.background
    export const a = background.subtle`,
  literalBracket: `
    import tokens from '@/styles/tokens.json'
    const { background } = tokens.semantic.color
    export const a = background['subtle']`,
  typedParameter: `
    import type { Tokens } from '@/types/tokens'
    export const read = (color: Tokens['semantic']['color']) => color.background.subtle`,
  helperReturn: `
    import tokens from '@/styles/tokens.json'
    const background = () => tokens.semantic.color.background
    export const a = background().subtle`,
  objectProperty: `
    import tokens from '@/styles/tokens.json'
    const theme = { surfaces: tokens.semantic.color.background }
    export const a = theme.surfaces.subtle`,
  templateUnion: `
    import tokens from '@/styles/tokens.json'
    const { category } = tokens.semantic.color
    export const read = (hue: 'blue' | 'purple') => category[\`\${hue}-emphasis\` as keyof typeof category]`,
  castToRecord: `
    import tokens from '@/styles/tokens.json'
    const background = tokens.semantic.color.background as Record<string, string>
    export const read = (key: string) => background[key]`,
  unresolvedKey: `
    import tokens from '@/styles/tokens.json'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const read = (key: string) => tokens.semantic.color.background[key as any]`,
  objectEntries: `
    import tokens from '@/styles/tokens.json'
    export const all = Object.entries(tokens.semantic.color.background)`,
  castToAny: `
    import tokens from '@/styles/tokens.json'
    export const a = (tokens.semantic.color as any).background.subtle`,
  containerEscape: `
    import tokens from '@/styles/tokens.json'
    export const text = JSON.stringify({ data: tokens.semantic.color.background })`,
  spread: `
    import tokens from '@/styles/tokens.json'
    export const copy = { ...tokens.semantic.color.background }`,
  rest: `
    import tokens from '@/styles/tokens.json'
    const { surface, ...others } = tokens.semantic.color.background
    export const a = [surface, others]`,
  interfaceContainer: `
    import tokens from '@/styles/tokens.json'
    interface Theme { bg: typeof tokens.semantic.color.background }
    const theme: Theme = { bg: tokens.semantic.color.background }
    export const text = JSON.stringify(theme)`,
  recordContainer: `
    import tokens from '@/styles/tokens.json'
    const byName: Record<string, typeof tokens.semantic.color.background> = { main: tokens.semantic.color.background }
    export const text = JSON.stringify(byName)`,
  mapContainer: `
    import tokens from '@/styles/tokens.json'
    const byName = new Map([['main', tokens.semantic.color.background]])
    export const text = JSON.stringify(byName)`,
  // Checking A first walks B inside A's cycle; B must still be searched in full on its own
  cyclicContainer: `
    import tokens from '@/styles/tokens.json'
    interface A { b: B; bg: typeof tokens.semantic.color.background }
    interface B { a: A }
    declare const first: A
    declare const second: B
    export const one = JSON.stringify(first)
    export const two = JSON.stringify(second)`,
  // Controls: none of these can reach a deprecated token
  cleanDirect: `
    import tokens from '@/styles/tokens.json'
    const { surface } = tokens.semantic
    export const a = surface.raised`,
  cleanTemplate: `
    import tokens from '@/styles/tokens.json'
    const { category } = tokens.semantic.color
    export const read = (hue: 'olive' | 'rose') => category[\`\${hue}-strong\` as keyof typeof category]`,
  cleanEscape: `
    import tokens from '@/styles/tokens.json'
    export const all = Object.entries(tokens.semantic.surface)`,
}

const fileOf = (name: string) => path.join(ROOT, 'src/__tokenReadsFixtures__', `${name}.ts`)

function fixtureProgram() {
  const config = projectConfig()
  const host = ts.createCompilerHost(config.options)
  const virtual = new Map(Object.entries(FIXTURES).map(([name, text]) => [fileOf(name), text]))
  const { fileExists, readFile, getSourceFile } = host
  host.fileExists = (file) => virtual.has(file) || fileExists(file)
  host.readFile = (file) => virtual.get(file) ?? readFile(file)
  host.getSourceFile = (file, language, ...rest) => {
    const text = virtual.get(file)
    return text === undefined ? getSourceFile(file, language, ...rest) : ts.createSourceFile(file, text, language)
  }
  return ts.createProgram([...virtual.keys(), path.join(ROOT, 'src/types/tokens.ts')], config.options, host)
}

describe('findTokenReads (#229)', () => {
  const deprecated = deprecatedTokens()
  let found: Map<string, Set<string>>
  let reads: ReturnType<typeof findTokenReads>

  beforeAll(() => {
    reads = findTokenReads(fixtureProgram(), (source) => source.fileName.includes('__tokenReadsFixtures__'))
    found = new Map()
    for (const read of reads) {
      const name = path.basename(read.file, '.ts')
      const hits = found.get(name) ?? new Set<string>()
      for (const token of read.paths) if (deprecated.has(token)) hits.add(`${read.how}: ${token}`)
      found.set(name, hits)
    }
  }, 120_000)

  const hits = (name: string) => [...(found.get(name) ?? [])]
  const subtle = 'semantic.color.background.subtle'

  it.each([
    'direct',
    'nestedDestructure',
    'renamedBinding',
    'destructuredLeaf',
    'alias',
    'literalBracket',
    'typedParameter',
    'helperReturn',
    'objectProperty',
  ])('finds an exact read: %s', (name) => {
    expect(hits(name)).toContain(`exact: ${subtle}`)
  })

  it('expands a template key over its union, and finds only the names it can produce', () => {
    expect(hits('templateUnion').sort()).toEqual([
      'exact: semantic.color.category.blue-emphasis',
      'exact: semantic.color.category.purple-emphasis',
    ])
  })

  it('widens a key it cannot resolve to the whole group', () => {
    expect(hits('unresolvedKey')).toContain(`unresolved key: ${subtle}`)
  })

  it.each(['castToRecord', 'objectEntries', 'castToAny', 'containerEscape', 'spread', 'rest', 'interfaceContainer', 'recordContainer', 'mapContainer'])(
    'treats a group that loses its type as reading everything under it: %s',
    (name) => {
      expect(hits(name)).toContain(`escape: ${subtle}`)
    }
  )

  it('searches a container in full even after meeting it inside a cycle', () => {
    const lines = reads.filter((read) => read.file.endsWith('cyclicContainer.ts') && read.paths.includes(subtle)).map((read) => read.line)
    // Both stringify calls: the one through A, and the one through B after A was searched
    expect(new Set(lines).size).toBe(2)
  })

  it.each(['cleanDirect', 'cleanTemplate', 'cleanEscape'])('does not flag a read that cannot reach a deprecated token: %s', (name) => {
    expect(hits(name)).toEqual([])
  })
})
