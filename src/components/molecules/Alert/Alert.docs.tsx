import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Alert } from './Alert'
import { InlineAlert } from '../InlineAlert'
import { Button } from '../../atoms/Button'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import { alertGuideNotes } from '../../../lib/docgen/alertGuide'

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
        'Severity, affecting the background, border colour, text and icon. Error (crossCircle icon) for critical issues, warning (bell icon) for cautions, info (info icon) for tips, success (checkRing icon) for confirmations. Each variant has a fixed icon that always displays.'
    },
    {
      name: 'appearance',
      type: "'outlined' | 'borderless'",
      required: false,
      default: "'outlined'",
      description:
        'Whether the severity border is drawn (decision 0019). outlined: only for alerts at the top: a page-level alert at the top of the page, an alert at the top of the content area, and an error summary. borderless: every other alert, including alerts inside content and at the bottom of a page; the severity tint, icon and title colour carry the severity. Both take the same space (borderless keeps a transparent border).'
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
      description: 'Show close/dismiss button. When clicked, the alert fades out, then its space collapses (300ms in total; with prefers-reduced-motion it only fades, for 150ms). It is then removed from the DOM and onDismiss is called.'
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      default: undefined,
      description: 'Callback function invoked after the alert is dismissed via the close button, once its exit animation has finished and it has been removed.'
    },
    {
      name: 'action',
      type: 'ReactNode',
      required: false,
      default: undefined,
      description: 'Optional action button or component, such as "Undo" or "Retry". It sits below the message, left-aligned with it, so it is read after the message (decision 0021).'
    },
    {
      name: 'inline',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Deprecated: use InlineAlert for a short, local message (decision 0019); inline is removed in 3.0. Until then it still gives the compact layout with reduced padding.'
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
    'semantic.border.width.thin',
    // Severity × appearance (decision 0019)
    'component.alert.severity.error.background',
    'component.alert.severity.error.text',
    'component.alert.severity.warning.background',
    'component.alert.severity.warning.text',
    'component.alert.severity.info.background',
    'component.alert.severity.info.text',
    'component.alert.severity.success.background',
    'component.alert.severity.success.text',
    'component.alert.appearance.outlined.borderColor.error',
    'component.alert.appearance.outlined.borderColor.warning',
    'component.alert.appearance.outlined.borderColor.info',
    'component.alert.appearance.outlined.borderColor.success',
    'component.alert.appearance.borderless.borderColor.error',
    'component.alert.appearance.borderless.borderColor.warning',
    'component.alert.appearance.borderless.borderColor.info',
    'component.alert.appearance.borderless.borderColor.success',

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
    'semantic.border.radius.sm',

    // Typography
    'component.alert.title.typography',
    'component.alert.title.fontWeight',
    'component.alert.title.lineHeight',
    'component.alert.message.typography',
    'component.alert.message.lineHeight',

    // Dismiss button: its glyph sits on the padding edge
    'component.iconButton.sizes.small.minWidth',
    'semantic.size.icon.sm',

    // Breakpoint
    'semantic.breakpoint.md',
    // Motion
    'semantic.motion.duration.fast',
    'semantic.motion.easing.easeOut',
  ],

  examples: [
    {
      name: 'Appearance: Where Each One Goes',
      description: 'Outlined only for alerts at the top of the page or content area and for error summaries; borderless everywhere else, including inside content and at the bottom of a page (decision 0019).',
      code: `<Stack direction="column" gap="lg">
  {/* Top of the page or content area: outlined (the default) */}
  <Alert variant="error" title="Payment failed">
    Your card was declined. Update your payment details to continue.
  </Alert>

  <Typography>Your plan renews on 1 November. You can change or cancel it any time before then.</Typography>

  {/* Inside content: borderless */}
  <Alert variant="info" appearance="borderless">
    Annual plans save two months compared with paying monthly.
  </Alert>

  <Typography>Billing history and invoices are below.</Typography>

  {/* Bottom of the page: borderless */}
  <Alert variant="success" appearance="borderless">
    All invoices are paid.
  </Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <Alert variant="error" title="Payment failed">
            Your card was declined. Update your payment details to continue.
          </Alert>
          <Typography>Your plan renews on 1 November. You can change or cancel it any time before then.</Typography>
          <Alert variant="info" appearance="borderless">
            Annual plans save two months compared with paying monthly.
          </Alert>
          <Typography>Billing history and invoices are below.</Typography>
          <Alert variant="success" appearance="borderless">
            All invoices are paid.
          </Alert>
        </Stack>
      )
    },
    {
      name: 'Borderless Severities',
      description: 'All four severities without a border. The tint, icon and title colour carry the severity.',
      code: `<Stack direction="column" gap="md">
  <Alert variant="error" appearance="borderless" title="Error">Something went wrong.</Alert>
  <Alert variant="warning" appearance="borderless" title="Warning">Check this before continuing.</Alert>
  <Alert variant="info" appearance="borderless" title="Info">Here is something useful.</Alert>
  <Alert variant="success" appearance="borderless" title="Success">That worked.</Alert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="error" appearance="borderless" title="Error">Something went wrong.</Alert>
          <Alert variant="warning" appearance="borderless" title="Warning">Check this before continuing.</Alert>
          <Alert variant="info" appearance="borderless" title="Info">Here is something useful.</Alert>
          <Alert variant="success" appearance="borderless" title="Success">That worked.</Alert>
        </Stack>
      )
    },
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
      description: 'The action follows the message, left-aligned with it. The dismiss button stays at the top right, on its own (decision 0021).',
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
      name: 'Inline (deprecated)',
      description: 'The inline prop is deprecated: use InlineAlert for a short, local message, with the same variant and text. An inline alert that needs a title, action or dismiss button stays an Alert.',
      code: `// Deprecated
<Alert variant="warning" inline>Low inventory: restock pantry items.</Alert>

// Use instead
<InlineAlert variant="warning">Low inventory: restock pantry items.</InlineAlert>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Alert variant="warning" inline>
            Low inventory: restock pantry items.
          </Alert>
          <InlineAlert variant="warning">Low inventory: restock pantry items.</InlineAlert>
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
      'Alert consists of an icon, a content area (title + message), an optional action and an optional dismiss button',
    diagram: `
