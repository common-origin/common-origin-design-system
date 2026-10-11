import { fireEvent, render, screen } from '@testing-library/react'
import tokens from '@/styles/tokens.json'
import { TextField } from './molecules/TextField'
import { PasswordField } from './molecules/PasswordField'
import { NumberInput } from './molecules/NumberInput'
import { SearchField } from './molecules/SearchField'
import { Dropdown } from './molecules/Dropdown'
import { AgentInput } from './molecules/AgentInput'

// Controls take their height from size.control as a minimum, including the border, and
// centre their content (decision 0034). Fields are size.control.lg.
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
