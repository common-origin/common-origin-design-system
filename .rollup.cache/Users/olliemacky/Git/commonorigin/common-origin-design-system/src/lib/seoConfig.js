/**
 * SEO Configuration
 *
 * Central configuration file for all SEO settings.
 * Update this file once and everything else is automatic.
 */
// ========================================
// 🔧 SITE CONFIGURATION (Update these)
// ========================================
export var SITE_CONFIG = {
    // Basic site info
    name: 'Common Origin',
    domain: 'commonorigin.studio',
    url: 'https://commonorigin.studio',
    // Contact & social
    email: 'ollie@commonorigin.studio',
    twitter: '@commonorigin',
    // SEO defaults
    defaultTitle: 'Common Origin - Music, Design & Technology Studio',
    defaultDescription: 'Common Origin is a creativity studio specializing in electronic music production, design systems, and creative technology. Discover our latest releases, portfolio work, and digital art.',
    // Music/content specific
    musicGenres: ['Electronic', 'Experimental', 'Ambient', 'Techno'],
    defaultRecordLabel: 'Common Origin',
    // Images
    defaultOgImage: '/assets/ogimage.jpg',
    logo: '/assets/logo/co-logo-white.svg',
};
// ========================================
// 🤖 AUTOMATIC SETTINGS (No need to change)
// ========================================
/**
 * Generate SEO config for music releases automatically
 * No manual work needed - reads from your markdown files
 */
export var generateAutoMusicSEO = function (release) {
    var artistText = release.artist ? "".concat(release.artist, " - ") : '';
    var title = "".concat(artistText).concat(release.title, " | ").concat(SITE_CONFIG.name);
    // Auto-generate description if none provided
    var description = release.excerpt ||
        "Listen to ".concat(release.title).concat(release.artist ? " by ".concat(release.artist) : '', " on ").concat(SITE_CONFIG.name, ". ").concat(release.recordLabel ? "Released on ".concat(release.recordLabel, ".") : '', " Electronic music featuring ").concat(SITE_CONFIG.musicGenres[0].toLowerCase(), " sounds.");
    return {
        title: title,
        description: description,
        ogImage: release.coverImage || SITE_CONFIG.defaultOgImage,
        canonical: "".concat(SITE_CONFIG.url, "/releases/").concat(release.slug),
        // Everything else is automatic
    };
};
/**
 * Generate SEO config for portfolio items automatically
 */
export var generateAutoPortfolioSEO = function (project) {
    var title = "".concat(project.title, " | Portfolio | ").concat(SITE_CONFIG.name);
    var description = project.excerpt ||
        "Case study and portfolio piece: ".concat(project.title, ". Creative design work by ").concat(SITE_CONFIG.name, " showcasing innovative solutions and design thinking.");
    return {
        title: title,
        description: description,
        ogImage: project.coverImage || SITE_CONFIG.defaultOgImage,
        canonical: "".concat(SITE_CONFIG.url, "/posts/").concat(project.slug),
    };
};
/**
 * Page-specific SEO (automatically optimized)
 */
export var AUTO_PAGE_SEO = {
    home: {
        title: SITE_CONFIG.defaultTitle,
        description: SITE_CONFIG.defaultDescription,
        canonical: SITE_CONFIG.url,
    },
    music: {
        title: "Music Releases | ".concat(SITE_CONFIG.name),
        description: "Explore our catalog of ".concat(SITE_CONFIG.musicGenres.join(', ').toLowerCase(), " music releases. Download and stream the latest tracks from ").concat(SITE_CONFIG.name, "."),
        canonical: "".concat(SITE_CONFIG.url, "/music"),
    },
    portfolio: {
        title: "Design Portfolio | ".concat(SITE_CONFIG.name),
        description: "Creative design portfolio showcasing UI/UX projects, design systems, and digital experiences by ".concat(SITE_CONFIG.name, "."),
        canonical: "".concat(SITE_CONFIG.url, "/portfolio"),
    },
    art: {
        title: "Digital Art & Generative Works | ".concat(SITE_CONFIG.name),
        description: "Explore our collection of digital art, generative artwork, and creative coding projects by ".concat(SITE_CONFIG.name, "."),
        canonical: "".concat(SITE_CONFIG.url, "/art"),
    },
};
//# sourceMappingURL=seoConfig.js.map