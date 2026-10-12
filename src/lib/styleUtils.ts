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
// reduced-motion form, so it needs no fallback of its own. While it fades, the backdrop
// still catches clicks (so they can't reach the page behind it) and the panel is inert.
export const exitAnimation = css`, ${fadeOut} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.easeOut} forwards`

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

// One interaction pattern for rows and items: list items, menu and listbox options, sidebars
// (decision 0030). Unselected rows follow the naked Button's ladder; selected rows follow the
// light-blue selected ladder, with the text darkening with its fill (decision 0016). Unselected
// rows leave their text colour to the component, so a destructive row can stay red.
const { fill: rowFill, text: rowText } = tokens.semantic.color

export interface RowState {
  background: string
  text?: string
}

export const rowStates: Record<'unselected' | 'selected', Record<'rest' | 'hover' | 'pressed', RowState>> = {
  unselected: {
    rest: { background: 'transparent' },
    hover: { background: rowFill.muted },
    pressed: { background: rowFill.default },
  },
  selected: {
    rest: { background: rowFill['accent-muted'], text: rowText.accent },
    hover: { background: rowFill['accent-muted-hover'], text: rowText['accent-hover'] },
    pressed: { background: rowFill['accent-muted-pressed'], text: rowText['accent-pressed'] },
  },
}

const rowDeclarations = ({ background, text }: RowState, textSelector?: string) => {
  if (!text) return `background-color: ${background};`
  return textSelector
    ? `background-color: ${background};\n  ${textSelector} { color: ${text}; }`
    : `background-color: ${background};\n  color: ${text};`
}

/**
 * The background (and, when selected, text) of an interactive row in every state.
 * - `focused`: keyboard focus that isn't DOM focus, such as a listbox option under
 *   aria-activedescendant. It shows the hover state.
 * - `disabled`: shows the resting state, with no hover or press.
 * - `textSelector`: a descendant to colour when the row's text isn't the row itself, for example
 *   text set by Typography. Pass it without `&`.
 */
export const interactiveRow = ({
  selected = false,
  focused = false,
  disabled = false,
  textSelector,
}: {
  selected?: boolean
  focused?: boolean
  disabled?: boolean
  textSelector?: string
} = {}) => {
  const states = selected ? rowStates.selected : rowStates.unselected
  if (disabled) return rowDeclarations(states.rest, textSelector)
  return `
  ${rowDeclarations(focused ? states.hover : states.rest, textSelector)}

  &:hover {
    ${rowDeclarations(states.hover, textSelector)}
  }

  &:active {
    ${rowDeclarations(states.pressed, textSelector)}
  }
`
}
