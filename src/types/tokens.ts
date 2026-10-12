import tokensJson from '../styles/tokens.json'
import type { Tokens } from '../styles/tokens'

// The published types come from the generated `src/styles/tokens.ts`, which carries each token's
// description as JSDoc and `@deprecated` on deprecated tokens (decision 0033, #199). Declaring the
// constant with that type also keeps emitted .d.ts files free of JSON imports, which consumers can
// only resolve with `resolveJsonModule`.
export const tokens: Tokens = tokensJson

export type { Tokens }
export type TokensBase = Tokens['base']
export type TokensSemantic = Tokens['semantic']
export type TokensComponent = Tokens['component']
