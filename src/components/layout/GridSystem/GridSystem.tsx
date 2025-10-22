import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/styles/tokens.json'

// Breakpoints using base tokens
const breakpoints = {
  xs: tokens.base.breakpoint.xs,
  sm: tokens.base.breakpoint.sm,
  md: tokens.base.breakpoint.md,
  lg: tokens.base.breakpoint.lg,
  xl: tokens.base.breakpoint.xl,
  '2xl': tokens.base.breakpoint['2xl'],
}

// Media query helpers
const media = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}

// Base Grid Container
interface GridProps {
  cols?: number
  gap?: keyof typeof tokens.base.spacing
  gapX?: keyof typeof tokens.base.spacing
  gapY?: keyof typeof tokens.base.spacing
  className?: string
  children: React.ReactNode
}

const GridContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $cols: number
  $gap?: string
  $gapX?: string
  $gapY?: string
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, minmax(0, 1fr));
  
  ${props => props.$gap && css`gap: ${props.$gap};`}
  ${props => props.$gapX && css`column-gap: ${props.$gapX};`}
  ${props => props.$gapY && css`row-gap: ${props.$gapY};`}
`

export const Grid: React.FC<GridProps> = ({ 
  cols = 12, 
  gap, 
  gapX, 
  gapY, 
  className, 
  children 
}) => (
  <GridContainer
    $cols={cols}
    $gap={gap ? tokens.base.spacing[gap] : undefined}
    $gapX={gapX ? tokens.base.spacing[gapX] : undefined}
    $gapY={gapY ? tokens.base.spacing[gapY] : undefined}
    className={className}
  >
    {children}
  </GridContainer>
)

// Grid Column Component
interface GridColProps {
  span?: number
  spanSm?: number
  spanMd?: number
  spanLg?: number
  spanXl?: number
  order?: number
  orderSm?: number
  orderMd?: number
  orderLg?: number
  orderXl?: number
  className?: string
  children: React.ReactNode
}

const GridColContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $span?: number
  $spanSm?: number
  $spanMd?: number
  $spanLg?: number
  $spanXl?: number
  $order?: number
  $orderSm?: number
  $orderMd?: number
  $orderLg?: number
  $orderXl?: number
}>`
  ${props => props.$span && css`grid-column: span ${props.$span} / span ${props.$span};`}
  ${props => props.$order && css`order: ${props.$order};`}
  
  ${props => props.$spanSm && css`
    ${media.sm} {
      grid-column: span ${props.$spanSm} / span ${props.$spanSm};
    }
  `}
  
  ${props => props.$spanMd && css`
    ${media.md} {
      grid-column: span ${props.$spanMd} / span ${props.$spanMd};
    }
  `}
  
  ${props => props.$spanLg && css`
    ${media.lg} {
      grid-column: span ${props.$spanLg} / span ${props.$spanLg};
    }
  `}
  
  ${props => props.$spanXl && css`
    ${media.xl} {
      grid-column: span ${props.$spanXl} / span ${props.$spanXl};
    }
  `}
  
  ${props => props.$orderSm && css`
    ${media.sm} {
      order: ${props.$orderSm};
    }
  `}
  
  ${props => props.$orderMd && css`
    ${media.md} {
      order: ${props.$orderMd};
    }
  `}
  
  ${props => props.$orderLg && css`
    ${media.lg} {
      order: ${props.$orderLg};
    }
  `}
  
  ${props => props.$orderXl && css`
    ${media.xl} {
      order: ${props.$orderXl};
    }
  `}
