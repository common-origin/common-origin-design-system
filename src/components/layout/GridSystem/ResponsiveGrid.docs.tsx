import { ComponentDocumentation } from '../../../lib/docgen/types'
import { ResponsiveGrid } from './GridSystem'
import { Box } from '../../atoms/Box'
import { Typography } from '../../atoms/Typography'

export const responsiveGridDocs: ComponentDocumentation = {
  id: 'responsive-grid',
  name: 'ResponsiveGrid',
  description: 'A grid of equal columns whose column count and gaps change from each breakpoint up. Use it for lists of cards or tiles; use Grid and GridCol when items need different spans.',
  category: 'Layout',
  parentId: 'grid-system',
  props: [
    { name: 'cols', type: 'number', required: true, description: 'Number of columns below the sm breakpoint (the base column count)' },
    { name: 'colsSm', type: 'number', required: false, default: 'undefined', description: 'Number of columns from the sm breakpoint up' },
    { name: 'colsMd', type: 'number', required: false, default: 'undefined', description: 'Number of columns from the md breakpoint up' },
    { name: 'colsLg', type: 'number', required: false, default: 'undefined', description: 'Number of columns from the lg breakpoint up' },
    { name: 'colsXl', type: 'number', required: false, default: 'undefined', description: 'Number of columns from the xl breakpoint up' },
    { name: 'gap', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows and columns' },
    { name: 'gapSm', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows and columns from the sm breakpoint up' },
    { name: 'gapMd', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows and columns from the md breakpoint up' },
    { name: 'gapLg', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows and columns from the lg breakpoint up' },
    { name: 'gapXl', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows and columns from the xl breakpoint up' },
    { name: 'gapX', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between columns' },
    { name: 'gapXSm', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between columns from the sm breakpoint up' },
    { name: 'gapXMd', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between columns from the md breakpoint up' },
    { name: 'gapXLg', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between columns from the lg breakpoint up' },
    { name: 'gapXXl', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between columns from the xl breakpoint up' },
    { name: 'gapY', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows' },
    { name: 'gapYSm', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows from the sm breakpoint up' },
    { name: 'gapYMd', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows from the md breakpoint up' },
    { name: 'gapYLg', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows from the lg breakpoint up' },
    { name: 'gapYXl', type: "keyof Tokens['base']['spacing']", required: false, default: 'undefined', description: 'Gap between rows from the xl breakpoint up' },
    { name: 'className', type: 'string', required: false, default: 'undefined', description: 'Custom className for the root element' },
    { name: 'data-testid', type: 'string', required: false, default: 'undefined', description: 'Test identifier, applied to the root element' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Grid items' }
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
      name: 'Responsive Columns',
      description: 'One column on small screens, two from md and three from xl.',
      code: `<ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap="4">
  <Box bg="surface" p="md"><Typography>Item 1</Typography></Box>
  <Box bg="surface" p="md"><Typography>Item 2</Typography></Box>
  <Box bg="surface" p="md"><Typography>Item 3</Typography></Box>
</ResponsiveGrid>`,
      renderComponent: () => (
          <ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap="4">
            <Box bg="surface" p="md"><Typography>Item 1</Typography></Box>
            <Box bg="surface" p="md"><Typography>Item 2</Typography></Box>
            <Box bg="surface" p="md"><Typography>Item 3</Typography></Box>
          </ResponsiveGrid>
      )
    },
    {
      name: 'Responsive Gaps',
      description: 'A tighter gap on small screens that opens up from md.',
      code: `<ResponsiveGrid cols={2} gap="2" gapMd="6">
  <Box bg="surface" p="md"><Typography>Item 1</Typography></Box>
  <Box bg="surface" p="md"><Typography>Item 2</Typography></Box>
  <Box bg="surface" p="md"><Typography>Item 3</Typography></Box>
  <Box bg="surface" p="md"><Typography>Item 4</Typography></Box>
</ResponsiveGrid>`,
      renderComponent: () => (
          <ResponsiveGrid cols={2} gap="2" gapMd="6">
            <Box bg="surface" p="md"><Typography>Item 1</Typography></Box>
            <Box bg="surface" p="md"><Typography>Item 2</Typography></Box>
            <Box bg="surface" p="md"><Typography>Item 3</Typography></Box>
            <Box bg="surface" p="md"><Typography>Item 4</Typography></Box>
          </ResponsiveGrid>
      )
    },
    {
      name: 'Separate Column and Row Gaps',
      description: 'gapX and gapY set the column and row gaps independently.',
      code: `<ResponsiveGrid cols={2} colsLg={4} gapX="4" gapY="8">
  <Box bg="surface" p="md"><Typography>A</Typography></Box>
  <Box bg="surface" p="md"><Typography>B</Typography></Box>
  <Box bg="surface" p="md"><Typography>C</Typography></Box>
  <Box bg="surface" p="md"><Typography>D</Typography></Box>
</ResponsiveGrid>`,
      renderComponent: () => (
          <ResponsiveGrid cols={2} colsLg={4} gapX="4" gapY="8">
            <Box bg="surface" p="md"><Typography>A</Typography></Box>
            <Box bg="surface" p="md"><Typography>B</Typography></Box>
            <Box bg="surface" p="md"><Typography>C</Typography></Box>
            <Box bg="surface" p="md"><Typography>D</Typography></Box>
          </ResponsiveGrid>
      )
    }
  ],

  notes: [
    'Gap props take base spacing keys (base.spacing.*), which decision 0014 says components should not use. Moving them to semantic spacing keys is migration work tracked in #34.'
  ],

  anatomy: {
    description: 'A single CSS grid container. Its children become the grid items; there are no wrappers.',
    parts: [
      {
        name: 'Container',
        description: 'div with display: grid and equal columns (repeat(n, minmax(0, 1fr))). Column count, gap, column gap and row gap change at the sm, md, lg and xl breakpoints.',
        tokens: ['base.spacing.*', 'semantic.breakpoint.sm', 'semantic.breakpoint.md', 'semantic.breakpoint.lg', 'semantic.breakpoint.xl']
      }
    ]
  },

  accessibility: {
    notes: [
      'Renders a plain div with no role; items are read in DOM order',
      'For a list of cards, render the items as a list (ul/li) inside or instead of the grid so screen readers announce the count'
    ]
  }
}
