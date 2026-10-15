import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../../types/icons'
import { forcedColorsEdge, reducedMotion, visuallyHidden } from '../../../lib/styleUtils'
import tokens from '@/lib/cssTokens'

// Destructure tokens for cleaner access
const { status: statusColors } = tokens.component
const { space, radius } = tokens.semantic
const { transition, duration, easing } = tokens.semantic.motion
const { label: labelHeight } = tokens.semantic.size
const { label } = tokens.component.badge

/**
 * Status type options for StatusLabel
 */
export type StatusType = 
  | 'pending' 
  | 'completed' 
  | 'failed' 
  | 'cancelled' 
  | 'processing' 
  | 'scheduled'

/**
 * Size options for StatusLabel
 */
export type StatusSize = 'small' | 'medium'

/**
 * Props shared by StatusLabel and the deprecated StatusBadge
 */
export interface StatusLabelProps {
  /**
   * The status type to display
   */
  status: StatusType

  /**
   * Optional custom label (defaults to status name)
   */
  label?: string

  /**
   * Size: small (20px) or medium (24px)
   * @default 'medium'
   */
  size?: StatusSize

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
   * Accessible label override. Used as the status's name and announced instead of the visible
   * text and icon (#78).
   */
  'aria-label'?: string
}

interface StyledStatusLabelProps {
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
      color: statusColors.pending.text,
      bgColor: statusColors.pending.background,
      icon: 'refresh', // Fallback until 'clock' icon is added
      label: 'Pending'
    },
    completed: {
      color: statusColors.completed.text,
      bgColor: statusColors.completed.background,
      icon: 'check',
      label: 'Completed'
    },
    failed: {
      color: statusColors.failed.text,
      bgColor: statusColors.failed.background,
      icon: 'close',
      label: 'Failed'
    },
    cancelled: {
      color: statusColors.cancelled.text,
      bgColor: statusColors.cancelled.background,
      icon: 'cancel',
      label: 'Cancelled'
    },
    processing: {
      color: statusColors.processing.text,
      bgColor: statusColors.processing.background,
      icon: 'refresh',
      label: 'Processing'
    },
    scheduled: {
      color: statusColors.scheduled.text,
      bgColor: statusColors.scheduled.background,
      icon: 'bell', // Fallback until 'calendar' icon is added
      label: 'Scheduled'
    }
  }
  
  return configs[status]
}

// Size configuration
const sizeConfig = {
  small: {
    height: labelHeight.small,
    padding: `${space[100]} ${space[200]}`,
    font: label.typography.small,
    gap: space[100],
    iconSize: 'xs' as const
  },
  medium: {
    height: labelHeight.medium,
    padding: `${space[100]} ${space[200]}`,
    font: label.typography.medium,
    gap: space[100],
    iconSize: 'sm' as const
  }
}

const StyledStatusLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledStatusLabelProps>`
  box-sizing: border-box; /* the height includes padding, without relying on a global reset */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.full};
  white-space: nowrap;
  user-select: none;
  animation: ${scaleIn} ${duration.moderate} ${easing.decelerate};
  transition: ${transition.feedback};

  /* Under reduced motion the label appears without scaling in, and colours change at once */
  ${reducedMotion} {
    animation: none;
    transition: none;
  }

  /* Forced colours drop the fill, so the label keeps its shape with an edge (decision 0038) */
  ${forcedColorsEdge}
  
  /* Size styles */
  ${({ $size }) => {
    const size = sizeConfig[$size]
    return `
      height: ${size.height};
      padding: ${size.padding};
      font: ${size.font};
      font-weight: ${label.fontWeight};
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
  ${visuallyHidden}
`

// The visible content, hidden from assistive technology when an aria-label replaces it.
// display: contents keeps the root's flex layout and gap.
const VisibleContent = styled.span`
  display: contents;
`

/**
 * Shared implementation of StatusLabel and the deprecated StatusBadge. Internal: not exported
 * from the package. `showIcon` exists only for StatusBadge; StatusLabel always shows the icon
 * (decision 0018).
 */
export const StatusLabelBase: React.FC<StatusLabelProps & { showIcon?: boolean }> = ({
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
  // A blank aria-label is no label at all, so it falls back like a missing one
  const accessibleLabel = ariaLabel?.trim() ? ariaLabel : undefined

  return (
    <StyledStatusLabel
      $status={status}
      $size={size}
      role="status"
      aria-label={accessibleLabel || `Status: ${displayLabel}`}
      // role="status" is implicitly polite, so turning announcements off needs an explicit "off"
      aria-live={liveRegion ? 'polite' : 'off'}
      aria-atomic={liveRegion ? 'true' : undefined}
      data-testid={dataTestId}
    >
      {/* A live region announces its content, not its name, so a provided aria-label replaces the
          content for assistive technology as well (#78) */}
      <VisibleContent aria-hidden={accessibleLabel ? 'true' : undefined}>
        {showIcon && (
          <Icon
            name={statusConfig.icon}
            size={sizeStyles.iconSize}
            iconColor="inherit"
          />
        )}
        {displayLabel}
        <ScreenReaderOnly>
          {status} status
        </ScreenReaderOnly>
      </VisibleContent>
      {accessibleLabel && <ScreenReaderOnly>{accessibleLabel}</ScreenReaderOnly>}
    </StyledStatusLabel>
  )
}
