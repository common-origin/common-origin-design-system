import React from 'react'
import styled from 'styled-components'
import type Track from '../../interfaces/track'
import { Button, CoverImage, PageTitle, Stack, TrackItem } from './'
import tokens from '../styles/tokens.json'

const { base: { spacing } } = tokens

type Props = {
  title: string
  recordLabel: string
  coverImage: string
  link?: string
  artist: string
  slug: string
  tracks: Track[]
  content: string
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${spacing[8]} ${spacing[8]};
`

const ContentColumn = styled.div`
  grid-column: span 12;

  @media (min-width: 1024px) {
    grid-column: span 6;
  }

  @media (min-width: 1280px) {
    grid-column: span 5;
  }
`

const ImageColumn = styled.div`
  grid-column: span 12;

  @media (min-width: 1024px) {
    grid-column: span 6;
  }

  @media (min-width: 1280px) {
    grid-column: span 7;
  }
`

const RecordCoverWrapper = styled.div`
  margin-top: ${spacing[4]};
  border-radius: ${tokens.base.border.radius[6]};
  overflow: hidden;

  @media (max-width: 640px) {
    height: 100%;
    border-radius: 0;
    min-width: 100vw;
    margin-left: -${spacing[6]};
    margin-right: -${spacing[6]};
  }
`

const ContentWrapper = styled.div`
  margin-top: ${spacing[4]};
`

export const ReleaseHeader = ({ 
  title,
  recordLabel,
  coverImage, 
  link,
  artist,
  tracks,
  content,
 }: Props) => {
  const subtitleString = `${artist} | ${recordLabel}`

  return (
    <GridContainer>
      <ContentColumn>
        <PageTitle title={title} subtitle={subtitleString} />
        <Stack direction='column' gap="xs">
          {tracks.map((track) => (
            <TrackItem track={track} key={track.id} />
          ))}
        </Stack>
        <ContentWrapper>
          <Stack direction='column' gap="lg">
            <div
              className="markdown"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <Button url={link} purpose='link' target='_blank' style={{ width: 'max-content'}}>
              Get this release
            </Button>
          </Stack>
        </ContentWrapper>
      </ContentColumn>
      <ImageColumn>
        <RecordCoverWrapper>
          <CoverImage title={title} src={coverImage} />
        </RecordCoverWrapper>
      </ImageColumn>
    </GridContainer>
  )
}
