import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '../../../styles/tokens.json'

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
  background-color: ${tokens.semantic.color.background.disabled};
  border-radius: ${tokens.base.border.radius[1]};
  overflow: hidden;

  ${props => props.$variant === 'horizontal' && css`
    width: 100%;
    height: ${props.$height ? tokens.component.progressBar.sizes[props.$height].height : tokens.component.progressBar.sizes.md.height};
  `}

  ${props => props.$variant === 'vertical' && css`
    width: ${props.$width ? tokens.component.progressBar.sizes[props.$width].height : tokens.component.progressBar.sizes.md.height};
    height: 100%;
  `}
`

const ProgressBarFill = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledProgressBarFillProps>`
  height: 100%;
  transition: ${tokens.semantic.motion.transition.normal};

  ${props => {
    let backgroundColor
    switch (props.$color) {
      case 'success':
        backgroundColor = tokens.semantic.color.background.success
        break
      case 'error':
        backgroundColor = tokens.semantic.color.background.error
        break
      case 'default':
      default:
        backgroundColor = tokens.semantic.color.background.interactive
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
