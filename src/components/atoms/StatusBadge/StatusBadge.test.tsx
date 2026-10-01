import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StatusBadge } from './StatusBadge'
import { StatusLabel } from '../StatusLabel'
import type { StatusSize, StatusType } from './StatusBadge'

expect.extend(toHaveNoViolations)

// StatusBadge is deprecated in favour of StatusLabel (decision 0018); StatusLabel's suite covers
// the behaviour. These tests check the alias stays identical until it is removed in 3.0.
describe('StatusBadge (deprecated alias of StatusLabel)', () => {
  const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']
  const sizes: StatusSize[] = ['small', 'medium']

  it.each(statuses.flatMap((status) => sizes.map((size) => [status, size] as const)))(
    'renders %s at %s identically to StatusLabel',
    (status, size) => {
      const { container: label } = render(<StatusLabel status={status} size={size} label="Custom" liveRegion={false} />)
      const { container: badge } = render(<StatusBadge status={status} size={size} label="Custom" liveRegion={false} />)
      expect(badge.innerHTML).toBe(label.innerHTML)
    }
  )

  it('renders identically to StatusLabel with default props', () => {
    const { container: label } = render(<StatusLabel status="pending" />)
    const { container: badge } = render(<StatusBadge status="pending" />)
    expect(badge.innerHTML).toBe(label.innerHTML)
  })

  it('still hides the icon with the deprecated showIcon={false}', () => {
    render(<StatusBadge status="completed" showIcon={false} />)
    expect(screen.getByRole('status').querySelector('svg')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<StatusBadge status="completed" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
