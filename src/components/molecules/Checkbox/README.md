# Checkbox Component

A fully accessible checkbox input component with integrated label, helper text, error messaging, and indeterminate state support.

## Features

- ✅ **WCAG 2.2 AA Compliant** - Full keyboard navigation and screen reader support
- 🎨 **Custom Styled** - Consistent design system styling with design tokens
- ♿ **Accessible** - ARIA attributes, focus management, and semantic HTML
- 📱 **Touch-Friendly** - 48px touch target (8px grid aligned)
- 🔄 **Indeterminate State** - Support for partial selection in "select all" scenarios
- 🎯 **Flexible Layout** - Configurable label positioning (left/right)
- 📝 **Integrated Messaging** - Built-in helper text and error display
- 🎛️ **Controlled/Uncontrolled** - Works in both modes
- 🔗 **Form Ready** - Proper form integration with name/value attributes

## Installation

```bash
npm install @common-origin/design-system
```

## Basic Usage

```tsx
import { Checkbox } from '@common-origin/design-system'
import { useState } from 'react'

function MyForm() {
  const [accepted, setAccepted] = useState(false)

  return (
    <Checkbox
      label="I accept the terms and conditions"
      checked={accepted}
      onChange={(e) => setAccepted(e.target.checked)}
      required
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | *required* | The label text displayed next to the checkbox |
| `checked` | `boolean` | `false` | Whether the checkbox is checked (controlled) |
| `indeterminate` | `boolean` | `false` | Whether in indeterminate state (partial selection) |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of label relative to checkbox |
| `helperText` | `string` | `undefined` | Helper text displayed below checkbox |
| `error` | `string` | `undefined` | Error message (enables error state) |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `onChange` | `(e: ChangeEvent) => void` | `undefined` | Callback when state changes |
| `required` | `boolean` | `false` | Whether the checkbox is required |
| `id` | `string` | auto-generated | Custom ID for the input element |
| `name` | `string` | `undefined` | Name attribute for form submission |
| `value` | `string` | `undefined` | Value attribute for form submission |
| `aria-describedby` | `string` | `undefined` | Additional ARIA description IDs |
| `ref` | `Ref<HTMLInputElement>` | `undefined` | Ref forwarded to input element |

## Examples

### With Helper Text

```tsx
<Checkbox
  label="Subscribe to newsletter"
  helperText="Get weekly updates about new features"
  checked={subscribed}
  onChange={(e) => setSubscribed(e.target.checked)}
/>
```

### Error State

```tsx
<Checkbox
  label="I agree to the privacy policy"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
  error={!agreed ? "You must agree to continue" : undefined}
  required
/>
```

### Indeterminate State (Select All)

```tsx
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, checked: true },
    { id: 2, checked: false },
    { id: 3, checked: true },
  ])

  const allChecked = items.every(item => item.checked)
  const someChecked = items.some(item => item.checked)
  const indeterminate = someChecked && !allChecked

  const handleSelectAll = (e) => {
    setItems(items.map(item => ({ ...item, checked: e.target.checked })))
  }

  return (
    <Checkbox
      label="Select all items"
      checked={allChecked}
      indeterminate={indeterminate}
      onChange={handleSelectAll}
    />
  )
}
```

### Label Positioning

```tsx
<Checkbox
  label="Enable feature"
  labelPosition="left"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
```

### Disabled State

```tsx
<Checkbox
  label="This option is unavailable"
  disabled
  checked={false}
/>
```

## Accessibility

### Keyboard Navigation

- **Tab** - Focus the checkbox
- **Space** - Toggle checked state
- **Shift + Tab** - Focus previous element

### Screen Readers

The checkbox announces:
- Label text
- Current state (checked, unchecked, or indeterminate)
- Whether it's required
- Associated helper text or error messages
- Changes to error state via `aria-live="polite"`

### ARIA Attributes

- `aria-invalid` - Set to true when error is present
- `aria-describedby` - Links to helper text and error messages
- `aria-required` - Reflects the required prop
- Native `indeterminate` property set on input element

### Color Contrast

- All states maintain WCAG 2.2 AA minimum contrast ratios (4.5:1)
- Focus outline is visible and meets 2px minimum thickness
- Error states use semantic error colors with sufficient contrast

### Touch Targets

- 48px minimum height for mobile accessibility
- Aligned to 8px grid system
- 24×24px visual checkbox with adequate spacing

## Design Tokens

The Checkbox component uses the following design tokens:

### Input Tokens (Shared)
- `component.input.default.*` - Default state styling
- `component.input.hover.*` - Hover state borders
- `component.input.focus.*` - Focus outline and offset
- `component.input.error.*` - Error state styling
- `component.input.disabled.*` - Disabled state styling

### Semantic Tokens
- `semantic.color.background.interactive` - Checked background color
- `semantic.color.text.inverse` - Checkmark color
- `semantic.color.text.error` - Error message color
- `semantic.color.text.subdued` - Helper text color
- `semantic.typography.small` - Helper/error text typography

### Base Tokens
- `base.spacing.1` - Gap between checkbox and helper text
- `base.spacing.3` - Gap between checkbox and label
- `base.spacing.9` - Left margin for helper text alignment

## Architecture

### Reusable SelectableInputBase

The Checkbox component uses a shared `SelectableInputBase` architecture that provides:
- Common styled components for checkbox/radio/switch inputs
- Consistent state management (default, error, disabled, focus)
- Shared design token integration
- 8px grid alignment

This base can be extended to create:
- **RadioButton** - Single selection from a group
- **Switch** - Toggle between two states
- **CheckboxGroup** - Multiple related checkboxes

### Component Structure

```
Checkbox/
├── SelectableInputBase.tsx    # Shared styled components
├── Checkbox.tsx                # Checkbox implementation
├── Checkbox.test.tsx           # 48 comprehensive tests
├── Checkbox.docs.tsx           # Documentation
├── README.md                   # This file
└── index.ts                    # Exports
```

## Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Checkbox
    name="terms"
    value="accepted"
    label="I accept the terms"
    checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)}
    required
  />
  <button type="submit">Submit</button>
</form>
```

## Testing

The component includes 48 comprehensive tests covering:
- Basic rendering and props
- Checked and indeterminate states
- User interactions (click, keyboard)
- Accessibility (jest-axe, ARIA, screen readers)
- Error and disabled states
- Label positioning
- Ref forwarding
- Edge cases

All tests pass with zero accessibility violations.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome for Android)
- Screen readers (NVDA, JAWS, VoiceOver)

## Future Enhancements

- CheckboxGroup component for grouped checkboxes
- RadioButton component using SelectableInputBase
- Switch component for toggle inputs
- Custom color variants
- Size variants (if needed)

## Related Components

- **TextField** - Text input with similar error/helper text patterns
- **RadioButton** - Coming soon, will use SelectableInputBase
- **Switch** - Coming soon, will use SelectableInputBase
- **CheckboxGroup** - Coming soon for multiple related checkboxes
