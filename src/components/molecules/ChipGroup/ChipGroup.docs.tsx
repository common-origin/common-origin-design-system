import { ComponentDocumentation } from '../../../lib/docgen/types'
import { ChipGroup } from './ChipGroup'

export const chipGroupDocs: ComponentDocumentation = {
  id: 'chipgroup',
  name: 'ChipGroup',
  description: 'Collection of related chips with consistent spacing and wrapping behavior. Perfect for displaying tags, categories, or filter options.',
  category: 'Molecules',
  
  // Props extracted with full type safety from ChipGroupProps interface
  props: [
    {
      name: 'labels',
      type: 'string[]',
      required: true,
      description: 'Array of text labels to display as chips'
    },
    {
      name: 'variant',
      type: "'default' | 'dark'",
      required: false,
      default: 'default',
      description: 'Visual variant applied to all chips in the group'
    }
  ],

  tokens: [
    'semantic.spacing.stack.sm',
    'component.chip.default.*',
    'component.chip.dark.*'
  ],

  examples: [
    {
      name: 'Basic Chip Group',
      description: 'Group of related chips with default styling',
      code: `<ChipGroup 
  labels={['React', 'TypeScript', 'Design Systems', 'Accessibility']}
  variant="default"
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={['React', 'TypeScript', 'Design Systems', 'Accessibility']}
          variant="default"
        />
      )
    },
    {
      name: 'Dark Variant',
      description: 'Chip group with dark variant for different contexts',
      code: `<ChipGroup 
  labels={['Frontend', 'Backend', 'DevOps', 'Mobile', 'Web']}
  variant="dark"
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={['Frontend', 'Backend', 'DevOps', 'Mobile', 'Web']}
          variant="dark"
        />
      )
    },
    {
      name: 'Long Label Group',
      description: 'Demonstrates wrapping behavior with longer labels',
      code: `<ChipGroup 
  labels={[
    'Long Category Name',
    'Another Extended Label',
    'Short',
    'Medium Length Tag',
    'Very Long Category Description'
  ]}
  variant="default"
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={[
            'Long Category Name',
            'Another Extended Label',
            'Short',
            'Medium Length Tag',
            'Very Long Category Description'
          ]}
          variant="default"
        />
      )
    }
  ],

  accessibility: {
    notes: [
      'Each chip maintains individual accessibility properties',
      'Natural tab order through the group',
      'Screen readers announce as list of items',
      'Consistent spacing aids visual scanning'
    ],
    keyboardNavigation: 'Tab to navigate between interactive chips',
    screenReader: 'Announced as group of related items',
    focusManagement: 'Individual chip focus management'
  },

  notes: [
    'Automatically wraps chips to new lines as needed',
    'Maintains consistent spacing between chips',
    'Use for related concepts like tags or categories',
    'Consider interaction patterns if chips need to be selectable',
    'Variant affects all chips in the group uniformly'
  ]
}
