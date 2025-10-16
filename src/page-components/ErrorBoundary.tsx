import React, { Component, ErrorInfo, ReactNode } from 'react'
import styled from 'styled-components'
import { Container } from '../components/atoms/Container'
import { Stack } from '../components/atoms/Stack'
import { Typography } from '../components/atoms/Typography'
import { Button } from '../components/atoms/Button'
import { captureException } from '../lib/errorReporting'
import tokens from '@/styles/tokens.json'

const { semantic } = tokens

interface Props {
  children?: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

const ErrorContainer = styled.div`
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${semantic.color.background.subtle};
  border: ${semantic.border.subtle};
  border-radius: ${tokens.base.border.radius[4]};
  padding: ${tokens.base.spacing[8]};
  margin: ${tokens.base.spacing[4]} 0;
`

const ErrorContent = styled.div`
  text-align: center;
  max-width: 600px;
`

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${tokens.base.spacing[4]};
  color: ${semantic.color.text.subdued};
`

const ErrorDetails = styled.details`
  margin-top: ${tokens.base.spacing[6]};
  padding: ${tokens.base.spacing[4]};
  background-color: ${semantic.color.background.surface};
  border-radius: ${tokens.base.border.radius[3]};
  border: ${semantic.border.subtle};
  
  summary {
    cursor: pointer;
    font-weight: ${tokens.base.fontWeight[3]};
    color: ${semantic.color.text.subdued};
    margin-bottom: ${tokens.base.spacing[2]};
    
    &:hover {
      color: ${semantic.color.text.default};
    }
  }
`

const ErrorStack = styled.pre`
  background-color: ${semantic.color.background.default};
  padding: ${tokens.base.spacing[3]};
  border-radius: ${tokens.base.border.radius[2]};
  font-size: ${tokens.base.fontSize[2]};
  color: ${semantic.color.text.subdued};
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
`

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Update state with error info
    this.setState({
      error,
      errorInfo,
    })

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Report error to monitoring service
    captureException(error, { errorInfo })

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Additional production-specific error handling
      console.error('Production error boundary triggered:', error.message)
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <Container>
          <ErrorContainer>
            <ErrorContent>
              <ErrorIcon>⚠️</ErrorIcon>
              
              <Stack direction="column" gap="md" alignItems="center">
                <Typography variant="h3" color="default">
                  Something went wrong
                </Typography>
                
                <Typography variant="body" color="subdued">
                  We're sorry, but something unexpected happened. You can try refreshing the page or go back to continue browsing.
                </Typography>
                
                <Stack direction="row" gap="md" justifyContent="center">
                  <Button 
                    variant="primary" 
                    onClick={this.handleRetry}
                    aria-label="Try again"
                  >
                    Try Again
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    onClick={this.handleReload}
                    aria-label="Reload page"
                  >
                    Reload Page
                  </Button>
                </Stack>
              </Stack>

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <ErrorDetails>
                  <summary>Error Details (Development Only)</summary>
                  
                  <Stack direction="column" gap="md">
                    <div>
                      <Typography variant="small" color="subdued">
                        <strong>Error:</strong> {this.state.error.message}
                      </Typography>
                    </div>
                    
                    {this.state.error.stack && (
                      <div>
                        <Typography variant="small" color="subdued">
                          <strong>Stack Trace:</strong>
                        </Typography>
                        <ErrorStack>{this.state.error.stack}</ErrorStack>
                      </div>
                    )}
                    
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <Typography variant="small" color="subdued">
                          <strong>Component Stack:</strong>
                        </Typography>
                        <ErrorStack>{this.state.errorInfo.componentStack}</ErrorStack>
                      </div>
                    )}
                  </Stack>
                </ErrorDetails>
              )}
            </ErrorContent>
          </ErrorContainer>
        </Container>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
