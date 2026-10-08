import React from 'react'
import styled from 'styled-components'
import { Icon, type IconName } from '../Icon'
import tokens from '@/styles/tokens.json'

const { semantic: { motion, border, spacing }, component: { iconButton, button } } = tokens

// Padding comes from the semantic spacing scale: no component spacing tokens (decision 0022)
const padding = {
  small: spacing.component.xs,
  medium: spacing.component.sm,
  large: spacing.component.md,
} as const

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

// Colours and motion come from Button's tokens, so IconButton's variants look and behave exactly like
// Button's in every state (#130). Only the size and the icon differ
const variants = {
  primary: {
    bg: button.primary.backgroundColor,
    text: button.primary.textColor,
    hoverBg: button.hover.backgroundColor,
    activeBg: button.active.backgroundColor,
    disabledBg: button.disabled.backgroundColor,
    disabledText: button.disabled.textColor,
  },
  secondary: {
    bg: button.variants.secondary.backgroundColor,
    text: button.variants.secondary.textColor,
    hoverBg: button.variants.secondary.hover.backgroundColor,
    activeBg: button.variants.secondary.active.backgroundColor,
    disabledBg: button.variants.secondary.disabled.backgroundColor,
    disabledText: button.variants.secondary.disabled.textColor,
  },
  naked: {
    bg: button.variants.naked.backgroundColor,
    text: button.variants.naked.textColor,
    hoverBg: button.variants.naked.hover.backgroundColor,
    activeBg: button.variants.naked.active.backgroundColor,
    disabledBg: button.variants.naked.disabled.backgroundColor,
    disabledText: button.variants.naked.disabled.textColor,
  },
} as const

// JavaScript callers can pass any string, so an unknown variant falls back to primary, as before
const colours = (variant: StyledButtonProps['$variant']) => variants[variant] ?? variants.primary

const IconButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledButtonProps>`
  background-color: ${({ $variant }) => colours($variant).bg};
  color: ${({ $variant }) => colours($variant).text};
  border: none;
  border-radius: ${iconButton.primary.borderRadius};
  transition: ${motion.hover};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  cursor: pointer;
  position: relative;

  /* Size-specific dimensions from component tokens */
  min-width: ${({ $size }) => iconButton.sizes[$size].minWidth};
  min-height: ${({ $size }) => iconButton.sizes[$size].minHeight};
  padding: ${({ $size }) => padding[$size]};

  &:hover:not(:disabled) {
    background-color: ${({ $variant }) => colours($variant).hoverBg};
  }

  &:active:not(:disabled) {
    background-color: ${({ $variant }) => colours($variant).activeBg};
  }

  &:focus {
    outline: ${iconButton.focus.outline};
    outline-offset: ${border.focusOffset};
  }

  &:disabled {
    background-color: ${({ $variant }) => colours($variant).disabledBg};
    color: ${({ $variant }) => colours($variant).disabledText};
    cursor: not-allowed;
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
