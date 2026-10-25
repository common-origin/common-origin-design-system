import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '../../../lib/cssTokens'
import type { Tokens } from '../../../types/tokens'
import { backgroundByPath, borderColorByKey, radiusByKey, spaceByLayoutKey, textColorByKey } from '../../../lib/tokenAliases'
import type { BackgroundPath, BoxRadius, BoxSpace } from '../../../lib/tokenAliases'

export type { BoxRadius, BoxSpace }
import { reducedMotion } from '../../../lib/styleUtils'

/**
 * Box's background: a semantic token's path below `semantic` (decision 0031), such as
 * `surface.base`, `surface.raised` or `color.fill.muted`. The old `semantic.color.background`
 * keys (`default`, `subtle`, `surface`…) were removed in 3.0 (#304).
 */
export type BoxBackground = BackgroundPath

// Public props interface (without $ prefix, following atomic pattern)
export interface BoxProps {
  // Display
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'none'
  
  // Flexbox
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: BoxSpace
  
  // Spacing (using semantic layout tokens)
  m?: BoxSpace
  mt?: BoxSpace
  mr?: BoxSpace
  mb?: BoxSpace
  ml?: BoxSpace
  mx?: BoxSpace
  my?: BoxSpace
  p?: BoxSpace
  pt?: BoxSpace
  pr?: BoxSpace
  pb?: BoxSpace
  pl?: BoxSpace
  px?: BoxSpace
  py?: BoxSpace
  
  // Size
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string
  
  // Position
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  top?: string
  right?: string
  bottom?: string
  left?: string
  
  // Borders
  borderRadius?: BoxRadius
  border?: keyof Tokens['semantic']['color']['border']
  borderTop?: keyof Tokens['semantic']['color']['border']
  borderRight?: keyof Tokens['semantic']['color']['border']
  borderBottom?: keyof Tokens['semantic']['color']['border']
  borderLeft?: keyof Tokens['semantic']['color']['border']
  
  // Background & Color
  /**
   * Background colour, as a semantic token path: `surface.base` (page), `surface.raised` (cards,
   * sheets), `surface.scrim`, or a `color.fill.*` fill such as `color.fill.muted`.
   */
  bg?: BoxBackground
  color?: keyof Tokens['semantic']['color']['text']
  
  // Elevation (shadow)
  shadow?: keyof Tokens['semantic']['elevation']
  
  // Cursor
  cursor?: 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'help' | 'not-allowed'
  
  // Transition
  transition?: string
  
  // Hover states
  hoverShadow?: keyof Tokens['semantic']['elevation']
  hoverTransform?: string
  
  // Overflow
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto'
  
  // Polymorphic component support
  as?: React.ElementType
  
  // Standard props
  children?: React.ReactNode
  id?: string
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  tabIndex?: number
  role?: string
  'aria-label'?: string
  'data-testid'?: string
}

// Internal styled props interface (with $ prefix)
interface StyledBoxProps {
  $display?: BoxProps['display']
  $flexDirection?: BoxProps['flexDirection']
  $justifyContent?: BoxProps['justifyContent']
  $alignItems?: BoxProps['alignItems']
  $flexWrap?: BoxProps['flexWrap']
  $gap?: BoxProps['gap']
  $m?: BoxProps['m']
  $mt?: BoxProps['mt']
  $mr?: BoxProps['mr']
  $mb?: BoxProps['mb']
  $ml?: BoxProps['ml']
  $mx?: BoxProps['mx']
  $my?: BoxProps['my']
  $p?: BoxProps['p']
  $pt?: BoxProps['pt']
  $pr?: BoxProps['pr']
  $pb?: BoxProps['pb']
  $pl?: BoxProps['pl']
  $px?: BoxProps['px']
  $py?: BoxProps['py']
  $width?: BoxProps['width']
  $height?: BoxProps['height']
  $maxWidth?: BoxProps['maxWidth']
  $maxHeight?: BoxProps['maxHeight']
  $minWidth?: BoxProps['minWidth']
  $minHeight?: BoxProps['minHeight']
  $position?: BoxProps['position']
  $top?: BoxProps['top']
  $right?: BoxProps['right']
  $bottom?: BoxProps['bottom']
  $left?: BoxProps['left']
  $borderRadius?: BoxProps['borderRadius']
  $border?: BoxProps['border']
  $borderTop?: BoxProps['borderTop']
  $borderRight?: BoxProps['borderRight']
  $borderBottom?: BoxProps['borderBottom']
  $borderLeft?: BoxProps['borderLeft']
  $bg?: BoxProps['bg']
  $color?: BoxProps['color']
  $shadow?: BoxProps['shadow']
  $cursor?: BoxProps['cursor']
  $transition?: BoxProps['transition']
  $hoverShadow?: BoxProps['hoverShadow']
  $hoverTransform?: BoxProps['hoverTransform']
  $overflow?: BoxProps['overflow']
  $overflowX?: BoxProps['overflowX']
  $overflowY?: BoxProps['overflowY']
}

