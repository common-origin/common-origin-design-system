import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CategoryBadge } from './CategoryBadge'
import { CategoryLabel } from '../CategoryLabel'

expect.extend(toHaveNoViolations)

// CategoryBadge is deprecated in favour of CategoryLabel (decision 0018); CategoryLabel's suite
// covers the behaviour. These tests check the alias maps its sizes onto the 0018 scale and stays
// identical until it is removed in 3.0.
describe('CategoryBadge (deprecated alias of CategoryLabel)', () => {
  it.each([
    ['small', 'medium'],
    ['medium', 'large'],
  ] as const)('renders size="%s" identically to CategoryLabel size="%s"', (badgeSize, labelSize) => {
    const { container: label } = render(
      <CategoryLabel color="orange" variant="outlined" icon="filter" size={labelSize}>Dining</CategoryLabel>
    )
    const { container: badge } = render(
      <CategoryBadge color="orange" variant="outlined" icon="filter" size={badgeSize}>Dining</CategoryBadge>
    )
    expect(badge.innerHTML).toBe(label.innerHTML)
  })

  it('renders identically to CategoryLabel with default props (both 32px)', () => {
    const { container: label } = render(<CategoryLabel>Shopping</CategoryLabel>)
    const { container: badge } = render(<CategoryBadge>Shopping</CategoryBadge>)
    expect(badge.innerHTML).toBe(label.innerHTML)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CategoryBadge icon="filter">Shopping</CategoryBadge>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
