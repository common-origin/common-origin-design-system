import React from 'react'
import Head from 'next/head'
import { HOME_OG_IMAGE_URL } from '../lib/constants'

export const Meta: React.FC = () => {
  return (
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
      
      {/* RSS feed */}
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      
      {/* SEO meta tags */}
      <meta
        name="description"
        content="Common Origin is a creativity studio that specializes in music, design, and technology."
      />
      <meta name="keywords" content="music, design, technology, creativity studio, electronic music, creative agency" />
      <meta name="author" content="Common Origin" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph meta tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Common Origin" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <meta property="og:image:alt" content="Common Origin - Creativity Studio" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
      <meta name="twitter:image:alt" content="Common Origin - Creativity Studio" />
    </Head>
  )
}
