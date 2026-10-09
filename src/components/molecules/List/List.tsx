import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { ListSpacingContext, type ListSpacing } from './ListContext'

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
   * Density of the list's items: their padding. A ListItem's own `spacing` overrides it (#77).
   * @default 'comfortable'
   */
  spacing?: ListSpacing
  
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
}>`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  
  /* Divider styles */
  ${({ $dividers }) => $dividers && `
    > li:not(:last-child) {
      border-bottom: ${semantic.border.width.thin} solid ${semantic.color.border.default};
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
    <ListSpacingContext.Provider value={spacing}>
      <StyledList
        $dividers={dividers}
        className={className}
        data-testid={dataTestId}
        role="list"
        {...props}
      >
        {children}
      </StyledList>
    </ListSpacingContext.Provider>
  )
}

List.displayName = 'List'
