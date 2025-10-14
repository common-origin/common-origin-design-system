import React from 'react'
import styled from 'styled-components'
import { media } from '../../../lib/styleUtils'
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
    max-width: 640px;
  }
  
  ${media.md} {
    max-width: 768px;
  }
  
  ${media.lg} {
    max-width: 1024px;
  }
  
  ${media.xl} {
    max-width: 1280px;
  }
  
  ${media['2xl']} {
    max-width: 1536px;
  }
`

export const Container = ({ children, ...props }: ContainerProps) => {
  return <StyledContainer {...props}>{children}</StyledContainer>
}