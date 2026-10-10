import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens
const { color, spacing, border, size } = semantic
const { label } = tokens.component.badge
const { layout } = spacing
const { radius } = border

export interface TagProps {
  /**
   * Text content to display in the tag
   */
  children: React.ReactNode
  
  /**
   * Visual variant. Tag is neutral metadata: use `default`, or `emphasis` (near-black) to make a
   * tag stand out. `success`, `warning` and `error` are deprecated (status belongs to
   * `StatusLabel`), and so is `interactive` (a blue fill on a static label is decoration).
   * They keep working until they are removed in 3.0 (decision 0029).
   * @default 'default'
   */
  variant?: 'default' | 'interactive' | 'success' | 'warning' | 'error' | 'emphasis'
  
  /**
   * Whether to show a border
   * @default true
   */
  border?: boolean

  /**
   * Size: small (20px) for dense layouts, or medium (24px). Decision 0018 size scale.
   * @default 'medium'
   */
  size?: 'small' | 'medium'
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

interface StyledTagProps {
  $variant: TagProps['variant']
  $border: boolean
  $size: NonNullable<TagProps['size']>
}

const StyledTag = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTagProps>`
  box-sizing: border-box; /* the height includes padding and border, without relying on a global reset */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.sm};
  user-select: none;
  white-space: nowrap;

  /* Size (decision 0018): small has no vertical padding so the text line fits inside 20px */
  height: ${({ $size }) => size.label[$size]};
  padding: ${({ $size }) => $size === 'small' ? `0 ${layout.sm}` : `${layout.xs} ${layout.sm}`};
  font: ${label.typography.small};
  font-weight: ${label.fontWeight};
  
  /* Variant styles */
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'interactive':
        return color.background['interactive-subtle']
      case 'success':
        return color.background['success-subtle']
      case 'warning':
        return color.background['warning-subtle']
      case 'error':
        return color.background['error-subtle']
      case 'emphasis':
        return color.background.emphasis
      default:
        return color.background.surface
    }
  }};
  
  color: ${({ $variant }) => {
    switch ($variant) {
      case 'interactive':
        return color.text.interactive
      case 'success':
        return color.text.success
      case 'warning':
        return color.text.warning
      case 'error':
        return color.text.error
      case 'emphasis':
        return color.text.inverse
      default:
        return color.text.default
    }
  }};
  
  border: ${({ $variant, $border }) => {
    if (!$border) return 'none'
    
    switch ($variant) {
      case 'interactive':
        return `${semantic.border.width.thin} solid ${color.border.interactive}`
      case 'success':
        return `${semantic.border.width.thin} solid ${color.border.success}`
      case 'warning':
        return `${semantic.border.width.thin} solid ${color.border.warning}`
      case 'error':
        return `${semantic.border.width.thin} solid ${color.border.error}`
      case 'emphasis':
        return `${semantic.border.width.thin} solid ${color.background.emphasis}`
      default:
        return `${semantic.border.width.thin} solid ${color.border.default}`
    }
  }};
`

/**
 * Tag component for categorizing and labeling content
 * 
 * A static, non-interactive label used to categorize elements or objects in the UI.
 * Tags help users quickly identify and understand content classification.
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  border = true,
  size: tagSize = 'medium',
  'data-testid': dataTestId,
  ...props
}) => {
  return (
    <StyledTag
      $variant={variant}
      $border={border}
      $size={tagSize}
      data-testid={dataTestId}
      data-variant={variant}
      data-border={border}
      role="status"
      aria-label={typeof children === 'string' ? `Tag: ${children}` : undefined}
      {...props}
    >
      {children}
    </StyledTag>
  )
}
