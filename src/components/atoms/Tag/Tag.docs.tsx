import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Tag } from './Tag'
import { Stack } from '../Stack/Stack'

export const tagDocs: ComponentDocumentation = {
  id: 'tag',
  name: 'Tag',
  description: 'A static, non-interactive label used to categorize elements or objects in the UI. Tags help users quickly identify and understand content classification.',
  category: 'Atoms',
  
  props: [
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      default: undefined,
      description: 'Text content or elements to display within the tag'
    },
    {
      name: 'variant',
      type: "'default' | 'interactive' | 'success' | 'warning' | 'error' | 'emphasis'",
      required: false,
      default: "'default'",
      description: 'Visual variant based on semantic meaning - determines background and text colors'
    },
    {
      name: 'border',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to display a border around the tag'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing'
    }
  ],
  
  tokens: [
    // Colors
    'semantic.color.background.surface',
    'semantic.color.background.interactive-subtle',
    'semantic.color.background.success-subtle',
    'semantic.color.background.warning-subtle',
    'semantic.color.background.error-subtle',
    'semantic.color.background.emphasis',
    'semantic.color.text.default',
    'semantic.color.text.interactive',
    'semantic.color.text.success',
    'semantic.color.text.warning',
    'semantic.color.text.error',
    'semantic.color.text.inverse',
    'semantic.color.border.default',
    'semantic.color.border.interactive',
    'semantic.color.border.success',
    'semantic.color.border.warning',
    'semantic.color.border.error',
    
    // Typography
    'base.fontSize.1',
    'base.fontSize.2',
    'base.fontSize.3',
    'base.fontWeight.3',
    
    // Spacing
    'base.spacing.1',
    'base.spacing.2',
    'base.spacing.3',
    'base.spacing.4',
    
    // Border
    'base.border.radius.2'
  ],
  
  examples: [
    {
      name: 'Basic Usage',
      description: 'Default tag for general categorization',
      code: `<Tag>Category</Tag>`,
      renderComponent: () => (
        <Tag>Category</Tag>
      )
    },
    {
      name: 'Semantic Variants',
      description: 'Different tag variants for semantic meanings - interactive, success, warning, error, and emphasis states',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag variant="default">Default</Tag>
  <Tag variant="interactive">Interactive</Tag>
  <Tag variant="success">Success</Tag>
  <Tag variant="warning">Warning</Tag>
  <Tag variant="error">Error</Tag>
  <Tag variant="emphasis">Emphasis</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag variant="default">Default</Tag>
          <Tag variant="interactive">Interactive</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag variant="emphasis">Emphasis</Tag>
        </Stack>
      )
    },
    {
      name: 'Border Options',
      description: 'Tags with and without borders',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag variant="interactive" border={true}>With Border</Tag>
  <Tag variant="interactive" border={false}>Without Border</Tag>
  <Tag variant="success" border={true}>With Border</Tag>
  <Tag variant="success" border={false}>Without Border</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag variant="interactive" border={true}>With Border</Tag>
          <Tag variant="interactive" border={false}>Without Border</Tag>
          <Tag variant="success" border={true}>With Border</Tag>
          <Tag variant="success" border={false}>Without Border</Tag>
        </Stack>
      )
    },
    {
      name: 'Status Tags',
      description: 'Using tags to indicate status or state of items',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag variant="success">Published</Tag>
  <Tag variant="warning">Draft</Tag>
  <Tag variant="error">Archived</Tag>
  <Tag variant="interactive">In Review</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag variant="success">Published</Tag>
          <Tag variant="warning">Draft</Tag>
          <Tag variant="error">Archived</Tag>
          <Tag variant="interactive">In Review</Tag>
        </Stack>
      )
    },
    {
      name: 'Category Tags',
      description: 'Using tags to categorize content',
      code: `<Stack direction="row" gap="sm" alignItems="center">
  <Tag>Design</Tag>
  <Tag>Development</Tag>
  <Tag>Documentation</Tag>
  <Tag>Testing</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm" alignItems="center">
          <Tag>Design</Tag>
          <Tag>Development</Tag>
          <Tag>Documentation</Tag>
          <Tag>Testing</Tag>
        </Stack>
      )
    },
    {
      name: 'All Variant Examples',
      description: 'Comprehensive view of all variants',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag variant="default">Default</Tag>
  <Tag variant="interactive">Interactive</Tag>
  <Tag variant="success">Success</Tag>
  <Tag variant="warning">Warning</Tag>
  <Tag variant="error">Error</Tag>
  <Tag variant="emphasis">Emphasis</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag variant="default">Default</Tag>
          <Tag variant="interactive">Interactive</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag variant="emphasis">Emphasis</Tag>
        </Stack>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses semantic HTML span element with role="status" for screen reader announcements',
      'Provides aria-label for string content to enhance screen reader context',
      'Maintains sufficient color contrast ratios (WCAG 2.2 AA) across all variants',
      'Non-interactive element - does not receive keyboard focus',
      'Visual semantics are conveyed through both color and text content',
      'Color is not the only means of conveying information (text labels required)'
    ],
    keyboardNavigation: 'Tags are static labels and do not support keyboard interaction. For interactive tagging, consider using Chip components with onClick handlers.',
    screenReader: 'Announces as status region. For string children, announces "Tag: [content]" to provide context. Complex children are announced as-is without additional context.'
  },
  
  anatomy: {
    description: 'A simple inline container with text content, styled with background color, border, and padding based on variant and size',
    diagram: `
┌───────────────────────┐
│   Tag Container       │
│   ┌───────────────┐   │
│   │  Text Label   │   │
│   └───────────────┘   │
└───────────────────────┘
    `,
    parts: [
      {
        name: 'Tag Container',
        description: 'Root span element with inline-flex display, rounded corners, and semantic color styling based on variant',
        tokens: [
          'base.border.radius.2',
          'semantic.color.background.[variant]-subtle',
          'semantic.color.border.[variant]'
        ]
      },
      {
        name: 'Text Label',
        description: 'Text content with appropriate sizing and color contrast',
        tokens: [
          'base.fontSize.[1|2|3]',
          'base.fontWeight.3',
          'semantic.color.text.[variant]'
        ]
      }
    ]
  }
}
