/**
 * @jest-environment node
 */
import path from 'path'
import ts from 'typescript'
import { findTokenReads, projectConfig, ROOT } from './tokenReads'

// Each fixture reads a target token, `semantic.color.fill.muted` (or a category `-strong` name), in
// one of the ways #229 lists. The deprecation test traces deprecated tokens the same way; 3.0 left
// none, so these tests use live targets. The checker must find every read, and must not flag the
// clean controls.
const TARGETS = new Set([
  'semantic.color.fill.muted',
  'semantic.color.category.magenta-strong',
  'semantic.color.category.periwinkle-strong',
])

const FIXTURES: Record<string, string> = {
  direct: `
    import tokens from '@/styles/tokens.json'
    export const a = tokens.semantic.color.fill.muted`,
  nestedDestructure: `
    import tokens from '@/styles/tokens.json'
    const { semantic: { color: { fill: bg } } } = tokens
    export const a = bg.muted`,
  renamedBinding: `
    import tokens from '@/styles/tokens.json'
    const { fill: rowBackground } = tokens.semantic.color
    export const a = rowBackground.muted`,
  destructuredLeaf: `
    import tokens from '@/styles/tokens.json'
    const { muted } = tokens.semantic.color.fill
    export const a = muted`,
  alias: `
    import tokens from '@/styles/tokens.json'
    const color = tokens.semantic.color
    const background = color.fill
    export const a = background.muted`,
  literalBracket: `
    import tokens from '@/styles/tokens.json'
    const { fill: background } = tokens.semantic.color
    export const a = background['muted']`,
  typedParameter: `
    import type { Tokens } from '@/types/tokens'
    export const read = (color: Tokens['semantic']['color']) => color.fill.muted`,
  helperReturn: `
    import tokens from '@/styles/tokens.json'
    const background = () => tokens.semantic.color.fill
    export const a = background().muted`,
  objectProperty: `
    import tokens from '@/styles/tokens.json'
    const theme = { surfaces: tokens.semantic.color.fill }
    export const a = theme.surfaces.muted`,
  templateUnion: `
    import tokens from '@/styles/tokens.json'
    const { category } = tokens.semantic.color
    export const read = (hue: 'magenta' | 'periwinkle') => category[\`\${hue}-strong\` as keyof typeof category]`,
  castToRecord: `
    import tokens from '@/styles/tokens.json'
    const background = tokens.semantic.color.fill as Record<string, string>
    export const read = (key: string) => background[key]`,
  unresolvedKey: `
    import tokens from '@/styles/tokens.json'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const read = (key: string) => tokens.semantic.color.fill[key as any]`,
  objectEntries: `
    import tokens from '@/styles/tokens.json'
    export const all = Object.entries(tokens.semantic.color.fill)`,
  castToAny: `
    import tokens from '@/styles/tokens.json'
    export const a = (tokens.semantic.color as any).fill.muted`,
  containerEscape: `
    import tokens from '@/styles/tokens.json'
    export const text = JSON.stringify({ data: tokens.semantic.color.fill })`,
  spread: `
    import tokens from '@/styles/tokens.json'
    export const copy = { ...tokens.semantic.color.fill }`,
  rest: `
    import tokens from '@/styles/tokens.json'
    const { inverse, ...others } = tokens.semantic.color.fill
    export const a = [inverse, others]`,
  interfaceContainer: `
    import tokens from '@/styles/tokens.json'
    interface Theme { bg: typeof tokens.semantic.color.fill }
    const theme: Theme = { bg: tokens.semantic.color.fill }
    export const text = JSON.stringify(theme)`,
  recordContainer: `
    import tokens from '@/styles/tokens.json'
    const byName: Record<string, typeof tokens.semantic.color.fill> = { main: tokens.semantic.color.fill }
    export const text = JSON.stringify(byName)`,
  mapContainer: `
    import tokens from '@/styles/tokens.json'
    const byName = new Map([['main', tokens.semantic.color.fill]])
    export const text = JSON.stringify(byName)`,
  // Checking A first walks B inside A's cycle; B must still be searched in full on its own
  cyclicContainer: `
    import tokens from '@/styles/tokens.json'
    interface A { b: B; bg: typeof tokens.semantic.color.fill }
    interface B { a: A }
    declare const first: A
    declare const second: B
    export const one = JSON.stringify(first)
    export const two = JSON.stringify(second)`,
  // Controls: none of these can reach a target token
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
  let found: Map<string, Set<string>>
  let reads: ReturnType<typeof findTokenReads>

  beforeAll(() => {
    reads = findTokenReads(fixtureProgram(), (source) => source.fileName.includes('__tokenReadsFixtures__'))
    found = new Map()
    for (const read of reads) {
      const name = path.basename(read.file, '.ts')
      const hits = found.get(name) ?? new Set<string>()
      for (const token of read.paths) if (TARGETS.has(token)) hits.add(`${read.how}: ${token}`)
      found.set(name, hits)
    }
  }, 120_000)

  const hits = (name: string) => [...(found.get(name) ?? [])]
  const target = 'semantic.color.fill.muted'

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
    expect(hits(name)).toContain(`exact: ${target}`)
  })

  it('expands a template key over its union, and finds only the names it can produce', () => {
    expect(hits('templateUnion').sort()).toEqual([
      'exact: semantic.color.category.magenta-strong',
      'exact: semantic.color.category.periwinkle-strong',
    ])
  })

  it('widens a key it cannot resolve to the whole group', () => {
    expect(hits('unresolvedKey')).toContain(`unresolved key: ${target}`)
  })

  it.each(['castToRecord', 'objectEntries', 'castToAny', 'containerEscape', 'spread', 'rest', 'interfaceContainer', 'recordContainer', 'mapContainer'])(
    'treats a group that loses its type as reading everything under it: %s',
    (name) => {
      expect(hits(name)).toContain(`escape: ${target}`)
    }
  )

  it('searches a container in full even after meeting it inside a cycle', () => {
    const lines = reads.filter((read) => read.file.endsWith('cyclicContainer.ts') && read.paths.includes(target)).map((read) => read.line)
    // Both stringify calls: the one through A, and the one through B after A was searched
    expect(new Set(lines).size).toBe(2)
  })

  it.each(['cleanDirect', 'cleanTemplate', 'cleanEscape'])('does not flag a read that cannot reach a target token: %s', (name) => {
    expect(hits(name)).toEqual([])
  })
})
