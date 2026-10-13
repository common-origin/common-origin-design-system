import styled from 'styled-components'
import tokens from '../../../../styles/tokens.json'
import { InternalStyledProps } from './types'
import { getVariantStyles, sizeStyles } from './utils'
import { forcedColors, forcedColorsEdge } from '../../../../lib/styleUtils'

const { component: { chip }, semantic } = tokens

// Base styled component using direct prop interpolation like Button
export const StyledChip = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<InternalStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: max-content;
  border-radius: ${chip.default.borderRadius};
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;
  transition: ${semantic.motion.transition.feedback};
  cursor: ${props => props.$disabled ? 'not-allowed' : (props.$clickable ? 'pointer' : 'default')};
  
  /* Forced colours: an edge, and GrayText when disabled, since a span gets no system disabled
     colour (decision 0038). Before the variant styles, so a selected chip's Highlight border wins. */
  ${forcedColorsEdge}
  ${props => props.$disabled ? `${forcedColors} { color: GrayText; }` : ''}

  ${getVariantStyles}
  ${sizeStyles}
  
  &:focus-visible {
    outline: ${chip.focus.outline};
    outline-offset: ${semantic.border.focusOffset};
  }

`

// Icon container for selected indicator or leading icons
export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: ${tokens.semantic.space[100]};
`

// Close button for dismissible chips
export const CloseButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: ${tokens.semantic.space[200]};
  background: transparent;
  border: none;
  width: ${chip.closeButton.size};
  height: ${chip.closeButton.size};
  padding: ${tokens.semantic.space[0]};
  border-radius: ${tokens.semantic.radius.xs};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  color: inherit;
  transition: ${semantic.motion.transition.feedback};
  
  &:hover:not(:disabled) {
    background-color: ${tokens.semantic.color.fill['none-hover']};
  }
  
  &:active:not(:disabled) {
    background-color: ${tokens.semantic.color.fill['none-pressed']};
  }
  
  &:disabled {
    color: ${tokens.semantic.color.text.disabled};
  }
  
  &:focus-visible {
    outline: ${chip.focus.outline};
    outline-offset: ${semantic.border.focusOffset};
    border-radius: ${chip.default.borderRadius};
  }
`
