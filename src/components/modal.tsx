import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Icon } from './atoms/Icon'
import tokens from '@/styles/tokens.json'

type ModalProps = {
  children?: React.ReactNode
  imgsrc: string
  title: string
  tag: string
  excerpt?: string
  onButtonClick?: () => void
  onClose?: () => void
  link: string
}

const { base: { spacing, border, color }, semantic } = tokens

const ModalShader = styled.div`
  background-color: rgba(255, 255, 255, 0.80);
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  z-index: ${tokens.base.zIndex[5]};
`

const BaseModalWrapper = styled.div`
  box-shadow: ${tokens.base.shadow[6]};
  border-radius: ${border.radius[5]};
  background-color: ${semantic.color.background.default};
  transform: translate(-50%, -50%);
  color: ${semantic.color.text.default};
  position: absolute;
  max-width: 1280px;
  display: flex;
  z-index: ${tokens.base.zIndex[6]};
  width: 80vw;
  left: 50%;
  top: 50%;
`

const ArtModalWrapper = styled(BaseModalWrapper)`
  flex-direction: column;
  justify-content: flex-start;
`

const MusicModalWrapper = styled(BaseModalWrapper)`
  flex-direction: row;
  justify-content: flex-start;
`

const ModalContent = styled.div`
  padding: ${spacing[4]} ${spacing[6]};
`

const MusicModalContent = styled.div`
  width: 50%;
  padding: ${spacing[8]} ${spacing[24]} 0 ${spacing[8]};
  margin-top: ${spacing[24]};
`

const ImageWrapper = styled.div`
  width: 50%;
  margin-right: ${spacing[4]};
`

const ModalImage = styled(Image)`
  width: 100%;
  height: auto;
`

const CloseButton = styled.button`
  background-color: ${semantic.color.background.default};
  transition: ease background-color 0.2s;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  border: none;
  height: ${spacing[8]};
  width: ${spacing[8]};
  right: 0;
  top: 0;
  cursor: pointer;
  border-radius: 0 ${border.radius[5]} 0 ${border.radius[3]};

  &:hover {
    background-color: ${color.neutral[100]};
  }

  &:focus {
    outline: 2px solid ${semantic.color.border.default};
    outline-offset: 2px;
  }
`

export const Modal: React.FC<ModalProps> = ({
  children,
  imgsrc,
  title,
  tag,
  onClose,
  link: _link
}) => {
  if (tag === 'art') {
    return (
      <ModalShader>
        <ArtModalWrapper>
          <CloseButton onClick={onClose} title='Close' aria-label="Close modal">
            <Icon name='close' size={'md'} />
          </CloseButton>
          <ModalImage 
            src={imgsrc} 
            alt={title}
            width={1280}
            height={960}
            blurDataURL={imgsrc}
          />
          <ModalContent>
            {children}
          </ModalContent>
        </ArtModalWrapper>
      </ModalShader>
    )
  } else if (tag === 'release') {
    return (
      <ModalShader>
        <MusicModalWrapper>
          <CloseButton onClick={onClose} title='Close' aria-label="Close modal">
            <Icon name='close' size={'md'} />
          </CloseButton>
          <ImageWrapper>
            <ModalImage 
              src={imgsrc} 
              alt={title}
              width={480}
              height={300}
              blurDataURL={imgsrc}
            />
          </ImageWrapper>
          <MusicModalContent>
            {children}
          </MusicModalContent>
        </MusicModalWrapper>
      </ModalShader>
    )
  }
  
  return null
}
