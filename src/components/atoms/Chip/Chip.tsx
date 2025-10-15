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

// Internal props for styled components - no $ prefix needed
interface InternalStyledProps {
  variant: 'default' | 'emphasis' | 'subtle' | 'interactive'
  size: ChipProps['size']
  disabled?: boolean
  clickable?: boolean
}

// Dynamic variant styles using component tokens
const getVariantStyles = ({ variant }: InternalStyledProps) => {
  switch (variant) {
    case 'emphasis':
      return `
        background-color: ${chip.variants.emphasis.backgroundColor};
        color: ${chip.variants.emphasis.textColor};
      `
    case 'subtle':
      return `
        background-color: ${chip.variants.subtle.backgroundColor};
        color: ${chip.variants.subtle.textColor};
      `
    case 'interactive':
      return `
        background-color: ${chip.variants.interactive.backgroundColor};
        color: ${chip.variants.interactive.textColor};
      `
    case 'default':
    default:
      return `
        background-color: ${chip.default.backgroundColor};
        color: ${chip.default.textColor};
      `
  }
}

// Dynamic size styles using component tokens
const getSizeStyles = ({ size }: InternalStyledProps) => {
  switch (size) {
    case 'small':
      return `
        font: ${chip.sizes.small.font};
        padding: ${chip.sizes.small.padding};
      `
    case 'large':
      return `
        font: ${chip.sizes.large.font};
        padding: ${chip.sizes.large.padding};
      `
    case 'medium':
    default:
      return `
        font: ${chip.sizes.medium.font};
        padding: ${chip.sizes.medium.padding};
      `
  }
}

// Base styled component that only receives styling props
const BaseChip = styled.span.withConfig({
  shouldForwardProp: (prop) => {
    // Explicitly list props that should NOT be forwarded to the DOM
    const excludedProps = ['variant', 'size', 'disabled', 'clickable']
    return !excludedProps.includes(prop as string)
  }
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
  transition: ${tokens.semantic.motion.interactive};
  
  ${getVariantStyles}
  ${getSizeStyles}
  
  ${({ clickable, disabled }) => {
    if (disabled) {
      return `
        opacity: 0.6;
        cursor: not-allowed;
      `
    }
    if (clickable) {
      return `
        cursor: pointer;
        
        &:hover {
          opacity: 0.8;
        }
        
        &:active {
          opacity: 0.9;
        }
      `
    }
    return ''
  }}
  
  &:focus-visible {
    outline: 2px solid ${chip.variants.interactive.backgroundColor};
    outline-offset: 2px;
  }
`

// Wrapper component that handles prop filtering
const StyledChip: React.FC<React.PropsWithChildren<InternalStyledProps & React.HTMLAttributes<HTMLSpanElement>>> = ({
  variant,
  size,
  disabled,
  clickable,
  children,
  ...htmlProps
}) => {
  // Filter out any remaining non-HTML props to ensure they don't reach the DOM
  const { ...cleanHtmlProps } = htmlProps
  
  return (
    <BaseChip
      variant={variant}
      size={size}
      disabled={disabled}
      clickable={clickable}
      {...cleanHtmlProps}
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
      variant={normalizedVariant}
      size={size}
      disabled={disabled}
      clickable={isClickable}
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
