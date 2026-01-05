import { ReactNode, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

/**
 * Category color options for CategoryBadge
 */
export type CategoryColor = 
  | 'blue' 
  | 'purple' 
  | 'pink' 
  | 'yellow' 
  | 'green' 
  | 'red' 
  | 'orange' 
  | 'gray'

/**
 * Visual variant options for CategoryBadge
 */
export type CategoryVariant = 'filled' | 'outlined' | 'minimal'

/**
 * Size options for CategoryBadge
 */
export type CategorySize = 'small' | 'medium'

/**
 * Props for the CategoryBadge component
 */
export interface CategoryBadgeProps {
  /**
   * The category text to display
   */
  children: ReactNode
  
  /**
   * Color scheme for the badge
   * @default 'blue'
   */
  color?: CategoryColor
  
  /**
   * Visual variant of the badge
   * @default 'filled'
   */
  variant?: CategoryVariant
  
  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: CategorySize
  
  /**
   * Optional icon name to display
   */
  icon?: IconName
  
  /**
   * Optional click handler (makes badge interactive)
   */
  onClick?: () => void
  
  /**
   * Whether the badge is disabled
   * @default false
   */
  disabled?: boolean
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Accessible label for the badge
   */
  'aria-label'?: string
}

interface StyledBadgeProps {
  $color: CategoryColor
  $variant: CategoryVariant
  $size: CategorySize
  $clickable: boolean
  $disabled: boolean
}

const getColorStyles = (color: CategoryColor, variant: CategoryVariant) => {
  const colorKey = color as keyof typeof semantic.color.category
  
  if (variant === 'filled') {
    return {
      backgroundColor: semantic.color.category[`${colorKey}-emphasis` as keyof typeof semantic.color.category],
      color: semantic.color.text.inverse,
      borderColor: 'transparent'
    }
  }
  
  if (variant === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color: semantic.color.category[colorKey],
      borderColor: semantic.color.category[colorKey]
    }
  }
  
  // minimal
  return {
    backgroundColor: semantic.color.category[`${colorKey}-subtle` as keyof typeof semantic.color.category],
    color: semantic.color.category[colorKey],
    borderColor: 'transparent'
  }
}

const getSizeStyles = (size: CategorySize) => {
  if (size === 'small') {
    return {
      height: '24px',
      padding: `${base.spacing[1]} ${base.spacing[2]}`,
      font: semantic.typography.caption,
      gap: base.spacing[1],
      iconSize: 'xs' as const
    }
  }
  
  // medium
  return {
    height: '32px',
    padding: `${base.spacing[2]} ${base.spacing[3]}`,
    font: semantic.typography.small,
    gap: base.spacing[1],
    iconSize: 'sm' as const
  }
}

const StyledCategoryBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${base.border.radius.circle};
  font-weight: ${base.fontWeight[3]};
  white-space: nowrap;
  user-select: none;
  transition: ${semantic.motion.hover};
  border-width: ${base.border.width[1]};
  border-style: solid;
  
  /* Apply CSS custom properties */
  background-color: var(--category-badge-bg);
  color: var(--category-badge-color);
  border-color: var(--category-badge-border);
  height: var(--category-badge-height);
  padding: var(--category-badge-padding);
  font: var(--category-badge-font);
  gap: var(--category-badge-gap);
  opacity: var(--category-badge-opacity);
  cursor: var(--category-badge-cursor);
  
  /* Hover state for clickable badges */
  ${props => props.$clickable && !props.$disabled && `
    &:hover {
      opacity: 0.85;
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
      opacity: 0.95;
    }
  `}
  
  /* Focus state */
  &:focus-visible {
    outline: ${base.border.width[2]} solid ${semantic.color.border.strong};
    outline-offset: ${base.spacing[1]};
  }
`

/**
 * CategoryBadge component for displaying transaction categories
 * 
 * Supports 8 color options, 3 visual variants, optional icons, and interactive behavior.
 * Perfect for categorizing financial transactions or content.
 * 
 * @example
 * ```tsx
 * <CategoryBadge color="orange" icon="restaurant">
 *   Food & Dining
 * </CategoryBadge>
 * 
 * <CategoryBadge 
 *   color="blue" 
 *   variant="outlined" 
 *   size="small"
 *   onClick={() => filterByCategory('travel')}
 * >
 *   Travel
 * </CategoryBadge>
 * ```
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  children,
  color = 'blue',
  variant = 'filled',
  size = 'medium',
  icon,
  onClick,
  disabled = false,
  'data-testid': dataTestId,
  'aria-label': ariaLabel
}) => {
  const hasClickHandler = Boolean(onClick)
  const isClickable = hasClickHandler && !disabled
  
  const colorStyles = getColorStyles(color, variant)
  const sizeStyles = getSizeStyles(size)
  
  const cssProps = {
    '--category-badge-bg': colorStyles.backgroundColor,
    '--category-badge-color': colorStyles.color,
    '--category-badge-border': colorStyles.borderColor,
    '--category-badge-height': sizeStyles.height,
    '--category-badge-padding': sizeStyles.padding,
    '--category-badge-font': sizeStyles.font,
    '--category-badge-gap': sizeStyles.gap,
    '--category-badge-opacity': disabled ? '0.6' : '1',
    '--category-badge-cursor': disabled ? 'not-allowed' : (isClickable ? 'pointer' : 'default')
  } as React.CSSProperties
  
  const handleClick = () => {
    if (isClickable) {
      onClick?.()
    }
  }
  
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      onClick?.()
    }
  }
  
  return (
    <StyledCategoryBadge
      $color={color}
      $variant={variant}
      $size={size}
      $clickable={isClickable}
      $disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={hasClickHandler ? 0 : undefined}
      role={hasClickHandler ? 'button' : undefined}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      data-testid={dataTestId}
      style={cssProps}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={sizeStyles.iconSize}
          iconColor={variant === 'filled' ? 'inverse' : 'inherit'}
          aria-hidden="true"
        />
      )}
      {children}
    </StyledCategoryBadge>
  )
}

CategoryBadge.displayName = 'CategoryBadge'
