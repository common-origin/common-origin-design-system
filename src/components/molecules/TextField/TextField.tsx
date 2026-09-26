import { InputHTMLAttributes, forwardRef, useId } from 'react'
import styled from 'styled-components'
import { StyledInputBase } from './InputBase'
import { Stack } from '../../atoms/Stack/Stack'
import tokens from '@/styles/tokens.json'

const { field } = tokens.component

/**
 * Props for the TextField component
 */
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'tel' | 'url' | 'search'
  
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
  gap: ${field.gap};
  width: 100%;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${field.label.gap};
  font: ${field.label.typography};
  color: ${field.label.color};

  &[data-disabled='true'] {
    color: ${field.label.colorDisabled};
  }
`

const StyledRequiredIndicator = styled.span`
  color: ${field.requiredIndicator.color};
  font-weight: ${field.requiredIndicator.fontWeight};
`

const StyledHelperText = styled.div<{ $hasError?: boolean }>`
  font: ${field.helperText.typography};
  color: ${({ $hasError }) =>
    $hasError
      ? field.helperText.colorError
      : field.helperText.color
  };
`

/**
 * TextField component for text input with label, helper text, and error states
 * 
 * @example
 * ```tsx
 * <TextField 
 *   label="Email" 
 *   type="email"
 *   helperText="We'll never share your email"
 *   required
 * />
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      type = 'text',
      id: providedId,
      'data-testid': dataTestId,
      ...inputProps
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const generatedId = useId()
    const id = providedId || generatedId
    
    // IDs for ARIA relationships
    const errorId = error ? `${id}-error` : undefined
    const helperId = helperText && !error ? `${id}-helper` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined
    
    const hasError = Boolean(error)
    
    return (
      <StyledFieldContainer data-testid={dataTestId}>
        {label && (
          <StyledLabel 
            htmlFor={id}
            data-disabled={disabled}
          >
            {label}
            {required && (
              <StyledRequiredIndicator aria-label="required">
                *
              </StyledRequiredIndicator>
            )}
          </StyledLabel>
        )}
        
        <StyledInputBase
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          $hasError={hasError}
          $disabled={disabled}
          {...inputProps}
        />
        
        {error && (
          <StyledHelperText
            id={errorId}
            role="alert"
            aria-live="polite"
            $hasError={true}
          >
            {error}
          </StyledHelperText>
        )}
        
        {helperText && !error && (
          <StyledHelperText id={helperId}>
            {helperText}
          </StyledHelperText>
        )}
      </StyledFieldContainer>
    )
  }
)

TextField.displayName = 'TextField'
