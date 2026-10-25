import React from 'react'
import { BaseChipProps, ChipVariant } from './shared/types'
import { StyledChip } from './shared/ChipBase'

export interface ChipProps extends BaseChipProps {
  /**
   * Visual style. The static Chip has one, `default` (decision 0016).
   * @default 'default'
   */
  variant?: ChipVariant
  /** Custom ARIA role override */
  role?: string
  /** Legacy title prop for backward compatibility */
  title?: string
}

/**
 * Chip - a static, non-interactive label for tags, categories and metadata.
 *
 * Chips are classified by job (decision 0016):
 * - Chip: a static label
 * - FilterChip: toggles a filter on and off
 * - InputChip: a removable value, such as an applied filter
 * - SuggestionChip: fills the agent input with a suggestion
 *
 * For a clickable action, use a Button.
 */
export const Chip: React.FC<ChipProps> = ({
  children,
  // One variant: a removed one passed from plain JavaScript renders as default
  variant: _variant,
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  title,
  ...props
}) => {
  // Removed props passed from plain JavaScript stay off the DOM
  const { onClick: _onClick, size: _size, ...domProps } = props as typeof props & { onClick?: unknown; size?: unknown }

  // Support legacy title prop
  const content = children !== undefined ? children : title

  return (
    <StyledChip
      $surface="default"
      $disabled={disabled || undefined}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled ? 'true' : undefined}
      data-testid={dataTestId}
      {...domProps}
    >
      {content}
    </StyledChip>
  )
}