`

export const GridCol: React.FC<GridColProps> = ({ 
  span, 
  spanSm, 
  spanMd, 
  spanLg, 
  spanXl,
  order,
  orderSm,
  orderMd,
  orderLg,
  orderXl,
  className, 
  children 
}) => (
  <GridColContainer
    $span={span}
    $spanSm={spanSm}
    $spanMd={spanMd}
    $spanLg={spanLg}
    $spanXl={spanXl}
    $order={order}
    $orderSm={orderSm}
    $orderMd={orderMd}
    $orderLg={orderLg}
    $orderXl={orderXl}
    className={className}
  >
    {children}
  </GridColContainer>
)

// Responsive Grid (replaces the common grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pattern)
interface ResponsiveGridProps {
  cols: number
  colsSm?: number
  colsMd?: number
  colsLg?: number
  colsXl?: number
  gap?: keyof typeof tokens.base.spacing
  gapSm?: keyof typeof tokens.base.spacing
  gapMd?: keyof typeof tokens.base.spacing
  gapLg?: keyof typeof tokens.base.spacing
  gapXl?: keyof typeof tokens.base.spacing
  gapX?: keyof typeof tokens.base.spacing
  gapXSm?: keyof typeof tokens.base.spacing
  gapXMd?: keyof typeof tokens.base.spacing
  gapXLg?: keyof typeof tokens.base.spacing
  gapXXl?: keyof typeof tokens.base.spacing
  gapY?: keyof typeof tokens.base.spacing
  gapYSm?: keyof typeof tokens.base.spacing
  gapYMd?: keyof typeof tokens.base.spacing
  gapYLg?: keyof typeof tokens.base.spacing
  gapYXl?: keyof typeof tokens.base.spacing
  className?: string
  children: React.ReactNode
}

const ResponsiveGridContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<{
  $cols: number
  $colsSm?: number
  $colsMd?: number
  $colsLg?: number
  $colsXl?: number
  $gap?: string
  $gapSm?: string
  $gapMd?: string
  $gapLg?: string
  $gapXl?: string
  $gapX?: string
  $gapXSm?: string
  $gapXMd?: string
  $gapXLg?: string
  $gapXXl?: string
  $gapY?: string
  $gapYSm?: string
  $gapYMd?: string
  $gapYLg?: string
  $gapYXl?: string
}>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, minmax(0, 1fr));
  
  ${props => props.$gap && css`gap: ${props.$gap};`}
  ${props => props.$gapX && css`column-gap: ${props.$gapX};`}
  ${props => props.$gapY && css`row-gap: ${props.$gapY};`}
  
  ${props => props.$colsSm && css`
    ${media.sm} {
      grid-template-columns: repeat(${props.$colsSm}, minmax(0, 1fr));
    }
  `}
  
  ${props => props.$colsMd && css`
    ${media.md} {
      grid-template-columns: repeat(${props.$colsMd}, minmax(0, 1fr));
    }
  `}
  
  ${props => props.$colsLg && css`
    ${media.lg} {
      grid-template-columns: repeat(${props.$colsLg}, minmax(0, 1fr));
    }
  `}
  
  ${props => props.$colsXl && css`
    ${media.xl} {
      grid-template-columns: repeat(${props.$colsXl}, minmax(0, 1fr));
    }
  `}
  
  // Responsive gap support
  ${props => props.$gapSm && css`
    ${media.sm} {
      gap: ${props.$gapSm};
    }
  `}
  
  ${props => props.$gapMd && css`
    ${media.md} {
      gap: ${props.$gapMd};
    }
  `}
  
  ${props => props.$gapLg && css`
    ${media.lg} {
      gap: ${props.$gapLg};
    }
  `}
  
  ${props => props.$gapXl && css`
    ${media.xl} {
      gap: ${props.$gapXl};
    }
  `}
  
  // Responsive column gap support
  ${props => props.$gapXSm && css`
    ${media.sm} {
      column-gap: ${props.$gapXSm};
    }
  `}
  
  ${props => props.$gapXMd && css`
    ${media.md} {
      column-gap: ${props.$gapXMd};
    }
  `}
  
  ${props => props.$gapXLg && css`
    ${media.lg} {
      column-gap: ${props.$gapXLg};
    }
  `}
  
  ${props => props.$gapXXl && css`
    ${media.xl} {
      column-gap: ${props.$gapXXl};
    }
  `}
  
  // Responsive row gap support
  ${props => props.$gapYSm && css`
    ${media.sm} {
      row-gap: ${props.$gapYSm};
    }
  `}
  
  ${props => props.$gapYMd && css`
    ${media.md} {
      row-gap: ${props.$gapYMd};
    }
  `}
  
  ${props => props.$gapYLg && css`
    ${media.lg} {
      row-gap: ${props.$gapYLg};
    }
  `}
  
  ${props => props.$gapYXl && css`
    ${media.xl} {
      row-gap: ${props.$gapYXl};
    }
  `}
`

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  cols,
  colsSm,
  colsMd, 
  colsLg, 
  colsXl,
  gap, 
  gapSm,
  gapMd,
  gapLg,
  gapXl,
  gapX, 
  gapXSm,
  gapXMd,
  gapXLg,
  gapXXl,
  gapY, 
  gapYSm,
  gapYMd,
  gapYLg,
  gapYXl,
  className, 
  children 
}) => (
  <ResponsiveGridContainer
    $cols={cols}
    $colsSm={colsSm}
    $colsMd={colsMd}
    $colsLg={colsLg}
    $colsXl={colsXl}
    $gap={gap ? tokens.base.spacing[gap] : undefined}
    $gapSm={gapSm ? tokens.base.spacing[gapSm] : undefined}
    $gapMd={gapMd ? tokens.base.spacing[gapMd] : undefined}
    $gapLg={gapLg ? tokens.base.spacing[gapLg] : undefined}
    $gapXl={gapXl ? tokens.base.spacing[gapXl] : undefined}
    $gapX={gapX ? tokens.base.spacing[gapX] : undefined}
    $gapXSm={gapXSm ? tokens.base.spacing[gapXSm] : undefined}
    $gapXMd={gapXMd ? tokens.base.spacing[gapXMd] : undefined}
    $gapXLg={gapXLg ? tokens.base.spacing[gapXLg] : undefined}
    $gapXXl={gapXXl ? tokens.base.spacing[gapXXl] : undefined}
    $gapY={gapY ? tokens.base.spacing[gapY] : undefined}
    $gapYSm={gapYSm ? tokens.base.spacing[gapYSm] : undefined}
    $gapYMd={gapYMd ? tokens.base.spacing[gapYMd] : undefined}
    $gapYLg={gapYLg ? tokens.base.spacing[gapYLg] : undefined}
    $gapYXl={gapYXl ? tokens.base.spacing[gapYXl] : undefined}
    className={className}
  >
    {children}
  </ResponsiveGridContainer>
)
