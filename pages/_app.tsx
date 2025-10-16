import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { LayoutErrorBoundary } from '../src/components'
import { performanceMonitor } from '../src/lib/performance'
import { initializeCriticalImagePreloading } from '../src/lib/imagePreloader'
import '../styles/index.css'
import '../src/styles/tokens.css'

// TypeScript declaration for Hotjar
declare global {
  interface Window {
    hj?: ((action: string, ...args: any[]) => void) & { q?: any[] };
    _hjSettings?: { hjid: number; hjsv: number };
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  
  // Initialize Hotjar on client-side only for all pages
  useEffect(() => {
    const initHotjar = async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Starting Hotjar initialization...');
        console.log('🌐 Current URL:', window.location.href);
        console.log('🏗️ Environment:', process.env.NODE_ENV);
      }
      
      // Method 1: Try the npm package approach
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log('📦 Attempting npm package method...');
        }
        const Hotjar = (await import('@hotjar/browser')).default;
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Hotjar module imported successfully');
        }
        
        const siteId = 3789301;
        const hotjarVersion = 6;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 Initializing Hotjar with siteId: ${siteId}, version: ${hotjarVersion}`);
        }
        Hotjar.init(siteId, hotjarVersion);
        if (process.env.NODE_ENV === 'development') {
          console.log('📡 Hotjar.init() called');
        }
        
        // Wait for initialization
        setTimeout(() => {
          if (window.hj) {
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ NPM package method successful!');
            }
            window.hj('event', 'npm_package_loaded');
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.log('⚠️ NPM package method did not create window.hj, trying fallback...');
            }
            initTraditionalHotjar();
          }
        }, 2000);
        
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ NPM package method failed:', error);
          console.log('🔄 Trying traditional script method...');
        }
        initTraditionalHotjar();
      }
    };
    
    // Method 2: Traditional script injection (fallback)
    const initTraditionalHotjar = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Initializing Hotjar with traditional method...');
      }
      
      try {
        // Traditional Hotjar initialization - disable strict checks for this legacy script
        (function(h,o,t,j,a,r){
          // @ts-ignore
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3789301,hjsv:6};
          // @ts-ignore  
          a=o.getElementsByTagName('head')[0];
          // @ts-ignore
          r=o.createElement('script');r.async=1;
          // @ts-ignore
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          // @ts-ignore
          a.appendChild(r);
          if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Traditional Hotjar script added to DOM');
          }
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        
        // Check if traditional method works
        setTimeout(() => {
          if (window.hj) {
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Traditional method successful!');
            }
            window.hj('event', 'traditional_method_loaded');
          } else {
            if (process.env.NODE_ENV === 'development') {
              console.error('🚨 Both methods failed to initialize Hotjar');
              console.log('💡 Possible reasons:');
              console.log('   - Domain not allowed in Hotjar settings');
              console.log('   - Ad blockers or privacy extensions');
              console.log('   - Hotjar site ID 3789301 is inactive');
              console.log('   - Network connectivity issues');
            }
          }
        }, 3000);
        
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Traditional method also failed:', error);
        }
      }
    };
    
    initHotjar();

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
    </LayoutErrorBoundary>
  )
}
