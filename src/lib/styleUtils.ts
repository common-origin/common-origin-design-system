import { css, keyframes } from 'styled-components'
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

// Wrap fallbacks for people who ask for less motion (decision 0005): movement becomes
// an instant change or a simple fade. Colour and opacity transitions need no fallback.
export const reducedMotion = '@media (prefers-reduced-motion: reduce)'

// No `from` keyframe: the fade starts from the element's current opacity, including a
// still-running entrance, so closing mid-entrance doesn't jump back to fully visible.
const fadeOut = keyframes`
  to { opacity: 0; }
`

// Exit for overlays that unmount (use with usePresence). Append `exitAnimation` to each of
// the element's `animation` declarations while it exits: the entrance stays in the list,
// so it isn't restarted, and the fade runs on top of it. A fade is already the
// reduced-motion form, so it needs no fallback of its own.
export const exitAnimation = css`, ${fadeOut} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.easeOut} forwards`

// Other styles for an exiting overlay: it can't be clicked while it fades
export const exiting = css`
  pointer-events: none;
`

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
