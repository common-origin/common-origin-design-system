import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import { IconButton } from '../../atoms/IconButton'
import type { IconName } from '../../../types/icons'
import { useInert } from '../../../lib/usePresence'

const { semantic } = tokens
const { alert } = tokens.component
const { duration, easing } = semantic.motion

// Dismissing fades the alert out, then collapses the space it took (Ollie's call, #35).
// Each half takes duration.fast, so the whole exit stays within the 300ms maximum (P6).
const FADE_MS = parseInt(duration.fast, 10)
const EXIT_MS = FADE_MS * 2

// The --alert-exit-* properties are the alert's height and vertical padding, measured
// when it's dismissed, so nothing moves until the fade has finished
const fadeThenCollapse = keyframes`
  0%, 50% {
    max-height: var(--alert-exit-height);
    padding-top: var(--alert-exit-padding-top);
    padding-bottom: var(--alert-exit-padding-bottom);
    border-width: ${semantic.border.width.thin};
  }
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-width: 0;
  }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`

// The exit ends on the alert's own animationend (300ms, or 150ms under reduced motion,
// following the live preference). This fallback removes it if no animation event arrives,
// for example where animations are disabled; it allows for the preference changing mid-exit.
const EXIT_FALLBACK_MS = EXIT_MS + FADE_MS

// The generated names of the two exits (full, and reduced motion)
const EXIT_ANIMATION_NAMES = [fadeThenCollapse.getName(), fadeOut.getName()]

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
   * Callback function when alert is dismissed. Called once the dismiss animation has
   * finished and the alert has been removed.
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
  $isExiting: boolean
  $reducedExit: boolean
}>`
  display: flex;
  align-items: ${({ $inline }) => ($inline ? 'center' : 'flex-start')};
  gap: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  padding: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  border-radius: ${semantic.border.radius.sm};
  border: ${semantic.border.width.thin} solid;
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
  @media (min-width: ${semantic.breakpoint.md}) {
    padding: ${({ $inline }) =>
      $inline
        ? semantic.spacing.layout.sm
        : semantic.spacing.layout.lg};
  }

  /* The exit is chosen once, when dismissed (not by a media query), so a reduced-motion
     preference that changes mid-exit can't swap animations and flash the faded alert back.
     Reduced motion: fade only; the space closes instantly afterwards. */
  ${({ $isExiting, $reducedExit }) => $isExiting && css`
    overflow: hidden;
    pointer-events: none;
    animation: ${$reducedExit
      ? css`${fadeOut} ${duration.fast} ${easing.easeOut} forwards`
      : css`${fadeThenCollapse} ${EXIT_MS}ms ${easing.easeOut} forwards`};
  `}
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
  font: ${alert.title.typography};
  font-weight: ${alert.title.fontWeight};
  line-height: ${alert.title.lineHeight};
  margin: 0;
`

const StyledMessage = styled.span`
  font: ${alert.message.typography};
  line-height: ${alert.message.lineHeight};
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
	right: ${semantic.spacing.layout.sm};
	top: ${semantic.spacing.layout.sm};
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
  const [phase, setPhase] = React.useState<'visible' | 'exiting' | 'dismissed'>('visible')
  const [reducedExit, setReducedExit] = React.useState(false)
  const [exitStyle, setExitStyle] = React.useState<React.CSSProperties>()
  const alertRef = React.useRef<HTMLDivElement>(null)
  // While it exits, its controls leave the tab order and can't be activated
  useInert(alertRef, phase === 'exiting')
  const onDismissRef = React.useRef(onDismiss)
  React.useEffect(() => {
    onDismissRef.current = onDismiss
  }, [onDismiss])

  const handleDismiss = () => {
    const node = alertRef.current
    if (node) {
      const style = window.getComputedStyle(node)
      const { paddingTop, paddingBottom } = style
      // max-height applies to the content box unless the alert is border-box (it depends on
      // the consumer's reset), so measure whichever box it uses; nothing moves at the click
      const height = Math.max(
        0,
        style.boxSizing === 'border-box'
          ? node.offsetHeight
          : node.offsetHeight -
              parseFloat(paddingTop) -
              parseFloat(paddingBottom) -
              parseFloat(style.borderTopWidth) -
              parseFloat(style.borderBottomWidth)
      )
      setExitStyle({
        '--alert-exit-height': `${height}px`,
        '--alert-exit-padding-top': paddingTop,
        '--alert-exit-padding-bottom': paddingBottom,
      } as React.CSSProperties)
    }
    setReducedExit(
      typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
    setPhase('exiting')
  }

  React.useEffect(() => {
    if (phase !== 'exiting') return
    const timer = setTimeout(() => setPhase('dismissed'), EXIT_FALLBACK_MS)
    return () => clearTimeout(timer)
  }, [phase])

  // onDismiss fires once the alert has been removed from the DOM, so a consumer that
  // unmounts it in onDismiss still gets the animation, and can't observe it
  React.useEffect(() => {
    if (phase === 'dismissed') onDismissRef.current?.()
  }, [phase])

  if (phase === 'dismissed') {
    return null
  }

  const isExiting = phase === 'exiting'

  // Consumers can pass extra HTML attributes, including style, aria-hidden and onAnimationEnd
  const forwarded = props as {
    style?: React.CSSProperties
    'aria-hidden'?: React.AriaAttributes['aria-hidden']
    onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>
  }

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    forwarded.onAnimationEnd?.(event)
    // Only the exit itself ends the dismissal: not animations bubbling up from children,
    // on pseudo-elements, or other animations a consumer puts on the alert
    if (
      isExiting &&
      event.target === event.currentTarget &&
      !event.pseudoElement &&
      EXIT_ANIMATION_NAMES.includes(event.animationName)
    ) {
      setPhase('dismissed')
    }
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
      $isExiting={isExiting}
      $reducedExit={reducedExit}
      data-testid={dataTestId}
      {...props}
      ref={alertRef}
      aria-hidden={isExiting ? true : forwarded['aria-hidden']}
      style={isExiting ? { ...forwarded.style, ...exitStyle } : forwarded.style}
      onAnimationEnd={handleAnimationEnd}
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
