import type { ComponentDocumentation } from '@/lib/docgen/types'
import { PasswordField } from './PasswordField'
import { Stack } from '@/components/atoms/Stack'

export const passwordFieldDocs: ComponentDocumentation = {
  id: 'password-field',
  name: 'PasswordField',
  description: 'A secure password input field with visibility toggle, label, helper text, error messaging, and comprehensive accessibility support for authentication and password entry forms.',
  category: 'Molecules',

  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Visible label text associated with the password input field for accessibility and user guidance',
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Supplementary text providing password requirements or additional context. Hidden when error is displayed',
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
      name: 'showToggle',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to display the password visibility toggle button. Toggle uses eye/eyeSlash icons',
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
      description: 'Controlled value of the password input. Use with onChange for controlled component pattern',
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
      description: 'Callback fired when password input value changes',
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
      description: 'Hint for browser autofill behavior (e.g., "current-password", "new-password")',
    },
    {
      name: 'maxLength',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Maximum number of characters allowed',
    },
    {
      name: 'minLength',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Minimum number of characters required for validation',
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
    'semantic.typography.body1',
    'semantic.typography.label',
    'semantic.typography.caption',
    
    // Component Input Tokens
    'component.input.default.backgroundColor',
    'component.input.default.borderColor',
    'component.input.default.textColor',
    'component.input.default.placeholderColor',
    'component.input.hover.borderColor',
    'component.input.focus.borderColor',
    'component.input.disabled.backgroundColor',
    'component.input.disabled.borderColor',
    'component.input.disabled.textColor',
    'component.input.error.borderColor',
    'component.input.error.hover.borderColor',
    'component.input.error.focus.borderColor',
    
    // Component IconButton Tokens (for visibility toggle)
    'component.iconButton.variants.naked.backgroundColor',
    'component.iconButton.variants.naked.hover.backgroundColor',
    
    // Spacing
    'base.spacing[1]',
    'base.spacing[2]',
    'base.spacing[3]',
    
    // Effects
    'semantic.shadow.sm',
    'semantic.motion.transition.normal',
  ],

  examples: [
    {
      name: 'Basic Password Field',
      description: 'A simple password field with label for login forms',
      code: `<PasswordField 
  label="Password" 
  placeholder="Enter your password"
/>`,
      renderComponent: () => (
        <PasswordField 
          label="Password" 
          placeholder="Enter your password"
        />
      ),
    },
    {
      name: 'With Helper Text',
      description: 'Password field with requirements guidance for registration',
      code: `<PasswordField 
  label="New Password" 
  helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
  required
/>`,
      renderComponent: () => (
        <PasswordField 
          label="New Password" 
          helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
          required
        />
      ),
    },
    {
      name: 'With Error State',
      description: 'Password field showing validation error',
      code: `<PasswordField 
  label="Password" 
  error="Password must be at least 8 characters"
  defaultValue="weak"
/>`,
      renderComponent: () => (
        <PasswordField 
          label="Password" 
          error="Password must be at least 8 characters"
          defaultValue="weak"
        />
      ),
    },
    {
      name: 'Password Confirmation',
      description: 'Dual password fields for registration with matching validation',
      code: `<Stack direction="column" gap="md">
  <PasswordField 
    label="New Password" 
    helperText="At least 8 characters"
    minLength={8}
    autoComplete="new-password"
  />
  <PasswordField 
    label="Confirm Password" 
    helperText="Re-enter your password"
    minLength={8}
    autoComplete="new-password"
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <PasswordField 
            label="New Password" 
            helperText="At least 8 characters"
            minLength={8}
            autoComplete="new-password"
          />
          <PasswordField 
            label="Confirm Password" 
            helperText="Re-enter your password"
            minLength={8}
            autoComplete="new-password"
          />
        </Stack>
      ),
    },
    {
      name: 'Without Toggle Button',
      description: 'Password field with visibility toggle disabled',
      code: `<PasswordField 
  label="Password" 
  showToggle={false}
  autoComplete="current-password"
/>`,
      renderComponent: () => (
        <PasswordField 
          label="Password" 
          showToggle={false}
          autoComplete="current-password"
        />
      ),
    },
    {
      name: 'Disabled State',
      description: 'Disabled password field for read-only forms',
      code: `<PasswordField 
  label="Password" 
  disabled
  defaultValue="password123"
/>`,
      renderComponent: () => (
        <PasswordField 
          label="Password" 
          disabled
          defaultValue="password123"
        />
      ),
    },
    {
      name: 'Login Form Example',
      description: 'Real-world usage in a complete login form',
      code: `<Stack direction="column" gap="md">
  <PasswordField 
    label="Current Password" 
    autoComplete="current-password"
    required
  />
  <PasswordField 
    label="New Password" 
    helperText="Must be different from current password"
    autoComplete="new-password"
    minLength={8}
    required
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <PasswordField 
            label="Current Password" 
            autoComplete="current-password"
            required
          />
          <PasswordField 
            label="New Password" 
            helperText="Must be different from current password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </Stack>
      ),
    },
  ],

  accessibility: {
    notes: [
      'Input has type="password" by default to mask password characters for security',
      'Visibility toggle button uses aria-label ("Show password"/"Hide password") for screen reader clarity',
      'Toggle button has aria-pressed attribute indicating current visibility state',
      'Error messages use role="alert" and aria-live="polite" for immediate screen reader announcement',
      'Input has aria-invalid="true" when error prop is present for assistive technology',
      'Helper text and error messages are associated via aria-describedby for context',
      'Toggle button has tabIndex={-1} to prevent tab navigation interference, only clickable',
      'Label is properly associated with input via htmlFor/id relationship',
      'Required fields have visual indicator (*) and aria-required attribute',
      'Password visibility toggle uses eye/eyeSlash icons with semantic meaning',
      'Disabled state prevents all interactions and is announced by screen readers',
      'Password input width accommodates toggle button with proper padding',
    ],
    keyboardNavigation: 'Tab to focus password input, type to enter password, Escape to clear (browser default), Tab to next field. Toggle button is not in tab order but can be clicked with mouse.',
    screenReader: 'Announces label, required state, current value (masked as bullets), helper text or error message. Toggle button announces "Show password button" or "Hide password button" with pressed state.',
  },

  anatomy: {
    description: 'A password input field consisting of a label, password input with masking, visibility toggle button, and optional helper/error text',
    diagram: `
┌─────────────────────────────────────┐
│ PasswordField Container             │
│ ┌─────────────────────────────────┐ │
│ │ Label  *                        │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Input Wrapper (relative)        │ │
│ │  ┌─────────────────┐  ┌──────┐ │ │
│ │  │ Password Input  │  │ Eye  │ │ │
│ │  │ (type=password) │  │ Icon │ │ │
│ │  └─────────────────┘  └──────┘ │ │
│ │                      (absolute) │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Helper Text / Error Message     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'PasswordField Container',
        description: 'Root flex container organizing label, input wrapper, and helper text vertically with consistent spacing',
        tokens: ['base.spacing[2]'],
      },
      {
        name: 'Label',
        description: 'Optional text label with required indicator (*) using semantic typography and associated with input via htmlFor',
        tokens: [
          'semantic.typography.label',
          'semantic.color.text.default',
          'semantic.color.text.disabled',
          'semantic.color.text.error',
          'base.spacing[1]',
        ],
      },
      {
        name: 'Input Wrapper',
        description: 'Relative positioned container for password input and absolute positioned toggle button',
      },
      {
        name: 'Password Input',
        description: 'StyledInputBase with type="password" (toggles to "text"), uses component.input.* tokens for consistent styling with extra right padding for toggle button',
        tokens: [
          'component.input.default.backgroundColor',
          'component.input.default.borderColor',
          'component.input.default.textColor',
          'component.input.hover.borderColor',
          'component.input.focus.borderColor',
          'component.input.error.borderColor',
          'component.input.disabled.backgroundColor',
          'semantic.typography.body1',
          'base.spacing[3]',
          'semantic.shadow.sm',
        ],
      },
      {
        name: 'Toggle Button',
        description: 'IconButton with variant="naked" positioned absolutely at right center, displays eye or eyeSlash icon based on visibility state',
        tokens: [
          'component.iconButton.variants.naked.backgroundColor',
          'component.iconButton.variants.naked.hover.backgroundColor',
          'base.spacing[2]',
        ],
      },
      {
        name: 'Helper Text / Error Message',
        description: 'Caption text providing guidance or showing errors. Error takes priority and uses role="alert" for announcements',
        tokens: [
          'semantic.typography.caption',
          'semantic.color.text.subdued',
          'semantic.color.text.error',
        ],
      },
    ],
  },
}
