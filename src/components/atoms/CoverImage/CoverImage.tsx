import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { media } from '../../../lib/styleUtils'

const { base } = tokens

type CoverImageProps = {
  title: string
  src: string
  slug?: string
  width?: number
  height?: number
  'data-testid'?: string
}

const CoverImageWrapper = styled.div`
  margin: 0 auto;
  
  ${media.sm} {
    margin-left: 0;
    margin-right: 0;
  }
`

const ImageLink = styled(Link)`
  display: block;
  transition: opacity ${base.duration.normal} ${base.easing.easeInOut};
  
  &:hover {
    opacity: 0.8;
  }
`

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: ${base.border.radius[2]};
`

export const CoverImage: React.FC<CoverImageProps> = ({ 
  title, 
  src, 
  slug, 
  width = 1300, 
  height = 630,
  'data-testid': dataTestId
}) => {
  const image = (
    <StyledImage
      src={src}
      alt={`Cover Image for ${title}`}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={src}
      priority={!!slug}
    />
  )

  return (
    <CoverImageWrapper data-testid={dataTestId}>
      {slug ? (
        <ImageLink href={`/posts/${slug}`} aria-label={`Read more about ${title}`}>
          {image}
        </ImageLink>
      ) : (
        image
      )}
    </CoverImageWrapper>
  )
}
