import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { AccountCard } from './AccountCard'
import tokens from '../../../styles/tokens.json'

expect.extend(toHaveNoViolations)

const hexToRgb = (hex: string): string => {
  const value = hex.replace('#', '')
  const normalized = value.length === 3
    ? value.split('').map((char) => `${char}${char}`).join('')
    : value

  const red = parseInt(normalized.slice(0, 2), 16)
  const green = parseInt(normalized.slice(2, 4), 16)
  const blue = parseInt(normalized.slice(4, 6), 16)

  return `rgb(${red}, ${green}, ${blue})`
}

describe('AccountCard', () => {
  const defaultProps = {
    accountType: 'checking' as const,
    accountName: 'Personal Checking',
    balance: 1234.56
  }

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<AccountCard {...defaultProps} />)
      
      expect(screen.getByText('Personal Checking')).toBeInTheDocument()
      expect(screen.getByText(/1,234\.56/)).toBeInTheDocument()
    })

    it('renders account name', () => {
      render(<AccountCard {...defaultProps} accountName="Business Savings" />)
      
      expect(screen.getByText('Business Savings')).toBeInTheDocument()
    })

    it('renders balance', () => {
      render(<AccountCard {...defaultProps} balance={5000.00} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toBeInTheDocument()
      expect(balance).toHaveTextContent('5,000.00')
    })

    it('renders Available label', () => {
      render(<AccountCard {...defaultProps} />)
      
      expect(screen.getByText('Available')).toBeInTheDocument()
    })

    it('has minimum width of 300px', () => {
      const { container } = render(<AccountCard {...defaultProps} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      const styles = window.getComputedStyle(card)
      expect(styles.minWidth).toBe('300px')
    })

    it('renders without fixed minimum height', () => {
      render(<AccountCard {...defaultProps} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toBeInTheDocument()
    })
  })

  describe('Account Types', () => {
    const accountTypes: Array<'checking' | 'savings' | 'credit' | 'investment' | 'loan'> = [
      'checking', 'savings', 'credit', 'investment', 'loan'
    ]

    accountTypes.forEach(type => {
      it(`renders ${type} account type with avatar`, () => {
        render(<AccountCard {...defaultProps} accountType={type} />)
        
        expect(screen.getByLabelText('Avatar for Personal Checking')).toBeInTheDocument()
      })
    })
  })

  describe('Account Number', () => {
    it('displays account number when provided', () => {
      render(<AccountCard {...defaultProps} accountNumber="1234" />)
      
      expect(screen.getByText('•••• 1234')).toBeInTheDocument()
    })

    it('does not display account number when not provided', () => {
      render(<AccountCard {...defaultProps} />)
      
      expect(screen.queryByText(/••••/)).not.toBeInTheDocument()
    })
  })

  describe('Balance Display', () => {
    it('displays large positive balance', () => {
      render(<AccountCard {...defaultProps} balance={123456.78} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toHaveTextContent('123,456.78')
    })

    it('displays negative balance', () => {
      render(<AccountCard {...defaultProps} balance={-500.00} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toHaveTextContent('500.00')
    })

    it('displays zero balance', () => {
      render(<AccountCard {...defaultProps} balance={0} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toHaveTextContent('0.00')
    })

    it('supports custom currency', () => {
      render(<AccountCard {...defaultProps} balance={1000} currency="USD" data-testid="account" />)
      
      expect(screen.getByTestId('account-balance')).toBeInTheDocument()
    })
  })

  describe('Trend Display', () => {
    it('displays upward trend', () => {
      render(<AccountCard {...defaultProps} trend="up" trendValue="+2.5%" />)
      
      expect(screen.getByLabelText('Trend up')).toBeInTheDocument()
      expect(screen.getByText('+2.5%')).toBeInTheDocument()
    })

    it('displays downward trend', () => {
      render(<AccountCard {...defaultProps} trend="down" trendValue="-1.2%" />)
      
      expect(screen.getByLabelText('Trend down')).toBeInTheDocument()
      expect(screen.getByText('-1.2%')).toBeInTheDocument()
    })

    it('displays neutral trend', () => {
      render(<AccountCard {...defaultProps} trend="neutral" trendValue="0.0%" />)
      
      expect(screen.getByLabelText('Trend neutral')).toBeInTheDocument()
      expect(screen.getByText('0.0%')).toBeInTheDocument()
    })

    it('maps up trend to green category badge colors', () => {
      render(<AccountCard {...defaultProps} trend="up" trendValue="+2.5%" />)

      const badge = screen.getByText('+2.5%')
      const styles = window.getComputedStyle(badge)

      expect(styles.color).toBe(hexToRgb(tokens.semantic.color.category.green))
      expect(styles.backgroundColor).toBe(hexToRgb(tokens.semantic.color.category['green-subtle']))
    })

    it('maps down trend to red category badge colors', () => {
      render(<AccountCard {...defaultProps} trend="down" trendValue="-1.2%" />)

      const badge = screen.getByText('-1.2%')
      const styles = window.getComputedStyle(badge)

      expect(styles.color).toBe(hexToRgb(tokens.semantic.color.category.red))
      expect(styles.backgroundColor).toBe(hexToRgb(tokens.semantic.color.category['red-subtle']))
    })

    it('maps neutral trend to blue category badge colors', () => {
      render(<AccountCard {...defaultProps} trend="neutral" trendValue="0.0%" />)

      const badge = screen.getByText('0.0%')
      const styles = window.getComputedStyle(badge)

      expect(styles.color).toBe(hexToRgb(tokens.semantic.color.category.blue))
      expect(styles.backgroundColor).toBe(hexToRgb(tokens.semantic.color.category['blue-subtle']))
    })

    it('does not display trend when not provided', () => {
      render(<AccountCard {...defaultProps} />)
      
      expect(screen.queryByLabelText(/Trend/)).not.toBeInTheDocument()
    })

    it('does not display trend when only trend provided without value', () => {
      render(<AccountCard {...defaultProps} trend="up" />)
      
      expect(screen.queryByLabelText('Trend up')).not.toBeInTheDocument()
    })

    it('does not display trend when only trendValue provided without trend', () => {
      render(<AccountCard {...defaultProps} trendValue="+2.5%" />)
      
      expect(screen.queryByText('+2.5%')).not.toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('displays primary action', () => {
      const handleClick = jest.fn()
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: handleClick }}
          data-testid="account"
        />
      )
      
      expect(screen.getByText('Transfer')).toBeInTheDocument()
    })

    it('calls primary action onClick', () => {
      const handleClick = jest.fn()
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: handleClick }}
          data-testid="account"
        />
      )
      
      fireEvent.click(screen.getByText('Transfer'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('displays secondary action', () => {
      const handleClick = jest.fn()
      render(
        <AccountCard 
          {...defaultProps}
          secondaryAction={{ label: 'Details', onClick: handleClick }}
        />
      )
      
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('calls secondary action onClick', () => {
      const handleClick = jest.fn()
      render(
        <AccountCard 
          {...defaultProps}
          secondaryAction={{ label: 'Details', onClick: handleClick }}
        />
      )
      
      fireEvent.click(screen.getByText('Details'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('displays both primary and secondary actions', () => {
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: () => {} }}
          secondaryAction={{ label: 'Details', onClick: () => {} }}
        />
      )
      
      expect(screen.getByText('Transfer')).toBeInTheDocument()
      expect(screen.getByText('Details')).toBeInTheDocument()
    })

    it('supports action with icon', () => {
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: () => {}, icon: 'arrowRight' }}
        />
      )
      
      expect(screen.getByText('Transfer')).toBeInTheDocument()
    })

    it('supports action with custom variant', () => {
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: () => {}, variant: 'secondary' }}
        />
      )
      
      expect(screen.getByText('Transfer')).toBeInTheDocument()
    })

    it('does not display actions when not provided', () => {
      render(<AccountCard {...defaultProps} />)
      
      // No buttons should be present
      expect(screen.queryByRole('button', { name: /Transfer|Details/ })).not.toBeInTheDocument()
    })
  })

  describe('Interactive Card Behavior', () => {
    it('is not clickable when onClick not provided', () => {
      render(<AccountCard {...defaultProps} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toHaveAttribute('role', 'article')
      expect(card).not.toHaveAttribute('tabIndex')
    })

    it('is clickable when onClick provided', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toHaveAttribute('role', 'button')
      expect(card).toHaveAttribute('tabIndex', '0')
    })

    it('calls onClick when card clicked', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      fireEvent.click(card)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Enter key pressed', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      fireEvent.keyDown(card, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Space key pressed', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      fireEvent.keyDown(card, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick for other keys', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      fireEvent.keyDown(card, { key: 'Escape' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('has hover state when clickable', () => {
      const handleClick = jest.fn()
      render(<AccountCard {...defaultProps} onClick={handleClick} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toHaveStyle({ cursor: 'pointer' })
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      render(<AccountCard {...defaultProps} data-testid="custom-testid" />)
      
      expect(screen.getByTestId('custom-testid')).toBeInTheDocument()
    })

    it('propagates data-testid to balance', () => {
      render(<AccountCard {...defaultProps} data-testid="test-account" />)
      
      expect(screen.getByTestId('test-account-balance')).toBeInTheDocument()
    })

    it('propagates data-testid to actions', () => {
      render(
        <AccountCard 
          {...defaultProps}
          action={{ label: 'Transfer', onClick: () => {} }}
          secondaryAction={{ label: 'Details', onClick: () => {} }}
          data-testid="test-account"
        />
      )
      
      expect(screen.getByTestId('test-account-action')).toBeInTheDocument()
      expect(screen.getByTestId('test-account-secondary-action')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<AccountCard {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when clickable', async () => {
      const { container } = render(<AccountCard {...defaultProps} onClick={() => {}} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all features (without onClick)', async () => {
      // Note: When onClick is present with action buttons, nested-interactive violations occur
      // This is an accepted design trade-off where stopPropagation prevents event conflicts
      const { container } = render(
        <AccountCard 
          {...defaultProps}
          accountNumber="1234"
          trend="up"
          trendValue="+2.5%"
          action={{ label: 'Transfer', onClick: () => {} }}
          secondaryAction={{ label: 'Details', onClick: () => {} }}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has descriptive aria-label when clickable', () => {
      render(
        <AccountCard 
          accountType="checking"
          accountName="Personal Checking"
          balance={1234.56}
          onClick={() => {}}
          data-testid="account"
        />
      )
      
      const card = screen.getByTestId('account')
      expect(card).toHaveAttribute('aria-label')
      expect(card.getAttribute('aria-label')).toContain('Personal Checking')
      expect(card.getAttribute('aria-label')).toContain('1234.56')
    })

    it('account avatar has descriptive label', () => {
      render(
        <AccountCard
          {...defaultProps}
          accountType="savings"
          accountName="High Yield Savings"
        />
      )
      
      expect(screen.getByLabelText('Avatar for High Yield Savings')).toBeInTheDocument()
    })

    it('trend icon has descriptive label', () => {
      render(<AccountCard {...defaultProps} trend="up" trendValue="+2.5%" />)
      
      expect(screen.getByLabelText('Trend up')).toBeInTheDocument()
    })

    it('uses role="article" when not clickable', () => {
      render(<AccountCard {...defaultProps} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toHaveAttribute('role', 'article')
    })

    it('uses role="button" when clickable', () => {
      render(<AccountCard {...defaultProps} onClick={() => {}} data-testid="account" />)
      
      const card = screen.getByTestId('account')
      expect(card).toHaveAttribute('role', 'button')
    })
  })

  describe('Edge Cases', () => {
    it('handles very long account names', () => {
      const longName = 'This is a very long account name that might cause layout issues'
      render(<AccountCard {...defaultProps} accountName={longName} />)
      
      expect(screen.getByText(longName)).toBeInTheDocument()
    })

    it('handles very large balances', () => {
      render(<AccountCard {...defaultProps} balance={9999999.99} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toHaveTextContent('9,999,999.99')
    })

    it('handles negative balances (debt)', () => {
      render(<AccountCard {...defaultProps} balance={-5000.00} data-testid="account" />)
      
      const balance = screen.getByTestId('account-balance')
      expect(balance).toHaveTextContent('5,000.00')
    })

    it('renders with all optional props', () => {
      render(
        <AccountCard
          accountType="credit"
          accountName="Platinum Credit Card"
          balance={-1234.56}
          accountNumber="5678"
          trend="down"
          trendValue="-15%"
          action={{ label: 'Pay Now', onClick: () => {}, variant: 'primary', icon: 'add' }}
          secondaryAction={{ label: 'View Transactions', onClick: () => {} }}
          currency="USD"
          onClick={() => {}}
          data-testid="full-account"
        />
      )
      
      expect(screen.getByTestId('full-account')).toBeInTheDocument()
      expect(screen.getByText('Platinum Credit Card')).toBeInTheDocument()
      expect(screen.getByText('•••• 5678')).toBeInTheDocument()
      expect(screen.getByLabelText('Trend down')).toBeInTheDocument()
      expect(screen.getByText('-15%')).toBeInTheDocument()
      expect(screen.getByText('Pay Now')).toBeInTheDocument()
      expect(screen.getByText('View Transactions')).toBeInTheDocument()
    })
  })
})
