import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { EmptyState, EmptyStateProps } from './EmptyState'

expect.extend(toHaveNoViolations)

const defaultProps: EmptyStateProps = {
  title: 'No results found',
  description: 'Try adjusting your search or filters.'
}

const renderComponent = (props: Partial<EmptyStateProps> = {}) => {
  return render(<EmptyState {...defaultProps} {...props} />)
}

describe('EmptyState', () => {
  describe('Basic Rendering', () => {
    it('renders title and description', () => {
      renderComponent()
      expect(screen.getByText('No results found')).toBeInTheDocument()
      expect(screen.getByText('Try adjusting your search or filters.')).toBeInTheDocument()
    })

    it('renders with default illustration', () => {
      const { container } = renderComponent()
      expect(container.querySelector('[role="status"]')).toBeInTheDocument()
    })

    it('renders without actions', () => {
      renderComponent()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Illustrations', () => {
    it('renders search illustration', () => {
      renderComponent({ illustration: 'search' })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders transactions illustration', () => {
      renderComponent({ illustration: 'transactions' })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders notifications illustration', () => {
      renderComponent({ illustration: 'notifications' })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders error illustration', () => {
      renderComponent({ illustration: 'error' })
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('renders custom illustration', () => {
      renderComponent({ 
        customIllustration: <div data-testid="custom-svg">Custom</div> 
      })
      expect(screen.getByTestId('custom-svg')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    const variants: Array<'default' | 'error' | 'success'> = ['default', 'error', 'success']
    
    variants.forEach(variant => {
      it(`renders ${variant} variant`, () => {
        renderComponent({ variant })
        expect(screen.getByText('No results found')).toBeInTheDocument()
      })
    })
  })

  describe('Size Variants', () => {
    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large']
    
    sizes.forEach(size => {
      it(`renders ${size} size`, () => {
        renderComponent({ size })
        expect(screen.getByText('No results found')).toBeInTheDocument()
      })
    })
  })

  describe('Actions', () => {
    it('renders primary action button', () => {
      const handleClick = jest.fn()
      renderComponent({
        action: {
          label: 'Clear Filters',
          onClick: handleClick
        }
      })
      
      const button = screen.getByText('Clear Filters')
      expect(button).toBeInTheDocument()
    })

    it('handles primary action click', () => {
      const handleClick = jest.fn()
      renderComponent({
        action: {
          label: 'Clear Filters',
          onClick: handleClick
        }
      })
      
      fireEvent.click(screen.getByText('Clear Filters'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders secondary action button', () => {
      const handleClick = jest.fn()
      renderComponent({
        secondaryAction: {
          label: 'View All',
          onClick: handleClick
        }
      })
      
      expect(screen.getByText('View All')).toBeInTheDocument()
    })

    it('handles secondary action click', () => {
      const handleClick = jest.fn()
      renderComponent({
        secondaryAction: {
          label: 'View All',
          onClick: handleClick
        }
      })
      
      fireEvent.click(screen.getByText('View All'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('renders both primary and secondary actions', () => {
      renderComponent({
        action: {
          label: 'Primary',
          onClick: jest.fn()
        },
        secondaryAction: {
          label: 'Secondary',
          onClick: jest.fn()
        }
      })
      
      expect(screen.getByText('Primary')).toBeInTheDocument()
      expect(screen.getByText('Secondary')).toBeInTheDocument()
    })

    it('renders action with icon', () => {
      renderComponent({
        action: {
          label: 'Add Item',
          onClick: jest.fn(),
          icon: 'add'
        }
      })
      
      expect(screen.getByText('Add Item')).toBeInTheDocument()
    })

    it('renders action with custom variant', () => {
      renderComponent({
        action: {
          label: 'Retry',
          onClick: jest.fn(),
          variant: 'secondary'
        }
      })
      
      expect(screen.getByText('Retry')).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('accepts data-testid prop', () => {
      renderComponent({ 'data-testid': 'test-empty-state' })
      expect(screen.getByTestId('test-empty-state')).toBeInTheDocument()
    })

    it('passes data-testid to action buttons', () => {
      renderComponent({
        'data-testid': 'test-empty-state',
        action: {
          label: 'Primary',
          onClick: jest.fn()
        },
        secondaryAction: {
          label: 'Secondary',
          onClick: jest.fn()
        }
      })
      
      expect(screen.getByTestId('test-empty-state-primary-action')).toBeInTheDocument()
      expect(screen.getByTestId('test-empty-state-secondary-action')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations', async () => {
      const { container } = renderComponent()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with actions', async () => {
      const { container } = renderComponent({
        action: {
          label: 'Action',
          onClick: jest.fn()
        }
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with all variants', async () => {
      const variants: Array<'default' | 'error' | 'success'> = ['default', 'error', 'success']
      for (const variant of variants) {
        const { container, unmount } = renderComponent({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('has role="status" for screen readers', () => {
      renderComponent()
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('provides aria-label with title', () => {
      renderComponent({ title: 'No transactions yet' })
      expect(screen.getByLabelText('Empty state: No transactions yet')).toBeInTheDocument()
    })

    it('marks illustration as decorative with aria-hidden', () => {
      const { container } = renderComponent()
      const illustration = container.querySelector('[aria-hidden="true"]')
      expect(illustration).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('renders with long title', () => {
      renderComponent({
        title: 'This is a very long title that might wrap to multiple lines in the interface'
      })
      expect(screen.getByText(/This is a very long title/)).toBeInTheDocument()
    })

    it('renders with long description', () => {
      const longDescription = 'This is a very long description that provides extensive context and guidance to the user about what they can do next and why they are seeing this empty state.'
      renderComponent({ description: longDescription })
      expect(screen.getByText(longDescription)).toBeInTheDocument()
    })

    it('renders without any illustration', () => {
      renderComponent({ illustration: 'custom', customIllustration: undefined })
      expect(screen.getByText('No results found')).toBeInTheDocument()
    })
  })
})
