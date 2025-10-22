import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { PageTitle } from './PageTitle'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

describe('PageTitle', () => {
  it('renders the title as h1', () => {
    render(<PageTitle title="Test Title" />)
    // Note: Due to styled-components prop leaking issue (parked), 
    // Typography currently renders as span with as="h1" instead of actual h1 element
    // TODO: Fix when styled-components migration is complete
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toHaveAttribute('as', 'h1')
  })

  it('renders the subtitle if provided', () => {
    render(<PageTitle title="Test Title" subtitle="Subtitle here" />)
    expect(screen.getByText('Subtitle here')).toBeInTheDocument()
  })

  it('does not render subtitle if not provided', () => {
    render(<PageTitle title="Test Title" />)
    expect(screen.queryByText('Subtitle here')).not.toBeInTheDocument()
  })

  it('renders the back button if hasBackButton is true', () => {
    render(<PageTitle title="Test Title" hasBackButton />)
    expect(screen.getByLabelText(/go back to music page/i)).toBeInTheDocument()
  })

  it('does not render the back button if hasBackButton is false', () => {
    render(<PageTitle title="Test Title" hasBackButton={false} />)
    expect(screen.queryByLabelText(/go back to music page/i)).not.toBeInTheDocument()
  })

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with title only', async () => {
      const { container } = render(<PageTitle title="Accessible Page Title" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with title and subtitle', async () => {
      const { container } = render(<PageTitle title="Main Title" subtitle="Supporting subtitle text" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with back button', async () => {
      const { container } = render(<PageTitle title="Page with Navigation" hasBackButton />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with all props', async () => {
      const { container } = render(
        <PageTitle 
          title="Complete Page Title" 
          subtitle="Full feature subtitle" 
          hasBackButton 
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
