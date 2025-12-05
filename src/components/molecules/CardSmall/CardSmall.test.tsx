import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { CardSmall } from '.'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock Link component for testing linkComponent prop
const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>

describe('CardSmall Component', () => {
  const defaultProps = {
    title: 'Test Release',
  subtitle: 'Test Subtitle',
  picture: '/test-cover.jpg',
  meta: 'Test Meta',
  href: '/test-link'
  }

  const renderCardSmall = (props: any = {}) => {
    return render(<CardSmall {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
  renderCardSmall()
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('renders with required props', () => {
      renderCardSmall()
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByText('Test Release')).toBeInTheDocument()
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
      expect(screen.getByText('Test Meta')).toBeInTheDocument()
    })

    it('renders correct link href', () => {
    renderCardSmall()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/test-link')
    })

    it('renders correct aria-label', () => {
  renderCardSmall()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', 'Test Release')
    })
  })

  describe('Image Rendering', () => {
    it('renders image with correct attributes', () => {
  renderCardSmall()
      const image = screen.getByRole('img')
      
      expect(image).toHaveAttribute('alt', 'Test Release')
      expect(image).toHaveAttribute('src', '/test-cover.jpg')
      expect(image).toHaveAttribute('width', '300')
      expect(image).toHaveAttribute('height', '300')
    })

    // Responsive sizes attribute is not supported by Picture component
  })

  describe('Content Rendering', () => {
    it('displays title correctly', () => {
  renderCardSmall({ title: 'Amazing Album' })
      expect(screen.getByText('Amazing Album')).toBeInTheDocument()
    })

    it('displays artist correctly', () => {
  renderCardSmall({ subtitle: 'Famous Artist' })
      expect(screen.getByText('Famous Artist')).toBeInTheDocument()
    })

    it('passes date to DateFormatter', () => {
      renderCardSmall({ meta: '2024-01-15' })
      expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    })
  })

  describe('Conditional Rendering', () => {
    it('returns null when coverImage is missing', () => {
        const { container } = renderCardSmall({ picture: undefined })
        expect(container.firstChild).toBeNull()
    })

      it('returns null when picture is empty string', () => {
        const { container } = renderCardSmall({ picture: '' })
        expect(container.firstChild).toBeNull()
      })
      it('returns null when meta is missing', () => {
        const { container } = renderCardSmall({ meta: undefined })
        expect(container.firstChild).toBeNull()
      })
      it('returns null when meta is empty string', () => {
        const { container } = renderCardSmall({ meta: '' })
        expect(container.firstChild).toBeNull()
      })

    it('renders when both coverImage and date are provided', () => {
  renderCardSmall()
      expect(screen.getByRole('link')).toBeInTheDocument()
    })
  })

  describe('Optional Props', () => {
    it('renders without optional props', () => {
        const minimalProps = {
          title: 'Minimal Release',
          picture: '/minimal.jpg',
          meta: '2023-01-01',
          href: '/minimal'
        }
        render(<CardSmall {...minimalProps} />)
        expect(screen.getByText('Minimal Release')).toBeInTheDocument()
    })

    it('handles missing artist gracefully', () => {
  renderCardSmall({ subtitle: undefined })
      expect(screen.getByText('Test Release')).toBeInTheDocument()
      // Artist should render as empty or undefined, but component should still work
    })
  })

  describe('Accessibility', () => {
    it('provides accessible link with aria-label', () => {
  renderCardSmall()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', 'Test Release')
    })

    it('provides alt text for image', () => {
  renderCardSmall()
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Test Release')
    })

    it('maintains semantic link structure', () => {
  renderCardSmall()
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      
      // Image should be within the link
      const image = screen.getByRole('img')
      expect(link).toContainElement(image)
    })
  })

  describe('Accessibility Testing', () => {
    it('should not have accessibility violations with default props', async () => {
  const { container } = renderCardSmall()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with custom title', async () => {
  const { container } = renderCardSmall({
        title: 'Custom Release Title',
        url: 'https://example.com/custom'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with long title', async () => {
  const { container } = renderCardSmall({
        title: 'This is a very long release title that might wrap to multiple lines and should still be accessible',
        url: 'https://example.com/long-title'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with different image dimensions', async () => {
        const { container } = render(<CardSmall
          title="Different Size Release"
          picture="https://example.com/different-image.jpg"
          meta="2023-01-01"
          href="/different-size"
        />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
  })
})
