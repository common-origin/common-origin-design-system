import React, { useState } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

export interface AvatarProps {
  name: string
  picture?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  'data-testid'?: string
}

interface StyledAvatarProps {
  $size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const AvatarContainer = styled.div<StyledAvatarProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => tokens.semantic.size.avatar[$size]};
  height: ${({ $size }) => tokens.semantic.size.avatar[$size]};
  border-radius: ${tokens.base.border.radius.circle};
  background-color: ${tokens.semantic.color.background.subtle};
  overflow: hidden;
  flex-shrink: 0;
`

const AvatarImage = styled.img<StyledAvatarProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${tokens.base.border.radius.circle};
  /* Remove the img role since the container already has role="img" */
`

const AvatarInitials = styled.span<StyledAvatarProps>`
  font-family: ${tokens.base.fontFamily.body};
  font-weight: ${tokens.base.fontWeight[3]};
  font-size: ${({ $size }) => {
    const sizeMap = {
      xs: tokens.base.fontSize[1],
      sm: tokens.base.fontSize[2],
      md: tokens.base.fontSize[3],
      lg: tokens.base.fontSize[4],
      xl: tokens.base.fontSize[5]
    }
    return sizeMap[$size]
  }};
  color: ${tokens.semantic.color.text.default};
  line-height: 1;
  text-transform: uppercase;
  user-select: none;
`

// Helper function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  picture, 
  size = 'md',
  'data-testid': dataTestId,
  ...props 
}) => {
  // Remove styled-only props from the rest
  const { $size, ...htmlProps } = props as Record<string, any>
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const showImage = picture && !imageError
  const initials = getInitials(name)

  return (
    <AvatarContainer 
      $size={size}
      data-testid={dataTestId}
      data-size={size}
      role="img"
      aria-label={`Avatar for ${name}`}
      {...htmlProps}
    >
      {showImage ? (
        <AvatarImage
          $size={size}
          src={picture}
          alt={`Avatar of ${name}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          data-state={imageLoaded ? 'loaded' : 'loading'}
        />
      ) : (
        <AvatarInitials 
          $size={size}
          data-initials={initials}
          aria-hidden="true"
        >
          {initials}
        </AvatarInitials>
      )}
    </AvatarContainer>
  )
}