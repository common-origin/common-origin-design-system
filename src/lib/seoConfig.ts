/**
 * SEO Configuration
 * 
 * Central configuration file for all SEO settings.
 * Update this file once and everything else is automatic.
 */

// ========================================
// 🔧 SITE CONFIGURATION (Update these)
// ========================================

export const SITE_CONFIG = {
  // Basic site info
  name: 'Common Origin',
  domain: 'commonorigin.studio', // Update with your actual domain
  url: 'https://commonorigin.studio', // Update with your actual domain
  
  // Contact & social
  email: 'ollie@commonorigin.studio', // Update with your actual email
  twitter: '@commonorigin', // Update with your actual Twitter handle (or remove if none)
  
  // SEO defaults
  defaultTitle: 'Common Origin - Music, Design & Technology Studio',
  defaultDescription: 'Common Origin is a creativity studio specializing in electronic music production, design systems, and creative technology. Discover our latest releases, portfolio work, and digital art.',
  
  // Music/content specific
  musicGenres: ['Electronic', 'Experimental', 'Ambient', 'Techno'], // Your main genres
  defaultRecordLabel: 'Common Origin', // Your default label name
  
  // Images
  defaultOgImage: '/assets/ogimage.jpg',
  logo: '/assets/logo/co-logo-white.svg',
}

// ========================================
// 🤖 AUTOMATIC SETTINGS (No need to change)
// ========================================

/**
 * Generate SEO config for music releases automatically
 * No manual work needed - reads from your markdown files
 */
export const generateAutoMusicSEO = (release: {
  title: string
  artist?: string
  excerpt?: string
  coverImage?: string
  recordLabel?: string
  date?: string
  slug: string
}) => {
  const artistText = release.artist ? `${release.artist} - ` : ''
  const title = `${artistText}${release.title} | ${SITE_CONFIG.name}`
  
  // Auto-generate description if none provided
  const description = release.excerpt || 
    `Listen to ${release.title}${release.artist ? ` by ${release.artist}` : ''} on ${SITE_CONFIG.name}. ${
      release.recordLabel ? `Released on ${release.recordLabel}.` : ''
    } Electronic music featuring ${SITE_CONFIG.musicGenres[0].toLowerCase()} sounds.`
  
  return {
    title,
    description,
    ogImage: release.coverImage || SITE_CONFIG.defaultOgImage,
    canonical: `${SITE_CONFIG.url}/releases/${release.slug}`,
    // Everything else is automatic
  }
}

/**
 * Generate SEO config for portfolio items automatically
 */
export const generateAutoPortfolioSEO = (project: {
  title: string
  excerpt?: string
  coverImage?: string
  slug: string
}) => {
  const title = `${project.title} | Portfolio | ${SITE_CONFIG.name}`
  const description = project.excerpt || 
    `Case study and portfolio piece: ${project.title}. Creative design work by ${SITE_CONFIG.name} showcasing innovative solutions and design thinking.`
  
  return {
    title,
    description,
    ogImage: project.coverImage || SITE_CONFIG.defaultOgImage,
    canonical: `${SITE_CONFIG.url}/posts/${project.slug}`,
  }
}

/**
 * Page-specific SEO (automatically optimized)
 */
export const AUTO_PAGE_SEO = {
  home: {
    title: SITE_CONFIG.defaultTitle,
    description: SITE_CONFIG.defaultDescription,
    canonical: SITE_CONFIG.url,
  },
  
  music: {
    title: `Music Releases | ${SITE_CONFIG.name}`,
    description: `Explore our catalog of ${SITE_CONFIG.musicGenres.join(', ').toLowerCase()} music releases. Download and stream the latest tracks from ${SITE_CONFIG.name}.`,
    canonical: `${SITE_CONFIG.url}/music`,
  },
  
  portfolio: {
    title: `Design Portfolio | ${SITE_CONFIG.name}`,
    description: `Creative design portfolio showcasing UI/UX projects, design systems, and digital experiences by ${SITE_CONFIG.name}.`,
    canonical: `${SITE_CONFIG.url}/portfolio`,
  },
  
  art: {
    title: `Digital Art & Generative Works | ${SITE_CONFIG.name}`,
    description: `Explore our collection of digital art, generative artwork, and creative coding projects by ${SITE_CONFIG.name}.`,
    canonical: `${SITE_CONFIG.url}/art`,
  },
}
