# Accessibility Guidelines & Implementation

## Overview
Comprehensive accessibility guidelines for the Common Origin Design System, ensuring WCAG 2.2 AA compliance and inclusive user experiences across all components.

## Accessibility Philosophy

### Core Principles
- **Inclusive by Default**: Every component must be accessible without additional configuration
- **Progressive Enhancement**: Components work with assistive technologies out of the box
- **Semantic First**: Use semantic HTML elements and ARIA attributes appropriately
- **Keyboard Navigation**: Full functionality available via keyboard
- **Screen Reader Friendly**: Clear, descriptive content for assistive technologies

### WCAG 2.2 AA Compliance Requirements
All components must meet or exceed:
- **Perceivable**: Information presented in ways users can perceive
- **Operable**: Interface components and navigation are operable
- **Understandable**: Information and UI operation is understandable
- **Robust**: Content can be interpreted by assistive technologies

## Automated Testing Integration

### Jest-Axe Configuration (Required)
Every component test must include accessibility validation:
```tsx
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('ComponentName Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ComponentName />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
  
  // Test all component states
  it('should pass accessibility in all states', async () => {
    const states = [
      { props: {}, label: 'default' },
      { props: { disabled: true }, label: 'disabled' },
      { props: { error: true }, label: 'error state' }
    ]
    
    for (const { props, label } of states) {
      const { container, unmount } = render(<ComponentName {...props} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
      unmount()
    }
  })
})
```

### Accessibility Test Checklist
- [ ] jest-axe validation passes in all component states
- [ ] Keyboard navigation works correctly
- [ ] Focus management is appropriate
- [ ] ARIA attributes are correctly implemented
- [ ] Color contrast meets WCAG AA standards (4.5:1 normal, 3:1 large text)
- [ ] Content is readable by screen readers
- [ ] Interactive elements have accessible names

## Semantic HTML Patterns

### Element Selection Guidelines
```tsx
// ✅ Use semantic HTML elements
const NavigationComponent = () => (
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
)

// ✅ Use headings hierarchically  
const ContentSection = () => (
  <section>
    <h2>Section Title</h2>
    <h3>Subsection</h3>
    <p>Content...</p>
  </section>
)

// ❌ Avoid generic divs for semantic content
const BadNavigation = () => (
  <div className="nav">
    <div className="nav-item">Home</div>
  </div>
)
```

### Landmark Regions
```tsx
const PageLayout = () => (
  <>
    <header role="banner">
      <h1>Site Title</h1>
      <nav aria-label="Main navigation">...</nav>
    </header>
    
    <main role="main">
      <section aria-labelledby="main-heading">
        <h1 id="main-heading">Page Title</h1>
        <article>...</article>
      </section>
    </main>
    
    <aside role="complementary" aria-label="Related information">
      <h2>Related Links</h2>
    </aside>
    
    <footer role="contentinfo">
      <p>Copyright information</p>
    </footer>
  </>
)
```

## ARIA Attributes Implementation

### Interactive Elements
```tsx
const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
    aria-describedby={ariaDescribedBy}
    aria-disabled={disabled}
    {...props}
  >
    {children}
  </button>
)
```

### Form Controls
```tsx
const AccessibleInput = ({
  label,
  error,
  helperText,
  required = false,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  const helperId = helperText ? `${inputId}-helper` : undefined
  
  const describedBy = [errorId, helperId].filter(Boolean).join(' ')
  
  return (
    <div>
      <label htmlFor={inputId}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      
      <input
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      
      {error && (
        <div id={errorId} role="alert" aria-live="polite">
          {error}
        </div>
      )}
      
      {helperText && (
        <div id={helperId}>
          {helperText}
        </div>
      )}
    </div>
  )
}
```

