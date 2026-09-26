import { css } from 'styled-components'
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

// Content for screen readers only. The 1px size and -1px margin are part of the standard
// visually-hidden technique, not design values, so they aren't tokens.
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`
