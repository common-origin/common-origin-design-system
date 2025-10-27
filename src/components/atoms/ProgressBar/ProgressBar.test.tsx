import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  describe('Horizontal Variant', () => {
    it('renders horizontal progress bar', () => {
      render(<ProgressBar value={50} data-testid="progress" />)
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toBeInTheDocument()
    })

    it('displays correct ARIA attributes', () => {
      render(<ProgressBar value={75} data-testid="progress" />)
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toHaveAttribute('role', 'progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '75')
      expect(progressBar).toHaveAttribute('aria-valuemin', '0')
      expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    })

    it('clamps value to 0-100 range', () => {
      const { rerender } = render(<ProgressBar value={150} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('aria-valuenow', '100')

      rerender(<ProgressBar value={-10} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('aria-valuenow', '0')
    })

    it('renders with default color variant', () => {
      render(<ProgressBar value={50} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('renders with success color variant', () => {
      render(<ProgressBar value={50} color="success" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('renders with error color variant', () => {
      render(<ProgressBar value={50} color="error" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies small size', () => {
      render(<ProgressBar value={50} height="sm" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies medium size (default)', () => {
      render(<ProgressBar value={50} height="md" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies large size', () => {
      render(<ProgressBar value={50} height="lg" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies extra large size', () => {
      render(<ProgressBar value={50} height="xl" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })
  })

  describe('Vertical Variant', () => {
    it('renders vertical progress bar', () => {
      render(<ProgressBar value={50} variant="vertical" data-testid="progress" />)
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toBeInTheDocument()
    })

    it('displays correct ARIA attributes for vertical', () => {
      render(<ProgressBar value={60} variant="vertical" data-testid="progress" />)
      const progressBar = screen.getByTestId('progress')
      expect(progressBar).toHaveAttribute('role', 'progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    })

    it('applies small width for vertical', () => {
      render(<ProgressBar value={50} variant="vertical" width="sm" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies medium width for vertical (default)', () => {
      render(<ProgressBar value={50} variant="vertical" width="md" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies large width for vertical', () => {
      render(<ProgressBar value={50} variant="vertical" width="lg" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('applies extra large width for vertical', () => {
      render(<ProgressBar value={50} variant="vertical" width="xl" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('renders vertical with success color', () => {
      render(<ProgressBar value={80} variant="vertical" color="success" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('renders vertical with error color', () => {
      render(<ProgressBar value={90} variant="vertical" color="error" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles 0% progress', () => {
      render(<ProgressBar value={0} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('aria-valuenow', '0')
    })

    it('handles 100% progress', () => {
      render(<ProgressBar value={100} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('aria-valuenow', '100')
    })

    it('handles decimal values', () => {
      render(<ProgressBar value={33.33} data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('aria-valuenow', '33.33')
    })
  })
})
