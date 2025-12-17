import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { EmptyState } from './EmptyState'
import { Stack } from '../../atoms/Stack'

export const emptyStateDocs: ComponentDocumentation = {
  id: 'empty-state',
  name: 'EmptyState',
  description: 'Engaging empty state component with illustration, clear message, and actionable CTAs. Provides friendly guidance when content is unavailable, searches return no results, or errors occur. Composes from Stack, Icon, Typography, and Button atoms.',
  category: 'Molecules',
  
  props: [
    {
      name: 'illustration',
      type: "'search' | 'transactions' | 'notifications' | 'empty' | 'error' | 'custom'",
      required: false,
      default: "'empty'",
      description: 'Predefined illustration type. Each type shows an appropriate icon for the context.'
    },
    {
      name: 'customIllustration',
      type: 'React.ReactNode',
      required: false,
      description: 'Custom illustration component or SVG to display instead of predefined icons'
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      description: 'Main heading text explaining the empty state'
    },
    {
      name: 'description',
      type: 'string',
      required: true,
      description: 'Descriptive text providing context and guidance for what to do next'
    },
    {
      name: 'action',
      type: '{ label: string; onClick: () => void; variant?: "primary" | "secondary"; icon?: IconName }',
      required: false,
      description: 'Primary call-to-action button with label, click handler, optional variant and icon'
    },
    {
      name: 'secondaryAction',
      type: '{ label: string; onClick: () => void }',
      required: false,
      description: 'Secondary action button (rendered as naked variant) with label and click handler'
    },
    {
      name: 'variant',
      type: "'default' | 'error' | 'success'",
      required: false,
      default: "'default'",
      description: 'Visual variant affecting illustration color: default (neutral), error (red), success (green)'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: "'medium'",
      description: 'Size variant affecting illustration size, heading size, and overall spacing'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing. Also prefixes action button test IDs.'
    }
  ],

  tokens: [
    'semantic.spacing.layout.4xl',
    'semantic.spacing.layout.6xl',
    'semantic.spacing.layout.8xl',
    'semantic.spacing.layout.2xl',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.sm',
    'semantic.color.icon.error',
    'semantic.color.icon.success',
    'semantic.color.icon.subdued',
    'semantic.typography.h2',
    'semantic.typography.h3',
    'semantic.typography.h4',
    'semantic.typography.body'
  ],

  examples: [
    {
      name: 'No Search Results',
      description: 'Empty state when search returns no matches.',
      code: `<EmptyState
  illustration="search"
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
  action={{
    label: 'Clear Filters',
    onClick: () => console.log('Clear filters')
  }}
  secondaryAction={{
    label: 'View All',
    onClick: () => console.log('View all')
  }}
/>`,
      renderComponent: () => (
        <EmptyState
          illustration="search"
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={{
            label: 'Clear Filters',
            onClick: () => console.log('Clear filters')
          }}
          secondaryAction={{
            label: 'View All',
            onClick: () => console.log('View all')
          }}
        />
      )
    },
    {
      name: 'First-Time User',
      description: 'Welcoming empty state for new users.',
      code: `<EmptyState
  illustration="transactions"
  title="No transactions yet"
  description="Start spending to see your transactions here. Your purchases will appear automatically."
  action={{
    label: 'Add a Transaction',
    onClick: () => console.log('Add transaction'),
    icon: 'add'
  }}
  size="large"
/>`,
      renderComponent: () => (
        <EmptyState
          illustration="transactions"
          title="No transactions yet"
          description="Start spending to see your transactions here. Your purchases will appear automatically."
          action={{
            label: 'Add a Transaction',
            onClick: () => console.log('Add transaction'),
            icon: 'add'
          }}
          size="large"
        />
      )
    },
    {
      name: 'Error State',
      description: 'Empty state indicating an error occurred.',
      code: `<EmptyState
  illustration="error"
  variant="error"
  title="Unable to load transactions"
  description="We're having trouble loading your data. Please try again."
  action={{
    label: 'Retry',
    onClick: () => console.log('Retry'),
    icon: 'refresh'
  }}
/>`,
      renderComponent: () => (
        <EmptyState
          illustration="error"
          variant="error"
          title="Unable to load transactions"
          description="We're having trouble loading your data. Please try again."
          action={{
            label: 'Retry',
            onClick: () => console.log('Retry'),
            icon: 'refresh'
          }}
        />
      )
    },
    {
      name: 'No Notifications',
      description: 'Empty state for notification center.',
      code: `<EmptyState
  illustration="notifications"
  title="All caught up!"
  description="You've reviewed all your notifications."
  size="small"
/>`,
      renderComponent: () => (
        <EmptyState
          illustration="notifications"
          title="All caught up!"
          description="You've reviewed all your notifications."
          size="small"
        />
      )
    },
    {
      name: 'Custom Illustration',
      description: 'Empty state with custom SVG illustration.',
      code: `<EmptyState
  customIllustration={
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.1" />
      <path d="M60 30 L60 70 M40 50 L80 50" stroke="currentColor" strokeWidth="4" />
    </svg>
  }
  title="Custom Empty State"
  description="This uses a custom illustration component."
  action={{
    label: 'Take Action',
    onClick: () => console.log('Action'),
    variant: 'secondary'
  }}
/>`,
      renderComponent: () => (
        <EmptyState
          customIllustration={
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="currentColor" opacity="0.1" />
              <path d="M60 30 L60 70 M40 50 L80 50" stroke="currentColor" strokeWidth="4" />
            </svg>
          }
          title="Custom Empty State"
          description="This uses a custom illustration component."
          action={{
            label: 'Take Action',
            onClick: () => console.log('Action'),
            variant: 'secondary'
          }}
        />
      )
    },
    {
      name: 'Size Comparison',
      description: 'Comparing small, medium, and large sizes.',
      code: `<Stack direction="column" gap="xl">
  <EmptyState
    illustration="empty"
    title="Small Size"
    description="Compact empty state for sidebars or cards."
    size="small"
  />
  <EmptyState
    illustration="empty"
    title="Medium Size"
    description="Default size for most use cases."
    size="medium"
  />
  <EmptyState
    illustration="empty"
    title="Large Size"
    description="Prominent empty state for full-page views."
    size="large"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          <div style={{ border: '1px dashed #ccc', padding: '16px' }}>
            <EmptyState
              illustration="empty"
              title="Small Size"
              description="Compact empty state for sidebars or cards."
              size="small"
            />
          </div>
          <div style={{ border: '1px dashed #ccc', padding: '16px' }}>
            <EmptyState
              illustration="empty"
              title="Medium Size"
              description="Default size for most use cases."
              size="medium"
            />
          </div>
          <div style={{ border: '1px dashed #ccc', padding: '16px' }}>
            <EmptyState
              illustration="empty"
              title="Large Size"
              description="Prominent empty state for full-page views."
              size="large"
            />
          </div>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic HTML with role="status" for screen reader announcements',
      'Illustration marked as decorative with aria-hidden="true"',
      'Clear aria-label on container describing the empty state',
      'Action buttons maintain full keyboard accessibility',
      'Proper heading hierarchy (h2, h3, or h4 based on size)',
      'Sufficient color contrast for all variants meeting WCAG 2.2 AA',
      'Focus management follows natural tab order (illustration → title → description → actions)'
    ],
    keyboardNavigation: 'Tab: Navigate to action buttons | Enter/Space: Activate buttons',
    screenReader: 'Announces as status region with title, reads description, and presents actionable buttons with clear labels',
    focusManagement: 'Action buttons receive focus in order. Secondary action uses naked variant with clear focus indicators.',
    colorContrast: 'All text and icon colors meet WCAG AA requirements. Error variant uses semantic error color with sufficient contrast.'
  },

  anatomy: {
    description: 'Centered column layout with illustration, text content, and optional action buttons',
    diagram: `
┌─────────────────────────────────────┐
│ StyledContainer                     │
│                                     │
│     ┌─────────────────────┐         │
│     │ StyledIllustration  │         │
│     │   [Icon/Custom SVG] │         │
│     └─────────────────────┘         │
│                                     │
│     ┌─────────────────────┐         │
│     │ StyledTextContainer │         │
│     │  Typography (Title) │         │
│     │  Typography (Desc)  │         │
│     └─────────────────────┘         │
│                                     │
│     ┌─────────────────────┐         │
│     │ Stack (Actions)     │         │
│     │  [Primary Button]   │         │
│     │  [Secondary Button] │         │
│     └─────────────────────┘         │
└─────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'StyledContainer',
        description: 'Outer container with centered column layout, responsive padding, and max-width constraint',
        tokens: [
          'semantic.spacing.layout.4xl',
          'semantic.spacing.layout.6xl',
          'semantic.spacing.layout.8xl'
        ]
      },
      {
        name: 'StyledIllustration',
        description: 'Illustration container with size-dependent dimensions and variant-based color',
        tokens: [
          'semantic.spacing.layout.2xl',
          'semantic.color.icon.error',
          'semantic.color.icon.success',
          'semantic.color.icon.subdued'
        ]
      },
      {
        name: 'StyledTextContainer',
        description: 'Text content wrapper with max-width for readability',
        tokens: ['semantic.spacing.layout.2xl', 'semantic.spacing.layout.md']
      },
      {
        name: 'Typography (Title)',
        description: 'Heading component with size-responsive variant (h2, h3, or h4)',
        tokens: ['semantic.typography.h2', 'semantic.typography.h3', 'semantic.typography.h4']
      },
      {
        name: 'Typography (Description)',
        description: 'Body text with subdued color for secondary information',
        tokens: ['semantic.typography.body']
      },
      {
        name: 'Stack (Actions)',
        description: 'Vertical stack containing primary and optional secondary action buttons',
        tokens: ['semantic.spacing.layout.sm']
      }
    ]
  },

  notes: [
    'Composes from existing DS primitives: Stack, Icon, Typography, Button',
    'Responsive sizing adjusts illustration, heading, and spacing proportionally',
    'Illustration types map to Icon component names (placeholder icons until custom icons added)',
    'Custom illustrations support SVG components or any React node',
    'Primary action defaults to primary button variant, fully customizable',
    'Secondary action always uses naked variant for visual hierarchy',
    'Center-aligned layout with max-width ensures readability',
    'Variant affects only illustration color, not layout or typography',
    'Works in any container width - responsive padding adapts',
    'data-testid propagates to action buttons with suffixes for targeted testing'
  ]
}
