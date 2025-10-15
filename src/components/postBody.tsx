import React from 'react'
import styled from 'styled-components'
import { Button, SectionSeparator } from '.'
import tokens from '@/styles/tokens.json'

const { base: { spacing } } = tokens

type Props = {
  content: string
  tag: string
}

const Container = styled.div<{ $maxWidth?: string }>`
  max-width: ${props => props.$maxWidth || '64rem'};
  margin: 0 auto;
`

const GridContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${spacing[8]};
`

const GridContent = styled.div`
  grid-column: span 12;
  
  @media (min-width: 1280px) {
    grid-column: span 9 / 13;
    grid-column-start: 4;
  }
`

export const PostBody = ({ 
  content,
  tag,
}: Props) => {
  if ( tag === 'portfolio' ) {
    return (
      <Container $maxWidth="64rem">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <SectionSeparator />
        <Button
          purpose='link'
          url='/portfolio'
        >
          Back to Portfolio
        </Button>
      </Container>
    )
  } else if ( tag === 'design' ) {
    return (
      <Container $maxWidth="64rem">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <SectionSeparator />
        <Button
          purpose='link'
          url='/design'
        >
          Back to all Design
        </Button>
      </Container>
    )
  } else if ( tag === 'art' ) {
    return (
      <GridContainer>
        <GridContent
          className="markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </GridContainer>
    )
  } else if ( tag === 'release' ) {
    return (
      <Container $maxWidth="48rem">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    )
  } else {
    return (
      <Container $maxWidth="64rem">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    )
  }
}
