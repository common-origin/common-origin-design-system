import React, { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import styled from 'styled-components'
import tokens from '@/styles/tokens.json'

const { semantic, base } = tokens

// Styled components following the design system patterns
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${base.spacing[4]};
  align-items: center;
  text-align: center;
  padding: ${base.spacing[8]};
  box-sizing: border-box;
`

const PageErrorContainer = styled(ErrorContainer)`
  min-height: 50vh;
  justify-content: center;
`

const ComponentErrorContainer = styled(ErrorContainer)`
  min-height: 200px;
  background-color: ${semantic.color.background.subtle};
  border: 1px solid ${semantic.color.border.subtle};
  border-radius: ${base.border.radius[4]};
  margin: ${base.spacing[2]} 0;
`

const LayoutErrorContainer = styled(ErrorContainer)`
  min-height: 100vh;
  background-color: ${semantic.color.background.surface};
  justify-content: center;
`

// Typography components following design system
const ErrorIcon = styled.div`
  font-size: 4rem;
  line-height: 1;
  margin-bottom: ${base.spacing[4]};
  opacity: 0.7;
`

const ErrorTitle = styled.h2`
  font: ${semantic.typography.h2};
  letter-spacing: ${base.letterSpacing[1]};
  color: ${semantic.color.text.default};
  margin: 0 0 ${base.spacing[3]} 0;
`

const ErrorSubtitle = styled.h3`
  font: ${semantic.typography.h4};
  letter-spacing: ${base.letterSpacing[1]};
  color: ${semantic.color.text.subdued};
  margin: 0 0 ${base.spacing[2]} 0;
`

const ErrorText = styled.p`
  font: ${semantic.typography.body};
  color: ${semantic.color.text.subdued};
  margin: 0;
  max-width: 500px;
  line-height: 1.6;
`

const ErrorActions = styled.div`
  display: flex;
  gap: ${base.spacing[3]};
  margin-top: ${base.spacing[6]};
  flex-wrap: wrap;
  justify-content: center;
`

const ErrorButton = styled.button`
  font: ${semantic.typography.button2};
  padding: ${base.spacing[2]} ${base.spacing[4]};
  background-color: ${semantic.color.background.surface};
  color: ${semantic.color.text.default};
  border: 1px solid ${semantic.color.border.subtle};
  border-radius: ${base.border.radius[3]};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${semantic.color.background.subtle};
    border-color: ${semantic.color.border.default};
  }
  
  &:focus {
    outline: ${semantic.border.focus};
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(1px);
  }
`

// Enhanced fallback components with proper design system styling
const PageErrorFallback = ({ pageName = 'page' }: { pageName?: string }) => (
  <PageErrorContainer>
    <ErrorIcon>📄</ErrorIcon>
    <ErrorTitle>Page Unavailable</ErrorTitle>
    <ErrorText>
      We couldn't load this {pageName}. This might be a temporary issue or the page may have been moved.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={() => window.location.reload()}>
        Try Again
      </ErrorButton>
      <ErrorButton onClick={() => window.history.back()}>
        Go Back
      </ErrorButton>
    </ErrorActions>
  </PageErrorContainer>
)

interface PageErrorBoundaryProps {
  children: ReactNode
  pageName?: string
}

export const PageErrorBoundary: React.FC<PageErrorBoundaryProps> = ({ 
  children, 
  pageName 
}) => {
  return (
    <ErrorBoundary 
      fallback={<PageErrorFallback pageName={pageName} />}
      onError={(error, errorInfo) => {
        console.error(`Page Error in ${pageName}:`, error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// Component error fallback with better UX
const ComponentErrorFallback = ({ componentName = 'component' }: { componentName?: string }) => (
  <ComponentErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorSubtitle>Component Error</ErrorSubtitle>
    <ErrorText>
      The {componentName} couldn't load properly. Other parts of the page should still work normally.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={() => window.location.reload()}>
        Refresh Page
      </ErrorButton>
    </ErrorActions>
  </ComponentErrorContainer>
)

interface ComponentErrorBoundaryProps {
  children: ReactNode
  componentName?: string
}

export const ComponentErrorBoundary: React.FC<ComponentErrorBoundaryProps> = ({ 
  children, 
  componentName 
}) => {
  return (
    <ErrorBoundary 
      fallback={<ComponentErrorFallback componentName={componentName} />}
      onError={(error, errorInfo) => {
        console.error(`Component Error in ${componentName}:`, error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

// Layout error fallback with critical error handling
const LayoutErrorFallback = () => (
  <LayoutErrorContainer>
    <ErrorIcon>🚧</ErrorIcon>
    <ErrorTitle>Application Error</ErrorTitle>
    <ErrorText>
      We're experiencing technical difficulties. Our team has been notified and is working to resolve this issue.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={() => window.location.reload()}>
        Reload Application
      </ErrorButton>
      <ErrorButton onClick={() => window.location.href = '/'}>
        Go to Homepage
      </ErrorButton>
    </ErrorActions>
  </LayoutErrorContainer>
)

interface LayoutErrorBoundaryProps {
  children: ReactNode
}

export const LayoutErrorBoundary: React.FC<LayoutErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary 
      fallback={<LayoutErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Layout Error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
