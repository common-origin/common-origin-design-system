import React from 'react'
import styled from 'styled-components'
import { Chip } from '../../atoms/Chip'
import { Button } from '../../atoms/Button'
import { Picture } from '../../atoms/Picture'
import { Divider } from '../../atoms/Divider'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import { DateFormatter } from '../../atoms/DateFormatter'
import tokens from '@/styles/tokens.json'

const { semantic: { spacing: { layout: spacing }, border } } = tokens

export type FeatureBlockProps = {
  title: string
  excerpt: string
  labels: string[]
  coverImage: string
  date: string
  onReadMore?: () => void
  readMoreHref?: string
  readMoreText?: string
}

const FeatureBlockStyled = styled.div`
  @media (min-width: ${tokens.semantic.breakpoint.md}) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }

  @media (min-width: ${tokens.semantic.breakpoint.lg}) {
    gap: ${spacing['7xl']};
  }

  img {
    border-radius: ${border.radius['2xl']};
    transition: ease opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  a {
    text-decoration: none;
  }
`

const ImageWrapper = styled.div`
  grid-column: span 12;

  @media (min-width: ${tokens.semantic.breakpoint.lg}) {
    grid-column: span 6;
  }
`

const ContentSection = styled.div`
  grid-column: span 12;
  margin-top: ${spacing['2xl']};

  @media (min-width: ${tokens.semantic.breakpoint.lg}) {
    grid-column: span 6;
    margin-top: 0;
    padding-right: ${spacing['4xl']};
  }

  @media (min-width: ${tokens.semantic.breakpoint.xl}) {
    padding-right: ${spacing['11xl']};
  }
`

const ButtonWrapper = styled.div`
  button {
    margin-top: ${spacing.lg};
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`



export const FeatureBlock: React.FC<FeatureBlockProps> = ({
  title,
  excerpt,
  labels = [],
  coverImage,
  date,
  onReadMore,
  readMoreHref,
  readMoreText = "Read more",
}) => {
  return (
    <>
      <FeatureBlockStyled>
        <ImageWrapper>
          <Picture title={title} src={coverImage} />
        </ImageWrapper>
        <ContentSection>
          <ContentWrapper>
            <Stack direction="column" gap="md">
              <Typography variant="h3">{title}</Typography>
              <DateFormatter dateString={date} />
              <Typography variant="small">{excerpt}</Typography>
              <Stack direction="row" gap="xs">
                {Array.isArray(labels) && labels.map((label, index) => (
                  <Chip key={index} title={label} variant="default" />
                ))}
              </Stack>
              {(onReadMore || readMoreHref) && (
                <ButtonWrapper>
                  {readMoreHref ? (
                    <Button purpose="link" url={readMoreHref}>
                      {readMoreText}
                    </Button>
                  ) : (
                    <Button onClick={onReadMore}>
                      {readMoreText}
                    </Button>
                  )}
                </ButtonWrapper>
              )}
            </Stack>
          </ContentWrapper>
        </ContentSection>
      </FeatureBlockStyled>
      <Divider />
    </>
  )
}
