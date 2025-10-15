/**
 * Performance Monitoring Utilities
 * Provides tools for monitoring Core Web Vitals and performance metrics
 */

// Core Web Vitals types
interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

interface PerformanceEntry extends globalThis.PerformanceEntry {
  size?: number
  renderTime?: number
  loadTime?: number
  processingStart?: number
  hadRecentInput?: boolean
}

interface PerformanceNavigationTiming extends PerformanceEntry {
  fetchStart: number
  responseStart: number
}

class PerformanceMonitor {
  private metrics: Map<string, WebVitalsMetric> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers()
    }
  }

  /**
   * Initialize performance observers for various metrics
   */
  private initializeObservers(): void {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1] as PerformanceEntry
      this.reportMetric('LCP', lastEntry.startTime)
    })

    // First Input Delay (FID) - using 'first-input' if available
    if ('PerformanceEventTiming' in window) {
      this.observeMetric('first-input', (entries) => {
        const firstInput = entries[0] as PerformanceEntry
        if (firstInput.processingStart) {
          const fid = firstInput.processingStart - firstInput.startTime
          this.reportMetric('FID', fid)
        }
      })
    }

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entries) => {
      let clsValue = 0
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      this.reportMetric('CLS', clsValue)
    })

    // Time to First Byte (TTFB)
    this.observeMetric('navigation', (entries) => {
      const navigation = entries[0] as PerformanceNavigationTiming
      const ttfb = navigation.responseStart - navigation.fetchStart
      this.reportMetric('TTFB', ttfb)
    })
  }

  /**
   * Observe a specific performance metric
   */
  private observeMetric(type: string, callback: (entries: PerformanceEntry[]) => void): void {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })
      
      observer.observe({ type, buffered: true })
      this.observers.set(type, observer)
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error)
    }
  }

  /**
   * Report a performance metric with rating
   */
  private reportMetric(name: string, value: number): void {
    const rating = this.getRating(name, value)
    const metric: WebVitalsMetric = {
      name,
      value,
      rating,
      delta: value,
      id: `${name}-${Date.now()}`,
    }

    this.metrics.set(name, metric)
    this.logMetric(metric)

    // Report to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(value),
        custom_parameter_1: rating,
      })
    }

    // Report to custom analytics endpoint
    this.sendToAnalytics(metric)
  }

  /**
   * Get performance rating based on thresholds
   */
  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
    }

    const threshold = thresholds[name as keyof typeof thresholds]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  /**
   * Log metric to console in development
   */
  private logMetric(metric: WebVitalsMetric): void {
    if (process.env.NODE_ENV === 'development') {
      const emoji = {
        good: '✅',
        'needs-improvement': '⚠️',
        poor: '❌',
      }[metric.rating]

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
        )
      }
    }
  }

  /**
   * Send metrics to analytics endpoint
   */
  private async sendToAnalytics(metric: WebVitalsMetric): Promise<void> {
    try {
      // Only send in production
      if (process.env.NODE_ENV !== 'production') return

      const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT
      if (!endpoint) return

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      })
    } catch (error) {
      console.warn('Failed to send analytics:', error)
    }
  }

  /**
   * Get all collected metrics
   */
  public getMetrics(): WebVitalsMetric[] {
    return Array.from(this.metrics.values())
  }

  /**
   * Get a specific metric
   */
  public getMetric(name: string): WebVitalsMetric | undefined {
    return this.metrics.get(name)
  }

  /**
   * Disconnect all observers
   */
  public disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers.clear()
  }
}

// Bundle size analysis utilities
export const getBundleStats = (): Record<string, any> => {
  if (typeof window === 'undefined') return {}

  return {
    // Calculate approximate bundle sizes from performance entries
    scripts: performance.getEntriesByType('resource')
      .filter(entry => entry.name.includes('.js'))
      .map(entry => ({
        name: entry.name.split('/').pop(),
        size: (entry as any).transferSize || 0,
        duration: entry.duration,
      })),
    
    stylesheets: performance.getEntriesByType('resource')
      .filter(entry => entry.name.includes('.css'))
      .map(entry => ({
        name: entry.name.split('/').pop(),
        size: (entry as any).transferSize || 0,
        duration: entry.duration,
      })),
    
    // Total page weight
    totalTransferSize: performance.getEntriesByType('resource')
      .reduce((total, entry) => total + ((entry as any).transferSize || 0), 0),
  }
}

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Export utilities for use in components
export const reportWebVitals = (metric: WebVitalsMetric): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric)
  }
  
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      custom_parameter_1: metric.rating,
    })
  }
}

// Type augmentation for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default PerformanceMonitor
