import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/atoms/Button'
import { Container } from '../../components/atoms/Container'
import { Stack } from '../../components/atoms/Stack'
import { Typography } from '../../components/atoms/Typography'
import tokens from '@/styles/tokens.json'

const { semantic: { spacing }, base: { border, breakpoint } } = tokens

// Props interface for the HeroBanner component
export interface HeroBannerProps {
  /** Title text - defaults to "Common Origin" */
  title?: string
  /** Subtitle text - defaults to "A creative studio" */
  subtitle?: string
  /** Video source path - defaults to homepage loop video */
  videoSrc?: string
}

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${spacing.layout.lg};
  margin-bottom: ${spacing.layout['4xl']};

  @media (min-width: ${breakpoint.xl}) {
    margin-bottom: ${spacing.layout['10xl']};
  }
`

const HeroContent = styled.div`
  grid-column: span 12;
  margin: ${spacing.layout.lg} 0;

  @media (min-width: ${breakpoint.md}) {
    grid-column: span 6;
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-column: span 5;
  }

  @media (min-width: ${breakpoint.xl}) {
    grid-column: span 4;
  }
`

const HeroVideoContainer = styled.div`
  grid-column: span 12;

  @media (min-width: ${breakpoint.md}) {
    grid-column: span 6;
  }

  @media (min-width: ${breakpoint.lg}) {
    grid-column: span 7;
  }

  @media (min-width: ${breakpoint.xl}) {
    grid-column: span 8;
  }
`

const HeroVideoStyled = styled.video`
  object-fit: cover;
  height: 100%;
  position: absolute;
  object-position: left;
`

const HeroVideoWrapper = styled.div`
  position: relative;
  height: 50vw;
  max-height: 768px;
  margin-top: ${spacing.layout.lg};
  overflow: hidden;
  border-radius: ${border.radius[5]};

  @media (max-width: calc(${breakpoint.md} - 1px)) {
    height: 100vw;
    border-radius: 0;
    min-width: calc(100vw + 2px);
    margin-left: -84px;
    margin-right: -84px;
  }

  @media (max-width: calc(${breakpoint.sm} - 1px)) {
    margin-left: -${spacing.layout['2xl']};
    margin-right: -${spacing.layout['2xl']};
  }
`

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Common Origin",
  subtitle = "A creative studio",
  videoSrc = "./assets/cover/homepage-loop.mp4"
}) => {
  return (
    <Container>
      <HeroGrid role="banner" aria-labelledby="hero-title">
        <HeroContent>
          <Stack direction='column' gap="xl">
            <Stack direction='column' gap="sm">
              <div id="hero-title">
                <Typography variant='display' color='default'>
                  {title}
                </Typography>
              </div>
              <Typography variant='small' color='subdued'>{subtitle}</Typography>
            </Stack>
            <nav role="navigation" aria-label="Explore sections">
              <Stack direction='row' gap="sm">
                <Button variant='secondary' url='/music'>Music</Button>
                <Button variant='secondary' url='/art'>Art</Button>
                <Button variant='secondary' url='/design'>Design</Button>
              </Stack>
            </nav>
          </Stack>
        </HeroContent>
        <HeroVideoContainer>
          <HeroVideoWrapper>
            <HeroVideoStyled
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              role="presentation"
            >
              <source src={videoSrc} type="video/mp4"/>       
            </HeroVideoStyled>
          </HeroVideoWrapper>
        </HeroVideoContainer>
      </HeroGrid>
    </Container>
  )
}