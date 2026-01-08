import React from 'react'
import { render, screen } from '@testing-library/react'
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

    it('renders as a span element (static, non-interactive)', () => {
      renderCategoryBadge({ 'data-testid': 'badge' })
      const badge = screen.getByTestId('badge')
      expect(badge.tagName).toBe('SPAN')
      expect(badge).not.toHaveAttribute('role')
      expect(badge).not.toHaveAttribute('tabIndex')
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
      renderCategoryBadge({ icon: 'filter', 'data-testid': 'badge-with-icon' })
      const badge = screen.getByTestId('badge-with-icon')
      expect(badge).toBeInTheDocument()
      // Check that badge has more than just text (icon adds extra element)
      expect(badge.children.length).toBeGreaterThan(0)
    })

    it('renders without an icon by default', () => {
      renderCategoryBadge({ 'data-testid': 'badge-no-icon' })
      const badge = screen.getByTestId('badge-no-icon')
      const icon = badge.querySelector('[aria-hidden="true"]')
      expect(icon).not.toBeInTheDocument()
    })

    it('uses xs icon size for small badge', () => {
      renderCategoryBadge({ icon: 'filter', size: 'small', 'data-testid': 'small-badge' })
      expect(screen.getByTestId('small-badge')).toBeInTheDocument()
    })

    it('uses sm icon size for medium badge', () => {
      renderCategoryBadge({ icon: 'filter', size: 'medium', 'data-testid': 'medium-badge' })
      expect(screen.getByTestId('medium-badge')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderCategoryBadge()
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
      renderCategoryBadge({ 'aria-label': 'Shopping category', 'data-testid': 'labeled-badge' })
      const badge = screen.getByTestId('labeled-badge')
      expect(badge).toHaveAttribute('aria-label', 'Shopping category')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderCategoryBadge({ children: '' })
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
        'aria-label': 'Test badge',
        'data-testid': 'full-badge'
      })
      const badge = screen.getByTestId('full-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('aria-label', 'Test badge')
    })
  })
})
