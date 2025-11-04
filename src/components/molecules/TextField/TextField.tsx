import { ReactNode, InputHTMLAttributes, forwardRef, useId } from 'react'
import styled from 'styled-components'
import { StyledInputBase } from './InputBase'
import { Typography } from '../../atoms/Typography/Typography'
import { Stack } from '../../atoms/Stack/Stack'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

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

const StyledHelperText = styled.div<{ $hasError?: boolean }>`
  font: ${semantic.typography.caption};
  color: ${({ $hasError }) => 
    $hasError 
      ? semantic.color.text.error 
      : semantic.color.text.subdued
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
