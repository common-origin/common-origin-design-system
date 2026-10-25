import tokens from './cssTokens'
import type { Tokens } from '../types/tokens'

// Props whose values are token keys keep their published vocabulary in 2.x (P7), but read the
// semantic grammar's names (decision 0031, #189). Each map covers every key the prop type allows,
// so TypeScript fails here if a key is added without a mapping.
const { semantic } = tokens
const { color, space, radius, surface } = semantic

type Semantic = Tokens['semantic']

/** Box's spacing props (`p`, `m`, `gap`…): the old layout scale's keys, read from `space`. */
export const spaceByLayoutKey: Record<keyof Semantic['spacing']['layout'], string> = {
  none: space[0],
  xs: space[100],
  sm: space[200],
  md: space[300],
  lg: space[400],
  xl: space[500],
  '2xl': space[600],
  '3xl': space[700],
  '4xl': space[800],
  '5xl': space[900],
  '6xl': space[1000],
  '7xl': space[1200],
  '8xl': space[1400],
  '9xl': space[1600],
  '10xl': space[2000],
  '11xl': space[2400],
  // A keyword, not a step: it stays until the keyword question is settled (0031)
  auto: semantic.spacing.layout.auto,
}

/** Box's `borderRadius` prop: the old radius keys, read from `radius`. */
export const radiusByKey: Record<keyof Semantic['border']['radius'], string> = {
  none: radius.none,
  xs: radius.xs,
  sm: radius.sm,
  md: radius.md,
  lg: radius.lg,
  xl: radius.xl,
  '2xl': radius['2xl'],
  '3xl': radius['3xl'],
  circle: radius.full,
}

/** Fills with no value of their own: a strong fill's states mix in an overlay (decision 0048). */
type StateMixedFill = 'emphasis-hover' | 'emphasis-pressed'

/**
 * Box's `bg` values in the semantic grammar (decision 0031, #304): the token's path below
 * `semantic`, such as `surface.raised` or `color.fill.muted`.
 */
export type BackgroundPath =
  | `surface.${keyof Semantic['surface']}`
  | `color.fill.${Exclude<keyof Semantic['color']['fill'], StateMixedFill>}`

/** Box's `bg` prop: the grammar's token paths, read from the token at that path. */
export const backgroundByPath: Record<BackgroundPath, string> = {
  'surface.base': surface.base,
  'surface.raised': surface.raised,
  'surface.scrim': surface.scrim,
  'color.fill.emphasis': color.fill.emphasis,
  'color.fill.muted': color.fill.muted,
  'color.fill.inverse': color.fill.inverse,
  'color.fill.accent': color.fill.accent,
  'color.fill.accent-hover': color.fill['accent-hover'],
  'color.fill.accent-pressed': color.fill['accent-pressed'],
  'color.fill.accent-muted': color.fill['accent-muted'],
  'color.fill.accent-muted-hover': color.fill['accent-muted-hover'],
  'color.fill.accent-muted-pressed': color.fill['accent-muted-pressed'],
  'color.fill.danger': color.fill.danger,
  'color.fill.danger-hover': color.fill['danger-hover'],
  'color.fill.danger-pressed': color.fill['danger-pressed'],
  'color.fill.danger-muted': color.fill['danger-muted'],
  'color.fill.success': color.fill.success,
  'color.fill.success-muted': color.fill['success-muted'],
  'color.fill.warning': color.fill.warning,
  'color.fill.warning-muted': color.fill['warning-muted'],
  'color.fill.serious': color.fill.serious,
  'color.fill.serious-muted': color.fill['serious-muted'],
  'color.fill.ai-muted': color.fill['ai-muted'],
  'color.fill.disabled': color.fill.disabled,
  'color.fill.default': color.fill.default,
  'color.fill.default-hover': color.fill['default-hover'],
  'color.fill.default-pressed': color.fill['default-pressed'],
  'color.fill.none': color.fill.none,
  'color.fill.none-hover': color.fill['none-hover'],
  'color.fill.none-pressed': color.fill['none-pressed'],
  'color.fill.inverse-none-hover': color.fill['inverse-none-hover'],
}

/** Box's `color` prop: text colours, old and new keys. */
export const textColorByKey: Record<keyof Semantic['color']['text'], string> = {
  default: color.text.default,
  emphasis: color.text.default,
  inverse: color.text.inverse,
  disabled: color.text.disabled,
  success: color.text.success,
  warning: color.text.warning,
  muted: color.text.muted,
  accent: color.text.accent,
  'accent-hover': color.text.accent,
  'accent-pressed': color.text.accent,
  danger: color.text.danger,
  serious: color.text.serious,
  ai: color.text.ai,
  subdued: color.text.muted,
  interactive: color.text.accent,
  'interactive-hover': color.text.accent,
  'interactive-active': color.text.accent,
  error: color.text.danger,
}

/** Box's border props: border colours, old and new keys. */
export const borderColorByKey: Record<keyof Semantic['color']['border'], string> = {
  default: color.border.default,
  success: color.border.success,
  warning: color.border.warning,
  none: color.border.none,
  emphasis: color.border.default,
  input: color.border.input,
  'input-hover': color.border['input-hover'],
  focus: color.border.focus,
  accent: color.border.accent,
  danger: color.border.danger,
  serious: color.border.serious,
  ai: color.border.ai,
  subtle: color.border.default,
  control: color.border.input,
  // `strong` split by use (0031); as a generic firm outline it is the hovered-input border
  strong: color.border['input-hover'],
  interactive: color.border.accent,
  error: color.border.danger,
}
