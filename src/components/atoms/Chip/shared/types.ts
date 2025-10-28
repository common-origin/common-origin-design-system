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

// Visual variants for standard chips
export type ChipVariant = 'default' | 'emphasis' | 'subtle' | 'interactive'

// Internal props for styled components with $ prefix
export interface InternalStyledProps {
  $variant: ChipVariant
  $size: BaseChipProps['size']
  $disabled?: boolean
  $clickable?: boolean
  $selected?: boolean
}

// Legacy variant mapping
export type LegacyVariant = 'light' | 'dark'
