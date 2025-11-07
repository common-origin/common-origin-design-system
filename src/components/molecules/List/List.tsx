import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens

export interface ListProps {
  /**
   * ListItem components
   */
  children: React.ReactNode
  
  /**
   * Show dividers between items
   * @default true
   */
  dividers?: boolean
  
  /**
   * Vertical spacing between items
   * @default 'comfortable'
   */
  spacing?: 'compact' | 'comfortable'
  
  /**
   * Additional CSS class name
   */
  className?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
}

const StyledList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $dividers: boolean
  $spacing: 'compact' | 'comfortable'
}>`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  
  /* Divider styles */
  ${({ $dividers }) => $dividers && `
    > li:not(:last-child) {
      border-bottom: 1px solid ${semantic.color.border.default};
    }
  `}
`

export const List = ({
  children,
  dividers = true,
  spacing = 'comfortable',
  className,
  'data-testid': dataTestId,
  ...props
}: ListProps) => {
  return (
    <StyledList
      $dividers={dividers}
      $spacing={spacing}
      className={className}
      data-testid={dataTestId}
      role="list"
      {...props}
    >
      {children}
    </StyledList>
  )
}

List.displayName = 'List'
