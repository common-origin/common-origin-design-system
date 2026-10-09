import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import iconsData from '@/styles/icons.json'
import { Button } from './atoms/Button'
import { CategoryBadge } from './atoms/CategoryBadge'
import { CategoryLabel } from './atoms/CategoryLabel'
import { MoneyDisplay } from './atoms/MoneyDisplay'
import { Alert } from './molecules/Alert'
import { Dropdown } from './molecules/Dropdown'
import { SearchField } from './molecules/SearchField'
import { TransactionListItem } from './molecules/TransactionListItem'

expect.extend(toHaveNoViolations)

// Icons are decorative unless a component gives them a human-readable name, and no component
// announces an internal icon name such as "arrowDown" or "addRing" (#85, WCAG 1.1.1)
const internalNames = new Set(Object.keys(iconsData))

const announcedImages = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[role="img"]')).map((image) => image.getAttribute('aria-label') ?? '')

function expectNoInternalNames(container: HTMLElement) {
  expect(announcedImages(container).filter((name) => internalNames.has(name))).toEqual([])
}

describe('icon announcements', () => {
  it('Button with an icon is named by its text alone', async () => {
    const { container } = render(<Button iconName="add">Add item</Button>)
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
    expect(announcedImages(container)).toEqual([])
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Dropdown trigger is named by its value, not its arrow', async () => {
    // Without a label the trigger takes its name from its content, which used to end in "arrowDown"
    const { container } = render(
      <Dropdown options={[{ id: 'apple', label: 'Apple' }]} value="" onChange={() => {}} placeholder="Select an option" />
    )
    expect(screen.getByRole('button', { expanded: false })).toHaveAccessibleName('Select an option')
    expectNoInternalNames(container)
  })

  it('Dropdown with a label passes axe', async () => {
    const { container } = render(
      <Dropdown label="Fruit" options={[{ id: 'apple', label: 'Apple' }]} value="" onChange={() => {}} />
    )
    expect(screen.getByRole('button', { name: 'Fruit' })).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('Alert severity icon is silent; the message carries the meaning', async () => {
    const { container } = render(<Alert variant="error" title="Payment failed">Try another card.</Alert>)
    expect(announcedImages(container)).toEqual([])
    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed')
    expect(await axe(container)).toHaveNoViolations()
  })

  it('CategoryBadge and CategoryLabel icons are silent', async () => {
    const { container } = render(
      <>
        <CategoryBadge icon="bell">Alerts</CategoryBadge>
        <CategoryLabel icon="bell">Alerts</CategoryLabel>
      </>
    )
    expect(announcedImages(container)).toEqual([])
    expect(await axe(container)).toHaveNoViolations()
  })

  it('MoneyDisplay names its sign icon, because the amount is shown without a sign', () => {
    const { container, rerender } = render(<MoneyDisplay amount={-25} />)
    expect(screen.getByRole('img', { name: 'Minus' })).toBeInTheDocument()
    rerender(<MoneyDisplay amount={25} showSign />)
    expect(screen.getByRole('img', { name: 'Plus' })).toBeInTheDocument()
    expectNoInternalNames(container)
  })

  it('SearchField names its loading icon and hides its search icon', () => {
    const { container } = render(<SearchField value="" onChange={() => {}} loading aria-label="Search products" />)
    expect(announcedImages(container)).toEqual(['Loading'])
  })

  it('TransactionListItem names its receipt and note indicators', () => {
    const { container } = render(
      <TransactionListItem
        merchant="Corner Shop"
        amount={-4.5}
        date={new Date('2026-10-01')}
        hasReceipt
        hasNote
      />
    )
    expect(announcedImages(container)).toEqual(expect.arrayContaining(['Has receipt', 'Has note']))
    expectNoInternalNames(container)
  })
})