### Dynamic Content
```tsx
const LiveRegionComponent = ({ status, message }) => (
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {status === 'loading' && 'Loading content...'}
    {status === 'success' && `Success: ${message}`}
    {status === 'error' && `Error: ${message}`}
  </div>
)

const AlertComponent = ({ type, message, onClose }) => (
  <div
    role="alert"
    aria-live="assertive"
    aria-labelledby="alert-title"
  >
    <h3 id="alert-title">{type === 'error' ? 'Error' : 'Notification'}</h3>
    <p>{message}</p>
    {onClose && (
      <button
        onClick={onClose}
        aria-label="Close alert"
      >
        ×
      </button>
    )}
  </div>
)
```

## Keyboard Navigation Patterns

### Focus Management
```tsx
const ModalComponent = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement>()
  
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // Focus modal
      modalRef.current?.focus()
      
      // Trap focus within modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose()
          return
        }
        
        if (event.key === 'Tab') {
          trapFocus(event, modalRef.current!)
        }
      }
      
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    } else {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

const trapFocus = (event: KeyboardEvent, container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  if (event.shiftKey && document.activeElement === firstElement) {
    lastElement.focus()
    event.preventDefault()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    firstElement.focus()
    event.preventDefault()
  }
}
```

### Arrow Key Navigation
```tsx
const ListNavigation = ({ items, onSelect }) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1))
        break
        
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0))
        break
        
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break
        
      case 'End':
        event.preventDefault()
        setFocusedIndex(items.length - 1)
        break
        
      case 'Enter':
      case ' ':
        event.preventDefault()
        onSelect(items[focusedIndex])
        break
        
      case 'Escape':
        event.preventDefault()
        // Close or blur component
        break
    }
  }
  
  useEffect(() => {
    // Focus the active item
    const activeItem = listRef.current?.querySelector(`[data-index="${focusedIndex}"]`) as HTMLElement
    activeItem?.focus()
  }, [focusedIndex])
  
  return (
    <ul
      ref={listRef}
      role="listbox"
      aria-label="Select an option"
      onKeyDown={handleKeyDown}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          data-index={index}
          role="option"
          aria-selected={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
          onClick={() => onSelect(item)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}
```

## Color and Contrast Guidelines

### Design Token Implementation
```json
{
  "color": {
    "text": {
      "default": {
        "value": "#1a1a1a",
        "type": "color",
        "description": "Primary text - meets AA contrast on light backgrounds"
      },
      "subdued": {
        "value": "#666666", 
        "type": "color",
        "description": "Secondary text - meets AA contrast on light backgrounds"
      }
    },
    "background": {
      "default": {
        "value": "#ffffff",
        "type": "color"
      },
      "error": {
        "value": "#fef2f2",
        "type": "color",
        "description": "Error background with sufficient contrast for error text"
      }
    }
  }
}
```

### Contrast Validation Testing
```tsx
describe('Color Contrast Compliance', () => {
  const colorCombinations = [
    {
      background: tokens.semantic.color.background.default,
      foreground: tokens.semantic.color.text.default,
      expectedRatio: 4.5 // WCAG AA normal text
    },
    {
      background: tokens.semantic.color.background.interactive,
      foreground: tokens.semantic.color.text.inverse,
      expectedRatio: 4.5
    }
  ]
  
  colorCombinations.forEach(({ background, foreground, expectedRatio }) => {
    it(`maintains ${expectedRatio}:1 contrast ratio`, () => {
      const ratio = calculateContrastRatio(background, foreground)
      expect(ratio).toBeGreaterThanOrEqual(expectedRatio)
    })
  })
})
```

### Non-Color Information Pattern
```tsx
// ✅ Don't rely solely on color
const StatusIndicator = ({ status, message }) => (
  <div
    role="status"
    aria-label={`Status: ${status}`}
  >
    <Icon 
      name={status === 'success' ? 'check' : 'alert'} 
      aria-hidden="true" 
    />
    <span style={{ color: getStatusColor(status) }}>
      {message}
    </span>
  </div>
)

// ❌ Don't use color alone
const BadStatusIndicator = ({ status }) => (
  <div style={{ color: status === 'error' ? 'red' : 'green' }}>
    {status}
  </div>
)
```

