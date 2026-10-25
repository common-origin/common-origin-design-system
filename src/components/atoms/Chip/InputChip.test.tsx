import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InputChip } from './InputChip'
import { FilterChip } from './FilterChip'
import tokens from '@/styles/tokens.json'
import { contrastRatio, pseudoClassDeclarations } from '../../../test-utils/contrast'

expect.extend(toHaveNoViolations)

const { fill, text } = tokens.semantic.color

describe('InputChip', () => {
  it('renders its value', () => {
    render(<InputChip data-testid="chip">Category: Electronics</InputChip>)
    expect(screen.getByTestId('chip')).toHaveTextContent('Category: Electronics')
    expect(screen.getByTestId('chip')).toHaveAttribute('role', 'status')
  })

  it('shows a close button only when onDismiss is provided', () => {
    const { rerender } = render(<InputChip data-testid="chip">Electronics</InputChip>)
    expect(screen.queryByTestId('chip-close')).not.toBeInTheDocument()

    rerender(<InputChip data-testid="chip" onDismiss={() => {}}>Electronics</InputChip>)
    expect(screen.getByRole('button', { name: 'Remove Electronics' })).toBeInTheDocument()
  })

  it('calls onDismiss from the close button, Enter, Delete and Backspace', () => {
    const onDismiss = jest.fn()
    render(<InputChip data-testid="chip" onDismiss={onDismiss}>Electronics</InputChip>)

    fireEvent.click(screen.getByTestId('chip-close'))
    fireEvent.keyDown(screen.getByTestId('chip-close'), { key: 'Enter' })
    fireEvent.keyDown(screen.getByTestId('chip'), { key: 'Delete' })
    fireEvent.keyDown(screen.getByTestId('chip'), { key: 'Backspace' })
    expect(onDismiss).toHaveBeenCalledTimes(4)
  })

  it('does not dismiss when disabled', () => {
    const onDismiss = jest.fn()
    render(<InputChip data-testid="chip" onDismiss={onDismiss} disabled>Electronics</InputChip>)

    fireEvent.click(screen.getByTestId('chip-close'))
    fireEvent.keyDown(screen.getByTestId('chip'), { key: 'Delete' })
    expect(onDismiss).not.toHaveBeenCalled()
    expect(screen.getByTestId('chip')).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows a checkmark on the light-blue fill with blue text when selected', () => {
    const { container } = render(<InputChip data-testid="chip" selected>Electronics</InputChip>)
    expect(container.querySelector('[aria-hidden="true"] svg')).toBeInTheDocument()
    expect(screen.getByTestId('chip')).toHaveStyle({
      backgroundColor: fill['accent-muted'],
      color: text.accent,
    })
  })

  it('draws the checkmark and close icon in the chip text colour', () => {
    render(<InputChip data-testid="chip" selected onDismiss={() => {}}>Electronics</InputChip>)
    const [checkmark, close] = Array.from(screen.getByTestId('chip').querySelectorAll('svg'))
      .map((svg) => svg.parentElement as HTMLElement)
    expect(checkmark).toHaveStyle({ color: text.accent })
    // jsdom doesn't resolve `inherit` through the close button, so check the icon's own rule
    expect(pseudoClassDeclarations(close, '')).toContain('color:currentColor;')
  })

  it('has no accessibility violations, selected and dismissible', async () => {
    const { container } = render(
      <InputChip selected onDismiss={() => {}}>Category: Electronics</InputChip>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

// In 3.0 the name FilterChip moved from InputChip's alias to the toggle chip (decision 0016)
describe('FilterChip is the toggle chip, not InputChip', () => {
  it('is a different component from InputChip', () => {
    expect(FilterChip).not.toBe(InputChip)
  })

  it('renders a checkbox, not a removable value', () => {
    render(<FilterChip selected onClick={() => {}}>In stock</FilterChip>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})

describe('Selected chip treatment (decision 0016)', () => {
  it('darkens the text with the fill on hover and press for a toggle chip', () => {
    render(<FilterChip data-testid="chip" selected onClick={() => {}}>In stock</FilterChip>)
    const chip = screen.getByTestId('chip')

    expect(chip).toHaveStyle({ backgroundColor: fill['accent-muted'], color: text.accent })
    expect(pseudoClassDeclarations(chip, ':hover')).toContain(
      `background-color:${fill['accent-muted-hover']};color:${text.accent};`
    )
    expect(pseudoClassDeclarations(chip, ':active')).toContain(
      `background-color:${fill['accent-muted-pressed']};color:${text.accent};`
    )
  })

  it('draws the toggle chip checkmark in the chip text colour', () => {
    render(<FilterChip data-testid="chip" selected onClick={() => {}}>In stock</FilterChip>)
    const icon = screen.getByTestId('chip').querySelector('svg')?.parentElement as HTMLElement
    expect(icon).toHaveStyle({ color: text.accent })
  })

  it('keeps the resting colours on hover when the chip is not clickable', () => {
    render(<InputChip data-testid="chip" selected>Electronics</InputChip>)
    expect(pseudoClassDeclarations(screen.getByTestId('chip'), ':hover')).toContain(
      `background-color:${fill['accent-muted']};color:${text.accent};`
    )
  })

  it.each([
    ['selected', text.accent, fill['accent-muted']],
    ['hover', text.accent, fill['accent-muted-hover']],
    ['pressed', text.accent, fill['accent-muted-pressed']],
  ])('meets 4.5:1 text contrast when %s', (_state, foreground, fill) => {
    expect(contrastRatio(foreground, fill)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('Selected and disabled chips (#110)', () => {
  const { disabled } = tokens.component.chip.variants.subtle

  it.each([
    ['InputChip', <InputChip key="input" data-testid="chip" selected disabled onDismiss={() => {}}>Electronics</InputChip>],
    ['FilterChip', <FilterChip key="toggle" data-testid="chip" selected disabled onClick={() => {}}>In stock</FilterChip>],
  ])('%s uses the disabled colours and keeps the checkmark', (_name, element) => {
    render(element)
    const chip = screen.getByTestId('chip')
    const checkmark = chip.querySelector('[aria-hidden="true"] svg')?.parentElement as HTMLElement

    expect(chip).toHaveStyle({ backgroundColor: disabled.backgroundColor, color: disabled.textColor })
    expect(checkmark).toBeInTheDocument()
    expect(checkmark).toHaveStyle({ color: disabled.textColor })
    const selectedColours = [
      fill['accent-muted'],
      fill['accent-muted-hover'],
      fill['accent-muted-pressed'],
      text.accent,
      text.accent,
      text.accent,
    ]
    for (const pseudoClass of [':hover', ':active']) {
      const declarations = pseudoClassDeclarations(chip, pseudoClass)
      selectedColours.forEach((colour) => expect(declarations).not.toContain(colour))
    }
  })

  it('looks the same as an unselected disabled chip apart from the checkmark', () => {
    render(
      <>
        <InputChip data-testid="selected" selected disabled>Electronics</InputChip>
        <InputChip data-testid="unselected" disabled>Electronics</InputChip>
      </>
    )
    const selected = window.getComputedStyle(screen.getByTestId('selected'))
    const unselected = window.getComputedStyle(screen.getByTestId('unselected'))
    expect(selected.backgroundColor).toBe(unselected.backgroundColor)
    expect(selected.color).toBe(unselected.color)
  })
})
