import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DateGroup } from './DateGroup'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

expect.extend(toHaveNoViolations)

describe('DateGroup', () => {
  const mockDate = new Date('2024-01-15T10:00:00Z')
  
  const defaultProps = {
    date: mockDate,
    children: (
      <div data-testid="child-content">
        Transaction 1
      </div>
    )
  }

  describe('Basic Rendering', () => {
    it('renders with required props', () => {
      render(<DateGroup {...defaultProps} />)
      
      expect(screen.getByRole('group')).toBeInTheDocument()
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
    })

    it('renders date using DateFormatter', () => {
      render(<DateGroup {...defaultProps} data-testid="date-group" />)
      
      expect(screen.getByTestId('date-group-date')).toBeInTheDocument()
    })

    it('does not show total by default', () => {
      render(<DateGroup {...defaultProps} data-testid="date-group" />)
      
      expect(screen.queryByTestId('date-group-total')).not.toBeInTheDocument()
    })

    it('does not show count by default', () => {
      render(<DateGroup {...defaultProps} data-testid="date-group" />)
      
      expect(screen.queryByTestId('date-group-count')).not.toBeInTheDocument()
    })
  })

  describe('Date Formatting', () => {
    it('uses smart format by default', () => {
      const today = new Date()
      render(<DateGroup date={today} children={<div>Content</div>} data-testid="date-group" />)
      
      const dateElement = screen.getByTestId('date-group-date')
      expect(dateElement).toHaveTextContent('Today')
    })

    it('supports absolute format mode', () => {
      render(
        <DateGroup 
          date={mockDate} 
          format="absolute"
          children={<div>Content</div>}
          data-testid="date-group"
        />
      )
      
      expect(screen.getByTestId('date-group-date')).toBeInTheDocument()
    })

    it('supports relative format mode', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      render(
        <DateGroup 
          date={yesterday} 
          format="relative"
          children={<div>Content</div>}
          data-testid="date-group"
        />
      )
      
      const dateElement = screen.getByTestId('date-group-date')
      expect(dateElement).toHaveTextContent('Yesterday')
    })
  })

  describe('Total Amount Display', () => {
    it('shows total when showTotal is true', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={250.50}
          data-testid="date-group"
        />
      )
      
      expect(screen.getByTestId('date-group-total')).toBeInTheDocument()
    })

    it('displays positive amount with positive variant', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={100}
          data-testid="date-group"
        />
      )
      
      const total = screen.getByTestId('date-group-total')
      expect(total).toBeInTheDocument()
      expect(total).toHaveTextContent('+$100.00')
    })

    it('displays negative amount with negative variant', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={-75.25}
          data-testid="date-group"
        />
      )
      
      const total = screen.getByTestId('date-group-total')
      expect(total).toBeInTheDocument()
      expect(total).toHaveTextContent('−$75.25')
    })

    it('displays zero amount with default variant', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={0}
          data-testid="date-group"
        />
      )
      
      const total = screen.getByTestId('date-group-total')
      expect(total).toBeInTheDocument()
      expect(total).toHaveTextContent('$0.00')
    })

    it('supports custom currency', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={100}
          currency="USD"
          data-testid="date-group"
        />
      )
      
      expect(screen.getByTestId('date-group-total')).toBeInTheDocument()
    })
  })

  describe('Item Count Display', () => {
    it('shows count when showCount is true', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          count={5}
          data-testid="date-group"
        />
      )
      
      const countElement = screen.getByTestId('date-group-count')
      expect(countElement).toBeInTheDocument()
      expect(countElement).toHaveTextContent('(5 items)')
    })

    it('displays singular "item" for count of 1', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          count={1}
          data-testid="date-group"
        />
      )
      
      const countElement = screen.getByTestId('date-group-count')
      expect(countElement).toHaveTextContent('(1 item)')
    })

    it('displays plural "items" for count > 1', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          count={10}
          data-testid="date-group"
        />
      )
      
      const countElement = screen.getByTestId('date-group-count')
      expect(countElement).toHaveTextContent('(10 items)')
    })

    it('displays plural "items" for count of 0', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          count={0}
          data-testid="date-group"
        />
      )
      
      const countElement = screen.getByTestId('date-group-count')
      expect(countElement).toHaveTextContent('(0 items)')
    })
  })

  describe('Sticky Header', () => {
    it('applies sticky styling when sticky prop is true', () => {
      render(
        <DateGroup 
          {...defaultProps}
          sticky
          data-testid="date-group"
        />
      )
      
      const header = screen.getByTestId('date-group-header')
      expect(header).toHaveStyle({ position: 'sticky' })
    })

    it('does not apply sticky styling by default', () => {
      render(
        <DateGroup 
          {...defaultProps}
          data-testid="date-group"
        />
      )
      
      const header = screen.getByTestId('date-group-header')
      expect(header).not.toHaveStyle({ position: 'sticky' })
    })
  })

  describe('Children Rendering', () => {
    it('renders single child', () => {
      render(
        <DateGroup date={mockDate}>
          <div data-testid="single-child">Transaction</div>
        </DateGroup>
      )
      
      expect(screen.getByTestId('single-child')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <DateGroup date={mockDate}>
          <div data-testid="child-1">Transaction 1</div>
          <div data-testid="child-2">Transaction 2</div>
          <div data-testid="child-3">Transaction 3</div>
        </DateGroup>
      )
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
      expect(screen.getByTestId('child-3')).toBeInTheDocument()
    })

    it('renders complex child components', () => {
      render(
        <DateGroup date={mockDate} data-testid="date-group">
          <Stack direction="column" gap="sm">
            <Typography>Item 1</Typography>
            <Typography>Item 2</Typography>
          </Stack>
        </DateGroup>
      )
      
      expect(screen.getByTestId('date-group-content')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      render(<DateGroup {...defaultProps} data-testid="custom-testid" />)
      
      expect(screen.getByTestId('custom-testid')).toBeInTheDocument()
    })

    it('propagates data-testid to subcomponents', () => {
      render(
        <DateGroup 
          {...defaultProps} 
          showTotal
          totalAmount={100}
          showCount
          count={5}
          data-testid="test-group"
        />
      )
      
      expect(screen.getByTestId('test-group-header')).toBeInTheDocument()
      expect(screen.getByTestId('test-group-date')).toBeInTheDocument()
      expect(screen.getByTestId('test-group-total')).toBeInTheDocument()
      expect(screen.getByTestId('test-group-count')).toBeInTheDocument()
      expect(screen.getByTestId('test-group-content')).toBeInTheDocument()
    })

    it('handles string date prop', () => {
      render(
        <DateGroup 
          date="2024-01-15" 
          children={<div>Content</div>}
        />
      )
      
      expect(screen.getByRole('group')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<DateGroup {...defaultProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all features enabled', async () => {
      const { container } = render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={100}
          showCount
          count={5}
          sticky
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has role="group" for semantic grouping', () => {
      render(<DateGroup {...defaultProps} />)
      
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('has descriptive aria-label on group', () => {
      render(<DateGroup date={mockDate} children={<div>Content</div>} />)
      
      const group = screen.getByRole('group')
      expect(group).toHaveAttribute('aria-label')
      expect(group.getAttribute('aria-label')).toContain('Transactions for')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined totalAmount gracefully when showTotal is true', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          data-testid="date-group"
        />
      )
      
      expect(screen.queryByTestId('date-group-total')).not.toBeInTheDocument()
    })

    it('handles undefined count gracefully when showCount is true', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          data-testid="date-group"
        />
      )
      
      expect(screen.queryByTestId('date-group-count')).not.toBeInTheDocument()
    })

    it('renders empty children', () => {
      render(<DateGroup date={mockDate} children={null} />)
      
      expect(screen.getByRole('group')).toBeInTheDocument()
    })

    it('handles large transaction counts', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showCount
          count={999}
          data-testid="date-group"
        />
      )
      
      const countElement = screen.getByTestId('date-group-count')
      expect(countElement).toHaveTextContent('(999 items)')
    })

    it('handles large monetary amounts', () => {
      render(
        <DateGroup 
          {...defaultProps}
          showTotal
          totalAmount={1234567.89}
          data-testid="date-group"
        />
      )
      
      expect(screen.getByTestId('date-group-total')).toBeInTheDocument()
    })
  })
})
