import tokens from '../styles/tokens.json'
import { staticComponentsData } from './componentsData'

// Every token a docs page lists is rendered as a token chip, so it must be an
// exact path that resolves to a value in tokens.json (#114). An explanation
// belongs in a `//` comment after the entry, not in the string.

function resolve(path: string): unknown {
  return path.split('.').reduce<unknown>(
    (node, key) => (node !== null && typeof node === 'object' ? (node as Record<string, unknown>)[key] : undefined),
    tokens
  )
}

const entries = staticComponentsData.flatMap(page => [
  ...page.tokens.map(path => ({ page: page.name, where: 'tokens', path })),
  ...(page.anatomy?.parts ?? []).flatMap(part =>
    (part.tokens ?? []).map(path => ({ page: page.name, where: `anatomy "${part.name}"`, path }))
  ),
])

describe('docs token paths', () => {
  it('finds token entries to check', () => {
    expect(entries.length).toBeGreaterThan(100)
  })

  it('lists only paths that resolve to a token value', () => {
    const invalid = entries
      .filter(({ path }) => typeof resolve(path) !== 'string')
      .map(({ page, where, path }) => `${page} (${where}): ${path}`)
    expect(invalid).toEqual([])
  })
})
