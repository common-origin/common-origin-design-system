import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { component: { chip } } = tokens

// Props interface with improved naming and additional options
export interface ChipProps {
  children?: React.ReactNode
  variant?: 'default' | 'emphasis' | 'subtle' | 'interactive' | 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  'data-testid'?: string
  // Additional accessibility props
  'aria-label'?: string
  'aria-describedby'?: string
  role?: string
  
  // Legacy API support
  title?: string
}

// Internal props for styled components with $ prefix for proper filtering
interface InternalStyledProps {
  $variant: 'default' | 'emphasis' | 'subtle' | 'interactive'
  $size: ChipProps['size']
  $disabled?: boolean
  $clickable?: boolean
}

// Helper functions to get styles as objects for CSS custom properties
const getVariantStylesAsObject = (variant: 'default' | 'emphasis' | 'subtle' | 'interactive') => {
  switch (variant) {
    case 'emphasis':
      return {
        backgroundColor: chip.variants.emphasis.backgroundColor,
        color: chip.variants.emphasis.textColor
      }
    case 'subtle':
      return {
        backgroundColor: chip.variants.subtle.backgroundColor,
        color: chip.variants.subtle.textColor
      }
    case 'interactive':
      return {
        backgroundColor: chip.variants.interactive.backgroundColor,
        color: chip.variants.interactive.textColor
      }
    case 'default':
    default:
      return {
        backgroundColor: chip.default.backgroundColor,
        color: chip.default.textColor
      }
  }
}

const getSizeStylesAsObject = (size: ChipProps['size']) => {
  switch (size) {
    case 'small':
      return {
        font: chip.sizes.small.font,
        padding: chip.sizes.small.padding
      }
    case 'large':
      return {
        font: chip.sizes.large.font,
        padding: chip.sizes.large.padding
      }
    case 'medium':
    default:
      return {
        font: chip.sizes.medium.font,
        padding: chip.sizes.medium.padding
      }
  }
}

// Base styled component using CSS variables to avoid prop leaking
const BaseChip = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: max-content;
  border-radius: ${chip.default.borderRadius};
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
    outline: 2px solid ${chip.variants.interactive.backgroundColor};
    outline-offset: 2px;
  }
`

// Wrapper component that applies styles via CSS custom properties
const StyledChip: React.FC<React.PropsWithChildren<InternalStyledProps & React.HTMLAttributes<HTMLSpanElement>>> = ({
  $variant,
  $size,
  $disabled,
  $clickable,
  children,
  style,
  ...htmlProps
}) => {
  // Get styles for variant and size
  const variantStyles = getVariantStylesAsObject($variant)
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
    <BaseChip
      style={{ ...cssProps, ...style }}
      {...htmlProps}
    >
      {children}
    </BaseChip>
  )
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  onClick,
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  role,
  title, // Legacy prop support
  ...props
}) => {
  const isClickable = Boolean(onClick && !disabled)
  
  // Map legacy variants to new variants for backward compatibility
  const normalizedVariant: 'default' | 'emphasis' | 'subtle' | 'interactive' = 
    variant === 'light' ? 'default' :
    variant === 'dark' ? 'emphasis' :
    variant as 'default' | 'emphasis' | 'subtle' | 'interactive'
  
  // Support legacy title prop - prioritize children over title
  const content = children !== undefined ? children : title
  
  // Remove styled-only props from the rest
  const { variant: _v, size: _s, disabled: _d, clickable: _c, ...htmlProps } = props as Record<string, any>
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick()
    }
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      handleClick()
    }
  }
  
  return (
    <StyledChip
      $variant={normalizedVariant}
      $size={size}
      $disabled={disabled || undefined}
      $clickable={isClickable || undefined}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={role || (isClickable ? 'button' : undefined)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled ? 'true' : undefined}
      data-testid={dataTestId}
      {...htmlProps}
    >
      {content}
    </StyledChip>
  )
}

// Legacy props support for backward compatibility
export interface LegacyChipProps {
  title: string
  variant?: 'light' | 'dark'
}

// Legacy component for backward compatibility
export const LegacyChip: React.FC<LegacyChipProps> = ({ title, variant = 'light' }) => {
  // Map legacy variants to new variants
  const newVariant = variant === 'dark' ? 'emphasis' : 'default'
  
  return (
    <Chip variant={newVariant}>
      {title}
    </Chip>
  )
}
