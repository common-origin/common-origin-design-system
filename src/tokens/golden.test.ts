import tokens from '@/styles/tokens.json'
import golden from '../../config/tokens.golden.json'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withoutRefs } = require('../../scripts/tokens-golden.cjs')

type Tree = { [key: string]: Tree | string | number }

// Every leaf path whose value differs, or that exists on only one side
function differences(actual: Tree, expected: Tree, path: string[] = []): string[] {
  const keys = new Set([...Object.keys(actual), ...Object.keys(expected)])
  return [...keys].flatMap((key) => {
    const a = actual[key]
    const e = expected[key]
    const at = [...path, key].join('.')
    if (a === undefined) return [`${at}: missing (golden: ${JSON.stringify(e)})`]
    if (e === undefined) return [`${at}: not in golden (now: ${JSON.stringify(a)})`]
    if (typeof a === 'object' && typeof e === 'object') return differences(a, e, [...path, key])
    return a === e ? [] : [`${at}: ${JSON.stringify(e)} → ${JSON.stringify(a)}`]
  })
}

// The token pipeline migration (decision 0017, #24) must leave every resolved value and the
// hierarchy unchanged. The golden file is the build before the migration, without the stray
// $ref keys. A PR that means to change values regenerates it with `npm run tokens:golden`
// and says so.
describe('resolved tokens match the golden file', () => {
  it('has the same hierarchy and values, apart from $ref keys', () => {
    expect(differences(withoutRefs(tokens), golden as Tree)).toEqual([])
  })

  it('has no $ref keys in the golden file', () => {
    expect(JSON.stringify(golden)).not.toContain('"$ref"')
  })
})
