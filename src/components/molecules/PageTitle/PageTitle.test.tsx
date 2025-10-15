import React from 'react'
import { render, screen } from '@testing-library/react'
import { PageTitle } from './PageTitle'

describe('PageTitle', () => {
  it('renders the title as h1', () => {
    render(<PageTitle title="Test Title" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title')
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
})
