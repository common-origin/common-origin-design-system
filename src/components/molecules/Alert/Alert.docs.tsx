import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Alert } from './Alert'
import { Button } from '../../atoms/Button'
import { Stack } from '../../atoms/Stack'

export const alertDocs: ComponentDocumentation = {
  id: 'alert',
  name: 'Alert',
  description:
    'A flexible alert component for displaying important messages, warnings, errors, and informational content to users. Used for system feedback, validation messages, and contextual help.',
  category: 'Molecules',

  props: [
    {
      name: 'variant',
      type: "'error' | 'warning' | 'info' | 'success'",
      required: false,
      default: "'info'",
      description:
        'Visual style variant affecting background, border, and icon. Error (crossCircle icon) for critical issues, warning (bell icon) for cautions, info (info icon) for tips, success (checkRing icon) for confirmations. Each variant has a fixed icon that always displays.'
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: true,
      default: undefined,
      description: 'Alert message content. Can be text, elements, or complex components.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Optional title/heading displayed above the message for better structure and scannability.'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show close/dismiss button. When clicked, removes alert from DOM and calls onDismiss callback.'
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      default: undefined,
      description: 'Callback function invoked when alert is dismissed via close button.'
    },
    {
      name: 'action',
      type: 'ReactNode',
      required: false,
      default: undefined,
      description: 'Optional action button or component displayed on the right side for user interaction (e.g., "Undo", "Retry").'
    },
    {
      name: 'inline',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Compact inline variant with reduced padding, suitable for inline contexts or constrained spaces.'
    },
    {
      name: 'ariaLive',
      type: "'polite' | 'assertive' | 'off'",
      required: false,
      default: "'polite'",
      description:
        'ARIA live region behavior for screen readers. polite for non-urgent announcements, assertive for important time-sensitive information, off to not announce.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing. Dismiss button receives "{data-testid}-dismiss".'
    }
  ],

  tokens: [
    // Colors - Background
    'semantic.color.background.error-subtle',
    'semantic.color.background.warning-subtle',
    'semantic.color.background.success-subtle',
    'semantic.color.background.interactive-subtle',
    
    // Colors - Border
    'semantic.color.border.error',
    'semantic.color.border.warning',
    'semantic.color.border.success',
    'semantic.color.border.interactive',
    
    // Colors - Text
    'semantic.color.text.error',
    'semantic.color.text.warning',
    'semantic.color.text.success',
    'semantic.color.text.interactive',
    
    // Colors - Icon
    'semantic.color.icon.error',
    'semantic.color.icon.warning',
    'semantic.color.icon.success',
    'semantic.color.icon.interactive',

    // Spacing
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',

    // Border
    'base.border.radius.2',

    // Typography
    'semantic.typography.h6',
    'semantic.typography.body',

    // Breakpoint
    'base.breakpoint.md'
  ],

  examples: [
    {
      name: 'Basic Variants',
      description: 'All four semantic variants with their default styling and colors',
      code: `<Stack direction="column" gap="md">
  <Alert variant="error">
    Failed to save meal plan. Please try again.
  </Alert>
  <Alert variant="warning">
    Budget exceeded by $12.50 - consider adjusting your selections.
  </Alert>
  <Alert variant="info">
    Bulk cooking saves time - plan 2 meals from 1 recipe.
  </Alert>
  <Alert variant="success">
    Shopping list generated with 24 ingredients!
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="error">
            Failed to save meal plan. Please try again.
          </Alert>
          <Alert variant="warning">
            Budget exceeded by $12.50 - consider adjusting your selections.
          </Alert>
          <Alert variant="info">
            Bulk cooking saves time - plan 2 meals from 1 recipe.
          </Alert>
          <Alert variant="success">
            Shopping list generated with 24 ingredients!
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Variant-Specific Icons',
      description: 'Each alert variant displays a unique icon: error (crossCircle), warning (bell), info (info), success (checkRing)',
      code: `<Stack direction="column" gap="md">
  <Alert variant="error">
    Form validation failed: Email address is required.
  </Alert>
  <Alert variant="warning">
    Chicken used in 3 recipes this week - consider variety.
  </Alert>
  <Alert variant="info">
    Tip: Pre-chopped vegetables save prep time.
  </Alert>
  <Alert variant="success">
    Changes saved successfully to your meal plan.
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="error">
            Form validation failed: Email address is required.
          </Alert>
          <Alert variant="warning">
            Chicken used in 3 recipes this week - consider variety.
          </Alert>
          <Alert variant="info">
            Tip: Pre-chopped vegetables save prep time.
          </Alert>
          <Alert variant="success">
            Changes saved successfully to your meal plan.
          </Alert>
        </Stack>
      )
    },
    {
      name: 'With Title',
      description: 'Alerts with titles for better content hierarchy and scannability',
      code: `<Stack direction="column" gap="md">
  <Alert variant="error" title="Authentication Error">
    Your session has expired. Please log in again to continue.
  </Alert>
  <Alert variant="warning" title="Recipe Conflict Detected">
    Similar ingredients found in multiple recipes. Consider consolidating your shopping list.
  </Alert>
  <Alert variant="info" title="New Feature Available">
    We've added meal prep time estimates to help you plan better!
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="error" title="Authentication Error">
            Your session has expired. Please log in again to continue.
          </Alert>
          <Alert variant="warning" title="Recipe Conflict Detected">
            Similar ingredients found in multiple recipes. Consider consolidating your shopping list.
          </Alert>
          <Alert variant="info" title="New Feature Available">
            We've added meal prep time estimates to help you plan better!
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Dismissible Alerts',
      description: 'Alerts with close buttons for user-dismissable messages',
      code: `<Stack direction="column" gap="md">
  <Alert variant="info" dismissible>
    Cookie preferences updated successfully.
  </Alert>
  <Alert variant="success" title="Notification Enabled" dismissible>
    You'll receive email alerts when new recipes match your preferences.
  </Alert>
  <Alert variant="warning" dismissible>
    Your free trial ends in 3 days. Upgrade to continue using premium features.
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="info" dismissible>
            Cookie preferences updated successfully.
          </Alert>
          <Alert variant="success" title="Notification Enabled" dismissible>
            You'll receive email alerts when new recipes match your preferences.
          </Alert>
          <Alert variant="warning" dismissible>
            Your free trial ends in 3 days. Upgrade to continue using premium features.
          </Alert>
        </Stack>
      )
    },
    {
      name: 'With Action Buttons',
      description: 'Alerts with action buttons for immediate user response',
      code: `<Stack direction="column" gap="md">
  <Alert
    variant="error"
    title="Connection Lost"
    action={<Button variant="secondary" size="small">Retry</Button>}
  >
    Unable to save your changes. Check your internet connection.
  </Alert>
  <Alert
    variant="warning"
    action={<Button variant="secondary" size="small">Adjust Budget</Button>}
  >
    You've exceeded your weekly budget by $15.30.
  </Alert>
  <Alert
    variant="info"
    dismissible
    action={<Button variant="primary" size="small">Learn More</Button>}
  >
    New seasonal recipes are now available in your meal planner!
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert
            variant="error"
            title="Connection Lost"
            action={<Button variant="secondary" size="small">Retry</Button>}
          >
            Unable to save your changes. Check your internet connection.
          </Alert>
          <Alert
            variant="warning"
            action={<Button variant="secondary" size="small">Adjust Budget</Button>}
          >
            You've exceeded your weekly budget by $15.30.
          </Alert>
          <Alert
            variant="info"
            dismissible
            action={<Button variant="primary" size="small">Learn More</Button>}
          >
            New seasonal recipes are now available in your meal planner!
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Inline Variant',
      description: 'Compact inline alerts for constrained spaces or inline contexts',
      code: `<Stack direction="column" gap="md">
  <Alert variant="info" inline>
    Quick tip: Save recipes to your favorites for faster planning.
  </Alert>
  <Alert variant="warning" inline>
    Low inventory: Restock pantry items.
  </Alert>
  <Alert variant="success" inline>
    Synced with grocery app
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="info" inline>
            Quick tip: Save recipes to your favorites for faster planning.
          </Alert>
          <Alert variant="warning" inline>
            Low inventory: Restock pantry items.
          </Alert>
          <Alert variant="success" inline>
            Synced with grocery app
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Complex Content',
      description: 'Alerts with rich content including lists, links, and multiple paragraphs',
      code: `<Stack direction="column" gap="md">
  <Alert variant="error" title="Recipe Import Failed" dismissible>
    <div>
      <p style={{ margin: '0 0 8px 0' }}>The following errors occurred:</p>
      <ul style={{ margin: '0', paddingLeft: '20px' }}>
        <li>Missing ingredient quantities (lines 5, 8, 12)</li>
        <li>Invalid cooking time format</li>
        <li>Unsupported file type (use .json or .xml)</li>
      </ul>
    </div>
  </Alert>
  <Alert
    variant="info"
    title="Meal Planning Tips"
    action={<Button variant="secondary" size="small">View Guide</Button>}
  >
    <div>
      <p style={{ margin: '0 0 8px 0' }}>
        Get the most out of your meal planner:
      </p>
      <ul style={{ margin: '0', paddingLeft: '20px' }}>
        <li>Plan meals 3-4 days in advance</li>
        <li>Reuse ingredients across multiple recipes</li>
        <li>Check weekly sales for budget savings</li>
      </ul>
    </div>
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="error" title="Recipe Import Failed" dismissible>
            <div>
              <p style={{ margin: '0 0 8px 0' }}>The following errors occurred:</p>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Missing ingredient quantities (lines 5, 8, 12)</li>
                <li>Invalid cooking time format</li>
                <li>Unsupported file type (use .json or .xml)</li>
              </ul>
            </div>
          </Alert>
          <Alert
            variant="info"
            title="Meal Planning Tips"
            action={<Button variant="secondary" size="small">View Guide</Button>}
          >
            <div>
              <p style={{ margin: '0 0 8px 0' }}>
                Get the most out of your meal planner:
              </p>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                <li>Plan meals 3-4 days in advance</li>
                <li>Reuse ingredients across multiple recipes</li>
                <li>Check weekly sales for budget savings</li>
              </ul>
            </div>
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Real-World Use Cases',
      description: 'Practical examples from Meal Agent application scenarios',
      code: `<Stack direction="column" gap="md">
  <Alert variant="warning" title="Ingredient Conflict" dismissible>
    Chicken used in 3 recipes this week - consider variety for balanced nutrition.
  </Alert>
  <Alert
    variant="error"
    title="Save Failed"
    action={<Button variant="secondary" size="small">Try Again</Button>}
  >
    Unable to save meal plan. Network connection lost.
  </Alert>
  <Alert variant="success" title="Export Complete" dismissible>
    Shopping list exported to your grocery app with 24 items.
  </Alert>
  <Alert variant="info">
    Bulk cooking tip: Double this recipe to save prep time later this week.
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="warning" title="Ingredient Conflict" dismissible>
            Chicken used in 3 recipes this week - consider variety for balanced nutrition.
          </Alert>
          <Alert
            variant="error"
            title="Save Failed"
            action={<Button variant="secondary" size="small">Try Again</Button>}
          >
            Unable to save meal plan. Network connection lost.
          </Alert>
          <Alert variant="success" title="Export Complete" dismissible>
            Shopping list exported to your grocery app with 24 items.
          </Alert>
          <Alert variant="info">
            Bulk cooking tip: Double this recipe to save prep time later this week.
          </Alert>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic <div> element with appropriate ARIA roles (alert or status)',
      'Error variants use role="alert" for immediate screen reader announcement',
      'Info, warning, and success variants use role="status" for polite announcements',
      'Configurable aria-live behavior (polite, assertive, off) for different urgency levels',
      'Dismiss button has descriptive aria-label="Dismiss alert"',
      'Icons are decorative with aria-hidden="true" to avoid redundant announcements',
      'Color contrast meets WCAG 2.2 AA standards (4.5:1 minimum for all text)',
      'Focus visible on interactive elements (dismiss and action buttons)',
      'Keyboard accessible: Tab to focus buttons, Enter/Space to activate'
    ],
    keyboardNavigation:
      'Tab key navigates to action button and dismiss button. Enter or Space activates buttons. No special keyboard interaction for the alert container itself.',
    screenReader:
      'Error alerts are announced immediately (role="alert"). Other variants announced politely (role="status"). Title is read first (if present), followed by message content. Action button text and dismiss button label are announced when focused.'
  },

  anatomy: {
    description:
      'Alert consists of an optional icon, content area (title + message), and optional actions (custom action button + dismiss button)',
    diagram: `
┌──────────────────────────────────────────────────┐
│  Alert Container                                 │
│  ┌────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │Icon│  │ Content         │  │ Actions     │  │
│  │    │  │ ┌─────────────┐ │  │ ┌─────────┐ │  │
│  │    │  │ │ Title (opt) │ │  │ │ Action  │ │  │
│  │    │  │ └─────────────┘ │  │ │ Button  │ │  │
│  │    │  │ ┌─────────────┐ │  │ │ (opt)   │ │  │
│  │    │  │ │ Message     │ │  │ └─────────┘ │  │
│  │    │  │ │ (children)  │ │  │ ┌─────────┐ │  │
│  │    │  │ └─────────────┘ │  │ │ Dismiss │ │  │
│  │    │  │                 │  │ │ (opt)   │ │  │
│  └────┘  └─────────────────┘  └─┴─────────┴─┘  │
└──────────────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Alert Container',
        description:
          'Root <div> element with role="alert" or role="status" based on variant. Variant-specific background, border, and text colors. Uses semantic spacing for padding. Full width with flexible layout.',
        tokens: [
          'semantic.color.background.*-subtle',
          'semantic.color.border.*',
          'semantic.color.text.*',
          'semantic.spacing.layout.md',
          'semantic.spacing.layout.lg',
          'base.border.radius.2'
        ]
      },
      {
        name: 'Icon Container',
        description:
          'Optional icon positioned at the start (left side). Shows default variant icon when icon={true}, custom icon when ReactNode provided, or hidden when icon={false}. Has aria-hidden="true" for accessibility.',
        tokens: []
      },
      {
        name: 'Content',
        description:
          'Flexible content area with optional title and required message. Title uses h6 typography with bold weight. Message uses body typography. Grows to fill available space.',
        tokens: [
          'semantic.typography.h6',
          'semantic.typography.body',
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Actions',
        description:
          'Optional actions container on the right side. Contains custom action button and/or dismiss IconButton. Uses auto margin to push to the end.',
        tokens: [
          'semantic.spacing.layout.sm',
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Dismiss Button',
        description:
          'IconButton with "close" icon, small size, naked variant. Removes alert from DOM when clicked. Has aria-label="Dismiss alert" for accessibility.',
        tokens: []
      }
    ]
  }
}
