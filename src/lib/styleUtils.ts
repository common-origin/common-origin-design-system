import tokens from '../styles/tokens.json'

// Breakpoints from the semantic tokens (decision 0014)
export const breakpoints = {
  xs: tokens.semantic.breakpoint.xs,
  sm: tokens.semantic.breakpoint.sm,
  md: tokens.semantic.breakpoint.md,
  lg: tokens.semantic.breakpoint.lg,
  xl: tokens.semantic.breakpoint.xl,
  '2xl': tokens.semantic.breakpoint['2xl'],
}

// Media query helpers
export const media = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}
