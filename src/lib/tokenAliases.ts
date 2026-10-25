import tokens from './cssTokens'
import type { Tokens } from '../types/tokens'

// Box's spacing and radius props keep their own names, which 3.0 decoupled from the removed
// spacing.layout and border.radius tokens (P7, #99), and read the semantic grammar's tokens
// (decision 0031). Each map covers every key the prop type allows, so TypeScript fails here if a
// key is added without a mapping.
const { semantic } = tokens
const { color, space, radius, surface } = semantic

type Semantic = Tokens['semantic']

/** Box's spacing values (`p`, `m`, `gap`…), each a `space` step, plus `auto`. */
export type BoxSpace =
  | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | '10xl' | '11xl'
  | 'auto'

/** Box's spacing props: each name maps to the space step that replaced its spacing.layout token. */
export const spaceByLayoutKey: Record<BoxSpace, string> = {
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
  // A keyword, not a step (0031)
  auto: semantic.spacing.layout.auto,
}

/** Box's `borderRadius` values: the `radius` steps, with `circle` for `full`. */
export type BoxRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'circle'

/** Box's `borderRadius` prop, read from `radius`. */
export const radiusByKey: Record<BoxRadius, string> = {
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

/**
 * Box's `bg` values in the semantic grammar (decision 0031, #304): the token's path below
 * `semantic`, such as `surface.raised` or `color.fill.muted`.
 */
export type BackgroundPath =
  | `surface.${keyof Semantic['surface']}`
  | `color.fill.${keyof Semantic['color']['fill']}`

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

/** Box's `color` prop: the text colours. */
export const textColorByKey: Record<keyof Semantic['color']['text'], string> = color.text

/** Box's border props: the border colours. */
export const borderColorByKey: Record<keyof Semantic['color']['border'], string> = color.border
