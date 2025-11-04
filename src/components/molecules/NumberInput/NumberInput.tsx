import { InputHTMLAttributes, forwardRef, useId, useState, useCallback, ChangeEvent, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { StyledInputBase } from '../TextField/InputBase'
import { Typography } from '../../atoms/Typography/Typography'
import { IconButton } from '../../atoms/IconButton/IconButton'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Props for the NumberInput component
 */
export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  /**
   * Label text for the input
   */
  label?: string
  
  /**
   * Helper text displayed below the input
   */
  helperText?: string
  
  /**
   * Error message to display
   */
  error?: string
  
  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean
  
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Minimum allowed value
   */
  min?: number
  
  /**
   * Maximum allowed value
   */
  max?: number
  
  /**
   * Step increment/decrement value
   * @default 1
   */
  step?: number
  
  /**
   * Current value (controlled)
   */
  value?: number | ''
  
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: number | ''
  
  /**
   * Callback fired when value changes
   */
  onChange?: (value: number | '', event: ChangeEvent<HTMLInputElement>) => void
  
  /**
   * Unique identifier for the input
   * Generated automatically if not provided
   */
  id?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${base.spacing[2]};
  width: 100%;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${base.spacing[1]};
  font: ${semantic.typography.label};
  color: ${semantic.color.text.default};
  
  &[data-disabled='true'] {
    color: ${semantic.color.text.disabled};
  }
`

const StyledRequiredIndicator = styled.span`
  color: ${semantic.color.text.error};
  font-weight: ${base.fontWeight[5]};
`

const StyledInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledNumberInput = styled(StyledInputBase)`
  /* Add padding on the right to make room for stepper buttons */
  padding-right: ${base.spacing[10]};
`

const StyledStepperContainer = styled.div`
  position: absolute;
  right: ${base.spacing[2]};
  display: flex;
  flex-direction: row;
  gap: ${base.spacing[2]};
`

const StyledHelperText = styled.div<{ $isError?: boolean }>`
  font: ${semantic.typography.small};
  color: ${({ $isError }) => 
    $isError 
      ? semantic.color.text.error 
      : semantic.color.text.subdued
  };
`

/**
 * NumberInput component for numeric input with stepper buttons and WCAG 2.2 AA compliance
 * 
 * Features:
 * - Stepper buttons for increment/decrement
 * - Keyboard arrow up/down support
 * - Min/max value constraints
 * - Custom step values
 * - Decimal and integer support
 * - Full accessibility with ARIA attributes
 * 
 * @example
 * ```tsx
 * <NumberInput 
 *   label="Quantity"
 *   min={0}
 *   max={100}
 *   step={1}
 *   value={value}
 *   onChange={(newValue) => setValue(newValue)}
 * />
 * ```
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      min,
      max,
      step = 1,
      value,
      defaultValue,
      onChange,
      id: providedId,
      'data-testid': testId,
      placeholder,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const helperId = `${id}-helper`
    const errorId = `${id}-error`
    
    // Parse string value to number or empty string
    const parseValue = useCallback((val: string): number | '' => {
      if (val === '' || val === '-') return ''
      const parsed = parseFloat(val)
      return isNaN(parsed) ? '' : parsed
    }, [])
    
    // Format number to string for display
    const formatValue = useCallback((val: number | ''): string => {
      return val === '' ? '' : String(val)
    }, [])
    
    // Handle increment
    const handleIncrement = useCallback(() => {
      if (disabled) return
      
      const inputElement = (ref as React.RefObject<HTMLInputElement>)?.current
      const currentValue = value !== undefined ? value : parseValue(inputElement?.value || '')
      const numValue = currentValue === '' ? (min !== undefined ? min : 0) : currentValue
      const newValue = numValue + step
      
      // Check max constraint
      if (max !== undefined && newValue > max) return
      
      // Update input value directly for both controlled and uncontrolled
      if (inputElement) {
        inputElement.value = String(newValue)
      }
      
      // Create synthetic event
      const syntheticEvent = {
        target: inputElement || { value: String(newValue) },
        currentTarget: inputElement || { value: String(newValue) }
      } as ChangeEvent<HTMLInputElement>
      
      onChange?.(newValue, syntheticEvent)
    }, [disabled, value, min, max, step, onChange, parseValue, ref])
    
    // Handle decrement
    const handleDecrement = useCallback(() => {
      if (disabled) return
      
      const inputElement = (ref as React.RefObject<HTMLInputElement>)?.current
      const currentValue = value !== undefined ? value : parseValue(inputElement?.value || '')
      const numValue = currentValue === '' ? (max !== undefined ? max : 0) : currentValue
      const newValue = numValue - step
      
      // Check min constraint
      if (min !== undefined && newValue < min) return
      
      // Update input value directly for both controlled and uncontrolled
      if (inputElement) {
        inputElement.value = String(newValue)
      }
      
      // Create synthetic event
      const syntheticEvent = {
        target: inputElement || { value: String(newValue) },
        currentTarget: inputElement || { value: String(newValue) }
      } as ChangeEvent<HTMLInputElement>
      
      onChange?.(newValue, syntheticEvent)
    }, [disabled, value, min, max, step, onChange, parseValue, ref])
    
    // Handle input change
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Allow empty, negative sign, or valid number (including decimals)
      if (inputValue === '' || inputValue === '-' || /^-?\d*\.?\d*$/.test(inputValue)) {
        const parsedValue = parseValue(inputValue)
        onChange?.(parsedValue, e)
      } else {
        // Prevent invalid input by not updating
        e.preventDefault()
        e.target.value = formatValue(value !== undefined ? value : '')
      }
    }, [onChange, parseValue, value, formatValue])
    
    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrement()
      }
    }, [handleIncrement, handleDecrement])
    
    // Check if buttons should be disabled
    const isIncrementDisabled = disabled || (max !== undefined && value !== '' && typeof value === 'number' && value >= max)
    const isDecrementDisabled = disabled || (min !== undefined && value !== '' && typeof value === 'number' && value <= min)
    
    // Build aria-describedby
    const ariaDescribedByIds = [
      ariaDescribedBy,
      helperText ? helperId : null,
      error ? errorId : null,
    ].filter(Boolean).join(' ') || undefined
    
    return (
      <StyledFieldContainer>
        {label && (
          <StyledLabel 
            htmlFor={id}
            data-disabled={disabled}
          >
            {label}
            {required && <StyledRequiredIndicator aria-label="required">*</StyledRequiredIndicator>}
          </StyledLabel>
        )}
        
        <StyledInputWrapper>
          <StyledNumberInput
            ref={ref}
            id={id}
            type="text"
            inputMode="decimal"
            value={value !== undefined ? formatValue(value) : undefined}
            defaultValue={defaultValue !== undefined ? formatValue(defaultValue) : undefined}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            $hasError={!!error}
            $disabled={disabled}
            aria-label={ariaLabel || label}
            aria-invalid={!!error}
            aria-describedby={ariaDescribedByIds}
            aria-required={required}
            data-testid={testId}
            role="spinbutton"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={typeof value === 'number' ? value : undefined}
            {...rest}
          />
          
          <StyledStepperContainer>
            <IconButton
              iconName="caretUp"
              variant="secondary"
              size="small"
              onClick={handleIncrement}
              disabled={isIncrementDisabled}
              aria-label="Increment value"
              tabIndex={-1}
              type="button"
            />
            <IconButton
              iconName="caretDown"
              variant="secondary"
              size="small"
              onClick={handleDecrement}
              disabled={isDecrementDisabled}
              aria-label="Decrement value"
              tabIndex={-1}
              type="button"
            />
          </StyledStepperContainer>
        </StyledInputWrapper>
        
        {(helperText || error) && (
          <StyledHelperText 
            id={error ? errorId : helperId}
            $isError={!!error}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error || helperText}
          </StyledHelperText>
        )}
      </StyledFieldContainer>
    )
  }
)

NumberInput.displayName = 'NumberInput'
