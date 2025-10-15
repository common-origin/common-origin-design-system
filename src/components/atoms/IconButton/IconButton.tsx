import React from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon'
import tokens from '@/styles/tokens.json'
import iconsData from '@/styles/icons.json'

const { semantic: { motion }, component: { iconButton } } = tokens

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant: 'primary' | 'secondary' | 'naked'
  size?: 'small' | 'medium' | 'large'
  iconName: keyof typeof iconsData
  url?: string
  onClick?: () => void
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
  shouldForwardProp: (prop) => !['$variant', '$size'].includes(prop)
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

  &:hover {
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

  &:active {
    background-color: ${iconButton.active.backgroundColor};
  }

  &:focus {
    outline: ${iconButton.focus.outline};
    outline-offset: ${iconButton.focus.outlineOffset};
  }

  &:disabled {
    background-color: ${iconButton.disabled.backgroundColor};
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
    // Prevent default if disabled
    if (disabled) {
      event.preventDefault()
      return
    }

    if (onClick) {
      onClick()
    } else if (url && url.trim() !== '') {
      // Use proper navigation instead of direct href assignment
      if (url.startsWith('http') || url.startsWith('//')) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        window.location.assign(url)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Handle keyboard activation (Enter and Space)
    if (disabled) return
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(event as any)
    }
  }

  const iconSize = size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md'
  
  const getIconColor = (variant: 'primary' | 'secondary' | 'naked') => {
    switch (variant) {
      case 'primary':
        return 'inverse'
      case 'secondary':
        return 'default'
      case 'naked':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <IconButtonStyled 
      $variant={variant} 
      $size={size} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type={type}
      role="button"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-testid={dataTestId}
      {...htmlProps}
    >
      <Icon 
        name={iconName} 
        size={iconSize} 
        iconColor={getIconColor(variant)}
        aria-hidden="true" // Hide icon from screen readers since button has aria-label
      />
    </IconButtonStyled>
  )
}
