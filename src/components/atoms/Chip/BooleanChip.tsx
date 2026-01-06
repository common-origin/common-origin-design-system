import React from 'react'
import { Icon } from '../Icon'
import { BaseChipProps } from './shared/types'
import { StyledChip, IconContainer } from './shared/ChipBase'

export interface BooleanChipProps extends BaseChipProps {
  /** Whether the chip is in selected state */
  selected: boolean
  /** Callback function when the chip is clicked/toggled */
  onClick: () => void
}

/**
 * BooleanChip - Toggleable chip for quick filter controls
 * 
 * Use this component for multi-select filter controls where users can
 * see which options are active. Common in table filtering patterns where
 * users toggle filters on/off.
 * 
 * Features:
 * - Shows checkmark icon when selected
 * - Entire chip is clickable to toggle
 * - Keyboard activation with Space or Enter
 * - Uses checkbox role with aria-checked
 * - Visual background change when selected
 */
export const BooleanChip: React.FC<BooleanChipProps> = ({
  children,
  selected,
  onClick,
  size = 'medium',
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle activation with Space or Enter
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }
  
  return (
    <StyledChip
      $variant="subtle"
      $size={size}
      $disabled={disabled || undefined}
      $clickable={!disabled}
      $selected={selected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? undefined : 0}
      role="checkbox"
      aria-checked={selected ? 'true' : 'false'}
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
    </StyledChip>
  )
}
