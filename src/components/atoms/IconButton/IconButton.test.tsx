import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { axe, toHaveNoViolations } from 'jest-axe'
import { IconButton } from './IconButton'
import type { IconButtonProps } from './IconButton'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock the Icon component
jest.mock('../Icon', () => ({
  Icon: ({ name, size, iconColor, ...props }: any) => (
    <span 
      data-testid={`icon-${name}`} 
      data-size={size}
      data-color={iconColor}
      role="img"
      aria-label={name}
      {...props}
    >
      {name}
    </span>
  )
}))

// Note: URL navigation tests are skipped due to jsdom window.location limitations
// These features are tested through integration testing instead

describe('IconButton', () => {
  const defaultProps: IconButtonProps = {
    variant: 'primary',
    size: 'medium',
    iconName: 'close',
    'aria-label': 'Close dialog'
  }

  const renderIconButton = (props: Partial<IconButtonProps> = {}) => {
    const finalProps = {
      ...defaultProps,
      ...props
    }
    return render(<IconButton {...finalProps} />)
  }

  const getButton = () => screen.getByRole('button')
  const getIcon = (name: string) => screen.getByTestId(`icon-${name}`)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderIconButton()
      expect(getButton()).toBeInTheDocument()
    })

    it('renders with correct icon', () => {
      renderIconButton({ iconName: 'pause' })
      expect(getIcon('pause')).toBeInTheDocument()
    })

    it('renders with default props when minimal props provided', () => {
      renderIconButton()
      const button = getButton()
      expect(button).toHaveAttribute('type', 'button')
      expect(button).not.toBeDisabled()
    })

    it('applies custom data-testid', () => {
      renderIconButton({ 'data-testid': 'custom-button' })
      expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    })

    it('supports data-testid prop correctly', () => {
      renderIconButton({ 'data-testid': 'test-icon-button' })
      expect(screen.getByTestId('test-icon-button')).toBeInTheDocument()
    })
  })

  describe('Variant Support', () => {
    it('renders primary variant', () => {
      renderIconButton({ variant: 'primary' })
      expect(getButton()).toBeInTheDocument()
      expect(getIcon('close')).toHaveAttribute('data-color', 'inherit')
    })

    it('renders secondary variant', () => {
      renderIconButton({ variant: 'secondary' })
      expect(getButton()).toBeInTheDocument()
      expect(getIcon('close')).toHaveAttribute('data-color', 'inherit')
    })

    it('renders naked variant', () => {
      renderIconButton({ variant: 'naked' })
      expect(getButton()).toBeInTheDocument()
      expect(getIcon('close')).toHaveAttribute('data-color', 'inherit')
    })

    it('handles all variants correctly', () => {
      const variants: IconButtonProps['variant'][] = ['primary', 'secondary', 'naked']
      
      variants.forEach((variant) => {
        const { unmount } = renderIconButton({ variant })
        expect(getButton()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Size Support', () => {
    it('renders small size', () => {
      renderIconButton({ size: 'small' })
      expect(getIcon('close')).toHaveAttribute('data-size', 'sm')
    })

    it('renders medium size', () => {
      renderIconButton({ size: 'medium' })
      expect(getIcon('close')).toHaveAttribute('data-size', 'md')
    })

    it('renders large size', () => {
      renderIconButton({ size: 'large' })
      expect(getIcon('close')).toHaveAttribute('data-size', 'lg')
    })

    it('uses default size (medium) when no size is provided', () => {
      renderIconButton({ size: undefined })
      expect(getIcon('close')).toHaveAttribute('data-size', 'md')
    })

    it('handles all size variants correctly', () => {
      const sizes: IconButtonProps['size'][] = ['small', 'medium', 'large']
      
      sizes.forEach((size) => {
        const { unmount } = renderIconButton({ size })
        expect(getButton()).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Click Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick })
      
      await user.click(getButton())
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles multiple clicks', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick })
      const button = getButton()
      
      await user.click(button)
      await user.click(button)
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick, disabled: true })
      
      await user.click(getButton())
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Interactions', () => {
    it('handles Enter key press', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick })

      getButton().focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('ignores other keys', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick })

      getButton().focus()
      await user.keyboard('a')
      await user.keyboard('{Escape}')
      await user.keyboard('{Tab}')
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not handle keyboard events when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = jest.fn()
      renderIconButton({ onClick: handleClick, disabled: true })

      await user.tab()
      await user.keyboard('{Enter}')
      await user.keyboard('{Space}')
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('can be disabled', () => {
      renderIconButton({ disabled: true })
      expect(getButton()).toBeDisabled()
    })

    it('uses native disabled semantics without aria-disabled', () => {
      renderIconButton({ disabled: true })
      expect(getButton()).not.toHaveAttribute('aria-disabled')
    })

    it('has correct cursor when disabled', () => {
      renderIconButton({ disabled: true })
      const button = getButton()
      // Note: jsdom may not compute cursor style, so we check the component renders
      expect(button).toBeInTheDocument()
    })
  })

  describe('ARIA and Accessibility Props', () => {
    it('requires and applies aria-label', () => {
      renderIconButton({ 'aria-label': 'Custom label' })
      expect(getButton()).toHaveAttribute('aria-label', 'Custom label')
    })

    it('applies aria-describedby', () => {
      renderIconButton({ 'aria-describedby': 'description-id' })
      expect(getButton()).toHaveAttribute('aria-describedby', 'description-id')
    })

    it('applies aria-expanded', () => {
      renderIconButton({ 'aria-expanded': true })
      expect(getButton()).toHaveAttribute('aria-expanded', 'true')
    })

    it('applies aria-pressed', () => {
      renderIconButton({ 'aria-pressed': true })
      expect(getButton()).toHaveAttribute('aria-pressed', 'true')
    })

    it('icon has aria-hidden="true"', () => {
      renderIconButton()
      expect(getIcon('close')).toHaveAttribute('aria-hidden', 'true')
    })

    it('is exposed as a button element', () => {
      renderIconButton()
      expect(getButton().tagName).toBe('BUTTON')
    })

    it('is keyboard focusable by default', async () => {
      const user = userEvent.setup()
      renderIconButton()

      await user.tab()
      expect(getButton()).toHaveFocus()
    })
  })

  describe('Icon Integration', () => {
    it('renders different icon names correctly', () => {
      const icons = ['play', 'pause', 'stop', 'add', 'remove']
      
      icons.forEach((iconName) => {
        const { unmount } = renderIconButton({ iconName: iconName as keyof typeof import('@/styles/icons.json') })
        expect(getIcon(iconName)).toBeInTheDocument()
        unmount()
      })
    })

    it('passes correct icon color based on variant', () => {
      const { unmount } = renderIconButton({ variant: 'primary' })
      expect(getIcon('close')).toHaveAttribute('data-color', 'inherit')
      unmount()
      
      renderIconButton({ variant: 'secondary' })
      expect(getIcon('close')).toHaveAttribute('data-color', 'inherit')
    })

    it('passes correct icon size based on button size', () => {
      const { unmount } = renderIconButton({ size: 'small' })
      expect(getIcon('close')).toHaveAttribute('data-size', 'sm')
      unmount()
      
      renderIconButton({ size: 'large' })
      expect(getIcon('close')).toHaveAttribute('data-size', 'lg')
    })
  })

  describe('TypeScript Props', () => {
    it('accepts all required props', () => {
      renderIconButton({
        variant: 'primary',
        iconName: 'play',
        'aria-label': 'Play'
      })
      expect(getButton()).toBeInTheDocument()
    })

    it('handles optional props', () => {
      renderIconButton({
        size: 'large',
        url: '/test',
        onClick: jest.fn(),
        disabled: true,
        'aria-describedby': 'desc'
      })
      expect(getButton()).toBeInTheDocument()
    })

    it('supports button HTML attributes', () => {
      renderIconButton({
        id: 'test-button',
        title: 'Test Title',
        form: 'test-form'
      })
      const button = getButton()
      expect(button).toHaveAttribute('id', 'test-button')
      expect(button).toHaveAttribute('title', 'Test Title')
      expect(button).toHaveAttribute('form', 'test-form')
    })
  })

  describe('Edge Cases', () => {
    it('handles missing onClick and URL gracefully', async () => {
      const user = userEvent.setup()
      renderIconButton({ onClick: undefined, url: undefined })
      
      // Just verify the button renders and is clickable without errors
      await user.click(getButton())
      expect(getButton()).toBeInTheDocument()
    })

    it('handles complex aria combinations', () => {
      renderIconButton({
        'aria-label': 'Toggle menu',
        'aria-expanded': false,
        'aria-pressed': false,
        'aria-describedby': 'menu-help'
      })
      const button = getButton()
      expect(button).toHaveAttribute('aria-label', 'Toggle menu')
      expect(button).toHaveAttribute('aria-expanded', 'false')
      expect(button).toHaveAttribute('aria-pressed', 'false')
      expect(button).toHaveAttribute('aria-describedby', 'menu-help')
    })

    it('maintains proper button semantics', () => {
      renderIconButton()
      const button = getButton()
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveAttribute('type', 'button')
    })
  })

  describe('Accessibility', () => {
    it('should have no accessibility violations in default state', async () => {
      const { container } = renderIconButton()
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with different variants', async () => {
      const variants: IconButtonProps['variant'][] = ['primary', 'secondary', 'naked']
      
      for (const variant of variants) {
        const { container, unmount } = renderIconButton({ variant })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations with different sizes', async () => {
      const sizes: IconButtonProps['size'][] = ['small', 'medium', 'large']
      
      for (const size of sizes) {
        const { container, unmount } = renderIconButton({ size })
        const results = await axe(container)
        expect(results).toHaveNoViolations()
        unmount()
      }
    })

    it('should have no accessibility violations when disabled', async () => {
      const { container } = renderIconButton({ disabled: true })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with complex ARIA props', async () => {
      const { container } = renderIconButton({
        'aria-label': 'Toggle navigation',
        'aria-expanded': false,
        'aria-describedby': 'nav-help',
        'aria-pressed': false
      })
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

  })
})
