/**
 * Sitemap Generation Utilities
 * 
 * Generates dynamic sitemaps for better search engine crawling
 * and indexing of music releases, portfolio items, and articles.
 */

export interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

/**
 * Generate sitemap XML from URLs
 */
export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlEntries = urls.map(url => {
    const lastmod = url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''
    const changefreq = url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''
    const priority = url.priority ? `<priority>${url.priority}</priority>` : ''
    
    return `  <url>
    <loc>${url.loc}</loc>${lastmod}${changefreq}${priority}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

/**
 * Generate static page URLs
 */
export const getStaticPageUrls = (baseUrl: string): SitemapUrl[] => {
  return [
    {
      loc: baseUrl,
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/music`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/releases`,
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/portfolio`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/art`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/design`,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/tokens`,
      changefreq: 'yearly',
      priority: 0.3,
    },
  ]
}

/**
 * Generate release page URLs
 */
export const getReleaseUrls = (
  releases: Array<{ slug: string; date?: string }>,
  baseUrl: string
): SitemapUrl[] => {
  return releases.map(release => ({
    loc: `${baseUrl}/releases/${release.slug}`,
    lastmod: release.date ? new Date(release.date).toISOString().split('T')[0] : undefined,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }))
}

/**
 * Generate post/portfolio URLs
 */
export const getPostUrls = (
  posts: Array<{ slug: string; date?: string }>,
  baseUrl: string
): SitemapUrl[] => {
  return posts.map(post => ({
    loc: `${baseUrl}/posts/${post.slug}`,
    lastmod: post.date ? new Date(post.date).toISOString().split('T')[0] : undefined,
    changefreq: 'monthly' as const,
    priority: 0.6,
  }))
}

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Block access to admin/private areas (if any)
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow access to important resources
Allow: /api/og/*
Allow: /_next/static/
Allow: /_next/image/

# Additional directives for common crawlers
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: Slurp
Crawl-delay: 2`
}

/**
 * Get the current timestamp for lastmod
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString().split('T')[0]
}

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Generate RSS feed XML for music releases
 */
export const generateRSSFeed = (
  releases: Array<{
    title: string
    artist?: string
    description?: string
    slug: string
    date?: string
    link?: string
  }>,
  baseUrl: string
): string => {
  const items = releases.slice(0, 20).map(release => {
    const title = release.artist ? `${release.artist} - ${release.title}` : release.title
    const pubDate = release.date ? new Date(release.date).toUTCString() : new Date().toUTCString()
    const link = `${baseUrl}/releases/${release.slug}`
    const description = release.description || `New music release: ${title}`
    
    return `    <item>
      <title><![CDATA[${title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>Electronic Music</category>
    </item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Common Origin - Music Releases</title>
    <description>Latest electronic music releases from Common Origin</description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Common Origin Website</generator>
    <image>
      <url>${baseUrl}/assets/logo/co-logo-white.svg</url>
      <title>Common Origin</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`
}
