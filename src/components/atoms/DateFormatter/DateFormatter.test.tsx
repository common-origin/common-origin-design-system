import React from 'react'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { DateFormatter, DateFormatterProps } from './DateFormatter'

expect.extend(toHaveNoViolations)

const defaultProps: DateFormatterProps = {
  dateString: '2023-12-25T10:30:00.000Z'
}

const renderComponent = (props: Partial<DateFormatterProps> = {}) => {
  return render(<DateFormatter {...defaultProps} {...props} />)
}

describe('DateFormatter', () => {
  describe('Basic Rendering', () => {
    it('renders formatted date with default format', () => {
      const { getByText } = renderComponent()
      expect(getByText('2023')).toBeInTheDocument()
    })

    it('renders with custom format string', () => {
      const { getByText } = renderComponent({
        formatString: 'MMM dd, yyyy'
      })
      expect(getByText('Dec 25, 2023')).toBeInTheDocument()
    })

    it('renders with proper datetime attribute', () => {
      const { container } = renderComponent()
      const timeElement = container.querySelector('time')
      expect(timeElement).toHaveAttribute('datetime', '2023-12-25T10:30:00.000Z')
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      const { getByTestId } = renderComponent({
        'data-testid': 'test-date'
      })
      expect(getByTestId('test-date')).toBeInTheDocument()
    })

    it('handles different date formats', () => {
      const { getByText } = renderComponent({
        dateString: '2024-01-01T00:00:00.000Z',
        formatString: 'dd/MM/yyyy'
      })
      expect(getByText('01/01/2024')).toBeInTheDocument()
    })

    it('handles time formatting', () => {
      const { getByText } = renderComponent({
        formatString: 'HH:mm'
      })
      // Note: Time formatting respects local timezone
      // UTC 10:30 becomes local time (varies by test environment timezone)
      const timeElement = getByText(/^\d{2}:\d{2}$/)
      expect(timeElement).toBeInTheDocument()
    })
  })

  describe('Relative Date Formatting', () => {
    it('shows "Today" for today\'s date in relative mode', () => {
      const today = new Date().toISOString()
      const { getByText } = renderComponent({
        dateString: today,
        mode: 'relative'
      })
      expect(getByText('Today')).toBeInTheDocument()
    })

    it('shows "Yesterday" for yesterday\'s date in relative mode', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const { getByText } = renderComponent({
        dateString: yesterday.toISOString(),
        mode: 'relative'
      })
      expect(getByText('Yesterday')).toBeInTheDocument()
    })

    it('shows day name for dates within this week in relative mode', () => {
      const twoDaysAgo = new Date()
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      const { container } = renderComponent({
        dateString: twoDaysAgo.toISOString(),
        mode: 'relative'
      })
      // Should show a day name (Monday, Tuesday, etc.)
      const timeElement = container.querySelector('time')
      expect(timeElement?.textContent).toMatch(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/)
    })

    it('uses absolute format for old dates in smart mode', () => {
      const { getByText } = renderComponent({
        dateString: '2023-06-15T10:30:00.000Z',
        mode: 'smart'
      })
      expect(getByText('June 15, 2023')).toBeInTheDocument()
    })

    it('uses relative format for recent dates in smart mode', () => {
      const today = new Date().toISOString()
      const { getByText } = renderComponent({
        dateString: today,
        mode: 'smart'
      })
      expect(getByText('Today')).toBeInTheDocument()
    })

    it('defaults to absolute mode when mode not specified', () => {
      const { getByText } = renderComponent({
        dateString: '2023-12-25T10:30:00.000Z',
        formatString: 'MMM dd, yyyy'
      })
      expect(getByText('Dec 25, 2023')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles different ISO date formats', () => {
      const { getByText } = renderComponent({
        dateString: '2023-06-15',
        formatString: 'MMMM yyyy'
      })
      expect(getByText('June 2023')).toBeInTheDocument()
    })

    it('throws error for invalid date strings', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      expect(() => {
        renderComponent({
          dateString: 'invalid-date'
        })
      }).toThrow()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('uses semantic time element', () => {
      const { container } = renderComponent()
      const timeElement = container.querySelector('time')
      expect(timeElement).toBeInTheDocument()
    })

    it('provides machine-readable datetime attribute', () => {
      const { container } = renderComponent()
      const timeElement = container.querySelector('time')
      expect(timeElement).toHaveAttribute('datetime')
    })
  })
})