import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { IconButton } from '../../atoms/IconButton'
import type { IconName } from '../../../types/icons'
import { Typography } from '@/page-components'

const { semantic, base } = tokens

export interface AlertProps {
  /**
   * Visual style variant affecting background, border, and icon colors
   * - error: Critical issues, validation errors (crossCircle icon)
   * - warning: Cautions, potential issues (bell icon)
   * - info: Tips, helper text, neutral information (info icon)
   * - success: Confirmations, successful operations (checkRing icon)
   * @default 'info'
   */
  variant?: 'error' | 'warning' | 'info' | 'success'
  
  /**
   * Alert message content
   */
  children: React.ReactNode
  
  /**
   * Optional title/heading for the alert
   */
  title?: string
  
  /**
   * Show close/dismiss button
   * @default false
   */
  dismissible?: boolean
  
  /**
   * Callback function when alert is dismissed
   */
  onDismiss?: () => void
  
  /**
   * Optional action button or component
   */
  action?: React.ReactNode
  
  /**
   * Compact inline variant with reduced padding
   * @default false
   */
  inline?: boolean
  
  /**
   * ARIA live region behavior
   * - polite: Non-urgent announcements
   * - assertive: Important, time-sensitive information
   * - off: Not announced
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off'
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

// Default icons by variant
const variantIcons: Record<string, IconName> = {
  error: 'crossCircle',
  warning: 'bell',
  info: 'info',
  success: 'checkRing'
}

// Icon colors by variant (using semantic icon color tokens)
const variantIconColors: Record<string, 'error' | 'warning' | 'success' | 'interactive'> = {
  error: 'error',
  warning: 'warning',
  info: 'interactive',
  success: 'success'
}

// Title colors by variant (using semantic text color tokens)
const variantTitleColors: Record<string, 'error' | 'warning' | 'success' | 'interactive'> = {
  error: 'error',
  warning: 'warning',
  info: 'interactive',
  success: 'success'
}

const StyledAlert = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $variant: AlertProps['variant']
  $inline: boolean
}>`
  display: flex;
  align-items: ${({ $inline }) => ($inline ? 'center' : 'flex-start')};
  gap: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  padding: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  border-radius: ${base.border.radius[2]};
  border: 1px solid;
  position: relative;
  width: 100%;
  
  /* Variant-specific colors */
  ${({ $variant }) => {
    switch ($variant) {
      case 'error':
        return `
          background-color: ${semantic.color.background['error-subtle']};
          border-color: ${semantic.color.border.error};
          color: ${semantic.color.text.error};
        `
      case 'warning':
        return `
          background-color: ${semantic.color.background['warning-subtle']};
          border-color: ${semantic.color.border.warning};
          color: ${semantic.color.text.warning};
        `
      case 'success':
        return `
          background-color: ${semantic.color.background['success-subtle']};
          border-color: ${semantic.color.border.success};
          color: ${semantic.color.text.success};
        `
      case 'info':
      default:
        return `
          background-color: ${semantic.color.background['interactive-subtle']};
          border-color: ${semantic.color.border.interactive};
          color: ${semantic.color.text.interactive};
        `
    }
  }}
  
  /* Responsive adjustments */
  @media (min-width: ${base.breakpoint.md}) {
    padding: ${({ $inline }) =>
      $inline
        ? semantic.spacing.layout.sm
        : semantic.spacing.layout.lg};
  }
`

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${semantic.spacing.layout.xs};
  min-width: 0; /* Allow text wrapping */
`

const StyledTitle = styled.span`
  font: ${semantic.typography.h6};
  font-weight: 600 !important;
  margin: 0;
	line-height: 1.125;
`

const StyledMessage = styled.span`
  font: ${semantic.typography.body};
	line-height: 1.25;
`

const StyledActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${semantic.spacing.layout.sm};
  flex-shrink: 0;
  margin-left: auto;
`

const StyledDismissButton = styled(IconButton)`
  margin-left: ${semantic.spacing.layout.xs};
	position: absolute;
	right: 8px;
	top: 10px;
`

export const Alert = ({
  variant = 'info',
  children,
  title,
  dismissible = false,
  onDismiss,
  action,
  inline = false,
  ariaLive = 'polite',
  'data-testid': dataTestId,
  ...props
}: AlertProps) => {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) {
    return null
  }

  // Get the icon for the current variant
  const iconName = variantIcons[variant]
  const alertIconColor = variantIconColors[variant]
  const alertTitleColor = variantTitleColors[variant]

  // Determine ARIA role based on variant and aria-live
  const role = variant === 'error' ? 'alert' : 'status'

  return (
    <StyledAlert
      role={role}
      aria-live={ariaLive}
      $variant={variant}
      $inline={inline}
      data-testid={dataTestId}
      {...props}
    >
      <StyledIconContainer aria-hidden="true">
        <Icon name={iconName} size="md" iconColor={alertIconColor} />
      </StyledIconContainer>

      <StyledContent>
        {title && <StyledTitle role="heading" aria-level={6} color={alertTitleColor}>{title}</StyledTitle>}
        <StyledMessage>{children}</StyledMessage>
      </StyledContent>

      {(action || dismissible) && (
        <StyledActions>
          {action}
          {dismissible && (
            <StyledDismissButton
              iconName="close"
              size="small"
              variant="naked"
              onClick={handleDismiss}
              aria-label="Dismiss alert"
              data-testid={dataTestId ? `${dataTestId}-dismiss` : undefined}
            />
          )}
        </StyledActions>
      )}
    </StyledAlert>
  )
}

Alert.displayName = 'Alert'
