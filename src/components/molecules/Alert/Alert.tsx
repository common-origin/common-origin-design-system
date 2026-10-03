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

// The exit ends on the alert's own animationend: 300ms, or 150ms under reduced motion
// (chosen when dismissed). A timer of the same length removes it if no animation event
// arrives, for example where animations are disabled or the tab is hidden.

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
   * Whether the severity border is drawn (decision 0019)
   * - outlined: severity tint and a 1px severity border. Only for alerts at the top: a
   *   page-level alert at the top of the page, an alert at the top of the content area, and an
   *   error summary
   * - borderless: severity tint only. Every other alert, including alerts inside content and at
   *   the bottom of a page; the icon and title colour carry the severity
   * @default 'outlined'
   */
  appearance?: 'outlined' | 'borderless'
  
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
   * Optional action button or component, placed below the message and left-aligned with it
   */
  action?: React.ReactNode
  
  /**
   * Compact inline variant with reduced padding
   * @default false
   * @deprecated Use `InlineAlert` for a short, local message (decision 0019). `inline` keeps
   * working until it is removed in 3.0. An inline alert that needs a title, action or dismiss
   * button stays an Alert.
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
  $appearance: NonNullable<AlertProps['appearance']>
  $inline: boolean
  $isExiting: boolean
  $reducedExit: boolean
}>`
  display: flex;
  /* Items start at the top, so the icon and dismiss button line up with the first line */
  align-items: flex-start;
  gap: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  padding: ${({ $inline }) =>
    $inline ? semantic.spacing.layout.sm : semantic.spacing.layout.md};
  border-radius: ${semantic.border.radius.sm};
  border: ${semantic.border.width.thin} solid;
  position: relative;
  width: 100%;
  
  /* Severity × appearance colours from Alert's component tokens (decision 0019). Borderless
     keeps a transparent border, so both appearances take the same space. */
  background-color: ${({ $variant = 'info' }) => alert.severity[$variant].background};
  color: ${({ $variant = 'info' }) => alert.severity[$variant].text};
  border-color: ${({ $variant = 'info', $appearance }) => alert.appearance[$appearance].borderColor[$variant]};
  
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

// The action follows the content, left-aligned with it, so it's read after the message
// (#122). With the content's xs gap, the space above it is md: a separate step.
const StyledActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${semantic.spacing.layout.sm};
  margin-top: calc(${semantic.spacing.layout.md} - ${semantic.spacing.layout.xs});
`

// The dismiss button's centre lines up with the first line of content: the title, or the
// message when there's no title (decision 0019). The slot is as tall as that line and the
// button is centred in it, overflowing evenly into the padding, so it stays aligned at every
// padding and line height. Being in the row, it also keeps text and actions from running under it.
const StyledDismissSlot = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $lineHeight: string }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: ${({ $lineHeight }) => $lineHeight};
`

// The glyph sits on the padding edge, mirroring the severity icon on the left. The inline
// alert's padding is too small for that, so its button stays inside the padding.
const StyledDismissButton = styled(IconButton)<{ $inline: boolean }>`
  margin-right: ${({ $inline }) =>
    $inline
      ? 0
      : `calc((${tokens.component.iconButton.sizes.small.minWidth} - ${semantic.size.icon.sm}) / -2)`};
`

export const Alert = ({
  variant = 'info',
  appearance = 'outlined',
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
    const timer = setTimeout(() => setPhase('dismissed'), reducedExit ? FADE_MS : EXIT_MS)
    return () => clearTimeout(timer)
  }, [phase, reducedExit])

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
      $appearance={appearance}
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
        {action && <StyledActions>{action}</StyledActions>}
      </StyledContent>

      {dismissible && (
        <StyledDismissSlot
          $lineHeight={title ? alert.title.lineHeight : alert.message.lineHeight}
        >
          <StyledDismissButton
            iconName="close"
            size="small"
            variant="naked"
            $inline={inline}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            data-testid={dataTestId ? `${dataTestId}-dismiss` : undefined}
          />
        </StyledDismissSlot>
      )}
    </StyledAlert>
  )
}

Alert.displayName = 'Alert'
