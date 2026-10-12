import tokens from '../styles/tokens.json'
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

/** Box's `bg` prop: the old background keys, read from `surface` and `color.fill`. */
export const backgroundByKey: Record<keyof Semantic['color']['background'], string> = {
  default: surface.base,
  page: surface.base,
  subtle: surface.raised,
  overlay: surface.scrim,
  emphasis: color.fill.emphasis,
  'emphasis-hover': color.fill['emphasis-hover'],
  'emphasis-active': color.fill['emphasis-pressed'],
  surface: color.fill.muted,
  inverse: color.fill.inverse,
  interactive: color.fill.accent,
  'interactive-hover': color.fill['accent-hover'],
  'interactive-active': color.fill['accent-pressed'],
  'interactive-subtle': color.fill['accent-muted'],
  'interactive-subtle-hover': color.fill['accent-muted-hover'],
  'interactive-subtle-active': color.fill['accent-muted-pressed'],
  error: color.fill.danger,
  'error-hover': color.fill['danger-hover'],
  'error-active': color.fill['danger-pressed'],
  'error-subtle': color.fill['danger-muted'],
  success: color.fill.success,
  'success-subtle': color.fill['success-muted'],
  warning: color.fill.warning,
  'warning-subtle': color.fill['warning-muted'],
  disabled: color.fill.disabled,
  neutral: color.fill.default,
  'neutral-hover': color.fill['default-hover'],
  'neutral-active': color.fill['default-pressed'],
  transparent: color.fill.none,
  'hover-overlay': color.fill['none-hover'],
  'active-overlay': color.fill['none-pressed'],
  'inverse-overlay': color.fill['inverse-none-hover'],
  // Moved to the component tier (decision 0031 §6)
  progressTrack: tokens.component.track.background,
}

/** Box's `color` prop: text colours, old and new keys. */
export const textColorByKey: Record<keyof Semantic['color']['text'], string> = {
  default: color.text.default,
  emphasis: color.text.emphasis,
  inverse: color.text.inverse,
  disabled: color.text.disabled,
  success: color.text.success,
  warning: color.text.warning,
  muted: color.text.muted,
  accent: color.text.accent,
  'accent-hover': color.text['accent-hover'],
  'accent-pressed': color.text['accent-pressed'],
  danger: color.text.danger,
  subdued: color.text.muted,
  interactive: color.text.accent,
  'interactive-hover': color.text['accent-hover'],
  'interactive-active': color.text['accent-pressed'],
  error: color.text.danger,
}

/** Box's border props: border colours, old and new keys. */
export const borderColorByKey: Record<keyof Semantic['color']['border'], string> = {
  default: color.border.default,
  success: color.border.success,
  warning: color.border.warning,
  none: color.border.none,
  emphasis: color.border.emphasis,
  input: color.border.input,
  'input-hover': color.border['input-hover'],
  focus: color.border.focus,
  accent: color.border.accent,
  danger: color.border.danger,
  subtle: color.border.emphasis,
  control: color.border.input,
  // `strong` split by use (0031); as a generic firm outline it is the hovered-input border
  strong: color.border['input-hover'],
  interactive: color.border.accent,
  error: color.border.danger,
}
