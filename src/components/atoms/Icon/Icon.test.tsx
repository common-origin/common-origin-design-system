import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Icon } from './Icon'

// Mock the icons JSON file directly as a default export
jest.mock('@/styles/icons.json', () => ({
  __esModule: true,
  default: {
    arrowDown: {
      name: 'arrowDown',
      path: 'm18.707 9.707-1.414-1.414L12 13.586 6.707 8.293 5.293 9.707 12 16.414l6.707-6.707Z'
    },
    arrowUp: {
      name: 'arrowUp', 
      path: 'm18.707 14.293-1.414 1.414L12 10.414l-5.293 5.293-1.414-1.414L12 7.586l6.707 6.707Z'
    },
    back: {
      name: 'back',
      path: 'm5 12-.707-.707-.707.707.707.707L5 12Zm12 1a1 1 0 1 0 0-2v2ZM8.293 7.293l-4 4 1.414 1.414 4-4-1.414-1.414Zm-4 5.414 4 4 1.414-1.414-4-4-1.414 1.414ZM5 13h12v-2H5v2Z'
    },
    close: {
      name: 'close',
      path: 'M18.7071 5.29289c.3905.39053.3905 1.02369 0 1.41422L6.70711 18.7071c-.39053.3905-1.02369.3905-1.41422 0-.39052-.3905-.39052-1.0237 0-1.4142L17.2929 5.29289c.3905-.39052 1.0237-.39052 1.4142 0ZM5.29289 5.29289c-.39052.39053-.39052 1.02369 0 1.41422L17.2929 18.7071c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L6.70711 5.29289c-.39053-.39052-1.02369-.39052-1.41422 0Z'
    },
    menu: {
      name: 'menu',
      path: 'M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z'
    },
    pause: {
      name: 'pause',
      path: 'M7 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H7ZM15 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2Z'
    },
    play: {
      name: 'play',
      path: 'M16.138 10.569 9.605 7.303A1.8 1.8 0 0 0 7 8.913v6.175a1.8 1.8 0 0 0 2.605 1.61l6.533-3.267c1.18-.59 1.18-2.272 0-2.862Z'
    },
    playBack: {
      name: 'playBack',
      path: 'm16.293 5.293 1.414 1.414L12.414 12l5.293 5.293-1.414 1.414L9.586 12l6.707-6.707ZM5 17V7h2v10H5Z'
    },
    directionRight: {
      name: 'directionRight',
      path: 'M20 12L20.7071 11.2929L21.4142 12L20.7071 12.7071L20 12ZM5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11V13ZM14 6L14.7071 5.29289L20.7071 11.2929L20 12L19.2929 12.7071L13.2929 6.70711L14 6ZM20 12L20.7071 12.7071L14.7071 18.7071L14 18L13.2929 17.2929L19.2929 11.2929L20 12ZM20 12V13H5V12V11H20V12Z'
    },
    caret: {
      name: 'caret',
      path: 'm14.77 11.808-4.458-3.715A.8.8 0 0 0 9 8.708v6.584a.8.8 0 0 0 1.312.614l4.458-3.714a.25.25 0 0 0 0-.384Z'
    }
  }
}))

type IconProps = {
  name: keyof typeof import('@/styles/icons.json')
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  iconColor?: 'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'
  'data-testid'?: string
}

