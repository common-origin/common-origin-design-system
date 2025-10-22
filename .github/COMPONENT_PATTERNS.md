# Component Creation Patterns

## Overview
This document provides comprehensive patterns and standards for creating robust, accessible, and maintainable components in the Common Origin Design System.

## Component Architecture Fundamentals

### Atomic Design Decision Matrix
```
Component Type | Complexity | Dependencies | Usage Pattern
-------------- | ---------- | ------------ | -------------
Atom          | Single responsibility | None (pure) | Building blocks
Molecule      | Combines 2-5 atoms | Atom dependencies | Specific UI patterns  
Organism      | Complex functionality | Molecules + atoms | Complete UI sections
Layout        | Structural/responsive | Any level | Page organization
```

### Component Creation Checklist
- [ ] **Atomic Level**: Correctly categorized by complexity
- [ ] **TypeScript Interface**: Complete props with JSDoc descriptions
- [ ] **Design Tokens**: All styling uses semantic tokens
- [ ] **Accessibility**: WCAG 2.2 AA compliance built-in
- [ ] **Testing**: Comprehensive test coverage including jest-axe
- [ ] **Documentation**: .docs.tsx with examples and usage patterns
- [ ] **data-testid**: Support for testing selectors
- [ ] **Export Chain**: Properly exported through index files

## Component File Structure Pattern

### Standard Component Directory
```
ComponentName/
├── ComponentName.tsx        # Main implementation
├── ComponentName.docs.tsx   # Documentation & examples
├── ComponentName.test.tsx   # Comprehensive tests
└── index.ts                # Clean exports
```

### Export Pattern (Required)
```tsx
// index.ts - Clean re-export
export * from './ComponentName'
```

## TypeScript Interface Patterns

### Complete Props Interface Template
```tsx
import { ReactNode } from 'react'

/**
 * Props for ComponentName component
 */
interface ComponentNameProps {
  /**
   * Main content or children to render
   */
  children?: ReactNode
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'emphasis' | 'subtle'
  
  /**
   * Size of the component
   * @default 'medium' 
   */
  size?: 'small' | 'medium' | 'large'
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean
  
  /**
   * Click handler for interactive elements
   */
  onClick?: () => void
  
  /**
   * Additional CSS classes (use sparingly)
   */
  className?: string
  
  /**
   * Test identifier for automated testing
   */
  'data-testid'?: string
  
  /**
   * Additional HTML attributes
   */
  [key: string]: any
}

// Always export the interface
export type { ComponentNameProps }
```

### Polymorphic Component Pattern
For components that can render as different HTML elements:
```tsx
import { ElementType, ComponentPropsWithoutRef } from 'react'

interface ComponentNameOwnProps {
  variant?: 'default' | 'emphasis'
  size?: 'small' | 'medium' | 'large'
  'data-testid'?: string
}

type ComponentNameProps<T extends ElementType = 'div'> = {
  as?: T
} & ComponentNameOwnProps & 
  Omit<ComponentPropsWithoutRef<T>, keyof ComponentNameOwnProps>

const ComponentName = <T extends ElementType = 'div'>({
  as,
  variant = 'default',
  size = 'medium',
  'data-testid': dataTestId,
  ...props
}: ComponentNameProps<T>) => {
  const Element = as || 'div'
  
  return (
    <StyledComponent
      as={Element}
      $variant={variant}
      $size={size}
      data-testid={dataTestId}
      {...props}
    />
  )
}
```

## Styled Components Best Practices

### shouldForwardProp Pattern (Required)
Prevent $ prefixed props from reaching DOM:
```tsx
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens

interface StyledProps {
  $variant: 'default' | 'emphasis' | 'subtle'
  $size: 'small' | 'medium' | 'large'
  $disabled?: boolean
}

const StyledComponent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledProps>`
  /* Base styles using semantic tokens */
  padding: ${({ $size }) => {
    switch ($size) {
      case 'small': return semantic.spacing.component.sm
      case 'large': return semantic.spacing.component.lg  
      default: return semantic.spacing.component.md
    }
  }};
  
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case 'emphasis': return semantic.color.background.emphasis
      case 'subtle': return semantic.color.background.subtle
      default: return semantic.color.background.default
    }
  }};
  
  color: ${semantic.color.text.default};
  border-radius: ${semantic.border.radius.md};
  
  /* Responsive behavior */
  @media (min-width: ${semantic.breakpoint.md}) {
    padding: ${({ $size }) => {
      switch ($size) {
        case 'small': return semantic.spacing.component.md
        case 'large': return semantic.spacing.component.xl
        default: return semantic.spacing.component.lg
      }
    }};
  }
  
  /* State variants */
  ${({ $disabled }) => $disabled && `
    opacity: ${semantic.opacity.disabled};
    cursor: not-allowed;
  `}
  
  /* Interaction states */
  &:hover:not(:disabled) {
    background-color: ${semantic.color.background.hover};
  }
  
  &:focus-visible {
    outline: 2px solid ${semantic.color.border.focus};
    outline-offset: 2px;
  }
`
```

