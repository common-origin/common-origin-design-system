import React from 'react'
import styled from 'styled-components'
import { Icon, type IconName } from '../Icon'
import tokens from '@/styles/tokens.json'

const { semantic: { motion }, component: { iconButton, button } } = tokens

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'naked'
  size?: 'small' | 'medium' | 'large'
  iconName: IconName
  url?: string
  // Accessibility props
  'aria-label': string // Required for screen readers
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-pressed'?: boolean
  'data-testid'?: string
}

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'naked'
  $size: 'small' | 'medium' | 'large'
}

const IconButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledButtonProps>`
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return iconButton.primary.backgroundColor
      case 'secondary':
        return iconButton.variants.secondary.backgroundColor
      case 'naked':
        return iconButton.variants.naked.backgroundColor
      default:
        return iconButton.primary.backgroundColor
    }
  }};
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return button.primary.textColor
      case 'secondary':
        return button.variants.secondary.textColor
      case 'naked':
        return button.variants.naked.textColor
      default:
        return button.primary.textColor
    }
  }};
  border: none;
  border-radius: ${iconButton.primary.borderRadius};
  transition: ${motion.transition.normal};
  box-sizing: border-box;
  display: ${iconButton.primary.display};
  justify-content: ${iconButton.primary.justifyContent};
  align-items: ${iconButton.primary.alignItems};
  height: max-content;
  cursor: pointer;
  position: relative;

  /* Size-specific dimensions from component tokens */
  min-width: ${({ $size }) => iconButton.sizes[$size].minWidth};
  min-height: ${({ $size }) => iconButton.sizes[$size].minHeight};
  padding: ${({ $size }) => iconButton.sizes[$size].padding};

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) => {
      switch ($variant) {
        case 'primary':
          return iconButton.hover.backgroundColor
        case 'secondary':
          return iconButton.variants.secondary.hover.backgroundColor
        case 'naked':
          return iconButton.variants.naked.hover.backgroundColor
        default:
          return iconButton.hover.backgroundColor
      }
    }};
  }

  &:active:not(:disabled) {
    background-color: ${iconButton.active.backgroundColor};
  }

  &:focus {
    outline: ${iconButton.focus.outline};
    outline-offset: ${iconButton.focus.outlineOffset};
  }

  &:disabled {
    background-color: ${iconButton.disabled.backgroundColor};
    color: ${({ $variant }) => {
      switch ($variant) {
        case 'primary':
          return button.disabled.textColor
        case 'secondary':
          return button.variants.secondary.disabled.textColor
        case 'naked':
          return button.variants.naked.disabled.textColor
        default:
          return button.disabled.textColor
      }
    }};
    cursor: not-allowed;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border: 1px solid;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const IconButton: React.FC<IconButtonProps> = ({ 
  variant, 
  size = 'medium', 
  url, 
  iconName = 'close',
  onClick,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  'data-testid': dataTestId,
  disabled,
  type = 'button',
  ...htmlProps 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event)
    } else if (url && url.trim() !== '') {
      // Use proper navigation instead of direct href assignment
      if (url.startsWith('http') || url.startsWith('//')) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.assign(url)
      }
    }
  }

  const iconSize = size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md'
  
  return (
    <IconButtonStyled 
      $variant={variant} 
      $size={size} 
      onClick={handleClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      data-testid={dataTestId}
      {...htmlProps}
    >
      <Icon 
        name={iconName} 
        size={iconSize} 
        iconColor="inherit"
        aria-hidden="true" // Hide icon from screen readers since button has aria-label
      />
    </IconButtonStyled>
  )
}
