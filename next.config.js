/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true
  },
  // Configure the base path if this will be deployed as a subdirectory
  // basePath: '/design-system',
  
  // Static export for GitHub Pages or similar hosting
  // output: 'export',
  // trailingSlash: true,
  
  webpack: (config) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  }
}

module.exports = nextConfig