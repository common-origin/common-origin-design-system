import React from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
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
   * @deprecated Set density on a region with `data-co-density` instead: rows follow it (P9,
   * decision 0051). `spacing` still sets the padding, but not the height, until it's removed in 4.0.
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
