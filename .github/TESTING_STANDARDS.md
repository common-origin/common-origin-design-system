# Testing Standards & Patterns

## Overview
This document defines testing strategies for the Common Origin Design System. Accessibility requirements come from principle P2 in the [foundation](../docs/foundation/principles.md), which wins where this document disagrees.

## Core Testing Philosophy
- **Behavior over Implementation**: Test what users experience, not internal implementation details
- **Accessibility First**: Every component must pass automated and manual accessibility checks
- **Atomic Design Testing**: Different complexity levels require different testing approaches
- **Real User Scenarios**: Test components as they would be used in production

## Testing Architecture

### Element Selection Priority
1. **Semantic roles** (preferred): `getByRole('button', { name: 'Save' })`, `getByRole('textbox')`
2. **Labels**: `getByLabelText('Username')`
3. **Text content**: `getByText('Submit')` (static content only)
4. **data-testid**: `getByTestId('component-name')`, when nothing user-facing identifies the element

### Required Test Structure
```tsx
describe('ComponentName', () => {
  // 1. Setup & Utilities
  const defaultProps: ComponentProps = { /* */ }
  const renderComponent = (props: Partial<ComponentProps> = {}) => {
    return render(<Component {...defaultProps} {...props} />)
  }
  
  // 2. Core Functionality Tests
  describe('Basic Rendering', () => {
    it('renders without crashing')
    it('applies data-testid correctly') 
    it('renders children/content correctly')
  })
  
  // 3. Props & Variants Testing
  describe('Props Variants', () => {
    // Test all prop combinations systematically
  })
  
  // 4. User Interaction Testing
  describe('User Interactions', () => {
    // Click, keyboard, focus, form interactions
  })
  
  // 5. Accessibility Testing (MANDATORY)
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
    // ARIA attributes, keyboard navigation, screen readers
  })
  
  // 6. Edge Cases & Error States
  describe('Edge Cases', () => {
    // Empty props, invalid data, boundary conditions
  })
})
```

## Atomic Design Testing Strategies

### Atoms Testing
**Focus**: Props, variants, accessibility, basic interactions
```tsx
// Example: Button component
describe('Button Atom', () => {
  // Test all variants
  const variants = ['primary', 'secondary', 'tertiary'] as const
  variants.forEach(variant => {
    it(`renders ${variant} variant correctly`, () => {
      renderButton({ variant })
      expect(screen.getByRole('button')).toHaveClass(`button--${variant}`)
    })
  })
  
  // Test all sizes
  const sizes = ['small', 'medium', 'large'] as const
  sizes.forEach(size => {
    it(`applies ${size} size correctly`, () => {
      renderButton({ size })
      expect(screen.getByRole('button')).toHaveAttribute('data-size', size)
    })
  })
  
  // Accessibility testing for all combinations
  it('should have no accessibility violations across all variants', async () => {
    for (const variant of variants) {
      for (const size of sizes) {
        const { container, unmount } = renderButton({ variant, size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    }
  })
})
```

### Molecules Testing
**Focus**: composition and the behaviour the molecule adds. Render the real atoms rather than mocking them: the atoms are part of what users experience, and mocks hide integration bugs. Some older tests still mock atoms (for example ChipGroup and Dropdown); don't copy that in new tests.
```tsx
// Example: SearchField
it('calls onChange as the user types', async () => {
  const onChange = jest.fn()
  render(<SearchField aria-label="Search" value="" onChange={onChange} />)

  await userEvent.type(screen.getByRole('combobox', { name: 'Search' }), 'milk')

  expect(onChange).toHaveBeenCalled()
})
```

There is no organisms level in this system; the same approach applies to larger molecules such as Modal, Sheet or AgentInput (test the user journey: open, interact, close, focus return).

## Accessibility Testing Standards

### Automated Testing (Required)
```tsx
// Basic axe testing - REQUIRED for every component
it('should have no accessibility violations', async () => {
  const { container } = renderComponent()
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Comprehensive accessibility testing
describe('Accessibility Compliance', () => {
  it('should pass axe testing in all states', async () => {
    const states = [
      { props: {}, label: 'default' },
      { props: { disabled: true }, label: 'disabled' },
      { props: { variant: 'error' }, label: 'error state' }
    ]
    
    for (const { props, label } of states) {
      const { container, unmount } = renderComponent(props)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
      unmount()
    }
  })
  
  it('supports keyboard navigation', async () => {
    renderComponent()
    const element = screen.getByRole('button')
    
    // Test focus
    element.focus()
    expect(element).toHaveFocus()
    
    // Test keyboard activation
    await userEvent.keyboard('{Enter}')
    // Assert expected behavior
  })
  
  it('provides proper ARIA attributes', () => {
    renderComponent({ 'aria-label': 'Custom label' })
    const element = screen.getByRole('button')
    expect(element).toHaveAttribute('aria-label', 'Custom label')
  })
})
```

