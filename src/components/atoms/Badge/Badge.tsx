import React from 'react'
import styled, { keyframes } from 'styled-components'
import { reducedMotion, visuallyHidden } from '../../../lib/styleUtils'
import tokens from '@/styles/tokens.json'
import { Typography } from '../Typography'

const { semantic } = tokens
const { color, border } = semantic
const { radius } = border
const { dot, count, ring } = tokens.component.badge

export interface BadgeProps {
  /** Content to wrap with the badge */
  children: React.ReactNode
  /** Number to display in the badge. If 0, badge is hidden */
  count?: number
  /** Maximum number to display before showing "99+" */
  max?: number
  /**
   * Visual variant of the badge. `accent` is the blue highlight. `primary` is a deprecated alias
   * for `accent`, because Button's `primary` is near-black (decision 0029). It keeps working
   * until it is removed in 3.0.
   * @default 'default'
   */
  variant?: 'default' | 'accent' | 'primary' | 'error' | 'warning' | 'success'
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
  padding: ${props => props.$isDot ? '0' : `0 ${semantic.spacing.component.xs}`};
  border-radius: ${radius.circle};
  line-height: ${count.lineHeight};
  white-space: nowrap;
  box-shadow: 0 0 0 ${ring.width} ${color.background.default};
  animation: ${scaleIn} ${semantic.motion.duration.normal} ${semantic.motion.easing.easeOut};

  ${reducedMotion} {
    animation: none;
  }
  
  ${props => {
    switch (props.$variant) {
      case 'accent':
      case 'primary': // Deprecated alias for 'accent', removed in 3.0 (#169)
        return `
          background-color: ${color.background.interactive};
          color: ${color.text.inverse};
        `
      case 'error':
        return `
          background-color: ${color.background.error};
          color: ${color.text.inverse};
        `
      case 'warning':
        return `
          background-color: ${color.background.warning};
          color: ${color.text.inverse};
        `
      case 'success':
        return `
          background-color: ${color.background.success};
          color: ${color.text.inverse};
        `
      default:
        return `
          background-color: ${color.background.emphasis};
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
