import React from 'react'
import { CategoryLabel, type CategoryLabelProps } from '../CategoryLabel/CategoryLabel'

export type { CategoryColor, CategoryVariant } from '../CategoryLabel/CategoryLabel'

/**
 * Size options for CategoryBadge
 * @deprecated Use `CategoryLabelSize`: CategoryBadge `small` is CategoryLabel `medium`, and
 * `medium` is `large` (decision 0018).
 */
export type CategorySize = 'small' | 'medium'

/**
 * Props for the CategoryBadge component
 * @deprecated Use `CategoryLabelProps`. CategoryBadge is renamed CategoryLabel and is removed in
 * 3.0 (decision 0018).
 */
export interface CategoryBadgeProps extends Omit<CategoryLabelProps, 'size'> {
  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: CategorySize
}

// CategoryBadge sizes on the decision 0018 scale
const toLabelSize = { small: 'medium', medium: 'large' } as const

/**
 * CategoryBadge displays a category label.
 *
 * @deprecated Renamed to `CategoryLabel` (same `color` and `variant`). Map `size="small"` to
 * `"medium"`, and `size="medium"` (or no size) to `"large"`, CategoryLabel's default.
 * CategoryBadge is removed in 3.0 (decision 0018).
 */
export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ size = 'medium', ...props }) => (
  <CategoryLabel {...props} size={toLabelSize[size]} />
)

CategoryBadge.displayName = 'CategoryBadge'
