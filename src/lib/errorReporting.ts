import { ErrorInfo } from 'react'

interface ErrorReport {
  error: Error
  errorInfo?: ErrorInfo
  timestamp: string
  url: string
  userAgent: string
  userId?: string
  sessionId?: string
  buildVersion?: string
}

class ErrorReportingService {
  private static instance: ErrorReportingService
  private queue: ErrorReport[] = []
  private isReporting = false

  static getInstance(): ErrorReportingService {
    if (!ErrorReportingService.instance) {
      ErrorReportingService.instance = new ErrorReportingService()
    }
    return ErrorReportingService.instance
  }

  captureException(error: Error, options: {
    errorInfo?: ErrorInfo
    userId?: string
    sessionId?: string
    tags?: Record<string, string>
    context?: Record<string, any>
  } = {}) {
    const report: ErrorReport = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack || '',
      } as Error,
      errorInfo: options.errorInfo,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      userId: options.userId,
      sessionId: options.sessionId || this.getSessionId(),
      buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION,
    }

    // Add to queue
    this.queue.push(report)

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Report:', report)
    }

    // Send reports in production
    if (process.env.NODE_ENV === 'production') {
      this.sendReports()
    }
  }

  private async sendReports() {
    if (this.isReporting || this.queue.length === 0) return

    this.isReporting = true

    try {
      const reports = [...this.queue]
      this.queue = []

      // Send to your error reporting service
      // This could be Sentry, LogRocket, custom endpoint, etc.
      await this.sendToService(reports)

    } catch (error) {
      console.error('Failed to send error reports:', error)
      // Put reports back in queue to retry later
      this.queue.unshift(...this.queue)
    } finally {
      this.isReporting = false
    }
  }

  private async sendToService(reports: ErrorReport[]) {
    // Example implementation - replace with your actual service
    const endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT

    if (!endpoint) {
      console.warn('No error reporting endpoint configured')
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reports,
          metadata: {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`Successfully sent ${reports.length} error reports`)
      }
    } catch (error) {
      console.error('Error reporting service failed:', error)
      throw error
    }
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server'

    let sessionId = sessionStorage.getItem('error-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('error-session-id', sessionId)
    }
    return sessionId
  }

  // Manual error reporting for custom errors
  reportError(message: string, context?: Record<string, any>) {
    const error = new Error(message)
    this.captureException(error, { context })
  }

  // Performance monitoring
  reportPerformanceIssue(metric: string, value: number, context?: Record<string, any>) {
    if (process.env.NODE_ENV === 'production') {
      this.reportError(`Performance issue: ${metric} = ${value}`, {
        metric,
        value,
        ...context,
      })
    }
  }
}

// Export singleton instance
export const errorReporting = ErrorReportingService.getInstance()

// Utility functions
export const captureException = (error: Error, options?: Parameters<typeof errorReporting.captureException>[1]) => {
  errorReporting.captureException(error, options)
}

export const reportError = (message: string, context?: Record<string, any>) => {
  errorReporting.reportError(message, context)
}

export const reportPerformanceIssue = (metric: string, value: number, context?: Record<string, any>) => {
  errorReporting.reportPerformanceIssue(metric, value, context)
}
