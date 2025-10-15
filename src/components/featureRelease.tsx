import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Container, CoverImage } from './'
import tokens from '../styles/tokens.json'

const { base: { spacing, color }, semantic } = tokens

type FeatureReleaseProps = {
  title?: string
  artistName?: string
  description?: string
  coverImage?: string
  linkUrl?: string
  linkText?: string
}

const FeatureSection = styled.section`
  background-color: ${color.neutral[200]};
`

const ContentWrapper = styled.div`
  padding: ${spacing[6]} 0;

  @media (min-width: 768px) {
    padding: ${spacing[12]} 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[12]};
  }

  @media (min-width: 1024px) {
    gap: ${spacing[12]};
  }
`

const ImageWrapper = styled.div`
  margin-bottom: ${spacing[3]};

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const TextContent = styled.div`
  margin-bottom: ${spacing[3]};
`

const FeatureLabel = styled.h2`
  margin-bottom: ${spacing[6]};
  font-size: 0.75rem;
  color: ${color.neutral[600]};
  line-height: 1.25;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @media (min-width: 768px) {
    margin-bottom: ${spacing[6]};
  }
`

const FeatureTitle = styled.h3`
  margin-bottom: ${spacing[3]};
  font-size: 2.25rem;
  color: ${color.neutral[900]};
  line-height: 1.25;

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`

const FeatureDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.625;
  margin-bottom: ${spacing[3]};
  color: ${color.neutral[700]};
`

const FeatureLink = styled(Link)`
  text-decoration: underline;
  color: ${semantic.color.text.default};
  
  &:hover {
    color: ${semantic.color.text.subdued};
  }
`

export const FeatureRelease: React.FC<FeatureReleaseProps> = ({
  title = "Disappear Here - Particles EP",
  description = "The debut self-released EP from Disappear Here, featuring five tracks of deep, textured atmospheres. Only available for digital download through BandCamp, this EP is a taste of what's to come for Disappear Here.",
  coverImage = "/assets/releases/commonorigin-particles.jpg",
  linkUrl = "/",
  linkText = "Listen on BandCamp"
}) => {
  return (
    <FeatureSection>
      <Container>
        <ContentWrapper>
          <ImageWrapper>
            <CoverImage title={title} src={coverImage} />
          </ImageWrapper>
          <TextContent>
            <FeatureLabel>
              Featured release
            </FeatureLabel>
            <FeatureTitle>
              {title}
            </FeatureTitle>
            <FeatureDescription>
              {description}
            </FeatureDescription>
            <FeatureLink href={linkUrl}>
              {linkText}
            </FeatureLink>
          </TextContent>
        </ContentWrapper>
      </Container>
    </FeatureSection>
  )
}
