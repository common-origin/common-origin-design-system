import { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LayoutErrorBoundary } from '../src/page-components'
import { performanceMonitor } from '../src/lib/performance'
import { initializeCriticalImagePreloading } from '../src/lib/imagePreloader'
import '../styles/fonts.css'
import '../styles/index.css'
import '../src/styles/tokens.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Performance monitoring initialized');
    }
    
    // Initialize critical image preloading based on current route
    initializeCriticalImagePreloading(router.pathname);
    
    // Log performance metrics when available
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      if (metrics.length > 0 && process.env.NODE_ENV === 'development') {
        console.log('📈 Performance Metrics:', metrics);
      }
    }, 5000);
  }, []);

  return (
    <LayoutErrorBoundary>
      <Component {...pageProps} />
      {/* Cookieless page-view analytics (#33). Sends nothing in development. */}
      <Analytics />
    </LayoutErrorBoundary>
  )
}
