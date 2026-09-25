import tokensJson from '../styles/tokens.json'

// Re-declared as a const so emitted .d.ts files inline the token shape instead of importing JSON,
// which consumers can only resolve with `resolveJsonModule`.
export const tokens = tokensJson

export type Tokens = typeof tokens
export type TokensBase = Tokens['base']
export type TokensSemantic = Tokens['semantic']
export type TokensComponent = Tokens['component']