### Manual Testing Checklist
For complex interactions that can't be fully automated:
- [ ] Screen reader announces content correctly
- [ ] High contrast mode maintains visibility  
- [ ] Keyboard-only navigation flows logically
- [ ] Focus indicators are visible and clear
- [ ] Color is not the only way to convey information
- [ ] Text meets WCAG contrast requirements

## Integration Testing Patterns

### Cross-Component Integration
```tsx
// Test how atoms work within molecules
describe('Component Integration', () => {
  it('Button works correctly within Card', () => {
    render(
      <Card>
        <Button onClick={mockHandler}>Action</Button>
      </Card>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalled()
  })
})
```

### Design Token Integration
Assert against the token values from `tokens.json`, never against literal colours or sizes, so the test follows the tokens:
```tsx
import tokens from '@/styles/tokens.json'

it('uses the field label tokens', () => {
  render(<TextField label="Name" />)
  expect(screen.getByText('Name')).toHaveStyle({ color: tokens.component.field.label.color })
})
```

jsdom can't compute some properties (such as `grid-template-columns`) and doesn't evaluate media queries. For those, check the rules styled-components generated for the element's class, as `GridSystem.test.tsx` does.

## Visual Regression Testing

There are no visual regression tests, and no Storybook or Chromatic. Check visual changes on the docs site (`npm run docs:dev`) at the relevant widths, in both editorial and dense contexts (P9).

## Performance Testing

### Component Performance
```tsx
describe('Performance', () => {
  it('renders large lists efficiently', () => {
    const startTime = performance.now()
    
    render(
      <Stack>
        {Array.from({ length: 1000 }, (_, i) => (
          <Component key={i}>Item {i}</Component>
        ))}
      </Stack>
    )
    
    const endTime = performance.now()
    expect(endTime - startTime).toBeLessThan(100) // 100ms threshold
  })
})
```

## Error Handling Testing

### Component Error Boundaries
```tsx
describe('Error Handling', () => {
  it('handles invalid props gracefully', () => {
    // Suppress console.error for intentional error testing
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    expect(() => {
      render(<Component invalidProp="invalid" />)
    }).not.toThrow()
    
    consoleSpy.mockRestore()
  })
  
  it('provides meaningful error messages', () => {
    // Test error boundary integration if applicable
  })
})
```

## data-testid Implementation Standards

### Required Pattern
All components must support `'data-testid'?: string` prop:
```tsx
interface ComponentProps {
  'data-testid'?: string
  // other props
}

const Component = ({ 'data-testid': dataTestId, ...props }: ComponentProps) => (
  <div data-testid={dataTestId} {...props}>
    {/* component content */}
  </div>
)
```

### Testing data-testid Support
```tsx
describe('data-testid Support', () => {
  it('applies custom data-testid correctly', () => {
    renderComponent({ 'data-testid': 'custom-test-id' })
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument()
  })
  
  it('works without data-testid', () => {
    renderComponent()
    // Component should render normally without data-testid
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

## Test Organization Best Practices

### File Structure
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx      # All tests for the component, including jest-axe
├── ComponentName.docs.tsx      # Documentation
└── index.ts
```

Tests that cover a family of components live next to it, for example `src/components/molecules/fieldFamily.test.tsx`.

### Test Naming Conventions
- **Descriptive**: `it('renders primary variant with correct styling')`
- **Behavior-focused**: `it('calls onClick when button is clicked')`
- **User-centric**: `it('allows user to submit form with Enter key')`

## Anti-Patterns to Avoid

### ❌ Don't Test Implementation Details
```tsx
// Bad - testing internal state
expect(component.state.isOpen).toBe(true)

// Good - testing user-visible behavior  
expect(screen.getByText('Menu is open')).toBeInTheDocument()
```

### ❌ Don't Use Fragile Selectors
```tsx
// Bad - brittle selector
expect(container.querySelector('.css-123abc')).toBeInTheDocument()

// Good - semantic selector
expect(screen.getByRole('button')).toBeInTheDocument()
```

### ❌ Don't Skip Accessibility Testing
```tsx
// Always include accessibility tests
describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = renderComponent()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## Consumer Package Testing

Consumers are tested through the built package, not in Jest. After `npm run build:package`, `npm run verify:package` checks that:

- every import in the published `.d.ts` files resolves for consumers (`verify:types`)
- the bundle has no Next.js or docs-site imports (`verify:no-nextjs`)
- `'use client'` directives are in place (`verify:directives`) and the bundle loads (`verify:load`)
- a throwaway consumer project type-checks against the package under several module-resolution modes (`verify:consumer`)
- `package.json` and the exports are correct (`publint`, `attw`)

CI runs it on every PR.
