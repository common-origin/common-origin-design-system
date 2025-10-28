import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Divider } from './Divider'
import { Stack } from '../Stack'
import { Typography } from '../Typography'
import { Box } from '../Box'

export const dividerDocs: ComponentDocumentation = {
  id: 'divider',
  name: 'Divider',
  description: 'Semantic content divider with customizable visual styling and orientation. Provides clear visual breaks between content sections both horizontally and vertically while maintaining screen reader compatibility. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from DividerProps interface
  props: [
    {
      name: 'variant',
      type: "'default' | 'strong' | 'minimal'",
      required: false,
      description: 'Visual style variant affecting line weight and visibility'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large' | 'xlarge'",
      required: false,
      description: 'Size variation affecting spacing around divider'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Orientation of the divider - horizontal for top/bottom spacing, vertical for left/right spacing'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    }
  ],

  tokens: [
    'semantic.color.border.default',
    'semantic.color.border.strong',
    'semantic.color.border.subtle',
    'semantic.spacing.section.small',
    'semantic.spacing.section.medium',
    'semantic.spacing.section.large',
    'semantic.spacing.section.xlarge'
  ],

  examples: [
    {
      name: 'Divider Variants',
      description: 'Different visual weights for various contexts',
      code: `<Divider variant="default" />
<Divider variant="strong" />
<Divider variant="minimal" />`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Stack direction="column" gap="none">
            <Typography>Default</Typography>
            <Divider variant="default" size="small" />
          </Stack>
          <Stack direction="column" gap="none">
            <Typography>Strong</Typography>
            <Divider variant="strong" size="small" />
          </Stack>
          <Stack direction="column" gap="none">
            <Typography>Minimal</Typography>
            <Divider variant="minimal" size="small" />
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Divider Sizes',
      description: 'Different spacing amounts for content hierarchy',
      code: `<Divider size="small" />
<Divider size="medium" />
<Divider size="large" />
<Divider size="xlarge" />`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Stack direction="column" gap="md">
            <Typography>Small spacing</Typography>
            <Box bg="subtle">
              <Divider size="small" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Medium spacing</Typography>
            <Box bg="subtle">
              <Divider size="medium" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Large spacing</Typography>
            <Box bg="subtle">
              <Divider size="large" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Extra large spacing</Typography>
            <Box bg="subtle">
              <Divider size="xlarge" />
            </Box>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Vertical Orientation',
      description: 'Vertical dividers for inline content separation',
      code: `<Stack direction="row" gap="md">
  <Typography>Left</Typography>
  <Divider orientation="vertical" size="small" />
  <Typography>Right</Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Typography>Section 1</Typography>
          <Divider orientation="vertical" size="small" />
          <Typography>Section 2</Typography>
          <Divider orientation="vertical" size="medium" />
          <Typography>Section 3</Typography>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses HR element for semantic meaning',
      'Screen readers understand as content separator',
      'Does not interfere with content flow',
      'Visual separation aids content comprehension',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Not interactive - no keyboard navigation',
    screenReader: 'Announced as separator or divider',
    focusManagement: 'Does not receive focus'
  },

  notes: [
    'Use to separate major content sections',
    'Choose variant based on visual hierarchy needs',
    'Horizontal orientation: size affects vertical spacing (top/bottom)',
    'Vertical orientation: size affects horizontal spacing (left/right)',
    'Vertical dividers require parent with flex or inline-block layout',
    'Works well between article sections, form groups, or inline elements'
  ]
}
