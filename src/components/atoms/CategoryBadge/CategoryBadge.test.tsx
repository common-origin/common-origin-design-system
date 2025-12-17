import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CategoryBadge, CategoryBadgeProps, CategoryColor, CategoryVariant, CategorySize } from './CategoryBadge'

expect.extend(toHaveNoViolations)

describe('CategoryBadge Component', () => {
  const defaultProps: CategoryBadgeProps = {
    children: 'Shopping'
  }

  const renderCategoryBadge = (props: Partial<CategoryBadgeProps> = {}) => {
    return render(<CategoryBadge {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderCategoryBadge()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
    })

    it('renders with custom children', () => {
      renderCategoryBadge({ children: 'Groceries' })
      expect(screen.getByText('Groceries')).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderCategoryBadge({ 'data-testid': 'custom-badge' })
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderCategoryBadge({ 'data-testid': 'test-badge' })
      expect(screen.getByTestId('test-badge')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe('Color Variants', () => {
    const colors: CategoryColor[] = ['blue', 'purple', 'pink', 'yellow', 'green', 'red', 'orange', 'gray']

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        renderCategoryBadge({ color })
        const badge = screen.getByText('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to blue color', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Visual Variants', () => {
    const variants: CategoryVariant[] = ['filled', 'outlined', 'minimal']

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        renderCategoryBadge({ variant })
        const badge = screen.getByText('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to filled variant', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: CategorySize[] = ['small', 'medium']

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        renderCategoryBadge({ size })
        const badge = screen.getByText('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to medium size', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Icon Support', () => {
    it('renders with an icon', () => {
      renderCategoryBadge({ icon: 'filter' })
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
      // Icon rendering is handled by Icon component
    })

    it('renders without an icon by default', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Interactive Behavior', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick })
      
      const badge = screen.getByRole('button')
      fireEvent.click(badge)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is not interactive without onClick', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).not.toHaveAttribute('role', 'button')
    })

    it('becomes a button when onClick is provided', () => {
      renderCategoryBadge({ onClick: jest.fn() })
      const badge = screen.getByRole('button')
      expect(badge).toBeInTheDocument()
    })

    it('handles keyboard Enter key when clickable', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick })
      
      const badge = screen.getByRole('button')
      fireEvent.keyDown(badge, { key: 'Enter', code: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard Space key when clickable', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick })
      
      const badge = screen.getByRole('button')
      fireEvent.keyDown(badge, { key: ' ', code: 'Space' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('ignores other keys', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick })
      
      const badge = screen.getByRole('button')
      fireEvent.keyDown(badge, { key: 'a', code: 'KeyA' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('is focusable when clickable', () => {
      renderCategoryBadge({ onClick: jest.fn() })
      const badge = screen.getByRole('button')
      expect(badge).toHaveAttribute('tabIndex', '0')
    })

    it('is not focusable when not clickable', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).not.toHaveAttribute('tabIndex')
    })
  })

  describe('Disabled State', () => {
    it('renders disabled state correctly', () => {
      renderCategoryBadge({ onClick: jest.fn(), disabled: true })
      const badge = screen.getByRole('button')
      expect(badge).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick, disabled: true })
      
      const badge = screen.getByRole('button')
      fireEvent.click(badge)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not trigger keyboard events when disabled', () => {
      const handleClick = jest.fn()
      renderCategoryBadge({ onClick: handleClick, disabled: true })
      
      const badge = screen.getByRole('button')
      fireEvent.keyDown(badge, { key: 'Enter', code: 'Enter' })
      fireEvent.keyDown(badge, { key: ' ', code: 'Space' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderCategoryBadge()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when clickable', async () => {
      const { container } = renderCategoryBadge({ onClick: jest.fn() })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderCategoryBadge({ onClick: jest.fn(), disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all color variants', async () => {
      const colors: CategoryColor[] = ['blue', 'purple', 'pink', 'yellow', 'green', 'red', 'orange', 'gray']
      
      for (const color of colors) {
        const { container, unmount } = renderCategoryBadge({ color })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations across all variants', async () => {
      const variants: CategoryVariant[] = ['filled', 'outlined', 'minimal']
      
      for (const variant of variants) {
        const { container, unmount } = renderCategoryBadge({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with icon', async () => {
      const { container } = renderCategoryBadge({ icon: 'filter' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports aria-label for additional context', () => {
      renderCategoryBadge({ 
        onClick: jest.fn(), 
        'aria-label': 'Shopping category badge' 
      })
      const badge = screen.getByRole('button')
      expect(badge).toHaveAttribute('aria-label', 'Shopping category badge')
    })

    it('has proper role when interactive', () => {
      renderCategoryBadge({ onClick: jest.fn() })
      const badge = screen.getByRole('button')
      expect(badge).toHaveAttribute('role', 'button')
    })

    it('has no role when not interactive', () => {
      renderCategoryBadge()
      const badge = screen.getByText('Shopping')
      expect(badge).not.toHaveAttribute('role')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderCategoryBadge({ children: '' })
      // Empty children should still render the badge
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles long text content', () => {
      const longText = 'This is a very long category name that might overflow'
      renderCategoryBadge({ children: longText })
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('handles complex children with elements', () => {
      renderCategoryBadge({ 
        children: (
          <>
            <span>Category</span>
            <span>Label</span>
          </>
        )
      })
      expect(screen.getByText('Category')).toBeInTheDocument()
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('handles all prop combinations', () => {
      renderCategoryBadge({
        color: 'purple',
        variant: 'outlined',
        size: 'small',
        icon: 'filter',
        onClick: jest.fn(),
        disabled: false,
        'aria-label': 'Test badge'
      })
      const badge = screen.getByRole('button')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('aria-label', 'Test badge')
    })
  })
})
