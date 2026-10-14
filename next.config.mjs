/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  
  // Turbopack configuration (required for Next.js 16+)
  turbopack: {},

  // next dev appends a Next.js rules block to CLAUDE.md when it detects a coding agent.
  // The repo's agent instructions live in CLAUDE.md and docs/foundation, so keep it out.
  agentRules: false,
  
  typescript: {
    // Ignore build errors during development
    ignoreBuildErrors: false,
    // Custom tsconfig path
    tsconfigPath: './tsconfig.json'
  },
  
  // Configure the base path if this will be deployed as a subdirectory
  // basePath: '/design-system',
  
  // Static export for GitHub Pages or similar hosting
  // output: 'export',
  // trailingSlash: true,
  
}

export default nextConfig