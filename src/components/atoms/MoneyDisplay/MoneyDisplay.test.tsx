import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MoneyDisplay, MoneyDisplayProps } from './MoneyDisplay'

expect.extend(toHaveNoViolations)

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

  describe('Sign Display', () => {
    it('shows positive icon when showSign is true and amount is positive', () => {
      renderComponent({ amount: 100, showSign: true })
      expect(screen.getByRole('img', { name: 'addRing' })).toBeInTheDocument()
    })

    it('shows negative icon when showSign is true and amount is negative', () => {
      renderComponent({ amount: -100, showSign: true })
      expect(screen.getByRole('img', { name: 'remove' })).toBeInTheDocument()
    })

    it('shows negative icon for negative amounts even without showSign', () => {
      renderComponent({ amount: -50 })
      expect(screen.getByRole('img', { name: 'remove' })).toBeInTheDocument()
    })

    it('does not show sign icon for zero amount', () => {
      renderComponent({ amount: 0, showSign: true })
      expect(screen.queryByRole('img', { name: 'addRing' })).not.toBeInTheDocument()
      expect(screen.queryByRole('img', { name: 'remove' })).not.toBeInTheDocument()
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

    it('provides aria-label with spelled out amount', () => {
      renderComponent({ amount: 45.50 })
      const element = screen.getByLabelText(/45 dollars and 50 cents/)
      expect(element).toBeInTheDocument()
    })

    it('provides aria-label for negative amounts', () => {
      renderComponent({ amount: -100.25 })
      const element = screen.getByLabelText(/negative 100 dollars and 25 cents/)
      expect(element).toBeInTheDocument()
    })

    it('provides aria-label for positive amounts', () => {
      renderComponent({ amount: 250.75 })
      const element = screen.getByLabelText(/250 dollars and 75 cents/)
      expect(element).toBeInTheDocument()
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
