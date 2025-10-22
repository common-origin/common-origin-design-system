# Testing Standards & Patterns

## Overview
This document defines comprehensive testing strategies for the Common Origin Design System, ensuring robust, accessible, and maintainable components.

## Core Testing Philosophy
- **Behavior over Implementation**: Test what users experience, not internal implementation details
- **Accessibility First**: Every component must pass automated and manual accessibility checks
- **Atomic Design Testing**: Different complexity levels require different testing approaches
- **Real User Scenarios**: Test components as they would be used in production

## Testing Architecture

### Element Selection Priority
1. **Semantic Roles** (preferred): `getByRole('button')`, `getByRole('textbox')`
2. **data-testid**: `getByTestId('component-name')` 
3. **Labels/Accessible Names**: `getByLabelText('Username')`
4. **Text Content**: `getByText('Submit')` (static content only)

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
**Focus**: Component composition, child component integration, complex interactions
```tsx
// Example: SearchInput molecule
describe('SearchInput Molecule', () => {
  // Mock child atoms
  jest.mock('../atoms/Input', () => ({
    Input: (props) => <input data-testid="mock-input" {...props} />
  }))
  
  jest.mock('../atoms/Button', () => ({
    Button: (props) => <button data-testid="mock-button" {...props} />
  }))
  
  // Test composition logic
  it('composes child atoms correctly', () => {
    renderSearchInput()
    expect(screen.getByTestId('mock-input')).toBeInTheDocument()
    expect(screen.getByTestId('mock-button')).toBeInTheDocument()
  })
  
  // Test molecule-specific behavior
  it('handles search submission', async () => {
    const onSearch = jest.fn()
    renderSearchInput({ onSearch })
    
    const input = screen.getByTestId('mock-input')
    const button = screen.getByTestId('mock-button')
    
    await userEvent.type(input, 'test query')
    await userEvent.click(button)
    
    expect(onSearch).toHaveBeenCalledWith('test query')
  })
})
```

### Organisms Testing
**Focus**: Complex workflows, state management, user journeys
```tsx
// Example: Navigation organism  
describe('Navigation Organism', () => {
  // Test complete user journeys
  it('handles complete navigation workflow', async () => {
    const onNavigate = jest.fn()
    renderNavigation({ onNavigate })
    
    // Test menu opening
    const menuButton = screen.getByRole('button', { name: /menu/i })
    await userEvent.click(menuButton)
    
    // Test navigation selection
    const homeLink = screen.getByRole('link', { name: /home/i })
    await userEvent.click(homeLink)
    
    expect(onNavigate).toHaveBeenCalledWith('/home')
  })
  
  // Test responsive behavior
  it('adapts to different viewport sizes', () => {
    // Test mobile vs desktop navigation patterns
  })
})
```

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
```tsx
describe('Design Token Integration', () => {
  it('applies semantic tokens correctly', () => {
    renderComponent({ variant: 'primary' })
    const element = screen.getByTestId('component')
    
    // Verify computed styles use expected tokens
    const styles = window.getComputedStyle(element)
    expect(styles.backgroundColor).toBe('rgb(0, 100, 200)') // Expected token value
  })
})
```

## Visual Regression Testing

### Setup Requirements
```bash
# Install visual testing dependencies
npm install --save-dev @storybook/test-runner chromatic
```

### Visual Test Structure
```tsx
// ComponentName.stories.tsx
export const AllVariants = () => (
  <Stack direction="column" gap="md">
    <Component variant="primary">Primary</Component>
    <Component variant="secondary">Secondary</Component>
    <Component variant="tertiary">Tertiary</Component>
  </Stack>
)

export const AllStates = () => (
  <Stack direction="row" gap="md">
    <Component>Default</Component>
    <Component disabled>Disabled</Component>
    <Component loading>Loading</Component>
  </Stack>
)

// Responsive testing
export const ResponsiveTest = () => (
  <div style={{ width: '100%', maxWidth: '1200px' }}>
    <Component>Responsive component</Component>
  </div>
)
```

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
├── ComponentName.test.tsx      # Unit tests
├── ComponentName.integration.test.tsx  # Integration tests  
├── ComponentName.stories.tsx   # Visual regression
└── ComponentName.docs.tsx      # Documentation
```

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

### Integration Test Setup
```tsx
// tests/integration/package-integration.test.ts
import { Button, Typography, Stack } from '@common-origin/design-system'

describe('Package Integration', () => {
  it('exports all expected components', () => {
    expect(Button).toBeDefined()
    expect(Typography).toBeDefined()
    expect(Stack).toBeDefined()
  })
  
  it('components work in consuming application', () => {
    render(
      <Stack direction="column" gap="md">
        <Typography variant="h1">Test</Typography>
        <Button variant="primary">Click me</Button>
      </Stack>
    )
    
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

This testing framework ensures comprehensive coverage, accessibility compliance, and reliable component behavior across all atomic design levels.