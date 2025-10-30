import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Picture } from './Picture'

type PictureProps = {
  title: string
  src: string
  onClick?: () => void
  href?: string
  width?: number
  height?: number
  'data-testid'?: string
}

describe('Picture', () => {
  const defaultProps: Omit<PictureProps, 'title' | 'src'> = {}
  
  const renderPicture = (props: Partial<PictureProps> = {}) => {
    const finalProps = { 
      title: 'Test Image Title',
      src: '/test-image.jpg',
      ...defaultProps,
      ...props 
    }
    return render(<Picture {...finalProps} />)
  }

  describe('Basic Rendering', () => {
    it('renders image with correct alt text', () => {
      renderPicture({ title: 'My Test Image' })
  expect(screen.getByAltText('My Test Image')).toBeInTheDocument()
    })

    it('renders with default props when minimal props provided', () => {
      renderPicture()
  expect(screen.getByAltText('Test Image Title')).toBeInTheDocument()
    })

    it('applies custom data-testid', () => {
      renderPicture({ 'data-testid': 'custom-picture' })
      const wrapper = screen.getByTestId('custom-picture')
      expect(wrapper).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderPicture({ 'data-testid': 'test-picture' })
      expect(screen.getByTestId('test-picture')).toBeInTheDocument()
    })
  })

  describe('Image Properties', () => {
    it('uses provided src attribute', () => {
      renderPicture({ src: '/custom-image.png' })
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '/custom-image.png')
    })

    it('uses default width and height when not specified', () => {
      renderPicture()
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '1300')
      expect(image).toHaveAttribute('height', '630')
    })

    it('uses custom width and height when provided', () => {
      renderPicture({ width: 800, height: 400 })
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '800')
      expect(image).toHaveAttribute('height', '400')
    })
  })

  describe('Link Behavior', () => {
    it('renders as link when href is provided', () => {
      renderPicture({ href: '/gallery/my-image' })
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/gallery/my-image')
      expect(link).toHaveAttribute('aria-label', 'Read more about Test Image Title')
    })

    it('renders as button when onClick is provided', () => {
      const handleClick = jest.fn()
      renderPicture({ onClick: handleClick })
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Read more about Test Image Title')
      
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not render interactive element when neither href nor onClick provided', () => {
      renderPicture()
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('link has proper accessibility label with custom title', () => {
      renderPicture({ 
        title: 'Amazing Article', 
        href: '/articles/amazing-article' 
      })
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', 'Read more about Amazing Article')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderPicture()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with link variant', async () => {
      const { container } = renderPicture({ href: '/test-link' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with button variant', async () => {
      const { container } = renderPicture({ onClick: jest.fn() })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with custom dimensions', async () => {
      const { container } = renderPicture({ width: 600, height: 300 })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('image has proper alt text for screen readers', () => {
      renderPicture({ title: 'Accessible Image' })
      const image = screen.getByRole('img')
  expect(image).toHaveAttribute('alt', 'Accessible Image')
    })

    it('maintains proper focus order with link', () => {
      renderPicture({ href: '/focus-test' })
      const link = screen.getByRole('link')
      expect(link).toBeVisible()
      expect(link).toHaveAttribute('href', '/focus-test')
    })

    it('maintains proper focus order with button', () => {
      const handleClick = jest.fn()
      renderPicture({ onClick: handleClick })
      const button = screen.getByRole('button')
      expect(button).toBeVisible()
    })
  })

  describe('TypeScript Props', () => {
    it('accepts all required props', () => {
      renderPicture({ 
        title: 'TypeScript Test',
        src: '/typescript.jpg'
      })
  expect(screen.getByAltText('TypeScript Test')).toBeInTheDocument()
    })

    it('handles optional href prop', () => {
      renderPicture({ href: undefined })
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('handles optional onClick prop', () => {
      renderPicture({ onClick: undefined })
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('handles optional dimensions props', () => {
      renderPicture({ width: undefined, height: undefined })
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '1300')
      expect(image).toHaveAttribute('height', '630')
    })
  })

  describe('Integration', () => {
    it('works with different file extensions', () => {
      const extensions = ['.jpg', '.png', '.webp', '.svg']
      extensions.forEach(ext => {
        const { unmount } = renderPicture({ src: `/image${ext}` })
        expect(screen.getByRole('img')).toHaveAttribute('src', `/image${ext}`)
        unmount()
      })
    })

    it('handles long titles gracefully', () => {
      const longTitle = 'This is a very long title that might wrap multiple lines and should still work correctly'
      renderPicture({ title: longTitle })
  expect(screen.getByAltText(longTitle)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles special characters in title', () => {
      const specialTitle = 'Title with "quotes" & <tags> and symbols!'
      renderPicture({ title: specialTitle })
  expect(screen.getByAltText(specialTitle)).toBeInTheDocument()
    })

    it('handles empty string href gracefully', () => {
      renderPicture({ href: '' })
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    it('prioritizes href over onClick when both provided', () => {
      const handleClick = jest.fn()
      renderPicture({ href: '/test-link', onClick: handleClick })
      expect(screen.getByRole('link')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('handles zero dimensions', () => {
      renderPicture({ width: 0, height: 0 })
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '0')
      expect(image).toHaveAttribute('height', '0')
    })

    it('handles very large dimensions', () => {
      renderPicture({ width: 9999, height: 9999 })
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('width', '9999')
      expect(image).toHaveAttribute('height', '9999')
    })

    it('maintains proper HTML structure with nested elements', () => {
      renderPicture({ 
        title: 'Complex Title',
        href: '/complex-link',
        'data-testid': 'complex-test'
      })
      const wrapper = screen.getByTestId('complex-test')
      const link = screen.getByRole('link')
      const image = screen.getByRole('img')
      
      expect(wrapper).toContainElement(link)
      expect(link).toContainElement(image)
    })

    it('preserves image attributes when no link wrapper', () => {
      renderPicture({ 
        title: 'No Link Image',
        width: 500,
        height: 250
      })
      const image = screen.getByRole('img')
  expect(image).toHaveAttribute('alt', 'No Link Image')
      expect(image).toHaveAttribute('width', '500')
      expect(image).toHaveAttribute('height', '250')
    })
  })
})
