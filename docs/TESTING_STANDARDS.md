# Testing Standards with data-testid

## Overview

With the addition of `data-testid` props to our components, we can write more robust and maintainable tests. This document outlines our improved testing standards and patterns.

## Key Testing Principles

### 1. Element Selection Priority Order

Use this order when selecting elements in tests:

```tsx
// 1. Semantic roles (best for accessibility testing)
screen.getByRole('button', { name: /submit/i })

// 2. data-testid (stable, implementation-independent)  
screen.getByTestId('submit-button')

// 3. Labels and text (for form elements)
screen.getByLabelText('Email address')

// 4. Text content (avoid for dynamic content)
screen.getByText('Submit') // Only for static, unchanging text
```

**Why this order?**
- **Roles** ensure accessibility compliance
- **data-testid** provides stable, implementation-independent selectors
- **Text-based** queries are fragile if copy changes
- **CSS selectors** are implementation-dependent and discouraged

### 2. Required Test Pattern: data-testid Support

Every component should include a test verifying data-testid prop works:

```tsx
it('accepts custom data-testid', () => {
  renderComponent({ 'data-testid': 'custom-id' })
  expect(screen.getByTestId('custom-id')).toBeInTheDocument()
})
```

### 3. Atomic Design Testing Conventions

#### Atoms
Focus on fundamental behavior:
```tsx
describe('Button', () => {
  // Basic rendering and data-testid
  // Prop variants (size, variant, disabled)
  // Event handling (onClick)
  // Accessibility (roles, aria-labels, WCAG 2.2 AA compliance)
  // Edge cases
})
```

#### Molecules  
Test composition and interaction:
```tsx
describe('ChipGroup', () => {
  // Mock child components to focus on composition logic
  // Test data flow to children
  // Test variant prop propagation
  // Accessibility testing with jest-axe
  // Edge cases (empty arrays, special characters)
})
```

#### Organisms
Test workflows and state management:
```tsx
describe('Navigation', () => {
  // Complex user interactions
  // State changes
  // Integration with multiple child components
  // Comprehensive accessibility testing
})
```

### 4. Accessibility Testing with jest-axe

Every component must include automated accessibility testing using jest-axe to ensure WCAG 2.2 AA compliance:

```tsx
import { axe } from 'jest-axe'

describe('ComponentName', () => {
  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations in different states', async () => {
      const { container } = renderComponent({ variant: 'primary', disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
```

**WCAG 2.2 AA Requirements Covered:**
- Color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation and focus management
- Screen reader compatibility
- Semantic HTML structure
- Proper ARIA labels and roles
- Focus indicators and visual hierarchy

## Improved Test Patterns

### Before (Text-based, fragile)
```tsx
it('renders preview mode', () => {
  render(<Alert preview />)
  expect(screen.getByText(/This page is a preview/)).toBeInTheDocument()
})
```

### After (data-testid + semantic roles)
```tsx
it('renders preview mode correctly', () => {
  renderAlert({ preview: true, 'data-testid': 'preview-alert' })
  
  const alert = screen.getByTestId('preview-alert')
  expect(alert).toBeInTheDocument()
  expect(screen.getByText(/This page is a preview/)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /Exit preview mode/ })).toBeInTheDocument()
})
```

### Component Mocking for Molecules

When testing molecules, mock child atom components to focus on composition logic:

```tsx
// Mock child components
jest.mock('@/components/atoms', () => ({
  Chip: ({ title, variant }: { title: string; variant: string }) => (
    <span data-testid={`chip-${title.toLowerCase()}`} data-variant={variant}>
      {title}
    </span>
  ),
  Stack: ({ children, direction, gap }: any) => (
    <div data-testid="stack" data-direction={direction} data-gap={gap}>
      {children}
    </div>
  )
}))

// Then test the composition logic
it('applies variant consistently to all chips', () => {
  renderChipGroup({ variant: 'dark', labels: ['One', 'Two'] })
  
  expect(screen.getByTestId('chip-one')).toHaveAttribute('data-variant', 'dark')
  expect(screen.getByTestId('chip-two')).toHaveAttribute('data-variant', 'dark')
})
```

## Benefits of data-testid + jest-axe

1. **Stable Selectors**: Implementation changes don't break tests
2. **Clear Intent**: Explicit about what you're testing
3. **Better DX**: Easier to debug failed tests
4. **Maintainable**: Copy changes don't break tests
5. **Consistent**: Same pattern across all components
6. **Accessibility Compliance**: Automated WCAG 2.2 AA testing ensures inclusive design
7. **Regression Prevention**: Catch accessibility issues before they reach production

## Anti-Patterns to Avoid

❌ **Don't** rely solely on text content for dynamic elements:
```tsx
// BAD: Breaks if copy changes
expect(screen.getByText('Loading...')).toBeInTheDocument()
```

✅ **Do** use data-testid for dynamic content:
```tsx
// GOOD: Stable selector
expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
```

❌ **Don't** test styled-components implementation details:
```tsx
// BAD: Testing implementation, not behavior
expect(button).toHaveStyle('background-color: rgb(0, 123, 255)')
```

✅ **Do** test behavior and accessibility:
```tsx
// GOOD: Testing behavior and semantics
expect(screen.getByRole('button')).not.toBeDisabled()
expect(screen.getByTestId('primary-button')).toBeInTheDocument()
```

❌ **Don't** use arbitrary test IDs:
```tsx
// BAD: Meaningless ID
<Button data-testid="btn1">Submit</Button>
```

✅ **Do** use descriptive, consistent test IDs:
```tsx
// GOOD: Descriptive and follows convention
<Button data-testid="submit-button">Submit</Button>
```

❌ **Don't** skip accessibility testing:
```tsx
// BAD: No accessibility validation
it('renders button', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

✅ **Do** include automated accessibility testing:
```tsx
// GOOD: Includes WCAG compliance check
it('should not have accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Example Test Structure

```tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ComponentName, ComponentNameProps } from './ComponentName'

describe('ComponentName', () => {
  const defaultProps: ComponentNameProps = {
    // Minimal required props
  }

  const renderComponent = (props: Partial<ComponentNameProps> = {}) => {
    return render(<ComponentName {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent({ 'data-testid': 'component' })
      expect(screen.getByTestId('component')).toBeInTheDocument()
    })

    it('accepts custom data-testid', () => {
      renderComponent({ 'data-testid': 'custom-id' })
      expect(screen.getByTestId('custom-id')).toBeInTheDocument()
    })
  })

  describe('Props Variants', () => {
    // Test different prop combinations
  })

  describe('Component Behavior', () => {
    // Test interactions, state changes
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderComponent({ 'data-testid': 'component' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with different props', async () => {
      const { container } = renderComponent({ 
        'data-testid': 'component',
        variant: 'primary',
        disabled: true 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    // Test semantic roles, labels, keyboard navigation
  })

  describe('Edge Cases', () => {
    // Test error states, empty data, etc.
  })
})
```

This approach creates more maintainable, reliable tests that focus on user behavior rather than implementation details.