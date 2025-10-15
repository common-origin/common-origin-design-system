import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { CoverImage, DateFormatter } from '.'
import tokens from '../styles/tokens.json'

const { base: { spacing }, semantic } = tokens

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
}

const HeroSection = styled.section`
  /* Section wrapper */
`

const CoverImageWrapper = styled.div`
  margin-bottom: ${spacing[4]};

  @media (min-width: 768px) {
    margin-bottom: ${spacing[6]};
  }
`

const ContentGrid = styled.div`
  margin-bottom: ${spacing[6]};

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[8]};
    margin-bottom: ${spacing[12]};
  }

  @media (min-width: 1024px) {
    gap: ${spacing[6]};
  }
`

const TitleSection = styled.div`
  /* Title and date container */
`

const HeroTitle = styled.h3`
  margin-bottom: ${spacing[4]};
  color: ${semantic.color.text.default};
  font: ${semantic.typography.h1};
  line-height: 1.1;

  @media (min-width: 1024px) {
    font-size: ${tokens.base.fontSize[10]};
    line-height: ${tokens.base.lineHeight[10]};
  }
`

const TitleLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const DateContainer = styled.div`
  margin-bottom: ${spacing[4]};
  font: ${semantic.typography.caption};
  color: ${semantic.color.text.subdued};
  text-transform: uppercase;
  letter-spacing: ${tokens.base.letterSpacing[3]};

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const ExcerptSection = styled.div`
  margin-bottom: ${spacing[4]};
`

const ExcerptText = styled.p`
  font: ${semantic.typography.small};
  line-height: 1.6;
  margin-bottom: ${spacing[4]};
  color: ${semantic.color.text.default};
`

export const HeroPost: React.FC<Props> = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}) => {
  return (
    <HeroSection>
      <CoverImageWrapper>
        <CoverImage title={title} src={coverImage} slug={slug} />
      </CoverImageWrapper>
      <ContentGrid>
        <TitleSection>
          <HeroTitle>
            <TitleLink
              href={`/posts/${slug}`}
            >
              {title}
            </TitleLink>
          </HeroTitle>
          <DateContainer>
            <DateFormatter dateString={date} />
          </DateContainer>
        </TitleSection>
        <ExcerptSection>
          <ExcerptText>{excerpt}</ExcerptText>
        </ExcerptSection>
      </ContentGrid>
    </HeroSection>
  )
}
