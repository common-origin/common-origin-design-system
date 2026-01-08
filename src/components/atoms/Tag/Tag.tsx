import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens
const { color, spacing, border, typography, size } = semantic
const { layout } = spacing
const { radius } = border

export interface TagProps {
  /**
   * Text content to display in the tag
   */
  children: React.ReactNode
  
  /**
   * Visual variant of the tag based on semantic meaning
   * @default 'default'
   */
  variant?: 'default' | 'interactive' | 'success' | 'warning' | 'error' | 'emphasis'
  
  /**
   * Whether to show a border
   * @default true
   */
  border?: boolean
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

interface StyledTagProps {
  $variant: TagProps['variant']
  $border: boolean
}

const StyledTag = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTagProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.sm};
  user-select: none;
  white-space: nowrap;
  max-height: ${size.icon.lg || '2rem'};
  
  /* Size - fixed to small */
  padding: ${layout.xs} ${layout.sm};
  font: ${typography.button3};
  
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
        return `1px solid ${color.border.interactive}`
      case 'success':
        return `1px solid ${color.border.success}`
      case 'warning':
        return `1px solid ${color.border.warning}`
      case 'error':
        return `1px solid ${color.border.error}`
      case 'emphasis':
        return `1px solid ${color.background.emphasis}`
      default:
        return `1px solid ${color.border.default}`
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
  'data-testid': dataTestId,
  ...props
}) => {
  return (
    <StyledTag
      $variant={variant}
      $border={border}
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
