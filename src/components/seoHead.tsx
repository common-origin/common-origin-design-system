import React from 'react'
import Head from 'next/head'
import { SEOConfig, DEFAULT_SEO, mergeSEOConfig, ORGANIZATION_SCHEMA } from '../lib/seo'

interface SEOHeadProps {
  config?: Partial<SEOConfig>
  noindex?: boolean
  children?: React.ReactNode
}

/**
 * Enhanced SEO Head Component
 * 
 * Provides comprehensive meta tag management with intelligent defaults,
 * Open Graph optimization, Twitter Cards, and JSON-LD structured data.
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  config = {},
  noindex = false,
  children
}) => {
  // Merge with defaults
  const seoConfig = mergeSEOConfig(DEFAULT_SEO, config)
  
  // Generate robots content
  const robotsContent = noindex ? 'noindex, nofollow' : (seoConfig.robots || 'index, follow')
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoConfig.title}</title>
      <meta name="description" content={seoConfig.description} />
      {seoConfig.keywords && seoConfig.keywords.length > 0 && (
        <meta name="keywords" content={seoConfig.keywords.join(', ')} />
      )}
      {seoConfig.author && <meta name="author" content={seoConfig.author} />}
      <meta name="robots" content={robotsContent} />
      {seoConfig.language && <meta name="language" content={seoConfig.language} />}
      
      {/* Canonical URL */}
      {seoConfig.canonical && <link rel="canonical" href={seoConfig.canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seoConfig.ogType || 'website'} />
      <meta property="og:site_name" content="Common Origin" />
      <meta property="og:title" content={seoConfig.ogTitle || seoConfig.title} />
      <meta property="og:description" content={seoConfig.ogDescription || seoConfig.description} />
      {seoConfig.ogUrl && <meta property="og:url" content={seoConfig.ogUrl} />}
      {seoConfig.ogImage && (
        <>
          <meta property="og:image" content={seoConfig.ogImage} />
          <meta property="og:image:alt" content={seoConfig.ogImageAlt || seoConfig.title} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seoConfig.twitterCard || 'summary_large_image'} />
      {seoConfig.twitterSite && <meta name="twitter:site" content={seoConfig.twitterSite} />}
      {seoConfig.twitterCreator && <meta name="twitter:creator" content={seoConfig.twitterCreator} />}
      <meta name="twitter:title" content={seoConfig.twitterTitle || seoConfig.title} />
      <meta name="twitter:description" content={seoConfig.twitterDescription || seoConfig.description} />
      {seoConfig.twitterImage && (
        <>
          <meta name="twitter:image" content={seoConfig.twitterImage} />
          <meta name="twitter:image:alt" content={seoConfig.twitterImageAlt || seoConfig.title} />
        </>
      )}
      
      {/* Additional Meta Tags for Music/Creative Content */}
      <meta property="og:locale" content="en_US" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      
      {/* JSON-LD Structured Data */}
      {seoConfig.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structuredData)
          }}
        />
      )}
      
      {/* Organization Schema (always include on pages) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_SCHEMA)
        }}
      />
      
      {/* Additional head content */}
      {children}
    </Head>
  )
}

/**
 * Basic Meta Component (backward compatibility)
 * Enhanced version of the original Meta component
 */
export const EnhancedMeta: React.FC = () => {
  return (
    <>
      <Head>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        
        {/* Browser theme configuration */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000000" />
        
        {/* Essential meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* RSS feed */}
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>
      
      {/* Default SEO */}
      <SEOHead />
    </>
  )
}

export default SEOHead
