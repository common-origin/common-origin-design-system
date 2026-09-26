import React from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import { media } from '../../../lib/styleUtils'


type PictureProps = {
  title: string
  src: string
  width?: number
  height?: number
  onClick?: () => void
  href?: string
  'data-testid'?: string
}

const PictureWrapper = styled.div`
  margin: 0 auto;
  
  ${media.sm} {
    margin-left: 0;
    margin-right: 0;
  }
`

const ImageLink = styled.a`
  display: block;
  cursor: pointer;
  transition: opacity ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut};
  
  &:hover {
    opacity: 0.8;
  }
`

const ImageButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  display: block;
  width: 100%;
  transition: opacity ${tokens.semantic.motion.duration.normal} ${tokens.semantic.motion.easing.easeInOut};
  
  &:hover {
    opacity: 0.8;
  }
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${tokens.semantic.border.radius.sm};
  display: block;
`

export const Picture: React.FC<PictureProps> = ({ 
  title, 
  src, 
  width = 1300, 
  height = 630,
  onClick,
  href,
  'data-testid': dataTestId
}) => {
  const image = (
    <StyledImage
      src={src}
      alt={title}
      width={width}
      height={height}
    />
  )

  return (
    <PictureWrapper data-testid={dataTestId}>
      {href ? (
        <ImageLink href={href} aria-label={`Read more about ${title}`}>
          {image}
        </ImageLink>
      ) : onClick ? (
        <ImageButton onClick={onClick} aria-label={`Read more about ${title}`}>
          {image}
        </ImageButton>
      ) : (
        image
      )}
    </PictureWrapper>
  )
}
