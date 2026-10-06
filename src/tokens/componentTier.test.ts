/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process'
import source from './component/index.json'

type Node = { [key: string]: Node | string }
type Leaf = { path: string; node: Node | string; type?: string }

// The component tier, normalised in step 3 of the token pipeline migration (decision 0017, #24)
// under decisions 0014 and 0022

// The source is DTCG: a token has `$value`, and its `$type` may sit on a parent group
function leaves(node: Node, path: string[] = [], inheritedType?: string): Leaf[] {
  const groupType = typeof node.$type === 'string' ? node.$type : inheritedType
  return Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, child]) =>
      typeof child === 'object' && !('$value' in child)
        ? leaves(child, [...path, key], groupType)
        : [{ path: [...path, key].join('.'), node: child, type: typeof child === 'object' ? String(child.$type ?? groupType ?? '') : undefined }]
    )
}

const components = Object.entries((source as unknown as { component: Node }).component)
const converted = components.flatMap(([name, node]) =>
  leaves(node as Node, ['component', name], (source as unknown as { component: Node }).component.$type as string | undefined)
)

describe('component tier (decisions 0014 and 0022)', () => {
  it('every leaf is a real token with a value, a type and a description', () => {
    const problems = converted.flatMap(({ path, node, type }) => {
      if (typeof node !== 'object') return [`${path}: a plain string, not a token`]
      return [
        ...(node.$value ? [] : [`${path}: no $value`]),
        ...(type ? [] : [`${path}: no $type (on the token or a parent group)`]),
        ...(node.$description ? [] : [`${path}: no $description`]),
      ]
    })
    expect(problems).toEqual([])
  })

  // The only exception: Button's deprecated `emphasis` variant, kept until 3.0, aliases the
  // matching `accent` token (decision 0016). Matched by exact path, so no other token can opt out.
  const ALIAS = /^component\.button\.variants\.emphasis\.(.+)$/
  it('references only semantic tokens', () => {
    const problems = converted
      .filter(({ node }) => typeof node === 'object')
      .flatMap(({ path, node }) => {
        const refs = [...String((node as Node).$value).matchAll(/\{([^}]+)\}/g)].map((match) => match[1])
        const aliasTarget = path.match(ALIAS)?.[1]
        return refs
          .filter((ref) => !ref.startsWith('semantic.') && ref !== `component.button.variants.accent.${aliasTarget}`)
          .map((ref) => `${path}: {${ref}}`)
      })
    expect(problems).toEqual([])
  })
})

// Deprecated component tokens stay in tokens.json until 3.0 (#99), but nothing reads them. Only
// these are deliberately still read, listed by exact path: Button's `emphasis` aliases (kept until
// 3.0, decision 0016) and the off-grid paddings with no semantic step that wait for #129.
const STILL_READ = [
  /^component\.button\.variants\.emphasis\./,
  /^component\.chip\.sizes\.(small|medium)\.padding$/,
  /^component\.input\.default\.paddingY$/,
]

describe('retired component tokens are not read', () => {
  const retired = leaves((source as unknown as { component: Node }).component, ['component'])
    .filter(({ node }) => typeof node === 'object' && String(node.$description).startsWith('Deprecated'))
    .filter(({ path }) => !STILL_READ.some((pattern) => pattern.test(path)))
    .map(({ path }) => path.replace(/^component\./, ''))

  it('finds the retired tokens', () => {
    expect(retired.length).toBeGreaterThan(0)
  })

  // Matches dotted paths in source text, so a read through a destructured or aliased object
  // (`const { count } = badge`, then `count.paddingX`) isn't caught. Read tokens by full path.
  it('is not referenced by components, patterns, tests or the docs site', () => {
    // Match the path after its component group (`button.sizes.small.padding`) or in full,
    // excluding only the token sources and builds. Tests are included, so none asserts a
    // retired token that 3.0 removes. No `\b`: macOS's regex lacks it.
    const pattern = retired.map((path) => path.replace(/\./g, '\\.')).join('|')
    let hits = ''
    try {
      hits = execFileSync(
        'git',
        ['grep', '-nE', `(${pattern})([^A-Za-z0-9_]|$)`, '--', 'src', 'pages', ':!src/tokens', ':!src/styles'],
        { encoding: 'utf8' }
      )
    } catch (error) {
      // git grep exits 1 when nothing matches; anything else is a real failure
      if ((error as { status?: number }).status !== 1) throw error
    }
    expect(hits.trim().split('\n').filter(Boolean)).toEqual([])
  })
})
