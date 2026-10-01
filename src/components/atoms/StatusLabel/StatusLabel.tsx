import React from 'react'
import { StatusLabelBase, type StatusLabelProps } from './StatusLabelBase'

export type { StatusLabelProps, StatusType, StatusSize } from './StatusLabelBase'

/**
 * StatusLabel conveys the status of something, such as a transaction or task (decision 0018).
 *
 * Uses only the status colour tokens and always shows an icon with its text, so status is never
 * conveyed by colour alone. Not interactive. Announces changes politely to screen readers.
 *
 * @example
 * ```tsx
 * <StatusLabel status="completed" />
 *
 * <StatusLabel status="pending" label="Awaiting approval" size="small" />
 * ```
 */
// showIcon comes last so no caller (for example plain JavaScript) can hide the icon
export const StatusLabel: React.FC<StatusLabelProps> = (props) => <StatusLabelBase {...props} showIcon />

StatusLabel.displayName = 'StatusLabel'
