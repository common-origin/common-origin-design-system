import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ArtCard } from './ArtCard'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

describe('ArtCard', () => {
  const baseProps = {
    title: 'Test Art',
    excerpt: 'A test excerpt',
    tag: 'art' as const,
    artist: 'Test Artist',
    labels: ['Label1', 'Label2'],
    coverImage: '/test.jpg',
  }

  it('renders with required props', () => {
    render(<ArtCard {...baseProps} />)
    expect(screen.getByText('Test Art')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
    expect(screen.getByText('Label1')).toBeInTheDocument()
    expect(screen.getByText('Label2')).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    render(<ArtCard {...baseProps} />)
    expect(screen.getByAltText('Cover Image for Test Art')).toBeInTheDocument()
  })

  it('handles image click callback', () => {
    const handleImageClick = jest.fn()
    render(<ArtCard {...baseProps} onImageClick={handleImageClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleImageClick).toHaveBeenCalledTimes(1)
  })

  it('renders image as link when href provided', () => {
    render(<ArtCard {...baseProps} imageHref="/gallery/test-art" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/gallery/test-art')
  })

  it('returns null if tag is not art', () => {
    const { container } = render(<ArtCard {...baseProps} tag="not-art" />)
    expect(container.firstChild).toBeNull()
  })

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with default props', async () => {
      const { container } = render(<ArtCard {...baseProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with image link', async () => {
      const { container } = render(<ArtCard {...baseProps} imageHref="/gallery/test-art" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with all props', async () => {
      const { container } = render(
        <ArtCard 
          {...baseProps}
          imageHref="/gallery/test-art"
          data-testid="art-card-accessibility-test"
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})