// Main design system exports
export * from './components'

// Export tokens with proper types
import tokensData from './styles/tokens.json'
export const tokens = tokensData

// Export token types
export type {
  Tokens,
  TokensBase,
  TokensSemantic,
  TokensComponent
} from './styles/tokens.d'

// Export icons data and types for external use
export {
  iconsData,
  type IconName,
  type IconCategory,
  type IconMetadata,
  type IconRegistry,
} from './types/icons'