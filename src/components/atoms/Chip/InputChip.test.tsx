import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InputChip } from './InputChip'
import { FilterChip } from './FilterChip'
import { BooleanChip } from './BooleanChip'
import tokens from '@/styles/tokens.json'
import { contrastRatio, pseudoClassDeclarations } from '../../../test-utils/contrast'

expect.extend(toHaveNoViolations)

const { background, text } = tokens.semantic.color

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
      backgroundColor: background['interactive-subtle'],
      color: text.interactive,
    })
  })

  it('draws the checkmark and close icon in the chip text colour', () => {
    render(<InputChip data-testid="chip" selected onDismiss={() => {}}>Electronics</InputChip>)
    const [checkmark, close] = Array.from(screen.getByTestId('chip').querySelectorAll('svg'))
      .map((svg) => svg.parentElement as HTMLElement)
    expect(checkmark).toHaveStyle({ color: text.interactive })
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

describe('FilterChip (deprecated alias of InputChip)', () => {
  it('is the same component as InputChip', () => {
    expect(FilterChip).toBe(InputChip)
  })

  it('renders identically to InputChip', () => {
    const { container: input } = render(<InputChip selected onDismiss={() => {}}>Electronics</InputChip>)
    const { container: filter } = render(<FilterChip selected onDismiss={() => {}}>Electronics</FilterChip>)
    expect(filter.innerHTML).toBe(input.innerHTML)
  })
})

describe('Selected chip treatment (decision 0016)', () => {
  it('darkens the text with the fill on hover and press for a toggle chip', () => {
    render(<BooleanChip data-testid="chip" selected onClick={() => {}}>In stock</BooleanChip>)
    const chip = screen.getByTestId('chip')

    expect(chip).toHaveStyle({ backgroundColor: background['interactive-subtle'], color: text.interactive })
    expect(pseudoClassDeclarations(chip, ':hover')).toContain(
      `background-color:${background['interactive-subtle-hover']};color:${text['interactive-hover']};`
    )
    expect(pseudoClassDeclarations(chip, ':active')).toContain(
      `background-color:${background['interactive-subtle-active']};color:${text['interactive-active']};`
    )
  })

  it('draws the toggle chip checkmark in the chip text colour', () => {
    render(<BooleanChip data-testid="chip" selected onClick={() => {}}>In stock</BooleanChip>)
    const icon = screen.getByTestId('chip').querySelector('svg')?.parentElement as HTMLElement
    expect(icon).toHaveStyle({ color: text.interactive })
  })

  it('keeps the resting colours on hover when the chip is not clickable', () => {
    render(<InputChip data-testid="chip" selected>Electronics</InputChip>)
    expect(pseudoClassDeclarations(screen.getByTestId('chip'), ':hover')).toContain(
      `background-color:${background['interactive-subtle']};color:${text.interactive};`
    )
  })

  it.each([
    ['selected', text.interactive, background['interactive-subtle']],
    ['hover', text['interactive-hover'], background['interactive-subtle-hover']],
    ['pressed', text['interactive-active'], background['interactive-subtle-active']],
  ])('meets 4.5:1 text contrast when %s', (_state, foreground, fill) => {
    expect(contrastRatio(foreground, fill)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('Selected and disabled chips (#110)', () => {
  const { disabled } = tokens.component.chip.variants.subtle

  it.each([
    ['InputChip', <InputChip key="input" data-testid="chip" selected disabled onDismiss={() => {}}>Electronics</InputChip>],
    ['BooleanChip', <BooleanChip key="toggle" data-testid="chip" selected disabled onClick={() => {}}>In stock</BooleanChip>],
  ])('%s uses the disabled colours and keeps the checkmark', (_name, element) => {
    render(element)
    const chip = screen.getByTestId('chip')
    const checkmark = chip.querySelector('[aria-hidden="true"] svg')?.parentElement as HTMLElement

    expect(chip).toHaveStyle({ backgroundColor: disabled.backgroundColor, color: disabled.textColor })
    expect(checkmark).toBeInTheDocument()
    expect(checkmark).toHaveStyle({ color: disabled.textColor })
    expect(pseudoClassDeclarations(chip, ':hover')).not.toContain(background['interactive-subtle-hover'])
    expect(pseudoClassDeclarations(chip, ':hover')).not.toContain(text.interactive)
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
