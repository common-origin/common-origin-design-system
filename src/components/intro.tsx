import React from 'react'
import styled from 'styled-components'
import { Typography } from './'
import tokens from '@/styles/tokens.json'

const { base: { spacing } } = tokens

const IntroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${spacing[32]};
  margin-bottom: ${spacing[32]};

  @media (min-width: ${tokens.base.breakpoint.md}) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${spacing[24]};
  }
`

export const Intro: React.FC = () => {
  return (
    <IntroSection>
      <Typography variant="h1">
        Common Origin
      </Typography>
    </IntroSection>
  )
}