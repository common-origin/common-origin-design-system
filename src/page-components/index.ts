// Page components for Next.js documentation site only
// These components have Next.js dependencies and are NOT exported in the NPM package

// Page utilities
export { Meta } from './Meta'
export { Navigation } from './Navigation'
export { Layout } from './PageLayout'
export { Footer } from './Footer'

// Error boundaries
export { ErrorBoundary } from './ErrorBoundary'
export { ComponentErrorBoundary, LayoutErrorBoundary, PageErrorBoundary } from './ErrorBoundaries'

// Re-export design system components for convenience in pages
export * from '../components'