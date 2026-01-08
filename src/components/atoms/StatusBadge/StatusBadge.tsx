import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

// Destructure tokens for cleaner access
const { status: statusColors } = tokens.semantic.color
const { layout: spacing } = tokens.semantic.spacing
const { radius } = tokens.semantic.border
const { transition } = tokens.semantic.motion
const typography = tokens.semantic.typography

/**
 * Status type options for StatusBadge
 */
export type StatusType = 
  | 'pending' 
  | 'completed' 
  | 'failed' 
  | 'cancelled' 
  | 'processing' 
  | 'scheduled'

/**
 * Size options for StatusBadge
 */
export type StatusSize = 'small' | 'medium'

/**
 * Props for the StatusBadge component
 */
export interface StatusBadgeProps {
  /**
   * The status type to display
   */
  status: StatusType
  
  /**
   * Optional custom label (defaults to status name)
   */
  label?: string
  
  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: StatusSize
  
  /**
   * Whether to show the icon
   * @default true
   */
  showIcon?: boolean
  
  /**
   * Whether status changes should be announced to screen readers
   * @default true
   */
  liveRegion?: boolean
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Accessible label override
   */
  'aria-label'?: string
}

interface StyledStatusBadgeProps {
  $status: StatusType
  $size: StatusSize
}

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const getStatusConfig = (status: StatusType) => {
  const configs: Record<StatusType, { color: string; bgColor: string; icon: IconName; label: string }> = {
    pending: {
      color: statusColors.pending,
      bgColor: statusColors['pending-bg'],
      icon: 'refresh', // Fallback until 'clock' icon is added
      label: 'Pending'
    },
    completed: {
      color: statusColors.completed,
      bgColor: statusColors['completed-bg'],
      icon: 'check',
      label: 'Completed'
    },
    failed: {
      color: statusColors.failed,
      bgColor: statusColors['failed-bg'],
      icon: 'close',
      label: 'Failed'
    },
    cancelled: {
      color: statusColors.cancelled,
      bgColor: statusColors['cancelled-bg'],
      icon: 'cancel',
      label: 'Cancelled'
    },
    processing: {
      color: statusColors.processing,
      bgColor: statusColors['processing-bg'],
      icon: 'refresh',
      label: 'Processing'
    },
    scheduled: {
      color: statusColors.scheduled,
      bgColor: statusColors['scheduled-bg'],
      icon: 'bell', // Fallback until 'calendar' icon is added
      label: 'Scheduled'
    }
  }
  
  return configs[status]
}

// Size configuration
const sizeConfig = {
  small: {
    height: '20px',
    padding: `${spacing.xs} ${spacing.sm}`,
    font: typography.caption,
    gap: spacing.xs,
    iconSize: 'xs' as const
  },
  medium: {
    height: '24px',
    padding: `${spacing.xs} ${spacing.sm}`,
    font: typography.small,
    gap: spacing.xs,
    iconSize: 'sm' as const
  }
}

const StyledStatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledStatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.circle};
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  animation: ${scaleIn} 0.2s ease-out;
  transition: ${transition.fast};
  
  /* Size styles */
  ${({ $size }) => {
    const size = sizeConfig[$size]
    return `
      height: ${size.height};
      padding: ${size.padding};
      font: ${size.font};
      gap: ${size.gap};
    `
  }}
  
  /* Status color styles */
  ${({ $status }) => {
    const config = getStatusConfig($status)
    return `
      background-color: ${config.bgColor};
      color: ${config.color};
    `
  }}
`

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`

/**
 * StatusBadge component for displaying transaction or task status
 * 
 * Displays status with appropriate color, icon, and supports live updates for screen readers.
 * Maps to 6 common status types with semantic color tokens.
 * 
 * @example
 * ```tsx
 * <StatusBadge status="completed" />
 * 
 * <StatusBadge 
 *   status="pending" 
 *   label="Awaiting approval"
 *   size="small" 
 * />
 * 
 * <StatusBadge 
 *   status="failed" 
 *   showIcon={false}
 *   liveRegion={true}
 * />
 * ```
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'medium',
  showIcon = true,
  liveRegion = true,
  'data-testid': dataTestId,
  'aria-label': ariaLabel
}) => {
  const statusConfig = getStatusConfig(status)
  const sizeStyles = sizeConfig[size]
  const displayLabel = label || statusConfig.label
  
  return (
    <StyledStatusBadge
      $status={status}
      $size={size}
      role="status"
      aria-label={ariaLabel || `Status: ${displayLabel}`}
      aria-live={liveRegion ? 'polite' : undefined}
      aria-atomic={liveRegion ? 'true' : undefined}
      data-testid={dataTestId}
    >
      {showIcon && (
        <Icon 
          name={statusConfig.icon} 
          size={sizeStyles.iconSize}
          iconColor="inherit"
          aria-hidden="true"
        />
      )}
      {displayLabel}
      <ScreenReaderOnly>
        {status} status
      </ScreenReaderOnly>
    </StyledStatusBadge>
  )
}

StatusBadge.displayName = 'StatusBadge'
