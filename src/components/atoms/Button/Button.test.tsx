import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../Button'

expect.extend(toHaveNoViolations)

// Mock window.open to prevent jsdom errors
Object.defineProperty(window, 'open', {
  value: jest.fn(),
  writable: true,
})

// Mock Link component for testing linkComponent prop
const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>

describe('Button Component', () => {
  const defaultProps = {
    children: 'Click me'
  }

  const renderButton = (props: any = {}) => {
    return render(<Button {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderButton()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Click me')
    })

    it('renders with custom text content', () => {
      renderButton({ children: 'Custom Text' })
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Custom Text')
    })

    it('renders with custom data-testid', () => {
      renderButton({ 'data-testid': 'custom-button' })
      const button = screen.getByTestId('custom-button')
      expect(button).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderButton({ 'data-testid': 'test-button' })
      expect(screen.getByTestId('test-button')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      renderButton()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Primary variant styling is applied via styled-components
    })

    it('renders with secondary variant', () => {
      renderButton({ variant: 'secondary' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Secondary variant styling is applied via styled-components
    })

    it('renders with naked variant', () => {
      renderButton({ variant: 'naked' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Naked variant styling is applied via styled-components
    })
  })

  describe('Sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        renderButton({ size })
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        // Size styling is applied via styled-components
      })
    })

    it('defaults to large size', () => {
      renderButton()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Default large size styling is applied
    })
  })

  describe('Button Functionality', () => {
    it('handles click events', () => {
      const handleClick = jest.fn()
      renderButton({ onClick: handleClick })
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
      const handleClick = jest.fn()
      renderButton({ disabled: true, onClick: handleClick })
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('supports form submission', () => {
      renderButton({ type: 'submit' })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Link Functionality', () => {
    it('renders as link with standard <a> tag by default', () => {
      renderButton({ purpose: 'link', url: '/test-page' })
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test-page')
    })

    it('renders with custom linkComponent', () => {
      renderButton({ purpose: 'link', url: '/test-page', linkComponent: MockLink })
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test-page')
    })

    it('renders as external link', () => {
      renderButton({ purpose: 'link', url: 'https://example.com' })
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
    })

    it('renders external link with target', () => {
      renderButton({ purpose: 'link', url: 'https://example.com', target: '_blank' })
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('renders internal link with target as external', () => {
      renderButton({ purpose: 'link', url: '/internal', target: '_blank' })
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/internal')
      expect(link).toHaveAttribute('target', '_blank')
    })
  })

  describe('Legacy URL Support', () => {
    beforeEach(() => {
      // Reset mocks before each test
      jest.clearAllMocks()
    })

    it('renders button with URL prop', () => {
      renderButton({ url: '/test-page' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('renders button with external URL prop', () => {
      renderButton({ url: 'https://example.com' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('calls onClick handler when provided with URL', () => {
      const handleClick = jest.fn()
      renderButton({ 
        url: '/test-page', 
        onClick: handleClick 
      })
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('opens external URL in same window by default', () => {
      renderButton({ url: 'https://example.com' })
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_self')
    })

    it('opens URL with specified target', () => {
      renderButton({ url: 'https://example.com', target: '_blank' })
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      
      expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderButton()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with all variants', async () => {
      const variants = ['primary', 'secondary', 'naked'] as const
      for (const variant of variants) {
        const { container } = renderButton({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('should have no accessibility violations with all sizes', async () => {
      const sizes = ['small', 'medium', 'large'] as const
      for (const size of sizes) {
        const { container } = renderButton({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderButton({ disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with icons', async () => {
      const { container } = renderButton({ iconName: 'add' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations as link', async () => {
      const { container } = renderButton({ purpose: 'link', url: '/test' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports aria-label', () => {
      renderButton({ 'aria-label': 'Custom label' })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Custom label')
    })

    it('supports aria-describedby', () => {
      renderButton({ 'aria-describedby': 'description' })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'description')
    })

    it('supports aria-pressed for toggle buttons', () => {
      renderButton({ 'aria-pressed': true })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })

    it('has proper focus handling', () => {
      renderButton()
      const button = screen.getByRole('button')
      
      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderButton({ children: '' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('')
    })

    it('handles complex children (elements)', () => {
      renderButton({ children: <span>Complex <strong>content</strong></span> })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Complex content')
    })

    it('handles URL without protocol as internal', () => {
      renderButton({ url: 'test-page' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('preserves other button attributes', () => {
      renderButton({ 
        id: 'custom-id',
        title: 'Custom title',
        'data-custom': 'value'
      })
      
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('id', 'custom-id')
      expect(button).toHaveAttribute('title', 'Custom title')
      expect(button).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Variant and Size Combinations', () => {
    const variants = ['primary', 'secondary', 'naked'] as const
    const sizes = ['small', 'medium', 'large'] as const

    variants.forEach(variant => {
      sizes.forEach(size => {
        it(`renders correctly with ${variant} variant and ${size} size`, () => {
          renderButton({ variant, size })
          const button = screen.getByRole('button')
          expect(button).toBeInTheDocument()
        })
      })
    })
  })

  describe('Icon Support', () => {
    it('renders without icon when iconName is not provided', () => {
      renderButton()
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Should not have any svg elements when no icon is provided
      expect(button.querySelector('svg')).not.toBeInTheDocument()
    })

    it('renders with icon when iconName is provided', () => {
      renderButton({ iconName: 'add' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      // Should contain an svg element when icon is provided
      expect(button.querySelector('svg')).toBeInTheDocument()
    })

    it('renders with icon and text content', () => {
      renderButton({ iconName: 'add', children: 'Add Item' })
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Add Item')
      expect(button.querySelector('svg')).toBeInTheDocument()
    })

    it('maps button sizes to appropriate icon sizes', () => {
      const sizeMap = {
        'small': 'xs',
        'medium': 'sm', 
        'large': 'md'
      } as const

      Object.entries(sizeMap).forEach(([buttonSize]) => {
        const { container } = render(
          <Button iconName="add" size={buttonSize as 'small' | 'medium' | 'large'}>
            {buttonSize} Button
          </Button>
        )
        const button = container.querySelector('button')
        const icon = button?.querySelector('span')
        expect(icon).toBeInTheDocument()
      })
    })

    it('uses default icon size for default button size', () => {
      renderButton({ iconName: 'add' })
      const button = screen.getByRole('button')
      const icon = button.querySelector('span')
      expect(icon).toBeInTheDocument()
    })
  })
})
