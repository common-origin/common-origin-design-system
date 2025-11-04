# NumberInput

A fully accessible numeric input component with stepper buttons for incrementing and decrementing values. Supports min/max constraints, custom step values, decimals, and full keyboard navigation with WCAG 2.2 AA compliance.

## Installation

```bash
npm install @common-origin/design-system
```

## Usage

```tsx
import { NumberInput } from '@common-origin/design-system'

function MyComponent() {
  const [quantity, setQuantity] = useState<number | ''>(1)
  
  return (
    <NumberInput 
      label="Quantity"
      value={quantity}
      onChange={(newValue) => setQuantity(newValue)}
      min={1}
      max={100}
      step={1}
    />
  )
}
```

## Features

- ✅ **Stepper Buttons**: Up/down arrows for mouse/touch increment/decrement
- ✅ **Keyboard Navigation**: Arrow Up/Down keys for value adjustments
- ✅ **Min/Max Constraints**: Prevent values outside specified range
- ✅ **Custom Step Values**: Support for integers and decimals (0.1, 0.5, 5, 10, etc.)
- ✅ **Decimal Support**: Full support for floating-point numbers
- ✅ **Input Validation**: Blocks non-numeric characters automatically
- ✅ **Empty State**: Allows empty values for optional fields
- ✅ **WCAG 2.2 AA Compliant**: Full accessibility with ARIA attributes
- ✅ **Error Handling**: Built-in error message display
- ✅ **TypeScript**: Fully typed with comprehensive prop types

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `undefined` | Label text displayed above the input |
| `value` | `number \| ""` | `undefined` | Current value (controlled component) |
| `defaultValue` | `number \| ""` | `undefined` | Initial value (uncontrolled component) |
| `onChange` | `(value: number \| "", event: ChangeEvent) => void` | `undefined` | Callback fired when value changes |
| `min` | `number` | `undefined` | Minimum allowed value |
| `max` | `number` | `undefined` | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step value |
| `helperText` | `string` | `undefined` | Helper text below the input |
| `error` | `string` | `undefined` | Error message (overrides helperText) |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `id` | `string` | auto-generated | Unique identifier for the input |
| `aria-label` | `string` | `undefined` | Accessible label for screen readers |
| `data-testid` | `string` | `undefined` | Test identifier |

## Examples

### Basic Usage

```tsx
<NumberInput label="Quantity" />
```

### With Min/Max Constraints

```tsx
<NumberInput 
  label="Age" 
  min={0} 
  max={120}
  helperText="Enter your age (0-120)"
/>
```

### Decimal Values with Custom Step

```tsx
<NumberInput 
  label="Price" 
  step={0.01} 
  min={0}
  placeholder="0.00"
  helperText="Step by $0.01"
/>
```

### With Default Value

```tsx
<NumberInput 
  label="Quantity" 
  defaultValue={10}
  min={1}
  max={100}
/>
```

### Error State

```tsx
<NumberInput 
  label="Items" 
  value={quantity}
  onChange={setQuantity}
  error={quantity === '' ? "Quantity is required" : undefined}
  required
/>
```

### Disabled State

```tsx
<NumberInput 
  label="Locked Value" 
  defaultValue={42}
  disabled
/>
```

### Large Step Increments

```tsx
<NumberInput 
  label="Budget" 
  step={100}
  min={0}
  max={10000}
  helperText="Adjust in $100 increments"
/>
```

### Controlled Component

```tsx
function ControlledExample() {
  const [value, setValue] = useState<number | ''>(5)
  
  return (
    <NumberInput 
      label="Quantity"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      min={0}
      max={20}
    />
  )
}
```

### Uncontrolled Component

```tsx
function UncontrolledExample() {
  const ref = useRef<HTMLInputElement>(null)
  
  const handleSubmit = () => {
    console.log('Value:', ref.current?.value)
  }
  
  return (
    <NumberInput 
      ref={ref}
      label="Quantity"
      defaultValue={10}
    />
  )
}
```

## Accessibility

The NumberInput component follows WCAG 2.2 AA standards and includes:

### Screen Reader Support
- Uses `role="spinbutton"` for proper semantic identification
- Announces current value, min, max, and constraints
- Error messages announced via `role="alert"` and `aria-live="polite"`
- Helper text programmatically associated via `aria-describedby`
- Required fields marked with `aria-required`

