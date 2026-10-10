import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Tag } from './Tag'
import { Stack } from '../Stack/Stack'
import { Typography } from '../Typography'
import { StatusLabel } from '../StatusLabel'
import { labelGuideNotes } from '../../../lib/docgen/labelGuide'

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
      type: "'default' | 'emphasis' | 'success' | 'warning' | 'error' | 'interactive' (last four deprecated)",
      required: false,
      default: "'default'",
      description: 'Tag is neutral metadata: default, or emphasis (near-black) to stand out. success, warning and error are deprecated, because status belongs to StatusLabel; interactive is deprecated, because a blue fill on a static label is decoration. They are removed in 3.0 (decision 0029).'
    },
    {
      name: 'border',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to display a border around the tag'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: "'medium'",
      description: 'Height on the decision 0018 label scale: small (20px) for dense layouts such as table rows and toolbars, medium (24px) for standard use. Both sizes use the same type; small drops the vertical padding. The height includes padding and border.'
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
    'semantic.border.width.thin',
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
    'component.badge.label.typography.small',
    'component.badge.label.fontWeight',
    
    // Spacing
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    
    // Border
    'semantic.border.radius.sm',
    
    // Height (decision 0018 size scale)
    'semantic.size.label.small',
    'semantic.size.label.medium'
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
      name: 'Variants',
      description: 'Default and emphasis. For status (success, warning, error), use StatusLabel: the matching Tag variants are deprecated.',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag variant="default">Default</Tag>
  <Tag variant="emphasis">Emphasis</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag variant="default">Default</Tag>
          <Tag variant="emphasis">Emphasis</Tag>
        </Stack>
      )
    },
    {
      name: 'Border Options',
      description: 'Tags with and without borders',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag border={true}>With Border</Tag>
  <Tag border={false}>Without Border</Tag>
  <Tag variant="emphasis" border={true}>With Border</Tag>
  <Tag variant="emphasis" border={false}>Without Border</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag border={true}>With Border</Tag>
          <Tag border={false}>Without Border</Tag>
          <Tag variant="emphasis" border={true}>With Border</Tag>
          <Tag variant="emphasis" border={false}>Without Border</Tag>
        </Stack>
      )
    },
    {
      name: 'Sizes',
      description: 'Small (20px) and medium (24px, the default), with and without a border. The height is the same either way.',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Tag size="small">Small</Tag>
  <Tag size="small" border={false}>Small</Tag>
  <Tag>Medium</Tag>
  <Tag border={false}>Medium</Tag>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Tag size="small">Small</Tag>
          <Tag size="small" border={false}>Small</Tag>
          <Tag>Medium</Tag>
          <Tag border={false}>Medium</Tag>
        </Stack>
      )
    },
    {
      name: 'Dense Layout',
      description: 'Small tags keep compact rows, such as a list of records with several category labels each, at a consistent height. Status goes in a StatusLabel, which shares the 20px small size, not a Tag.',
      code: `<Stack direction="column" gap="sm">
  <Stack direction="row" gap="xs" alignItems="center">
    <Typography variant="small">Invoice #1042</Typography>
    <StatusLabel size="small" status="completed" label="Paid" liveRegion={false} />
    <Tag size="small">Q3</Tag>
    <Tag size="small">Consulting</Tag>
  </Stack>
  <Stack direction="row" gap="xs" alignItems="center">
    <Typography variant="small">Invoice #1043</Typography>
    <StatusLabel size="small" status="failed" label="Overdue" liveRegion={false} />
    <Tag size="small">Q3</Tag>
    <Tag size="small">Design</Tag>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Stack direction="row" gap="xs" alignItems="center">
            <Typography variant="small">Invoice #1042</Typography>
            <StatusLabel size="small" status="completed" label="Paid" liveRegion={false} />
            <Tag size="small">Q3</Tag>
            <Tag size="small">Consulting</Tag>
          </Stack>
          <Stack direction="row" gap="xs" alignItems="center">
            <Typography variant="small">Invoice #1043</Typography>
            <StatusLabel size="small" status="failed" label="Overdue" liveRegion={false} />
            <Tag size="small">Q3</Tag>
            <Tag size="small">Design</Tag>
          </Stack>
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
          'semantic.border.radius.sm',
          'semantic.size.label.small',
          'semantic.size.label.medium',
          'semantic.color.background.surface',
          'semantic.color.background.interactive-subtle',
          'semantic.color.background.success-subtle',
          'semantic.color.background.warning-subtle',
          'semantic.color.background.error-subtle',
          'semantic.color.background.emphasis',
          'semantic.color.border.default',
          'semantic.color.border.interactive',
          'semantic.color.border.success',
          'semantic.color.border.warning',
          'semantic.color.border.error'
        ]
      },
      {
        name: 'Text Label',
        description: 'Text content with appropriate sizing and color contrast',
        tokens: [
          'component.badge.label.typography.small',
          'component.badge.label.fontWeight',
          'semantic.color.text.default',
          'semantic.color.text.interactive',
          'semantic.color.text.success',
          'semantic.color.text.warning',
          'semantic.color.text.error',
          'semantic.color.text.inverse'
        ]
      }
    ]
  },

  notes: [...labelGuideNotes]
}
