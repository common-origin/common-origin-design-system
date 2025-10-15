import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { Button, Container } from './'
import tokens from '@/styles/tokens.json'

interface FeatureSetProps {
  musicImage?: string
  artImage?: string
}

const FeatureSection = styled.section`
  position: relative;
  z-index: ${tokens.base.zIndex[1]};
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.base.spacing[32]};
  margin-top: ${tokens.base.spacing[32]};
  margin-bottom: ${tokens.base.spacing[32]};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: ${tokens.base.spacing[8]} ${tokens.base.spacing[8]};

    & > :nth-child(odd) {
      margin-bottom: ${tokens.base.spacing[32]};
    }
  }
`

const FeatureItem = styled.div``

const ImageContainer = styled.div`
  margin-bottom: ${tokens.base.spacing[6]};
`

const StyledImage = styled(Image)`
  width: 100%;
  border-radius: ${tokens.base.border.radius[6]};
  box-shadow: ${tokens.base.shadow[6]};
`

const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${tokens.base.spacing[6]};
  gap: ${tokens.base.spacing[4]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${tokens.base.spacing[3]};
  }
`

const FeatureTitle = styled.h3`
  font-size: ${tokens.base.fontSize[9]};
  line-height: ${tokens.base.lineHeight[3]};
  color: ${tokens.semantic.color.text.default};
  
  a {
    color: inherit;
    text-decoration: none;
    transition: text-decoration 0.15s ease;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export const FeatureSet: React.FC<FeatureSetProps> = ({
  musicImage = '/assets/art/art-desire-path_1.jpg',
  artImage = '/assets/art/art-residual-simulation_1.jpg'
}) => {
  return (
    <FeatureSection>
      <Container>
        <ContentGrid>
          <FeatureItem>
            <ImageContainer>
              <Link href="/music" aria-label="View Common Origin Music">
                <StyledImage 
                  src={musicImage} 
                  alt="Cover Image for Particles EP" 
                  width={400} 
                  height={400} 
                  placeholder="blur" 
                  blurDataURL={musicImage} 
                />
              </Link>
            </ImageContainer>
            <ContentRow>
              <FeatureTitle>
                <Link href="/music">
                  Music
                </Link>
              </FeatureTitle>
              <Button url="/music" purpose="button">
                Listen to the latest releases
              </Button>
            </ContentRow>
          </FeatureItem>
          <FeatureItem>
            <ImageContainer>
              <Link href="/art" aria-label="View Common Origin Art">
                <StyledImage 
                  src={artImage} 
                  alt="Image of generative artwork" 
                  width={400} 
                  height={400} 
                  placeholder="blur" 
                  blurDataURL={artImage} 
                />
              </Link>
            </ImageContainer>
            <ContentRow>
              <FeatureTitle>
                <Link href="/art">
                  Artwork
                </Link>
              </FeatureTitle>
              <Button url="/art" purpose="button">
                See the gallery
              </Button>
            </ContentRow>
          </FeatureItem>
        </ContentGrid>
      </Container>
    </FeatureSection>
  )
}
