import { ReactNode } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens
const { color, border, spacing } = semantic
const { label } = tokens.component.badge
const { category } = color
const { radius } = border
const { layout } = spacing
const { label: labelHeight } = semantic.size

/**
 * Category color options for CategoryLabel
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
 * Visual variant options for CategoryLabel
 */
export type CategoryVariant = 'filled' | 'outlined' | 'minimal'

/**
 * Size options for CategoryLabel: medium (24px) or large (32px), on the decision 0018 scale
 */
export type CategoryLabelSize = 'medium' | 'large'

/**
 * Props for the CategoryLabel component
 */
export interface CategoryLabelProps {
  /**
   * The category text to display
   */
  children: ReactNode
  
  /**
   * Color scheme for the label
   * @default 'blue'
   */
  color?: CategoryColor
  
  /**
   * Visual variant of the label
   * @default 'filled'
   */
  variant?: CategoryVariant
  
  /**
   * Size: medium (24px) or large (32px)
   * @default 'large'
   */
  size?: CategoryLabelSize
  
  /**
   * Optional icon name to display
   */
  icon?: IconName
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Accessible label for the category label
   */
  'aria-label'?: string
}

interface StyledLabelProps {
  $color: CategoryColor
  $variant: CategoryVariant
  $size: CategoryLabelSize
}

const StyledCategoryLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledLabelProps>`
  box-sizing: border-box; /* the height includes padding and border, without relying on a global reset */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.circle};
  white-space: nowrap;
  user-select: none;
  border-style: solid;
  border-width: ${semantic.border.width.thin};
  
  /* Size styles */
  height: ${({ $size }) => labelHeight[$size]};
  padding: ${({ $size }) => $size === 'medium' 
    ? `${layout.xs} ${layout.sm}` 
    : `${layout.sm} ${layout.md}`
  };
  font: ${({ $size }) => $size === 'medium' ? label.typography.small : label.typography.medium};
  /* After the font shorthand, which would otherwise reset it */
  font-weight: ${label.fontWeight};
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
 * CategoryLabel colour-codes an item's category, such as a transaction's (decision 0018).
 *
 * A static, chip-like label with 8 category colours, 3 visual variants and an optional icon.
 * Category colours carry no status meaning; for status use StatusLabel.
 *
 * @example
 * ```tsx
 * <CategoryLabel color="orange" icon="restaurant">
 *   Food & Dining
 * </CategoryLabel>
 *
 * <CategoryLabel color="blue" variant="outlined" size="medium">
 *   Travel
 * </CategoryLabel>
 * ```
 */
export const CategoryLabel: React.FC<CategoryLabelProps> = ({
  children,
  color = 'blue',
  variant = 'filled',
  size = 'large',
  icon,
  'data-testid': dataTestId,
  'aria-label': ariaLabel
}) => {
  const iconSize = size === 'medium' ? 'xs' : 'sm'

  return (
    <StyledCategoryLabel
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
    </StyledCategoryLabel>
  )
}

CategoryLabel.displayName = 'CategoryLabel'
