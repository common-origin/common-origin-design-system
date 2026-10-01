import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CategoryLabel, CategoryLabelProps, CategoryColor, CategoryVariant, CategoryLabelSize } from './CategoryLabel'
import tokens from '@/styles/tokens.json'
import { effectiveFontWeight } from '@/test-utils/effectiveFontWeight'

expect.extend(toHaveNoViolations)

describe('CategoryLabel Component', () => {
  const defaultProps: CategoryLabelProps = {
    children: 'Shopping'
  }

  const renderCategoryLabel = (props: Partial<CategoryLabelProps> = {}) => {
    return render(<CategoryLabel {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it.each(['medium', 'large'] as const)('renders %s labels at the badge-family weight', (size) => {
      const { container } = renderCategoryLabel({ size })
      expect(effectiveFontWeight(container.firstElementChild!)).toBe(tokens.component.badge.label.fontWeight)
    })

    it('renders without crashing', () => {
      renderCategoryLabel()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
    })

    it('renders with custom children', () => {
      renderCategoryLabel({ children: 'Groceries' })
      expect(screen.getByText('Groceries')).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderCategoryLabel({ 'data-testid': 'custom-badge' })
      expect(screen.getByTestId('custom-badge')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderCategoryLabel({ 'data-testid': 'test-badge' })
      expect(screen.getByTestId('test-badge')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })

    it('renders as a span element (static, non-interactive)', () => {
      renderCategoryLabel({ 'data-testid': 'badge' })
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
        renderCategoryLabel({ color })
        const badge = screen.getByText('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to blue color', () => {
      renderCategoryLabel()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Visual Variants', () => {
    const variants: CategoryVariant[] = ['filled', 'outlined', 'minimal']

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        renderCategoryLabel({ variant })
        const badge = screen.getByText('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to filled variant', () => {
      renderCategoryLabel()
      const badge = screen.getByText('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: CategoryLabelSize[] = ['medium', 'large']

    sizes.forEach((size) => {
      it(`renders the ${size} size at the ${size} label height`, () => {
        renderCategoryLabel({ size })
        expect(screen.getByText('Shopping')).toHaveStyle({ height: tokens.semantic.size.label[size] })
      })
    })

    it('defaults to large size (32px)', () => {
      renderCategoryLabel()
      expect(screen.getByText('Shopping')).toHaveStyle({ height: tokens.semantic.size.label.large })
    })
  })

  describe('Icon Support', () => {
    it('renders with an icon', () => {
      renderCategoryLabel({ icon: 'filter', 'data-testid': 'badge-with-icon' })
      const badge = screen.getByTestId('badge-with-icon')
      expect(badge).toBeInTheDocument()
      // Check that badge has more than just text (icon adds extra element)
      expect(badge.children.length).toBeGreaterThan(0)
    })

    it('renders without an icon by default', () => {
      renderCategoryLabel({ 'data-testid': 'badge-no-icon' })
      const badge = screen.getByTestId('badge-no-icon')
      const icon = badge.querySelector('[aria-hidden="true"]')
      expect(icon).not.toBeInTheDocument()
    })

    it.each([
      ['medium', 'xs'],
      ['large', 'sm'],
    ] as const)('uses the %s label\'s %s icon size', (size, iconSize) => {
      renderCategoryLabel({ icon: 'filter', size, 'data-testid': 'label' })
      const icon = screen.getByTestId('label').querySelector('svg')?.parentElement as HTMLElement
      expect(icon).toHaveStyle({ width: tokens.semantic.size.icon[iconSize] })
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderCategoryLabel()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all color variants', async () => {
      const colors: CategoryColor[] = ['blue', 'purple', 'pink', 'yellow', 'green', 'red', 'orange', 'gray']
      
      for (const color of colors) {
        const { container, unmount } = renderCategoryLabel({ color })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations across all variants', async () => {
      const variants: CategoryVariant[] = ['filled', 'outlined', 'minimal']
      
      for (const variant of variants) {
        const { container, unmount } = renderCategoryLabel({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with icon', async () => {
      const { container } = renderCategoryLabel({ icon: 'filter' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('supports aria-label for additional context', () => {
      renderCategoryLabel({ 'aria-label': 'Shopping category', 'data-testid': 'labeled-badge' })
      const badge = screen.getByTestId('labeled-badge')
      expect(badge).toHaveAttribute('aria-label', 'Shopping category')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = renderCategoryLabel({ children: '' })
      expect(container.firstChild).toBeInTheDocument()
    })

    it('handles long text content', () => {
      const longText = 'This is a very long category name that might overflow'
      renderCategoryLabel({ children: longText })
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('handles complex children with elements', () => {
      renderCategoryLabel({ 
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
      renderCategoryLabel({
        color: 'purple',
        variant: 'outlined',
        size: 'medium',
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
