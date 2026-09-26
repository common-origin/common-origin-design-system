import React from 'react'
import styled from 'styled-components'
import { breakpoints, media } from '../../../lib/styleUtils'
import tokens from '@/styles/tokens.json'

const { semantic: { spacing } } = tokens

export type ContainerProps = {
  children?: React.ReactNode
  'data-testid'?: string
} & React.HTMLAttributes<HTMLDivElement>

const StyledContainer = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${spacing.layout['2xl']};
  padding-right: ${spacing.layout['2xl']};
  
  ${media.sm} {
    max-width: ${breakpoints.sm};
  }
  
  ${media.md} {
    max-width: ${breakpoints.md};
  }
  
  ${media.lg} {
    max-width: ${breakpoints.lg};
  }
  
  ${media.xl} {
    max-width: ${breakpoints.xl};
  }
  
  ${media['2xl']} {
    max-width: ${breakpoints['2xl']};
  }
`

export const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}