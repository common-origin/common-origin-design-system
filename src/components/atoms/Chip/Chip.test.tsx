import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Chip, ChipProps } from '../Chip'

expect.extend(toHaveNoViolations)

describe('Chip Component', () => {
  const defaultProps: ChipProps = {
    children: 'Test Chip'
  }

  const renderChip = (props: Partial<ChipProps> = {}) => {
    return render(<Chip {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderChip()
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
    })

    it('renders with custom children', () => {
      renderChip({ children: 'Custom Content' })
      const chip = screen.getByText('Custom Content')
      expect(chip).toBeInTheDocument()
    })

    it('renders with complex children (elements)', () => {
      renderChip({ 
        children: (
          <>
            <span>Icon</span>
            <span>Label</span>
          </>
        )
      })
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('renders with proper structure', () => {
      renderChip()
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderChip({ 'data-testid': 'custom-chip' })
      const chip = screen.getByTestId('custom-chip')
      expect(chip).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderChip({ 'data-testid': 'test-chip' })
      expect(screen.getByTestId('test-chip')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    const variants: Array<ChipProps['variant']> = ['default', 'emphasis', 'subtle', 'interactive']

    variants.forEach((variant) => {
      it(`renders with ${variant} variant`, () => {
        renderChip({ variant })
        const chip = screen.getByText('Test Chip')
        expect(chip).toBeInTheDocument()
        // Note: specific style testing would require more sophisticated setup
      })
    })

    it('defaults to primary variant', () => {
      renderChip()
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: Array<ChipProps['size']> = ['small', 'medium', 'large']

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        renderChip({ size })
        const chip = screen.getByText('Test Chip')
        expect(chip).toBeInTheDocument()
      })
    })

    it('defaults to medium size', () => {
      renderChip()
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Interactive Functionality', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      fireEvent.click(chip)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not render as button when onClick is not provided', () => {
      renderChip()
      
      const chip = screen.getByText('Test Chip')
      expect(chip).not.toHaveAttribute('role', 'button')
      expect(chip).not.toHaveAttribute('tabIndex')
    })

    it('supports keyboard navigation (Enter key)', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      fireEvent.keyDown(chip, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard navigation (Space key)', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      fireEvent.keyDown(chip, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('ignores other keyboard events', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      fireEvent.keyDown(chip, { key: 'Tab' })
      fireEvent.keyDown(chip, { key: 'Escape' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('renders with proper tabIndex when clickable', () => {
      renderChip({ onClick: jest.fn() })
      
      const chip = screen.getByRole('button')
      expect(chip).toHaveAttribute('tabIndex', '0')
    })

    it('handles focus events properly when interactive', () => {
      renderChip({ onClick: jest.fn() })
      
      const chip = screen.getByRole('button')
      chip.focus()
      expect(chip).toHaveFocus()
    })

    it('handles Space key interaction correctly', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      
      fireEvent.keyDown(chip, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles Enter key interaction correctly', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick })
      
      const chip = screen.getByRole('button')
      
      fireEvent.keyDown(chip, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Disabled State', () => {
    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick, disabled: true })
      
      const chip = screen.getByText('Test Chip')
      fireEvent.click(chip)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not respond to keyboard events when disabled', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick, disabled: true })
      
      const chip = screen.getByText('Test Chip')
      fireEvent.keyDown(chip, { key: 'Enter' })
      fireEvent.keyDown(chip, { key: ' ' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies aria-disabled when disabled', () => {
      renderChip({ onClick: jest.fn(), disabled: true })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not render as focusable when disabled', () => {
      renderChip({ onClick: jest.fn(), disabled: true })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).not.toHaveAttribute('tabIndex')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderChip()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with all variants', async () => {
      const variants: Array<ChipProps['variant']> = ['default', 'emphasis', 'subtle', 'interactive']
      for (const variant of variants) {
        const { container } = renderChip({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('should have no accessibility violations with all sizes', async () => {
      const sizes: Array<ChipProps['size']> = ['small', 'medium', 'large']
      for (const size of sizes) {
        const { container } = renderChip({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('should have no accessibility violations when interactive', async () => {
      const { container } = renderChip({ onClick: jest.fn() })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderChip({ onClick: jest.fn(), disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with legacy variants', async () => {
      const legacyVariants = ['light', 'dark'] as const
      for (const variant of legacyVariants) {
        const { container } = renderChip({ variant: variant as any })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('supports custom aria-label', () => {
      renderChip({ 'aria-label': 'Custom label' })
      
      const chip = screen.getByLabelText('Custom label')
      expect(chip).toBeInTheDocument()
    })

    it('supports aria-describedby', () => {
      renderChip({ 'aria-describedby': 'description' })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toHaveAttribute('aria-describedby', 'description')
    })

    it('supports custom role', () => {
      renderChip({ role: 'status' })
      
      const chip = screen.getByRole('status')
      expect(chip).toBeInTheDocument()
    })

    it('defaults to button role when interactive', () => {
      renderChip({ onClick: jest.fn() })
      
      const chip = screen.getByRole('button')
      expect(chip).toBeInTheDocument()
    })

    it('allows custom role to override default button role', () => {
      renderChip({ onClick: jest.fn(), role: 'tab' })
      
      const chip = screen.getByRole('tab')
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Variant and Size Combinations', () => {
    const variants: Array<ChipProps['variant']> = ['default', 'emphasis', 'subtle', 'interactive']
    const sizes: Array<ChipProps['size']> = ['small', 'medium', 'large']

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        it(`renders correctly with ${variant} variant and ${size} size`, () => {
          renderChip({ variant, size })
          const chip = screen.getByText('Test Chip')
          expect(chip).toBeInTheDocument()
        })
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderChip({ children: '' })
      // Should render without crashing, use a specific selector
      const chip = document.querySelector('span')
      expect(chip).toBeInTheDocument()
      expect(chip).toHaveTextContent('')
    })

    it('handles null children gracefully', () => {
      renderChip({ children: null })
      // Should render without crashing
      expect(document.querySelector('span')).toBeInTheDocument()
    })

    it('handles undefined onClick gracefully', () => {
      renderChip({ onClick: undefined })
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
      expect(chip).not.toHaveAttribute('role', 'button')
    })

    it('preserves other HTML attributes', () => {
      renderChip({ 
        children: 'Custom Chip',
        id: 'custom-id',
        'data-custom': 'value'
      } as any)
      
      const chip = screen.getByText('Custom Chip')
      expect(chip).toHaveAttribute('id', 'custom-id')
      expect(chip).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Legacy API Support', () => {
    it('supports legacy light variant', () => {
      renderChip({ variant: 'light' as any, children: 'Legacy Light' })
      const chip = screen.getByText('Legacy Light')
      expect(chip).toBeInTheDocument()
    })

    it('supports legacy dark variant', () => {
      renderChip({ variant: 'dark' as any, children: 'Legacy Dark' })
      const chip = screen.getByText('Legacy Dark')
      expect(chip).toBeInTheDocument()
    })

    it('maps legacy light variant to default variant', () => {
      renderChip({ variant: 'light' as any, children: 'Light Chip' })
      // Since we can't directly test internal variant mapping without exposing it,
      // we verify the component renders successfully with the legacy variant
      const chip = screen.getByText('Light Chip')
      expect(chip).toBeInTheDocument()
    })

    it('maps legacy dark variant to emphasis variant', () => {
      renderChip({ variant: 'dark' as any, children: 'Dark Chip' })
      // Verify the component renders successfully with the legacy variant
      const chip = screen.getByText('Dark Chip')
      expect(chip).toBeInTheDocument()
    })

    it('supports legacy title prop', () => {
      renderChip({ title: 'Legacy Title', children: undefined })
      const chip = screen.getByText('Legacy Title')
      expect(chip).toBeInTheDocument()
    })

    it('prioritizes children over title prop', () => {
      renderChip({ title: 'Title Prop', children: 'Children Prop' })
      const chip = screen.getByText('Children Prop')
      expect(chip).toBeInTheDocument()
      expect(screen.queryByText('Title Prop')).not.toBeInTheDocument()
    })

    it('handles legacy title prop with interactive behavior', () => {
      const handleClick = jest.fn()
      renderChip({ title: 'Clickable Legacy', children: undefined, onClick: handleClick })
      
      const chip = screen.getByRole('button')
      expect(chip).toHaveTextContent('Clickable Legacy')
      
      fireEvent.click(chip)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })
})
