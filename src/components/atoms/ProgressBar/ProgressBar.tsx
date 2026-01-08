import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '../../../styles/tokens.json'

// Destructure tokens
const { semantic } = tokens
const { color, border, motion, component } = { ...semantic, component: tokens.component }
const { radius } = border

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number
  /** Orientation of the progress bar */
  variant?: 'horizontal' | 'vertical'
  /** Color variant for the progress bar */
  color?: 'success' | 'error' | 'default'
  /** Height size for horizontal progress bar (default: md) */
  height?: 'sm' | 'md' | 'lg' | 'xl'
  /** Width size for vertical progress bar (default: md) */
  width?: 'sm' | 'md' | 'lg' | 'xl'
  /** Data attribute for testing */
  'data-testid'?: string
}

interface StyledProgressBarContainerProps {
  $variant: 'horizontal' | 'vertical'
  $height?: 'sm' | 'md' | 'lg' | 'xl'
  $width?: 'sm' | 'md' | 'lg' | 'xl'
}

interface StyledProgressBarFillProps {
  $value: number
  $variant: 'horizontal' | 'vertical'
  $color: 'success' | 'error' | 'default'
}

const ProgressBarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledProgressBarContainerProps>`
  background-color: ${color.background.disabled};
  border-radius: ${radius.xs};
  overflow: hidden;

  ${props => props.$variant === 'horizontal' && css`
    width: 100%;
    height: ${props.$height ? component.progressBar.sizes[props.$height].height : component.progressBar.sizes.md.height};
  `}

  ${props => props.$variant === 'vertical' && css`
    width: ${props.$width ? component.progressBar.sizes[props.$width].height : component.progressBar.sizes.md.height};
    height: 100%;
  `}
`

const ProgressBarFill = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledProgressBarFillProps>`
  height: 100%;
  transition: ${motion.transition.normal};

  ${props => {
    let backgroundColor
    switch (props.$color) {
      case 'success':
        backgroundColor = color.background.success
        break
      case 'error':
        backgroundColor = color.background.error
        break
      case 'default':
      default:
        backgroundColor = color.background.interactive
        break
    }
    return css`background-color: ${backgroundColor};`
  }}

  ${props => props.$variant === 'horizontal' && css`
    width: ${Math.min(100, Math.max(0, props.$value))}%;
  `}

  ${props => props.$variant === 'vertical' && css`
    width: 100%;
    height: ${Math.min(100, Math.max(0, props.$value))}%;
  `}
`

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'horizontal',
  color = 'default',
  height,
  width,
  'data-testid': dataTestId,
}) => {
  return (
    <ProgressBarContainer
      $variant={variant}
      $height={height}
      $width={width}
      data-testid={dataTestId}
      role="progressbar"
      aria-valuenow={Math.min(100, Math.max(0, value))}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <ProgressBarFill
        $value={value}
        $variant={variant}
        $color={color}
      />
    </ProgressBarContainer>
  )
}

export default ProgressBar
