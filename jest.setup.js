import '@testing-library/jest-dom'
import { configureAxe, toHaveNoViolations } from 'jest-axe'

// Extend Jest matchers with jest-axe toHaveNoViolations matcher
expect.extend(toHaveNoViolations)

// Configure jest-axe for WCAG 2.2 AA compliance testing
const axe = configureAxe({
  rules: {
    // WCAG 2.2 AA specific rules
    'color-contrast': { enabled: true },
    'color-contrast-enhanced': { enabled: false }, // This is AAA level
    'focus-order-semantics': { enabled: true },
    'hidden-content': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'landmark-complementary-is-top-level': { enabled: true },
    'page-has-heading-one': { enabled: false }, // Not always applicable for components
    'region': { enabled: false }, // Not always applicable for components
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']
})

// Make axe available globally in tests
global.axe = axe

// Remove styled-components mock to use real styled-components in tests

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => {
  const React = require('react')
  return React.forwardRef(function Image(props, ref) {
    // Remove Next.js-specific props that shouldn't go to DOM
    const { 
      placeholder, 
      blurDataURL, 
      priority, 
      quality, 
      fill, 
      sizes, 
      unoptimized,
      ...imgProps 
    } = props
    
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return React.createElement('img', { 
      ...imgProps, 
      ref,
      'data-priority': priority,
      'data-placeholder': placeholder
    })
  })
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  const React = require('react')
  return React.forwardRef(function Link({ href, children, ...props }, ref) {
    return React.createElement('a', { ...props, href, ref }, children)
  })
})

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
