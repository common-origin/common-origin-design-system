import React from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'

export type StackDirection = 'column' | 'row'
export type StackAlign = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
export type StackJustify = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'

export interface StackProps {
  children: React.ReactNode
  direction?: StackDirection
  alignItems?: StackAlign
  justifyContent?: StackJustify
  gap?: StackGap
  wrap?: boolean
  'data-testid'?: string
}

interface StyledStackProps {
  $direction: StackDirection
  $alignItems?: StackAlign
  $justifyContent?: StackJustify
  $gap: string
  $wrap: boolean
}

const StyledStack = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})`
  display: flex;
  flex-direction: var(--stack-direction);
  align-items: var(--stack-align-items);
  justify-content: var(--stack-justify-content);
  gap: var(--stack-gap);
  flex-wrap: var(--stack-wrap);
`

// Each gap name maps to the space step that replaced its old spacing.layout token (decision 0031),
// so every gap keeps its value
const GAP_SPACE: Record<StackGap, Exclude<keyof typeof tokens.semantic.space, 'inset'>> = {
  none: '0',
  xs: '100',
  sm: '200',
  md: '300',
  lg: '400',
  xl: '500',
  '2xl': '600',
  '3xl': '700',
  '4xl': '800',
  '5xl': '900',
  '6xl': '1000',
}

// Helper function to convert gap prop to CSS value
const getGapValue = (gap: StackGap): string => {
  const step = GAP_SPACE[gap]
  if (step) {
    return tokens.semantic.space[step]
  }

  // Fallback to medium spacing for an unknown gap (from untyped JavaScript)
  return tokens.semantic.space[300]
}

export const Stack: React.FC<StackProps> = ({ 
  children, 
  direction = 'row', 
  gap = 'md', 
  alignItems, 
  justifyContent,
  wrap = false,
  'data-testid': dataTestId
}) => {
  const gapValue = getGapValue(gap)
  
  // Create CSS custom properties object with proper typing
  const cssProps: React.CSSProperties = {
    '--stack-direction': direction,
    '--stack-align-items': alignItems || 'initial',
    '--stack-justify-content': justifyContent || 'initial',
    '--stack-gap': gapValue,
    '--stack-wrap': wrap ? 'wrap' : 'nowrap'
  } as React.CSSProperties
  
  return (
    <StyledStack 
      style={cssProps}
      data-testid={dataTestId}
    >
      {children}
    </StyledStack>
  )
}

export default Stack
