/**
 * SEO & Meta Tag Utilities
 * 
 * Comprehensive SEO management system for Common Origin website
 * including Open Graph, Twitter Cards, JSON-LD structured data,
 * and dynamic meta tag generation.
 */

export interface SEOConfig {
  // Basic meta tags
  title: string
  description: string
  keywords?: string[]
  author?: string
  
  // Open Graph
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogType?: 'website' | 'article' | 'music.song' | 'music.album' | 'music.playlist'
  ogUrl?: string
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
  twitterSite?: string
  twitterCreator?: string
  
  // Additional meta
  canonical?: string
  robots?: string
  language?: string
  
  // Structured data
  structuredData?: object
}

export interface MusicReleaseSchema {
  '@context': 'https://schema.org'
  '@type': 'MusicAlbum' | 'MusicRecording'
  name: string
  description?: string
  url?: string
  image?: string[]
  datePublished?: string
  genre?: string[]
  recordLabel?: {
    '@type': 'Organization'
    name: string
  }
  byArtist?: {
    '@type': 'MusicGroup' | 'Person'
    name: string
    url?: string
  }
  track?: Array<{
    '@type': 'MusicRecording'
    name: string
    position: number
    duration?: string
  }>
}

export interface PortfolioSchema {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  description?: string
  url?: string
  image?: string[]
  dateCreated?: string
  creator?: {
    '@type': 'Person' | 'Organization'
    name: string
    url?: string
  }
  about?: string[]
  genre?: string
}

/**
 * Default SEO configuration for the site
 */
export const DEFAULT_SEO: SEOConfig = {
  title: 'Common Origin - Music, Design & Technology Studio',
  description: 'Common Origin is a creativity studio specializing in electronic music production, design systems, and creative technology. Discover our latest releases, portfolio work, and digital art.',
  keywords: [
    'electronic music',
    'music production',
    'design systems',
    'creative technology',
    'digital art',
    'music studio',
    'creative agency',
    'sound design',
    'UI/UX design',
    'creative coding'
  ],
  author: 'Common Origin',
  ogType: 'website',
  ogImage: '/assets/ogimage.jpg',
  ogImageAlt: 'Common Origin - Music, Design & Technology Studio',
  twitterCard: 'summary_large_image',
  twitterSite: '@commonorigin', // Update with actual Twitter handle
  robots: 'index, follow',
  language: 'en-US',
}

/**
 * SEO configuration for different page types
 */
export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Common Origin - Music, Design & Technology Studio',
    description: 'Discover electronic music releases, creative design work, and digital art from Common Origin. A creativity studio at the intersection of music, design, and technology.',
    keywords: ['electronic music', 'creative studio', 'music production', 'design systems'],
  },
  
  music: {
    title: 'Music Releases | Common Origin',
    description: 'Explore our catalog of electronic music releases, from ambient soundscapes to driving techno. Download and stream the latest tracks from Common Origin.',
    keywords: ['electronic music', 'music releases', 'ambient', 'techno', 'experimental'],
  },
  
  releases: {
    title: 'All Releases | Common Origin Music',
    description: 'Complete catalog of music releases from Common Origin. Browse our discography spanning electronic, ambient, and experimental genres.',
    keywords: ['discography', 'music catalog', 'electronic releases', 'albums', 'EPs'],
  },
  
  portfolio: {
    title: 'Design Portfolio | Common Origin',
    description: 'Creative design portfolio showcasing UI/UX projects, design systems, branding work, and digital experiences by Common Origin.',
    keywords: ['design portfolio', 'UI/UX design', 'design systems', 'branding', 'digital design'],
  },
  
  art: {
    title: 'Digital Art & Generative Works | Common Origin',
    description: 'Explore our collection of digital art, generative artwork, and creative coding projects. Where technology meets artistic expression.',
    keywords: ['digital art', 'generative art', 'creative coding', 'algorithmic art', 'visual art'],
  },
  
  design: {
    title: 'Design Systems & Articles | Common Origin',
    description: 'In-depth articles and case studies on design systems, design tokens, accessibility, and modern design practices.',
    keywords: ['design systems', 'design tokens', 'accessibility', 'design articles', 'UX research'],
  },
}

/**
 * Generate SEO configuration for music releases
 */
