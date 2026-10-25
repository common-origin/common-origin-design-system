import React from 'react'

// Base props shared across all chip variants
export interface BaseChipProps {
  children?: React.ReactNode
  disabled?: boolean
  'data-testid'?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

/**
 * Visual variant of the static Chip. Chips are classified by job, not emphasis, so the static
 * Chip has only `default` (decision 0016).
 */
export type ChipVariant = 'default'

/**
 * Internal chip surfaces: `default` for the static Chip; `subtle` for the controls (FilterChip
 * and InputChip) before they're selected.
 */
export type ChipSurface = 'default' | 'subtle'

// Internal props for styled components with $ prefix
export interface InternalStyledProps {
  $surface: ChipSurface
  $disabled?: boolean
  $clickable?: boolean
  $selected?: boolean
}
