import { ComponentDocumentation } from '../../../lib/docgen/types'
import { SectionSeparator } from './SectionSeparator'
import { Stack } from '../Stack'
import { Typography } from '../Typography'
import { Box } from '../Box'

export const sectionSeparatorDocs: ComponentDocumentation = {
  id: 'sectionseparator',
  name: 'SectionSeparator',
  description: 'Semantic content separator using HR elements with customizable visual styling. Provides clear visual breaks between content sections while maintaining screen reader compatibility. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from SectionSeparatorProps interface
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
      description: 'Size variation affecting vertical spacing around separator'
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
      name: 'Separator Variants',
      description: 'Different visual weights for various contexts',
      code: `<SectionSeparator variant="default" />
<SectionSeparator variant="strong" />
<SectionSeparator variant="minimal" />`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Stack direction="column" gap="none">
            <Typography>Default</Typography>
            <SectionSeparator variant="default" size="small" />
          </Stack>
          <Stack direction="column" gap="none">
            <Typography>Strong</Typography>
            <SectionSeparator variant="strong" size="small" />
          </Stack>
          <Stack direction="column" gap="none">
            <Typography>Minimal</Typography>
            <SectionSeparator variant="minimal" size="small" />
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Separator Sizes',
      description: 'Different spacing amounts for content hierarchy',
      code: `<SectionSeparator size="small" />
<SectionSeparator size="medium" />
<SectionSeparator size="large" />
<SectionSeparator size="xlarge" />`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <Stack direction="column" gap="md">
            <Typography>Small spacing</Typography>
            <Box bg="subtle">
              <SectionSeparator size="small" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Medium spacing</Typography>
            <Box bg="subtle">
              <SectionSeparator size="medium" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Large spacing</Typography>
            <Box bg="subtle">
              <SectionSeparator size="large" />
            </Box>
          </Stack>
          <Stack direction="column" gap="md">
            <Typography>Extra large spacing</Typography>
            <Box bg="subtle">
              <SectionSeparator size="xlarge" />
            </Box>
          </Stack>
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
    'Size affects vertical spacing, not line appearance',
    'Consistent with page rhythm and typography scale',
    'Works well between article sections or form groups'
  ]
}
