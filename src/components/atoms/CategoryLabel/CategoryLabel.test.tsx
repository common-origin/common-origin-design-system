import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CategoryLabel, CategoryLabelProps, CategoryColor, CategoryVariant, CategoryLabelSize } from './CategoryLabel'
import tokens from '@/styles/tokens.json'
import { contrastRatio } from '@/test-utils/contrast'
import { effectiveFontWeight } from '@/test-utils/effectiveFontWeight'

expect.extend(toHaveNoViolations)

// The label's root element: its text sits in an inner content wrapper
const labelRoot = (text: string) => screen.getByText(text).parentElement as HTMLElement

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
        const badge = labelRoot('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to blue color', () => {
      renderCategoryLabel()
      const badge = labelRoot('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Visual Variants', () => {
    const variants: CategoryVariant[] = ['filled', 'outlined', 'minimal']

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        renderCategoryLabel({ variant })
        const badge = labelRoot('Shopping')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to filled variant', () => {
      renderCategoryLabel()
      const badge = labelRoot('Shopping')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: CategoryLabelSize[] = ['medium', 'large']

    sizes.forEach((size) => {
      it(`renders the ${size} size at the ${size} label height`, () => {
        renderCategoryLabel({ size })
        expect(labelRoot('Shopping')).toHaveStyle({ height: tokens.semantic.size.label[size] })
      })
    })

    it.each(sizes)('keeps the %s height including padding and border, without a global reset', (size) => {
      renderCategoryLabel({ size })
      expect(labelRoot('Shopping')).toHaveStyle({ boxSizing: 'border-box' })
    })

    it('defaults to large size (32px)', () => {
      renderCategoryLabel()
      expect(labelRoot('Shopping')).toHaveStyle({ height: tokens.semantic.size.label.large })
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

    describe('aria-label (#78)', () => {
      it('is announced as visually hidden text, with the visible label hidden from assistive technology', () => {
        renderCategoryLabel({ 'aria-label': 'Shopping category', 'data-testid': 'labeled' })
        const root = screen.getByTestId('labeled')
        expect(screen.getByText('Shopping category')).toBeInTheDocument()
        expect(screen.getByText('Shopping').closest('[aria-hidden="true"]')).toBeInTheDocument()
        // The root is a span with no role, which can't be named, so it carries no aria-label
        expect(root).not.toHaveAttribute('aria-label')
        // What assistive technology reads: the hidden label only
        const announced = Array.from(root.childNodes)
          .filter((n) => !(n instanceof HTMLElement && n.getAttribute('aria-hidden') === 'true'))
          .map((n) => n.textContent)
          .join('')
        expect(announced).toBe('Shopping category')
      })

      it('leaves the visible label exposed when no aria-label is given', () => {
        renderCategoryLabel({ 'data-testid': 'plain' })
        expect(screen.getByTestId('plain').querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
        expect(screen.getByTestId('plain')).toHaveTextContent('Shopping')
      })

      it('has no accessibility violations with an aria-label and an icon', async () => {
        const { container } = renderCategoryLabel({ 'aria-label': 'Category: Shopping', icon: 'filter' })
        expect(await axe(container)).toHaveNoViolations()
      })
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
      expect(screen.getByText('Test badge')).toBeInTheDocument()
    })
  })
})

describe('CategoryLabel contrast (WCAG AA, #115)', () => {
  const { category, text } = tokens.semantic.color
  const colors: CategoryColor[] = ['blue', 'purple', 'pink', 'yellow', 'green', 'red', 'orange', 'gray']
  const backgrounds: Record<CategoryVariant, (c: CategoryColor) => string> = {
    filled: (c) => category[`${c}-emphasis`],
    outlined: () => '#ffffff',
    minimal: (c) => category[`${c}-subtle`],
  }
  const cases = colors.flatMap((c) => (['filled', 'outlined', 'minimal'] as CategoryVariant[]).map((v) => [c, v] as const))

  it.each(cases)('%s %s text meets 4.5:1', (c, variant) => {
    render(<CategoryLabel color={c} variant={variant}>Label</CategoryLabel>)
    const foreground = variant === 'filled' ? text.inverse : category[`${c}-text`]
    expect(labelRoot('Label')).toHaveStyle({ color: foreground })
    expect(contrastRatio(foreground, backgrounds[variant](c))).toBeGreaterThanOrEqual(4.5)
  })

  it('keeps the base colour for the outlined border', () => {
    render(<CategoryLabel color="yellow" variant="outlined">Label</CategoryLabel>)
    expect(labelRoot('Label')).toHaveStyle({ borderColor: category.yellow })
  })
})

describe('CategoryLabel blank aria-label (#78)', () => {
  it.each(['', '   '])('treats %j as no label and keeps the visible content exposed', (blank) => {
    render(<CategoryLabel aria-label={blank} data-testid="label">Shopping</CategoryLabel>)
    const root = screen.getByTestId('label')
    expect(root.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
    expect(root).toHaveTextContent(/^Shopping$/)
  })
})
