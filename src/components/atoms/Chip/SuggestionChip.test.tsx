import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { SuggestionChip } from './SuggestionChip'

describe('SuggestionChip', () => {
  it('is a button named by its suggestion', () => {
    render(<SuggestionChip onClick={jest.fn()}>Swap Tuesday for something lighter</SuggestionChip>)

    const chip = screen.getByRole('button', { name: 'Swap Tuesday for something lighter' })
    expect(chip).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn()
    render(<SuggestionChip onClick={onClick}>Drop Wednesday</SuggestionChip>)

    fireEvent.click(screen.getByRole('button', { name: 'Drop Wednesday' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is picked with Enter and Space', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<SuggestionChip onClick={onClick}>Drop Wednesday</SuggestionChip>)

    await user.tab()
    expect(screen.getByRole('button', { name: 'Drop Wednesday' })).toHaveFocus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('does nothing when disabled', () => {
    const onClick = jest.fn()
    render(
      <SuggestionChip onClick={onClick} disabled>
        Drop Wednesday
      </SuggestionChip>
    )

    const chip = screen.getByRole('button', { name: 'Drop Wednesday' })
    expect(chip).toBeDisabled()
    fireEvent.click(chip)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('lets long text wrap instead of cutting it off', () => {
    render(<SuggestionChip onClick={jest.fn()}>Swap Tuesday for something lighter and keep Friday as pizza night</SuggestionChip>)

    const chip = screen.getByRole('button')
    expect(chip).toHaveStyle({ whiteSpace: 'normal', maxWidth: '100%' })
    expect(chip).not.toHaveStyle({ textOverflow: 'ellipsis' })
  })

  it('passes data-testid through', () => {
    render(
      <SuggestionChip onClick={jest.fn()} data-testid="suggestion">
        Drop Wednesday
      </SuggestionChip>
    )

    expect(screen.getByTestId('suggestion')).toBeInTheDocument()
  })

  it('has no accessibility violations, enabled or disabled', async () => {
    const { container } = render(
      <>
        <SuggestionChip onClick={jest.fn()}>Swap Tuesday</SuggestionChip>
        <SuggestionChip onClick={jest.fn()} disabled>
          Drop Wednesday
        </SuggestionChip>
      </>
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
