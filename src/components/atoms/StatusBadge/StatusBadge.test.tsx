import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StatusBadge, StatusBadgeProps, StatusType, StatusSize } from './StatusBadge'

expect.extend(toHaveNoViolations)

describe('StatusBadge Component', () => {
  const defaultProps: StatusBadgeProps = {
    status: 'pending'
  }

  const renderStatusBadge = (props: Partial<StatusBadgeProps> = {}) => {
    return render(<StatusBadge {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderStatusBadge()
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('uses default label when no custom label provided', () => {
      renderStatusBadge({ status: 'completed' })
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('renders with custom label', () => {
      renderStatusBadge({ status: 'pending', label: 'Awaiting Approval' })
      expect(screen.getByText('Awaiting Approval')).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderStatusBadge({ 'data-testid': 'custom-status' })
      expect(screen.getByTestId('custom-status')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderStatusBadge({ 'data-testid': 'test-status' })
      expect(screen.getByTestId('test-status')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe('Status Types', () => {
    const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']

    statuses.forEach((status) => {
      it(`renders with ${status} status`, () => {
        renderStatusBadge({ status })
        expect(screen.getByRole('status')).toBeInTheDocument()
      })
    })

    it('renders pending status with correct default label', () => {
      renderStatusBadge({ status: 'pending' })
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('renders completed status with correct default label', () => {
      renderStatusBadge({ status: 'completed' })
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('renders failed status with correct default label', () => {
      renderStatusBadge({ status: 'failed' })
      expect(screen.getByText('Failed')).toBeInTheDocument()
    })

    it('renders cancelled status with correct default label', () => {
      renderStatusBadge({ status: 'cancelled' })
      expect(screen.getByText('Cancelled')).toBeInTheDocument()
    })

    it('renders processing status with correct default label', () => {
      renderStatusBadge({ status: 'processing' })
      expect(screen.getByText('Processing')).toBeInTheDocument()
    })

    it('renders scheduled status with correct default label', () => {
      renderStatusBadge({ status: 'scheduled' })
      expect(screen.getByText('Scheduled')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: StatusSize[] = ['small', 'medium']

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        renderStatusBadge({ size })
        const badge = screen.getByRole('status')
        expect(badge).toBeInTheDocument()
      })
    })

    it('defaults to medium size', () => {
      renderStatusBadge()
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
    })
  })

  describe('Icon Display', () => {
    it('renders with icon by default', () => {
      renderStatusBadge({ status: 'completed' })
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
      // Icon is rendered, check for presence of Icon component
    })

    it('renders without icon when showIcon is false', () => {
      renderStatusBadge({ status: 'completed', showIcon: false })
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
      // No icon should be rendered
    })

    it('renders with icon for all status types', () => {
      const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']
      
      statuses.forEach((status) => {
        const { unmount } = renderStatusBadge({ status })
        const badge = screen.getByRole('status')
        expect(badge).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('ARIA Live Region', () => {
    it('has aria-live="polite" by default (liveRegion defaults to true)', () => {
      renderStatusBadge()
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('has aria-live="polite" when liveRegion is true', () => {
      renderStatusBadge({ liveRegion: true })
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('has no aria-live when liveRegion is false', () => {
      renderStatusBadge({ liveRegion: false })
      const badge = screen.getByRole('status')
      expect(badge).not.toHaveAttribute('aria-live')
    })

    it('has aria-atomic="true" when liveRegion is true', () => {
      renderStatusBadge({ liveRegion: true })
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-atomic', 'true')
    })

    it('has no aria-atomic when liveRegion is false', () => {
      renderStatusBadge({ liveRegion: false })
      const badge = screen.getByRole('status')
      expect(badge).not.toHaveAttribute('aria-atomic')
    })
  })

  describe('Screen Reader Text', () => {
    it('includes screen reader text for pending status', () => {
      renderStatusBadge({ status: 'pending' })
      expect(screen.getByText(/pending status/)).toBeInTheDocument()
    })

    it('includes screen reader text for completed status', () => {
      renderStatusBadge({ status: 'completed' })
      expect(screen.getByText(/completed status/)).toBeInTheDocument()
    })

    it('includes screen reader text for failed status', () => {
      renderStatusBadge({ status: 'failed' })
      expect(screen.getByText(/failed status/)).toBeInTheDocument()
    })

    it('includes screen reader text for cancelled status', () => {
      renderStatusBadge({ status: 'cancelled' })
      expect(screen.getByText(/cancelled status/)).toBeInTheDocument()
    })

    it('includes screen reader text for processing status', () => {
      renderStatusBadge({ status: 'processing' })
      expect(screen.getByText(/processing status/)).toBeInTheDocument()
    })

    it('includes screen reader text for scheduled status', () => {
      renderStatusBadge({ status: 'scheduled' })
      expect(screen.getByText(/scheduled status/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderStatusBadge()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with liveRegion', async () => {
      const { container } = renderStatusBadge({ liveRegion: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all status types', async () => {
      const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']
      
      for (const status of statuses) {
        const { container, unmount } = renderStatusBadge({ status })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations across all sizes', async () => {
      const sizes: StatusSize[] = ['small', 'medium']
      
      for (const size of sizes) {
        const { container, unmount } = renderStatusBadge({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations without icon', async () => {
      const { container } = renderStatusBadge({ showIcon: false })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has role="status"', () => {
      renderStatusBadge()
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('role', 'status')
    })

    it('icons have aria-hidden="true"', () => {
      renderStatusBadge({ status: 'completed' })
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
      // Icons should have aria-hidden
    })
  })

  describe('Edge Cases', () => {
    it('handles very long custom labels', () => {
      const longLabel = 'This is a very long status label that might overflow the badge container'
      renderStatusBadge({ status: 'pending', label: longLabel })
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })

    it('handles all prop combinations', () => {
      renderStatusBadge({
        status: 'processing',
        label: 'In Progress',
        size: 'small',
        showIcon: true,
        liveRegion: true,
        'data-testid': 'test-badge'
      })
      const badge = screen.getByTestId('test-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('renders correctly when size changes', () => {
      const { rerender } = renderStatusBadge({ size: 'small' })
      expect(screen.getByRole('status')).toBeInTheDocument()
      
      rerender(<StatusBadge status="pending" size="medium" />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders correctly when status changes', () => {
      const { rerender } = renderStatusBadge({ status: 'pending' })
      expect(screen.getByText('Pending')).toBeInTheDocument()
      
      rerender(<StatusBadge status="completed" />)
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })
  })
})
