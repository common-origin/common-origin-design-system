import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Alert, Props as AlertProps } from './Alert'

describe('Alert', () => {
  const renderAlert = (props: Partial<AlertProps> = {}) => {
    return render(<Alert {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderAlert({ 'data-testid': 'alert' })
      expect(screen.getByTestId('alert')).toBeInTheDocument()
    })

    it('accepts custom data-testid', () => {
      renderAlert({ 'data-testid': 'custom-alert' })
      expect(screen.getByTestId('custom-alert')).toBeInTheDocument()
    })
  })

  describe('Alert Variants', () => {
    it('renders preview mode correctly', () => {
      renderAlert({ preview: true, 'data-testid': 'preview-alert' })
      
      const alert = screen.getByTestId('preview-alert')
      expect(alert).toBeInTheDocument()
      expect(screen.getByText(/This page is a preview/)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Exit preview mode/ })).toBeInTheDocument()
    })

    it('renders default mode correctly', () => {
      renderAlert({ 'data-testid': 'default-alert' })
      
      const alert = screen.getByTestId('default-alert')
      expect(alert).toBeInTheDocument()
      expect(screen.getByText(/The source code for this blog/)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /View source code on GitHub/ })).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations in default state', async () => {
      const { container } = renderAlert({ 'data-testid': 'default-alert' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations in preview state', async () => {
      const { container } = renderAlert({ preview: true, 'data-testid': 'preview-alert' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('contains accessible links with proper labels', () => {
      renderAlert({ preview: true })
      const link = screen.getByRole('link', { name: /Exit preview mode/ })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href')
    })

    it('has proper link attributes for external links', () => {
      renderAlert({ preview: false })
      const link = screen.getByRole('link', { name: /View source code on GitHub/ })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
