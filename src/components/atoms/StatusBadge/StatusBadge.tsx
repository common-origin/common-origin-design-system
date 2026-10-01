import React from 'react'
import { StatusLabelBase, type StatusLabelProps } from '../StatusLabel/StatusLabelBase'

export type { StatusType, StatusSize } from '../StatusLabel/StatusLabelBase'

/**
 * Props for the StatusBadge component
 * @deprecated Use `StatusLabelProps`. StatusBadge is renamed StatusLabel and is removed in 3.0
 * (decision 0018).
 */
export interface StatusBadgeProps extends StatusLabelProps {
  /**
   * Whether to show the icon
   * @default true
   * @deprecated StatusLabel always shows the icon, so status is never conveyed by colour alone.
   */
  showIcon?: boolean
}

/**
 * StatusBadge displays a transaction or task status.
 *
 * @deprecated Renamed to `StatusLabel` (same `status`, `size`, `label`, `liveRegion`), which always
 * shows the icon. StatusBadge is removed in 3.0 (decision 0018).
 */
export const StatusBadge: React.FC<StatusBadgeProps> = (props) => <StatusLabelBase {...props} />

StatusBadge.displayName = 'StatusBadge'
