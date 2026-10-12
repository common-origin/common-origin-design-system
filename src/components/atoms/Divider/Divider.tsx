import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

// Destructure tokens for cleaner access
const { separator: separatorTokens } = tokens.component
// Margins come from the semantic separator spacing: no component spacing tokens (decision 0022)
const { space } = tokens.semantic

export interface DividerProps {
  /** Variant style of the divider */
  variant?: 'default' | 'strong' | 'minimal'
  /** Size variation affecting spacing */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical'
  /** Data test id for testing */
  'data-testid'?: string
}

interface StyledDividerProps {
  $variant: DividerProps['variant']
  $size: DividerProps['size']
  $orientation: DividerProps['orientation']
}

const StyledDivider = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledDividerProps>`
  border: none;
  
  /* Apply orientation */
  ${({ $orientation = 'horizontal' }) => {
    if ($orientation === 'vertical') {
      return `
        display: inline-block;
        height: auto;
        align-self: stretch;
        border-left: ${tokens.semantic.border.width.thin} solid;
        border-top: none;
      `
    }
    return `border-top: ${tokens.semantic.border.width.thin} solid;`
  }}
  
  /* Apply variant styles */
  ${({ $variant = 'default', $orientation = 'horizontal' }) => {
    const borderProperty = $orientation === 'vertical' ? 'border-left' : 'border-top'
    switch ($variant) {
      case 'strong':
        return `${borderProperty}: ${separatorTokens.variants.strong.border};`
      case 'minimal':
        return `${borderProperty}: ${separatorTokens.variants.minimal.border};`
      case 'default':
      default:
        return `${borderProperty}: ${separatorTokens.variants.default.border};`
    }
  }}
  
  /* Apply size styles (spacing) */
  ${({ $size = 'large', $variant = 'default', $orientation = 'horizontal' }) => {
    if ($variant === 'minimal' && $orientation === 'horizontal') {
      // Minimal variant always uses its predefined spacing for horizontal
      return `margin: ${space[600]} 0;`
    }
    
    if ($orientation === 'vertical') {
      // Vertical orientation uses horizontal margins (left/right)
      switch ($size) {
        case 'small':
          return `margin: 0 ${space[400]};`
        case 'medium':
          return `margin: 0 ${space[600]};`
        case 'xlarge':
          return `margin: 0 ${space[1200]};`
        case 'large':
        default:
          return `margin: 0 ${space[800]};`
      }
    }
    
    // Horizontal orientation uses vertical margins (top/bottom)
    switch ($size) {
      case 'small':
        return `margin: ${space[400]} 0;`
      case 'medium':
        return `margin: ${space[600]} 0;`
      case 'xlarge':
        return `margin: ${space[1200]} 0;`
      case 'large':
      default:
        return `margin: ${space[800]} 0;`
    }
  }}
`

/**
 * Divider is an atomic component that provides visual separation between content sections.
 * 
 * Features:
 * - Multiple variants (default, strong, minimal)
 * - Size variations for different spacing needs
 * - Horizontal and vertical orientations
 * - Semantic token usage for consistent styling
 * - Full accessibility support
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="strong" size="xlarge" />
 * <Divider variant="minimal" />
 * <Divider orientation="vertical" />
 * ```
 */
export const Divider: React.FC<DividerProps> = ({
  variant = 'default',
  size = 'large',
  orientation = 'horizontal',
  'data-testid': dataTestId,
}) => {
  return (
    <StyledDivider
      $variant={variant}
      $size={size}
      $orientation={orientation}
      data-testid={dataTestId}
      role="separator"
      aria-orientation={orientation}
    />
  )
}
