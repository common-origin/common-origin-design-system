import React from 'react'
import { render, screen } from '@testing-library/react'
import { DesignCard } from './DesignCard'

const mockProps = {
  title: 'Test Design',
  excerpt: 'This is a test excerpt.',
  labels: ['UI', 'Accessibility'],
  tag: 'design',
  coverImage: '/test-image.jpg',
  date: '2025-07-24'
}

describe('DesignCard', () => {
  it('renders title, excerpt, and labels', () => {
    render(<DesignCard {...mockProps} />)
    expect(screen.getByText('Test Design')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt.')).toBeInTheDocument()
    expect(screen.getByText('UI')).toBeInTheDocument()
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    render(<DesignCard {...mockProps} />)
    expect(screen.getByAltText('Cover Image for Test Design')).toBeInTheDocument()
  })

  it('does not render read more button by default', () => {
    render(<DesignCard {...mockProps} />)
    expect(screen.queryByRole('button', { name: /read more/i })).not.toBeInTheDocument()
  })

  it('renders read more button when onReadMore is provided', () => {
    const handleReadMore = jest.fn()
    render(<DesignCard {...mockProps} onReadMore={handleReadMore} />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('renders read more link when readMoreHref is provided', () => {
    render(<DesignCard {...mockProps} readMoreHref="/test-link" />)
    expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument()
  })

  it('renders custom read more text', () => {
    render(<DesignCard {...mockProps} onReadMore={jest.fn()} readMoreText="Learn More" />)
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  it('returns null if tag is not "design"', () => {
    render(<DesignCard {...mockProps} tag="other" />)
    expect(screen.queryByText('Test Design')).not.toBeInTheDocument()
  })
})
