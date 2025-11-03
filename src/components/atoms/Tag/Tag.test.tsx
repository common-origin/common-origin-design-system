import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Tag, TagProps } from './Tag'

expect.extend(toHaveNoViolations)

describe('Tag', () => {
  const defaultProps: TagProps = {
    children: 'Test Tag'
  }

  const renderTag = (props: Partial<TagProps> = {}) => {
    return render(<Tag {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderTag()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders children correctly', () => {
      renderTag({ children: 'Category Label' })
      expect(screen.getByText('Category Label')).toBeInTheDocument()
    })

    it('applies data-testid correctly', () => {
      renderTag({ 'data-testid': 'custom-tag' })
      expect(screen.getByTestId('custom-tag')).toBeInTheDocument()
    })

    it('renders with complex children', () => {
      renderTag({ children: <span>Complex <strong>Content</strong></span> })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })
  })

  describe('Variant Props', () => {
    const variants: Array<TagProps['variant']> = [
      'default',
      'interactive',
      'success',
      'warning',
      'error',
      'emphasis'
    ]

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        renderTag({ variant })
        const tag = screen.getByRole('status')
        expect(tag).toHaveAttribute('data-variant', variant)
      })
    })

    it('defaults to default variant when not specified', () => {
      renderTag()
      const tag = screen.getByRole('status')
      expect(tag).toHaveAttribute('data-variant', 'default')
    })
  })

  describe('Border Prop', () => {
    it('renders with border by default', () => {
      renderTag()
      const tag = screen.getByRole('status')
      expect(tag).toHaveAttribute('data-border', 'true')
    })

    it('renders with border when border=true', () => {
      renderTag({ border: true })
      const tag = screen.getByRole('status')
      expect(tag).toHaveAttribute('data-border', 'true')
    })

    it('renders without border when border=false', () => {
      renderTag({ border: false })
      const tag = screen.getByRole('status')
      expect(tag).toHaveAttribute('data-border', 'false')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderTag()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all variants', async () => {
      const variants: Array<TagProps['variant']> = [
        'default',
        'interactive',
        'success',
        'warning',
        'error',
        'emphasis'
      ]

      for (const variant of variants) {
        const { container, unmount } = renderTag({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with and without border', async () => {
      const borderOptions = [true, false]

      for (const border of borderOptions) {
        const { container, unmount } = renderTag({ border })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('has role="status" for screen reader announcement', () => {
      renderTag()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('provides aria-label for string children', () => {
      renderTag({ children: 'Important' })
      const tag = screen.getByRole('status')
      expect(tag).toHaveAttribute('aria-label', 'Tag: Important')
    })

    it('does not provide aria-label for complex children', () => {
      renderTag({ children: <span>Complex</span> })
      const tag = screen.getByRole('status')
      expect(tag).not.toHaveAttribute('aria-label')
    })
  })

  describe('Styling', () => {
    it('renders as inline element', () => {
      renderTag()
      const tag = screen.getByRole('status')
      const styles = window.getComputedStyle(tag)
      expect(styles.display).toBe('inline-flex')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty string children', () => {
      renderTag({ children: '' })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('handles number children', () => {
      renderTag({ children: 42 })
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('handles multiple text nodes', () => {
      renderTag({ children: ['Tag ', 'Content'] })
      const tag = screen.getByRole('status')
      expect(tag.textContent).toBe('Tag Content')
    })
  })

  describe('Variant and Size Combinations', () => {
    it('correctly applies all variants', () => {
      const variants: Array<TagProps['variant']> = [
        'default',
        'interactive',
        'success',
        'warning',
        'error',
        'emphasis'
      ]

      variants.forEach(variant => {
        const { unmount } = renderTag({ variant })
        const tag = screen.getByRole('status')
        expect(tag).toHaveAttribute('data-variant', variant)
        unmount()
      })
    })
  })
})
