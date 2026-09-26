import tokens from '@/styles/tokens.json'

// Semantic z-index layers must stay in this order (decision 0013):
// sticky < dropdown < overlay < modal
describe('semantic z-index layers', () => {
  const { zIndex } = tokens.semantic
  const order = ['sticky', 'dropdown', 'overlay', 'modal'] as const

  it('defines exactly the documented layers', () => {
    expect(Object.keys(zIndex).sort()).toEqual([...order].sort())
  })

  it('are integers in strictly ascending order', () => {
    const values = order.map((layer) => Number(zIndex[layer]))
    values.forEach((value) => expect(Number.isInteger(value)).toBe(true))
    values.slice(1).forEach((value, i) => expect(value).toBeGreaterThan(values[i]))
  })
})
