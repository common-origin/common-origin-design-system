import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AILabel } from './AILabel'

describe('AILabel', () => {
  it('says "Suggested" by default', () => {
    render(<AILabel data-testid="marker" />)
    expect(screen.getByTestId('marker')).toHaveTextContent(/^Suggested$/)
  })

  it('says "Will be removed" for a proposed removal', () => {
    render(<AILabel kind="removal" data-testid="marker" />)
    expect(screen.getByTestId('marker')).toHaveTextContent(/^Will be removed$/)
  })

  it('shows the AI icon, hidden from assistive technology', () => {
    render(<AILabel data-testid="marker" />)
    const svg = screen.getByTestId('marker').querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('is plain text: not interactive and not a live region', () => {
    render(<AILabel data-testid="marker" />)
    const marker = screen.getByTestId('marker')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(marker).not.toHaveAttribute('aria-live')
  })

  it.each(['small', 'medium'] as const)('renders at the %s size', (labelSize) => {
    render(<AILabel size={labelSize} data-testid="marker" />)
    expect(screen.getByTestId('marker')).toHaveTextContent('Suggested')
  })

  it('has no accessibility violations for either kind', async () => {
    const { container } = render(
      <ul>
        <li>
          Tuesday: Lemon fish <AILabel />
        </li>
        <li>
          Wednesday: Leftovers <AILabel kind="removal" size="small" />
        </li>
      </ul>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
