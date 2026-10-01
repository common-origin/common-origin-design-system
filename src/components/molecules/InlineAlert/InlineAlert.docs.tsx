import type { ComponentDocumentation } from '@/lib/docgen/types'
import { InlineAlert } from './InlineAlert'
import { Stack } from '../../atoms/Stack'
import { alertGuideNotes } from '../../../lib/docgen/alertGuide'

export const inlineAlertDocs: ComponentDocumentation = {
  id: 'inline-alert',
  name: 'InlineAlert',
  description:
    'A short, local message that sits next to what it is about: between paragraphs, below a field or in a table cell (decision 0019). A severity icon and text in the severity colour, with no background or border. It replaces Alert\'s deprecated inline prop. For a title, an action or a dismiss button, use Alert.',
  category: 'Molecules',
  parentId: 'alert',

  props: [
    {
      name: 'variant',
      type: "'error' | 'warning' | 'info' | 'success'",
      required: false,
      default: "'info'",
      description: 'Severity, shown by the icon and the text colour: text.error, text.warning, text.interactive (info) or text.success.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: "'medium'",
      description: 'Size on the label scale (decision 0018): small (20px minimum height, 12px text) for dense places such as tables; medium (24px, 14px text) for forms and content. The message can wrap.'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The message: short text only. No title, action or dismiss button; use Alert for those.'
    },
    {
      name: 'ariaLive',
      type: "'polite' | 'assertive' | 'off'",
      required: false,
      default: "'polite'",
      description: 'Live region behaviour, as on Alert. Errors use role="alert"; the other severities use role="status".'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Element id. When the message gives feedback about a control, the control references this id with aria-describedby.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Test identifier for automated testing.'
    }
  ],

  tokens: [
    // Severity colours (text and icon)
    'semantic.color.text.error',
    'semantic.color.text.warning',
    'semantic.color.text.interactive',
    'semantic.color.text.success',
    'semantic.color.icon.error',
    'semantic.color.icon.warning',
    'semantic.color.icon.interactive',
    'semantic.color.icon.success',
    // Size (decision 0018 label scale)
    'semantic.size.label.small',
    'semantic.size.label.medium',
    'semantic.typography.caption', // small text
    'semantic.typography.small', // medium text
    'semantic.size.icon.xs', // small icon
    'semantic.size.icon.sm', // medium icon
    'semantic.spacing.layout.xs', // small gap
    'semantic.spacing.layout.sm' // medium gap
  ],

  examples: [
    {
      name: 'Severities',
      description: 'The four severities from Alert. The icon and text take the severity colour; there is no background or border.',
      code: `<Stack direction="column" gap="sm">
  <InlineAlert variant="info">Prices include tax</InlineAlert>
  <InlineAlert variant="success">Saved</InlineAlert>
  <InlineAlert variant="warning">Only 2 left in stock</InlineAlert>
  <InlineAlert variant="error">Payment failed: card declined</InlineAlert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <InlineAlert variant="info">Prices include tax</InlineAlert>
          <InlineAlert variant="success">Saved</InlineAlert>
          <InlineAlert variant="warning">Only 2 left in stock</InlineAlert>
          <InlineAlert variant="error">Payment failed: card declined</InlineAlert>
        </Stack>
      )
    },
    {
      name: 'Sizes',
      description: 'Small for dense places such as tables; medium (the default) for forms and content.',
      code: `<Stack direction="column" gap="sm">
  <InlineAlert size="small" variant="warning">Small: needs review</InlineAlert>
  <InlineAlert size="medium" variant="warning">Medium: needs review</InlineAlert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <InlineAlert size="small" variant="warning">Small: needs review</InlineAlert>
          <InlineAlert size="medium" variant="warning">Medium: needs review</InlineAlert>
        </Stack>
      )
    },
    {
      name: 'Field Feedback',
      description: 'Below a control that has no error prop of its own, give the InlineAlert an id and reference it from the control with aria-describedby. Screen readers then read the message whenever the control is focused, not only when it appears.',
      code: `<Stack direction="column" gap="xs">
  <label htmlFor="promo">Promo code</label>
  <input id="promo" aria-invalid="true" aria-describedby="promo-error" />
  <InlineAlert id="promo-error" variant="error" size="small">
    This code has expired
  </InlineAlert>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xs">
          <label htmlFor="promo-example">Promo code</label>
          <input id="promo-example" aria-invalid="true" aria-describedby="promo-example-error" />
          <InlineAlert id="promo-example-error" variant="error" size="small">
            This code has expired
          </InlineAlert>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Errors use role="alert" and the other severities role="status", the same as Alert; ariaLive defaults to polite',
      'The icon is decorative and hidden from assistive technology; the text carries the message',
      'Severity is shown by the icon and the colour together, and the message text should say what is wrong',
      'Text meets WCAG 2.2 AA in every severity on the page (5.1:1), white (5.4:1) and grey surface (4.54:1) backgrounds, enforced by tests. Check contrast before using it on other backgrounds',
      'As field feedback, the control references the InlineAlert\'s id with aria-describedby'
    ],
    keyboardNavigation: 'Not focusable and has no interactive parts.',
    screenReader: 'A new or changed message is announced through the live region: errors immediately, other severities politely. As field feedback, the message is also read as the control\'s description when it is focused.'
  },

  anatomy: {
    description: 'A row with a severity icon and the message text, with no background or border.',
    diagram: `
┌───────────────────────────────────┐
│  InlineAlert (role alert/status)  │
│  ┌──────┐  ┌──────────────────┐   │
│  │ Icon │  │ Message          │   │
│  └──────┘  └──────────────────┘   │
└───────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Flex row with a minimum height from the label scale and the severity text colour.',
        tokens: [
          'semantic.size.label.small',
          'semantic.size.label.medium',
          'semantic.color.text.error',
          'semantic.color.text.warning',
          'semantic.color.text.interactive',
          'semantic.color.text.success',
          'semantic.spacing.layout.xs',
          'semantic.spacing.layout.sm'
        ]
      },
      {
        name: 'Icon',
        description: 'Severity icon, hidden from assistive technology, centred on the first line of the message.',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm',
          'semantic.color.icon.error',
          'semantic.color.icon.warning',
          'semantic.color.icon.interactive',
          'semantic.color.icon.success'
        ]
      },
      {
        name: 'Message',
        description: 'The children: short text that can wrap.',
        tokens: ['semantic.typography.caption', 'semantic.typography.small']
      }
    ]
  },

  notes: [...alertGuideNotes]
}