### Design Token Integration Pattern
```tsx
// ✅ Always use semantic tokens
const StyledButton = styled.button`
  font: ${semantic.typography.button1};
  color: ${semantic.color.text.interactive};
  background: ${semantic.color.background.interactive};
  border: 1px solid ${semantic.color.border.interactive};
  border-radius: ${semantic.border.radius.md};
  padding: ${semantic.spacing.component.md} ${semantic.spacing.component.lg};
`

// ⚠️ Only for creating new semantic tokens
const newSemanticToken = {
  color: {
    background: {
      custom: base.color.blue[500]
    }
  }
}

// ❌ Never use hardcoded values
const BadComponent = styled.div`
  color: #333333;        /* NO */
  padding: 16px;         /* NO */
  font-size: 14px;       /* NO */
`
```

## Accessibility Implementation Patterns

### ARIA Attributes Pattern
```tsx
const AccessibleButton = ({
  children,
  variant = 'default',
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'data-testid': dataTestId,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      type="button"
      role="button"
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled}
      disabled={disabled}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
```

### Keyboard Navigation Pattern
```tsx
const KeyboardNavigableComponent = ({ onSelect, items, ...props }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(Math.max(0, focusedIndex - 1))
        break
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(Math.min(items.length - 1, focusedIndex + 1))
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        onSelect?.(items[focusedIndex])
        break
    }
  }
  
  return (
    <div onKeyDown={handleKeyDown} role="listbox" aria-label="Select option">
      {items.map((item, index) => (
        <div
          key={item.id}
          role="option"
          aria-selected={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
```

### Focus Management Pattern
```tsx
const ModalComponent = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement>()
  
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus modal
      modalRef.current?.focus()
      
      // Trap focus within modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
        }
        // Add focus trap logic
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    } else {
      // Restore previous focus
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
    >
      {children}
    </div>
  )
}
```

## Component Composition Patterns

### Compound Components Pattern
For complex components with multiple related parts:
```tsx
// Card with compound components
const Card = ({ children, variant = 'default', ...props }) => (
  <StyledCard $variant={variant} {...props}>
    {children}
  </StyledCard>
)

const CardHeader = ({ children, ...props }) => (
  <StyledCardHeader {...props}>
    {children}
  </StyledCardHeader>
)

const CardContent = ({ children, ...props }) => (
  <StyledCardContent {...props}>
    {children}
  </StyledCardContent>
)

const CardActions = ({ children, ...props }) => (
  <StyledCardActions {...props}>
    {children}
  </StyledCardActions>
)

// Attach sub-components
Card.Header = CardHeader
Card.Content = CardContent
Card.Actions = CardActions

export { Card }

// Usage:
// <Card>
//   <Card.Header>Title</Card.Header>
//   <Card.Content>Content here</Card.Content>
//   <Card.Actions>
//     <Button>Action</Button>
//   </Card.Actions>
// </Card>
```

### Render Props Pattern
For flexible, reusable logic:
```tsx
interface RenderPropComponentProps {
  children: (state: ComponentState) => ReactNode
  initialValue?: string
}

const RenderPropComponent = ({ children, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(true)
  
  const handleChange = (newValue: string) => {
    setValue(newValue)
    setIsValid(newValue.length > 0)
  }
  
  return (
    <div>
      {children({ value, isValid, onChange: handleChange })}
    </div>
  )
}

// Usage:
// <RenderPropComponent>
//   {({ value, isValid, onChange }) => (
//     <input value={value} onChange={e => onChange(e.target.value)} />
//   )}
// </RenderPropComponent>
```

## Event Handling Patterns

### Standard Event Props
```tsx
interface InteractiveComponentProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
  onChange?: (value: string) => void
}
```

### Custom Event Handling
```tsx
const CustomComponent = ({ onChange, onValidate, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isValid = validateValue(value)
    
    // Call both handlers with appropriate data
    onChange?.(value)
    onValidate?.(isValid, value)
  }
  
  return (
    <input onChange={handleChange} {...props} />
  )
}
```

## Responsive Design Patterns

### Responsive Props Pattern
```tsx
interface ResponsiveProps {
  direction?: 'row' | 'column' | { sm: 'row', md: 'column' }
  gap?: 'sm' | 'md' | 'lg' | { sm: 'sm', md: 'lg' }
}

const ResponsiveComponent = ({ direction = 'row', gap = 'md' }) => {
  const getResponsiveValue = (prop: any, size: string) => {
    return typeof prop === 'object' ? prop[size] || prop.default : prop
  }
  
  return (
    <StyledComponent
      $direction={direction}
      $gap={gap}
    >
      {/* content */}
    </StyledComponent>
  )
}

const StyledComponent = styled.div<{
  $direction: ResponsiveProps['direction']
  $gap: ResponsiveProps['gap']
}>`
  display: flex;
  flex-direction: ${({ $direction }) => 
    typeof $direction === 'string' ? $direction : 'row'
  };
  gap: ${({ $gap }) => {
    const gapValue = typeof $gap === 'string' ? $gap : 'md'
    return semantic.spacing.layout[gapValue]
  }};
  
  @media (min-width: ${semantic.breakpoint.sm}) {
    flex-direction: ${({ $direction }) =>
      typeof $direction === 'object' ? $direction.sm || 'row' : $direction
    };
    gap: ${({ $gap }) => {
      const gapValue = typeof $gap === 'object' ? $gap.sm || 'md' : $gap
      return semantic.spacing.layout[gapValue]
    }};
  }
