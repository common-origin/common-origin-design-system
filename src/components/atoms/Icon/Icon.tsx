import React, { FC, ReactElement, SVGProps } from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { iconSet } from '../../../types/iconSet'
import { type IconName, type IconPaint } from '../../../types/icons'

export type { IconName }

export interface IconProps {
  name: IconName
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconColor?: 'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'
  /**
   * Makes the icon meaningful: it's announced as an image with this name. Without `aria-label`
   * or `title`, the icon is decorative and hidden from assistive technology (#85). Use a
   * human-readable name, never the internal icon name; the icon's `ariaLabelDefault` in `iconSet` is a
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
        return tokens.semantic.color.icon.default
      case 'subdued':
        return tokens.semantic.color.icon.muted
      case 'disabled':
        return tokens.semantic.color.icon.disabled
      case 'inverse':
        return tokens.semantic.color.icon.inverse
      case 'interactive':
        return tokens.semantic.color.icon.accent
      case 'error':
        return tokens.semantic.color.icon.danger
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

// How each paint draws, in currentColor. Lines are 2px on the 24px grid, so they scale with the
// icon (decision 0058).
const LINE: SVGProps<SVGSVGElement> = {
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
}
const PAINT: Record<IconPaint, SVGProps<SVGSVGElement>> = {
  stroke: { fill: 'none', ...LINE },
  fill: { fill: 'currentColor' },
  both: { fill: 'currentColor', ...LINE }
}

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

  const icon = iconSet[name]

  if (!icon) {
    console.warn(`Icon "${name}" not found in iconSet`)
    return <IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId} />
  }
  
  return (
    <IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId}>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...PAINT[icon.paint]}
        {...(label
          ? { role: 'img', 'aria-label': label }
          : { 'aria-hidden': true, focusable: false })}
      >
        {title?.trim() && <title>{title}</title>}
        {icon.elements.map(([tag, attributes], index) => React.createElement(tag, { key: index, ...attributes }))}
      </svg>
    </IconStyled>
  )
}

export default Icon