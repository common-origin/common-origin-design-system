import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { FeatureBlock } from './FeatureBlock'

expect.extend(toHaveNoViolations)

const mockProps = {
  title: 'Test Feature',
  excerpt: 'This is a test excerpt.',
  labels: ['UI', 'Accessibility'],
  coverImage: '/test-image.jpg',
  date: '2025-07-24'
}

describe('FeatureBlock', () => {
  it('renders title, excerpt, and labels', () => {
    render(<FeatureBlock {...mockProps} />)
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt.')).toBeInTheDocument()
    expect(screen.getByText('UI')).toBeInTheDocument()
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    render(<FeatureBlock {...mockProps} />)
    expect(screen.getByAltText('Test Feature')).toBeInTheDocument()
  })

  it('does not render read more button by default', () => {
    render(<FeatureBlock {...mockProps} />)
    expect(screen.queryByRole('button', { name: /read more/i })).not.toBeInTheDocument()
  })

  it('renders read more button when onReadMore is provided', () => {
    const handleReadMore = jest.fn()
    render(<FeatureBlock {...mockProps} onReadMore={handleReadMore} />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('renders read more link when readMoreHref is provided', () => {
    render(<FeatureBlock {...mockProps} readMoreHref="/test-link" />)
    expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument()
  })

  it('renders custom read more text', () => {
    render(<FeatureBlock {...mockProps} onReadMore={jest.fn()} readMoreText="Learn More" />)
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument()
  })

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with default props', async () => {
      const { container } = render(<FeatureBlock {...mockProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with read more callback', async () => {
      const { container } = render(<FeatureBlock {...mockProps} onReadMore={jest.fn()} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with read more link', async () => {
      const { container } = render(<FeatureBlock {...mockProps} readMoreHref="/feature/test" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with custom read more text', async () => {
      const { container } = render(<FeatureBlock {...mockProps} onReadMore={jest.fn()} readMoreText="View Details" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
