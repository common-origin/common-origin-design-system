import { fireEvent, render, screen } from '@testing-library/react'
import tokens from '@/styles/tokens.json'
import { TextField } from './molecules/TextField'
import { PasswordField } from './molecules/PasswordField'
import { NumberInput } from './molecules/NumberInput'
import { SearchField } from './molecules/SearchField'
import { Dropdown } from './molecules/Dropdown'
import { AgentInput } from './molecules/AgentInput'
import { Button } from './atoms/Button'
import { IconButton } from './atoms/IconButton'
import { Chip, BooleanChip, InputChip } from './atoms/Chip'

// Controls take their height from size.control as a minimum, including the border, and
// centre their content (decision 0034). Fields are size.control.lg; Button and IconButton
// take sm / md / lg by size.
const { lg } = tokens.semantic.size.control

function expectControlHeight(element: HTMLElement) {
  const style = getComputedStyle(element)
  expect(style.minHeight).toBe(lg)
  expect(style.boxSizing).toBe('border-box')
}

describe('control heights', () => {
  it('TextField, PasswordField and NumberInput inputs are size.control.lg', () => {
    render(
      <>
        <TextField label="Name" />
        <PasswordField label="Password" />
        <NumberInput label="Quantity" />
      </>
    )
    expectControlHeight(screen.getByLabelText('Name'))
    expectControlHeight(screen.getByLabelText('Password'))
    expectControlHeight(screen.getByLabelText('Quantity'))
  })

  it("SearchField's field is size.control.lg", () => {
    render(<SearchField value="" onChange={() => {}} placeholder="Search" />)
    // The border and padding sit on the wrapper around the input
    expectControlHeight(screen.getByPlaceholderText('Search').parentElement as HTMLElement)
  })

  it("Dropdown's trigger and options are size.control.lg", () => {
    render(
      <Dropdown
        label="Fruit"
        value=""
        onChange={() => {}}
        options={[{ id: 'apple', label: 'Apple' }, { id: 'pear', label: 'Pear' }]}
      />
    )
    const trigger = document.querySelector('[aria-haspopup="listbox"]') as HTMLElement
    expectControlHeight(trigger)
    fireEvent.click(trigger)
    screen.getAllByRole('option').forEach(expectControlHeight)
  })

  it("AgentInput's text input has the size.control.lg minimum", () => {
    // AgentInput reads prefers-reduced-motion, which jsdom doesn't implement
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((media: string) => ({
        matches: false,
        media,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })
    render(<AgentInput onSubmit={jest.fn().mockResolvedValue(undefined)} />)
    expect(getComputedStyle(screen.getByRole('textbox')).minHeight).toBe(lg)
  })
})

describe('Button and IconButton heights', () => {
  const sizes = [
    ['small', tokens.semantic.size.control.sm],
    ['medium', tokens.semantic.size.control.md],
    ['large', tokens.semantic.size.control.lg],
  ] as const

  it.each(sizes)('a %s Button has the size.control minimum and no vertical padding', (size, height) => {
    render(<Button size={size}>Save</Button>)
    const style = getComputedStyle(screen.getByRole('button'))
    expect(style.minHeight).toBe(height)
    expect(style.boxSizing).toBe('border-box')
    expect(style.paddingTop).toBe('0px')
    expect(style.paddingBottom).toBe('0px')
  })

  it('a Button link has the same minimum', () => {
    render(<Button purpose="link" url="/docs">Docs</Button>)
    expect(getComputedStyle(screen.getByRole('link')).minHeight).toBe(lg)
  })

  it.each(sizes)('a %s IconButton has the size.control minimum width and height', (size, height) => {
    render(<IconButton variant="primary" size={size} iconName="close" aria-label="Close" />)
    const style = getComputedStyle(screen.getByRole('button'))
    expect(style.minHeight).toBe(height)
    expect(style.minWidth).toBe(height)
    expect(style.boxSizing).toBe('border-box')
  })
})

// Chips stay on the label scale (decision 0018). A chip with a close button is at least
// size.label.medium tall, so a small one keeps its 24px (decision 0034, #208).
describe('chip heights', () => {
  const { label } = tokens.semantic.size

  function expectChipHeight(element: HTMLElement, height: string) {
    const style = getComputedStyle(element)
    expect(style.minHeight).toBe(height)
    expect(style.paddingTop).toBe('0px')
    expect(style.paddingBottom).toBe('0px')
  }

  it.each([
    ['small', label.small],
    ['medium', label.medium],
  ] as const)('a %s Chip, BooleanChip and InputChip are size.label.%s', (size, height) => {
    render(
      <>
        <Chip size={size} data-testid="chip">Tag</Chip>
        <BooleanChip size={size} selected={false} onClick={() => {}} data-testid="boolean">Filter</BooleanChip>
        <InputChip size={size} data-testid="input">Value</InputChip>
      </>
    )
    expectChipHeight(screen.getByTestId('chip'), height)
    expectChipHeight(screen.getByTestId('boolean'), height)
    expectChipHeight(screen.getByTestId('input'), height)
  })

  it.each(['small', 'medium'] as const)('a %s InputChip with a close button is at least size.label.medium', (size) => {
    render(<InputChip size={size} onDismiss={() => {}} data-testid="input">Value</InputChip>)
    expectChipHeight(screen.getByTestId('input'), label.medium)
  })
})
