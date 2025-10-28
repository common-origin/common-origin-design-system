import React from 'react'
import styled, { keyframes } from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic: { color, typography }, base: { fontSize, shadow } } = tokens

export interface BadgeProps {
  /** Content to wrap with the badge */
  children: React.ReactNode
  /** Number to display in the badge. If 0, badge is hidden */
  count?: number
  /** Maximum number to display before showing "99+" */
  max?: number
  /** Visual variant of the badge */
  variant?: 'default' | 'primary' | 'error' | 'warning' | 'success'
  /** Show only a dot indicator instead of count */
  dot?: boolean
  /** Screen reader label for the badge */
  'aria-label'?: string
  /** Additional CSS class */
  className?: string
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
  min-width: ${props => props.$isDot ? '8px' : '20px'};
  height: ${props => props.$isDot ? '8px' : '20px'};
  padding: ${props => props.$isDot ? '0' : '0 6px'};
  border-radius: ${tokens.base.border.radius.circle};
  font: ${typography.caption};
  font-size: ${fontSize[1]};
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  box-shadow: 0 0 0 2px ${color.background.default};
  animation: ${scaleIn} 0.2s ease-out;
  
  ${props => {
    switch (props.$variant) {
      case 'primary':
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

export const Badge: React.FC<BadgeProps> = ({
  children,
  count = 0,
  max = 99,
  variant = 'default',
  dot = false,
  'aria-label': ariaLabel,
  className
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
    <BadgeWrapper className={className}>
      {children}
      <BadgeIndicator
        $variant={variant}
        $isDot={dot}
        $isVisible={isVisible}
        role="status"
        aria-live="polite"
      >
        {!dot && displayCount}
        <ScreenReaderOnly>{label}</ScreenReaderOnly>
      </BadgeIndicator>
    </BadgeWrapper>
  )
}
