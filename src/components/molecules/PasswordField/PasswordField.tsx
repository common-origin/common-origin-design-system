import { InputHTMLAttributes, forwardRef, useId, useState } from 'react'
import styled from 'styled-components'
import { StyledInputBase } from '../TextField/InputBase'
import { Typography } from '../../atoms/Typography/Typography'
import { IconButton } from '../../atoms/IconButton/IconButton'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Props for the PasswordField component
 */
export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
   * Unique identifier for the input
   * Generated automatically if not provided
   */
  id?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Whether to show the password visibility toggle button
   * @default true
   */
  showToggle?: boolean
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

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledToggleButton = styled.div`
  position: absolute;
  right: ${base.spacing[2]};
  top: 50%;
  transform: translateY(-50%);
`

/**
 * PasswordField component for secure password input with visibility toggle
 * 
 * @example
 * ```tsx
 * <PasswordField 
 *   label="Password" 
 *   helperText="Must be at least 8 characters"
 *   required
 * />
 * ```
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      helperText,
      error,
      required = false,
      disabled = false,
      id: providedId,
      'data-testid': dataTestId,
      showToggle = true,
      ...inputProps
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const generatedId = useId()
    const id = providedId || generatedId
    
    // Password visibility state
    const [showPassword, setShowPassword] = useState(false)
    
    // IDs for ARIA relationships
    const errorId = error ? `${id}-error` : undefined
    const helperId = helperText && !error ? `${id}-helper` : undefined
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined
    
    const hasError = Boolean(error)
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    
    return (
      <StyledFieldContainer>
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
        
        <StyledInputWrapper>
          <StyledInputBase
            ref={ref}
            id={id}
            type={showPassword ? 'text' : 'password'}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            $hasError={hasError}
            $disabled={disabled}
            data-testid={dataTestId}
            style={{ paddingRight: showToggle ? '3rem' : undefined }}
            {...inputProps}
          />
          
          {showToggle && (
            <StyledToggleButton>
              <IconButton
                variant="naked"
                size="small"
                iconName={showPassword ? 'viewHide' : 'view'}
                onClick={togglePasswordVisibility}
                disabled={disabled}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                type="button"
                tabIndex={-1}
              />
            </StyledToggleButton>
          )}
        </StyledInputWrapper>
        
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

PasswordField.displayName = 'PasswordField'
