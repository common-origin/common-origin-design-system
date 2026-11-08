import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
}

export class LayoutErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Layout Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          // Tokens as CSS variables, so the fallback page follows the theme too (#360)
          backgroundColor: 'var(--co-semantic-surface-base)',
          color: 'var(--co-semantic-color-text-default)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1>Something went wrong</h1>
          <p>An error occurred while rendering the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--co-semantic-color-fill-emphasis)',
              color: 'var(--co-semantic-color-text-inverse)',
              border: 'none',
              borderRadius: 'var(--co-semantic-radius-sm)',
              cursor: 'pointer'
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}