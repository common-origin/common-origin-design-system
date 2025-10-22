import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic: { typography, color } } = tokens

export type TypographyVariant = 
  | 'display' 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle' 
  | 'body' 
  | 'small' 
  | 'overline' 
  | 'caption' 
  | 'button1' 
  | 'button2' 
  | 'button3' 
  | 'label'

export type TypographyColor = "default" | "emphasis" | "subdued" | "inverse" | "disabled" | "interactive" | "error" | "success" | "warning"

export interface TypographyProps {
  /** Typography variant defining the semantic meaning and style */
  variant?: TypographyVariant
  /** Color variant for the text */
  color?: TypographyColor
  /** Content to render */
  children: React.ReactNode
  /** HTML element to render as (overrides default semantic element) */
  as?: React.ElementType
  /** Data test id for testing */
  'data-testid'?: string
}

interface StyledTypographyProps {
  $variant: TypographyVariant
  $color: TypographyColor
}

const getTypographyStyles = (variant: TypographyVariant) => {
  const styles = {
    display: `font: ${typography.display}; letter-spacing: ${tokens.base.letterSpacing[0]};`,
    h1: `font: ${typography.h1}; letter-spacing: ${tokens.base.letterSpacing[0]};`,
    h2: `font: ${typography.h2}; letter-spacing: ${tokens.base.letterSpacing[1]};`,
    h3: `font: ${typography.h3}; letter-spacing: ${tokens.base.letterSpacing[1]};`,
    h4: `font: ${typography.h4}; letter-spacing: ${tokens.base.letterSpacing[1]};`,
    h5: `font: ${typography.h5}; letter-spacing: ${tokens.base.letterSpacing[2]};`,
    h6: `font: ${typography.h6}; letter-spacing: ${tokens.base.letterSpacing[2]};`,
    subtitle: `font: ${typography.subtitle};`,
    body: `font: ${typography.body};`,
    small: `font: ${typography.small};`,
    overline: `font: ${typography.overline};`,
    caption: `font: ${typography.caption}; text-transform: uppercase;`,
    button1: `font: ${typography.button1};`,
    button2: `font: ${typography.button2};`,
    button3: `font: ${typography.button3};`,
    label: `font: ${typography.label};`,
  }
  
  return styles[variant] || styles.body
}

const getTextColor = (colorVariant: TypographyColor) => {
  const colorMap = {
    default: color.text.default,
    emphasis: color.text.emphasis,
    subdued: color.text.subdued,
    inverse: color.text.inverse,
    disabled: color.text.disabled,
    interactive: color.text.interactive,
    error: color.text.error,
    success: color.text.success,
    warning: color.text.warning,
  }
  
  return colorMap[colorVariant] || colorMap.default
}

const getDefaultElement = (variant: TypographyVariant): React.ElementType => {
  const elementMap: Record<TypographyVariant, React.ElementType> = {
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle: 'p',
    body: 'p',
    small: 'span',
    overline: 'span',
    caption: 'span',
    button1: 'span',
    button2: 'span',
    button3: 'span',
    label: 'span',
  }
  
  return elementMap[variant] || 'span'
}

const StyledTypography = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledTypographyProps>`
  ${({ $variant }) => getTypographyStyles($variant)}
  color: ${({ $color }) => getTextColor($color)};
  margin: 0;
  
  /* Ensure proper line height for readability */
  ${({ $variant }) => {
    if (['body', 'subtitle', 'small'].includes($variant)) {
      return 'line-height: 1.5;'
    }
    return ''
  }}
`

/**
 * Typography is an atomic component for rendering text with semantic meaning and consistent styling.
 * 
 * Features:
 * - Semantic variants (h1-h6, body, subtitle, etc.)
 * - Color variants for different contexts
 * - Automatic semantic HTML element selection
 * - Manual element override support
 * - Direct semantic token usage (no component tokens needed)
 * - Full accessibility support
 * 
 * @example
 * ```tsx
 * <Typography variant="h1">Main Heading</Typography>
 * <Typography variant="body" color="subdued">Body text</Typography>
 * <Typography variant="caption" as="figcaption">Image caption</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  children, 
  color = 'default',
  as,
  'data-testid': dataTestId
}) => {
  // $variant and $color are only used for styled-components prop filtering
  const defaultElement = getDefaultElement(variant)
  const elementType = as || defaultElement

  return (
    <StyledTypography 
      as={elementType}
      $variant={variant}
      $color={color}
      data-testid={dataTestId}
    >
      {children}
    </StyledTypography>
  )
}
