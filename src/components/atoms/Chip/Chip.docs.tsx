import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Chip } from './Chip'
import { Stack } from '../Stack'

export const chipDocs: ComponentDocumentation = {
  id: 'chip',
  name: 'Chip',
  description: 'Compact element displaying information, tags, or actions. Supports multiple visual variants and interactive states. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ChipProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      description: 'Content to display inside the chip'
    },
    {
      name: 'variant',
      type: "'default' | 'emphasis' | 'subtle' | 'interactive' | 'light' | 'dark'",
      required: false,
      default: 'default',
      description: 'Visual style variant of the chip'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: 'medium',
      description: 'Size variant affecting padding and font size'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler for interactive chips'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Disable interaction and apply disabled styling'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label when content is not descriptive enough'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description: 'ID of element that describes the chip'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      description: 'ARIA role for semantic meaning'
    }
  ],

  tokens: [
    'component.chip.default.*',
    'component.chip.emphasis.*',
    'component.chip.subtle.*',
    'component.chip.interactive.*',
    'component.chip.light.*',
    'component.chip.dark.*',
    'semantic.size.chip.small',
    'semantic.size.chip.medium',
    'semantic.size.chip.large'
  ],

  examples: [
    {
      name: 'Chip Variants',
      description: 'Different visual styles for various contexts',
      code: `<Stack direction="row" gap="sm" wrap>
  <Chip variant="default">Default</Chip>
  <Chip variant="emphasis">Emphasis</Chip>
  <Chip variant="subtle">Subtle</Chip>
  <Chip variant="interactive" onClick={() => console.log('clicked')}>Interactive</Chip>
  <Chip variant="light">Light</Chip>
  <Chip variant="dark">Dark</Chip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm" wrap>
          <Chip variant="default">Default</Chip>
          <Chip variant="emphasis">Emphasis</Chip>
          <Chip variant="subtle">Subtle</Chip>
          <Chip variant="interactive" onClick={() => console.log('clicked')}>Interactive</Chip>
          <Chip variant="light">Light</Chip>
          <Chip variant="dark">Dark</Chip>
        </Stack>
      )
    },
    {
      name: 'Chip Sizes',
      description: 'Different sizes for hierarchy and context',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Chip size="small">Small</Chip>
  <Chip size="medium">Medium</Chip>
  <Chip size="large">Large</Chip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Chip size="small">Small</Chip>
          <Chip size="medium">Medium</Chip>
          <Chip size="large">Large</Chip>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Interactive chips announce as buttons',
      'Non-interactive chips are announced as text',
      'Support for aria-label when content needs clarification',
      'Keyboard navigation for interactive variants',
      'Proper focus indicators',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'All variants meet contrast requirements for enhanced usability',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Tab to focus interactive chips, Enter/Space to activate',
    screenReader: 'Announced based on content and role',
    focusManagement: 'Interactive chips receive focus outline'
  },

  notes: [
    'Use for tags, categories, filters, or status indicators',
    'Interactive variant for clickable actions',
    'Choose variant based on visual hierarchy needs',
    'Consider using in groups with consistent spacing',
    'Combine with ChipGroup component for related chips'
  ]
}
