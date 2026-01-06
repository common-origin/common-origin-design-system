import React from 'react'
import { Icon } from '../Icon'
import { BaseChipProps } from './shared/types'
import { StyledChip, IconContainer, CloseButton } from './shared/ChipBase'

export interface FilterChipProps extends BaseChipProps {
  /** Whether the filter is in selected/applied state */
  selected?: boolean
  /** Callback function when the chip is dismissed via close button or keyboard */
  onDismiss?: () => void
  /** Custom ARIA role override */
  role?: string
}

/**
 * FilterChip - Chip for displaying filters with selected state and optional dismissal
 * 
 * Use this component to show filters that can be selected/deselected.
 * When selected, displays a checkmark and light blue background.
 * Optionally dismissible when onDismiss is provided.
 * 
 * Features:
 * - Shows checkmark icon when selected
 * - Light blue background when selected
 * - Optional close (×) button when onDismiss is provided
 * - Keyboard dismissal with Delete or Backspace keys (when dismissible)
 * - Non-clickable body (only close button is interactive when present)
 * - Uses subtle/interactive background styling based on selected state
 * - Announces as "status" to screen readers
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  children,
  selected = false,
  onDismiss,
  size = 'medium',
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  ...props
}) => {
  const isDismissible = Boolean(onDismiss)
  
  const handleDismiss = (event: React.MouseEvent) => {
    event.stopPropagation() // Prevent event bubbling
    if (!disabled && onDismiss) {
      onDismiss()
    }
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle dismiss with Delete or Backspace (only when dismissible)
    if (!disabled && isDismissible && onDismiss && (event.key === 'Delete' || event.key === 'Backspace')) {
      event.preventDefault()
      onDismiss()
    }
  }
  
  const handleCloseKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!disabled && onDismiss) onDismiss()
    }
  }
  
  // Generate accessible label for close button
  const closeButtonLabel = typeof children === 'string' ? `Remove ${children}` : 'Remove filter'
  
  return (
    <StyledChip
      $variant="subtle"
      $size={size}
      $disabled={disabled || undefined}
      $clickable={false}
      $selected={selected}
      onKeyDown={handleKeyDown}
      role={role || 'status'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled ? 'true' : undefined}
      data-testid={dataTestId}
      {...props}
    >
      {/* Show selected indicator when selected */}
      {selected && (
        <IconContainer aria-hidden="true">
          <Icon name="check" size="sm" />
        </IconContainer>
      )}
      
      {children}
      
      {/* Show close button only when dismissible */}
      {isDismissible && (
        <CloseButton
          type="button"
          onClick={handleDismiss}
          onKeyDown={handleCloseKeyDown}
          disabled={disabled}
          $disabled={disabled}
          aria-label={closeButtonLabel}
          tabIndex={0}
          data-testid={dataTestId ? `${dataTestId}-close` : undefined}
        >
          <Icon name="close" size="sm" />
        </CloseButton>
      )}
    </StyledChip>
  )
}
