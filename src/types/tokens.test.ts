/**
 * @jest-environment node
 */
import { join } from 'path'
import ts from 'typescript'
import tokensJson from '../styles/tokens.json'
import type { Tokens } from './tokens'

// The published token types come from the generated src/styles/tokens.ts (decision 0033, #199)

// Two types are identical, not just mutually assignable
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false

describe('published token types', () => {
  it('are the same type as before: typeof tokens.json', () => {
    // A compile-time check: this file fails to type-check if the types differ (P7)
    const same: Equal<Tokens, typeof tokensJson> = true
    expect(same).toBe(true)
  })

  // What an editor shows on hover: the documentation and JSDoc tags of the property symbol
  const program = ts.createProgram([join(__dirname, 'tokens.ts')], {
    strict: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    noEmit: true,
  })
  const checker = program.getTypeChecker()
  const source = program.getSourceFile(join(__dirname, 'tokens.ts'))!
  const tokensSymbol = checker.getExportsOfModule(checker.getSymbolAtLocation(source)!).find((s) => s.name === 'tokens')!

  function hover(path: string) {
    let type = checker.getTypeOfSymbol(tokensSymbol)
    let symbol: ts.Symbol | undefined
    for (const key of path.split('.')) {
      symbol = type.getProperty(key)
      if (!symbol) throw new Error(`${path}: no property ${key}`)
      type = checker.getTypeOfSymbol(symbol)
    }
    return {
      docs: ts.displayPartsToString(symbol!.getDocumentationComment(checker)),
      tags: symbol!.getJsDocTags(checker).map((tag) => `@${tag.name} ${ts.displayPartsToString(tag.text)}`),
    }
  }

  it("show a token's description on hover", () => {
    const { docs, tags } = hover('semantic.color.text.default')
    expect(docs).toBe(tokensSource('semantic.color.text.default').$description)
    expect(tags).toEqual([])
  })

  it("show a base group's description on hover (decision 0033: base tokens are described per group)", () => {
    const { docs } = hover('base.spacing')
    expect(docs).toBe(tokensSource('base.spacing').$description)
    expect(docs).not.toBe('')
  })

  // Picked from the source rather than named, so this test never reads a token that 3.0 removes
  it('mark every deprecated token @deprecated, with why and its replacement', () => {
    // 3.0 removed every deprecated token (#99), so this loop is empty until the next deprecation
    const deprecated = deprecatedTokens()
    for (const { path, replacedBy } of deprecated) {
      const { tags } = hover(path)
      expect(tags).toHaveLength(1)
      expect(tags[0]).toMatch(/^@deprecated \S/)
      if (replacedBy) expect(tags[0]).toContain(replacedBy)
    }
  })
})

function tokensSource(path: string): { $description?: string } {
  const [tier, ...rest] = path.split('.')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  let node = require(`../tokens/${tier}/index.json`)[tier]
  for (const key of rest) node = node[key]
  return node
}

type SourceNode = { [key: string]: SourceNode | string | undefined } & {
  $deprecated?: string
  $extensions?: { 'studio.commonorigin'?: { replacedBy?: string } }
}

function deprecatedTokens(): { path: string; replacedBy?: string }[] {
  const out: { path: string; replacedBy?: string }[] = []
  const walk = (node: SourceNode, path: string[]) => {
    for (const [key, child] of Object.entries(node)) {
      if (key.startsWith('$') || !child || typeof child !== 'object') continue
      if ('$value' in child) {
        if (child.$deprecated !== undefined)
          out.push({ path: [...path, key].join('.'), replacedBy: child.$extensions?.['studio.commonorigin']?.replacedBy })
      } else walk(child, [...path, key])
    }
  }
  for (const tier of ['semantic', 'component']) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    walk(require(`../tokens/${tier}/index.json`)[tier], [tier])
  }
  return out
}
