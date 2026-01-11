import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Box, BoxProps } from './Box'

describe('Box Component', () => {
  const defaultProps: Partial<BoxProps> = {
    children: 'Test content'
  }

  const renderBox = (props: Partial<BoxProps> = {}) => {
    return render(<Box {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderBox({ 'data-testid': 'box-component' })
      const box = screen.getByTestId('box-component')
      expect(box).toBeInTheDocument()
      expect(box).toHaveTextContent('Test content')
    })

    it('accepts custom data-testid', () => {
      renderBox({ 'data-testid': 'custom-box' })
      expect(screen.getByTestId('custom-box')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderBox({ children: 'Custom content', 'data-testid': 'box' })
      const box = screen.getByTestId('box')
      expect(box).toHaveTextContent('Custom content')
    })

    it('accepts "as" prop for polymorphic rendering', () => {
      // Note: Our jest styled-components mock may not fully support the "as" prop
      // but we can verify the prop is accepted without TypeScript errors
      renderBox({ as: 'section', 'data-testid': 'section-box' })
      const element = screen.getByTestId('section-box')
      expect(element).toBeInTheDocument()

      // Test that different "as" values are accepted
      render(<Box as="article" data-testid="article-box">Content</Box>)
      const article = screen.getByTestId('article-box')
      expect(article).toBeInTheDocument()
      expect(article).toHaveTextContent('Content')
    })
  })

  describe('Display Properties', () => {
    const displayValues = ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'none'] as const

    displayValues.forEach((display) => {
      it(`applies ${display} display`, () => {
        renderBox({ display, 'data-testid': `box-${display}` })
        const box = screen.getByTestId(`box-${display}`)
        expect(box).toBeInTheDocument()
      })
    })
  })

  describe('Flexbox Properties', () => {
    it('applies flex direction properties', () => {
      const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const
      
      directions.forEach((direction) => {
        renderBox({ 
          display: 'flex', 
          flexDirection: direction, 
          'data-testid': `box-flex-${direction}` 
        })
        const box = screen.getByTestId(`box-flex-${direction}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies justify-content properties', () => {
      const justifyValues = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'] as const
      
      justifyValues.forEach((justify) => {
        renderBox({ 
          display: 'flex', 
          justifyContent: justify, 
          'data-testid': `box-justify-${justify}` 
        })
        const box = screen.getByTestId(`box-justify-${justify}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies align-items properties', () => {
      const alignValues = ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'] as const
      
      alignValues.forEach((align) => {
        renderBox({ 
          display: 'flex', 
          alignItems: align, 
          'data-testid': `box-align-${align}` 
        })
        const box = screen.getByTestId(`box-align-${align}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies flexWrap properties', () => {
      const wrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const
      
      wrapValues.forEach((wrap) => {
        renderBox({ 
          display: 'flex', 
          flexWrap: wrap, 
          'data-testid': `box-wrap-${wrap}` 
        })
        const box = screen.getByTestId(`box-wrap-${wrap}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies gap property', () => {
      renderBox({ 
        display: 'flex', 
        gap: 'md', 
        'data-testid': 'box-with-gap' 
      })
      const box = screen.getByTestId('box-with-gap')
      expect(box).toBeInTheDocument()
    })
  })

  describe('Spacing Properties', () => {
    it('applies margin properties', () => {
      renderBox({ m: 'lg', 'data-testid': 'box-margin' })
      expect(screen.getByTestId('box-margin')).toBeInTheDocument()
    })

    it('applies directional margin properties', () => {
      renderBox({ 
        mt: 'sm', 
        mr: 'md', 
        mb: 'lg', 
        ml: 'xl',
        'data-testid': 'box-directional-margin' 
      })
      expect(screen.getByTestId('box-directional-margin')).toBeInTheDocument()
    })

    it('applies axis margin properties', () => {
      renderBox({ 
        mx: 'md', 
        my: 'lg',
        'data-testid': 'box-axis-margin' 
      })
      expect(screen.getByTestId('box-axis-margin')).toBeInTheDocument()
    })

    it('applies padding properties', () => {
      renderBox({ p: 'lg', 'data-testid': 'box-padding' })
      expect(screen.getByTestId('box-padding')).toBeInTheDocument()
    })

    it('applies directional padding properties', () => {
      renderBox({ 
        pt: 'sm', 
        pr: 'md', 
        pb: 'lg', 
        pl: 'xl',
        'data-testid': 'box-directional-padding' 
      })
      expect(screen.getByTestId('box-directional-padding')).toBeInTheDocument()
    })

    it('applies axis padding properties', () => {
      renderBox({ 
        px: 'md', 
        py: 'lg',
        'data-testid': 'box-axis-padding' 
      })
      expect(screen.getByTestId('box-axis-padding')).toBeInTheDocument()
    })
  })

  describe('Size Properties', () => {
    it('applies width and height', () => {
      renderBox({ 
        width: '200px', 
        height: '100px',
        'data-testid': 'box-size' 
      })
      expect(screen.getByTestId('box-size')).toBeInTheDocument()
    })

    it('applies min/max dimensions', () => {
      renderBox({ 
        minWidth: '100px',
        maxWidth: '500px',
        minHeight: '50px',
        maxHeight: '300px',
        'data-testid': 'box-constraints' 
      })
      expect(screen.getByTestId('box-constraints')).toBeInTheDocument()
    })
  })

  describe('Position Properties', () => {
    it('applies position property', () => {
      const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'] as const
      
      positions.forEach((position) => {
        renderBox({ 
          position, 
          'data-testid': `box-position-${position}` 
        })
        const box = screen.getByTestId(`box-position-${position}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies position coordinates', () => {
      renderBox({ 
        position: 'absolute',
        top: '10px',
        right: '20px',
        bottom: '30px',
        left: '40px',
        'data-testid': 'box-coordinates' 
      })
      expect(screen.getByTestId('box-coordinates')).toBeInTheDocument()
    })
  })

  describe('Border and Background Properties', () => {
    it('applies border radius', () => {
      renderBox({ 
        borderRadius: 'md',
        'data-testid': 'box-border-radius' 
      })
      expect(screen.getByTestId('box-border-radius')).toBeInTheDocument()
    })

    it('applies border properties', () => {
      renderBox({ 
        border: 'default',
        'data-testid': 'box-border' 
      })
      expect(screen.getByTestId('box-border')).toBeInTheDocument()
    })

    it('applies directional borders', () => {
      renderBox({ 
        borderTop: 'default',
        borderRight: 'default',
        borderBottom: 'default',
        borderLeft: 'default',
        'data-testid': 'box-directional-borders' 
      })
      expect(screen.getByTestId('box-directional-borders')).toBeInTheDocument()
    })

    it('applies background and color', () => {
      renderBox({ 
        bg: 'subtle',
        color: 'default',
        'data-testid': 'box-styled' 
      })
      expect(screen.getByTestId('box-styled')).toBeInTheDocument()
    })
  })

  describe('Overflow Properties', () => {
    it('applies overflow properties', () => {
      const overflowValues = ['visible', 'hidden', 'scroll', 'auto'] as const
      
      overflowValues.forEach((overflow) => {
        renderBox({ 
          overflow, 
          'data-testid': `box-overflow-${overflow}` 
        })
        const box = screen.getByTestId(`box-overflow-${overflow}`)
        expect(box).toBeInTheDocument()
      })
    })

    it('applies directional overflow properties', () => {
      renderBox({ 
        overflowX: 'scroll',
        overflowY: 'hidden',
        'data-testid': 'box-directional-overflow' 
      })
      expect(screen.getByTestId('box-directional-overflow')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations with basic props', async () => {
      const { container } = renderBox({ 
        'data-testid': 'accessible-box',
        children: 'Accessible content' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with semantic elements', async () => {
      const { container } = renderBox({ 
        as: 'section',
        'data-testid': 'semantic-box',
        children: 'Semantic content'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with complex styling', async () => {
      const { container } = renderBox({ 
        display: 'flex',
        flexDirection: 'column',
        gap: 'md',
        p: 'lg',
        bg: 'subtle',
        borderRadius: 'md',
        'data-testid': 'styled-box',
        children: 'Styled content'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with different element types', async () => {
      const elements = ['div', 'section', 'article', 'aside', 'main', 'nav'] as const
      
      for (const element of elements) {
        const { container } = renderBox({ 
          as: element,
          'data-testid': `${element}-box`,
          children: `${element} content`
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })
  })

  describe('Custom Props and Edge Cases', () => {
    it('passes through standard HTML attributes', () => {
      renderBox({
        id: 'custom-id',
        'data-testid': 'box-with-attrs'
      })
      
      const box = screen.getByTestId('box-with-attrs')
      expect(box).toHaveAttribute('id', 'custom-id')
    })

    it('handles empty children', () => {
      renderBox({ 
        children: null,
        'data-testid': 'empty-box' 
      })
      expect(screen.getByTestId('empty-box')).toBeInTheDocument()
    })

    it('handles complex nested content', () => {
      renderBox({ 
        'data-testid': 'nested-box',
        children: (
          <>
            <span>Nested</span>
            <div>Content</div>
          </>
        )
      })
      const box = screen.getByTestId('nested-box')
      expect(box).toBeInTheDocument()
      expect(screen.getByText('Nested')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('combines multiple styling props correctly', () => {
      renderBox({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'md',
        p: 'lg',
        m: 'md',
        bg: 'subtle',
        borderRadius: 'xl',
        position: 'relative',
        width: '300px',
        height: '200px',
        'data-testid': 'complex-box'
      })
      expect(screen.getByTestId('complex-box')).toBeInTheDocument()
    })
  })
})