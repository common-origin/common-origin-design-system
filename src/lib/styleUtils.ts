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

// Windows Contrast Themes and other forced-colours modes (decision 0038). The browser swaps in
// the user's system colours, drops background colours and box-shadows, and keeps borders and
// outlines. Inside this query, give a control that shows its edge with a fill alone a border,
// and draw selected and checked states with system colours: ButtonText for control edges,
// Highlight and HighlightText for selected and checked, GrayText for disabled, CanvasText for
// content. Use forced-color-adjust: none only on a fill that carries state.
export const forcedColors = '@media (forced-colors: active)'

/** A control's edge in forced colours, for a control that shows its edge with a fill alone. The
 * border follows the text colour the browser picks: ButtonText, LinkText, or GrayText when disabled. */
export const forcedColorsEdge = `${forcedColors} {
  border: ${tokens.semantic.border.width.thin} solid currentColor;
}`

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
// Exits accelerate: things leaving speed up as they go (decision 0037).
export const exitAnimation = css`, ${fadeOut} ${tokens.semantic.motion.duration.fast} ${tokens.semantic.motion.easing.accelerate} forwards`

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
  if (disabled) return `${rowDeclarations(states.rest, textSelector)}\n${rowForcedColors({ selected, focused, disabled, textSelector })}`
  return `
  ${rowDeclarations(focused ? states.hover : states.rest, textSelector)}

  &:hover {
    ${rowDeclarations(states.hover, textSelector)}
  }

  &:active {
    ${rowDeclarations(states.pressed, textSelector)}
  }

  ${rowForcedColors({ selected, focused, disabled, textSelector })}
`
}

// Rows in forced colours (decision 0038): fills are dropped, so a selected row takes the system
// selection colours, and a hovered or keyboard-active row is outlined in Highlight.
const rowForcedColors = ({
  selected,
  focused,
  disabled,
  textSelector,
}: {
  selected: boolean
  focused: boolean
  disabled: boolean
  textSelector?: string
}) => {
  const text = (color: string) => (textSelector ? `color: ${color};\n    ${textSelector} { color: ${color}; }` : `color: ${color};`)
  const hover = `outline: ${tokens.semantic.border.width.thin} solid Highlight;\n      outline-offset: -${tokens.semantic.border.width.thin};`
  // A row that doesn't respond (disabled, or not interactive at all) keeps its selection but has
  // no hover outline. Disabled text is the component's to colour: callers also pass this for
  // static rows, which must stay CanvasText.
  // A selected row keeps forced-color-adjust: auto: the browser keeps system colours an author
  // sets, so the row stays Highlight with HighlightText. Its descendants' own colours would be
  // forced to CanvasText, so they inherit HighlightText, and anything drawn with a fill inside
  // (a chip or tag as the row's badge) drops it and keeps its edge. The doubled class outranks
  // the descendants' own rules.
  return `${forcedColors} {
    ${selected ? `background-color: Highlight;\n    ${text('HighlightText')}\n    && * {\n      color: inherit;\n      background-color: transparent;\n    }` : ''}
    ${!disabled && focused ? hover : ''}
    ${disabled ? '' : `&:hover {\n      ${hover}\n    }`}
  }`
}
