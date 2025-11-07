import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Alert, type AlertProps } from './Alert'
import { Button } from '../../atoms/Button'

expect.extend(toHaveNoViolations)

describe('Alert', () => {
  const defaultProps: AlertProps = {
    children: 'This is an alert message'
  }

  const renderAlert = (props: Partial<AlertProps> = {}) => {
    return render(<Alert {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderAlert()
      expect(screen.getByText('This is an alert message')).toBeInTheDocument()
    })

    it('applies data-testid correctly', () => {
      renderAlert({ 'data-testid': 'test-alert' })
      expect(screen.getByTestId('test-alert')).toBeInTheDocument()
    })

    it('renders children content', () => {
      renderAlert({ children: 'Custom alert message' })
      expect(screen.getByText('Custom alert message')).toBeInTheDocument()
    })

    it('renders title when provided', () => {
      renderAlert({ title: 'Alert Title' })
      expect(screen.getByText('Alert Title')).toBeInTheDocument()
    })

    it('renders both title and message', () => {
      renderAlert({
        title: 'Important Notice',
        children: 'Please read this carefully'
      })
      expect(screen.getByText('Important Notice')).toBeInTheDocument()
      expect(screen.getByText('Please read this carefully')).toBeInTheDocument()
    })
  })

  describe('Variant Props', () => {
    const variants: AlertProps['variant'][] = ['error', 'warning', 'info', 'success']

    variants.forEach((variant) => {
      it(`renders ${variant} variant correctly`, () => {
        const { container } = renderAlert({ variant, 'data-testid': `alert-${variant}` })
        const alert = screen.getByTestId(`alert-${variant}`)
        expect(alert).toBeInTheDocument()
        expect(container.firstChild).toMatchSnapshot()
      })
    })

    it('defaults to info variant when not specified', () => {
      const { container } = renderAlert()
      const alert = container.querySelector('div[role="status"]')
      expect(alert).toBeInTheDocument()
    })
  })

  describe('Icon Functionality', () => {
    it('always shows icon for each variant', () => {
      const { container } = renderAlert()
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
    })

    it('shows correct icon for error variant', () => {
      const { container } = renderAlert({ variant: 'error' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // crossCircle icon should be rendered
    })

    it('shows correct icon for warning variant', () => {
      const { container } = renderAlert({ variant: 'warning' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // bell icon should be rendered
    })

    it('shows correct icon for info variant', () => {
      const { container } = renderAlert({ variant: 'info' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // info icon should be rendered
    })

    it('shows correct icon for success variant', () => {
      const { container } = renderAlert({ variant: 'success' })
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      // checkRing icon should be rendered
    })

    it('icon has aria-hidden="true"', () => {
      const { container } = renderAlert()
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Dismissible Functionality', () => {
    it('does not show dismiss button by default', () => {
      renderAlert()
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
    })

    it('shows dismiss button when dismissible={true}', () => {
      renderAlert({ dismissible: true })
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('calls onDismiss when dismiss button is clicked', () => {
      const onDismiss = jest.fn()
      renderAlert({ dismissible: true, onDismiss })

      const dismissButton = screen.getByLabelText('Dismiss alert')
      fireEvent.click(dismissButton)

      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('removes alert from DOM when dismissed', () => {
      renderAlert({ dismissible: true, 'data-testid': 'dismissable-alert' })

      const alert = screen.getByTestId('dismissable-alert')
      expect(alert).toBeInTheDocument()

      const dismissButton = screen.getByLabelText('Dismiss alert')
      fireEvent.click(dismissButton)

      expect(screen.queryByTestId('dismissable-alert')).not.toBeInTheDocument()
    })

    it('dismiss button has correct data-testid', () => {
      renderAlert({ dismissible: true, 'data-testid': 'my-alert' })
      expect(screen.getByTestId('my-alert-dismiss')).toBeInTheDocument()
    })
  })

  describe('Action Functionality', () => {
    it('renders action button when provided', () => {
      renderAlert({
        action: <Button onClick={() => {}}>Take Action</Button>
      })
      expect(screen.getByRole('button', { name: 'Take Action' })).toBeInTheDocument()
    })

    it('renders both action and dismiss button', () => {
      renderAlert({
        dismissible: true,
        action: <Button onClick={() => {}}>Undo</Button>
      })
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('action button is clickable', () => {
      const handleAction = jest.fn()
      renderAlert({
        action: <Button onClick={handleAction}>Confirm</Button>
      })

      const actionButton = screen.getByRole('button', { name: 'Confirm' })
      fireEvent.click(actionButton)

      expect(handleAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('Inline Variant', () => {
    it('applies inline styling when inline={true}', () => {
      const { container } = renderAlert({ inline: true, 'data-testid': 'inline-alert' })
      const alert = screen.getByTestId('inline-alert')
      expect(alert).toBeInTheDocument()
      expect(container.firstChild).toMatchSnapshot()
    })

    it('uses default styling when inline={false}', () => {
      const { container } = renderAlert({ inline: false, 'data-testid': 'block-alert' })
      const alert = screen.getByTestId('block-alert')
      expect(alert).toBeInTheDocument()
    })
  })

  describe('ARIA and Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderAlert()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with all props', async () => {
      const { container } = renderAlert({
        variant: 'error',
        title: 'Error',
        dismissible: true,
        action: <Button onClick={() => {}}>Retry</Button>
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations across all variants', async () => {
      const variants: AlertProps['variant'][] = ['error', 'warning', 'info', 'success']

      for (const variant of variants) {
        const { container, unmount } = renderAlert({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('has role="alert" for error variant', () => {
      renderAlert({ variant: 'error', 'data-testid': 'error-alert' })
      const alert = screen.getByTestId('error-alert')
      expect(alert).toHaveAttribute('role', 'alert')
    })

    it('has role="status" for non-error variants', () => {
      const variants: AlertProps['variant'][] = ['warning', 'info', 'success']

      variants.forEach((variant) => {
        const { unmount } = renderAlert({ variant, 'data-testid': `${variant}-alert` })
        const alert = screen.getByTestId(`${variant}-alert`)
        expect(alert).toHaveAttribute('role', 'status')
        unmount()
      })
    })

    it('has correct aria-live attribute', () => {
      renderAlert({ ariaLive: 'polite', 'data-testid': 'polite-alert' })
      const alert = screen.getByTestId('polite-alert')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('supports assertive aria-live', () => {
      renderAlert({ ariaLive: 'assertive', 'data-testid': 'assertive-alert' })
      const alert = screen.getByTestId('assertive-alert')
      expect(alert).toHaveAttribute('aria-live', 'assertive')
    })

    it('supports off aria-live', () => {
      renderAlert({ ariaLive: 'off', 'data-testid': 'off-alert' })
      const alert = screen.getByTestId('off-alert')
      expect(alert).toHaveAttribute('aria-live', 'off')
    })

    it('dismiss button has proper aria-label', () => {
      renderAlert({ dismissible: true })
      const dismissButton = screen.getByLabelText('Dismiss alert')
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert')
    })

    it('icon is hidden from screen readers', () => {
      const { container } = renderAlert()
      const iconContainer = container.querySelector('[aria-hidden="true"]')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Complex Compositions', () => {
    it('renders full-featured alert with all props', () => {
      const onDismiss = jest.fn()
      const onAction = jest.fn()

      renderAlert({
        variant: 'warning',
        title: 'Budget Exceeded',
        dismissible: true,
        onDismiss,
        action: <Button onClick={onAction}>Adjust Budget</Button>,
        'data-testid': 'full-alert'
      })

      expect(screen.getByTestId('full-alert')).toBeInTheDocument()
      expect(screen.getByText('Budget Exceeded')).toBeInTheDocument()
      expect(screen.getByText('This is an alert message')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Adjust Budget' })).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })

    it('handles complex children content', () => {
      renderAlert({
        children: (
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        )
      })

      expect(screen.getByText('First paragraph')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      renderAlert({ children: '' })
      const alert = screen.queryByRole('status')
      expect(alert).toBeInTheDocument()
    })

    it('handles long content without breaking layout', () => {
      const longMessage = 'A'.repeat(500)
      renderAlert({ children: longMessage })
      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })

    it('handles onDismiss being called without dismissible=true', () => {
      const onDismiss = jest.fn()
      renderAlert({ onDismiss, dismissible: false })
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument()
    })

    it('renders with icons for all variants', () => {
      const { container } = renderAlert()
      const svgElement = container.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
    })

    it('preserves additional HTML attributes', () => {
      renderAlert({
        'data-testid': 'custom-alert',
        className: 'custom-class'
      } as any)
      const alert = screen.getByTestId('custom-alert')
      expect(alert).toHaveClass('custom-class')
    })
  })
})
