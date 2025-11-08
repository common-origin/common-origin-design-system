import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon, type IconName } from '../Icon'

const { component: { button }, semantic } = tokens

// Base props shared between button and link
export interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'naked'
  size?: 'small' | 'medium' | 'large'
  url?: string
  purpose?: 'button' | 'link'
  target?: string
  children: React.ReactNode
  iconName?: IconName
  id?: string
  'data-testid'?: string
}

// Button-specific props
export interface ButtonProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  purpose?: 'button'
}

// Link-specific props
export interface LinkProps extends BaseButtonProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  purpose: 'link'
}

// Union type for the component
type CustomButtonProps = ButtonProps | LinkProps

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'naked'
  $size: 'small' | 'medium' | 'large'
}

// Base styles shared between button and link
const baseButtonStyles = `
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.semantic.spacing.layout.xs};
  height: max-content;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: ${semantic.motion.hover};
  white-space: nowrap;
  user-select: none;
  
  &:focus {
    outline: ${button.focus.outline};
    outline-offset: ${button.focus.outlineOffset};
  }

  &:disabled {
    cursor: not-allowed;
  }
`

// Dynamic variant styles using component tokens
const getVariantStyles = ({ $variant }: StyledButtonProps) => `
  background-color: ${
    $variant === 'primary' 
    ? button.primary.backgroundColor 
    : $variant === 'secondary'
    ? button.variants.secondary.backgroundColor
    : button.variants.naked.backgroundColor
  };
  color: ${
    $variant === 'primary' 
    ? button.primary.textColor 
    : $variant === 'secondary'
    ? button.variants.secondary.textColor
    : button.variants.naked.textColor
  };
  
  &:hover:not(:disabled) {
    background-color: ${
      $variant === 'primary' 
      ? button.hover.backgroundColor 
      : $variant === 'secondary'
      ? button.variants.secondary.hover.backgroundColor
      : button.variants.naked.hover.backgroundColor
    };
  }

  &:active:not(:disabled) {
    background-color: ${
      $variant === 'primary' 
      ? button.active.backgroundColor 
      : $variant === 'secondary'
      ? button.variants.secondary.active.backgroundColor
      : button.variants.naked.active.backgroundColor
    };
  }

  &:disabled {
    background-color: ${
      $variant === 'primary' 
      ? button.disabled.backgroundColor 
      : $variant === 'secondary'
      ? button.variants.secondary.disabled.backgroundColor
      : button.variants.naked.disabled.backgroundColor
    };
    color: ${
      $variant === 'primary' 
      ? button.disabled.textColor 
      : $variant === 'secondary'
      ? button.variants.secondary.disabled.textColor
      : button.variants.naked.disabled.textColor
    };
  }
`

// Dynamic size styles using component tokens
const getSizeStyles = ({ $size }: StyledButtonProps) => {
  switch ($size) {
    case 'small':
      return `
        font: ${button.sizes.small.font};
        padding: ${button.sizes.small.padding};
      `
    case 'medium':
      return `
        font: ${button.sizes.medium.font};
        padding: ${button.sizes.medium.padding};
      `
    case 'large':
      return `
        font: ${button.sizes.large.font};
        padding: ${button.sizes.large.padding};
      `
    default:
      return `
        font: ${button.sizes.large.font};
        padding: ${button.sizes.large.padding};
      `
  }
}

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledButtonProps>`
  ${baseButtonStyles}
  border-radius: ${button.primary.borderRadius};
  
  ${getVariantStyles}
  ${getSizeStyles}
`

const StyledLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledButtonProps>`
  ${baseButtonStyles}
  border-radius: ${button.primary.borderRadius};
  
  ${getVariantStyles}
  ${getSizeStyles}
`

// Styled Next.js Link component (modern API without legacyBehavior)
const StyledNextLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledButtonProps & { href: string }>`
  ${baseButtonStyles}
  border-radius: ${button.primary.borderRadius};
  
  ${getVariantStyles}
  ${getSizeStyles}
`

// Helper function to get icon size based on button size
const getIconSize = (buttonSize?: 'small' | 'medium' | 'large'): 'xs' | 'sm' | 'md' => {
  switch (buttonSize) {
    case 'small':
      return 'xs'
    case 'medium':
      return 'sm'
    case 'large':
      return 'md'
    default:
      return 'md'
  }
}

// Helper function to render button content with optional icon
const renderButtonContent = (children: React.ReactNode, iconName?: IconName, size?: 'small' | 'medium' | 'large') => {
  if (!iconName) return children
  
  const iconSize = getIconSize(size)
  
  return (
    <>
      <Icon name={iconName} size={iconSize} iconColor="inherit" />
      {children}
    </>
  )
}

export const Button: React.FC<CustomButtonProps> = ({ 
  variant = "primary", 
  size = "large", 
  url, 
  purpose = 'button', 
  children, 
  target,
  iconName,
  'data-testid': dataTestId,
  ...rest 
}) => {
  // For internal links, use Next.js Link (modern API without legacyBehavior)
  if (purpose === 'link' && url && !url.startsWith('http') && !target) {
    return (
      <StyledNextLink
        href={url}
        $variant={variant} 
        $size={size} 
        data-testid={dataTestId}
      >
        {renderButtonContent(children, iconName, size)}
      </StyledNextLink>
    )
  }
  
  // For external links or links with target
  if (purpose === 'link' && url) {
    const linkProps = rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>
    return (
      <StyledLink 
        href={url} 
        target={target} 
        $variant={variant} 
        $size={size}
        data-testid={dataTestId}
        {...linkProps}
      >
        {renderButtonContent(children, iconName, size)}
      </StyledLink>
    )
  }
  
  // For button with URL (legacy support)
  if (purpose === 'button' && url) {
    const buttonProps = rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Call any existing onClick handler first
      if (buttonProps.onClick) {
        buttonProps.onClick(e)
      }
      
      // Handle navigation
      if (url.startsWith('http') || target) {
        window.open(url, target || '_self')
      } else {
        window.location.href = url
      }
    }
    
    return (
      <StyledButton 
        {...buttonProps}
        $variant={variant} 
        $size={size}
        data-testid={dataTestId}
        onClick={handleClick}
      >
        {renderButtonContent(children, iconName, size)}
      </StyledButton>
    )
  }
  
  // Regular button
  const buttonProps = rest as Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>
  return (
    <StyledButton 
      $variant={variant} 
      $size={size}
      data-testid={dataTestId}
      {...buttonProps}
    >
      {renderButtonContent(children, iconName, size)}
    </StyledButton>
  )
}
