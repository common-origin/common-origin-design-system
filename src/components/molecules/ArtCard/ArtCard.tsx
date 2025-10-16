import styled from 'styled-components'
import { Chip } from '../../atoms/Chip'
import { CoverImage } from '../../atoms/CoverImage'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import tokens from '@/styles/tokens.json'

const { base: { border } } = tokens

export type ArtCardProps = {
  title: string
  excerpt: string
  tag: string
  artist: string
  labels: string[]
  coverImage: string
  slug?: string
}

const ArtCardStyled = styled.div<ArtCardProps>`
  max-width: 768px;

  a {
    text-decoration: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  img {
    border-radius: ${border.radius[6]};
    transition: ease opacity 0.2s;
    width: 100%;
  }
`

export const ArtCard = ({
  title,
  excerpt,
  tag,
  artist,
  labels,
  coverImage,
  slug,
}: ArtCardProps) => {
  if (tag === 'art') {
    return (
      <>
        <ArtCardStyled
          title={title}
          excerpt={excerpt}
          tag={tag}
          labels={labels}
          artist={artist}
          coverImage={coverImage}
        >
          <Stack direction="column" gap="md">
            <CoverImage title={title} src={coverImage} slug={slug} />
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap="xs">
              <Stack direction="column" gap="xs">
                <Typography variant="h6">{title}</Typography>
                <Typography variant="small" color="subdued">{artist}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="xs">
                {Array.isArray(labels) && labels.map((label, index) => (
                  <Chip key={index} title={label} variant="default" />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </ArtCardStyled>
      </>
    )
  }
  
  return null
}
