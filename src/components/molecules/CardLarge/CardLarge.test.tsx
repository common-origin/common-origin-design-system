import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardLarge } from './CardLarge'

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations)

describe('CardLarge', () => {
  const baseProps = {
    title: 'Test Card',
    excerpt: 'A test excerpt',
    subtitle: 'Test Subtitle',
    labels: ['Label1', 'Label2'],
    picture: '/test.jpg',
  }

  it('renders with required props', () => {
    render(<CardLarge {...baseProps} />)
    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Label1')).toBeInTheDocument()
    expect(screen.getByText('Label2')).toBeInTheDocument()
  })

  it('renders the cover image', () => {
    render(<CardLarge {...baseProps} />)
  expect(screen.getByAltText('Cover Image for Test Card')).toBeInTheDocument()
  })

  it('handles image click callback', () => {
    const handleImageClick = jest.fn()
  render(<CardLarge {...baseProps} onImageClick={handleImageClick} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleImageClick).toHaveBeenCalledTimes(1)
  })

  it('renders image as link when href provided', () => {
  render(<CardLarge {...baseProps} imageHref="/gallery/test-card" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/gallery/test-card')
  })

  // No tag prop or conditional rendering anymore

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with default props', async () => {
  const { container } = render(<CardLarge {...baseProps} />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with image link', async () => {
  const { container } = render(<CardLarge {...baseProps} imageHref="/gallery/test-card" />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with all props', async () => {
      const { container } = render(
        <CardLarge 
          {...baseProps}
          imageHref="/gallery/test-card"
          data-testid="cardlarge-accessibility-test"
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
