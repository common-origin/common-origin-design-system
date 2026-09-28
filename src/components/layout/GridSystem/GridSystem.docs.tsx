import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { Grid, GridCol, ResponsiveGrid } from './GridSystem'
import { Typography } from '../../atoms/Typography'

export const gridSystemDocs: ComponentDocumentation = {
  id: 'grid-system',
  name: 'GridSystem',
  description: 'Flexible, responsive CSS Grid layout utilities for building complex layouts. Includes Grid, GridCol, and ResponsiveGrid components for systematic layout design.',
  category: 'Layout',
  props: [
    { name: 'Grid.cols', type: 'number', required: false, default: '12', description: 'Number of equal columns' },
    { name: 'Grid.gap', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns' },
    { name: 'Grid.gapX', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns' },
    { name: 'Grid.gapY', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows' },
    { name: 'Grid.className', type: 'string', required: false, description: 'Custom className for the root element' },
    { name: 'Grid.data-testid', type: 'string', required: false, description: 'Test identifier, applied to the root element' },
    { name: 'Grid.children', type: 'React.ReactNode', required: true, description: 'Grid items, usually GridCol' },
    { name: 'GridCol.span', type: 'number', required: false, description: 'Number of columns to span' },
    { name: 'GridCol.spanSm', type: 'number', required: false, description: 'Columns to span from the sm breakpoint up' },
    { name: 'GridCol.spanMd', type: 'number', required: false, description: 'Columns to span from the md breakpoint up' },
    { name: 'GridCol.spanLg', type: 'number', required: false, description: 'Columns to span from the lg breakpoint up' },
    { name: 'GridCol.spanXl', type: 'number', required: false, description: 'Columns to span from the xl breakpoint up' },
    { name: 'GridCol.order', type: 'number', required: false, description: 'CSS order of the column; 0 is allowed' },
    { name: 'GridCol.orderSm', type: 'number', required: false, description: 'CSS order from the sm breakpoint up' },
    { name: 'GridCol.orderMd', type: 'number', required: false, description: 'CSS order from the md breakpoint up' },
    { name: 'GridCol.orderLg', type: 'number', required: false, description: 'CSS order from the lg breakpoint up' },
    { name: 'GridCol.orderXl', type: 'number', required: false, description: 'CSS order from the xl breakpoint up' },
    { name: 'GridCol.className', type: 'string', required: false, description: 'Custom className for the root element' },
    { name: 'GridCol.data-testid', type: 'string', required: false, description: 'Test identifier, applied to the root element' },
    { name: 'GridCol.children', type: 'React.ReactNode', required: true, description: 'Column content' },
    { name: 'ResponsiveGrid.cols', type: 'number', required: true, description: 'Number of columns below the sm breakpoint (the base column count)' },
    { name: 'ResponsiveGrid.colsSm', type: 'number', required: false, description: 'Number of columns from the sm breakpoint up' },
    { name: 'ResponsiveGrid.colsMd', type: 'number', required: false, description: 'Number of columns from the md breakpoint up' },
    { name: 'ResponsiveGrid.colsLg', type: 'number', required: false, description: 'Number of columns from the lg breakpoint up' },
    { name: 'ResponsiveGrid.colsXl', type: 'number', required: false, description: 'Number of columns from the xl breakpoint up' },
    { name: 'ResponsiveGrid.gap', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns' },
    { name: 'ResponsiveGrid.gapSm', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns from the sm breakpoint up' },
    { name: 'ResponsiveGrid.gapMd', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns from the md breakpoint up' },
    { name: 'ResponsiveGrid.gapLg', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns from the lg breakpoint up' },
    { name: 'ResponsiveGrid.gapXl', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows and columns from the xl breakpoint up' },
    { name: 'ResponsiveGrid.gapX', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns' },
    { name: 'ResponsiveGrid.gapXSm', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns from the sm breakpoint up' },
    { name: 'ResponsiveGrid.gapXMd', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns from the md breakpoint up' },
    { name: 'ResponsiveGrid.gapXLg', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns from the lg breakpoint up' },
    { name: 'ResponsiveGrid.gapXXl', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between columns from the xl breakpoint up' },
    { name: 'ResponsiveGrid.gapY', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows' },
    { name: 'ResponsiveGrid.gapYSm', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows from the sm breakpoint up' },
    { name: 'ResponsiveGrid.gapYMd', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows from the md breakpoint up' },
    { name: 'ResponsiveGrid.gapYLg', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows from the lg breakpoint up' },
    { name: 'ResponsiveGrid.gapYXl', type: 'SpacingToken (base spacing key)', required: false, description: 'Gap between rows from the xl breakpoint up' },
    { name: 'ResponsiveGrid.className', type: 'string', required: false, description: 'Custom className for the root element' },
    { name: 'ResponsiveGrid.data-testid', type: 'string', required: false, description: 'Test identifier, applied to the root element' },
    { name: 'ResponsiveGrid.children', type: 'React.ReactNode', required: true, description: 'Grid items' }
  ],
  tokens: [
    'base.spacing.* - gap props take base spacing keys (public API; exception to decision 0014)',
    'semantic.breakpoint.*',
    'semantic.color.background.*',
    'semantic.color.border.*'
  ],
  examples: [
    {
      name: 'Basic Grid',
      description: 'A 12-column grid with two columns.',
      code: `<Grid cols={12} gap="4">
  <GridCol span={6}><Typography>Left</Typography></GridCol>
  <GridCol span={6}><Typography>Right</Typography></GridCol>
</Grid>`,
      renderComponent: () => (
        <Grid cols={12} gap="4">
          <GridCol span={6}><Typography>Left</Typography></GridCol>
          <GridCol span={6}><Typography>Right</Typography></GridCol>
        </Grid>
      )
    },
    {
      name: 'Responsive Grid',
      description: 'Grid with different columns at breakpoints.',
      code: `<ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap="4">
  <div><Typography>Item 1</Typography></div>
  <div><Typography>Item 2</Typography></div>
  <div><Typography>Item 3</Typography></div>
</ResponsiveGrid>`,
      renderComponent: () => (
        <ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap="4">
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 1</Typography></div>
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 2</Typography></div>
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 3</Typography></div>
        </ResponsiveGrid>
      )
    },
    {
      name: 'Complex Grid Layout',
      description: 'Advanced grid with mixed column spans and responsive behavior.',
      code: `<Grid cols={12} gap="4">
  <GridCol span={12} spanMd={8} spanLg={9}>
    <Typography variant="h3">Main Content</Typography>
    <div style={{ marginTop: '1rem' }}>
      <Grid cols={6} gap="2">
        <GridCol span={2}>
          <Typography variant="caption">Sub 1</Typography>
        </GridCol>
        <GridCol span={2}>
          <Typography variant="caption">Sub 2</Typography>
        </GridCol>
        <GridCol span={2}>
          <Typography variant="caption">Sub 3</Typography>
        </GridCol>
        <GridCol span={3}>
          <Typography variant="caption">Sub 4</Typography>
        </GridCol>
        <GridCol span={3}>
          <Typography variant="caption">Sub 5</Typography>
        </GridCol>
      </Grid>
    </div>
  </GridCol>
  <GridCol span={12} spanMd={4} spanLg={3}>
    <Typography variant="body">Sidebar</Typography>
  </GridCol>
  <GridCol span={6} spanMd={4}>
    <Typography variant="body">Card 1</Typography>
  </GridCol>
  <GridCol span={6} spanMd={4}>
    <Typography variant="body">Card 2</Typography>
  </GridCol>
  <GridCol span={12} spanMd={4}>
    <Typography variant="body">Card 3</Typography>
  </GridCol>
  <GridCol span={12}>
    <Typography variant="body">Footer Content</Typography>
  </GridCol>
</Grid>`,
      renderComponent: () => (
        <Grid cols={12} gap="4">
          <GridCol span={12} spanMd={8} spanLg={9}>
            <div style={{ background: '#007bff', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="h3">Main Content</Typography>
              <div style={{ marginTop: '1rem' }}>
                <Grid cols={6} gap="2">
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 1</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 2</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 3</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={3}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 4</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={3}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 5</Typography>
                    </div>
                  </GridCol>
                </Grid>
              </div>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={4} spanLg={3}>
            <div style={{ background: '#6c757d', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Sidebar</Typography>
            </div>
          </GridCol>
          <GridCol span={6} spanMd={4}>
            <div style={{ background: '#28a745', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 1</Typography>
            </div>
          </GridCol>
          <GridCol span={6} spanMd={4}>
            <div style={{ background: '#ffc107', color: 'black', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 2</Typography>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={4}>
            <div style={{ background: '#dc3545', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 3</Typography>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div style={{ background: '#e9ecef', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Footer Content</Typography>
            </div>
          </GridCol>
        </Grid>
      )
    }
  ],
  accessibility: {
    notes: [
      'Grid layouts are purely presentational and do not affect accessibility tree.',
      'Ensure semantic HTML structure for content inside grid containers.'
    ]
  },
  notes: [
    'GridSystem provides CSS Grid-based layout utilities for responsive design.',
    'Use ResponsiveGrid for breakpoint-based layouts similar to Tailwind CSS patterns.',
    'All spacing and breakpoints are tokenized for design consistency.',
    'For flexbox layouts, use the Stack component from the atoms collection.'
  ]
}
