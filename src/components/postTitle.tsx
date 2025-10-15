import React from 'react'
import styled from 'styled-components'
import { ReactNode } from 'react'
import { Typography } from './'
import tokens from '../styles/tokens.json'

const { base: { spacing } } = tokens

type Props = {
  children?: ReactNode
}

const TitleWrapper = styled.div`
  margin: ${spacing[8]} 0;
`

export const PostTitle = ({ children }: Props) => {
  return (
    <TitleWrapper>
      <Typography variant="h1">
        {children}
      </Typography>
    </TitleWrapper>
  )
}