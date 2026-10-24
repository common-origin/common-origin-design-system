import React from 'react'
import styled, { keyframes } from 'styled-components'
import { forcedColors, reducedMotion, visuallyHidden } from '../../../lib/styleUtils'
import tokens from '@/lib/cssTokens'
import { Typography } from '../Typography'

const { semantic } = tokens
const { color } = semantic
const { radius } = semantic
const { dot, count, ring } = tokens.component.badge

/**
 * Badge variants: `default` and `accent`, plus deprecated aliases of `accent` kept until 3.0.
 */
export type BadgeVariant = 'default' | 'accent' | DeprecatedBadgeVariant

/**
 * Deprecated Badge variants, each rendered as `accent` until 3.0 (decisions 0029, 0045).
 * @deprecated Use `accent`. For a count of items with a status, use StatusLabel.
 */
export type DeprecatedBadgeVariant = 'primary' | 'error' | 'warning' | 'success'

export interface BadgeProps {
  /** Content to wrap with the badge */
  children: React.ReactNode
  /** Number to display in the badge. If 0, badge is hidden */
  count?: number
  /** Maximum number to display before showing "99+" */
  max?: number
  /**
   * Visual variant of the badge. A badge means new or unread items (decision 0045): `accent` is
   * the blue highlight, and `default` the near-black count. `primary` is a deprecated alias for
   * `accent`, because Button's `primary` is near-black (decision 0029). `error`, `warning` and
   * `success` are deprecated aliases for `accent`: a badge's colour alone can't carry a status, so
   * a count of items with a status uses the status pattern instead ("3 failed" with StatusLabel).
   * All four keep working until they are removed in 3.0.
   * @default 'default'
   */
  variant?: BadgeVariant
  /** Show only a dot indicator instead of count */
  dot?: boolean
  /** Screen reader label for the badge */
  'aria-label'?: string
  /** Additional CSS class */
  className?: string
  /** Test identifier for automated testing */
  'data-testid'?: string
}

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const BadgeWrapper = styled.span`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`

const BadgeIndicator = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $variant: string; $isDot: boolean; $isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  min-width: ${props => props.$isDot ? dot.size : count.minWidth};
  height: ${props => props.$isDot ? dot.size : count.height};
  padding: ${props => props.$isDot ? '0' : `0 ${semantic.space.inset.xs}`};
  border-radius: ${radius.full};
  line-height: ${count.lineHeight};
  white-space: nowrap;
  box-shadow: 0 0 0 ${ring.width} ${semantic.surface.base};
  animation: ${scaleIn} ${semantic.motion.duration.moderate} ${semantic.motion.easing.decelerate};

  ${reducedMotion} {
    animation: none;
  }

  /* Forced colours drop fills (decision 0038): a dot is only a fill, so it keeps one in the
     text colour; a count gets an edge around its number */
  ${props => props.$isDot
    ? `${forcedColors} { forced-color-adjust: none; background-color: CanvasText; }`
    : `${forcedColors} { border: ${semantic.border.width.thin} solid currentColor; }`}
  
  ${props => {
    switch (props.$variant) {
      // 'primary', 'error', 'warning' and 'success' are deprecated aliases for 'accent', removed in
      // 3.0: 'primary' (#169), and the status colours, because a badge's colour alone can't carry a
      // status (decision 0045, #263)
      case 'accent':
      case 'primary':
      case 'error':
      case 'warning':
      case 'success':
        return `
          background-color: ${color.fill.accent};
          color: ${color.text.inverse};
        `
      default:
        return `
          background-color: ${color.fill.emphasis};
          color: ${color.text.inverse};
        `
    }
  }}
`

const ScreenReaderOnly = styled.span`
  ${visuallyHidden}
`

export const Badge: React.FC<BadgeProps> = ({
  children,
  count = 0,
  max = 99,
  variant = 'default',
  dot = false,
  'aria-label': ariaLabel,
  className,
  'data-testid': dataTestId
}) => {
  const isVisible = dot || count > 0
  const displayCount = count > max ? `${max}+` : count.toString()
  
  // Generate default aria-label if not provided
  const defaultAriaLabel = dot 
    ? 'New notification indicator'
    : count === 1 
      ? '1 notification' 
      : `${count} notifications`
  
  const label = ariaLabel || defaultAriaLabel

  return (
    <BadgeWrapper className={className} data-testid={dataTestId}>
      {children}
      <BadgeIndicator
        $variant={variant}
        $isDot={dot}
        $isVisible={isVisible}
        role="status"
        aria-live="polite"
      >
        {!dot && (
          <Typography variant="caption" color="inverse">
            {displayCount}
          </Typography>
        )}
        <ScreenReaderOnly>{label}</ScreenReaderOnly>
      </BadgeIndicator>
    </BadgeWrapper>
  )
}
