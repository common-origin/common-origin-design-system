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

// Mock styled-components for testing
jest.mock('styled-components', () => {
  const React = require('react')
  
  const styled = (tag) => {
    const createStyledComponent = (template) => {
      const StyledComponent = React.forwardRef(({ children, ...props }, ref) => {
        return React.createElement(tag, { ...props, ref }, children)
      })
      StyledComponent.displayName = `Styled${tag}`
      return StyledComponent
    }
    
    // Add withConfig method for TypeScript generic support
    createStyledComponent.withConfig = (config) => {
      const styledWithConfigFn = (template) => {
        const StyledComponent = React.forwardRef(({ children, ...props }, ref) => {
          // Filter props using shouldForwardProp if provided
          let filteredProps = {}
          
          if (config?.shouldForwardProp && typeof config.shouldForwardProp === 'function') {
            Object.keys(props).forEach(key => {
              if (config.shouldForwardProp(key, props[key])) {
                filteredProps[key] = props[key]
              }
            })
          } else {
            filteredProps = { ...props }
          }
          
          return React.createElement(tag, { ...filteredProps, ref }, children)
        })
        StyledComponent.displayName = `Styled${tag}`
        return StyledComponent
      }
      
      // Add withConfig to the returned function as well for chaining
      styledWithConfigFn.withConfig = createStyledComponent.withConfig
      
      return styledWithConfigFn
    }
    
    return createStyledComponent
  }
  
  // Add properties for common HTML elements
  styled.div = styled('div')
  styled.span = styled('span')
  styled.img = styled('img')
  styled.button = styled('button')
  styled.input = styled('input')
  styled.a = styled('a')
  styled.p = styled('p')
  styled.h1 = styled('h1')
  styled.h2 = styled('h2')
  styled.h3 = styled('h3')
  styled.h4 = styled('h4')
  styled.h5 = styled('h5')
  styled.h6 = styled('h6')
  styled.pre = styled('pre')
  styled.footer = styled('footer')
  styled.nav = styled('nav')
  styled.main = styled('main')
  styled.section = styled('section')
  styled.header = styled('header')
  styled.article = styled('article')
  styled.aside = styled('aside')
  styled.ul = styled('ul')
  styled.ol = styled('ol')
  styled.li = styled('li')
  styled.time = styled('time')
  styled.table = styled('table')
  styled.tr = styled('tr')
  styled.td = styled('td')
  styled.th = styled('th')
  styled.form = styled('form')
  styled.label = styled('label')
  
  // Add a catch-all for any other HTML elements
  const htmlElements = [
    'address', 'area', 'base', 'blockquote', 'body', 'br', 'canvas', 'caption', 
    'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 
    'dfn', 'dialog', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 
    'head', 'hr', 'html', 'i', 'iframe', 'ins', 'kbd', 'legend', 'link', 'map', 
    'mark', 'menu', 'meta', 'meter', 'noscript', 'object', 'optgroup', 'option', 
    'output', 'param', 'picture', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 
    'script', 'select', 'small', 'source', 'strong', 'style', 'sub', 'summary', 
    'sup', 'svg', 'template', 'textarea', 'title', 'track', 'u', 'var', 'video', 'wbr'
  ]
  
  htmlElements.forEach(element => {
    styled[element] = styled(element)
  })
  
  return {
    __esModule: true,
    default: styled,
    css: () => '',
    ThemeProvider: ({ children }) => children,
    createGlobalStyle: () => () => null,
  }
})

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
