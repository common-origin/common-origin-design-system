import React from 'react'
import styled from 'styled-components'
import tokens from '../../../../styles/tokens.json'
import { InternalStyledProps } from './types'
import { getVariantStylesAsObject, getSizeStylesAsObject, chipTokens } from './utils'

// Base styled component using CSS variables to avoid prop leaking
export const BaseChipStyled = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: max-content;
  border-radius: ${chipTokens.default.borderRadius};
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;
  transition: ${tokens.semantic.motion.interactive};
  
  /* Use CSS custom properties set by wrapper */
  background-color: var(--chip-bg-color);
  color: var(--chip-text-color);
  font: var(--chip-font);
  padding: var(--chip-padding);
  opacity: var(--chip-opacity, 1);
  cursor: var(--chip-cursor, default);
  
  &:hover {
    opacity: var(--chip-hover-opacity, var(--chip-opacity, 1));
  }
  
  &:active {
    opacity: var(--chip-active-opacity, var(--chip-opacity, 1));
  }
  
  &:focus-visible {
    outline: 2px solid ${chipTokens.variants.interactive.backgroundColor};
    outline-offset: 2px;
  }
`

// Icon container for selected indicator or leading icons
export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: ${tokens.semantic.spacing.layout.sm};
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
  transition: ${tokens.semantic.motion.transition.fast};
  
  &:hover:not(:disabled) {
    opacity: 0.7;
  }
  
  &:active:not(:disabled) {
    opacity: 0.9;
  }
  
  &:focus-visible {
    outline: 2px solid ${chipTokens.variants.interactive.backgroundColor};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

// Wrapper component that applies styles via CSS custom properties
export const StyledChipWrapper: React.FC<React.PropsWithChildren<InternalStyledProps & React.HTMLAttributes<HTMLSpanElement>>> = ({
  $variant,
  $size,
  $disabled,
  $clickable,
  $selected,
  children,
  style,
  ...htmlProps
}) => {
  // Get styles for variant and size
  const variantStyles = getVariantStylesAsObject($variant, $selected)
  const sizeStyles = getSizeStylesAsObject($size)
  
  // Create CSS custom properties object
  const cssProps = {
    '--chip-bg-color': variantStyles.backgroundColor,
    '--chip-text-color': variantStyles.color,
    '--chip-font': sizeStyles.font,
    '--chip-padding': sizeStyles.padding,
    '--chip-opacity': $disabled ? '0.6' : '1',
    '--chip-cursor': $disabled ? 'not-allowed' : ($clickable ? 'pointer' : 'default'),
    '--chip-hover-opacity': $disabled ? '0.6' : ($clickable ? '0.8' : '1'),
    '--chip-active-opacity': $disabled ? '0.6' : ($clickable ? '0.9' : '1')
  }
  
  return (
    <BaseChipStyled
      style={{ ...cssProps, ...style }}
      {...htmlProps}
    >
      {children}
    </BaseChipStyled>
  )
}