const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<StyledBoxProps>`
  ${props => props.$display && css`display: ${props.$display};`}
  
  // Flexbox
  ${props => props.$flexDirection && css`flex-direction: ${props.$flexDirection};`}
  ${props => props.$justifyContent && css`justify-content: ${props.$justifyContent};`}
  ${props => props.$alignItems && css`align-items: ${props.$alignItems};`}
  ${props => props.$flexWrap && css`flex-wrap: ${props.$flexWrap};`}
  ${props => props.$gap && css`gap: ${spaceByLayoutKey[props.$gap]};`}
  
  // Margin
  ${props => props.$m && css`margin: ${spaceByLayoutKey[props.$m]};`}
  ${props => props.$mt && css`margin-top: ${spaceByLayoutKey[props.$mt]};`}
  ${props => props.$mr && css`margin-right: ${spaceByLayoutKey[props.$mr]};`}
  ${props => props.$mb && css`margin-bottom: ${spaceByLayoutKey[props.$mb]};`}
  ${props => props.$ml && css`margin-left: ${spaceByLayoutKey[props.$ml]};`}
  ${props => props.$mx && css`
    margin-left: ${spaceByLayoutKey[props.$mx]};
    margin-right: ${spaceByLayoutKey[props.$mx]};
  `}
  ${props => props.$my && css`
    margin-top: ${spaceByLayoutKey[props.$my]};
    margin-bottom: ${spaceByLayoutKey[props.$my]};
  `}
  
  // Padding
  ${props => props.$p && css`padding: ${spaceByLayoutKey[props.$p]};`}
  ${props => props.$pt && css`padding-top: ${spaceByLayoutKey[props.$pt]};`}
  ${props => props.$pr && css`padding-right: ${spaceByLayoutKey[props.$pr]};`}
  ${props => props.$pb && css`padding-bottom: ${spaceByLayoutKey[props.$pb]};`}
  ${props => props.$pl && css`padding-left: ${spaceByLayoutKey[props.$pl]};`}
  ${props => props.$px && css`
    padding-left: ${spaceByLayoutKey[props.$px]};
    padding-right: ${spaceByLayoutKey[props.$px]};
  `}
  ${props => props.$py && css`
    padding-top: ${spaceByLayoutKey[props.$py]};
    padding-bottom: ${spaceByLayoutKey[props.$py]};
  `}
  
  // Size
  ${props => props.$width && css`width: ${props.$width};`}
  ${props => props.$height && css`height: ${props.$height};`}
  ${props => props.$maxWidth && css`max-width: ${props.$maxWidth};`}
  ${props => props.$maxHeight && css`max-height: ${props.$maxHeight};`}
  ${props => props.$minWidth && css`min-width: ${props.$minWidth};`}
  ${props => props.$minHeight && css`min-height: ${props.$minHeight};`}
  
  // Position
  ${props => props.$position && css`position: ${props.$position};`}
  ${props => props.$top && css`top: ${props.$top};`}
  ${props => props.$right && css`right: ${props.$right};`}
  ${props => props.$bottom && css`bottom: ${props.$bottom};`}
  ${props => props.$left && css`left: ${props.$left};`}
  
  // Borders
  ${props => props.$borderRadius && css`border-radius: ${radiusByKey[props.$borderRadius]};`}
  ${props => props.$border && borderColorByKey[props.$border] && css`border: ${tokens.semantic.border.width.thin} solid ${borderColorByKey[props.$border]};`}
  ${props => props.$borderTop && borderColorByKey[props.$borderTop] && css`border-top: ${tokens.semantic.border.width.thin} solid ${borderColorByKey[props.$borderTop]};`}
  ${props => props.$borderRight && borderColorByKey[props.$borderRight] && css`border-right: ${tokens.semantic.border.width.thin} solid ${borderColorByKey[props.$borderRight]};`}
  ${props => props.$borderBottom && borderColorByKey[props.$borderBottom] && css`border-bottom: ${tokens.semantic.border.width.thin} solid ${borderColorByKey[props.$borderBottom]};`}
  ${props => props.$borderLeft && borderColorByKey[props.$borderLeft] && css`border-left: ${tokens.semantic.border.width.thin} solid ${borderColorByKey[props.$borderLeft]};`}
  
  // Background & Color
  ${props => props.$bg && backgroundByPath[props.$bg] && css`background-color: ${backgroundByPath[props.$bg]};`}
  ${props => props.$color && textColorByKey[props.$color] && css`color: ${textColorByKey[props.$color]};`}
  
  // Elevation (shadow)
  ${props => props.$shadow && css`box-shadow: ${tokens.semantic.elevation[props.$shadow]};`}
  
  // Cursor
  ${props => props.$cursor && css`cursor: ${props.$cursor};`}
  
  // Transition
  ${props => props.$transition && css`transition: ${props.$transition};`}
  
  // Hover states
  ${props => (props.$hoverShadow || props.$hoverTransform) && css`
    &:hover {
      ${props.$hoverShadow && css`box-shadow: ${tokens.semantic.elevation[props.$hoverShadow]};`}
      ${props.$hoverTransform && css`transform: ${props.$hoverTransform};`}
    }
    
    /* Pressed settles back: the shadow drops to raised and any lift returns (issue 185). Pressing a
       control inside the card (an action button) presses that control, not the card. */
    &:active {
      transform: translateY(0);
    }

    ${props.$hoverShadow && css`
      &:active:not(:has(:is(button, a, [role="button"]):active)) {
        box-shadow: ${tokens.semantic.elevation.raised};
      }
    `}
    
    &:focus-visible {
      outline: ${tokens.semantic.border.focus};
      outline-offset: ${tokens.semantic.border.focusOffset};
    }

    /* Reduced motion keeps the state change and drops the movement (decision 0015) */
    ${props.$hoverTransform && css`
      ${reducedMotion} {
        &:hover {
          transform: none;
        }
      }
    `}
  `}
  
  // Overflow
  ${props => props.$overflow && css`overflow: ${props.$overflow};`}
  ${props => props.$overflowX && css`overflow-x: ${props.$overflowX};`}
  ${props => props.$overflowY && css`overflow-y: ${props.$overflowY};`}
`

