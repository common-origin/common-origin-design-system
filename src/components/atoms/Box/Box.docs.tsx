import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Box } from './Box'
import { Typography } from '../Typography'
import { Stack } from '../Stack'

export const boxDocs: ComponentDocumentation = {
  id: 'box',
  name: 'Box',
  description: 'Comprehensive utility component providing low-level styling primitives. Supports flexbox layout, spacing, positioning, borders, and more using design tokens. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from BoxProps interface
  props: [
    // Display & Layout
    {
      name: 'display',
      type: "'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'none'",
      required: false,
      description: 'CSS display property'
    },
    {
      name: 'flexDirection',
      type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
      required: false,
      description: 'Flex direction when display is flex'
    },
    {
      name: 'justifyContent',
      type: "'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'",
      required: false,
      description: 'Main axis alignment for flex layouts'
    },
    {
      name: 'alignItems',
      type: "'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'",
      required: false,
      description: 'Cross axis alignment for flex layouts'
    },
    {
      name: 'flexWrap',
      type: "'nowrap' | 'wrap' | 'wrap-reverse'",
      required: false,
      description: 'Flex wrap behavior'
    },
    {
      name: 'gap',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Gap between flex/grid children using layout tokens'
    },
    
    // Margin spacing
    {
      name: 'm',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin on all sides using layout spacing tokens'
    },
    {
      name: 'mt',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin top using layout spacing tokens'
    },
    {
      name: 'mr',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin right using layout spacing tokens'
    },
    {
      name: 'mb',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin bottom using layout spacing tokens'
    },
    {
      name: 'ml',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin left using layout spacing tokens'
    },
    {
      name: 'mx',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin horizontal (left & right) using layout spacing tokens'
    },
    {
      name: 'my',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Margin vertical (top & bottom) using layout spacing tokens'
    },
    
    // Padding spacing
    {
      name: 'p',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding on all sides using layout spacing tokens'
    },
    {
      name: 'pt',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding top using layout spacing tokens'
    },
    {
      name: 'pr',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding right using layout spacing tokens'
    },
    {
      name: 'pb',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding bottom using layout spacing tokens'
    },
    {
      name: 'pl',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding left using layout spacing tokens'
    },
    {
      name: 'px',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding horizontal (left & right) using layout spacing tokens'
    },
    {
      name: 'py',
      type: 'keyof typeof tokens.semantic.spacing.layout',
      required: false,
      description: 'Padding vertical (top & bottom) using layout spacing tokens'
    },
    
    // Size
    {
      name: 'width',
      type: 'string',
      required: false,
      description: 'CSS width property'
    },
    {
      name: 'height',
      type: 'string',
      required: false,
      description: 'CSS height property'
    },
    {
      name: 'maxWidth',
      type: 'string',
      required: false,
      description: 'CSS max-width property'
    },
    {
      name: 'maxHeight',
      type: 'string',
      required: false,
      description: 'CSS max-height property'
    },
    {
      name: 'minWidth',
      type: 'string',
      required: false,
      description: 'CSS min-width property'
    },
    {
      name: 'minHeight',
      type: 'string',
      required: false,
      description: 'CSS min-height property'
    },
    
    // Position
    {
      name: 'position',
      type: "'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'",
      required: false,
      description: 'CSS position property'
    },
    {
      name: 'top',
      type: 'string',
      required: false,
      description: 'CSS top property for positioned elements'
    },
    {
      name: 'right',
      type: 'string',
      required: false,
      description: 'CSS right property for positioned elements'
    },
    {
      name: 'bottom',
      type: 'string',
      required: false,
      description: 'CSS bottom property for positioned elements'
    },
    {
      name: 'left',
      type: 'string',
      required: false,
      description: 'CSS left property for positioned elements'
    },
    
    // Borders
    {
      name: 'borderRadius',
      type: 'keyof typeof tokens.base.border.radius',
      required: false,
      description: 'Border radius using design tokens'
    },
    {
      name: 'border',
      type: 'keyof typeof tokens.semantic.color.border',
      required: false,
      description: 'Border using semantic border color tokens'
    },
    {
      name: 'borderTop',
      type: 'keyof typeof tokens.semantic.color.border',
      required: false,
      description: 'Top border using semantic border color tokens'
    },
    {
      name: 'borderRight',
      type: 'keyof typeof tokens.semantic.color.border',
      required: false,
      description: 'Right border using semantic border color tokens'
    },
    {
      name: 'borderBottom',
      type: 'keyof typeof tokens.semantic.color.border',
      required: false,
      description: 'Bottom border using semantic border color tokens'
    },
    {
      name: 'borderLeft',
      type: 'keyof typeof tokens.semantic.color.border',
      required: false,
      description: 'Left border using semantic border color tokens'
    },
    
    // Background & Color
    {
      name: 'bg',
      type: 'keyof typeof tokens.semantic.color.background',
      required: false,
      description: 'Background color using semantic background tokens'
    },
    {
      name: 'color',
      type: 'keyof typeof tokens.semantic.color.text',
      required: false,
      description: 'Text color using semantic text color tokens'
    },
    
    // Overflow
    {
      name: 'overflow',
      type: "'visible' | 'hidden' | 'scroll' | 'auto'",
      required: false,
      description: 'CSS overflow property'
    },
    {
      name: 'overflowX',
      type: "'visible' | 'hidden' | 'scroll' | 'auto'",
      required: false,
      description: 'CSS overflow-x property'
    },
    {
      name: 'overflowY',
      type: "'visible' | 'hidden' | 'scroll' | 'auto'",
      required: false,
      description: 'CSS overflow-y property'
    },
    
    // Polymorphic & Standard
    {
      name: 'as',
      type: 'React.ElementType',
      required: false,
      description: 'HTML element to render as (polymorphic component)'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content to render inside the box'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      required: false,
      description: 'Inline CSS styles object'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    }
  ],

  tokens: [
    'semantic.spacing.layout.*',
    'semantic.color.background.*',
    'semantic.color.text.*',
    'semantic.color.border.*',
    'base.border.radius.*'
  ],

  examples: [
    {
      name: 'Flexbox Layout',
      description: 'Using Box for flexible layouts with gap and alignment',
      code: `<Box display="flex" flexDirection="column" gap="md" p="lg" bg="subtle">
  <Typography variant="h3">Flex Column Layout</Typography>
  <Box display="flex" justifyContent="space-between" alignItems="center" p="sm" bg="default" borderRadius="2">
    <Typography>Left content</Typography>
    <Typography>Right content</Typography>
  </Box>
  <Box display="flex" gap="sm">
    <Box p="sm" bg="emphasis" color="inverse" borderRadius="1" flex="1">Box 1</Box>
    <Box p="sm" bg="emphasis" color="inverse" borderRadius="1" flex="1">Box 2</Box>
  </Box>
</Box>`,
      renderComponent: () => (
        <Box display="flex" flexDirection="column" gap="md" p="lg" bg="surface" border="subtle" borderRadius="2">
          <Typography variant="h3">Flex Column Layout</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" bg="surface" border="strong" p="md" borderRadius="2">
            <Typography>Left content</Typography>
            <Typography>Right content</Typography>
          </Box>
          <Box display="flex" gap="sm" bg="surface" border="strong" p="md" borderRadius="2">
            <Box p="sm" bg="default" border="strong" borderRadius="2" style={{flex: 1}}><Typography>Box 1</Typography></Box>
            <Box p="sm" bg="default" border="strong" borderRadius="2" style={{flex: 1}}><Typography>Box 2</Typography></Box>
          </Box>
        </Box>
      )
    },
    {
      name: 'Spacing System',
      description: 'Demonstrating margin and padding using design tokens',
      code: `<Box>
  <Box mb="lg" p="md" bg="subtle" borderRadius="2">
    <Typography>Medium padding, large bottom margin</Typography>
  </Box>
  <Box mx="auto" px="xl" py="sm" bg="default" borderRadius="3" maxWidth="400px">
    <Typography>Centered with horizontal auto margin, custom padding</Typography>
  </Box>
</Box>`,
      renderComponent: () => (
        <Box>
          <Box mb="lg" p="md" bg="subtle" borderRadius="2" border="strong">
            <Typography>Medium padding, large bottom margin</Typography>
          </Box>
          <Box mx="auto" px="xl" py="sm" bg="default" borderRadius="3" border="strong" maxWidth="400px">
            <Typography>Centered with horizontal auto margin, custom padding</Typography>
          </Box>
        </Box>
      )
    },
    {
      name: 'Borders and Colors',
      description: 'Using border and background color tokens',
      code: `<Stack direction="row" gap="md">
  <Box p="md" border="default" borderRadius="2" bg="default">
    <Typography>Default border</Typography>
  </Box>
  <Box p="md" border="strong" borderRadius="3" bg="subtle">
    <Typography>Strong border</Typography>
  </Box>
  <Box p="md" borderTop="strong" borderRadius="1" bg="emphasis" color="inverse">
    <Typography>Top border only</Typography>
  </Box>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Box p="md" border="default" borderRadius="2" bg="default">
            <Typography>Default border</Typography>
          </Box>
          <Box p="md" border="strong" borderRadius="3" bg="subtle">
            <Typography>Strong border</Typography>
          </Box>
          <Box p="md" borderTop="strong" borderRadius="1" bg="default">
            <Typography>Top border only</Typography>
          </Box>
          <Box p="md" borderRadius="2" bg="interactive">
            <Typography color="inverse">Info background</Typography>
          </Box>
          <Box p="md" borderRadius="2" bg="interactive-subtle">
            <Typography>Info surface background</Typography>
          </Box>
          <Box p="md" borderRadius="2" bg="inverse">
            <Typography color="inverse">Inverse background</Typography>
          </Box>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Semantic HTML element based on "as" prop (default div)',
      'Does not interfere with content accessibility',
      'Color combinations maintain sufficient contrast when using semantic tokens',
      'Focus behavior inherited from child content',
      'Supports polymorphic rendering for semantic elements',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Layout component that enhances rather than hinders accessibility',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Inherited from child components',
    screenReader: 'Transparent to screen readers unless semantic element used',
    focusManagement: 'Does not trap or manage focus'
  },

  notes: [
    'Primary utility component for layout and styling primitives',
    'All spacing props use design tokens for system consistency',
    'Flexbox props work together for complete layout control',
    'Color and border props integrate with semantic token system',
    'Use "as" prop for semantic HTML elements when appropriate',
    'Combine with other layout components for complex designs',
    'Prefer higher-level components (Stack, Container) when possible'
  ]
}