export const generateMusicReleaseSEO = (release: {
  title: string
  artist?: string
  description?: string
  coverImage?: string
  recordLabel?: string
  date?: string
  tracks?: Array<{ title: string; duration?: string }>
  slug: string
}): SEOConfig => {
  const artistText = release.artist ? `${release.artist} - ` : ''
  const title = `${artistText}${release.title} | Common Origin`
  const description = release.description || 
    `Listen to ${release.title}${release.artist ? ` by ${release.artist}` : ''} on Common Origin. ${release.recordLabel ? `Released on ${release.recordLabel}.` : ''} Electronic music release featuring ${release.tracks?.length || 'multiple'} tracks.`
  
  return {
    title,
    description,
    keywords: [
      'electronic music', 
      'music release', 
      release.title.toLowerCase(), 
      ...(release.artist ? [release.artist.toLowerCase()] : [])
    ],
    ogTitle: title,
    ogDescription: description,
    ogType: 'music.album',
    ogImage: release.coverImage,
    ogImageAlt: `${release.title} album cover`,
    ogUrl: `/releases/${release.slug}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: release.coverImage,
    twitterImageAlt: `${release.title} album cover`,
    canonical: `/releases/${release.slug}`,
    structuredData: generateMusicReleaseSchema(release),
  }
}

/**
 * Generate SEO configuration for portfolio items
 */
export const generatePortfolioSEO = (project: {
  title: string
  description?: string
  coverImage?: string
  date?: string
  tags?: string[]
  slug: string
}): SEOConfig => {
  const title = `${project.title} | Portfolio | Common Origin`
  const description = project.description || 
    `Case study and portfolio piece: ${project.title}. Creative design work by Common Origin showcasing innovative solutions and design thinking.`
  
  return {
    title,
    description,
    keywords: ['design portfolio', 'case study', project.title.toLowerCase(), ...(project.tags || [])],
    ogTitle: title,
    ogDescription: description,
    ogType: 'article',
    ogImage: project.coverImage,
    ogImageAlt: `${project.title} project preview`,
    ogUrl: `/posts/${project.slug}`,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: project.coverImage,
    twitterImageAlt: `${project.title} project preview`,
    canonical: `/posts/${project.slug}`,
    structuredData: generatePortfolioSchema(project),
  }
}

/**
 * Generate structured data for music releases
 */
export const generateMusicReleaseSchema = (release: {
  title: string
  artist?: string
  description?: string
  coverImage?: string
  recordLabel?: string
  date?: string
  tracks?: Array<{ title: string; duration?: string }>
  slug: string
}): MusicReleaseSchema => {
  const schema: MusicReleaseSchema = {
    '@context': 'https://schema.org',
    '@type': release.tracks && release.tracks.length > 1 ? 'MusicAlbum' : 'MusicRecording',
    name: release.title,
    description: release.description,
    url: `https://commonorigin.dev/releases/${release.slug}`, // Update with actual domain
    datePublished: release.date,
    genre: ['Electronic', 'Experimental'], // Default genres, could be made dynamic
  }
  
  if (release.coverImage) {
    schema.image = [release.coverImage]
  }
  
  if (release.artist) {
    schema.byArtist = {
      '@type': 'MusicGroup',
      name: release.artist,
      url: 'https://commonorigin.dev', // Update with actual domain
    }
  }
  
  if (release.recordLabel) {
    schema.recordLabel = {
      '@type': 'Organization',
      name: release.recordLabel,
    }
  }
  
  if (release.tracks && release.tracks.length > 0) {
    schema.track = release.tracks.map((track, index) => ({
      '@type': 'MusicRecording',
      name: track.title,
      position: index + 1,
      duration: track.duration,
    }))
  }
  
  return schema
}

/**
 * Generate structured data for portfolio projects
 */
export const generatePortfolioSchema = (project: {
  title: string
  description?: string
  coverImage?: string
  date?: string
  tags?: string[]
  slug: string
}): PortfolioSchema => {
  const schema: PortfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `https://commonorigin.dev/posts/${project.slug}`, // Update with actual domain
    dateCreated: project.date,
    creator: {
      '@type': 'Organization',
      name: 'Common Origin',
      url: 'https://commonorigin.dev', // Update with actual domain
    },
  }
  
  if (project.coverImage) {
    schema.image = [project.coverImage]
  }
  
  if (project.tags && project.tags.length > 0) {
    schema.about = project.tags
  }
  
  return schema
}

/**
 * Organization schema for Common Origin
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Common Origin',
  description: 'Creativity studio specializing in music, design, and technology',
  url: 'https://commonorigin.dev', // Update with actual domain
  logo: 'https://commonorigin.dev/assets/logo/co-logo-white.svg', // Update with actual domain
  sameAs: [
    // Add social media profiles
    // 'https://twitter.com/commonorigin',
    // 'https://instagram.com/commonorigin',
    // 'https://soundcloud.com/commonorigin',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'general inquiry',
    email: 'hello@commonorigin.dev', // Update with actual email
  },
}

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://commonorigin.dev' // Update with actual domain
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Merge SEO configurations
 */
export const mergeSEOConfig = (base: SEOConfig, override: Partial<SEOConfig>): SEOConfig => {
  return {
    ...base,
    ...override,
    keywords: [
      ...(base.keywords || []),
      ...(override.keywords || [])
    ].filter((keyword, index, arr) => arr.indexOf(keyword) === index), // Remove duplicates
  }
}
