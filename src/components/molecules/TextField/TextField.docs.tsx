import type { ComponentDocumentation } from '@/lib/docgen/types'
import { TextField } from './TextField'
import { Stack } from '@/components/atoms/Stack'

export const textFieldDocs: ComponentDocumentation = {
  id: 'text-field',
  name: 'TextField',
  description: 'A text input field with label, helper text, error messaging, and comprehensive accessibility support for form data entry.',
  category: 'Molecules',

  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Visible label text associated with the input field for accessibility and user guidance',
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Supplementary text providing additional context or instructions. Hidden when error is displayed',
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Error message to display. When present, sets aria-invalid and shows error text with role="alert"',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Marks the field as required, displays a visual indicator (*) and sets aria-required attribute',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables user interaction and applies disabled styling with reduced opacity',
    },
    {
      name: 'type',
      type: "'text' | 'email' | 'tel' | 'url' | 'search'",
      required: false,
      default: "'text'",
      description: 'HTML input type affecting keyboard behavior on mobile devices and browser validation',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      default: 'auto-generated',
      description: 'Unique identifier for the input element. Auto-generated if not provided for accessibility relationships',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Placeholder text displayed when the input is empty. Should not replace label',
    },
    {
      name: 'value',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Controlled value of the input. Use with onChange for controlled component pattern',
    },
    {
      name: 'defaultValue',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Initial value for uncontrolled component usage',
    },
    {
      name: 'onChange',
      type: '(event: ChangeEvent<HTMLInputElement>) => void',
      required: false,
      default: undefined,
      description: 'Callback fired when input value changes',
    },
    {
      name: 'onBlur',
      type: '(event: FocusEvent<HTMLInputElement>) => void',
      required: false,
      default: undefined,
      description: 'Callback fired when input loses focus, commonly used for validation',
    },
    {
      name: 'onFocus',
      type: '(event: FocusEvent<HTMLInputElement>) => void',
      required: false,
      default: undefined,
      description: 'Callback fired when input receives focus',
    },
    {
      name: 'autoComplete',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Hint for browser autofill behavior (e.g., "username", "email", "tel")',
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Maximum number of characters allowed',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing',
    },
  ],

  tokens: [
    // Typography
    'semantic.typography.body',
    'semantic.typography.label',
    'semantic.typography.caption',
    
    // Colors - Text
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.text.error',
    
    // Colors - Background
    'semantic.color.background.subtle',
    
    // Colors - Border
    'semantic.color.border.default',
    'semantic.color.border.strong',
    'semantic.color.border.subtle',
    'semantic.color.border.interactive',
    'semantic.color.border.error',
    
    // Spacing
    'base.spacing[2]',
    'base.spacing[3]',
    'base.spacing[1]',
    
    // Border
    'base.border.width[1]',
    'base.border.radius[2]',
    
    // Motion
    'base.duration.normal',
    'base.easing.easeInOut',
    
    // Opacity
    'base.opacity[60]',
  ],

  examples: [
    {
      name: 'Basic Usage',
      description: 'Simple text field with label and helper text',
      code: `<TextField
  label="Username"
  helperText="Choose a unique username"
  placeholder="Enter username"
/>`,
      renderComponent: () => (
        <TextField
          label="Username"
          helperText="Choose a unique username"
          placeholder="Enter username"
        />
      ),
    },
    {
      name: 'Required Field',
      description: 'Text field marked as required with visual indicator and ARIA attribute',
      code: `<TextField
  label="Email Address"
  type="email"
  required
  helperText="We'll never share your email"
/>`,
      renderComponent: () => (
        <TextField
          label="Email Address"
          type="email"
          required
          helperText="We'll never share your email"
        />
      ),
    },
    {
      name: 'Error State',
      description: 'Text field displaying validation error with role="alert" for screen reader announcements',
      code: `<TextField
  label="Email Address"
  type="email"
  error="Please enter a valid email address"
  value="invalid-email"
/>`,
      renderComponent: () => (
        <TextField
          label="Email Address"
          type="email"
          error="Please enter a valid email address"
          defaultValue="invalid-email"
        />
      ),
    },
    {
      name: 'Disabled State',
      description: 'Text field in disabled state with reduced opacity and no user interaction',
      code: `<TextField
  label="Account ID"
  disabled
  value="ACC-123456"
  helperText="This field cannot be edited"
/>`,
      renderComponent: () => (
        <TextField
          label="Account ID"
          disabled
          defaultValue="ACC-123456"
          helperText="This field cannot be edited"
        />
      ),
    },
    {
      name: 'Input Types',
      description: 'Different input types affecting mobile keyboard and browser validation',
      code: `<Stack direction="column" gap="md">
  <TextField
    label="Email"
    type="email"
    placeholder="you@example.com"
  />
  <TextField
    label="Phone Number"
    type="tel"
    placeholder="+1 (555) 000-0000"
  />
  <TextField
    label="Website"
    type="url"
    placeholder="https://example.com"
  />
  <TextField
    label="Search"
    type="search"
    placeholder="Search..."
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <TextField
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <TextField
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
          <TextField
            label="Website"
            type="url"
            placeholder="https://example.com"
          />
          <TextField
            label="Search"
            type="search"
            placeholder="Search..."
          />
        </Stack>
      ),
    },
    {
      name: 'Form Validation Pattern',
      description: 'Real-world form with validation states showing error and success patterns',
      code: `<Stack direction="column" gap="md">
  <TextField
    label="Username"
    required
    helperText="Choose a unique username (3-20 characters)"
  />
  <TextField
    label="Email"
    type="email"
    required
    error="This email is already registered"
    value="existing@example.com"
  />
  <TextField
    label="Referral Code"
    helperText="Optional: Enter a referral code if you have one"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <TextField
            label="Username"
            required
            helperText="Choose a unique username (3-20 characters)"
          />
          <TextField
            label="Email"
            type="email"
            required
            error="This email is already registered"
            defaultValue="existing@example.com"
          />
          <TextField
            label="Referral Code"
            helperText="Optional: Enter a referral code if you have one"
          />
        </Stack>
      ),
    },
  ],

  accessibility: {
    notes: [
      'Uses semantic HTML <input> element with proper type attributes',
      'Label is programmatically associated with input via htmlFor attribute',
      'Required fields marked with aria-required="true" and visual indicator (*)',
      'Error state sets aria-invalid="true" and uses aria-describedby to link error message',
      'Helper text linked to input via aria-describedby for screen reader context',
      'Error messages use role="alert" and aria-live="polite" for immediate screen reader announcements',
      'Focus ring visible with 2px border using semantic.color.border.interactive',
      'Maintains 4.5:1 color contrast ratio in all states (WCAG 2.2 AA)',
      'Disabled state uses base.opacity[60] maintaining readability',
      'Auto-generates unique IDs using React.useId() when not provided',
    ],
    keyboardNavigation: 'Tab to focus input, Shift+Tab to move backwards. All standard text editing keyboard shortcuts supported (Cmd+A, Cmd+C, Cmd+V, etc.)',
    screenReader: 'Label is announced followed by required status, helper text, and current value. Error messages are announced immediately when displayed due to role="alert"',
  },

  anatomy: {
    description: 'A vertically stacked composition with label, input field, and conditional helper/error text',
    diagram: `
┌─────────────────────────────────────┐
│ Field Container                     │
│ ┌─────────────────────────────────┐ │
│ │ Label  *                        │ │
│ │ (with optional required         │ │
│ │  indicator)                     │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Input Field                     │ │
│ │ (StyledInputBase)               │ │
│ │ - Focus ring on focus           │ │
│ │ - Error styling when error      │ │
│ │ - Disabled opacity when disabled│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Helper Text OR Error Message    │ │
│ │ (conditional)                   │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Field Container',
        description: 'Root wrapper providing vertical spacing between label, input, and help text using Stack component',
        tokens: ['base.spacing[1]'],
      },
      {
        name: 'Label',
        description: 'Typography component displaying field label with optional required indicator. Associated with input via htmlFor',
        tokens: [
          'semantic.typography.label',
          'semantic.color.text.default',
        ],
      },
      {
        name: 'Required Indicator',
        description: 'Red asterisk (*) displayed when required prop is true. Has aria-label="required" for screen readers',
        tokens: ['semantic.color.text.error'],
      },
      {
        name: 'Input Field',
        description: 'Base input element (StyledInputBase) with background, border, padding, and interactive states. Supports all HTML input attributes',
        tokens: [
          'semantic.typography.body',
          'semantic.color.background.subtle',
          'semantic.color.border.default',
          'semantic.color.border.interactive',
          'semantic.color.border.strong',
          'semantic.color.border.error',
          'base.spacing[2]',
          'base.spacing[3]',
          'base.border.width[1]',
          'base.border.radius[2]',
          'base.duration.normal',
          'base.easing.easeInOut',
        ],
      },
      {
        name: 'Helper Text',
        description: 'Optional supplementary text displayed below input. Hidden when error is present. Uses Typography caption variant',
        tokens: [
          'semantic.typography.caption',
          'semantic.color.text.subdued',
        ],
      },
      {
        name: 'Error Message',
        description: 'Error text displayed below input with role="alert" for screen reader announcements. Replaces helper text when present',
        tokens: [
          'semantic.typography.caption',
          'semantic.color.text.error',
        ],
      },
    ],
  },
}
