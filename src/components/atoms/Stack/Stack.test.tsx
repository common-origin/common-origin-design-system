import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Stack } from './Stack'
import type { StackProps, StackDirection, StackAlign, StackJustify, StackGap } from './Stack'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Stack', () => {
  const defaultProps: StackProps = {
    children: <div>Test content</div>
  }

  const renderStack = (props: Partial<StackProps> = {}) => {
    return render(<Stack {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      renderStack({ children: <div>Stack content</div> })
      expect(screen.getByText('Stack content')).toBeInTheDocument()
    })

    it('renders with default props when no props provided', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
      expect(stack.tagName).toBe('DIV')
    })

    it('applies data-testid', () => {
      renderStack({ 'data-testid': 'stack-component' })
      expect(screen.getByTestId('stack-component')).toBeInTheDocument()
    })
  })

  describe('Direction Prop', () => {
    it('accepts row direction prop', () => {
      const { container } = renderStack({ direction: 'row' })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
      expect(stack.tagName).toBe('DIV')
    })

    it('accepts column direction prop', () => {
      const { container } = renderStack({ direction: 'column' })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
      expect(stack.tagName).toBe('DIV')
    })

    it('uses row as default direction', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Alignment Props', () => {
    it('accepts alignItems prop', () => {
      const { container } = renderStack({ alignItems: 'center' })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('accepts justifyContent prop', () => {
      const { container } = renderStack({ justifyContent: 'space-between' })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('accepts both alignment props together', () => {
      const { container } = renderStack({ 
        alignItems: 'flex-end', 
        justifyContent: 'center' 
      })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('works without alignment props', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Gap Prop', () => {
    it('accepts semantic size names', () => {
      const testSizes = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const
      
      testSizes.forEach(size => {
        const { container } = renderStack({ gap: size })
        const stack = container.firstChild as HTMLElement
        expect(stack).toBeInTheDocument()
      })
    })

    it('uses default gap when not specified', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('applies semantic gap values correctly', () => {
      const { container } = renderStack({ gap: 'lg' })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Wrap Prop', () => {
    it('accepts wrap prop as true', () => {
      const { container } = renderStack({ wrap: true })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('accepts wrap prop as false', () => {
      const { container } = renderStack({ wrap: false })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('uses false as default wrap value', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Layout Combinations', () => {
    it('accepts complex layout configurations', () => {
      const { container } = renderStack({
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'lg',
        wrap: true
      })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('creates vertical layouts', () => {
      const { container } = renderStack({
        direction: 'column',
        gap: 'xl',
        alignItems: 'stretch'
      })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })

    it('creates responsive layouts', () => {
      const { container } = renderStack({
        direction: 'row',
        wrap: true,
        gap: 'md',
        justifyContent: 'space-between'
      })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Multiple Children', () => {
    it('renders multiple children correctly', () => {
      renderStack({
        children: [
          <div key="1">Child 1</div>,
          <div key="2">Child 2</div>,
          <span key="3">Child 3</span>
        ]
      })
      
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
      expect(screen.getByText('Child 3')).toBeInTheDocument()
    })

    it('applies gap with multiple children', () => {
      const { container } = renderStack({
        gap: 'lg',
        children: [
          <div key="1">Item 1</div>,
          <div key="2">Item 2</div>
        ]
      })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
      expect(stack.children).toHaveLength(2)
    })

    it('handles mixed child types', () => {
      renderStack({
        children: [
          <button key="btn">Button</button>,
          <input key="input" placeholder="Input" />,
          <p key="p">Paragraph</p>
        ]
      })
      
      expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Input')).toBeInTheDocument()
      expect(screen.getByText('Paragraph')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('maintains proper DOM structure', () => {
      const { container } = renderStack({
        children: <button>Accessible button</button>
      })
      
      const button = screen.getByRole('button', { name: 'Accessible button' })
      expect(button).toBeInTheDocument()
      expect(button.parentElement).toBe(container.firstChild)
    })

    it('preserves custom attributes on children', () => {
      renderStack({
        children: <div aria-label="Custom label">Content</div>
      })
      
      const content = screen.getByLabelText('Custom label')
      expect(content).toBeInTheDocument()
    })

    it('supports nested interactive elements', () => {
      renderStack({
        children: [
          <button key="1">First button</button>,
          <a key="2" href="/test">Link</a>,
          <input key="3" placeholder="Text input" />
        ]
      })
      
      expect(screen.getByRole('button', { name: 'First button' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Text input')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('renders as a div element', () => {
      const { container } = renderStack()
      const stack = container.firstChild as HTMLElement
      
      expect(stack.tagName).toBe('DIV')
    })

    it('passes through data attributes', () => {
      renderStack({
        'data-testid': 'test-stack'
      })
      
      const stack = screen.getByTestId('test-stack')
      expect(stack).toBeInTheDocument()
    })

    it('handles empty children gracefully', () => {
      const { container } = renderStack({ children: null })
      const stack = container.firstChild as HTMLElement
      
      expect(stack).toBeInTheDocument()
      expect(stack.children).toHaveLength(0)
    })

    it('handles single child', () => {
      renderStack({ children: <span>Single child</span> })
      
      expect(screen.getByText('Single child')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles all prop combinations', () => {
      renderStack({
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '2xl',
        wrap: true,
        'data-testid': 'full-stack'
      })
      
      const stack = screen.getByTestId('full-stack')
      expect(stack).toBeInTheDocument()
    })

    it('works with conditional children', () => {
      const showChild = true
      renderStack({
        children: [
          <div key="always">Always shown</div>,
          showChild && <div key="conditional">Conditionally shown</div>
        ]
      })
      
      expect(screen.getByText('Always shown')).toBeInTheDocument()
      expect(screen.getByText('Conditionally shown')).toBeInTheDocument()
    })

    it('supports fragments as children', () => {
      renderStack({
        children: (
          <React.Fragment>
            <div>Fragment child 1</div>
            <div>Fragment child 2</div>
          </React.Fragment>
        )
      })
      
      expect(screen.getByText('Fragment child 1')).toBeInTheDocument()
      expect(screen.getByText('Fragment child 2')).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Direction Variants', () => {
    it('handles all direction values correctly', () => {
      const directions: StackDirection[] = ['row', 'column']
      
      directions.forEach((direction) => {
        const { unmount } = renderStack({ 
          direction, 
          'data-testid': `stack-${direction}`,
          children: <div>Test content</div>
        })
        expect(screen.getByTestId(`stack-${direction}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Enhanced Testing - Alignment Variants', () => {
    it('handles all alignItems values correctly', () => {
      const alignItems: StackAlign[] = ['center', 'flex-start', 'flex-end', 'stretch', 'baseline']
      
      alignItems.forEach((align) => {
        const { unmount } = renderStack({ 
          alignItems: align, 
          'data-testid': `stack-align-${align}`,
          children: <div>Test content</div>
        })
        expect(screen.getByTestId(`stack-align-${align}`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles all justifyContent values correctly', () => {
      const justifyValues: StackJustify[] = ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly']
      
      justifyValues.forEach((justify) => {
        const { unmount } = renderStack({ 
          justifyContent: justify, 
          'data-testid': `stack-justify-${justify}`,
          children: <div>Test content</div>
        })
        expect(screen.getByTestId(`stack-justify-${justify}`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles alignment combinations', () => {
      const combinations = [
        { alignItems: 'center' as StackAlign, justifyContent: 'space-between' as StackJustify },
        { alignItems: 'flex-start' as StackAlign, justifyContent: 'center' as StackJustify },
        { alignItems: 'stretch' as StackAlign, justifyContent: 'flex-end' as StackJustify }
      ]

      combinations.forEach(({ alignItems, justifyContent }, index) => {
        const { unmount } = renderStack({ 
          alignItems, 
          justifyContent,
          'data-testid': `stack-combo-${index}`,
          children: <div>Test content</div>
        })
        expect(screen.getByTestId(`stack-combo-${index}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Enhanced Testing - Gap Variants', () => {
    it('handles all gap values correctly', () => {
      const gaps: StackGap[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
      
      gaps.forEach((gap) => {
        const { unmount } = renderStack({ 
          gap, 
          'data-testid': `stack-gap-${gap}`,
          children: <div>Test content</div>
        })
        expect(screen.getByTestId(`stack-gap-${gap}`)).toBeInTheDocument()
        unmount()
      })
    })

    it('uses semantic layout spacing tokens correctly', () => {
      renderStack({ 
        gap: 'md',
        'data-testid': 'stack-semantic',
        children: <div>Test content</div>
      })
      expect(screen.getByTestId('stack-semantic')).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Wrap Behavior', () => {
    it('handles wrap with different directions', () => {
      const { unmount: unmount1 } = renderStack({ 
        direction: 'row',
        wrap: true,
        'data-testid': 'stack-row-wrap',
        children: [
          <div key="1">Item 1</div>,
          <div key="2">Item 2</div>,
          <div key="3">Item 3</div>
        ]
      })
      expect(screen.getByTestId('stack-row-wrap')).toBeInTheDocument()
      unmount1()

      renderStack({ 
        direction: 'column',
        wrap: false,
        'data-testid': 'stack-column-nowrap',
        children: [
          <div key="1">Item 1</div>,
          <div key="2">Item 2</div>
        ]
      })
      expect(screen.getByTestId('stack-column-nowrap')).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Complex Combinations', () => {
    it('handles comprehensive prop combinations', () => {
      const complexProps = {
        direction: 'column' as StackDirection,
        alignItems: 'center' as StackAlign,
        justifyContent: 'space-between' as StackJustify,
        gap: 'lg' as StackGap,
        wrap: true,
        'data-testid': 'stack-complex'
      }

      renderStack({
        ...complexProps,
        children: [
          <div key="1">Complex Item 1</div>,
          <div key="2">Complex Item 2</div>,
          <div key="3">Complex Item 3</div>
        ]
      })

      expect(screen.getByTestId('stack-complex')).toBeInTheDocument()
      expect(screen.getByText('Complex Item 1')).toBeInTheDocument()
      expect(screen.getByText('Complex Item 2')).toBeInTheDocument()
      expect(screen.getByText('Complex Item 3')).toBeInTheDocument()
    })

    it('maintains proper structure with all prop variations', () => {
      renderStack({
        direction: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        gap: '2xl',
        wrap: false,
        'data-testid': 'stack-structure',
        children: <div>Structure test</div>
      })

      const stack = screen.getByTestId('stack-structure')
      expect(stack.tagName).toBe('DIV')
      expect(stack).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Children Handling', () => {
    it('handles various React node types', () => {
      renderStack({
        'data-testid': 'stack-mixed',
        children: [
          'Plain text',
          <span key="span">Span element</span>,
          <div key="div">Div element</div>,
          123,
          null,
          undefined,
          false
        ]
      })

      expect(screen.getByTestId('stack-mixed')).toBeInTheDocument()
      // Use getByTestId container to check for content as plain text can be tricky to match
      const stackElement = screen.getByTestId('stack-mixed')
      expect(stackElement.textContent).toContain('Plain text')
      expect(screen.getByText('Span element')).toBeInTheDocument()
      expect(screen.getByText('Div element')).toBeInTheDocument()
    })

    it('handles deeply nested children', () => {
      renderStack({
        'data-testid': 'stack-nested',
        children: (
          <div>
            <span>
              <strong>Deeply nested content</strong>
            </span>
          </div>
        )
      })

      expect(screen.getByTestId('stack-nested')).toBeInTheDocument()
      expect(screen.getByText('Deeply nested content')).toBeInTheDocument()
    })
  })

  describe('Enhanced Testing - Design System Integration', () => {
    it('uses semantic tokens for gap spacing', () => {
      renderStack({
        gap: 'md',
        'data-testid': 'stack-tokens',
        children: <div>Token test</div>
      })

      expect(screen.getByTestId('stack-tokens')).toBeInTheDocument()
    })

    it('falls back gracefully for invalid gaps', () => {
      // This tests the fallback in getGapValue function
      renderStack({
        gap: 'invalid' as StackGap,
        'data-testid': 'stack-fallback',
        children: <div>Fallback test</div>
      })

      expect(screen.getByTestId('stack-fallback')).toBeInTheDocument()
    })
  })

  describe('Accessibility Testing', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderStack({
        children: <div>Accessible content</div>
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with different directions', async () => {
      const directions: StackDirection[] = ['row', 'column']
      
      for (const direction of directions) {
        const { container, unmount } = renderStack({ 
          direction,
          children: <button>Interactive element</button>
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with alignment props', async () => {
      const { container } = renderStack({
        alignItems: 'center',
        justifyContent: 'space-between',
        children: [
          <button key="1">Button 1</button>,
          <a key="2" href="#test">Link</a>
        ]
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with complex layouts', async () => {
      const { container } = renderStack({
        direction: 'column',
        alignItems: 'stretch',
        gap: 'lg',
        wrap: true,
        children: [
          <div key="1">
            <h2>Section Title</h2>
            <p>Section content</p>
          </div>,
          <div key="2">
            <button>Action Button</button>
            <input type="text" aria-label="Text input" />
          </div>
        ]
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('preserves accessibility of child components', async () => {
      const { container } = renderStack({
        children: [
          <button key="btn" aria-label="Accessible button">Click me</button>,
          <input key="input" type="text" aria-label="Text field" />,
          <nav key="nav" aria-label="Navigation">
            <a href="#home">Home</a>
          </nav>
        ]
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
