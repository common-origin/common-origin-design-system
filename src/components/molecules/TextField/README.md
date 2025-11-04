# TextField Component

A fully accessible text input component with label, helper text, error messaging, and comprehensive WCAG 2.2 AA compliance.

## Features

- ✅ **WCAG 2.2 AA Compliant** - Full accessibility with ARIA attributes and keyboard navigation
- 🎨 **Design Token Based** - All styling uses semantic and base design tokens
- 🔄 **Multiple Input Types** - Supports text, email, tel, url, and search
- 📝 **Helper Text** - Optional supplementary information for users
- ⚠️ **Error States** - Built-in error messaging with screen reader announcements
- ♿ **Screen Reader Friendly** - Proper label associations and live region announcements
- 🎯 **Focus Management** - Visible focus rings and keyboard navigation support
- 🔗 **Ref Forwarding** - Direct access to the underlying input element

## Installation

```bash
npm install @common-origin/design-system
```

## Basic Usage

```tsx
import { TextField } from '@common-origin/design-system'

function MyForm() {
  return (
    <TextField
      label="Email Address"
      type="email"
      helperText="We'll never share your email"
      required
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Visible label text associated with the input |
| `type` | `'text' \| 'email' \| 'tel' \| 'url' \| 'search'` | `'text'` | HTML input type |
| `helperText` | `string` | - | Supplementary text below input (hidden when error is shown) |
| `error` | `string` | - | Error message to display with role="alert" |
| `required` | `boolean` | `false` | Marks field as required with visual indicator |
| `disabled` | `boolean` | `false` | Disables user interaction |
| `id` | `string` | auto-generated | Unique identifier (auto-generated via useId if not provided) |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Initial value for uncontrolled usage |
| `onChange` | `function` | - | Change event handler |
| `onBlur` | `function` | - | Blur event handler |
| `onFocus` | `function` | - | Focus event handler |
| `autoComplete` | `string` | - | Browser autofill hint |
| `maxLength` | `number` | - | Maximum character length |
| `data-testid` | `string` | - | Test identifier |

All standard HTML input attributes are supported through `InputHTMLAttributes<HTMLInputElement>`.

## Examples

### Required Field

```tsx
<TextField
  label="Username"
  required
  helperText="Choose a unique username (3-20 characters)"
/>
```

### Error State

```tsx
<TextField
  label="Email"
  type="email"
  error="Please enter a valid email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Different Input Types

```tsx
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
```

### Disabled State

```tsx
<TextField
  label="Account ID"
  disabled
  value="ACC-123456"
  helperText="This field cannot be edited"
/>
```

### Form Validation Pattern

```tsx
function SignupForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  return (
    <TextField
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={(e) => validateEmail(e.target.value)}
      error={emailError}
      required
    />
  )
}
```

## Accessibility

### ARIA Attributes

- `aria-required="true"` when `required` prop is set
- `aria-invalid="true"` when `error` prop is set
- `aria-describedby` links helper text and error messages to input
- `role="alert"` on error messages for immediate screen reader announcements
- `aria-live="polite"` ensures error changes are announced

### Keyboard Navigation

- **Tab** - Focus the input field
- **Shift + Tab** - Move backwards
- All standard text editing shortcuts supported (Cmd/Ctrl + A, C, V, etc.)

### Screen Reader Behavior

When a user focuses the field, screen readers announce:
1. Label text
2. Required status (if applicable)
3. Helper text or error message
4. Current field value

Error messages are announced immediately when they appear due to `role="alert"`.

### Color Contrast

All states meet WCAG 2.2 AA standards:
- Text: 4.5:1 minimum contrast ratio
- Focus ring: Highly visible 2px border
- Error state: Distinct red color with semantic token

### Focus Management

- Clear 2px focus ring using `semantic.color.border.interactive`
- Focus ring visible on keyboard navigation
- Programmatic focus support via ref forwarding

## Design Tokens Used

### Typography
- `semantic.typography.body` - Input text
- `semantic.typography.label` - Label text
- `semantic.typography.caption` - Helper/error text

### Colors
- `semantic.color.text.default` - Primary text
- `semantic.color.text.subdued` - Helper text
- `semantic.color.text.error` - Error text and required indicator
- `semantic.color.background.subtle` - Input background
- `semantic.color.border.default` - Default border
- `semantic.color.border.interactive` - Focus border
- `semantic.color.border.strong` - Hover border
- `semantic.color.border.subtle` - Disabled border
- `semantic.color.border.error` - Error border

### Spacing & Layout
- `base.spacing[1]` - Vertical spacing between elements
- `base.spacing[2]` - Horizontal padding
- `base.spacing[3]` - Vertical padding

### Border & Motion
- `base.border.width[1]` - Border width
- `base.border.radius[2]` - Border radius
- `base.duration.normal` - Transition duration
- `base.easing.easeInOut` - Transition easing
- `base.opacity[60]` - Disabled state opacity

## Architecture

The TextField is built as a **molecule** component following atomic design principles. It's composed of:

1. **InputBase** - Shared styled components (`StyledInputBase`, `StyledTextAreaBase`) used by all text input variants
2. **Typography** - Atom component for label and helper text
3. **Stack** - Atom component for vertical layout

This architecture enables reusability for future variants:
- **TextArea** - Multi-line text input (uses `StyledTextAreaBase`)
- **PasswordInput** - Password field with show/hide toggle
- **NumberInput** - Numeric input with optional steppers

All variants share consistent styling, interaction states, and accessibility patterns through the `InputBase` components.

## Testing

The component includes comprehensive test coverage (42 tests):

```bash
npm test -- TextField.test.tsx
```

Test coverage includes:
- ✅ Basic rendering with all prop combinations
- ✅ All input types (text, email, tel, url, search)
- ✅ User interactions (typing, focus, blur, change events)
- ✅ All states (default, error, disabled, required)
- ✅ Accessibility validation with jest-axe (no violations)
- ✅ ARIA attribute correctness
- ✅ Keyboard navigation
- ✅ Screen reader announcements
- ✅ Ref forwarding
- ✅ Edge cases and error handling

## Related Components

- **InputBase** - Shared base components for text inputs
- **TextArea** _(coming soon)_ - Multi-line text input
- **PasswordInput** _(coming soon)_ - Password field with visibility toggle
- **NumberInput** _(coming soon)_ - Numeric input with optional steppers
- **Stack** - Layout component used internally
- **Typography** - Text component used for labels

## Component Status

- ✅ Stable
- ✅ WCAG 2.2 AA Compliant
- ✅ Production Ready
- ✅ Fully Tested (42 tests passing)
- ✅ Comprehensive Documentation

## Version

Added in v1.10.0
