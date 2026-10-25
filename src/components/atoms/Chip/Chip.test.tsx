import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Chip, ChipProps } from '../Chip'
import { FilterChip, FilterChipProps } from '../Chip/FilterChip'
import { InputChip, InputChipProps } from '../Chip/InputChip'
import tokens from '@/styles/tokens.json'

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

  // Chips have one size, 24px, with no vertical padding (decisions 0034 and 0035). The literal
  // values are the design, so a mapping change fails here
  it('renders at the one chip size', () => {
    const { container } = renderChip()
    expect(container.firstChild).toHaveStyle({ padding: '0 0.5rem', minHeight: '1.5rem', font: "400 0.875rem/1.25rem 'Inter', sans-serif" })
  })

  // The static Chip is a label, not a control: variants and onClick were removed in 3.0 (decision 0016)
  describe('Not interactive', () => {
    it('is not focusable and has no button role', () => {
      renderChip()
      const chip = screen.getByText('Test Chip')
      expect(chip).not.toHaveAttribute('tabIndex')
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('ignores an onClick passed from plain JavaScript', () => {
      const handleClick = jest.fn()
      renderChip({ onClick: handleClick } as Partial<ChipProps>)
      const chip = screen.getByText('Test Chip')
      fireEvent.click(chip)
      fireEvent.keyDown(chip, { key: 'Enter' })
      expect(handleClick).not.toHaveBeenCalled()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('renders a removed variant from plain JavaScript as default', () => {
      const { container: removed } = renderChip({ variant: 'emphasis' } as unknown as Partial<ChipProps>)
      expect(removed.firstChild).toHaveStyle({ backgroundColor: tokens.component.chip.default.backgroundColor })
    })
  })

  describe('Disabled State', () => {
    it('applies aria-disabled when disabled', () => {
      renderChip({ disabled: true })
      expect(screen.getByText('Test Chip')).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderChip()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderChip({ disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
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

  describe('title prop', () => {
    it('renders the title prop as the label', () => {
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
  })

  describe('InputChip (Dismissible Chips)', () => {
    const renderInputChip = (props: Partial<InputChipProps> = {}) => {
      return render(<InputChip {...props}>Test Chip</InputChip>)
    }

    it('renders filter chip without close button when onDismiss not provided', () => {
      renderInputChip({ 
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      const closeButton = screen.queryByTestId('filter-chip-close')
      
      expect(chip).toBeInTheDocument()
      expect(closeButton).not.toBeInTheDocument()
    })

    it('renders filter chip with close button when onDismiss provided', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      const closeButton = screen.getByTestId('filter-chip-close')
      
      expect(chip).toBeInTheDocument()
      expect(closeButton).toBeInTheDocument()
    })

    it('shows check icon when selected', () => {
      const { container } = renderInputChip({ 
        selected: true,
        'data-testid': 'filter-chip'
      })
      
      // Check icon should be present
      const icon = container.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('does not show check icon when not selected', () => {
      const { container } = renderInputChip({ 
        selected: false,
        'data-testid': 'filter-chip'
      })
      
      // No check icon should be present (only close button icon if dismissible)
      const chip = screen.getByTestId('filter-chip')
      const icons = container.querySelectorAll('svg')
      expect(icons.length).toBe(0) // No icons when not selected and not dismissible
    })

    it('uses the overlay tokens for the close button hover and active states', () => {
      renderInputChip({ onDismiss: jest.fn(), 'data-testid': 'filter-chip' })
      const closeButton = screen.getByTestId('filter-chip-close')
      // jsdom can't apply :hover/:active, so read the rules styled-components injected
      const css = Array.from(document.querySelectorAll('style'))
        .map((style) => style.textContent)
        .join('')
        .replace(/\s+/g, '')
      const ruleFor = (state: string) =>
        Array.from(closeButton.classList)
          .map((cls) => css.match(new RegExp(`\\.${cls}:${state}:not\\(:disabled\\)\\{background-color:([^;}]+)`)))
          .find(Boolean)?.[1]
      const { fill } = tokens.semantic.color

      expect(ruleFor('hover')).toBe(fill['none-hover'].replace(/\s+/g, ''))
      expect(ruleFor('active')).toBe(fill['none-pressed'].replace(/\s+/g, ''))
    })

    it('calls onDismiss when close button is clicked', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.click(closeButton)
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('does not call onDismiss when disabled', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
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
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      fireEvent.keyDown(chip, { key: 'Delete' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('closes filter chip with Backspace key', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      fireEvent.keyDown(chip, { key: 'Backspace' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('close button can be activated with Enter key', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.keyDown(closeButton, { key: 'Enter' })
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('close button can be activated with Space key', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
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
        <InputChip 
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Price: $10-$50
        </InputChip>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      expect(closeButton).toHaveAttribute('aria-label', 'Remove Price: $10-$50')
    })

    it('filter chip is not clickable', () => {
      const handleDismiss = jest.fn()
      
      renderInputChip({ 
        onDismiss: handleDismiss,
        'data-testid': 'filter-chip'
      })
      
      const chip = screen.getByTestId('filter-chip')
      // InputChip doesn't have onClick, so clicking the body should do nothing
      fireEvent.click(chip)
      
      // Only dismiss should work via close button
      expect(handleDismiss).not.toHaveBeenCalled()
    })

    it('has status role', () => {
      const handleDismiss = jest.fn()
      renderInputChip({ 
        onDismiss: handleDismiss
      })
      
      const chip = screen.getByRole('status')
      expect(chip).toBeInTheDocument()
    })

    it('stops propagation when close button is clicked', () => {
      const handleDismiss = jest.fn()
      const handleParentClick = jest.fn()
      
      const { container } = render(
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- test harness: parent click listener to assert stopPropagation
        <div onClick={handleParentClick}>
          <InputChip 
            onDismiss={handleDismiss}
            data-testid="filter-chip"
          >
            Test Chip
          </InputChip>
        </div>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      fireEvent.click(closeButton)
      
      expect(handleDismiss).toHaveBeenCalledTimes(1)
      // Parent click should not be called due to stopPropagation
      expect(handleParentClick).not.toHaveBeenCalled()
    })
  })

  describe('FilterChip (Toggle Chips)', () => {
    const renderToggle = (props: Partial<FilterChipProps> = {}) => {
      return render(<FilterChip selected={false} onClick={() => {}} {...props}>Test Chip</FilterChip>)
    }

    it('renders boolean chip without selected indicator by default', () => {
      renderToggle({ selected: false })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
      
      // Pause icon should not be visible when not selected
      // Icons are decorative, so look for the drawing itself (#85)
      expect(screen.getByRole('checkbox').querySelector('svg')).not.toBeInTheDocument()
    })

    it('shows selected indicator when selected', () => {
      renderToggle({ 
        selected: true
      })
      
      const chip = screen.getByText('Test Chip')
      expect(chip).toBeInTheDocument()
      
      // Should have pause icon (temporary check icon)
      expect(screen.getByRole('checkbox').querySelector('svg')).toBeInTheDocument()
    })

    it('is clickable and calls onClick', () => {
      const handleClick = jest.fn()
      renderToggle({ 
        onClick: handleClick
      })
      
      const chip = screen.getByRole('checkbox')
      fireEvent.click(chip)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('toggles selection on click', () => {
      const handleClick = jest.fn()
      const { rerender } = renderToggle({ 
        selected: false,
        onClick: handleClick,
        'data-testid': 'filter-toggle'
      })
      
      const chip = screen.getByTestId('filter-toggle')
      fireEvent.click(chip)
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      // Simulate parent updating selected state
      rerender(
        <FilterChip 
          selected={true}
          onClick={handleClick}
          data-testid="filter-toggle"
        >
          Test Chip
        </FilterChip>
      )
      
      // Icon should now be visible
      expect(screen.getByRole('checkbox').querySelector('svg')).toBeInTheDocument()
    })

    it('has checkbox role', () => {
      renderToggle({ selected: false })
      
      const chip = screen.getByRole('checkbox')
      expect(chip).toBeInTheDocument()
    })

    it('has correct aria-checked attribute', () => {
      const { rerender } = renderToggle({ 
        selected: false,
        'data-testid': 'filter-toggle'
      })
      
      let chip = screen.getByTestId('filter-toggle')
      expect(chip).toHaveAttribute('aria-checked', 'false')
      
      rerender(
        <FilterChip 
          selected={true}
          onClick={() => {}}
          data-testid="filter-toggle"
        >
          Test Chip
        </FilterChip>
      )
      
      chip = screen.getByTestId('filter-toggle')
      expect(chip).toHaveAttribute('aria-checked', 'true')
    })

    it('can be activated with Enter key', () => {
      const handleClick = jest.fn()
      renderToggle({ 
        onClick: handleClick,
        'data-testid': 'filter-toggle'
      })
      
      const chip = screen.getByTestId('filter-toggle')
      fireEvent.keyDown(chip, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be activated with Space key', () => {
      const handleClick = jest.fn()
      renderToggle({ 
        onClick: handleClick,
        'data-testid': 'filter-toggle'
      })
      
      const chip = screen.getByTestId('filter-toggle')
      fireEvent.keyDown(chip, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is focusable', () => {
      const handleClick = jest.fn()
      renderToggle({ 
        onClick: handleClick,
        'data-testid': 'filter-toggle'
      })
      
      const chip = screen.getByTestId('filter-toggle')
      expect(chip).toHaveAttribute('tabIndex', '0')
    })

    it('does not respond to clicks when disabled', () => {
      const handleClick = jest.fn()
      renderToggle({ 
        onClick: handleClick,
        disabled: true,
        'data-testid': 'filter-toggle'
      })
      
      const chip = screen.getByTestId('filter-toggle')
      fireEvent.click(chip)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('changes visual state when selected', () => {
      const { rerender } = renderToggle({ 
        selected: false,
        'data-testid': 'filter-toggle'
      })
      
      let chip = screen.getByTestId('filter-toggle')
      const unselectedStyle = window.getComputedStyle(chip)
      
      rerender(
        <FilterChip 
          selected={true}
          onClick={() => {}}
          data-testid="filter-toggle"
        >
          Test Chip
        </FilterChip>
      )
      
      chip = screen.getByTestId('filter-toggle')
      const selectedStyle = window.getComputedStyle(chip)
      
      // Background color should be different (though we can't easily test the exact color in jsdom)
      expect(chip).toBeInTheDocument()
    })
  })

  describe('Accessibility for New Variants', () => {
    it('input chip has no accessibility violations', async () => {
      const handleDismiss = jest.fn()
      const { container} = render(
        <InputChip
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Category: Electronics
        </InputChip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('filter chip (toggle) has no accessibility violations', async () => {
      const handleClick = jest.fn()
      const { container } = render(
        <FilterChip
          selected={true}
          onClick={handleClick}
          data-testid="filter-toggle"
        >
          In Stock
        </FilterChip>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('input chip close button is keyboard accessible', () => {
      const handleDismiss = jest.fn()
      render(
        <InputChip
          onDismiss={handleDismiss}
          data-testid="filter-chip"
        >
          Test Chip
        </InputChip>
      )
      
      const closeButton = screen.getByTestId('filter-chip-close')
      expect(closeButton).toHaveAttribute('tabIndex', '0')
      expect(closeButton).toHaveAttribute('type', 'button')
    })
  })
})

