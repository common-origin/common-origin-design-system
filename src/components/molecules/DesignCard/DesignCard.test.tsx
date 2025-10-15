import React from 'react'
import { render, screen } from '@testing-library/react'
import { DesignCard } from './DesignCard'

const mockProps = {
  title: 'Test Design',
  excerpt: 'This is a test excerpt.',
  labels: ['UI', 'Accessibility'],
  tag: 'design',
  coverImage: '/test-image.jpg',
  date: '2025-07-24',
  slug: 'test-design'
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
    expect(screen.getByAltText('Test Design')).toBeInTheDocument()
  })

  it('renders the read more button', () => {
    render(<DesignCard {...mockProps} />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('returns null if tag is not "design"', () => {
    render(<DesignCard {...mockProps} tag="other" />)
    expect(screen.queryByText('Test Design')).not.toBeInTheDocument()
  })
})
