import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { Grid, GridCol, ResponsiveGrid } from './GridSystem'
import { Typography } from '../../atoms/Typography'

export const gridSystemDocs: ComponentDocumentation = {
  id: 'grid-system',
  name: 'GridSystem',
  description: 'CSS Grid layout components: Grid (a fixed column grid, whose props are listed here), GridCol (a column that spans and reorders, per breakpoint) and ResponsiveGrid (a grid whose column count and gaps change per breakpoint). GridCol and ResponsiveGrid have their own pages below this one.',
  category: 'Layout',
  props: [
    { name: 'cols', type: 'number', required: false, default: '12', description: 'Number of equal columns' },
    { name: 'gap', type: 'SpacingToken (base spacing key)', required: false, default: 'undefined', description: 'Gap between rows and columns' },
    { name: 'gapX', type: 'SpacingToken (base spacing key)', required: false, default: 'undefined', description: 'Gap between columns' },
    { name: 'gapY', type: 'SpacingToken (base spacing key)', required: false, default: 'undefined', description: 'Gap between rows' },
    { name: 'className', type: 'string', required: false, default: 'undefined', description: 'Custom className for the root element' },
    { name: 'data-testid', type: 'string', required: false, default: 'undefined', description: 'Test identifier, applied to the root element' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Grid items, usually GridCol' }
  
  ],
  tokens: [
    'base.spacing.*',
    'semantic.breakpoint.sm',
    'semantic.breakpoint.md',
    'semantic.breakpoint.lg',
    'semantic.breakpoint.xl'
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
  anatomy: {
    description: 'Grid is a single CSS grid container with a fixed number of equal columns. Its children, usually GridCol, are the grid items.',
    parts: [
      {
        name: 'Container',
        description: 'div with display: grid, repeat(cols, minmax(0, 1fr)) columns (12 by default), and optional gap, column gap and row gap.',
        tokens: ['base.spacing.*']
      },
      {
        name: 'GridCol',
        description: 'Optional grid items that span columns and reorder per breakpoint. See the GridCol page.'
      }
    ]
  },

  accessibility: {
    notes: [
      'Grid, GridCol and ResponsiveGrid render plain divs with no roles, so they add nothing to the accessibility tree',
      'Use semantic HTML for the content inside the grid (headings, lists, landmarks)',
      'Screen readers and keyboard focus follow the DOM order, not the visual grid. Avoid GridCol order props that make the visual order disagree with the reading order (WCAG 1.3.2, 2.4.3)'
    ]
  },
  notes: [
    'GridSystem provides CSS Grid-based layout utilities for responsive design.',
    'Use ResponsiveGrid for breakpoint-based layouts similar to Tailwind CSS patterns.',
    'Gap props take base spacing keys (base.spacing.*), which decision 0014 says components should not use. Moving them to semantic spacing keys is migration work tracked in #34.',
    'For flexbox layouts, use the Stack component from the atoms collection.'
  ]
}
