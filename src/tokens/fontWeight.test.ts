import tokens from '@/styles/tokens.json'

// Semantic font weights (P3): components use these, never base keys or literals
describe('semantic font weights', () => {
  it('map to the expected CSS weights', () => {
    expect(tokens.semantic.fontWeight).toEqual({
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    })
  })

  it('are the only weights used by the typography styles', () => {
    const weights = new Set(Object.values(tokens.semantic.fontWeight))
    Object.entries(tokens.semantic.typography).forEach(([, font]) => {
      expect(weights).toContain(String(font).split(' ')[0])
    })
  })
})