describe('Icon', () => {
  const defaultProps: Omit<IconProps, 'name'> = {}
  
  const renderIcon = (props: Partial<IconProps> = {}) => {
    const finalProps = { 
      name: 'close' as const,
      ...defaultProps,
      ...props 
    }
    return render(<Icon {...finalProps} />)
  }

  const getIcon = () => screen.getByRole('img')

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderIcon()
      const icon = getIcon()
      expect(icon).toBeInTheDocument()
    })

    it('renders with correct icon name', () => {
      renderIcon({ name: 'close' })
      const icon = getIcon()
      expect(icon).toHaveAttribute('aria-label', 'close')
    })

    it('renders with default props when minimal props provided', () => {
      renderIcon()
      const icon = getIcon()
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-label', 'close')
    })

    it('applies custom data-testid', () => {
      renderIcon({ 'data-testid': 'custom-icon' })
      const wrapper = screen.getByTestId('custom-icon')
      expect(wrapper).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderIcon({ 'data-testid': 'test-icon' })
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renders SVG with correct attributes', () => {
      renderIcon()
      const icon = getIcon()
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
      expect(icon).toHaveAttribute('fill', 'currentColor')
      expect(icon.tagName).toBe('svg')
    })

    it('renders path element with correct data', () => {
      renderIcon({ name: 'arrowDown' })
      const icon = getIcon()
      const pathElement = icon.querySelector('path')
      expect(pathElement).toHaveAttribute('d', 'm18.707 9.707-1.414-1.414L12 13.586 6.707 8.293 5.293 9.707 12 16.414l6.707-6.707Z')
    })
  })

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    sizes.forEach((size) => {
      it(`renders with ${size} size`, () => {
        const { container } = renderIcon({ size })
        const iconContainer = container.firstChild
        expect(iconContainer).toBeInTheDocument()
      })
    })

    it('uses default size (lg) when no size is provided', () => {
      const { container } = renderIcon()
      const iconContainer = container.firstChild
      expect(iconContainer).toBeInTheDocument()
    })

    it('handles all size variants correctly', () => {
      sizes.forEach((size) => {
        const { unmount } = renderIcon({ size })
        const icon = getIcon()
        expect(icon).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Color Variants', () => {
    const colors = [
      'default',
      'emphasis', 
      'subdued',
      'disabled',
      'inverse',
      'interactive',
      'error',
      'success',
      'warning',
      'inherit'
    ] as const

    colors.forEach((color) => {
      it(`renders with ${color} color`, () => {
        const { container } = renderIcon({ iconColor: color })
        const iconContainer = container.firstChild
        expect(iconContainer).toBeInTheDocument()
      })
    })

    it('uses default color when no color is provided', () => {
      const { container } = renderIcon()
      const iconContainer = container.firstChild
      expect(iconContainer).toBeInTheDocument()
    })

    it('handles all color variants correctly', () => {
      colors.forEach((color) => {
        const { unmount } = renderIcon({ iconColor: color })
        const icon = getIcon()
        expect(icon).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderIcon()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with different colors', async () => {
      const { container } = renderIcon({ iconColor: 'error' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with different sizes', async () => {
      const { container } = renderIcon({ size: 'xl' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with complex icons', async () => {
      const { container } = renderIcon({ name: 'directionRight', size: 'lg', iconColor: 'interactive' })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('has correct aria-label based on icon name', () => {
      renderIcon({ name: 'menu' })
      const icon = getIcon()
      expect(icon).toHaveAttribute('aria-label', 'menu')
    })

    it('has role img for screen readers', () => {
      renderIcon()
      const icon = getIcon()
      expect(icon).toHaveAttribute('role', 'img')
    })

    it('maintains accessibility across different icon names', () => {
      const iconNames = ['arrowDown', 'back', 'play', 'pause'] as const
      iconNames.forEach((name) => {
        const { unmount } = renderIcon({ name })
        const icon = getIcon()
        expect(icon).toHaveAttribute('role', 'img')
        expect(icon).toHaveAttribute('aria-label', name)
        unmount()
      })
    })
  })

  describe('Icon Variants', () => {
    it('renders different icon names correctly', () => {
      const iconNames = ['arrowDown', 'arrowUp', 'back', 'close', 'menu', 'play', 'pause'] as const
      
      iconNames.forEach((name) => {
        const { unmount } = renderIcon({ name })
        const icon = getIcon()
        expect(icon).toHaveAttribute('aria-label', name)
        const pathElement = icon.querySelector('path')
        expect(pathElement).toBeInTheDocument()
        expect(pathElement).toHaveAttribute('d')
        unmount()
      })
    })

    it('renders complex icon paths correctly', () => {
      renderIcon({ name: 'directionRight' })
      const icon = getIcon()
      const pathElement = icon.querySelector('path')
      expect(pathElement).toHaveAttribute('d', 'M20 12L20.7071 11.2929L21.4142 12L20.7071 12.7071L20 12ZM5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11V13ZM14 6L14.7071 5.29289L20.7071 11.2929L20 12L19.2929 12.7071L13.2929 6.70711L14 6ZM20 12L20.7071 12.7071L14.7071 18.7071L14 18L13.2929 17.2929L19.2929 11.2929L20 12ZM20 12V13H5V12V11H20V12Z')
    })
  })

  describe('TypeScript Props', () => {
    it('accepts all required props', () => {
      renderIcon({ 
        name: 'play',
        size: 'md',
        iconColor: 'interactive'
      })
      const icon = getIcon()
      expect(icon).toHaveAttribute('aria-label', 'play')
    })

    it('handles optional size prop', () => {
      renderIcon({ size: undefined })
      const icon = getIcon()
      expect(icon).toBeInTheDocument()
    })

    it('handles optional color prop', () => {
      renderIcon({ iconColor: undefined })
      const icon = getIcon()
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('works with size and color combinations', () => {
      const combinations = [
        { size: 'xs' as const, iconColor: 'default' as const },
        { size: 'sm' as const, iconColor: 'emphasis' as const },
        { size: 'md' as const, iconColor: 'error' as const },
        { size: 'lg' as const, iconColor: 'success' as const },
        { size: 'xl' as const, iconColor: 'warning' as const },
        { size: '2xl' as const, iconColor: 'interactive' as const }
      ]

      combinations.forEach(({ size, iconColor }) => {
        const { unmount } = renderIcon({ size, iconColor })
        const icon = getIcon()
        expect(icon).toBeInTheDocument()
        unmount()
      })
    })

    it('handles complex icon and property combinations', () => {
      renderIcon({ 
        name: 'playBack',
        size: '2xl',
        iconColor: 'inverse',
        'data-testid': 'complex-icon'
      })
      
      const icon = getIcon()
      const wrapper = screen.getByTestId('complex-icon')
      
      expect(icon).toHaveAttribute('aria-label', 'playBack')
      expect(wrapper).toContainElement(icon)
    })
  })

  describe('Edge Cases', () => {
    it('handles missing icon gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      
      // Temporarily extend the icon types for testing
      const IconWithAny = Icon as any
      const { container } = render(<IconWithAny name="nonexistent" />)
      
      expect(consoleSpy).toHaveBeenCalledWith('Icon "nonexistent" not found in icons.json')
      expect(container.firstChild).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('renders empty icon container when icon not found', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      
      const IconWithAny = Icon as any
      const { container } = render(<IconWithAny name="invalid" />)
      
      const iconContainer = container.firstChild
      expect(iconContainer).toBeInTheDocument()
      expect(iconContainer).not.toContainElement(screen.queryByRole('img'))
      
      consoleSpy.mockRestore()
    })

    it('handles inherit color correctly', () => {
      renderIcon({ iconColor: 'inherit' })
      const icon = getIcon()
      expect(icon).toBeInTheDocument()
    })

    it('maintains proper structure with all variants', () => {
      renderIcon({ 
        name: 'caret',
        size: 'xs',
        iconColor: 'subdued',
        'data-testid': 'edge-case-icon'
      })
      
      const wrapper = screen.getByTestId('edge-case-icon')
      const icon = getIcon()
      
      expect(wrapper).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-label', 'caret')
      expect(icon.querySelector('path')).toBeInTheDocument()
    })
  })
})
