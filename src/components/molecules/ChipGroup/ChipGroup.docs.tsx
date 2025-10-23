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
      name: 'variant',
      type: "'default' | 'dark'",
      required: false,
      default: 'default',
      description: 'Visual variant applied uniformly to all chips in the group. Use "dark" for emphasis or on light backgrounds'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing the entire chip group container'
    }
  ],

  tokens: [
    'semantic.spacing.stack.sm',
    'component.chip.default.*',
    'component.chip.dark.*'
  ],

  examples: [
    {
      name: 'Skills & Technologies',
      description: 'Common use case showing technology tags with default styling',
      code: `<ChipGroup 
  labels={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL']}
  variant="default"
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL']}
          variant="default"
        />
      )
    },
    {
      name: 'Dark Theme Variant',
      description: 'Dark variant for emphasis or use on light backgrounds',
      code: `<ChipGroup 
  labels={['Frontend', 'Backend', 'DevOps', 'Mobile', 'Design']}
  variant="dark"
/>`,
      renderComponent: () => (
        <ChipGroup 
          labels={['Frontend', 'Backend', 'DevOps', 'Mobile', 'Design']}
          variant="dark"
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
  variant="default"
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
            variant="default"
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
      variant="default"
    />
  </Stack>

  {/* Product categories */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">PRODUCT CATEGORIES</Typography>
    <ChipGroup 
      labels={['Electronics', 'Smartphones', 'Apple', 'iOS', '5G']}
      variant="dark"
    />
  </Stack>

  {/* User interests */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">USER INTERESTS</Typography>
    <ChipGroup 
      labels={['Photography', 'Travel', 'Technology', 'Food & Dining', 'Sports']}
      variant="default"
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
                variant="default"
              />
            </Stack>

            {/* Product categories */}
            <Stack direction="column" gap="sm">
              <Typography variant="label" color="subdued">PRODUCT CATEGORIES</Typography>
              <ChipGroup 
                labels={['Electronics', 'Smartphones', 'Apple', 'iOS', '5G']}
                variant="dark"
              />
            </Stack>

            {/* User interests */}
            <Stack direction="column" gap="sm">
              <Typography variant="label" color="subdued">USER INTERESTS</Typography>
              <ChipGroup 
                labels={['Photography', 'Travel', 'Technology', 'Food & Dining', 'Sports']}
                variant="default"
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
  variant="default"
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
            variant="default"
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
    keyboardNavigation: 'Tab: Navigate between individual chips in source order | Individual chips handle their own keyboard interactions based on variant and interactivity',
    screenReader: 'Container announced as group of related items. Individual chips announced with their content and any interactive states. Reading flows naturally through each chip.',
    focusManagement: 'No focus management at group level - individual chips receive focus naturally. Focus indicators provided by child Chip components.',
    colorContrast: 'Color contrast handled by individual Chip components. All variants meet WCAG AA requirements when used properly.'
  },

  notes: [
    'Layout Behavior: Uses Stack component with row direction and small gap for consistent, responsive wrapping behavior',
    'Content Grouping: Best for displaying related concepts like tags, categories, skills, technologies, or filter options',
    'Variant Consistency: All chips in a group use the same variant to maintain visual cohesion and hierarchy',
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
