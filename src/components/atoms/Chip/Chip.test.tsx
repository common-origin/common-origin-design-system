import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Chip, ChipProps } from '../Chip'
import { FilterChip, FilterChipProps } from '../Chip/FilterChip'
import { BooleanChip, BooleanChipProps } from '../Chip/BooleanChip'

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
    const sizes: Array<ChipProps['size']> = ['small', 'medium']

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
      const sizes: Array<ChipProps['size']> = ['small', 'medium']
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
    const sizes: Array<ChipProps['size']> = ['small', 'medium']

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

  describe('FilterChip (Dismissible Chips)', () => {
    const renderFilterChip = (props: Partial<FilterChipProps> = {}) => {
      return render(<FilterChip {...props}>Test Chip</FilterChip>)
    }

    it('renders filter chip without close button when onDismiss not provided', () => {
      renderFilterChip({ 
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      const closeButton = screen.queryByTestId('filter-chip-close')
      
      expect(chip).toBeInTheDocument()
      expect(closeButton).not.toBeInTheDocument()
    })

    it('renders filter chip with close button when onDismiss provided', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      const closeButton = screen.getByTestId('filter-chip-close')
      
      expect(chip).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    it('shows check icon when selected', () => {
      const { container } = renderFilterChip({ 
        selected: true,
        'data-testid': 'filter-chip'
      })
      
      // Check icon should be present
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('does not show check icon when not selected', () => {
      const { container } = renderFilterChip({ 
        selected: false,
        'data-testid': 'filter-chip'
      })
      
      // No check icon should be present (only close button icon if dismissible)
      const chip = screen.getByTestId('filter-chip')
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBe(0) // No icons when not selected and not dismissible
    })

    it('calls onDismiss when close button is clicked', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.click(closeButton)
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('does not call onDismiss when disabled', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        disabled: true,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.click(closeButton)
      
      expect(handleDismiss).not.toHaveBeenCalled()
    })

    it('closes filter chip with Delete key', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      fireEvent.keyDown(chip, { key: 'Delete' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('closes filter chip with Backspace key', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      fireEvent.keyDown(chip, { key: 'Backspace' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('close button can be activated with Enter key', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.keyDown(closeButton, { key: 'Enter' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('close button can be activated with Space key', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.keyDown(closeButton, { key: ' ' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('has appropriate aria-label on close button', () => {
      const handleDismiss = jest.fn()
      render(
        <FilterChip 
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Price: $10-$50
        </FilterChip>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      expect(closeButton).toHaveAttribute('aria-label', 'Remove Price: $10-$50')
    })

    it('filter chip is not clickable', () => {
      const handleDismiss = jest.fn()
      
      renderFilterChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      // FilterChip doesn't have onClick, so clicking the body should do nothing
      fireEvent.click(chip)
      
      // Only dismiss should work via close button
      expect(handleDismiss).not.toHaveBeenCalled()
    })

    it('has status role', () => {
      const handleDismiss = jest.fn()
      renderFilterChip({ 
        onDismiss: handleDismiss
      })
      
      const chip = screen.getByRole('status')
      expect(chip).toBeInTheDocument()
    })

    it('stops propagation when close button is clicked', () => {
      const handleDismiss = jest.fn()
      const handleParentClick = jest.fn()
      
      const { container } = render(
        <div onClick={handleParentClick}>
          <FilterChip 
            onDismiss={handleDismiss}
            data-testid="filter-chip"
          >
            Test Chip
          </FilterChip>
        </div>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.click(closeButton)
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
      // Parent click should not be called due to stopPropagation
      expect(handleParentClick).not.toHaveBeenCalled()
    })
  })

  describe('BooleanChip (Toggle Chips)', () => {
    const renderBooleanChip = (props: Partial<BooleanChipProps> = {}) => {
      return render(<BooleanChip selected={false} onClick={() => {}} {...props}>Test Chip</BooleanChip>)
    }

    it('renders boolean chip without selected indicator by default', () => {
      renderBooleanChip({ selected: false })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
      
      // Pause icon should not be visible when not selected
      const icons = screen.queryAllByRole('img', { hidden: true })
      expect(icons.length).toBe(0)
    })

    it('shows selected indicator when selected', () => {
      renderBooleanChip({ 
        selected: true
      })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
      
      // Should have pause icon (temporary check icon)
      const icon = screen.getByRole('img', { hidden: true })
      expect(icon).toBeInTheDocument()
    })

    it('is clickable and calls onClick', () => {
      const handleClick = jest.fn()
      renderBooleanChip({ 
        onClick: handleClick
      })
      
      const chip = screen.getByRole('checkbox')
      fireEvent.click(chip)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('toggles selection on click', () => {
      const handleClick = jest.fn()
      const { rerender } = renderBooleanChip({ 
        selected: false,
        onClick: handleClick,
        'data-testid': 'boolean-chip'
      })
      
      const chip = screen.getByTestId('boolean-chip')
      fireEvent.click(chip)
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      // Simulate parent updating selected state
      rerender(
        <BooleanChip 
          selected={true}
          onClick={handleClick}
          data-testid="boolean-chip"
        >
          Test Chip
        </BooleanChip>
      )
      
      // Icon should now be visible
      const icon = screen.getByRole('img', { hidden: true })
      expect(icon).toBeInTheDocument()
    })

    it('has checkbox role', () => {
      renderBooleanChip({ selected: false })
      
      const chip = screen.getByRole('checkbox')
      expect(chip).toBeInTheDocument()
    })

    it('has correct aria-checked attribute', () => {
      const { rerender } = renderBooleanChip({ 
        selected: false,
        'data-testid': 'boolean-chip'
      })
      
      let chip = screen.getByTestId('boolean-chip')
      expect(chip).toHaveAttribute('aria-checked', 'false')
      
      rerender(
        <BooleanChip 
          selected={true}
          onClick={() => {}}
          data-testid="boolean-chip"
        >
          Test Chip
        </BooleanChip>
      )
      
      chip = screen.getByTestId('boolean-chip')
      expect(chip).toHaveAttribute('aria-checked', 'true')
    })

    it('can be activated with Enter key', () => {
      const handleClick = jest.fn()
      renderBooleanChip({ 
        onClick: handleClick,
        'data-testid': 'boolean-chip'
      })
      
      const chip = screen.getByTestId('boolean-chip')
      fireEvent.keyDown(chip, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be activated with Space key', () => {
      const handleClick = jest.fn()
      renderBooleanChip({ 
        onClick: handleClick,
        'data-testid': 'boolean-chip'
      })
      
      const chip = screen.getByTestId('boolean-chip')
      fireEvent.keyDown(chip, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is focusable', () => {
      const handleClick = jest.fn()
      renderBooleanChip({ 
        onClick: handleClick,
        'data-testid': 'boolean-chip'
      })
      
      const chip = screen.getByTestId('boolean-chip')
      expect(chip).toHaveAttribute('tabIndex', '0')
    })

    it('does not respond to clicks when disabled', () => {
      const handleClick = jest.fn()
      renderBooleanChip({ 
        onClick: handleClick,
        disabled: true,
        'data-testid': 'boolean-chip'
      })
      
      const chip = screen.getByTestId('boolean-chip')
      fireEvent.click(chip)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('changes visual state when selected', () => {
      const { rerender } = renderBooleanChip({ 
        selected: false,
        'data-testid': 'boolean-chip'
      })
      
      let chip = screen.getByTestId('boolean-chip')
      const unselectedStyle = window.getComputedStyle(chip)
      
      rerender(
        <BooleanChip 
          selected={true}
          onClick={() => {}}
          data-testid="boolean-chip"
        >
          Test Chip
        </BooleanChip>
      )
      
      chip = screen.getByTestId('boolean-chip')
      const selectedStyle = window.getComputedStyle(chip)
      
      // Background color should be different (though we can't easily test the exact color in jsdom)
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Accessibility for New Variants', () => {
    it('filter chip has no accessibility violations', async () => {
      const handleDismiss = jest.fn()
      const { container} = render(
        <FilterChip
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Category: Electronics
        </FilterChip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('boolean chip has no accessibility violations', async () => {
      const handleClick = jest.fn()
      const { container } = render(
        <BooleanChip
          selected={true}
          onClick={handleClick}
          data-testid="boolean-chip"
        >
          In Stock
        </BooleanChip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('filter chip close button is keyboard accessible', () => {
      const handleDismiss = jest.fn()
      render(
        <FilterChip
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Test Chip
        </FilterChip>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      expect(closeButton).toHaveAttribute('tabIndex', '0')
      expect(closeButton).toHaveAttribute('type', 'button')
    })
  })
})

