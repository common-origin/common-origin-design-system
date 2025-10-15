import styled from 'styled-components'
import { MoreReleaseCard, Typography, Stack } from './'
import tokens from '@/styles/tokens.json'

const { base: { spacing } } = tokens

type Props = {
  title: string
  coverImage: string
  artist: string
  slug: string
}

const ContainerStyled = styled('div')`
  padding: ${spacing[4]};
  background-color: ${tokens.semantic.color.background.surface};
  height: 100%;
`

export const ReleaseBody = ({ 
  title,
  coverImage, 
  artist,
  slug,
 }: Props) => {

  return (
    <ContainerStyled>
      <Stack direction='column' gap="md">
        <Typography variant='h5'>More releases</Typography>
        <MoreReleaseCard
          key={slug}
          title={title}
          artistName={artist}
          image={coverImage}
          releaseUrl={`/releases/${slug}`}
        />
        <MoreReleaseCard
          key={slug}
          title={title}
          artistName={artist}
          image={coverImage}
          releaseUrl={`/releases/${slug}`}
        />
        <MoreReleaseCard
          key={slug}
          title={title}
          artistName={artist}
          image={coverImage}
          releaseUrl={`/releases/${slug}`}
        />
      </Stack>
    </ContainerStyled>
  )
}
