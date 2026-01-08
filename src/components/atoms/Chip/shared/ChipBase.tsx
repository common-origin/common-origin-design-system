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
  opacity: ${props => props.$disabled ? '0.6' : '1'};
  
  ${getVariantStyles}
  ${getSizeStyles}
  
  &:hover {
    opacity: ${props => props.$disabled ? '0.6' : (props.$clickable ? '0.8' : '1')};
  }
  
  &:active {
    opacity: ${props => props.$disabled ? '0.6' : (props.$clickable ? '0.9' : '1')};
  }
  
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
  padding: 0;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? '0.6' : '1'};
  color: inherit;
  transition: ${tokens.semantic.motion.hover};
  
  &:hover:not(:disabled) {
    opacity: 0.7;
  }
  
  &:active:not(:disabled) {
    opacity: 0.9;
  }
  
  &:focus-visible {
    outline: ${chipTokens.focus.outline};
    outline-offset: ${chipTokens.focus.outlineOffset};
    border-radius: ${chipTokens.default.borderRadius};
  }
`
