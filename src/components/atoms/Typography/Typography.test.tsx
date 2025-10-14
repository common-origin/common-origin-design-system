import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Typography, TypographyProps, TypographyVariant, TypographyColor } from '../Typography'
import '@testing-library/jest-dom'

// Extend Jest matchers to include jest-axe matchers
expect.extend(toHaveNoViolations)

describe('Typography', () => {
  const defaultProps: TypographyProps = {
    variant: 'body',
    children: 'Test content'
  }

  const renderTypography = (props: Partial<TypographyProps> = {}) => {
    return render(<Typography {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderTypography()
      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderTypography({ children: 'Custom content' })
      expect(screen.getByText('Custom content')).toBeInTheDocument()
    })

    it('accepts data-testid prop', () => {
      renderTypography({ 'data-testid': 'custom-typography' })
      expect(screen.getByTestId('custom-typography')).toBeInTheDocument()
    })
  })

  describe('Typography Variants', () => {
    it('renders display variant', () => {
      renderTypography({ variant: 'display', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h1 variant', () => {
      renderTypography({ variant: 'h1', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h2 variant', () => {
      renderTypography({ variant: 'h2', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h3 variant', () => {
      renderTypography({ variant: 'h3', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h4 variant', () => {
      renderTypography({ variant: 'h4', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h5 variant', () => {
      renderTypography({ variant: 'h5', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders h6 variant', () => {
      renderTypography({ variant: 'h6', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders subtitle variant', () => {
      renderTypography({ variant: 'subtitle', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders body variant', () => {
      renderTypography({ variant: 'body', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('renders small variant', () => {
      renderTypography({ variant: 'small', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders overline variant', () => {
      renderTypography({ variant: 'overline', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders caption variant', () => {
      renderTypography({ variant: 'caption', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders button1 variant', () => {
      renderTypography({ variant: 'button1', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders button2 variant', () => {
      renderTypography({ variant: 'button2', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders button3 variant', () => {
      renderTypography({ variant: 'button3', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('renders label variant', () => {
      renderTypography({ variant: 'label', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })
  })

  describe('Color Variants', () => {
    it('applies primary color by default', () => {
      renderTypography({ 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('applies emphasis color', () => {
      renderTypography({ color: 'emphasis', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('applies subdued color', () => {
      renderTypography({ color: 'subdued', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('applies inverse color', () => {
      renderTypography({ color: 'inverse', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('applies default color', () => {
      renderTypography({ color: 'default', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })
  })

  describe('Element Override', () => {
    it('allows custom element via as prop', () => {
      renderTypography({ variant: 'h1', as: 'div', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('overrides default semantic element', () => {
      renderTypography({ variant: 'body', as: 'span', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography.tagName).toBe('SPAN')
    })

    it('works with semantic elements', () => {
      renderTypography({ variant: 'caption', as: 'figcaption', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })
  })

  describe('Complex Content', () => {
    it('renders JSX children', () => {
      renderTypography({
        children: (
          <>
            <strong>Bold text</strong> and <em>italic text</em>
          </>
        )
      })
      expect(screen.getByText('Bold text')).toBeInTheDocument()
      expect(screen.getByText('italic text')).toBeInTheDocument()
    })

    it('renders with multiple text nodes', () => {
      renderTypography({
        children: 'First part and second part'
      })
      expect(screen.getByText('First part and second part')).toBeInTheDocument()
    })
  })

  describe('Prop Combinations', () => {
    it('renders with all props combined', () => {
      renderTypography({
        variant: 'h2',
        color: 'subdued',
        as: 'section',
        'data-testid': 'full-props-typography',
        children: 'Full props test',
      })
      const typography = screen.getByTestId('full-props-typography')
      expect(typography).toBeInTheDocument()
      expect(typography).toHaveTextContent('Full props test')
    })
  })

  describe('Accessibility', () => {
    it('provides proper typography semantics', () => {
      renderTypography({ variant: 'h1', children: 'Main heading' })
      expect(screen.getByText('Main heading')).toBeInTheDocument()
    })

    it('supports multiple typography variants in hierarchy', () => {
      render(
        <div>
          <Typography variant="h1">Level 1</Typography>
          <Typography variant="h2">Level 2</Typography>
          <Typography variant="h3">Level 3</Typography>
        </div>
      )
      expect(screen.getByText('Level 1')).toBeInTheDocument()
      expect(screen.getByText('Level 2')).toBeInTheDocument()
      expect(screen.getByText('Level 3')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      renderTypography({ children: '', 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
      expect(typography).toHaveTextContent('')
    })

    it('handles undefined color gracefully', () => {
      renderTypography({ color: undefined, 'data-testid': 'typography' })
      const typography = screen.getByTestId('typography')
      expect(typography).toBeInTheDocument()
    })

    it('handles number children', () => {
      renderTypography({ children: 42 })
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Comprehensive Variant Coverage', () => {
    it('handles all typography variants', () => {
      const variants: TypographyVariant[] = [
        'display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle', 'body', 'small', 'overline', 'caption',
        'button1', 'button2', 'button3', 'label'
      ]
      
      variants.forEach((variant) => {
        const { unmount } = renderTypography({ 
          variant,
          'data-testid': `typography-${variant}`,
          children: `${variant} content`
        })
        expect(screen.getByTestId(`typography-${variant}`)).toBeInTheDocument()
        expect(screen.getByText(`${variant} content`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles all color variants', () => {
      const colors: TypographyColor[] = [
        'default', 'emphasis', 'subdued', 'inverse', 'disabled',
        'interactive', 'error', 'success', 'warning'
      ]
      
      colors.forEach((color) => {
        const { unmount } = renderTypography({ 
          color,
          'data-testid': `typography-color-${color}`,
          children: `Text with ${color} color`
        })
        expect(screen.getByTestId(`typography-color-${color}`)).toBeInTheDocument()
        expect(screen.getByText(`Text with ${color} color`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Enhanced Testing - Design System Integration', () => {
    it('uses semantic typography tokens correctly', () => {
      const tokenTests = [
        { variant: 'display' as TypographyVariant, testId: 'token-display' },
        { variant: 'h1' as TypographyVariant, testId: 'token-h1' },
        { variant: 'body' as TypographyVariant, testId: 'token-body' },
        { variant: 'caption' as TypographyVariant, testId: 'token-caption' }
      ]

      tokenTests.forEach(({ variant, testId }) => {
        const { unmount } = renderTypography({
          variant,
          'data-testid': testId,
          children: 'Token integration test'
        })
        
        expect(screen.getByTestId(testId)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles edge case content types', () => {
      const contentTests = [
        { content: '', testId: 'empty-content' },
        { content: '   ', testId: 'whitespace-content' },
        { content: 'Special chars: !@#$%^&*()', testId: 'special-chars' },
        { content: '🎉 Unicode: Héllo 中文', testId: 'unicode-content' }
      ]

      contentTests.forEach(({ content, testId }) => {
        const { unmount } = renderTypography({
          'data-testid': testId,
          children: content
        })
        
        expect(screen.getByTestId(testId)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Accessibility Testing', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderTypography({
        children: 'Accessible typography content'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with heading variants', async () => {
      const headingVariants: TypographyVariant[] = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      
      for (const variant of headingVariants) {
        const { container, unmount } = renderTypography({
          variant,
          children: `${variant} heading content`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with body text variants', async () => {
      const bodyVariants: TypographyVariant[] = ['subtitle', 'body', 'small', 'overline', 'caption']
      
      for (const variant of bodyVariants) {
        const { container, unmount } = renderTypography({
          variant,
          children: `${variant} text content`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with button variants', async () => {
      const buttonVariants: TypographyVariant[] = ['button1', 'button2', 'button3']
      
      for (const variant of buttonVariants) {
        const { container, unmount } = renderTypography({
          variant,
          children: `${variant} text`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with all color variants', async () => {
      const colorVariants: TypographyColor[] = ['default', 'emphasis', 'subdued', 'interactive', 'error', 'success', 'warning']
      
      for (const color of colorVariants) {
        const { container, unmount } = renderTypography({
          color,
          children: `Text with ${color} color for testing`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with complex content', async () => {
      const { container } = renderTypography({
        variant: 'body',
        children: (
          <>
            Text with <strong>strong emphasis</strong>, <em>italic emphasis</em>,
            and <span>inline elements</span>.
          </>
        )
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should maintain accessibility with variant and color combinations', async () => {
      const combinations = [
        { variant: 'h1' as TypographyVariant, color: 'emphasis' as TypographyColor },
        { variant: 'body' as TypographyVariant, color: 'subdued' as TypographyColor },
        { variant: 'caption' as TypographyVariant, color: 'interactive' as TypographyColor },
        { variant: 'button1' as TypographyVariant, color: 'error' as TypographyColor }
      ]

      for (const { variant, color } of combinations) {
        const { container, unmount } = renderTypography({
          variant,
          color,
          children: `${variant} with ${color} color`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should preserve accessibility with as prop overrides', async () => {
      const overrideTests = [
        { variant: 'body' as TypographyVariant, as: 'h2' as const, children: 'Body styled as h2' },
        { variant: 'h1' as TypographyVariant, as: 'div' as const, children: 'H1 styled as div' }
      ]

      for (const { variant, as, children } of overrideTests) {
        const { container, unmount } = renderTypography({
          variant,
          as,
          children
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })
  })
})