`
```

## Error Handling Patterns

### Graceful Prop Handling
```tsx
const SafeComponent = ({ variant, size, children, ...props }) => {
  // Validate and provide fallbacks
  const safeVariant = ['default', 'emphasis', 'subtle'].includes(variant) 
    ? variant 
    : 'default'
    
  const safeSize = ['small', 'medium', 'large'].includes(size)
    ? size
    : 'medium'
  
  // Warn in development
  if (process.env.NODE_ENV === 'development') {
    if (variant && variant !== safeVariant) {
      console.warn(`Invalid variant "${variant}" provided to Component. Using "default".`)
    }
  }
  
  return (
    <StyledComponent
      $variant={safeVariant}
      $size={safeSize}
      {...props}
    >
      {children}
    </StyledComponent>
  )
}
```

### Error Boundary Integration
```tsx
const ComponentWithErrorBoundary = (props) => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Component {...props} />
    </ErrorBoundary>
  )
}
```

## Performance Optimization Patterns

### Memo Usage
```tsx
import { memo, useMemo } from 'react'

const ExpensiveComponent = memo(({ items, onSelect }) => {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: expensiveCalculation(item)
    }))
  }, [items])
  
  return (
    <div>
      {processedItems.map(item => (
        <div key={item.id} onClick={() => onSelect(item)}>
          {item.processed}
        </div>
      ))}
    </div>
  )
})
```

### Ref Forwarding Pattern
```tsx
import { forwardRef } from 'react'

const ForwardRefComponent = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant, children, ...props }, ref) => {
    return (
      <StyledComponent ref={ref} $variant={variant} {...props}>
        {children}
      </StyledComponent>
    )
  }
)

ForwardRefComponent.displayName = 'ForwardRefComponent'
```

## Component Documentation Template

### .docs.tsx Structure
```tsx
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { ComponentName } from './ComponentName'

export const componentNameDocs: ComponentDocumentation = {
  id: 'component-name',
  name: 'Component Name',
  description: 'Brief description of what this component does and when to use it.',
  category: 'Atoms', // or 'Molecules', 'Organisms', 'Layout'
  
  props: [
    {
      name: 'variant',
      type: "'default' | 'emphasis' | 'subtle'",
      required: false,
      default: 'default',
      description: 'Visual style variant of the component'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: 'medium',
      description: 'Size of the component affecting padding and typography'
    },
    {
      name: 'children',
      type: 'ReactNode',
      required: false,
      description: 'Content to display within the component'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing'
    }
  ],
  
  tokens: [
    'semantic.color.background.default',
    'semantic.color.text.default',
    'semantic.spacing.component.md',
    'semantic.border.radius.md'
  ],
  
  examples: [
    {
      name: 'Basic Usage',
      description: 'Default component with basic content',
      code: `<ComponentName>Basic content</ComponentName>`,
      renderComponent: () => <ComponentName>Basic content</ComponentName>
    },
    {
      name: 'All Variants',
      description: 'All available visual variants',
      code: `<Stack direction="column" gap="md">
  <ComponentName variant="default">Default variant</ComponentName>
  <ComponentName variant="emphasis">Emphasis variant</ComponentName>
  <ComponentName variant="subtle">Subtle variant</ComponentName>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <ComponentName variant="default">Default variant</ComponentName>
          <ComponentName variant="emphasis">Emphasis variant</ComponentName>
          <ComponentName variant="subtle">Subtle variant</ComponentName>
        </Stack>
      )
    },
    {
      name: 'Size Options',
      description: 'Different sizes available',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <ComponentName size="small">Small</ComponentName>
  <ComponentName size="medium">Medium</ComponentName>
  <ComponentName size="large">Large</ComponentName>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <ComponentName size="small">Small</ComponentName>
          <ComponentName size="medium">Medium</ComponentName>
          <ComponentName size="large">Large</ComponentName>
        </Stack>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses semantic HTML elements for proper screen reader support',
      'Maintains sufficient color contrast in all variants',
      'Supports keyboard navigation and focus management',
      'WCAG 2.2 AA compliant with automated jest-axe testing',
      'Provides appropriate ARIA attributes for interactive elements'
    ],
    keyboardNavigation: 'Tab to focus, Enter/Space to activate',
    screenReader: 'Announces content and state changes clearly'
  },
  
  anatomy: {
    description: 'Visual breakdown of component structure',
    parts: [
      { name: 'Container', description: 'Main wrapper element with background and padding' },
      { name: 'Content', description: 'Inner content area with proper typography' }
    ]
  }
}
```

This comprehensive pattern system ensures consistent, accessible, and maintainable component development across the entire design system.