import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import '@testing-library/jest-dom'
import { Avatar } from './Avatar'

describe('Avatar Component', () => {
  const defaultProps = {
    name: 'John Doe',
    picture: 'https://example.com/avatar.jpg'
  }

  const renderAvatar = (props: any = {}) => {
    return render(<Avatar {...defaultProps} {...props} />)
  }

  const getAvatarContainer = () => screen.getByLabelText(/Avatar for/)

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderAvatar()
      const avatar = getAvatarContainer()
      expect(avatar).toBeInTheDocument()
    })

    it('has correct accessibility attributes', () => {
      renderAvatar()
      const avatar = getAvatarContainer()
      expect(avatar).toHaveAttribute('aria-label', 'Avatar for John Doe')
    })

    it('renders with custom data-testid', () => {
      renderAvatar({ 'data-testid': 'user-avatar' })
      const avatar = screen.getByTestId('user-avatar')
      expect(avatar).toBeInTheDocument()
    })
  })

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        renderAvatar({ size })
        const avatar = getAvatarContainer()
        expect(avatar).toHaveAttribute('data-size', size)
      })
    })

    it('defaults to md size when no size is provided', () => {
      renderAvatar({ size: undefined })
      const avatar = getAvatarContainer()
      expect(avatar).toHaveAttribute('data-size', 'md')
    })
  })

  describe('Image Handling', () => {
    it('displays image when picture is provided', () => {
      renderAvatar({ 
        picture: 'https://example.com/photo.jpg',
        'data-testid': 'avatar-with-picture' 
      })
      const avatar = screen.getByTestId('avatar-with-picture')
      const image = screen.getByAltText('Avatar of John Doe')
      
      expect(avatar).toBeInTheDocument()
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', 'https://example.com/photo.jpg')
    })

    it('shows initials when no picture is provided', () => {
      renderAvatar({ 
        picture: undefined,
        'data-testid': 'avatar-with-initials'
      })
      const avatar = screen.getByTestId('avatar-with-initials')
      const initials = screen.getByText('JD')
      
      expect(avatar).toBeInTheDocument()
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'JD')
    })

    it('falls back to initials when image fails to load', () => {
      renderAvatar({ 'data-testid': 'avatar-fallback-test' })
      const avatar = screen.getByTestId('avatar-fallback-test')
      const image = screen.getByAltText('Avatar of John Doe')
      
      // Simulate image load error
      fireEvent.error(image)
      
      // Check that initials are now shown and avatar container is still accessible
      expect(avatar).toBeInTheDocument()
      const initials = screen.getByText('JD')
      expect(initials).toBeInTheDocument()
    })

    it('tracks image loading state', () => {
      renderAvatar({ 'data-testid': 'avatar-loading-test' })
      const avatar = screen.getByTestId('avatar-loading-test')
      const image = screen.getByAltText('Avatar of John Doe')
      
      expect(avatar).toBeInTheDocument()
      
      // Initially should be in loading state
      expect(image).toHaveAttribute('data-state', 'loading')
      
      // Simulate image load
      fireEvent.load(image)
      
      // Should now be in loaded state
      expect(image).toHaveAttribute('data-state', 'loaded')
    })
  })

  describe('Name Initials Generation', () => {
    it('generates correct initials for single name', () => {
      renderAvatar({ name: 'John', picture: undefined })
      const initials = screen.getByText('J')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'J')
    })

    it('generates correct initials for two names', () => {
      renderAvatar({ name: 'Jane Smith', picture: undefined })
      const initials = screen.getByText('JS')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'JS')
    })

    it('generates correct initials for multiple names (takes first two)', () => {
      renderAvatar({ name: 'John Michael Smith', picture: undefined })
      const initials = screen.getByText('JM')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'JM')
    })

    it('handles names with lowercase correctly', () => {
      renderAvatar({ name: 'john doe', picture: undefined })
      const initials = screen.getByText('JD')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'JD')
    })

    it('handles empty name gracefully', () => {
      renderAvatar({ name: '', picture: undefined })
      const avatar = screen.getByLabelText(/Avatar for\s*/)
      const initials = avatar.querySelector('span[data-initials]')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', '')
    })

    it('handles names with extra spaces', () => {
      renderAvatar({ name: '  John   Doe  ', picture: undefined })
      const initials = screen.getByText('JD')
      expect(initials).toBeInTheDocument()
      expect(initials).toHaveAttribute('data-initials', 'JD')
    })
  })

  describe('Accessibility', () => {
    it('should not have accessibility violations with image', async () => {
      const { container } = renderAvatar({ 
        name: 'Alice Cooper',
        'data-testid': 'avatar-with-image' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations with initials', async () => {
      const { container } = renderAvatar({ 
        name: 'Bob Wilson',
        picture: undefined,
        'data-testid': 'avatar-with-initials' 
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have accessibility violations across all sizes', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      
      for (const size of sizes) {
        const { container } = renderAvatar({ 
          size, 
          name: 'Test User',
          'data-testid': `avatar-${size}` 
        })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
      }
    })

    it('should not have accessibility violations during image error fallback', async () => {
      const { container } = renderAvatar({ 
        name: 'Error Test',
        picture: 'invalid-url',
        'data-testid': 'avatar-error-test'
      })
      
      // Simulate image error
      const image = screen.getByAltText('Avatar of Error Test')
      fireEvent.error(image)
      
      // Test accessibility after fallback to initials
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has appropriate aria-label', () => {
      renderAvatar({ name: 'Alice Cooper' })
      const avatar = screen.getByLabelText('Avatar for Alice Cooper')
      expect(avatar).toBeInTheDocument()
    })

    it('marks initials as aria-hidden', () => {
      renderAvatar({ picture: undefined })
      const initials = screen.getByText('JD')
      expect(initials).toHaveAttribute('aria-hidden', 'true')
    })

    it('provides alt text for images', () => {
      renderAvatar({ name: 'Bob Wilson' })
      const image = screen.getByAltText('Avatar of Bob Wilson')
      expect(image).toBeInTheDocument()
    })

    it('maintains accessibility with custom props', async () => {
      const { container } = renderAvatar({
        name: 'Custom Props Test',
        className: 'custom-avatar',
        id: 'test-avatar',
        'data-testid': 'custom-avatar'
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Custom Props', () => {
    it('passes through additional HTML attributes', () => {
      renderAvatar({
        className: 'custom-avatar',
        id: 'user-avatar-1',
        'data-custom': 'value'
      })
      const avatar = getAvatarContainer()
      expect(avatar).toHaveClass('custom-avatar')
      expect(avatar).toHaveAttribute('id', 'user-avatar-1')
      expect(avatar).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Edge Cases', () => {
    it('handles special characters in names', () => {
      renderAvatar({ name: 'José María', picture: undefined })
      const initials = screen.getByText('JM')
      expect(initials).toBeInTheDocument()
    })

    it('handles names with numbers', () => {
      renderAvatar({ name: 'User123 Test456', picture: undefined })
      const initials = screen.getByText('UT')
      expect(initials).toBeInTheDocument()
    })

    it('handles very long names', () => {
      renderAvatar({ name: 'Verylongfirstname Verylonglastname', picture: undefined })
      const initials = screen.getByText('VV')
      expect(initials).toBeInTheDocument()
    })

    it('handles invalid image URLs gracefully', () => {
      renderAvatar({ picture: 'invalid-url' })
      const image = screen.getByAltText('Avatar of John Doe')
      
      // Simulate image load error
      fireEvent.error(image)
      
      // Should fall back to initials
      const initials = screen.getByText('JD')
      expect(initials).toBeInTheDocument()
    })
  })
})