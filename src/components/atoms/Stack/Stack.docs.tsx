import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Stack } from './Stack'
import { Box } from '../Box'
import { Typography } from '../Typography'

export const stackDocs: ComponentDocumentation = {
  id: 'stack',
  name: 'Stack',
  description: 'Flexbox-based layout component for arranging elements in rows or columns with consistent spacing. Provides flexible alignment and gap controls using design tokens. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from StackProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Child elements to arrange in the stack'
    },
    {
      name: 'direction',
      type: "'column' | 'row'",
      required: false,
      description: 'Primary axis direction for laying out children'
    },
    {
      name: 'alignItems',
      type: "'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'",
      required: false,
      description: 'Cross-axis alignment of children'
    },
    {
      name: 'justifyContent',
      type: "'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
      required: false,
      description: 'Main-axis alignment and distribution of children'
    },
    {
      name: 'gap',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'",
      required: false,
      description: 'Spacing between child elements using design tokens'
    },
    {
      name: 'wrap',
      type: 'boolean',
      required: false,
      description: 'Allow children to wrap to new lines when needed'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    }
  ],

  tokens: [
    'semantic.spacing.stack.xs',
    'semantic.spacing.stack.sm', 
    'semantic.spacing.stack.md',
    'semantic.spacing.stack.lg',
    'semantic.spacing.stack.xl',
    'semantic.spacing.stack.2xl',
    'semantic.spacing.stack.3xl',
    'semantic.spacing.stack.4xl',
    'semantic.spacing.stack.5xl',
    'semantic.spacing.stack.6xl'
  ],

  examples: [
    {
      name: 'Row Layout',
      description: 'Horizontal arrangement of children',
      code: `<Stack direction="row" gap="md">
  <Box/>
  <Box/>
  <Box/>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>First</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>Second</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>Third</Typography></Box>
        </Stack>
      )
    },
    {
      name: 'Column Layout',
      description: 'Vertical arrangement of children',
      code: `<Stack direction="column" gap="sm">
  <Box/>
  <Box/>
  <Box/>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>First</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>Second</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>Third</Typography></Box>
        </Stack>
      )
    },
    {
      name: 'Spacing Variants',
      description: 'Different gap sizes for various spacing needs',
      code: `<Stack direction="column" gap="lg">
  <Stack direction="row" gap="xs">
    <Box/>
    <Box/>
  </Stack>
  <Stack direction="row" gap="md">
    <Box/>
    <Box/>
  </Stack>
  <Stack direction="row" gap="xl">
    <Box/>
    <Box/>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="xs">
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>XS Gap</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>XS Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="md">
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>MD Gap</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>MD Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="xl">
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>XL Gap</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="2"><Typography>XL Gap</Typography></Box>
          </Stack>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Preserves natural tab order of child elements',
      'Does not interfere with focus management',
      'Maintains semantic structure of children',
      'Responsive layout adapts to content',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Layout component that enhances rather than hinders accessibility',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Inherited from child components',
    screenReader: 'Transparent to screen readers - children announced normally',
    focusManagement: 'Does not trap or manage focus'
  },

  notes: [
    'Default direction is column for natural document flow',
    'Gap uses design tokens for consistent spacing system',
    'Flexbox-based for predictable cross-browser behavior',
    'Use alignItems and justifyContent for precise control',
    'Wrap allows responsive behavior when content overflows'
  ]
}
