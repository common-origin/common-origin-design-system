import React, { forwardRef, useId, InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import {
  HiddenCheckboxInput,
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledCheckboxLabel,
  type SelectableInputState,
} from './SelectableInputBase'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * The label text for the checkbox
   */
  label: string
  /**
   * Whether the checkbox is checked
   */
  checked?: boolean
  /**
   * Whether the checkbox is in an indeterminate state
   * Useful for "select all" scenarios where some but not all items are selected
   */
  indeterminate?: boolean
  /**
   * Position of the label relative to the checkbox
   * @default 'right'
   */
  labelPosition?: 'left' | 'right'
  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string
  /**
   * Error message to display. When provided, checkbox enters error state
   */
  error?: string
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean
  /**
   * Callback fired when the checkbox state changes
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Additional ARIA description for accessibility
   */
  'aria-describedby'?: string
}

const StyledFieldContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: ${tokens.base.spacing[1]};
`

const StyledHelperText = styled.span<{ $error?: boolean }>`
  font: ${tokens.semantic.typography.small};
  color: ${(props) =>
    props.$error
      ? tokens.semantic.color.text.error
      : tokens.semantic.color.text.subdued};
  margin-left: ${tokens.base.spacing[9]}; /* Align with label text after checkbox */
  display: block;
`

/**
 * Checkbox component for binary selection with WCAG 2.2 AA compliance
 *
 * Features:
 * - Custom styled checkbox with clear visual states
 * - Integrated label with configurable positioning
 * - Helper text and error messaging
 * - Indeterminate state support
 * - Full keyboard navigation (Space to toggle)
 * - ARIA attributes for screen readers
 * - 8px grid aligned (48px touch target)
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 *   required
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked = false,
      indeterminate = false,
      labelPosition = 'right',
      helperText,
      error,
      disabled = false,
      onChange,
      id: providedId,
      'aria-describedby': ariaDescribedby,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const helperTextId = `${id}-helper-text`
    const errorId = `${id}-error`

    // Determine the state for styling
    const state: SelectableInputState = disabled ? 'disabled' : error ? 'error' : 'default'

    // Set up ARIA describedby
    const describedBy = [
      ariaDescribedby,
      helperText ? helperTextId : undefined,
      error ? errorId : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    // Update indeterminate property on the input element
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <StyledFieldContainer>
        <StyledCheckboxContainer $disabled={disabled} $labelPosition={labelPosition}>
          <HiddenCheckboxInput
            ref={inputRef}
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-describedby={describedBy || undefined}
            aria-invalid={error ? true : undefined}
            $state={state}
            $checked={checked}
            $indeterminate={indeterminate}
            {...rest}
          />
          <StyledCheckbox
            $state={state}
            $checked={checked}
            $indeterminate={indeterminate}
            aria-hidden="true"
          />
          <StyledCheckboxLabel $disabled={disabled}>{label}</StyledCheckboxLabel>
        </StyledCheckboxContainer>

        {helperText && !error && (
          <StyledHelperText id={helperTextId}>{helperText}</StyledHelperText>
        )}

        {error && (
          <StyledHelperText id={errorId} $error role="alert" aria-live="polite">
            {error}
          </StyledHelperText>
        )}
      </StyledFieldContainer>
    )
  }
)

Checkbox.displayName = 'Checkbox'
