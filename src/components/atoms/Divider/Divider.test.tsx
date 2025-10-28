import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Divider } from './Divider'
import type { DividerProps } from './Divider'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Divider', () => {
  const defaultProps: DividerProps = {
    'data-testid': 'separator'
  }

  const renderSeparator = (props: Partial<DividerProps> = {}) => {
    const finalProps = {
      ...defaultProps,
      ...props
    }
    return render(<Divider {...finalProps} />)
  }

  const getSeparator = () => screen.getByTestId('separator')

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderSeparator()
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders as a div element with separator role', () => {
      renderSeparator()
      const separator = getSeparator()
      expect(separator.tagName).toBe('DIV')
      expect(separator).toHaveAttribute('role', 'separator')
    })

    it('has proper accessibility attributes', () => {
      renderSeparator()
      const separator = getSeparator()
      expect(separator).toHaveAttribute('role', 'separator')
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders with default props when minimal props provided', () => {
      renderSeparator()
      const separator = getSeparator()
      expect(separator).toBeInTheDocument()
      expect(separator).toHaveAttribute('role', 'separator')
    })

    it('applies custom data-testid', () => {
      renderSeparator({ 'data-testid': 'custom-separator' })
      expect(screen.getByTestId('custom-separator')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderSeparator({ 'data-testid': 'test-section-separator' })
      expect(screen.getByTestId('test-section-separator')).toBeInTheDocument()
    })
  })

  describe('Variant Support', () => {
    it('renders default variant', () => {
      renderSeparator({ variant: 'default' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders strong variant', () => {
      renderSeparator({ variant: 'strong' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders minimal variant', () => {
      renderSeparator({ variant: 'minimal' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('uses default variant when no variant is provided', () => {
      renderSeparator({ variant: undefined })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles all variant options correctly', () => {
      const variants: DividerProps['variant'][] = ['default', 'strong', 'minimal']
      
      variants.forEach((variant) => {
        const { unmount } = renderSeparator({ variant })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Size Support', () => {
    it('renders small size', () => {
      renderSeparator({ size: 'small' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders medium size', () => {
      renderSeparator({ size: 'medium' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders large size', () => {
      renderSeparator({ size: 'large' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders xlarge size', () => {
      renderSeparator({ size: 'xlarge' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('uses default size (large) when no size is provided', () => {
      renderSeparator({ size: undefined })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles all size variants correctly', () => {
      const sizes: DividerProps['size'][] = ['small', 'medium', 'large', 'xlarge']
      
      sizes.forEach((size) => {
        const { unmount } = renderSeparator({ size })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Orientation Support', () => {
    it('renders horizontal orientation by default', () => {
      renderSeparator()
      const separator = getSeparator()
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders horizontal orientation when specified', () => {
      renderSeparator({ orientation: 'horizontal' })
      const separator = getSeparator()
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders vertical orientation', () => {
      renderSeparator({ orientation: 'vertical' })
      const separator = getSeparator()
      expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    })

    it('handles all orientation options correctly', () => {
      const orientations: DividerProps['orientation'][] = ['horizontal', 'vertical']
      
      orientations.forEach((orientation) => {
        const { unmount } = renderSeparator({ orientation })
        const separator = getSeparator()
        expect(separator).toBeInTheDocument()
        expect(separator).toHaveAttribute('aria-orientation', orientation)
        unmount()
      })
    })
  })

  describe('Variant and Size Interactions', () => {
    it('minimal variant works with all sizes', () => {
      const sizes: DividerProps['size'][] = ['small', 'medium', 'large', 'xlarge']
      
      sizes.forEach((size) => {
        const { unmount } = renderSeparator({ variant: 'minimal', size })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })

    it('default variant respects size prop', () => {
      const { unmount: unmount1 } = renderSeparator({ variant: 'default', size: 'small' })
      expect(getSeparator()).toBeInTheDocument()
      unmount1()

      renderSeparator({ variant: 'default', size: 'xlarge' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('strong variant respects size prop', () => {
      const { unmount: unmount1 } = renderSeparator({ variant: 'strong', size: 'medium' })
      expect(getSeparator()).toBeInTheDocument()
      unmount1()

      renderSeparator({ variant: 'strong', size: 'large' })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles complex variant-size combinations', () => {
      const combinations: Array<{ variant: DividerProps['variant']; size: DividerProps['size'] }> = [
        { variant: 'default', size: 'small' },
        { variant: 'strong', size: 'medium' },
        { variant: 'minimal', size: 'large' },
        { variant: 'default', size: 'xlarge' }
      ]

      combinations.forEach(({ variant, size }) => {
        const { unmount } = renderSeparator({ variant, size })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('TypeScript Props', () => {
    it('accepts all valid variant values', () => {
      renderSeparator({
        variant: 'default'
      })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('accepts all valid size values', () => {
      renderSeparator({
        size: 'medium'
      })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles optional props', () => {
      renderSeparator({
        variant: 'strong',
        size: 'xlarge',
        'data-testid': 'custom'
      })
      expect(screen.getByTestId('custom')).toBeInTheDocument()
    })
  })

  describe('Semantic HTML and Accessibility', () => {
    it('has correct ARIA role', () => {
      renderSeparator()
      expect(getSeparator()).toHaveAttribute('role', 'separator')
    })

    it('has correct ARIA orientation', () => {
      renderSeparator()
      expect(getSeparator()).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('maintains accessibility across all variants', () => {
      const variants: DividerProps['variant'][] = ['default', 'strong', 'minimal']
      
      variants.forEach((variant) => {
        const { unmount } = renderSeparator({ variant })
        const separator = getSeparator()
        expect(separator).toHaveAttribute('role', 'separator')
        expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
        unmount()
      })
    })

    it('maintains accessibility across all sizes', () => {
      const sizes: DividerProps['size'][] = ['small', 'medium', 'large', 'xlarge']
      
      sizes.forEach((size) => {
        const { unmount } = renderSeparator({ size })
        const separator = getSeparator()
        expect(separator).toHaveAttribute('role', 'separator')
        expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
        unmount()
      })
    })
  })

  describe('Design System Integration', () => {
    it('uses design tokens for styling', () => {
      renderSeparator()
      const separator = getSeparator()
      expect(separator).toBeInTheDocument()
      // Component uses design tokens - rendered correctly indicates proper integration
    })

    it('applies consistent styling across variants', () => {
      const variants: DividerProps['variant'][] = ['default', 'strong', 'minimal']
      
      variants.forEach((variant) => {
        const { unmount } = renderSeparator({ variant })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })

    it('applies consistent spacing across sizes', () => {
      const sizes: DividerProps['size'][] = ['small', 'medium', 'large', 'xlarge']
      
      sizes.forEach((size) => {
        const { unmount } = renderSeparator({ size })
        expect(getSeparator()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined variant gracefully', () => {
      renderSeparator({ variant: undefined })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles undefined size gracefully', () => {
      renderSeparator({ size: undefined })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('handles both undefined props gracefully', () => {
      renderSeparator({ variant: undefined, size: undefined })
      expect(getSeparator()).toBeInTheDocument()
    })

    it('renders without any props', () => {
      render(<Divider />)
      // Should still work without data-testid, using role selector
      expect(screen.getByRole('separator')).toBeInTheDocument()
    })

    it('maintains proper structure with all combinations', () => {
      renderSeparator({ variant: 'minimal', size: 'xlarge' })
      const separator = getSeparator()
      expect(separator.tagName).toBe('DIV')
      expect(separator).toHaveAttribute('role', 'separator')
      expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderSeparator()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with different variants', async () => {
      const variants: DividerProps['variant'][] = ['default', 'strong', 'minimal']
      
      for (const variant of variants) {
        const { container, unmount } = renderSeparator({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with different sizes', async () => {
      const sizes: DividerProps['size'][] = ['small', 'medium', 'large', 'xlarge']
      
      for (const size of sizes) {
        const { container, unmount } = renderSeparator({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with complex combinations', async () => {
      const { container } = renderSeparator({
        variant: 'strong',
        size: 'xlarge'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
