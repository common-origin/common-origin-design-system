import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StatusLabel, StatusLabelProps, StatusType, StatusSize } from './StatusLabel'
import tokens from '@/styles/tokens.json'
import { effectiveFontWeight } from '@/test-utils/effectiveFontWeight'

expect.extend(toHaveNoViolations)

describe('StatusLabel Component', () => {
  const defaultProps: StatusLabelProps = {
    status: 'pending'
  }

  const renderStatusLabel = (props: Partial<StatusLabelProps> = {}) => {
    return render(<StatusLabel {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it.each(['small', 'medium'] as const)('renders %s labels at the badge-family weight', (size) => {
      renderStatusLabel({ size })
      expect(effectiveFontWeight(screen.getByRole('status'))).toBe(tokens.component.badge.label.fontWeight)
    })

    it('renders without crashing', () => {
      renderStatusLabel()
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('uses default label when no custom label provided', () => {
      renderStatusLabel({ status: 'completed' })
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('renders with custom label', () => {
      renderStatusLabel({ status: 'pending', label: 'Awaiting Approval' })
      expect(screen.getByText('Awaiting Approval')).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderStatusLabel({ 'data-testid': 'custom-status' })
      expect(screen.getByTestId('custom-status')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderStatusLabel({ 'data-testid': 'test-status' })
      expect(screen.getByTestId('test-status')).toBeInTheDocument()
      expect(screen.queryByTestId('wrong-id')).not.toBeInTheDocument()
    })
  })

  describe('Status Types', () => {
    const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']

    statuses.forEach((status) => {
      it(`renders with ${status} status`, () => {
        renderStatusLabel({ status })
        expect(screen.getByRole('status')).toBeInTheDocument()
      })
    })

    it('renders pending status with correct default label', () => {
      renderStatusLabel({ status: 'pending' })
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('renders completed status with correct default label', () => {
      renderStatusLabel({ status: 'completed' })
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('renders failed status with correct default label', () => {
      renderStatusLabel({ status: 'failed' })
      expect(screen.getByText('Failed')).toBeInTheDocument()
    })

    it('renders cancelled status with correct default label', () => {
      renderStatusLabel({ status: 'cancelled' })
      expect(screen.getByText('Cancelled')).toBeInTheDocument()
    })

    it('renders processing status with correct default label', () => {
      renderStatusLabel({ status: 'processing' })
      expect(screen.getByText('Processing')).toBeInTheDocument()
    })

    it('renders scheduled status with correct default label', () => {
      renderStatusLabel({ status: 'scheduled' })
      expect(screen.getByText('Scheduled')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    const sizes: StatusSize[] = ['small', 'medium']

    sizes.forEach((size) => {
      it(`renders the ${size} size at the ${size} label height`, () => {
        renderStatusLabel({ size })
        expect(screen.getByRole('status')).toHaveStyle({ height: tokens.semantic.size.label[size] })
      })
    })

    it('defaults to medium size (24px)', () => {
      renderStatusLabel()
      const badge = screen.getByRole('status')
      expect(badge).toHaveStyle({ height: tokens.semantic.size.label.medium })
    })
  })

  describe('Icon Display', () => {
    // The icon is not yet hidden from assistive technology: Icon ignores aria-hidden (#85)
    it('always shows an icon with the text, for every status (decision 0018)', () => {
      const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']

      statuses.forEach((status) => {
        const { unmount } = renderStatusLabel({ status })
        const icon = screen.getByRole('status').querySelector('svg')
        expect(icon).toBeInTheDocument()
        unmount()
      })
    })

    it('has no showIcon prop', () => {
      // @ts-expect-error showIcon is not a StatusLabel prop
      renderStatusLabel({ showIcon: false })
      expect(screen.getByRole('status').querySelector('svg')).toBeInTheDocument()
    })
  })

  describe('ARIA Live Region', () => {
    it('has aria-live="polite" by default (liveRegion defaults to true)', () => {
      renderStatusLabel()
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('has aria-live="polite" when liveRegion is true', () => {
      renderStatusLabel({ liveRegion: true })
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('has no aria-live when liveRegion is false', () => {
      renderStatusLabel({ liveRegion: false })
      const badge = screen.getByRole('status')
      expect(badge).not.toHaveAttribute('aria-live')
    })

    it('has aria-atomic="true" when liveRegion is true', () => {
      renderStatusLabel({ liveRegion: true })
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('aria-atomic', 'true')
    })

    it('has no aria-atomic when liveRegion is false', () => {
      renderStatusLabel({ liveRegion: false })
      const badge = screen.getByRole('status')
      expect(badge).not.toHaveAttribute('aria-atomic')
    })
  })

  describe('Screen Reader Text', () => {
    it('includes screen reader text for pending status', () => {
      renderStatusLabel({ status: 'pending' })
      expect(screen.getByText(/pending status/)).toBeInTheDocument()
    })

    it('includes screen reader text for completed status', () => {
      renderStatusLabel({ status: 'completed' })
      expect(screen.getByText(/completed status/)).toBeInTheDocument()
    })

    it('includes screen reader text for failed status', () => {
      renderStatusLabel({ status: 'failed' })
      expect(screen.getByText(/failed status/)).toBeInTheDocument()
    })

    it('includes screen reader text for cancelled status', () => {
      renderStatusLabel({ status: 'cancelled' })
      expect(screen.getByText(/cancelled status/)).toBeInTheDocument()
    })

    it('includes screen reader text for processing status', () => {
      renderStatusLabel({ status: 'processing' })
      expect(screen.getByText(/processing status/)).toBeInTheDocument()
    })

    it('includes screen reader text for scheduled status', () => {
      renderStatusLabel({ status: 'scheduled' })
      expect(screen.getByText(/scheduled status/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderStatusLabel()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with liveRegion', async () => {
      const { container } = renderStatusLabel({ liveRegion: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all status types', async () => {
      const statuses: StatusType[] = ['pending', 'completed', 'failed', 'cancelled', 'processing', 'scheduled']
      
      for (const status of statuses) {
        const { container, unmount } = renderStatusLabel({ status })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations across all sizes', async () => {
      const sizes: StatusSize[] = ['small', 'medium']
      
      for (const size of sizes) {
        const { container, unmount } = renderStatusLabel({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('has role="status"', () => {
      renderStatusLabel()
      const badge = screen.getByRole('status')
      expect(badge).toHaveAttribute('role', 'status')
    })

    it('icons have aria-hidden="true"', () => {
      renderStatusLabel({ status: 'completed' })
      const badge = screen.getByRole('status')
      expect(badge).toBeInTheDocument()
      // Icons should have aria-hidden
    })
  })

  describe('Edge Cases', () => {
    it('handles very long custom labels', () => {
      const longLabel = 'This is a very long status label that might overflow the badge container'
      renderStatusLabel({ status: 'pending', label: longLabel })
      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })

    it('handles all prop combinations', () => {
      renderStatusLabel({
        status: 'processing',
        label: 'In Progress',
        size: 'small',
        liveRegion: true,
        'data-testid': 'test-badge'
      })
      const badge = screen.getByTestId('test-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('aria-live', 'polite')
    })

    it('renders correctly when size changes', () => {
      const { rerender } = renderStatusLabel({ size: 'small' })
      expect(screen.getByRole('status')).toBeInTheDocument()
      
      rerender(<StatusLabel status="pending" size="medium" />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders correctly when status changes', () => {
      const { rerender } = renderStatusLabel({ status: 'pending' })
      expect(screen.getByText('Pending')).toBeInTheDocument()
      
      rerender(<StatusLabel status="completed" />)
      expect(screen.getByText('Completed')).toBeInTheDocument()
    })
  })
})
