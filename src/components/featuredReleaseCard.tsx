import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Chip, Stack, Typography } from './'
import tokens from '@/styles/tokens.json'

interface FeaturedReleaseCardProps {
  title: string
  recordLabel: string
  artistName?: string
  featuredChip?: string
  image: string
  releaseUrl?: string
}

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${tokens.base.border.radius[3]};
  background-color: ${tokens.semantic.color.background.surface};
  overflow: hidden;
  transition: ${tokens.semantic.motion.transition.normal};
  text-decoration: none;
  box-shadow: ${tokens.base.shadow[3]};

  @media (min-width: 640px) {
    flex-direction: row;
    height: 200px;
  }

  &:hover {
    background-color: ${tokens.semantic.color.background.default};
    box-shadow: ${tokens.base.shadow[4]};
    transform: translateY(-2px);
  }
`

const ImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 200px;
  
  @media (min-width: 640px) {
    width: 200px;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: ${tokens.semantic.spacing.layout.lg};

  h5 {
    color: ${tokens.semantic.color.text.default};
  }

  p {
    color: ${tokens.semantic.color.text.subdued};
  }
`

export const FeaturedReleaseCard: React.FC<FeaturedReleaseCardProps> = ({
  title = 'Release name',
  recordLabel = 'Record label',
  artistName = 'Artist name',
  featuredChip,
  image,
  releaseUrl = '#'
}) => {
  return (
    <CardContainer href={releaseUrl}>
      <ImageContainer>
        <Image
          src={image}
          alt={`Album cover for ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL={image}
        />
      </ImageContainer>
      <ContentWrapper>
        <Stack direction="column" gap="sm">
          {featuredChip && (
            <Chip title={featuredChip} variant="dark" />
          )}
          <Stack direction="column" gap="xs">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="caption">{recordLabel}</Typography>
            {artistName && (
              <Typography variant="small">{artistName}</Typography>
            )}
          </Stack>
        </Stack>
      </ContentWrapper>
    </CardContainer>
  )
}