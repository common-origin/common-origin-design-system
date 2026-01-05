import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { TransactionListItem } from './TransactionListItem'

expect.extend(toHaveNoViolations)

describe('TransactionListItem', () => {
  const mockDate = new Date('2024-01-15T10:00:00Z')
  
  const defaultProps = {
    merchant: 'Coffee Shop',
    amount: -4.50,
    date: mockDate
  }

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<TransactionListItem {...defaultProps} />)
      
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
      expect(screen.getByText(/4\.50/)).toBeInTheDocument()
    })

    it('renders merchant name', () => {
      render(<TransactionListItem {...defaultProps} merchant="Grocery Store" />)
      
      expect(screen.getByText('Grocery Store')).toBeInTheDocument()
    })

    it('renders transaction amount', () => {
      render(<TransactionListItem {...defaultProps} amount={-125.50} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toBeInTheDocument()
      expect(amount).toHaveTextContent('125.50')
    })

    it('renders transaction date', () => {
      render(<TransactionListItem {...defaultProps} data-testid="transaction" />)
      
      expect(screen.getByTestId('transaction-date')).toBeInTheDocument()
    })

    it('has minimum height of 72px', () => {
      render(<TransactionListItem {...defaultProps} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      const styles = window.getComputedStyle(container)
      expect(styles.minHeight).toBe('72px')
    })
  })

  describe('Amount Display', () => {
    it('displays negative amount (expense) with negative variant', () => {
      render(<TransactionListItem {...defaultProps} amount={-50.00} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toHaveTextContent('−$50.00')
    })

    it('displays positive amount (income) with positive variant', () => {
      render(<TransactionListItem {...defaultProps} amount={1000.00} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toHaveTextContent('+$1,000.00')
    })

    it('displays zero amount with default variant', () => {
      render(<TransactionListItem {...defaultProps} amount={0} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toHaveTextContent('$0.00')
    })

    it('supports custom currency', () => {
      render(<TransactionListItem {...defaultProps} amount={-25.50} currency="USD" data-testid="transaction" />)
      
      expect(screen.getByTestId('transaction-amount')).toBeInTheDocument()
    })
  })

  describe('Transaction Status', () => {
    it('defaults to completed status', () => {
      render(<TransactionListItem {...defaultProps} />)
      
      // Completed status shows no badge
      expect(screen.queryByText('Pending transaction')).not.toBeInTheDocument()
      expect(screen.queryByText('Failed transaction')).not.toBeInTheDocument()
    })

    it('displays pending status with badge', () => {
      render(<TransactionListItem {...defaultProps} status="pending" />)
      
      expect(screen.getByText('Pending transaction')).toBeInTheDocument()
    })

    it('displays failed status with badge', () => {
      render(<TransactionListItem {...defaultProps} status="failed" />)
      
      expect(screen.getByText('Failed transaction')).toBeInTheDocument()
    })
  })

  describe('Category Display', () => {
    const categories: Array<{ key: 'shopping' | 'dining' | 'transport' | 'entertainment' | 'bills' | 'other', label: string }> = [
      { key: 'shopping', label: 'Shopping' },
      { key: 'dining', label: 'Dining' },
      { key: 'transport', label: 'Transport' },
      { key: 'entertainment', label: 'Entertainment' },
      { key: 'bills', label: 'Bills' },
      { key: 'other', label: 'Other' }
    ]

    categories.forEach(({ key, label }) => {
      it(`displays ${key} category badge`, () => {
        render(<TransactionListItem {...defaultProps} category={key} />)
        
        expect(screen.getByLabelText(`Category: ${label}`)).toBeInTheDocument()
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('does not display category icon when category not provided', () => {
      render(<TransactionListItem {...defaultProps} />)
      
      expect(screen.queryByLabelText(/Category:/)).not.toBeInTheDocument()
    })
  })

  describe('Merchant Logo', () => {
    it('displays avatar with merchant logo', () => {
      render(<TransactionListItem {...defaultProps} merchantLogo="https://example.com/logo.png" />)
      
      const avatar = screen.getByAltText('Avatar of Coffee Shop')
      expect(avatar).toBeInTheDocument()
    })

    it('displays avatar without logo (fallback)', () => {
      render(<TransactionListItem {...defaultProps} />)
      
      const avatar = screen.getByLabelText('Avatar for Coffee Shop')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('Description', () => {
    it('displays description when provided', () => {
      render(<TransactionListItem {...defaultProps} description="Morning coffee" />)
      
      expect(screen.getByText(/Morning coffee/)).toBeInTheDocument()
    })

    it('does not display description when not provided', () => {
      render(<TransactionListItem {...defaultProps} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      expect(container).not.toHaveTextContent('•')
    })
  })

  describe('Metadata Indicators', () => {
    it('displays receipt icon when hasReceipt is true', () => {
      render(<TransactionListItem {...defaultProps} hasReceipt />)
      
      expect(screen.getByLabelText('Has receipt')).toBeInTheDocument()
    })

    it('displays note icon when hasNote is true', () => {
      render(<TransactionListItem {...defaultProps} hasNote />)
      
      expect(screen.getByLabelText('Has note')).toBeInTheDocument()
    })

    it('displays both receipt and note icons', () => {
      render(<TransactionListItem {...defaultProps} hasReceipt hasNote />)
      
      expect(screen.getByLabelText('Has receipt')).toBeInTheDocument()
      expect(screen.getByLabelText('Has note')).toBeInTheDocument()
    })

    it('does not display indicators when both false', () => {
      render(<TransactionListItem {...defaultProps} />)
      
      expect(screen.queryByLabelText('Has receipt')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Has note')).not.toBeInTheDocument()
    })
  })

  describe('Interactive Behavior', () => {
    it('is not clickable when onClick not provided', () => {
      render(<TransactionListItem {...defaultProps} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      expect(container).not.toHaveAttribute('role', 'button')
      expect(container).not.toHaveAttribute('tabIndex')
    })

    it('is clickable when onClick provided', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      expect(container).toHaveAttribute('role', 'button')
      expect(container).toHaveAttribute('tabIndex', '0')
    })

    it('calls onClick when clicked', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      fireEvent.click(container)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Enter key pressed', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      fireEvent.keyDown(container, { key: 'Enter' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('calls onClick when Space key pressed', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      fireEvent.keyDown(container, { key: ' ' })
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick for other keys', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      fireEvent.keyDown(container, { key: 'Escape' })
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('has hover state when clickable', () => {
      const handleClick = jest.fn()
      render(<TransactionListItem {...defaultProps} onClick={handleClick} data-testid="transaction" />)
      
      const container = screen.getByTestId('transaction')
      expect(container).toHaveStyle({ cursor: 'pointer' })
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      render(<TransactionListItem {...defaultProps} data-testid="custom-testid" />)
      
      expect(screen.getByTestId('custom-testid')).toBeInTheDocument()
    })

    it('propagates data-testid to amount and date', () => {
      render(<TransactionListItem {...defaultProps} data-testid="test-transaction" />)
      
      expect(screen.getByTestId('test-transaction-amount')).toBeInTheDocument()
      expect(screen.getByTestId('test-transaction-date')).toBeInTheDocument()
    })

    it('handles string date prop', () => {
      render(<TransactionListItem {...defaultProps} date="2024-01-15" />)
      
      expect(screen.getByText('Coffee Shop')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<TransactionListItem {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when clickable', async () => {
      const { container } = render(<TransactionListItem {...defaultProps} onClick={() => {}} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all features', async () => {
      const { container } = render(
        <TransactionListItem 
          {...defaultProps}
          status="pending"
          category="shopping"
          description="Test purchase"
          hasReceipt
          hasNote
          onClick={() => {}}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has descriptive aria-label when clickable', () => {
      render(
        <TransactionListItem 
          merchant="Coffee Shop"
          amount={-4.50}
          date={mockDate}
          onClick={() => {}}
          data-testid="transaction"
        />
      )
      
      const container = screen.getByTestId('transaction')
      expect(container).toHaveAttribute('aria-label')
      expect(container.getAttribute('aria-label')).toContain('Coffee Shop')
      expect(container.getAttribute('aria-label')).toContain('expense')
    })

    it('has descriptive aria-label for income transaction', () => {
      render(
        <TransactionListItem 
          merchant="Salary"
          amount={1000.00}
          date={mockDate}
          onClick={() => {}}
          data-testid="transaction"
        />
      )
      
      const container = screen.getByTestId('transaction')
      expect(container.getAttribute('aria-label')).toContain('income')
    })

    it('status badges have descriptive labels', () => {
      render(<TransactionListItem {...defaultProps} status="pending" />)
      
      expect(screen.getByText('Pending transaction')).toBeInTheDocument()
    })

    it('category icons have descriptive labels', () => {
      render(<TransactionListItem {...defaultProps} category="shopping" />)
      
      expect(screen.getByLabelText('Category: Shopping')).toBeInTheDocument()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
    })

    it('metadata icons have descriptive labels', () => {
      render(<TransactionListItem {...defaultProps} hasReceipt hasNote />)
      
      expect(screen.getByLabelText('Has receipt')).toBeInTheDocument()
      expect(screen.getByLabelText('Has note')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles very long merchant names with truncation', () => {
      const longName = 'This is a very long merchant name that should be truncated to fit'
      render(<TransactionListItem {...defaultProps} merchant={longName} />)
      
      expect(screen.getByText(longName)).toBeInTheDocument()
    })

    it('handles very long descriptions with truncation', () => {
      const longDescription = 'This is a very long description that should be truncated to prevent layout issues'
      render(<TransactionListItem {...defaultProps} description={longDescription} />)
      
      expect(screen.getByText(new RegExp(longDescription))).toBeInTheDocument()
    })

    it('handles large transaction amounts', () => {
      render(<TransactionListItem {...defaultProps} amount={-123456.78} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toHaveTextContent('123,456.78')
    })

    it('handles small decimal amounts', () => {
      render(<TransactionListItem {...defaultProps} amount={-0.99} data-testid="transaction" />)
      
      const amount = screen.getByTestId('transaction-amount')
      expect(amount).toHaveTextContent('0.99')
    })

    it('renders with all optional props', () => {
      render(
        <TransactionListItem
          merchant="Test Merchant"
          amount={-50.00}
          date={mockDate}
          status="pending"
          category="shopping"
          merchantLogo="https://example.com/logo.png"
          description="Test description"
          hasReceipt
          hasNote
          currency="USD"
          onClick={() => {}}
          data-testid="full-transaction"
        />
      )
      
      expect(screen.getByTestId('full-transaction')).toBeInTheDocument()
      expect(screen.getByText('Test Merchant')).toBeInTheDocument()
      expect(screen.getByText('Pending transaction')).toBeInTheDocument()
      expect(screen.getByLabelText('Category: Shopping')).toBeInTheDocument()
      expect(screen.getByText('Shopping')).toBeInTheDocument()
      expect(screen.getByText(/Test description/)).toBeInTheDocument()
      expect(screen.getByText(/Test description/)).toBeInTheDocument()
      expect(screen.getByLabelText('Has receipt')).toBeInTheDocument()
      expect(screen.getByLabelText('Has note')).toBeInTheDocument()
    })
  })
})
