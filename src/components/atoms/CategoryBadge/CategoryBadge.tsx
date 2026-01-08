import { ReactNode } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens
const { color, typography, border, spacing } = semantic
const { category } = color
const { radius } = border
const { layout } = spacing

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
}

const StyledCategoryBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.circle};
  font-weight: ${base.fontWeight[3]};
  white-space: nowrap;
  user-select: none;
  border-style: solid;
  border-width: ${base.border.width[1]};
  
  /* Size styles */
  height: ${({ $size }) => $size === 'small' ? '24px' : '32px'};
  padding: ${({ $size }) => $size === 'small' 
    ? `${layout.xs} ${layout.sm}` 
    : `${layout.sm} ${layout.md}`
  };
  font: ${({ $size }) => $size === 'small' ? typography.caption : typography.small};
  gap: ${layout.xs};
  
  /* Variant + Color styles */
  background-color: ${({ $color, $variant }) => {
    if ($variant === 'filled') {
      return category[`${$color}-emphasis` as keyof typeof category]
    }
    if ($variant === 'outlined') {
      return 'transparent'
    }
    // minimal
    return category[`${$color}-subtle` as keyof typeof category]
  }};
  
  color: ${({ $color, $variant }) => {
    if ($variant === 'filled') {
      return color.text.inverse
    }
    return category[$color as keyof typeof category]
  }};
  
  border-color: ${({ $color, $variant }) => {
    if ($variant === 'outlined') {
      return category[$color as keyof typeof category]
    }
    return 'transparent'
  }};
`

/**
 * CategoryBadge component for displaying transaction categories
 * 
 * A static label for categorizing content with support for 8 color options,
 * 3 visual variants, and optional icons. Perfect for categorizing 
 * financial transactions or content types.
 * 
 * @example
 * ```tsx
 * <CategoryBadge color="orange" icon="restaurant">
 *   Food & Dining
 * </CategoryBadge>
 * 
 * <CategoryBadge color="blue" variant="outlined" size="small">
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
  'data-testid': dataTestId,
  'aria-label': ariaLabel
}) => {
  const iconSize = size === 'small' ? 'xs' : 'sm'
  
  return (
    <StyledCategoryBadge
      $color={color}
      $variant={variant}
      $size={size}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={iconSize}
          iconColor={variant === 'filled' ? 'inverse' : 'inherit'}
          aria-hidden="true"
        />
      )}
      {children}
    </StyledCategoryBadge>
  )
}

CategoryBadge.displayName = 'CategoryBadge'
