import { ComponentDocumentation } from '../../../lib/docgen/types'
import { ChipGroup } from './ChipGroup'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

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
      description: 'Array of text labels to display as individual chips. Each string becomes a separate chip with automatic spacing and wrapping'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing the entire chip group container'
    }
  ],

  tokens: [
    'semantic.space.200', // Gap between chips (Stack gap="sm")
    'component.chip.default.borderRadius',
    'component.chip.default.backgroundColor',
    'component.chip.default.textColor',
  ],

  examples: [
    {
      name: 'Skills & Technologies',
      description: 'Common use case showing technology tags with default styling',
      code: `<ChipGroup 
  labels={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL']}
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL']}
        />
      )
    },
    {
      name: 'Responsive Wrapping',
      description: 'Demonstrates automatic wrapping behavior with mixed label lengths',
      code: `<ChipGroup 
  labels={[
    'Short',
    'Medium Length Category',
    'Very Long Descriptive Label Name',
    'Tag',
    'Another Extended Label Description',
    'Brief',
    'Comprehensive Category Title'
  ]}
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '400px' }}>
          <ChipGroup 
            labels={[
              'Short',
              'Medium Length Category',
              'Very Long Descriptive Label Name',
              'Tag',
              'Another Extended Label Description',
              'Brief',
              'Comprehensive Category Title'
            ]}
          />
        </div>
      )
    },
    {
      name: 'Content Categories',
      description: 'Real-world examples showing different content categorization patterns',
      code: `<Stack direction="column" gap="xl">
  {/* Blog post tags */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">BLOG POST TAGS</Typography>
    <ChipGroup 
      labels={['Design System', 'Accessibility', 'React', 'Best Practices']}
    />
  </Stack>

  {/* Product categories */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">PRODUCT CATEGORIES</Typography>
    <ChipGroup 
      labels={['Electronics', 'Smartphones', 'Apple', 'iOS', '5G']}
    />
  </Stack>

  {/* User interests */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">USER INTERESTS</Typography>
    <ChipGroup 
      labels={['Photography', 'Travel', 'Technology', 'Food & Dining', 'Sports']}
    />
  </Stack>
</Stack>`,
      renderComponent: () => (
          <Stack direction="column" gap="xl">
            {/* Blog post tags */}
            <Stack direction="column" gap="sm">
              <Typography variant="label" color="subdued">BLOG POST TAGS</Typography>
              <ChipGroup 
                labels={['Design System', 'Accessibility', 'React', 'Best Practices']}
              />
            </Stack>

            {/* Product categories */}
            <Stack direction="column" gap="sm">
              <Typography variant="label" color="subdued">PRODUCT CATEGORIES</Typography>
              <ChipGroup 
                labels={['Electronics', 'Smartphones', 'Apple', 'iOS', '5G']}
              />
            </Stack>

            {/* User interests */}
            <Stack direction="column" gap="sm">
              <Typography variant="label" color="subdued">USER INTERESTS</Typography>
              <ChipGroup 
                labels={['Photography', 'Travel', 'Technology', 'Food & Dining', 'Sports']}
              />
            </Stack>
          </Stack>
        )
    },
    {
      name: 'Large Tag Collections',
      description: 'Handling many tags with proper wrapping and spacing',
      code: `<ChipGroup 
  labels={[
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL',
    'REST API', 'Docker', 'Kubernetes', 'AWS', 'Git',
    'Testing', 'Jest', 'Cypress', 'Accessibility', 'Performance'
  ]}
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '500px' }}>
          <ChipGroup 
            labels={[
              'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 
              'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL',
              'REST API', 'Docker', 'Kubernetes', 'AWS', 'Git',
              'Testing', 'Jest', 'Cypress', 'Accessibility', 'Performance'
            ]}
          />
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Container Role: Uses flexbox container with proper spacing that maintains readability and visual hierarchy',
      'Individual Chip Accessibility: Each chip inherits full accessibility support from the Chip component including proper color contrast',
      'Reading Order: Screen readers announce chips in source order, providing logical progression through related content',
      'Flexible Layout: Responsive wrapping ensures content remains accessible across different viewport sizes and zoom levels',
      'Visual Grouping: Consistent spacing and visual treatment helps users understand chips are related concepts',
      'No Focus Trapping: ChipGroup does not interfere with natural tab navigation flow between individual chips',
      'Semantic Meaning: Groups related concepts (tags, categories, skills) for better cognitive understanding',
      'High Contrast Support: Visual grouping and spacing work effectively in high contrast and dark modes',
      'Text Scaling: Layout adapts gracefully to browser text scaling up to 200% without horizontal scrolling',
      'Motion Sensitivity: No animations respect user motion preferences - purely layout-based component'
    ],
    keyboardNavigation: 'Tab: Navigate between individual chips in source order | The chips are static labels and are not focusable',
    screenReader: 'Container announced as group of related items. Individual chips announced with their content and any interactive states. Reading flows naturally through each chip.',
    focusManagement: 'No focus management at group level - individual chips receive focus naturally. Focus indicators provided by child Chip components.',
    colorContrast: 'Color contrast handled by the Chip component, whose text meets WCAG AA (4.5:1).'
  },

  notes: [
    'Layout Behavior: Uses Stack component with row direction and small gap for consistent, responsive wrapping behavior',
    'Content Grouping: Best for displaying related concepts like tags, categories, skills, technologies, or filter options',
    'One look: every chip in a group is the default Chip. The variant prop was removed in 3.0 (decision 0016).',
    'Responsive Design: Automatically wraps to new lines based on container width and content length',
    'Performance: Efficient rendering with minimal DOM overhead - each label becomes a single Chip component',
    'Content Length: Handles mixed content lengths gracefully - short tags and longer descriptive labels work together',
    'Use Case Guidelines: Ideal for 3-20 items; consider alternative patterns for fewer items or very large collections',
    'Interaction Patterns: For selectable chips, consider implementing custom selection state management with onChange handlers',
    'Spacing System: Uses semantic spacing tokens via Stack component ensuring consistency with design system',
    'Empty State: Component handles empty labels array gracefully without rendering errors',
    'Accessibility First: Built on accessible Stack and Chip components, inheriting their WCAG 2.2 AA compliance',
    'Theme Integration: Works seamlessly with light/dark themes through semantic design token integration'
  ]
}
