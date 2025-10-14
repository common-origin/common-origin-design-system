import tokens from '@/styles/tokens.json'

// Breakpoints using base tokens
export const breakpoints = {
  xs: tokens.base.breakpoint.xs,
  sm: tokens.base.breakpoint.sm,
  md: tokens.base.breakpoint.md,
  lg: tokens.base.breakpoint.lg,
  xl: tokens.base.breakpoint.xl,
  '2xl': tokens.base.breakpoint['2xl'],
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

// Re-export tokens for convenience
export { tokens }
export default tokens