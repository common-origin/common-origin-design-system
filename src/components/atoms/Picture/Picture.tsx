import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
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

// A clickable image answers input on the image itself (decision 0029, #185): it fades on hover and
// one step further while pressed, and draws the system focus ring around the image, following its
// rounded corners. Fading isn't movement, so it stays under reduced motion.
const clickableImage = css`
  display: block;
  cursor: pointer;

  img {
    transition: ${tokens.semantic.motion.transition.press};
  }

  &:hover img {
    opacity: ${tokens.semantic.opacity.hover};
  }

  &:active img {
    opacity: ${tokens.semantic.opacity.pressed};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible img {
    outline: ${tokens.semantic.border.focus};
    outline-offset: ${tokens.semantic.border.focusOffset};
  }
`

const ImageLink = styled.a`
  ${clickableImage}
`

const ImageButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  width: 100%;
  ${clickableImage}
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${tokens.semantic.radius.sm};
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