// Transform component that maps clean props to $-prefixed props for styled-components
const BoxTransform: React.FC<BoxProps> = (props) => {
  const {
    // Display
    display,
    
    // Flexbox
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap,
    
    // Spacing
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,
    
    // Size
    width,
    height,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    
    // Position
    position,
    top,
    right,
    bottom,
    left,
    
    // Borders
    borderRadius,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    
    // Background & Color
    bg,
    color,
    
    // Shadow
    shadow,
    
    // Cursor
    cursor,
    
    // Transition
    transition,
    
    // Hover states
    hoverShadow,
    hoverTransform,
    
    // Overflow
    overflow,
    overflowX,
    overflowY,
    
    // Standard props
    as,
    children,
    onClick,
    onKeyDown,
    tabIndex,
    role,
    'aria-label': ariaLabel,
    'data-testid': dataTestId,
    ...rest
  } = props

  return (
    <StyledBox
      as={as}
      data-testid={dataTestId}
      $display={display}
      $flexDirection={flexDirection}
      $justifyContent={justifyContent}
      $alignItems={alignItems}
      $flexWrap={flexWrap}
      $gap={gap}
      $m={m}
      $mt={mt}
      $mr={mr}
      $mb={mb}
      $ml={ml}
      $mx={mx}
      $my={my}
      $p={p}
      $pt={pt}
      $pr={pr}
      $pb={pb}
      $pl={pl}
      $px={px}
      $py={py}
      $width={width}
      $height={height}
      $maxWidth={maxWidth}
      $maxHeight={maxHeight}
      $minWidth={minWidth}
      $minHeight={minHeight}
      $position={position}
      $top={top}
      $right={right}
      $bottom={bottom}
      $left={left}
      $borderRadius={borderRadius}
      $border={border}
      $borderTop={borderTop}
      $borderRight={borderRight}
      $borderBottom={borderBottom}
      $borderLeft={borderLeft}
      $bg={bg}
      $color={color}
      $shadow={shadow}
      $cursor={cursor}
      $transition={transition}
      $hoverShadow={hoverShadow}
      $hoverTransform={hoverTransform}
      $overflow={overflow}
      $overflowX={overflowX}
      $overflowY={overflowY}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </StyledBox>
  )
}

export const Box = BoxTransform
