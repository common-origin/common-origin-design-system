import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import tokens from '@/styles/tokens.json'
import { Grid, GridCol, ResponsiveGrid } from './GridSystem'

// Gap props take base spacing keys (the documented exception to decision 0014)
const spacing = tokens.base.spacing
const { breakpoint } = tokens.semantic

// jsdom can't compute grid properties or evaluate media queries, so these tests
// read the rules styled-components generated for the element's own class
const css = () =>
  Array.from(document.querySelectorAll('style'))
    .map(style => style.textContent)
    .join('')
    .replace(/\s+/g, '')

const hasRule = (element: HTMLElement, declaration: string, minWidth?: string) => {
  const decl = declaration.replace(/\s+/g, '').replace(/[()/.]/g, '\\$&')
  return Array.from(element.classList).some(cls => {
    if (!minWidth) {
      // Base rules only: strip media blocks first
      const baseCss = css().replace(/@media[^{]*\{(\.[^{]*\{[^}]*\})+\}/g, '')
      return new RegExp(`\\.${cls}\\{[^}]*${decl}`).test(baseCss)
    }
    return new RegExp(`@media\\(min-width:${minWidth}\\)\\{\\.${cls}\\{[^}]*${decl}`).test(css())
  })
}

describe('Grid', () => {
  it('renders its children', () => {
    render(
      <Grid>
        <div>Cell</div>
      </Grid>
    )
    expect(screen.getByText('Cell')).toBeInTheDocument()
  })

  it('defaults to 12 equal columns', () => {
    render(<Grid data-testid="grid"><div /></Grid>)
    const grid = screen.getByTestId('grid')
    expect(hasRule(grid, 'display:grid')).toBe(true)
    expect(hasRule(grid, 'grid-template-columns:repeat(12,minmax(0,1fr))')).toBe(true)
  })

  it('uses the cols prop', () => {
    render(<Grid cols={4} data-testid="grid"><div /></Grid>)
    expect(hasRule(screen.getByTestId('grid'), 'grid-template-columns:repeat(4,minmax(0,1fr))')).toBe(true)
  })

  it('maps gap, gapX and gapY to spacing tokens', () => {
    render(
      <>
        <Grid gap="4" data-testid="gap"><div /></Grid>
        <Grid gapX="2" gapY="6" data-testid="axes"><div /></Grid>
      </>
    )
    expect(screen.getByTestId('gap')).toHaveStyle({ gap: spacing['4'] })
    expect(screen.getByTestId('axes')).toHaveStyle({ columnGap: spacing['2'], rowGap: spacing['6'] })
  })

  it('passes className and data-testid to the root', () => {
    render(<Grid className="custom" data-testid="grid"><div /></Grid>)
    expect(screen.getByTestId('grid')).toHaveClass('custom')
  })
})

describe('GridCol', () => {
  it('spans the given number of columns', () => {
    render(
      <Grid>
        <GridCol span={6} data-testid="col">Half</GridCol>
      </Grid>
    )
    expect(hasRule(screen.getByTestId('col'), 'grid-column:span 6 / span 6')).toBe(true)
  })

  it('sets order', () => {
    render(<GridCol order={2} data-testid="col">Second</GridCol>)
    expect(screen.getByTestId('col')).toHaveStyle({ order: '2' })
  })

  it('supports order 0, including at a breakpoint', () => {
    render(<GridCol order={0} orderMd={0} data-testid="col">First</GridCol>)
    const col = screen.getByTestId('col')
    expect(col).toHaveStyle({ order: '0' })
    expect(hasRule(col, 'order:0', breakpoint.md)).toBe(true)
  })

  it('adds responsive span and order rules at the breakpoints', () => {
    render(<GridCol spanMd={4} orderLg={1} data-testid="col">Cell</GridCol>)
    const col = screen.getByTestId('col')
    expect(hasRule(col, 'grid-column:span 4 / span 4', breakpoint.md)).toBe(true)
    expect(hasRule(col, 'order:1', breakpoint.lg)).toBe(true)
    expect(hasRule(col, 'grid-column:span 4 / span 4')).toBe(false)
  })

  it('passes className and data-testid to the root', () => {
    render(<GridCol className="custom" data-testid="col">Cell</GridCol>)
    expect(screen.getByTestId('col')).toHaveClass('custom')
  })
})

describe('ResponsiveGrid', () => {
  it('uses cols as the base column count', () => {
    render(<ResponsiveGrid cols={1} data-testid="grid"><div /></ResponsiveGrid>)
    const grid = screen.getByTestId('grid')
    expect(hasRule(grid, 'display:grid')).toBe(true)
    expect(hasRule(grid, 'grid-template-columns:repeat(1,minmax(0,1fr))')).toBe(true)
  })

  it('adds column counts at each breakpoint', () => {
    render(<ResponsiveGrid cols={1} colsSm={2} colsXl={4} data-testid="grid"><div /></ResponsiveGrid>)
    const grid = screen.getByTestId('grid')
    expect(hasRule(grid, 'grid-template-columns:repeat(2,minmax(0,1fr))', breakpoint.sm)).toBe(true)
    expect(hasRule(grid, 'grid-template-columns:repeat(4,minmax(0,1fr))', breakpoint.xl)).toBe(true)
  })

  it('maps base and responsive gaps to spacing tokens', () => {
    render(<ResponsiveGrid cols={2} gap="2" gapMd="8" gapYLg="10" data-testid="grid"><div /></ResponsiveGrid>)
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveStyle({ gap: spacing['2'] })
    expect(hasRule(grid, `gap:${spacing['8']}`, breakpoint.md)).toBe(true)
    expect(hasRule(grid, `row-gap:${spacing['10']}`, breakpoint.lg)).toBe(true)
  })

  it('passes className and data-testid to the root', () => {
    render(<ResponsiveGrid cols={1} className="custom" data-testid="grid"><div /></ResponsiveGrid>)
    expect(screen.getByTestId('grid')).toHaveClass('custom')
  })
})

describe('Accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <ResponsiveGrid cols={1} colsMd={2} gap="4">
        <GridCol span={1}>
          <p>First</p>
        </GridCol>
        <GridCol span={1}>
          <p>Second</p>
        </GridCol>
      </ResponsiveGrid>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
