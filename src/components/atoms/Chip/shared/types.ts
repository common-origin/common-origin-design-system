import React from 'react'

// Base props shared across all chip variants
export interface BaseChipProps {
  children?: React.ReactNode
  size?: 'small' | 'medium'
  disabled?: boolean
  'data-testid'?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

/**
 * Visual variants for the static Chip. Only `default` stays in 3.0 (decision 0016):
 * chips are classified by job, not emphasis.
 */
export type ChipVariant =
  | 'default'
  /** @deprecated Removed in 3.0. Chips have no emphasis levels; use `default`. */
  | 'emphasis'
  /** @deprecated Removed in 3.0. Use `default`. */
  | 'subtle'
  /** @deprecated Removed in 3.0. For a clickable action use a Button; for a toggle use `BooleanChip` (`FilterChip` in 3.0). */
  | 'interactive'

// Internal props for styled components with $ prefix
export interface InternalStyledProps {
  $variant: ChipVariant
  $size: BaseChipProps['size']
  $disabled?: boolean
  $clickable?: boolean
  $selected?: boolean
}

/**
 * Legacy Chip variants.
 * @deprecated Removed in 3.0. `light` is the same as `default`; `dark` maps to the deprecated `emphasis`. Use `default`.
 */
export type LegacyVariant = 'light' | 'dark'
