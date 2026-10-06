import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { component: { input }, semantic } = tokens

// Spacing comes from the semantic scales: no component spacing tokens (decision 0022).
// The 11px vertical padding is off-grid and keeps its deprecated token until #129.

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
  padding: ${input.default.paddingY} ${semantic.spacing.component.lg};
  
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
  transition: border-color ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut},
              outline ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut};
  
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
    outline-offset: ${semantic.border.focusOffset};
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
    cursor: not-allowed;
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
  min-height: ${tokens.component.input.textarea.minHeight};
  resize: vertical;
  font-family: inherit;
  line-height: ${tokens.semantic.lineHeight.normal};
`