┌──────────────────────────────────────────────────────┐
│  Alert Container                                     │
│  ┌────┐  ┌──────────────────────────────┐  ┌─────┐   │
│  │Icon│  │ Content                      │  │  ×  │   │
│  └────┘  │ ┌──────────────────────────┐ │  └─────┘   │
│          │ │ Title (opt)              │ │  Dismiss   │
│          │ └──────────────────────────┘ │  (opt),    │
│          │ ┌──────────────────────────┐ │  centred   │
│          │ │ Message (children)       │ │  on the    │
│          │ └──────────────────────────┘ │  first     │
│          │ ┌─────────┐                  │  line      │
│          │ │ Action  │ (opt)            │            │
│          │ └─────────┘                  │            │
│          └──────────────────────────────┘            │
└──────────────────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Alert Container',
        description:
          'Root <div> element with role="alert" or role="status" based on variant. Severity background and text colours, and a 1px border that is the severity colour (outlined) or transparent (borderless), from Alert\'s component tokens. Uses semantic spacing for padding. Full width with flexible layout.',
        tokens: [
          'component.alert.severity.error.background',
          'component.alert.severity.error.text',
          'component.alert.appearance.outlined.borderColor.error',
          'component.alert.appearance.borderless.borderColor.error',
          'component.alert.severity.warning.background',
          'component.alert.severity.warning.text',
          'component.alert.appearance.outlined.borderColor.warning',
          'component.alert.appearance.borderless.borderColor.warning',
          'component.alert.severity.info.background',
          'component.alert.severity.info.text',
          'component.alert.appearance.outlined.borderColor.info',
          'component.alert.appearance.borderless.borderColor.info',
          'component.alert.severity.success.background',
          'component.alert.severity.success.text',
          'component.alert.appearance.outlined.borderColor.success',
          'component.alert.appearance.borderless.borderColor.success',
          'semantic.border.width.thin',
          'semantic.spacing.layout.md',
          'semantic.spacing.layout.lg',
          'semantic.border.radius.sm'
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
          'Flexible content area with optional title, required message and optional action, in that order. Title uses h6 typography at semibold weight. Message uses body typography. Grows to fill available space.',
        tokens: [
          'component.alert.title.typography',
          'component.alert.title.fontWeight',
          'component.alert.title.lineHeight',
          'component.alert.message.typography',
          'component.alert.message.lineHeight',
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Action',
        description:
          'Optional container for a custom action, such as a small Button, at the end of the content: below the message and left-aligned with it (decision 0021). With the content\'s xs gap, the space above it is md. Several actions sit side by side, sm apart, and wrap.',
        tokens: [
          'semantic.spacing.layout.md',
          'semantic.spacing.layout.xs',
          'semantic.spacing.layout.sm'
        ]
      },
      {
        name: 'Dismiss Button',
        description:
          'IconButton with "close" icon, small size, naked variant, last in the row. Its centre lines up with the first line of content: the title, or the message when there is no title (decision 0019). It sits in the row, in a slot as tall as that line, so text never runs under it. The action is below the content, so the two never share a row (decision 0021). Its glyph sits on the padding edge, mirroring the severity icon. Removes alert from DOM when clicked. Has aria-label="Dismiss alert" for accessibility.',
        tokens: [
          'component.alert.title.lineHeight',
          'component.alert.message.lineHeight',
          'component.iconButton.sizes.small.minWidth',
          'semantic.size.icon.sm'
        ]
      }
    ]
  },

  notes: [...alertGuideNotes]
}
