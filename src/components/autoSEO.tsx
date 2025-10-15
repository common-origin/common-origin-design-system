import React from 'react'
import Head from 'next/head'
import { SITE_CONFIG } from '../lib/seoConfig'

interface AutoSEOProps {
  // Simple props that match your content structure
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'music'
  path?: string
  
  // Optional advanced props (most people won't need these)
  noindex?: boolean
  canonicalUrl?: string
}

/**
 * Automatic SEO Component
 * 
 * Just pass your content and it handles all SEO automatically.
 * No SEO knowledge required!
 */
export const AutoSEO: React.FC<AutoSEOProps> = ({
  title,
  description,
  image,
  type = 'website',
  path = '',
  noindex = false,
  canonicalUrl,
}) => {
  // Auto-generate everything
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.defaultTitle
  const fullDescription = description || SITE_CONFIG.defaultDescription
  const fullImage = image || SITE_CONFIG.defaultOgImage
  const fullUrl = canonicalUrl || `${SITE_CONFIG.url}${path}`
  
  // Convert relative image paths to absolute
  const absoluteImage = fullImage.startsWith('http') ? fullImage : `${SITE_CONFIG.url}${fullImage}`
  
  return (
    <Head>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph (Facebook, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      {SITE_CONFIG.twitter && <meta name="twitter:site" content={SITE_CONFIG.twitter} />}
      
      {/* Music-specific meta for releases */}
      {type === 'music' && (
        <>
          <meta property="og:type" content="music.album" />
          <meta property="music:duration" content="180" />
          <meta property="music:album:disc" content="1" />
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'music' ? 'MusicAlbum' : type === 'article' ? 'Article' : 'WebPage',
            name: fullTitle,
            description: fullDescription,
            url: fullUrl,
            image: absoluteImage,
            publisher: {
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
              logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
            },
          })
        }}
      />
    </Head>
  )
}

export default AutoSEO