## Screen Reader Optimization

### Content Structure
```tsx
const ArticleComponent = ({ title, author, date, content }) => (
  <article>
    <header>
      <h1>{title}</h1>
      <div aria-label={`Published by ${author} on ${date}`}>
        <span>By {author}</span>
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
    </header>
    
    <div role="main">
      {content}
    </div>
    
    <footer>
      <nav aria-label="Article navigation">
        <a href="#prev" aria-label="Previous article">← Previous</a>
        <a href="#next" aria-label="Next article">Next →</a>
      </nav>
    </footer>
  </article>
)
```

### Hidden Content for Screen Readers
```tsx
const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const IconButton = ({ icon, onClick, ...props }) => (
  <button onClick={onClick} {...props}>
    <Icon name={icon} aria-hidden="true" />
    <VisuallyHidden>
      {getIconLabel(icon)}
    </VisuallyHidden>
  </button>
)
```

### Progress and Loading States
```tsx
const LoadingComponent = ({ progress, message }) => (
  <div
    role="progressbar"
    aria-valuenow={progress}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label={message || 'Loading'}
  >
    <div
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
    <VisuallyHidden>
      {progress}% complete
    </VisuallyHidden>
  </div>
)
```

## Mobile Accessibility

### Touch Target Sizing
```tsx
const TouchFriendlyButton = styled.button`
  min-height: 44px; // Minimum touch target size
  min-width: 44px;
  padding: ${tokens.semantic.spacing.component.md};
  
  // Ensure adequate spacing between touch targets
  margin: ${tokens.semantic.spacing.component.xs};
  
  @media (hover: hover) {
    // Only apply hover effects on devices that support hover
    &:hover {
      background-color: ${tokens.semantic.color.background.hover};
    }
  }
`
```

### Zoom and Responsive Behavior
```tsx
const ResponsiveText = styled.div`
  font-size: ${tokens.semantic.typography.body.fontSize};
  line-height: ${tokens.semantic.typography.body.lineHeight};
  
  // Ensure text can scale up to 200% without horizontal scrolling
  max-width: 100%;
  word-wrap: break-word;
  
  // Maintain readability at different zoom levels
  @media (max-width: 480px) {
    font-size: ${tokens.semantic.typography.small.fontSize};
  }
`
```

## Component-Specific Accessibility Patterns

### Form Components
```tsx
const FormGroup = ({ label, error, required, children, ...props }) => {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  
  return (
    <fieldset>
      <legend>
        {label}
        {required && <span aria-label="required"> *</span>}
      </legend>
      
      {React.cloneElement(children, {
        id,
        'aria-invalid': !!error,
        'aria-describedby': errorId,
        required,
        ...props
      })}
      
      {error && (
        <div id={errorId} role="alert">
          <Icon name="alert" aria-hidden="true" />
          {error}
        </div>
      )}
    </fieldset>
  )
}
```

### Data Display Components
```tsx
const DataTable = ({ columns, data, caption }) => (
  <table role="table">
    {caption && <caption>{caption}</caption>}
    
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.key}
            scope="col"
            aria-sort={column.sorted ? column.sortDirection : 'none'}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
    
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map(column => (
            <td key={column.key}>
              {row[column.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
```

## Accessibility Testing Checklist

### Manual Testing Steps
- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] **High Contrast Mode**: Verify visibility in high contrast displays
- [ ] **Zoom Testing**: Ensure usability at 200% zoom
- [ ] **Focus Indicators**: Verify visible focus states
- [ ] **Color Blindness**: Test with color vision simulation tools

### Automated Testing Tools
- [ ] **jest-axe**: Automated accessibility rule checking
- [ ] **Lighthouse**: Accessibility audit scores
- [ ] **Color Contrast**: Automated contrast ratio validation
- [ ] **HTML Validation**: Semantic HTML structure verification

This comprehensive accessibility framework ensures that all components in the design system provide inclusive experiences for users with diverse abilities and assistive technology needs.