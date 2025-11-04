import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Checkbox } from './Checkbox'
import React from 'react'

export const checkboxDocs: ComponentDocumentation = {
  id: 'checkbox',
  name: 'Checkbox',
  description:
    'A binary selection input component with integrated label, helper text, and error messaging. Supports indeterminate state for "select all" scenarios.',
  category: 'Molecules',

  props: [
    {
      name: 'label',
      type: 'string',
      required: true,
      description: 'The label text displayed next to the checkbox',
    },
    {
      name: 'checked',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the checkbox is checked (controlled component)',
    },
    {
      name: 'indeterminate',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Whether the checkbox is in an indeterminate state, useful for "select all" scenarios where some but not all items are selected',
    },
    {
      name: 'labelPosition',
      type: "'left' | 'right'",
      required: false,
      default: "'right'",
      description: 'Position of the label relative to the checkbox',
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      description: 'Helper text displayed below the checkbox to provide additional context',
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      description:
        'Error message to display. When provided, the checkbox enters an error state with red border and error text',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the checkbox is disabled and cannot be interacted with',
    },
    {
      name: 'onChange',
      type: '(event: React.ChangeEvent<HTMLInputElement>) => void',
      required: false,
      description: 'Callback function fired when the checkbox state changes',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the checkbox is required in a form',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      description: 'Custom ID for the checkbox input. Auto-generated if not provided',
    },
    {
      name: 'name',
      type: 'string',
      required: false,
      description: 'Name attribute for form submission',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      description: 'Value attribute for form submission',
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description:
        'ID of element(s) that describe the checkbox. Automatically includes helper text and error IDs',
    },
    {
      name: 'ref',
      type: 'React.Ref<HTMLInputElement>',
      required: false,
      description: 'Ref forwarded to the underlying input element',
    },
  ],

  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple checkbox with label for binary selection',
      code: `<Checkbox
  label="I accept the terms and conditions"
/>`,
      renderComponent: () => (
        <Checkbox
          label="I accept the terms and conditions"
        />
      ),
    },
    {
      name: 'With Helper Text',
      description: 'Checkbox with additional context provided via helper text',
      code: `<Checkbox
  label="Subscribe to newsletter"
  helperText="Get weekly updates about new features and content"
/>`,
      renderComponent: () => (
        <Checkbox
          label="Subscribe to newsletter"
          helperText="Get weekly updates about new features and content"
        />
      ),
    },
    {
      name: 'Error State',
      description: 'Checkbox in error state with validation message',
      code: `<Checkbox
  label="I agree to the privacy policy"
  error="You must agree to continue"
  required
/>`,
      renderComponent: () => (
        <Checkbox
          label="I agree to the privacy policy"
          error="You must agree to continue"
          required
        />
      ),
    },
    {
      name: 'Disabled State',
      description: 'Disabled checkbox that cannot be interacted with',
      code: `<Checkbox
  label="This option is currently unavailable"
  disabled
  checked={false}
/>`,
      renderComponent: () => (
        <Checkbox label="This option is currently unavailable" disabled checked={false} />
      ),
    },
    {
      name: 'Indeterminate State',
      description:
        'Checkbox in indeterminate state, typically used for "select all" when some items are selected',
      code: `<Checkbox
  label="Select all items"
  indeterminate
/>`,
      renderComponent: () => (
        <Checkbox
          label="Select all items"
          indeterminate
        />
      ),
    },
    {
      name: 'Label Positioning',
      description: 'Checkbox with label on the left side instead of default right',
      code: `<Checkbox
  label="Enable feature"
  labelPosition="left"
/>`,
      renderComponent: () => (
        <Checkbox
          label="Enable feature"
          labelPosition="left"
        />
      ),
    },
  ],

  tokens: [
    // Input tokens used
    'component.input.default.backgroundColor',
    'component.input.default.textColor',
    'component.input.default.borderColor',
    'component.input.default.borderRadius',
    'component.input.default.borderWidth',
    'component.input.default.font',
    'component.input.placeholder.textColor',
    'component.input.hover.borderColor',
    'component.input.focus.borderColor',
    'component.input.focus.outline',
    'component.input.focus.outlineOffset',
    'component.input.error.borderColor',
    'component.input.error.focus.borderColor',
    'component.input.error.focus.outline',
    'component.input.error.focus.outlineOffset',
    'component.input.error.hover.borderColor',
    'component.input.disabled.backgroundColor',
    'component.input.disabled.textColor',
    'component.input.disabled.borderColor',
    'component.input.disabled.cursor',

    // Semantic tokens
    'semantic.color.background.interactive',
    'semantic.color.text.inverse',
    'semantic.color.text.error',
    'semantic.color.text.subdued',
    'semantic.typography.small',

    // Base tokens
    'base.spacing.1',
    'base.spacing.3',
    'base.spacing.9',
  ],

  accessibility: {
    notes: [
      'Uses native HTML checkbox input for full screen reader support',
      'Custom visual checkbox is aria-hidden, all interactions handled by native input',
      'Maintains WCAG 2.2 AA color contrast ratios in all states (4.5:1 minimum)',
      'Label is properly associated with input via htmlFor/id relationship',
      'Error messages use role="alert" and aria-live="polite" for screen reader announcements',
      'Helper text and error messages linked via aria-describedby for context',
      'Supports required attribute for form validation',
      'Indeterminate state properly set on input element for screen reader support',
      '48px minimum touch target for mobile accessibility (8px grid aligned)',
      'Focus outline visible and meets 2px minimum thickness requirement',
    ],
    keyboardNavigation:
      'Tab to focus checkbox, Space to toggle checked state, Shift+Tab to focus previous element',
    screenReader:
      'Announces label, state (checked/unchecked/indeterminate), required status, and associated helper text or error messages. Changes announced via aria-live when error state updates.',
  },

  anatomy: {
    description:
      'A checkbox consists of a hidden native input, custom visual checkbox, label text, and optional helper/error text',
    diagram: `
┌────────────────────────────────────────────┐
│ Checkbox Container (48px min-height)      │
│ ┌────────┐  ┌─────────────────────────┐   │
│ │        │  │ Label Text              │   │
│ │ [✓]    │  │                         │   │
│ │ 24×24  │  │                         │   │
│ │        │  │                         │   │
│ └────────┘  └─────────────────────────┘   │
└────────────────────────────────────────────┘
                ┌──────────────────────────┐
                │ Helper Text / Error      │
                │ (aligned with label)     │
                └──────────────────────────┘
    `,
    parts: [
      {
        name: 'Hidden Input',
        description:
          'Native checkbox input (visually hidden with pointer-events: none) that handles all accessibility and keyboard interaction',
        tokens: [],
      },
      {
        name: 'Custom Checkbox Visual',
        description:
          '24×24px custom styled checkbox with border, background color that changes when checked, and checkmark or indeterminate icon',
        tokens: [
          'component.input.default.backgroundColor',
          'component.input.default.borderColor',
          'component.input.default.borderRadius',
          'component.input.default.borderWidth',
          'semantic.color.background.interactive',
          'semantic.color.text.inverse',
        ],
      },
      {
        name: 'Label Container',
        description:
          'Container element that wraps checkbox and label, provides 48px touch target and handles label positioning',
        tokens: ['base.spacing.3'],
      },
      {
        name: 'Label Text',
        description: 'Text label with proper typography and disabled state styling',
        tokens: ['component.input.default.font', 'component.input.disabled.textColor'],
      },
      {
        name: 'Helper Text',
        description: 'Optional helper text displayed below checkbox to provide additional context',
        tokens: [
          'semantic.typography.small',
          'semantic.color.text.subdued',
          'base.spacing.9',
          'base.spacing.1',
        ],
      },
      {
        name: 'Error Message',
        description:
          'Error message with role="alert" and aria-live="polite", replaces helper text when present',
        tokens: [
          'semantic.typography.small',
          'semantic.color.text.error',
          'base.spacing.9',
          'base.spacing.1',
        ],
      },
    ],
  },
}
