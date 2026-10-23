import { ReactNode } from 'react'
import styled from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import { visuallyHidden } from '../../../lib/styleUtils'
import tokens from '@/lib/cssTokens'

const { semantic } = tokens
const { color } = semantic
const { label } = tokens.component.badge
const { category } = color
const { radius } = semantic
const { space } = semantic
const { label: labelHeight } = semantic.size

/**
 * The category colours: four display colours with no meaning, and grey for "other" (decision 0043).
 * They never mean status; for status use StatusLabel.
 */
export type CategoryDisplayColor = 'olive' | 'periwinkle' | 'rose' | 'magenta' | 'gray'

/**
 * Deprecated category colour names, each an alias of the nearest display colour until 3.0
 * (decision 0043): blue is periwinkle; purple is magenta; pink, red and orange are rose; yellow and
 * green are olive.
 * @deprecated Use a CategoryDisplayColor: 'olive', 'periwinkle', 'rose', 'magenta' or 'gray'.
 */
export type DeprecatedCategoryColor = 'blue' | 'purple' | 'pink' | 'yellow' | 'green' | 'red' | 'orange'

/**
 * Category color options for CategoryLabel. The old hue names still work, as aliases of the
 * nearest display colour, until 3.0.
 */
export type CategoryColor = CategoryDisplayColor | DeprecatedCategoryColor

const displayColor: Record<CategoryColor, CategoryDisplayColor> = {
  olive: 'olive',
  periwinkle: 'periwinkle',
  rose: 'rose',
  magenta: 'magenta',
  gray: 'gray',
  blue: 'periwinkle',
  purple: 'magenta',
  pink: 'rose',
  yellow: 'olive',
  green: 'olive',
  red: 'rose',
  orange: 'rose',
}

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
   * Category colour: 'olive', 'periwinkle', 'rose', 'magenta' or 'gray'. The old hue names are
   * deprecated aliases (decision 0043).
   * @default 'periwinkle'
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
   * Accessible label, announced instead of the visible text (for example "Category: Food & Dining").
   * Rendered as visually hidden text, because a plain label has no role that can be named (#78).
   */
  'aria-label'?: string
}

// Text on white or the -muted fill (outlined and minimal), at least 4.5:1 (#115)
const categoryText: Record<CategoryDisplayColor, string> = {
  olive: category['olive-text'],
  periwinkle: category['periwinkle-text'],
  rose: category['rose-text'],
  magenta: category['magenta-text'],
  gray: category['gray-text']
}

interface StyledLabelProps {
  $color: CategoryDisplayColor
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
  border-radius: ${radius.full};
  white-space: nowrap;
  user-select: none;
  border-style: solid;
  border-width: ${semantic.border.width.thin};
  
  /* Size styles */
  height: ${({ $size }) => labelHeight[$size]};
  padding: ${({ $size }) => $size === 'medium' 
    ? `${space[100]} ${space[200]}` 
    : `${space[200]} ${space[300]}`
  };
  font: ${({ $size }) => $size === 'medium' ? label.typography.small : label.typography.medium};
  /* After the font shorthand, which would otherwise reset it */
  font-weight: ${label.fontWeight};
  gap: ${space[100]};
  
  /* Variant + Color styles */
  background-color: ${({ $color, $variant }) => {
    if ($variant === 'filled') {
      return category[`${$color}-strong` as keyof typeof category]
    }
    if ($variant === 'outlined') {
      return 'transparent'
    }
    // minimal
    return category[`${$color}-muted` as keyof typeof category]
  }};
  
  /* Outlined and minimal text uses the AA text token, not the base colour (issue 115) */
  color: ${({ $color, $variant }) => {
    if ($variant === 'filled') {
      return color.text.inverse
    }
    return categoryText[$color]
  }};
  
  border-color: ${({ $color, $variant }) => {
    if ($variant === 'outlined') {
      return category[$color as keyof typeof category]
    }
    return 'transparent'
  }};
`

// The visible content, hidden from assistive technology when an aria-label replaces it.
// display: contents keeps the root's flex layout and gap.
const VisibleContent = styled.span`
  display: contents;
`

const HiddenLabel = styled.span`
  ${visuallyHidden}
`

/**
 * CategoryLabel colour-codes an item's category, such as a transaction's (decision 0018).
 *
 * A static, chip-like label with 4 display colours plus grey, 3 visual variants and an optional
 * icon. Category colours carry no meaning (decision 0043); for status use StatusLabel. Beyond five
 * categories, the icon and text tell them apart.
 *
 * @example
 * ```tsx
 * <CategoryLabel color="rose" icon="creditCard">
 *   Shopping
 * </CategoryLabel>
 *
 * <CategoryLabel color="periwinkle" variant="outlined" size="medium">
 *   Travel
 * </CategoryLabel>
 * ```
 */
export const CategoryLabel: React.FC<CategoryLabelProps> = ({
  children,
  color = 'periwinkle',
  variant = 'filled',
  size = 'large',
  icon,
  'data-testid': dataTestId,
  'aria-label': ariaLabel
}) => {
  const iconSize = size === 'medium' ? 'xs' : 'sm'
  // A blank aria-label is no label at all, so it falls back like a missing one
  const accessibleLabel = ariaLabel?.trim() ? ariaLabel : undefined

  return (
    <StyledCategoryLabel
      $color={displayColor[color]}
      $variant={variant}
      $size={size}
      data-testid={dataTestId}
    >
      <VisibleContent aria-hidden={accessibleLabel ? 'true' : undefined}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            iconColor={variant === 'filled' ? 'inverse' : 'inherit'}
          />
        )}
        {children}
      </VisibleContent>
      {accessibleLabel && <HiddenLabel>{accessibleLabel}</HiddenLabel>}
    </StyledCategoryLabel>
  )
}

CategoryLabel.displayName = 'CategoryLabel'
