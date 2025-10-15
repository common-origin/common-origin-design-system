import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { Stack, Typography } from './'
import tokens from '@/styles/tokens.json'

type MoreReleaseCardProps = {
  title: string
  artistName?: string
  image: string
  releaseUrl?: string
}

const MoreReleaseCardStyled = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: row;
  border-radius: ${tokens.base.border.radius[3]};
  background-color: ${tokens.semantic.color.background.default};
  transition: background-color 0.15s ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: ${tokens.base.color.neutral[300]};
  }
`

const ReleaseImage = styled(Image)`
  border-radius: ${tokens.base.border.radius[2]};
  margin-right: ${tokens.base.spacing[4]};
  flex-shrink: 0;
`

export const MoreReleaseCard: React.FC<MoreReleaseCardProps> = ({
  title = 'Release name',
  artistName = 'Artist name',
  image,
  releaseUrl
}) => {
  // Use design token for image size - spacing[10] = 8rem = 128px is close to original 96px
  // Or use a more appropriate size like spacing[9] = 6rem = 96px
  const imageSize = 96 // Keep original size for now, could be tokens.base.spacing[9] converted to pixels

  return (
    <MoreReleaseCardStyled href={releaseUrl || '#'}>
      <ReleaseImage
        src={image}
        alt={title}
        width={imageSize}
        height={imageSize}
        placeholder="blur"
        blurDataURL={image}
      />
      <Stack direction="column" gap="xs" justifyContent='center'>
        <Typography variant="subtitle">{title}</Typography>
        <Typography variant="small" color="subdued">{artistName}</Typography>
      </Stack>
    </MoreReleaseCardStyled>
  )
}