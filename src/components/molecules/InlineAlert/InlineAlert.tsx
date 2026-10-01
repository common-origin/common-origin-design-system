import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { Icon } from '../../atoms/Icon'
import type { IconName } from '../../../types/icons'

const { semantic } = tokens
const { color, typography, spacing, size } = semantic

export type InlineAlertVariant = 'error' | 'warning' | 'info' | 'success'
export type InlineAlertSize = 'small' | 'medium'

export interface InlineAlertProps {
  /**
   * Severity, shown by the icon and the text colour
   * @default 'info'
   */
  variant?: InlineAlertVariant

  /**
   * Size on the label scale (decision 0018): small (20px) for dense places such as tables,
   * medium (24px) for forms and content. The message can wrap; the size sets its minimum height.
   * @default 'medium'
   */
  size?: InlineAlertSize

  /**
   * The message: short text only (no title, action or dismiss button; use Alert for those).
   * With no message, InlineAlert renders an empty live region and no icon: keep it mounted and
   * set the message to have screen readers announce it reliably.
   */
  children?: React.ReactNode

  /**
   * ARIA live region behaviour, as on Alert
   * - polite: non-urgent announcements
   * - assertive: important, time-sensitive information
   * - off: not announced
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive' | 'off'

  /**
   * Element id. When the message gives feedback about a control, the control references this
   * id with aria-describedby, so the message is read when the control is focused.
   */
  id?: string

  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

const variantIcons: Record<InlineAlertVariant, IconName> = {
  error: 'crossCircle',
  warning: 'bell',
  info: 'info',
  success: 'checkRing'
}

const variantTextColors: Record<InlineAlertVariant, string> = {
  error: color.text.error,
  warning: color.text.warning,
  info: color.text.interactive,
  success: color.text.success
}

const sizeConfig = {
  small: { font: typography.caption, gap: spacing.layout.xs, icon: 'xs' as const },
  medium: { font: typography.small, gap: spacing.layout.sm, icon: 'sm' as const }
}

const StyledInlineAlert = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{ $variant: InlineAlertVariant; $size: InlineAlertSize; $empty: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  min-height: ${({ $size, $empty }) => ($empty ? '0' : size.label[$size])};
  gap: ${({ $size }) => sizeConfig[$size].gap};
  font: ${({ $size }) => sizeConfig[$size].font};
  color: ${({ $variant }) => variantTextColors[$variant]};
`

// One line of the message's font tall, so the icon centres on the first line at any size:
// the zero-width space gives the box the font's line height without a fixed value
const StyledIconLine = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  &::after {
    content: '\\200B';
  }
`

const StyledMessage = styled.span`
  min-width: 0;
`

/**
 * InlineAlert is a short, local message that sits next to what it's about: between paragraphs,
 * below a field or in a table cell (decision 0019). A severity icon and text in the severity
 * colour, with no background or border. For a title, an action or a dismiss button, use Alert.
 *
 * @example
 * ```tsx
 * <InlineAlert variant="success">Saved</InlineAlert>
 *
 * // Field feedback: the control references the message with aria-describedby
 * <input id="email" aria-describedby="email-error" aria-invalid="true" />
 * <InlineAlert id="email-error" variant="error" size="small">Enter a valid email address</InlineAlert>
 * ```
 */
export const InlineAlert: React.FC<InlineAlertProps> = ({
  variant = 'info',
  size: alertSize = 'medium',
  children,
  ariaLive = 'polite',
  id,
  'data-testid': dataTestId
}) => {
  // A live region is announced reliably only when it exists before its content changes, so with
  // no message it stays mounted as an empty region, with no icon and no minimum height
  const hasMessage = children !== undefined && children !== null && children !== false && children !== ''

  return (
    <StyledInlineAlert
      // Same roles as Alert; ariaLive sets how urgently changes are announced
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={ariaLive}
      id={id}
      data-testid={dataTestId}
      $variant={variant}
      $size={alertSize}
      $empty={!hasMessage}
    >
      {hasMessage && (
        <>
          <StyledIconLine aria-hidden="true">
            {/* The icon takes the text colour, so the two can't diverge */}
            <Icon name={variantIcons[variant]} size={sizeConfig[alertSize].icon} iconColor="inherit" />
          </StyledIconLine>
          <StyledMessage>{children}</StyledMessage>
        </>
      )}
    </StyledInlineAlert>
  )
}

InlineAlert.displayName = 'InlineAlert'
