import React from 'react'
import { Icon } from '../Icon'
import { BaseChipProps } from './shared/types'
import { StyledChip, IconContainer } from './shared/ChipBase'

export interface FilterChipProps extends BaseChipProps {
  /** Whether the chip is in selected state */
  selected: boolean
  /** Callback function when the chip is clicked/toggled */
  onClick: () => void
}

/**
 * FilterChip - Toggleable chip for quick filter controls (decision 0016)
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
 * - Light-blue fill and blue text when selected and enabled; disabled colours when disabled
 *
 * Called `BooleanChip` before 3.0. For a removable value, use InputChip.
 */
export const FilterChip: React.FC<FilterChipProps> = ({
  children,
  selected,
  onClick,
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const handleClick = () => {
    // Optional call: a plain JavaScript app that kept the pre-3.0 FilterChip (now InputChip) passes
    // no onClick, and its chip should stay inert rather than throw
    if (!disabled) {
      onClick?.()
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
      $surface="subtle"
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
          <Icon name="check" size="sm" iconColor="inherit" />
        </IconContainer>
      )}
      
      {children}
    </StyledChip>
  )
}
