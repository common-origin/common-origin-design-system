/**
 * Image Preloader Utility
 * 
 * Provides functions for preloading critical images to improve performance
 * and user experience, especially for above-the-fold content.
 */

export interface PreloadImageOptions {
  priority?: 'high' | 'low'
  fetchPriority?: 'high' | 'low' | 'auto'
  crossOrigin?: 'anonymous' | 'use-credentials'
}

/**
 * Preload a single image
 */
export const preloadImage = (
  src: string, 
  options: PreloadImageOptions = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    
    // Check if image is already loaded/cached
    const img = new Image()
    
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`))
    
    // Set options
    if (options.crossOrigin) {
      img.crossOrigin = options.crossOrigin
    }
    
    // Set fetchPriority if supported
    if ('fetchPriority' in img && options.fetchPriority) {
      (img as any).fetchPriority = options.fetchPriority
    }
    
    img.src = src
  })
}

/**
 * Preload multiple images
 */
export const preloadImages = async (
  sources: string[], 
  options: PreloadImageOptions = {}
): Promise<void[]> => {
  const promises = sources.map(src => preloadImage(src, options))
  return Promise.all(promises)
}

/**
 * Create preload link tags for critical images
 * Use this for the most critical above-the-fold images
 */
export const createPreloadLink = (
  src: string, 
  options: PreloadImageOptions = {}
): void => {
  if (typeof document === 'undefined') return
  
  // Check if link already exists
  const existingLink = document.querySelector(`link[href="${src}"]`)
  if (existingLink) return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  
  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin
  }
  
  if (options.fetchPriority) {
    link.setAttribute('fetchpriority', options.fetchPriority)
  }
  
  document.head.appendChild(link)
}

/**
 * React hook for preloading images
 */
import { useEffect } from 'react'

export const useImagePreloader = (
  sources: string | string[], 
  options: PreloadImageOptions = {}
): void => {
  useEffect(() => {
    const sourcesArray = Array.isArray(sources) ? sources : [sources]
    
    preloadImages(sourcesArray, options).catch(error => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Image preloading failed:', error)
      }
    })
  }, [sources, options])
}

/**
 * Intelligent image preloader that considers connection quality
 */
export const smartPreloadImage = (
  src: string, 
  options: PreloadImageOptions = {}
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    
    // Check network conditions if available
    const connection = (navigator as any).connection
    if (connection) {
      // Skip preloading on slow connections
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        resolve()
        return
      }
      
      // Reduce quality on slower connections
      if (connection.effectiveType === '3g' && !options.priority) {
        resolve()
        return
      }
    }
    
    preloadImage(src, options).then(resolve).catch(reject)
  })
}

/**
 * Preload images that are likely to be needed soon
 * (e.g., on hover, on route change preparation)
 */
export const preloadOnHover = (element: HTMLElement, imageSrc: string): (() => void) => {
  let preloaded = false
  
  const handleMouseEnter = () => {
    if (!preloaded) {
      preloaded = true
      smartPreloadImage(imageSrc, { priority: 'low' }).catch(() => {
        // Silently fail - not critical
      })
    }
  }
  
  element.addEventListener('mouseenter', handleMouseEnter, { once: true })
  
  // Cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
  }
}

/**
 * Critical images that should be preloaded immediately
 */
export const CRITICAL_IMAGES = {
  HERO_BACKGROUNDS: [
    '/assets/art/art-desire-path_5.jpg',
    '/assets/art/art-bedsprings_2.jpg',
  ],
  LOGO: '/assets/logo/co-logo-white.svg',
  FEATURED_RELEASES: [
    '/assets/releases/commonorigin-particles.jpg',
  ],
  AVATAR: '/assets/avatar.jpg',
} as const

/**
 * Page-specific image mappings
 */
export const PAGE_IMAGES = {
  home: [
    '/assets/art/art-desire-path_5.jpg',
    '/assets/logo/co-logo-white.svg',
  ],
  music: [
    '/assets/art/art-desire-path_5.jpg',
    '/assets/logo/co-logo-white.svg',
  ],
  design: [
    '/assets/avatar.jpg', // Used in component examples
    '/assets/logo/co-logo-white.svg',
  ],
  art: [
    '/assets/logo/co-logo-white.svg',
  ],
  portfolio: [
    '/assets/logo/co-logo-white.svg',
  ],
} as const

/**
 * Initialize critical image preloading based on current route
 * Call this early in the app lifecycle
 */
export const initializeCriticalImagePreloading = (pathname?: string): void => {
  if (typeof window === 'undefined') return
  
  // Always preload the logo
  const criticalImages: string[] = [CRITICAL_IMAGES.LOGO]
  
  // Add page-specific images based on current route
  if (pathname) {
    const routeKey = getRouteKey(pathname)
    const pageImages = PAGE_IMAGES[routeKey as keyof typeof PAGE_IMAGES]
    if (pageImages) {
      pageImages.forEach(img => {
        if (!criticalImages.includes(img)) {
          criticalImages.push(img)
        }
      })
    }
  }
  
  criticalImages.forEach(src => {
    createPreloadLink(src, { fetchPriority: 'high' })
  })
}

/**
 * Get route key from pathname
 */
const getRouteKey = (pathname: string): string => {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/music')) return 'music'
  if (pathname.startsWith('/design')) return 'design'
  if (pathname.startsWith('/art')) return 'art'
  if (pathname.startsWith('/portfolio')) return 'portfolio'
  return 'default'
}
