import React from 'react'
import { BaseChipProps, ChipVariant, LegacyVariant } from './shared/types'
import { StyledChipWrapper } from './shared/ChipBase'

export interface ChipProps extends BaseChipProps {
  /** Visual style variant */
  variant?: ChipVariant | LegacyVariant
  /** Click handler for interactive chips */
  onClick?: () => void
  /** Custom ARIA role override */
  role?: string
  /** Legacy title prop for backward compatibility */
  title?: string
}

/**
 * Chip - Compact element for displaying tags, categories, and labels
 * 
 * Use this component for static display chips or simple interactive chips.
 * For specialized filtering patterns, use:
 * - FilterChip: Dismissible chips for showing applied filters
 * - BooleanChip: Toggleable chips for quick filter controls
 * 
 * Variants:
 * - default: Standard gray background
 * - emphasis: High-contrast dark background
 * - subtle: Light background for secondary info
 * - interactive: Blue background with hover states
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  onClick,
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  title,
  ...props
}) => {
  const isClickable = Boolean(onClick && !disabled)
  
  // Map legacy variants to new variants
  const normalizedVariant: ChipVariant = 
    variant === 'light' ? 'default' :
    variant === 'dark' ? 'emphasis' :
    variant as ChipVariant
  
  // Support legacy title prop
  const content = children !== undefined ? children : title
  
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick()
    }
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      handleClick()
    }
  }
  
  return (
    <StyledChipWrapper
      $variant={normalizedVariant}
      $size={size}
      $disabled={disabled || undefined}
      $clickable={isClickable || undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      role={role || (isClickable ? 'button' : undefined)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled ? 'true' : undefined}
      data-testid={dataTestId}
      {...props}
    >
      {content}
    </StyledChipWrapper>
  )
}

// Legacy component for backward compatibility
export interface LegacyChipProps {
  title: string
  variant?: LegacyVariant
}

export const LegacyChip: React.FC<LegacyChipProps> = ({ title, variant = 'light' }) => {
  const newVariant = variant === 'dark' ? 'emphasis' : 'default'
  return <Chip variant={newVariant}>{title}</Chip>
}
