import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { component: { input } } = tokens

/**
 * Shared input states for text-based form controls
 */
export type InputState = 'default' | 'focus' | 'error' | 'disabled'

/**
 * Base styled input component with all common styling
 * Reusable across TextField, TextArea, PasswordInput, NumberInput
 */
interface StyledInputBaseProps {
  $hasError?: boolean
  $disabled?: boolean
}

export const StyledInputBase = styled.input.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledInputBaseProps>`
  /* Typography */
  font: ${input.default.font};
  color: ${({ $disabled }) => 
    $disabled 
      ? input.disabled.textColor 
      : input.default.textColor
  };
  
  /* Layout */
  width: 100%;
  padding: ${input.default.paddingY} ${input.default.paddingX};
  
  /* Visual styling */
  background-color: ${({ $disabled }) => 
    $disabled 
      ? input.disabled.backgroundColor 
      : input.default.backgroundColor
  };
  
  border: ${input.default.borderWidth} solid ${({ $hasError, $disabled }) => {
    if ($disabled) return input.disabled.borderColor
    if ($hasError) return input.error.borderColor
    return input.default.borderColor
  }};
  
  border-radius: ${input.default.borderRadius};
  
  /* Remove default appearance */
  appearance: none;
  outline: none;
  
  /* Transitions */
  transition: border-color 200ms ease-in-out, 
              outline 200ms ease-in-out;
  
  /* Placeholder */
  &::placeholder {
    color: ${input.placeholder.textColor};
    opacity: 1;
  }
  
  /* Focus state */
  &:focus {
    border-color: ${({ $hasError }) => 
      $hasError 
        ? input.error.focus.borderColor 
        : input.focus.borderColor
    };
    outline: ${input.focus.outline};
    outline-offset: ${input.focus.outlineOffset};
  }
  
  /* Hover state (only when not disabled) */
  &:hover:not(:disabled) {
    border-color: ${({ $hasError }) => 
      $hasError 
        ? input.error.hover.borderColor 
        : input.hover.borderColor
    };
  }
  
  /* Disabled state */
  &:disabled {
    cursor: ${input.disabled.cursor};
  }
  
  /* Remove number input spinners */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

/**
 * Base styled textarea with shared styling
 */
export const StyledTextAreaBase = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledInputBaseProps>`
  /* Inherit all input base styles */
  ${StyledInputBase}
  
  /* TextArea specific */
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;
`
