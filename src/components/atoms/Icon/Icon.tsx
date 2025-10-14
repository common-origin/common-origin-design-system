import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import iconsData from '@/styles/icons.json'

export interface IconProps {
  name: keyof typeof iconsData
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconColor?: 'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'
  'data-testid'?: string
}

interface StyledIconProps {
  $size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  $iconColor: 'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'
}

const IconStyled = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => tokens.semantic.size.icon[$size]};
  height: ${({ $size }) => tokens.semantic.size.icon[$size]};
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  /* Use semantic icon colors */
  color: ${({ $iconColor }) => {
    switch ($iconColor) {
      case 'default':
        return tokens.semantic.color.icon.default
      case 'emphasis':
        return tokens.semantic.color.icon.emphasis
      case 'subdued':
        return tokens.semantic.color.icon.subdued
      case 'disabled':
        return tokens.semantic.color.icon.disabled
      case 'inverse':
        return tokens.semantic.color.icon.inverse
      case 'interactive':
        return tokens.semantic.color.icon.interactive
      case 'error':
        return tokens.semantic.color.icon.error
      case 'success':
        return tokens.semantic.color.icon.success
      case 'warning':
        return tokens.semantic.color.icon.warning
      case 'inherit':
        return 'currentColor'
      default:
        return tokens.semantic.color.icon.default
    }
  }};
`

export const Icon: FC<IconProps> = ({
  name,
  size = 'lg',
  iconColor = 'default',
  'data-testid': dataTestId
}): ReactElement => {
  // Get the icon data from the JSON file
  const iconData = iconsData[name]
  
  if (!iconData) {
    console.warn(`Icon "${name}" not found in icons.json`)
    return <IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId} />
  }
  
  return (
    <IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={iconData.name}
      >
        <path d={iconData.path} />
      </svg>
    </IconStyled>
  )
}

export default Icon