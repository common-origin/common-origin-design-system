import type { ComponentDocumentation } from '@/lib/docgen/types'
import { NumberInput } from './NumberInput'

export const numberInputDocs: ComponentDocumentation = {
  id: 'number-input',
  name: 'NumberInput',
  description: 'A numeric input field with stepper buttons for incrementing and decrementing values, with full WCAG 2.2 AA compliance.',
  category: 'Molecules',
  
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Label text displayed above the input field',
    },
    {
      name: 'value',
      type: 'number | ""',
      required: false,
      default: undefined,
      description: 'Current value for controlled component. Can be a number or empty string.',
    },
    {
      name: 'defaultValue',
      type: 'number | ""',
      required: false,
      default: undefined,
      description: 'Default value for uncontrolled component',
    },
    {
      name: 'onChange',
      type: '(value: number | "", event: ChangeEvent<HTMLInputElement>) => void',
      required: false,
      default: undefined,
      description: 'Callback function fired when the value changes. Receives the new numeric value or empty string.',
    },
    {
      name: 'min',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Minimum allowed value. Prevents decrementing below this value.',
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Maximum allowed value. Prevents incrementing above this value.',
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: '1',
      description: 'Increment/decrement step value. Supports decimals (e.g., 0.1, 0.5, 5).',
    },
    {
      name: 'helperText',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Helper text displayed below the input to provide additional guidance',
    },
    {
      name: 'error',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Error message to display. Overrides helper text when present.',
    },
    {
      name: 'required',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the field is required. Adds visual indicator and ARIA attributes.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the input is disabled. Prevents all interaction.',
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Placeholder text shown when the input is empty',
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      default: 'auto-generated',
      description: 'Unique identifier for the input. Auto-generated if not provided.',
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Accessible label for screen readers. Falls back to label prop.',
    },
  ],
  
  tokens: [
    // InputBase tokens
    'component.input.default.font',
    'component.input.default.textColor',
    'component.input.default.backgroundColor',
    'component.input.default.borderColor',
    'component.input.default.borderWidth',
    'component.input.default.borderRadius',
    'component.input.default.paddingX',
    'component.input.default.paddingY',
    'component.input.placeholder.textColor',
    'component.input.focus.borderColor',
    'component.input.focus.outline',
    'component.input.focus.outlineOffset',
    'component.input.hover.borderColor',
    'component.input.error.borderColor',
    'component.input.error.focus.borderColor',
    'component.input.error.hover.borderColor',
    'component.input.disabled.textColor',
    'component.input.disabled.backgroundColor',
    'component.input.disabled.borderColor',
    
    // Typography & spacing
    'semantic.typography.label',
    'semantic.typography.small',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.text.error',
    'semantic.color.text.disabled',
    'base.spacing.1',
    'base.spacing.2',
    'base.spacing.10',
    'base.fontWeight.5',
  ],
  
  examples: [
    {
      name: 'Basic Usage',
      description: 'A simple number input with label',
      code: `<NumberInput label="Quantity" />`,
      renderComponent: () => (
        <NumberInput label="Quantity" />
      ),
    },
    {
      name: 'With Min and Max',
      description: 'Number input constrained between minimum and maximum values',
      code: `<NumberInput 
  label="Age" 
  min={0} 
  max={120}
  helperText="Enter your age (0-120)"
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Age" 
          min={0} 
          max={120}
          helperText="Enter your age (0-120)"
        />
      ),
    },
    {
      name: 'With Custom Step',
      description: 'Number input with custom increment/decrement step value',
      code: `<NumberInput 
  label="Price" 
  step={0.01} 
  min={0}
  placeholder="0.00"
  helperText="Step by $0.01"
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Price" 
          step={0.01} 
          min={0}
          placeholder="0.00"
          helperText="Step by $0.01"
        />
      ),
    },
    {
      name: 'With Default Value',
      description: 'Number input with an initial default value',
      code: `<NumberInput 
  label="Quantity" 
  defaultValue={10}
  min={1}
  max={100}
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Quantity" 
          defaultValue={10}
          min={1}
          max={100}
        />
      ),
    },
    {
      name: 'Error State',
      description: 'Number input showing validation error',
      code: `<NumberInput 
  label="Items" 
  error="Quantity must be between 1 and 10"
  required
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Items" 
          error="Quantity must be between 1 and 10"
          required
        />
      ),
    },
    {
      name: 'Disabled State',
      description: 'Number input in disabled state',
      code: `<NumberInput 
  label="Locked Value" 
  defaultValue={42}
  disabled
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Locked Value" 
          defaultValue={42}
          disabled
        />
      ),
    },
    {
      name: 'Large Step Increments',
      description: 'Number input with larger step values for quick adjustments',
      code: `<NumberInput 
  label="Budget" 
  step={100}
  min={0}
  max={10000}
  helperText="Adjust in $100 increments"
/>`,
      renderComponent: () => (
        <NumberInput 
          label="Budget" 
          step={100}
          min={0}
          max={10000}
          helperText="Adjust in $100 increments"
        />
      ),
    },
  ],
  
  accessibility: {
    notes: [
      'Uses semantic HTML with role="spinbutton" for proper screen reader identification',
      'All interactive elements meet WCAG 2.2 AA contrast requirements (4.5:1 minimum)',
      'Stepper buttons are minimum 24px height for adequate touch targets',
      'Full keyboard navigation support with Arrow Up/Down keys',
      'Error messages are announced to screen readers via role="alert" and aria-live="polite"',
      'Proper ARIA attributes: aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-describedby',
      'Helper text and errors are programmatically associated with input via aria-describedby',
      'Required fields marked with aria-required and visual indicator',
      'Label properly associated with input via htmlFor/id relationship',
      'Stepper buttons have tabIndex={-1} to prevent tab order disruption',
      'Focus outline visible and meets 2px minimum thickness requirement',
    ],
    keyboardNavigation: 'Tab to focus input, Arrow Up to increment, Arrow Down to decrement, click stepper buttons for mouse/touch input. Stepper buttons are excluded from tab order.',
    screenReader: 'Announces label, current value, min/max constraints, required status, error messages, and helper text. Value changes are announced as user types or uses steppers.',
  },
  
  anatomy: {
    description: 'A number input consists of a label, text input field, stepper buttons, and optional helper text or error message',
    diagram: `
┌─────────────────────────────────────┐
│ Label (optional) *                  │
├─────────────────────────────────────┤
│ Input Container                     │
│ ┌───────────────────────┬─────────┐ │
│ │ Text Input            │ ┌─────┐ │ │
│ │                       │ │  ↑  │ │ │ Increment Button
│ │                       │ ├─────┤ │ │
│ │                       │ │  ↓  │ │ │ Decrement Button
│ │                       │ └─────┘ │ │
│ └───────────────────────┴─────────┘ │
├─────────────────────────────────────┤
│ Helper Text / Error (optional)      │
└─────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Label',
        description: 'Optional label text with required indicator if needed. Uses semantic typography token.',
        tokens: ['semantic.typography.label', 'semantic.color.text.default'],
      },
      {
        name: 'Input Field',
        description: 'Text input using InputBase with type="text" and inputMode="decimal" for optimal mobile keyboard. Extra padding on right for stepper buttons.',
        tokens: [
          'component.input.default.font',
          'component.input.default.paddingX',
          'component.input.default.paddingY',
          'component.input.default.backgroundColor',
          'component.input.default.borderColor',
          'component.input.default.borderRadius',
          'base.spacing.10',
        ],
      },
      {
        name: 'Stepper Container',
        description: 'Absolute positioned container on right side of input holding increment/decrement buttons',
        tokens: ['base.spacing.1'],
      },
      {
        name: 'Stepper Buttons',
        description: 'IconButton components with arrowUp/arrowDown icons. Minimum 24px height each. Disabled when min/max constraints are reached.',
        tokens: [],
      },
      {
        name: 'Helper Text / Error',
        description: 'Optional helper text or error message below input. Error has role="alert" for screen reader announcements.',
        tokens: ['semantic.typography.small', 'semantic.color.text.subdued', 'semantic.color.text.error'],
      },
    ],
  },
}
