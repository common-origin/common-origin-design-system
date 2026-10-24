import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MoneyDisplay, MoneyDisplayProps } from './MoneyDisplay'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const hexToRgbString = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return `rgb(${r}, ${g}, ${b})`
}

const defaultProps: MoneyDisplayProps = {
  amount: 100.50
}

const renderComponent = (props: Partial<MoneyDisplayProps> = {}) => {
  return render(<MoneyDisplay {...defaultProps} {...props} />)
}

describe('MoneyDisplay', () => {
  describe('Basic Rendering', () => {
    it('renders formatted amount', () => {
      renderComponent()
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('renders with AUD currency by default', () => {
      renderComponent({ amount: 50 })
      // Check for dollar sign (AUD format)
      expect(screen.getByText(/\$/)).toBeInTheDocument()
    })

    it('formats with two decimal places', () => {
      renderComponent({ amount: 99 })
      expect(screen.getByText(/99\.00/)).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders default variant', () => {
      renderComponent({ variant: 'default' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('renders positive variant', () => {
      renderComponent({ variant: 'positive', amount: 250.00 })
      expect(screen.getByText(/250\.00/)).toBeInTheDocument()
    })

    it('renders negative variant', () => {
      renderComponent({ variant: 'negative', amount: -45.50 })
      expect(screen.getByText(/45\.50/)).toBeInTheDocument()
    })

    it('renders neutral variant', () => {
      renderComponent({ variant: 'neutral', amount: 0 })
      expect(screen.getByText(/0\.00/)).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    const sizes: Array<'small' | 'medium' | 'large' | 'xlarge'> = ['small', 'medium', 'large', 'xlarge']
    
    sizes.forEach(size => {
      it(`renders ${size} size`, () => {
        renderComponent({ size })
        expect(screen.getByText(/100\.50/)).toBeInTheDocument()
      })
    })
  })

  // The sign is text (decision 0045): it copies and reads as part of the amount, in the role colour
  describe('Sign Display', () => {
    it('shows a typed minus sign (U+2212) for negative amounts, even without showSign', () => {
      renderComponent({ amount: -20 })
      expect(screen.getByText('\u2212$20.00')).toBeInTheDocument()
    })

    it('shows a plus sign for positive amounts when showSign is true', () => {
      renderComponent({ amount: 20, showSign: true })
      expect(screen.getByText('+$20.00')).toBeInTheDocument()
    })

    it('shows no sign for positive amounts by default', () => {
      renderComponent({ amount: 20 })
      expect(screen.getByText('$20.00')).toBeInTheDocument()
    })

    it('draws no sign icon', () => {
      const { container } = renderComponent({ amount: -20 })
      expect(container.querySelector('svg')).not.toBeInTheDocument()
    })

    it.each([
      [-20, {}, tokens.semantic.color.text.danger],
      [20, { showSign: true }, tokens.semantic.color.text.success],
      [20, { variant: 'positive' as const }, tokens.semantic.color.text.success],
      [20, {}, tokens.semantic.color.text.default],
    ])('colours %s with its role', (amount, props, colour) => {
      renderComponent({ amount, ...props })
      const text = screen.getByText(/\$20\.00/)
      expect(window.getComputedStyle(text).color).toBe(hexToRgbString(colour))
    })
  })

  describe('Number Formatting', () => {
    it('handles zero amount', () => {
      renderComponent({ amount: 0 })
      expect(screen.getByText(/0\.00/)).toBeInTheDocument()
    })

    it('handles large amounts with thousands separator', () => {
      renderComponent({ amount: 5280.42 })
      expect(screen.getByText(/5,280\.42/)).toBeInTheDocument()
    })

    it('handles negative large amounts', () => {
      renderComponent({ amount: -1250.00 })
      expect(screen.getByText(/1,250\.00/)).toBeInTheDocument()
    })

    it('handles very small amounts', () => {
      renderComponent({ amount: 0.99 })
      expect(screen.getByText(/0\.99/)).toBeInTheDocument()
    })

    it('handles amounts with many digits', () => {
      renderComponent({ amount: 123456.78 })
      expect(screen.getByText(/123,456\.78/)).toBeInTheDocument()
    })
  })

  describe('Weight Variants', () => {
    it('renders with regular weight', () => {
      renderComponent({ weight: 'regular' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('renders with medium weight', () => {
      renderComponent({ weight: 'medium' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('renders with bold weight', () => {
      renderComponent({ weight: 'bold' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it.each(['regular', 'medium', 'bold'] as const)('maps the %s weight to its font-weight token', (weight) => {
      const { container } = renderComponent({ weight })
      expect(container.firstChild).toHaveStyle({ fontWeight: tokens.semantic.fontWeight[weight] })
    })
  })

  describe('Alignment', () => {
    it('aligns left by default', () => {
      renderComponent()
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('aligns center when specified', () => {
      renderComponent({ align: 'center' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('aligns right when specified', () => {
      renderComponent({ align: 'right' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      renderComponent({ 'data-testid': 'test-money' })
      expect(screen.getByTestId('test-money')).toBeInTheDocument()
    })

    it('accepts custom currency', () => {
      renderComponent({ currency: 'USD', locale: 'en-US' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })

    it('accepts custom locale', () => {
      renderComponent({ locale: 'en-AU' })
      expect(screen.getByText(/100\.50/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all variants', async () => {
      const variants: Array<'default' | 'positive' | 'negative' | 'neutral'> = ['default', 'positive', 'negative', 'neutral']
      for (const variant of variants) {
        const { container, unmount } = renderComponent({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    // The visible text is the accessible text: a generic span can't be named (ARIA), and the typed
    // sign is read as plus or minus
    it('exposes the signed amount as text, with no aria-label', () => {
      const { container } = renderComponent({ amount: -1234.56 })
      expect(container.firstElementChild).not.toHaveAttribute('aria-label')
      expect(container).toHaveTextContent('\u2212$1,234.56')
    })
  })

  describe('Edge Cases', () => {
    it('handles very large numbers', () => {
      renderComponent({ amount: 9999999.99 })
      expect(screen.getByText(/9,999,999\.99/)).toBeInTheDocument()
    })

    it('handles very small decimal amounts', () => {
      renderComponent({ amount: 0.01 })
      expect(screen.getByText(/0\.01/)).toBeInTheDocument()
    })

    it('rounds to two decimal places', () => {
      renderComponent({ amount: 10.999 })
      expect(screen.getByText(/11\.00/)).toBeInTheDocument()
    })
  })
})
