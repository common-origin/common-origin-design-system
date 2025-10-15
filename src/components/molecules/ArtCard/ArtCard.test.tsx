import React from 'react'
import { render, screen } from '@testing-library/react'
import { ArtCard } from './ArtCard'

describe('ArtCard', () => {
  const baseProps = {
    title: 'Test Art',
    excerpt: 'A test excerpt',
    tag: 'art',
    artist: 'Test Artist',
    labels: ['Label1', 'Label2'],
    coverImage: '/test.jpg',
    slug: 'test-art',
  }

  it('renders with required props', () => {
    render(<ArtCard {...baseProps} />)
    expect(screen.getByText('Test Art')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
    expect(screen.getByText('Label1')).toBeInTheDocument()
    expect(screen.getByText('Label2')).toBeInTheDocument()
  })

  it('returns null if tag is not art', () => {
    const { container } = render(<ArtCard {...baseProps} tag="not-art" />)
    expect(container.firstChild).toBeNull()
  })
})
