import styled from 'styled-components'
import tokens from '../../../../styles/tokens.json'
import { InternalStyledProps } from './types'
import { getVariantStyles, getSizeStyles, chipTokens } from './utils'

// Base styled component using direct prop interpolation like Button
export const StyledChip = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<InternalStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: max-content;
  border-radius: ${chipTokens.default.borderRadius};
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;
  transition: ${tokens.semantic.motion.hover};
  cursor: ${props => props.$disabled ? 'not-allowed' : (props.$clickable ? 'pointer' : 'default')};
  
  ${getVariantStyles}
  ${getSizeStyles}
  
  &:focus-visible {
    outline: ${chipTokens.focus.outline};
    outline-offset: ${chipTokens.focus.outlineOffset};
  }
`

// Icon container for selected indicator or leading icons
export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: ${tokens.semantic.spacing.layout.xs};
`

// Close button for dismissible chips
export const CloseButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: ${tokens.semantic.spacing.layout.sm};
  background: transparent;
  border: none;
  padding: 2px;
  border-radius: ${tokens.semantic.border.radius.xs};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  color: inherit;
  transition: ${tokens.semantic.motion.hover};
  
  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    color: ${tokens.semantic.color.text.disabled};
  }
  
  &:focus-visible {
    outline: ${chipTokens.focus.outline};
    outline-offset: ${chipTokens.focus.outlineOffset};
    border-radius: ${chipTokens.default.borderRadius};
  }
`
