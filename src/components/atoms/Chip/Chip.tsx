import React from 'react'
import { BaseChipProps, ChipVariant, LegacyVariant } from './shared/types'
import { StyledChip } from './shared/ChipBase'

export interface ChipProps extends BaseChipProps {
  /**
   * Visual style. Only `default` stays in 3.0. `emphasis`, `subtle`, `interactive`, `light`
   * and `dark` are deprecated and will be removed (decision 0016).
   * @default 'default'
   */
  variant?: ChipVariant | LegacyVariant
  /**
   * Click handler.
   * @deprecated Removed in 3.0: the static Chip is not interactive. For a clickable action use a
   * Button; for a toggle use `BooleanChip` (`FilterChip` in 3.0).
   */
  onClick?: () => void
  /** Custom ARIA role override */
  role?: string
  /** Legacy title prop for backward compatibility */
  title?: string
}

/**
 * Chip - a static, non-interactive label for tags, categories and metadata.
 *
 * Chips are classified by job (decision 0016):
 * - Chip: a static label (`default` variant only)
 * - InputChip: a removable value, such as an applied filter (formerly `FilterChip`)
 * - BooleanChip: toggles a filter on and off (becomes `FilterChip` in 3.0)
 *
 * The `emphasis`, `subtle`, `interactive`, `light` and `dark` variants and `onClick` are
 * deprecated and will be removed in 3.0.
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
    <StyledChip
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
    </StyledChip>
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
