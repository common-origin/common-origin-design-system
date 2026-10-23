import tokens from '@/styles/tokens.json'
import source from './semantic/index.json'

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

  it('are what every typography style references in the token source', () => {
    // Check the source, not the resolved output: a base reference with the same value
    // would resolve identically but skip the semantic tier
    // DTCG: `$type` sits on the group, so skip `$` keys
    // A deprecated style that aliases its replacement has no weight of its own (#224)
    Object.entries(source.semantic.typography as Record<string, { $value?: string; $deprecated?: string }>)
      .filter(([name, token]) => !name.startsWith('$') && !token.$deprecated)
      .forEach(([name, token]) => {
        expect([name, token.$value]).toEqual([name, expect.stringMatching(/^\{semantic\.fontWeight\.(regular|medium|semibold|bold)\} /)])
      })
  })
})
