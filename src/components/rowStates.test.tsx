import { fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { rowStates, type RowState } from '@/lib/styleUtils'
import { pseudoClassDeclarations } from '@/test-utils/contrast'
import { ListItem } from './molecules/List'
import { TransactionListItem } from './molecules/TransactionListItem'
import { Dropdown } from './molecules/Dropdown'

expect.extend(toHaveNoViolations)

// Rows and items share one interaction pattern (decision 0030): every row component responds to
// hover and press with the same colours, from rowStates
const css = (value: string) => {
  // Computed styles report transparent as rgba(0, 0, 0, 0)
  if (value === 'transparent') return 'rgba(0, 0, 0, 0)'
  const probe = document.createElement('div')
  probe.style.backgroundColor = value
  return probe.style.backgroundColor
}
const stylesheet = () => Array.from(document.querySelectorAll('style')).map((style) => style.textContent).join('')

// The rest, hover and pressed backgrounds of a row element, and the text colour its rules set
function expectRow(row: HTMLElement, states: Record<'rest' | 'hover' | 'pressed', RowState>) {
  expect(getComputedStyle(row).backgroundColor).toBe(css(states.rest.background))
  expect(pseudoClassDeclarations(row, ':hover')).toContain(`background-color:${states.hover.background};`)
  expect(pseudoClassDeclarations(row, ':active')).toContain(`background-color:${states.pressed.background};`)
  const text = [states.rest.text, states.hover.text, states.pressed.text].filter(Boolean)
  text.forEach((colour) => expect(stylesheet()).toContain(`color:${colour};`))
}

describe('row states', () => {
  it('ListItem (interactive) uses the unselected row states', () => {
    render(<ListItem primary="Row" interactive onClick={() => {}} />)
    expectRow(screen.getByRole('button', { name: 'Row' }), rowStates.unselected)
  })

  it('ListItem (interactive, selected) uses the selected row states, including its text', () => {
    render(<ListItem primary="Row" interactive selected onClick={() => {}} />)
    const row = screen.getByRole('button', { name: 'Row' })
    expectRow(row, rowStates.selected)
    // The primary text is Typography; the row colours it, so selected text is blue at rest
    expect(getComputedStyle(screen.getByText('Row')).color).toBe(
      (() => { const p = document.createElement('div'); p.style.color = rowStates.selected.rest.text as string; return p.style.color })()
    )
  })

  it('ListItem (not interactive) has no hover or press', () => {
    render(<ListItem primary="Static" />)
    const row = screen.getByText('Static').closest('[role="listitem"]')?.firstElementChild as HTMLElement
    expect(pseudoClassDeclarations(row, ':hover')).toBe('')
    expect(pseudoClassDeclarations(row, ':active')).toBe('')
  })

  it('TransactionListItem (clickable) uses the unselected row states', () => {
    render(
      <TransactionListItem merchant="Corner Shop" amount={-4.5} date={new Date('2026-10-01')} onClick={() => {}} />
    )
    expectRow(screen.getByRole('button', { name: /Corner Shop/ }), rowStates.unselected)
  })

  it('Dropdown options use the unselected and selected row states', () => {
    render(
      <Dropdown
        options={[{ id: 'a', label: 'Apple' }, { id: 'b', label: 'Banana' }]}
        value="b"
        onChange={() => {}}
      />
    )
    fireEvent.click(screen.getByRole('button'))
    const apple = screen.getByRole('option', { name: 'Apple' })
    expect(pseudoClassDeclarations(apple, ':hover')).toContain(`background-color:${rowStates.unselected.hover.background};`)
    expect(pseudoClassDeclarations(apple, ':active')).toContain(`background-color:${rowStates.unselected.pressed.background};`)
    const banana = screen.getByRole('option', { name: 'Banana' })
    expect(pseudoClassDeclarations(banana, ':hover')).toContain(`background-color:${rowStates.selected.hover.background};`)
    expect(pseudoClassDeclarations(banana, ':active')).toContain(`background-color:${rowStates.selected.pressed.background};`)
  })

  it('SearchField\'s highlighted suggestion is grey at rest and keeps the row\'s pressed state', async () => {
    // jsdom has no scrollIntoView, which SearchField calls on the highlighted suggestion
    Element.prototype.scrollIntoView = jest.fn()
    const { SearchField } = await import('./molecules/SearchField')
    render(<SearchField value="ap" onChange={() => {}} suggestions={[{ id: 'apple', label: 'Apple' }]} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    const row = screen.getByRole('option').firstElementChild as HTMLElement
    expect(getComputedStyle(row).backgroundColor).toBe(css(rowStates.unselected.hover.background))
    // The highlight rule stands down while pressed, so the row's own :active rule applies
    expect(stylesheet()).toMatch(/\[data-highlighted\]>:first-child:not\(:active\)\{/)
    expect(pseudoClassDeclarations(row, ':active')).toContain(`background-color:${rowStates.unselected.pressed.background};`)
  })

  // The text on every filled state stays readable: at least 4.5:1 (P2)
  it('keeps text readable on every row fill', async () => {
    const { container } = render(
      <ul>
        <ListItem primary="Row" interactive onClick={() => {}} />
        <ListItem primary="Selected" interactive selected onClick={() => {}} />
      </ul>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
