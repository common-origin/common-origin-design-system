/**
 * SEO & Meta Tag Utilities
 *
 * Comprehensive SEO management system for Common Origin website
 * including Open Graph, Twitter Cards, JSON-LD structured data,
 * and dynamic meta tag generation.
 */
import { __assign, __spreadArray } from "tslib";
/**
 * Default SEO configuration for the site
 */
export var DEFAULT_SEO = {
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
    twitterSite: '@commonorigin',
    robots: 'index, follow',
    language: 'en-US',
};
/**
 * SEO configuration for different page types
 */
export var PAGE_SEO_CONFIGS = {
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
};
/**
 * Generate SEO configuration for music releases
 */
export var generateMusicReleaseSEO = function (release) {
    var _a;
    var artistText = release.artist ? "".concat(release.artist, " - ") : '';
    var title = "".concat(artistText).concat(release.title, " | Common Origin");
    var description = release.description ||
        "Listen to ".concat(release.title).concat(release.artist ? " by ".concat(release.artist) : '', " on Common Origin. ").concat(release.recordLabel ? "Released on ".concat(release.recordLabel, ".") : '', " Electronic music release featuring ").concat(((_a = release.tracks) === null || _a === void 0 ? void 0 : _a.length) || 'multiple', " tracks.");
    return {
        title: title,
        description: description,
        keywords: __spreadArray([
            'electronic music',
            'music release',
            release.title.toLowerCase()
        ], (release.artist ? [release.artist.toLowerCase()] : []), true),
        ogTitle: title,
        ogDescription: description,
        ogType: 'music.album',
        ogImage: release.coverImage,
        ogImageAlt: "".concat(release.title, " album cover"),
        ogUrl: "/releases/".concat(release.slug),
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: release.coverImage,
        twitterImageAlt: "".concat(release.title, " album cover"),
        canonical: "/releases/".concat(release.slug),
        structuredData: generateMusicReleaseSchema(release),
    };
};
/**
 * Generate SEO configuration for portfolio items
 */
export var generatePortfolioSEO = function (project) {
    var title = "".concat(project.title, " | Portfolio | Common Origin");
    var description = project.description ||
        "Case study and portfolio piece: ".concat(project.title, ". Creative design work by Common Origin showcasing innovative solutions and design thinking.");
    return {
        title: title,
        description: description,
        keywords: __spreadArray(['design portfolio', 'case study', project.title.toLowerCase()], (project.tags || []), true),
        ogTitle: title,
        ogDescription: description,
        ogType: 'article',
        ogImage: project.coverImage,
        ogImageAlt: "".concat(project.title, " project preview"),
        ogUrl: "/posts/".concat(project.slug),
        twitterCard: 'summary_large_image',
        twitterTitle: title,
        twitterDescription: description,
        twitterImage: project.coverImage,
        twitterImageAlt: "".concat(project.title, " project preview"),
        canonical: "/posts/".concat(project.slug),
        structuredData: generatePortfolioSchema(project),
    };
};
/**
 * Generate structured data for music releases
 */
export var generateMusicReleaseSchema = function (release) {
    var schema = {
        '@context': 'https://schema.org',
        '@type': release.tracks && release.tracks.length > 1 ? 'MusicAlbum' : 'MusicRecording',
        name: release.title,
        description: release.description,
        url: "https://commonorigin.dev/releases/".concat(release.slug),
        datePublished: release.date,
        genre: ['Electronic', 'Experimental'], // Default genres, could be made dynamic
    };
    if (release.coverImage) {
        schema.image = [release.coverImage];
    }
    if (release.artist) {
        schema.byArtist = {
            '@type': 'MusicGroup',
            name: release.artist,
            url: 'https://commonorigin.dev', // Update with actual domain
        };
    }
    if (release.recordLabel) {
        schema.recordLabel = {
            '@type': 'Organization',
            name: release.recordLabel,
        };
    }
    if (release.tracks && release.tracks.length > 0) {
        schema.track = release.tracks.map(function (track, index) { return ({
            '@type': 'MusicRecording',
            name: track.title,
            position: index + 1,
            duration: track.duration,
        }); });
    }
    return schema;
};
/**
 * Generate structured data for portfolio projects
 */
export var generatePortfolioSchema = function (project) {
    var schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: "https://commonorigin.dev/posts/".concat(project.slug),
        dateCreated: project.date,
        creator: {
            '@type': 'Organization',
            name: 'Common Origin',
            url: 'https://commonorigin.dev', // Update with actual domain
        },
    };
    if (project.coverImage) {
        schema.image = [project.coverImage];
    }
    if (project.tags && project.tags.length > 0) {
        schema.about = project.tags;
    }
    return schema;
};
/**
 * Organization schema for Common Origin
 */
export var ORGANIZATION_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Common Origin',
    description: 'Creativity studio specializing in music, design, and technology',
    url: 'https://commonorigin.dev',
    logo: 'https://commonorigin.dev/assets/logo/co-logo-white.svg',
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
};
/**
 * Generate canonical URL
 */
export var generateCanonicalUrl = function (path) {
    var baseUrl = 'https://commonorigin.dev'; // Update with actual domain
    return "".concat(baseUrl).concat(path.startsWith('/') ? path : "/".concat(path));
};
/**
 * Merge SEO configurations
 */
export var mergeSEOConfig = function (base, override) {
    return __assign(__assign(__assign({}, base), override), { keywords: __spreadArray(__spreadArray([], (base.keywords || []), true), (override.keywords || []), true).filter(function (keyword, index, arr) { return arr.indexOf(keyword) === index; }) });
};
//# sourceMappingURL=seo.js.map