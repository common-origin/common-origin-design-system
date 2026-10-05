/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process'
import source from './component/index.json'

type Node = { [key: string]: Node | string }
type Leaf = { path: string; node: Node | string }

// The component tier, normalised in step 3 of the token pipeline migration (decision 0017, #24)
// under decisions 0014 and 0022. Components still to convert are listed until 3b and 3c land.
const NOT_YET_CONVERTED = ['chip', 'input', 'progressBar', 'badge', 'separator']

function leaves(node: Node, path: string[] = []): Leaf[] {
  return Object.entries(node).flatMap(([key, child]) =>
    typeof child === 'object' && !('value' in child)
      ? leaves(child, [...path, key])
      : [{ path: [...path, key].join('.'), node: child }]
  )
}

const components = Object.entries((source as unknown as { component: Node }).component).filter(
  ([name]) => !NOT_YET_CONVERTED.includes(name)
)
const converted = components.flatMap(([name, node]) =>
  leaves(node as Node, ['component', name])
)

describe('component tier (decisions 0014 and 0022)', () => {
  it('every leaf is a real token with a value, a type and a description', () => {
    const problems = converted.flatMap(({ path, node }) => {
      if (typeof node !== 'object') return [`${path}: a plain string, not a token`]
      return ['value', 'type', 'description'].filter((key) => !node[key]).map((key) => `${path}: no ${key}`)
    })
    expect(problems).toEqual([])
  })

  it('never references base tokens', () => {
    const problems = converted
      .filter(({ node }) => typeof node === 'object' && String(node.value).includes('{base.'))
      .map(({ path, node }) => `${path}: ${(node as Node).value}`)
    expect(problems).toEqual([])
  })
})

// Tokens retired by decision 0022 stay in tokens.json until 3.0 (#99), but nothing reads them
describe('retired component tokens are not read', () => {
  const retired = leaves((source as unknown as { component: Node }).component, ['component'])
    .filter(({ node }) => typeof node === 'object' && String(node.description).startsWith('Deprecated (decision 0022)'))
    .map(({ path }) => path.replace(/^component\./, ''))

  it('finds the retired tokens', () => {
    expect(retired.length).toBeGreaterThan(0)
  })

  it('is not referenced by components, patterns or the docs site', () => {
    // Match the path after its component group (`button.sizes.small.padding`) or in full,
    // excluding tests and the token sources themselves. No `\b`: macOS's regex lacks it.
    const pattern = retired.map((path) => path.replace(/\./g, '\\.')).join('|')
    let hits = ''
    try {
      hits = execFileSync(
        'git',
        ['grep', '-nE', `(${pattern})([^A-Za-z0-9_]|$)`, '--', 'src', 'pages', ':!src/tokens', ':!src/styles', ':!*.test.ts', ':!*.test.tsx'],
        { encoding: 'utf8' }
      )
    } catch (error) {
      // git grep exits 1 when nothing matches; anything else is a real failure
      if ((error as { status?: number }).status !== 1) throw error
    }
    expect(hits.trim().split('\n').filter(Boolean)).toEqual([])
  })
})
