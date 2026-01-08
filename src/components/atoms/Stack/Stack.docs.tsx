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
      description: 'Child elements to arrange in the stack layout'
    },
    {
      name: 'direction',
      type: "'column' | 'row'",
      required: false,
      default: 'row',
      description: 'Flex direction - row for horizontal layout, column for vertical layout'
    },
    {
      name: 'alignItems',
      type: "'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'",
      required: false,
      default: 'initial',
      description: 'Cross-axis alignment: center (middle), flex-start (start), flex-end (end), stretch (full width/height), baseline (text baseline)'
    },
    {
      name: 'justifyContent',
      type: "'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'",
      required: false,
      default: 'initial',
      description: 'Main-axis alignment and distribution: center, start/end positioning, or space distribution patterns'
    },
    {
      name: 'gap',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'",
      required: false,
      default: 'md',
      description: 'Spacing between child elements using semantic layout spacing tokens. Range from none (0px) to 6xl (96px)'
    },
    {
      name: 'wrap',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Allow children to wrap to new lines when container width is exceeded (flex-wrap: wrap)'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing purposes'
    }
  ],

  tokens: [
    // Layout spacing tokens used for gap property
    'semantic.spacing.layout.none',  // 0px
    'semantic.spacing.layout.xs',    // 4px
    'semantic.spacing.layout.sm',    // 8px
    'semantic.spacing.layout.md',    // 16px (default)
    'semantic.spacing.layout.lg',    // 24px
    'semantic.spacing.layout.xl',    // 32px
    'semantic.spacing.layout.2xl',   // 48px
    'semantic.spacing.layout.3xl',   // 64px
    'semantic.spacing.layout.4xl',   // 80px
    'semantic.spacing.layout.5xl',   // 96px
    'semantic.spacing.layout.6xl'    // 128px
  ],

  examples: [
    {
      name: 'Basic Layouts',
      description: 'Row and column arrangements with consistent spacing',
      code: `{/* Horizontal layout */}
<Stack direction="row" gap="md">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>

{/* Vertical layout */}
<Stack direction="column" gap="sm">
  <Box>Item A</Box>
  <Box>Item B</Box>
  <Box>Item C</Box>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Stack direction="row" gap="md">
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item 1</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item 2</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item 3</Typography></Box>
          </Stack>
          <Stack direction="column" gap="sm">
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item A</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item B</Typography></Box>
            <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Item C</Typography></Box>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Gap Variants',
      description: 'All available spacing options from none to 6xl',
      code: `<Stack direction="column" gap="lg">
  <Stack direction="row" gap="none">
    <Box>None</Box><Box>Gap</Box>
  </Stack>
  <Stack direction="row" gap="xs">
    <Box>XS</Box><Box>Gap</Box>
  </Stack>
  <Stack direction="row" gap="sm">
    <Box>SM</Box><Box>Gap</Box>
  </Stack>
  <Stack direction="row" gap="md">
    <Box>MD</Box><Box>Gap</Box>
  </Stack>
  <Stack direction="row" gap="lg">
    <Box>LG</Box><Box>Gap</Box>
  </Stack>
  <Stack direction="row" gap="xl">
    <Box>XL</Box><Box>Gap</Box>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <Stack direction="row" gap="none">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">None</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="xs">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">XS</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="sm">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">SM</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="md">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">MD</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="lg">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">LG</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
          <Stack direction="row" gap="xl">
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">XL</Typography></Box>
            <Box bg="surface" border="subtle" p="sm" borderRadius="xs"><Typography variant="small">Gap</Typography></Box>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Alignment Options',
      description: 'Cross-axis alignment with alignItems and main-axis distribution with justifyContent',
      code: `{/* Center alignment */}
<Stack direction="row" gap="md" alignItems="center" justifyContent="center">
  <Box>Centered</Box>
  <Box>Content</Box>
</Stack>

{/* Space between distribution */}
<Stack direction="row" gap="sm" justifyContent="space-between">
  <Box>Start</Box>
  <Box>Middle</Box>
  <Box>End</Box>
</Stack>

{/* Stretch alignment */}
<Stack direction="row" gap="md" alignItems="stretch" style={{height: '80px'}}>
  <Box>Stretched</Box>
  <Box>Height</Box>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Box>
            <Typography variant="label" color="subdued">Center alignment</Typography>
            <Stack direction="row" gap="md" alignItems="center" justifyContent="center">
              <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Centered</Typography></Box>
              <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Content</Typography></Box>
            </Stack>
          </Box>
          <Box>
            <Typography variant="label" color="subdued">Space between distribution</Typography>
            <Stack direction="row" gap="sm" justifyContent="space-between">
              <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Start</Typography></Box>
              <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Middle</Typography></Box>
              <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>End</Typography></Box>
            </Stack>
          </Box>
          <Box>
            <Typography variant="label" color="subdued">Stretch alignment</Typography>
            <Box style={{height: '80px'}}>
              <Stack direction="row" gap="md" alignItems="stretch">
                <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Stretched</Typography></Box>
                <Box bg="surface" border="subtle" p="md" borderRadius="sm"><Typography>Height</Typography></Box>
              </Stack>
            </Box>
          </Box>
        </Stack>
      )
    },
    {
      name: 'Responsive Wrapping',
      description: 'Flexible layouts that adapt to container width using the wrap prop',
      code: `<Stack direction="row" gap="md" wrap={true}>
  <Box style={{minWidth: '120px'}}>Item 1</Box>
  <Box style={{minWidth: '120px'}}>Item 2</Box>
  <Box style={{minWidth: '120px'}}>Item 3</Box>
  <Box style={{minWidth: '120px'}}>Item 4</Box>
  <Box style={{minWidth: '120px'}}>Item 5</Box>
  <Box style={{minWidth: '120px'}}>Item 6</Box>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" wrap={true}>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 1</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 2</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 3</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 4</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 5</Typography></Box>
          <Box bg="surface" border="subtle" p="md" borderRadius="sm" style={{minWidth: '120px'}}><Typography>Item 6</Typography></Box>
        </Stack>
      )
    },
    {
      name: 'Complex Layout Patterns',
      description: 'Real-world layout patterns using nested stacks',
      code: `{/* Card layout with header, content, and actions */}
<Stack direction="column" gap="lg">
  {/* Header */}
  <Stack direction="row" gap="md" justifyContent="space-between" alignItems="center">
    <Typography variant="h3">Card Title</Typography>
    <Typography variant="small" color="subdued">Dec 2024</Typography>
  </Stack>
  
  {/* Content */}
  <Stack direction="column" gap="sm">
    <Typography variant="body">
      This is the main content area with detailed information.
    </Typography>
    <Typography variant="small" color="subdued">
      Additional supporting information goes here.
    </Typography>
  </Stack>
  
  {/* Actions */}
  <Stack direction="row" gap="sm" justifyContent="flex-end">
    <Box>Cancel</Box>
    <Box>Save</Box>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Box bg="surface" border="subtle" p="lg" borderRadius="sm">
          <Stack direction="column" gap="lg">
            {/* Header */}
            <Stack direction="row" gap="md" justifyContent="space-between" alignItems="center">
              <Typography variant="h3">Card Title</Typography>
              <Typography variant="small" color="subdued">Dec 2024</Typography>
            </Stack>
            
            {/* Content */}
            <Stack direction="column" gap="sm">
              <Typography variant="body">
                This is the main content area with detailed information about the component usage.
              </Typography>
              <Typography variant="small" color="subdued">
                Additional supporting information goes here for context.
              </Typography>
            </Stack>
            
            {/* Actions */}
            <Stack direction="row" gap="sm" justifyContent="flex-end">
              <Box bg="subtle" border="subtle" p="sm" borderRadius="xs">
                <Typography variant="button2">Cancel</Typography>
              </Box>
              <Box bg="interactive" p="sm" borderRadius="xs">
                <Typography variant="button2" color="inverse">Save</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )
    }
  ],

  accessibility: {
    notes: [
      'Layout Container: Acts as a transparent layout container that preserves semantic structure of child elements',
      'Tab Order: Maintains natural tab order - children are focusable in document source order regardless of visual layout',
      'Screen Reader Navigation: Does not interfere with screen reader navigation patterns or landmarks',
      'Focus Management: No focus trapping or redirection - focus flows naturally through child elements',
      'Responsive Layout: Layout adapts to content and viewport changes without breaking accessibility',
      'Semantic Preservation: Does not add semantic meaning - relies on child elements for proper ARIA roles and labels',
      'Content Reflow: Supports text scaling up to 200% and layout reflow without horizontal scrolling',
      'High Contrast: Layout remains functional in high contrast and dark modes',
      'Reduced Motion: Respects user preferences for reduced motion - no animated layout transitions',
      'Automated Testing: Comprehensive jest-axe testing ensures no accessibility violations are introduced'
    ],
    keyboardNavigation: 'Transparent - keyboard navigation flows through child elements in document order',
    screenReader: 'Container is ignored by screen readers, child content announced based on their semantic roles',
    focusManagement: 'No focus management - natural focus flow maintained through child elements',
    colorContrast: 'Not applicable - Stack provides layout structure only, child components handle color contrast'
  },

  notes: [
    'Layout Direction: Default direction is "row" for horizontal layouts - use "column" for vertical stacks',
    'Spacing System: Gap property uses semantic.spacing.layout tokens (4px to 128px) for consistent spacing',
    'Flexbox Foundation: Built on CSS Flexbox for predictable cross-browser behavior and modern layout capabilities',
    'Alignment Control: Use alignItems for cross-axis alignment and justifyContent for main-axis distribution',
    'Responsive Design: Combine wrap=true with proper child sizing for responsive grid-like behaviors',
    'CSS Custom Properties: Uses CSS custom properties internally for optimal performance and style isolation',
    'Nested Layouts: Stack components can be nested to create complex layout patterns while maintaining performance',
    'Default Gap: Medium gap (16px) applied by default - explicitly set gap="none" for no spacing',
    'Browser Support: Supports all modern browsers with CSS Flexbox and custom properties support',
    'Performance: Lightweight implementation with minimal DOM overhead and efficient re-rendering'
  ]
}
