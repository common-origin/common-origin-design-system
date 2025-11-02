// Main design system exports
export * from './components'

// Export tokens for direct access
export { default as tokens } from './styles/tokens.json'

// Export token types
export type {
  Tokens,
  TokensBase,
  TokensSemantic,
  TokensComponent
} from './styles/tokens.d'

// Export icons data and types for external use
export { iconsData, type IconName } from './types/icons'