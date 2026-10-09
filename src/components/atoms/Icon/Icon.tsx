import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'
import iconsData from '@/styles/icons.json'
import { type IconName } from '../../../types/icons'

export type { IconName }

export interface IconProps {
  name: IconName
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconColor?: 'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'
  /**
   * Makes the icon meaningful: it's announced as an image with this name. Without `aria-label`
   * or `title`, the icon is decorative and hidden from assistive technology (#85). Use a
   * human-readable name, never the internal icon name; `icons.json`'s `ariaLabelDefault` is a
   * starting point.
   */
  'aria-label'?: string
  /**
   * Like `aria-label`, and also shown as a tooltip. `aria-label` wins if both are given.
   */
  title?: string
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
  'aria-label': ariaLabel,
  title,
  'data-testid': dataTestId
}): ReactElement => {
  // Decorative unless it's given a name. A blank name is no name, so the icon stays hidden
  const label = ariaLabel?.trim() || title?.trim() || undefined

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
        {...(label
          ? { role: 'img', 'aria-label': label }
          : { 'aria-hidden': true, focusable: false })}
      >
        {title?.trim() && <title>{title}</title>}
        <path d={iconData.path} />
      </svg>
    </IconStyled>
  )
}

export default Icon