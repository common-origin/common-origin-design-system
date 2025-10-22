import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

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

// Helper function to convert gap prop to CSS value
const getGapValue = (gap: StackGap): string => {
  // Get semantic layout spacing token
  const semanticSpacing = tokens.semantic.spacing.layout as Record<string, string>
  
  if (gap in semanticSpacing) {
    return semanticSpacing[gap as keyof typeof semanticSpacing]
  }
  
  // Fallback to medium layout spacing if token not found
  return tokens.semantic.spacing.layout.md
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
