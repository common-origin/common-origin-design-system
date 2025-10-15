import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReleaseCard } from '../ReleaseCard'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return ({ alt, src, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} {...props} />
  }
})

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock DateFormatter component
jest.mock('../../../components/dateFormatter', () => ({
  DateFormatter: ({ dateString }: { dateString: string }) => (
    <span data-testid="date-formatter">{dateString}</span>
  )
}))

describe('ReleaseCard Component', () => {
  const defaultProps = {
    title: 'Test Release',
    artist: 'Test Artist',
    coverImage: '/test-cover.jpg',
    date: '2023-12-01',
    slug: 'test-release'
  }

  const renderReleaseCard = (props: any = {}) => {
    return render(<ReleaseCard {...defaultProps} {...props} />)
  }

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderReleaseCard()
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('renders with required props', () => {
      renderReleaseCard()
      
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByText('Test Release')).toBeInTheDocument()
      expect(screen.getByText('Test Artist')).toBeInTheDocument()
      expect(screen.getByTestId('date-formatter')).toBeInTheDocument()
    })

    it('renders correct link href', () => {
      renderReleaseCard()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/releases/test-release')
    })

    it('renders correct aria-label', () => {
      renderReleaseCard()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', 'Test Release')
    })
  })

  describe('Image Rendering', () => {
    it('renders image with correct attributes', () => {
      renderReleaseCard()
      const image = screen.getByRole('img')
      
      expect(image).toHaveAttribute('alt', 'Test Release')
      expect(image).toHaveAttribute('src', '/test-cover.jpg')
      expect(image).toHaveAttribute('width', '300')
      expect(image).toHaveAttribute('height', '300')
    })

    it('renders image with responsive sizes attribute', () => {
      renderReleaseCard()
      const image = screen.getByRole('img')
      
      expect(image).toHaveAttribute('sizes', '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16.66vw, 14.28vw')
    })
  })

  describe('Content Rendering', () => {
    it('displays title correctly', () => {
      renderReleaseCard({ title: 'Amazing Album' })
      expect(screen.getByText('Amazing Album')).toBeInTheDocument()
    })

    it('displays artist correctly', () => {
      renderReleaseCard({ artist: 'Famous Artist' })
      expect(screen.getByText('Famous Artist')).toBeInTheDocument()
    })

    it('passes date to DateFormatter', () => {
      renderReleaseCard({ date: '2024-01-15' })
      const dateFormatter = screen.getByTestId('date-formatter')
      expect(dateFormatter).toHaveTextContent('2024-01-15')
    })
  })

  describe('Conditional Rendering', () => {
    it('returns null when coverImage is missing', () => {
      const { container } = renderReleaseCard({ coverImage: undefined })
      expect(container.firstChild).toBeNull()
    })

    it('returns null when date is missing', () => {
      const { container } = renderReleaseCard({ date: undefined })
      expect(container.firstChild).toBeNull()
    })

    it('returns null when coverImage is empty string', () => {
      const { container } = renderReleaseCard({ coverImage: '' })
      expect(container.firstChild).toBeNull()
    })

    it('returns null when date is empty string', () => {
      const { container } = renderReleaseCard({ date: '' })
      expect(container.firstChild).toBeNull()
    })

    it('renders when both coverImage and date are provided', () => {
      renderReleaseCard()
      expect(screen.getByRole('link')).toBeInTheDocument()
    })
  })

  describe('Optional Props', () => {
    it('renders without optional props', () => {
      const minimalProps = {
        title: 'Minimal Release',
        coverImage: '/minimal.jpg',
        date: '2023-01-01',
        slug: 'minimal'
      }
      
      render(<ReleaseCard {...minimalProps} />)
      expect(screen.getByText('Minimal Release')).toBeInTheDocument()
    })

    it('handles missing artist gracefully', () => {
      renderReleaseCard({ artist: undefined })
      expect(screen.getByText('Test Release')).toBeInTheDocument()
      // Artist should render as empty or undefined, but component should still work
    })
  })

  describe('Accessibility', () => {
    it('provides accessible link with aria-label', () => {
      renderReleaseCard()
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', 'Test Release')
    })

    it('provides alt text for image', () => {
      renderReleaseCard()
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('alt', 'Test Release')
    })

    it('maintains semantic link structure', () => {
      renderReleaseCard()
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      
      // Image should be within the link
      const image = screen.getByRole('img')
      expect(link).toContainElement(image)
    })
  })
})
