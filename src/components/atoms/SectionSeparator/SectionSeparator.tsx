import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

export interface SectionSeparatorProps {
  /** Variant style of the separator */
  variant?: 'default' | 'strong' | 'minimal'
  /** Size variation affecting spacing */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /** Data test id for testing */
  'data-testid'?: string
}

interface StyledSeparatorProps {
  $variant: SectionSeparatorProps['variant']
  $size: SectionSeparatorProps['size']
}

const StyledSeparator = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$variant', '$size'].includes(prop)
})<StyledSeparatorProps>`
  border: none;
  border-top: 1px solid;
  
  /* Apply variant styles */
  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'strong':
        return `border-top: ${tokens.component.separator.variants.strong.border};`
      case 'minimal':
        return `border-top: ${tokens.component.separator.variants.minimal.border};`
      case 'default':
      default:
        return `border-top: ${tokens.component.separator.variants.default.border};`
    }
  }}
  
  /* Apply size styles */
  ${({ $size = 'large', $variant = 'default' }) => {
    if ($variant === 'minimal') {
      // Minimal variant always uses its predefined spacing
      return `margin: ${tokens.component.separator.variants.minimal.margin};`
    }
    
    switch ($size) {
      case 'small':
        return `margin: ${tokens.component.separator.sizes.small.margin};`
      case 'medium':
        return `margin: ${tokens.component.separator.sizes.medium.margin};`
      case 'xlarge':
        return `margin: ${tokens.component.separator.sizes.xlarge.margin};`
      case 'large':
      default:
        return `margin: ${tokens.component.separator.sizes.large.margin};`
    }
  }}
`

/**
 * SectionSeparator is an atomic component that provides visual separation between content sections.
 * 
 * Features:
 * - Multiple variants (default, strong, minimal)
 * - Size variations for different spacing needs
 * - Semantic token usage for consistent styling
 * - Full accessibility support
 * 
 * @example
 * ```tsx
 * <SectionSeparator />
 * <SectionSeparator variant="strong" size="xlarge" />
 * <SectionSeparator variant="minimal" />
 * ```
 */
export const SectionSeparator: React.FC<SectionSeparatorProps> = ({
  variant = 'default',
  size = 'large',
  'data-testid': dataTestId,
}) => {
  return (
    <StyledSeparator
      $variant={variant}
      $size={size}
      data-testid={dataTestId}
      role="separator"
      aria-orientation="horizontal"
    />
  )
}
