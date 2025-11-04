import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

export type SelectableInputState = 'default' | 'error' | 'disabled'

interface StyledCheckboxInputProps {
  $state: SelectableInputState
  $checked: boolean
  $indeterminate?: boolean
}

/**
 * Hidden native checkbox input for accessibility
 * Maintains keyboard navigation and screen reader support
 */
export const HiddenCheckboxInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<StyledCheckboxInputProps>`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`

/**
 * Custom checkbox visual component
 * 24px × 24px for 8px grid alignment
 * Uses component.input.* tokens for consistency with TextField
 */
export const StyledCheckbox = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<StyledCheckboxInputProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  border-radius: ${tokens.component.input.default.borderRadius};
  border: ${tokens.component.input.default.borderWidth} solid;
  background-color: ${(props) =>
    props.$checked || props.$indeterminate
      ? tokens.semantic.color.background.interactive
      : tokens.component.input.default.backgroundColor};
  border-color: ${(props) => {
    if (props.$state === 'error') return tokens.component.input.error.borderColor
    if (props.$checked || props.$indeterminate)
      return tokens.semantic.color.background.interactive
    return tokens.component.input.default.borderColor
  }};
  cursor: ${(props) => (props.$state === 'disabled' ? 'not-allowed' : 'pointer')};
  transition: all 150ms ease-out;
  flex-shrink: 0;

  /* Hover state */
  ${HiddenCheckboxInput}:not(:disabled):hover + & {
    border-color: ${(props) =>
      props.$state === 'error'
        ? tokens.component.input.error.hover.borderColor
        : props.$checked || props.$indeterminate
          ? tokens.semantic.color.background.interactive
          : tokens.component.input.hover.borderColor};
  }

  /* Focus state */
  ${HiddenCheckboxInput}:focus-visible + & {
    outline: ${tokens.component.input.focus.outline};
    outline-offset: ${tokens.component.input.focus.outlineOffset};
    border-color: ${(props) =>
      props.$state === 'error'
        ? tokens.component.input.error.focus.borderColor
        : tokens.component.input.focus.borderColor};
  }

  /* Disabled state */
  ${(props) =>
    props.$state === 'disabled' &&
    `
    background-color: ${tokens.component.input.disabled.backgroundColor};
    border-color: ${tokens.component.input.disabled.borderColor};
  `}

  /* Checkmark icon */
  &::after {
    content: '';
    position: absolute;
    display: ${(props) => (props.$checked ? 'block' : 'none')};
    left: 4px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid ${tokens.semantic.color.text.inverse};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  /* Indeterminate icon (horizontal line) */
  &::before {
    content: '';
    position: absolute;
    display: ${(props) => (props.$indeterminate ? 'block' : 'none')};
    left: 4px;
    top: 8px;
    width: 10px;
    height: 2px;
    background-color: ${tokens.semantic.color.text.inverse};
  }
`

/**
 * Container for checkbox with proper spacing and alignment
 * 48px min-height for touch target (8px grid aligned)
 */
export const StyledCheckboxContainer = styled.label.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $disabled: boolean; $labelPosition: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.base.spacing[3]};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  min-height: 32px;
  flex-direction: ${(props) => (props.$labelPosition === 'left' ? 'row-reverse' : 'row')};
  user-select: none;
`

/**
 * Label text with proper typography
 */
export const StyledCheckboxLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $disabled: boolean }>`
  font: ${tokens.component.input.default.font};
  color: ${(props) =>
    props.$disabled
      ? tokens.component.input.disabled.textColor
      : tokens.component.input.default.textColor};
`
