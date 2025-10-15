import React from 'react';
import Head from 'next/head';
import { SITE_CONFIG } from '../lib/seoConfig';
/**
 * Automatic SEO Component
 *
 * Just pass your content and it handles all SEO automatically.
 * No SEO knowledge required!
 */
export var AutoSEO = function (_a) {
    var title = _a.title, description = _a.description, image = _a.image, _b = _a.type, type = _b === void 0 ? 'website' : _b, _c = _a.path, path = _c === void 0 ? '' : _c, _d = _a.noindex, noindex = _d === void 0 ? false : _d, canonicalUrl = _a.canonicalUrl;
    // Auto-generate everything
    var fullTitle = title ? "".concat(title, " | ").concat(SITE_CONFIG.name) : SITE_CONFIG.defaultTitle;
    var fullDescription = description || SITE_CONFIG.defaultDescription;
    var fullImage = image || SITE_CONFIG.defaultOgImage;
    var fullUrl = canonicalUrl || "".concat(SITE_CONFIG.url).concat(path);
    // Convert relative image paths to absolute
    var absoluteImage = fullImage.startsWith('http') ? fullImage : "".concat(SITE_CONFIG.url).concat(fullImage);
    return (<Head>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription}/>
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'}/>
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl}/>
      
      {/* Open Graph (Facebook, etc.) */}
      <meta property="og:type" content={type}/>
      <meta property="og:title" content={fullTitle}/>
      <meta property="og:description" content={fullDescription}/>
      <meta property="og:url" content={fullUrl}/>
      <meta property="og:image" content={absoluteImage}/>
      <meta property="og:site_name" content={SITE_CONFIG.name}/>
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={fullTitle}/>
      <meta name="twitter:description" content={fullDescription}/>
      <meta name="twitter:image" content={absoluteImage}/>
      {SITE_CONFIG.twitter && <meta name="twitter:site" content={SITE_CONFIG.twitter}/>}
      
      {/* Music-specific meta for releases */}
      {type === 'music' && (<>
          <meta property="og:type" content="music.album"/>
          <meta property="music:duration" content="180"/>
          <meta property="music:album:disc" content="1"/>
        </>)}
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
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
                    logo: "".concat(SITE_CONFIG.url).concat(SITE_CONFIG.logo),
                },
            })
        }}/>
    </Head>);
};
export default AutoSEO;
//# sourceMappingURL=autoSEO.jsx.map