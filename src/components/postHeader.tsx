import React from 'react'
import styled from 'styled-components'
import type Author from '../../interfaces/author'
import { Avatar, Button, ChipGroup, CoverImage, DateFormatter, PostTitle, Stack, Typography } from './'
import tokens from '@/styles/tokens.json'

const { base: { spacing, border } } = tokens

type Props = {
  title: string
  excerpt: string
  tag: string
  coverImage: string
  date: string
  author: Author
  artist: String
  slug: string
  labels: string[]
}

const HeaderContainer = styled.div<{ $margin?: string; $maxWidth?: string }>`
  margin: ${props => props.$margin || `${spacing[8]} 0`};
  max-width: ${props => props.$maxWidth || '64rem'};
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing[4]};
  }
`

const DesignHeaderContainer = styled.div`
  margin: ${spacing[8]} 0;
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing[16]};
  }
`

const ArtHeaderContainer = styled.div`
  margin-top: ${spacing[8]};
  margin-left: auto;
  margin-right: auto;
`

const ArtGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${spacing[8]};
`

const ArtSidebar = styled.div`
  grid-column: span 12;
  
  @media (min-width: 1280px) {
    grid-column: span 3;
    position: fixed;
  }
`

const ArtMainContent = styled.div`
  grid-column: span 12;
  
  @media (min-width: 1280px) {
    grid-column: span 9 / 13;
    grid-column-start: 4;
  }
`

const ContentWrapper = styled.div`
  max-width: 300px;
`

const ImageWrapper = styled.div<{ $marginTop?: string }>`
  border-radius: ${border.radius[6]};
  overflow: hidden;
  margin-top: ${props => props.$marginTop || '0'};
`

const DefaultHeaderContainer = styled.div`
  margin-bottom: ${spacing[8]};
  
  @media (min-width: 768px) {
    margin-bottom: ${spacing[16]};
  }
  
  @media (min-width: 640px) {
    margin-left: 0;
    margin-right: 0;
  }
`

export const PostHeader = ({ 
  title,
  excerpt, 
  author,
  date,
  tag, 
  coverImage, 
  labels,
 }: Props) => {
  if ( tag === 'portfolio' ) {
    return (
      <HeaderContainer>
        <Button
          variant='secondary'
          purpose='link'
          url='/portfolio'>
            Back to Portfolio
        </Button>
        <PostTitle>{title}</PostTitle>
        <Stack direction="column" gap="lg">
          <ChipGroup labels={labels} />
          <ImageWrapper>
            <CoverImage title={title} src={coverImage} />
          </ImageWrapper>
        </Stack>
      </HeaderContainer>
    )
  } else if ( tag === 'design' ) {
    return (
      <DesignHeaderContainer>
        <Button
          variant='secondary'
          purpose='link'
          url='/design'>
            Back to all Design
        </Button>
        <PostTitle>{title}</PostTitle>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap="sm">
            <Avatar name={author.name} picture={author.picture} />
            <Typography variant="small"> | </Typography>
            <DateFormatter dateString={date} />
          </Stack>
          <ChipGroup labels={labels} />
        </Stack>
        <ImageWrapper $marginTop={spacing[8]}>
          <CoverImage title={title} src={coverImage} />
        </ImageWrapper>
      </DesignHeaderContainer>
    )
  } else if ( tag === 'art' ) {
    return (
      <ArtHeaderContainer>
        <ArtGrid>
          <ArtSidebar>
            <ContentWrapper>
              <Button
                variant='secondary'
                purpose='link'
                url='/art'>
                  Back to all Art
              </Button>
              <PostTitle>{title}</PostTitle>
              <Stack direction="column" gap="md">
                <DateFormatter dateString={date} />
                <Typography variant="body" color="subdued">{excerpt}</Typography>
                <Stack direction="column">
                  <ChipGroup labels={labels} />
                </Stack>
              </Stack>
            </ContentWrapper>
          </ArtSidebar>
          <ArtMainContent>
            <ImageWrapper>
              <CoverImage title={title} src={coverImage} />
            </ImageWrapper>
          </ArtMainContent>
        </ArtGrid>
      </ArtHeaderContainer>
    )
  } else {
    return (
      <DefaultHeaderContainer>
        <PostTitle>{title}</PostTitle>
        <CoverImage title={title} src={coverImage} />
      </DefaultHeaderContainer>
    )
  }
}

