import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Grid, GridCol } from './GridSystem'
import { Box } from '../../atoms/Box'
import { Typography } from '../../atoms/Typography'

export const gridColDocs: ComponentDocumentation = {
  id: 'grid-col',
  name: 'GridCol',
  description: 'A column inside a Grid. It spans a number of the grid\'s columns and can change its span and order from each breakpoint up.',
  category: 'Layout',
  parentId: 'grid-system',
  props: [
    { name: 'span', type: 'number', required: false, default: 'undefined', description: 'Number of columns to span' },
    { name: 'spanSm', type: 'number', required: false, default: 'undefined', description: 'Columns to span from the sm breakpoint up' },
    { name: 'spanMd', type: 'number', required: false, default: 'undefined', description: 'Columns to span from the md breakpoint up' },
    { name: 'spanLg', type: 'number', required: false, default: 'undefined', description: 'Columns to span from the lg breakpoint up' },
    { name: 'spanXl', type: 'number', required: false, default: 'undefined', description: 'Columns to span from the xl breakpoint up' },
    { name: 'order', type: 'number', required: false, default: 'undefined', description: 'CSS order of the column; 0 is allowed' },
    { name: 'orderSm', type: 'number', required: false, default: 'undefined', description: 'CSS order from the sm breakpoint up' },
    { name: 'orderMd', type: 'number', required: false, default: 'undefined', description: 'CSS order from the md breakpoint up' },
    { name: 'orderLg', type: 'number', required: false, default: 'undefined', description: 'CSS order from the lg breakpoint up' },
    { name: 'orderXl', type: 'number', required: false, default: 'undefined', description: 'CSS order from the xl breakpoint up' },
    { name: 'className', type: 'string', required: false, default: 'undefined', description: 'Custom className for the root element' },
    { name: 'data-testid', type: 'string', required: false, default: 'undefined', description: 'Test identifier, applied to the root element' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Column content' }
  ],

  tokens: [
    'semantic.breakpoint.sm',
    'semantic.breakpoint.md',
    'semantic.breakpoint.lg',
    'semantic.breakpoint.xl'
  ],

  examples: [
    {
      name: 'Column Spans',
      description: 'Columns spanning 8 and 4 of 12 columns.',
      code: `<Grid cols={12} gap="4">
  <GridCol span={8}><Box bg="surface" p="md"><Typography>Main</Typography></Box></GridCol>
  <GridCol span={4}><Box bg="surface" p="md"><Typography>Aside</Typography></Box></GridCol>
</Grid>`,
      renderComponent: () => (
          <Grid cols={12} gap="4">
            <GridCol span={8}><Box bg="surface" p="md"><Typography>Main</Typography></Box></GridCol>
            <GridCol span={4}><Box bg="surface" p="md"><Typography>Aside</Typography></Box></GridCol>
          </Grid>
      )
    },
    {
      name: 'Responsive Spans',
      description: 'Full width on small screens, then half width from md and a third from lg.',
      code: `<Grid cols={12} gap="4">
  <GridCol span={12} spanMd={6} spanLg={4}><Box bg="surface" p="md"><Typography>One</Typography></Box></GridCol>
  <GridCol span={12} spanMd={6} spanLg={4}><Box bg="surface" p="md"><Typography>Two</Typography></Box></GridCol>
  <GridCol span={12} spanMd={12} spanLg={4}><Box bg="surface" p="md"><Typography>Three</Typography></Box></GridCol>
</Grid>`,
      renderComponent: () => (
          <Grid cols={12} gap="4">
            <GridCol span={12} spanMd={6} spanLg={4}><Box bg="surface" p="md"><Typography>One</Typography></Box></GridCol>
            <GridCol span={12} spanMd={6} spanLg={4}><Box bg="surface" p="md"><Typography>Two</Typography></Box></GridCol>
            <GridCol span={12} spanMd={12} spanLg={4}><Box bg="surface" p="md"><Typography>Three</Typography></Box></GridCol>
          </Grid>
      )
    },
    {
      name: 'Order',
      description: 'The aside comes second in the DOM but shows first from md up. Screen readers still read it second.',
      code: `<Grid cols={12} gap="4">
  <GridCol span={12} spanMd={8}><Box bg="surface" p="md"><Typography>Main</Typography></Box></GridCol>
  <GridCol span={12} spanMd={4} orderMd={-1}><Box bg="surface" p="md"><Typography>Aside</Typography></Box></GridCol>
</Grid>`,
      renderComponent: () => (
          <Grid cols={12} gap="4">
            <GridCol span={12} spanMd={8}><Box bg="surface" p="md"><Typography>Main</Typography></Box></GridCol>
            <GridCol span={12} spanMd={4} orderMd={-1}><Box bg="surface" p="md"><Typography>Aside</Typography></Box></GridCol>
          </Grid>
      )
    }
  ],

  accessibility: {
    notes: [
      'Renders a plain div with no role',
      'Screen readers and keyboard focus follow the DOM order, not the visual order. Only use order props when the visual change does not alter the meaning or reading sequence (WCAG 1.3.2, 2.4.3)'
    ]
  }
}
