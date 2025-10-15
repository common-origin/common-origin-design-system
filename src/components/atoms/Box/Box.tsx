import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '../../../styles/tokens.json'

// Public props interface (without $ prefix, following atomic pattern)
export interface BoxProps {
  // Display
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'none'
  
  // Flexbox
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: keyof typeof tokens.semantic.spacing.layout
  
  // Spacing (using semantic layout tokens)
  m?: keyof typeof tokens.semantic.spacing.layout
  mt?: keyof typeof tokens.semantic.spacing.layout
  mr?: keyof typeof tokens.semantic.spacing.layout
  mb?: keyof typeof tokens.semantic.spacing.layout
  ml?: keyof typeof tokens.semantic.spacing.layout
  mx?: keyof typeof tokens.semantic.spacing.layout
  my?: keyof typeof tokens.semantic.spacing.layout
  p?: keyof typeof tokens.semantic.spacing.layout
  pt?: keyof typeof tokens.semantic.spacing.layout
  pr?: keyof typeof tokens.semantic.spacing.layout
  pb?: keyof typeof tokens.semantic.spacing.layout
  pl?: keyof typeof tokens.semantic.spacing.layout
  px?: keyof typeof tokens.semantic.spacing.layout
  py?: keyof typeof tokens.semantic.spacing.layout
  
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
  borderRadius?: keyof typeof tokens.base.border.radius
  border?: keyof typeof tokens.semantic.color.border
  borderTop?: keyof typeof tokens.semantic.color.border
  borderRight?: keyof typeof tokens.semantic.color.border
  borderBottom?: keyof typeof tokens.semantic.color.border
  borderLeft?: keyof typeof tokens.semantic.color.border
  
  // Background & Color
  bg?: keyof typeof tokens.semantic.color.background
  color?: keyof typeof tokens.semantic.color.text
  
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
  ${props => props.$gap && css`gap: ${tokens.semantic.spacing.layout[props.$gap]};`}
  
  // Margin
  ${props => props.$m && css`margin: ${tokens.semantic.spacing.layout[props.$m]};`}
  ${props => props.$mt && css`margin-top: ${tokens.semantic.spacing.layout[props.$mt]};`}
  ${props => props.$mr && css`margin-right: ${tokens.semantic.spacing.layout[props.$mr]};`}
  ${props => props.$mb && css`margin-bottom: ${tokens.semantic.spacing.layout[props.$mb]};`}
  ${props => props.$ml && css`margin-left: ${tokens.semantic.spacing.layout[props.$ml]};`}
  ${props => props.$mx && css`
    margin-left: ${tokens.semantic.spacing.layout[props.$mx]};
    margin-right: ${tokens.semantic.spacing.layout[props.$mx]};
  `}
  ${props => props.$my && css`
    margin-top: ${tokens.semantic.spacing.layout[props.$my]};
    margin-bottom: ${tokens.semantic.spacing.layout[props.$my]};
  `}
  
  // Padding
  ${props => props.$p && css`padding: ${tokens.semantic.spacing.layout[props.$p]};`}
  ${props => props.$pt && css`padding-top: ${tokens.semantic.spacing.layout[props.$pt]};`}
  ${props => props.$pr && css`padding-right: ${tokens.semantic.spacing.layout[props.$pr]};`}
  ${props => props.$pb && css`padding-bottom: ${tokens.semantic.spacing.layout[props.$pb]};`}
  ${props => props.$pl && css`padding-left: ${tokens.semantic.spacing.layout[props.$pl]};`}
  ${props => props.$px && css`
    padding-left: ${tokens.semantic.spacing.layout[props.$px]};
    padding-right: ${tokens.semantic.spacing.layout[props.$px]};
  `}
  ${props => props.$py && css`
    padding-top: ${tokens.semantic.spacing.layout[props.$py]};
    padding-bottom: ${tokens.semantic.spacing.layout[props.$py]};
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
  ${props => props.$borderRadius && css`border-radius: ${tokens.base.border.radius[props.$borderRadius]};`}
  ${props => props.$border && css`border: 1px solid ${tokens.semantic.color.border[props.$border]};`}
  ${props => props.$borderTop && css`border-top: 1px solid ${tokens.semantic.color.border[props.$borderTop]};`}
  ${props => props.$borderRight && css`border-right: 1px solid ${tokens.semantic.color.border[props.$borderRight]};`}
  ${props => props.$borderBottom && css`border-bottom: 1px solid ${tokens.semantic.color.border[props.$borderBottom]};`}
  ${props => props.$borderLeft && css`border-left: 1px solid ${tokens.semantic.color.border[props.$borderLeft]};`}
  
  // Background & Color
  ${props => props.$bg && css`background-color: ${tokens.semantic.color.background[props.$bg]};`}
  ${props => props.$color && css`color: ${tokens.semantic.color.text[props.$color]};`}
  
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
    
    // Overflow
    overflow,
    overflowX,
    overflowY,
    
    // Standard props
    as,
    children,
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
      $overflow={overflow}
      $overflowX={overflowX}
      $overflowY={overflowY}
      {...rest}
    >
      {children}
    </StyledBox>
  )
}

export const Box = BoxTransform