### Keyboard Navigation
- **Tab**: Focus the input field
- **Arrow Up**: Increment value by step amount
- **Arrow Down**: Decrement value by step amount
- **Type**: Enter numeric values directly
- Stepper buttons have `tabIndex={-1}` to avoid disrupting tab order

### Visual Requirements
- Minimum 24px height for stepper buttons (adequate touch targets)
- 4.5:1 color contrast ratio on all text
- 2px minimum focus outline thickness
- Clear visual indicators for disabled and error states
- Required field indicator (asterisk)

### Touch/Mouse Support
- Stepper buttons clickable with mouse or touch
- Minimum 24px touch target height
- Clear hover states for interactive elements

### ARIA Attributes
```tsx
aria-valuemin={min}
aria-valuemax={max}
aria-valuenow={currentValue}
aria-invalid={hasError}
aria-describedby="helper-text-id error-id"
aria-required={required}
aria-label={label}
```

## Design Tokens

The NumberInput component uses the following design tokens from the Common Origin Design System:

### Input Tokens (from InputBase)
- `component.input.default.*` - Default state styling
- `component.input.focus.*` - Focus state styling
- `component.input.hover.*` - Hover state styling
- `component.input.error.*` - Error state styling
- `component.input.disabled.*` - Disabled state styling
- `component.input.placeholder.*` - Placeholder text styling

### Typography & Spacing
- `semantic.typography.label` - Label text style
- `semantic.typography.small` - Helper text style
- `base.spacing.*` - Spacing tokens
- `base.fontWeight.5` - Required indicator weight

### Colors
- `semantic.color.text.default` - Default text
- `semantic.color.text.subdued` - Helper text
- `semantic.color.text.error` - Error messages
- `semantic.color.text.disabled` - Disabled state

## Architecture

NumberInput builds on the shared `InputBase` component pattern used across text-based form controls:

```
NumberInput
├── InputBase (shared styled input)
├── IconButton (arrowUp/arrowDown steppers)
├── Typography (label and helper text)
└── Design tokens (consistent styling)
```

This architecture ensures:
- Consistent styling across all input components
- Shared validation and error handling patterns
- Reusable accessibility implementations
- Type-safe prop interfaces

## Validation

The NumberInput automatically validates input:

1. **Character Filtering**: Only allows numeric characters, minus sign, and decimal point
2. **Min/Max Enforcement**: Prevents stepper buttons from exceeding constraints
3. **Manual Input**: Users can type values outside min/max (for validation on blur/submit)
4. **Empty Values**: Supports empty state for optional fields

```tsx
// Manual validation example
const [value, setValue] = useState<number | ''>(0)
const [error, setError] = useState('')

const handleChange = (newValue: number | '') => {
  setValue(newValue)
  
  if (newValue === '') {
    setError('Value is required')
  } else if (newValue < 1 || newValue > 10) {
    setError('Value must be between 1 and 10')
  } else {
    setError('')
  }
}

<NumberInput 
  label="Items"
  value={value}
  onChange={handleChange}
  error={error}
  min={1}
  max={10}
/>
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Assistive technologies (NVDA, JAWS, VoiceOver)

## Related Components

- **TextField**: For text input
- **Checkbox**: For boolean selection
- **Dropdown**: For selecting from options

## Future Enhancements

Potential improvements for future versions:

- **Currency Input**: Dedicated component with prefix/suffix and formatting
- **Button Hold/Repeat**: Continuous increment/decrement when holding stepper buttons
- **Mouse Wheel Support**: Optional mouse wheel scrolling (disabled by default)
- **Thousands Separators**: Optional number formatting
- **Scientific Notation**: Support for very large/small numbers
- **Unit Suffix**: Display units (kg, m, etc.)

## Contributing

See the main [DOCUMENTATION_STANDARDS.md](../../../.github/DOCUMENTATION_STANDARDS.md) for guidelines on contributing to this component.

## Testing

The NumberInput component has 58 comprehensive tests covering:
- Basic rendering
- Value handling (numeric, decimal, negative)
- Increment/decrement functionality
- Min/max constraints
- Keyboard navigation
- Disabled states
- Error states
- Controlled/uncontrolled modes
- Accessibility (0 jest-axe violations)
- Ref forwarding
- Edge cases
- HTML attribute forwarding

Run tests:
```bash
npm test NumberInput.test.tsx
```
