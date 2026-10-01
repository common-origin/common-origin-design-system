import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { InlineAlert, type InlineAlertSize, type InlineAlertVariant } from './InlineAlert'
import { Alert } from '../Alert'
import tokens from '@/styles/tokens.json'
import { contrastRatio } from '@/test-utils/contrast'

expect.extend(toHaveNoViolations)

const { color, size, typography } = tokens.semantic
const variants: InlineAlertVariant[] = ['error', 'warning', 'info', 'success']
const sizes: InlineAlertSize[] = ['small', 'medium']
const textColour: Record<InlineAlertVariant, string> = {
  error: color.text.error,
  warning: color.text.warning,
  info: color.text.interactive,
  success: color.text.success,
}

describe('InlineAlert', () => {
  describe.each(variants)('%s', (variant) => {
    it.each(sizes)('renders at %s with the severity colour, no background or border', (alertSize) => {
      render(<InlineAlert variant={variant} size={alertSize} data-testid="alert">Message</InlineAlert>)
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveTextContent('Message')
      expect(alert).toHaveStyle({ color: textColour[variant], minHeight: size.label[alertSize] })
      const style = window.getComputedStyle(alert)
      expect(['', 'transparent', 'rgba(0, 0, 0, 0)']).toContain(style.backgroundColor)
      expect(style.borderStyle === '' || style.borderStyle === 'none').toBe(true)
    })

    it('uses the same role as Alert', () => {
      render(<InlineAlert variant={variant}>Message</InlineAlert>)
      expect(screen.getByRole(variant === 'error' ? 'alert' : 'status')).toHaveTextContent('Message')
    })

    it.each([
      ['page', color.background.default],
      ['white', color.background.subtle],
      ['grey surface', color.background.surface],
    ])('meets 4.5:1 on the %s background', (_name, background) => {
      expect(contrastRatio(textColour[variant], background)).toBeGreaterThanOrEqual(4.5)
    })

    it.each(sizes)('has no accessibility violations at %s', async (alertSize) => {
      const { container } = render(<InlineAlert variant={variant} size={alertSize}>Message</InlineAlert>)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('defaults to info and medium', () => {
    render(<InlineAlert data-testid="alert">Message</InlineAlert>)
    expect(screen.getByRole('status')).toHaveStyle({ color: color.text.interactive, minHeight: size.label.medium })
  })

  it.each([
    ['small', typography.caption],
    ['medium', typography.small],
  ] as const)('uses the %s type', (alertSize, font) => {
    render(<InlineAlert size={alertSize} data-testid="alert">Message</InlineAlert>)
    const [, sizeAndLine] = font.split(' ')
    expect(screen.getByTestId('alert')).toHaveStyle({ fontSize: sizeAndLine.split('/')[0] })
  })

  it.each(variants)('draws the %s icon in the text colour', (variant) => {
    render(<InlineAlert variant={variant} data-testid="alert">Message</InlineAlert>)
    const icon = screen.getByTestId('alert').querySelector('svg')?.parentElement as HTMLElement
    expect(icon).toHaveStyle({ color: textColour[variant] })
  })

  it('hides the icon from assistive technology', () => {
    render(<InlineAlert data-testid="alert">Message</InlineAlert>)
    expect(screen.getByTestId('alert').querySelector('svg')?.closest('[aria-hidden="true"]')).toBeInTheDocument()
  })

  describe('live region', () => {
    it('is polite by default, like Alert', () => {
      render(<InlineAlert>Message</InlineAlert>)
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
    })

    it.each(['assertive', 'off'] as const)('accepts ariaLive="%s"', (ariaLive) => {
      render(<InlineAlert ariaLive={ariaLive}>Message</InlineAlert>)
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', ariaLive)
    })

    it('stays mounted as an empty live region with no message, so a later message is announced', () => {
      const { rerender } = render(<InlineAlert variant="success" data-testid="alert" />)
      const region = screen.getByTestId('alert')
      expect(region).toHaveAttribute('role', 'status')
      expect(region).toHaveAttribute('aria-live', 'polite')
      expect(region).toBeEmptyDOMElement()
      expect(region).toHaveStyle({ minHeight: '0' })

      rerender(<InlineAlert variant="success" data-testid="alert">Saved</InlineAlert>)
      // The same element, now with content: the change happens inside an existing live region
      expect(screen.getByTestId('alert')).toBe(region)
      expect(region).toHaveTextContent('Saved')
      expect(region.querySelector('svg')).toBeInTheDocument()
    })

    it.each([null, false, ''])('treats %p as no message', (empty) => {
      render(<InlineAlert data-testid="alert">{empty}</InlineAlert>)
      expect(screen.getByTestId('alert')).toBeEmptyDOMElement()
    })
  })

  describe('field feedback', () => {
    it('describes a control that references its id with aria-describedby', () => {
      render(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" aria-invalid="true" aria-describedby="email-error" />
          <InlineAlert id="email-error" variant="error" size="small">Enter a valid email address</InlineAlert>
        </>
      )
      expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Enter a valid email address')
    })

    it('has no accessibility violations as field feedback', async () => {
      const { container } = render(
        <>
          <label htmlFor="name">Name</label>
          <input id="name" aria-describedby="name-hint" />
          <InlineAlert id="name-hint" variant="info" size="small">Use your full legal name</InlineAlert>
        </>
      )
      expect(await axe(container)).toHaveNoViolations()
    })
  })
})

describe('Alert inline (deprecated)', () => {
  it('still renders', () => {
    render(<Alert inline variant="warning">Careful</Alert>)
    expect(screen.getByRole('status')).toHaveTextContent('Careful')
  })
})
