import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

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
      color: semantic.color.status.pending,
      bgColor: semantic.color.status['pending-bg'],
      icon: 'refresh', // Fallback until 'clock' icon is added
      label: 'Pending'
    },
    completed: {
      color: semantic.color.status.completed,
      bgColor: semantic.color.status['completed-bg'],
      icon: 'check',
      label: 'Completed'
    },
    failed: {
      color: semantic.color.status.failed,
      bgColor: semantic.color.status['failed-bg'],
      icon: 'close',
      label: 'Failed'
    },
    cancelled: {
      color: semantic.color.status.cancelled,
      bgColor: semantic.color.status['cancelled-bg'],
      icon: 'cancel',
      label: 'Cancelled'
    },
    processing: {
      color: semantic.color.status.processing,
      bgColor: semantic.color.status['processing-bg'],
      icon: 'refresh',
      label: 'Processing'
    },
    scheduled: {
      color: semantic.color.status.scheduled,
      bgColor: semantic.color.status['scheduled-bg'],
      icon: 'bell', // Fallback until 'calendar' icon is added
      label: 'Scheduled'
    }
  }
  
  return configs[status]
}

const getSizeStyles = (size: StatusSize) => {
  if (size === 'small') {
    return {
      height: '20px',
      padding: `${base.spacing[1]} ${base.spacing[2]}`,
      font: semantic.typography.caption,
      gap: base.spacing[1],
      iconSize: 'xs' as const
    }
  }
  
  // medium
  return {
    height: '24px',
    padding: `${base.spacing[1]} ${base.spacing[2]}`,
    font: semantic.typography.small,
    gap: base.spacing[1],
    iconSize: 'sm' as const
  }
}

const StyledStatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledStatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${base.border.radius.circle};
  font-weight: ${base.fontWeight[3]};
  white-space: nowrap;
  user-select: none;
  animation: ${scaleIn} 0.2s ease-out;
  
  /* Apply CSS custom properties */
  background-color: var(--status-badge-bg);
  color: var(--status-badge-color);
  height: var(--status-badge-height);
  padding: var(--status-badge-padding);
  font: var(--status-badge-font);
  gap: var(--status-badge-gap);
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
  const sizeStyles = getSizeStyles(size)
  const displayLabel = label || statusConfig.label
  
  const cssProps = {
    '--status-badge-bg': statusConfig.bgColor,
    '--status-badge-color': statusConfig.color,
    '--status-badge-height': sizeStyles.height,
    '--status-badge-padding': sizeStyles.padding,
    '--status-badge-font': sizeStyles.font,
    '--status-badge-gap': sizeStyles.gap
  } as React.CSSProperties
  
  return (
    <StyledStatusBadge
      $status={status}
      $size={size}
      role="status"
      aria-label={ariaLabel || `Status: ${displayLabel}`}
      aria-live={liveRegion ? 'polite' : undefined}
      aria-atomic={liveRegion ? 'true' : undefined}
      data-testid={dataTestId}
      style={cssProps}
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
