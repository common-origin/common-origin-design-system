# Bundle Optimization & Distribution Guide

## Overview
This guide covers strategies for optimizing bundle size, managing multiple build targets, and ensuring efficient distribution of the Common Origin Design System package.

## Package Distribution Architecture

### Multi-Target Build Strategy
```json
{
  "main": "./dist/cjs/index.js",
  "module": "./dist/esm/index.js",
  "types": "./dist/types/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./tokens": {
      "import": "./dist/esm/tokens/index.js",
      "require": "./dist/cjs/tokens/index.js",
      "types": "./dist/types/tokens/index.d.ts"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist/",
    "README.md",
    "CHANGELOG.md"
  ],
  "sideEffects": false
}
```

### Build Target Configurations

#### ESM (ES Modules) Build
```javascript
// rollup.config.esm.js
import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist/esm',
    format: 'es',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named'
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.build.json',
      outDir: 'dist/esm',
      declarationDir: 'dist/types'
    })
  ],
  external: ['react', 'react-dom', 'styled-components']
})
```

#### CommonJS Build
```javascript
// rollup.config.cjs.js
export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist/cjs',
    format: 'cjs',
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named'
  },
  plugins: [
    // Same plugins as ESM
    typescript({
      tsconfig: 'tsconfig.build.json',
      outDir: 'dist/cjs',
      declaration: false // Only generate types once
    })
  ]
})
```

## Tree Shaking Optimization

### Component Export Strategy
```typescript
// src/index.ts - Avoid barrel exports for better tree shaking
export { Button } from './components/atoms/Button'
export { Typography } from './components/atoms/Typography'
export { Stack } from './components/atoms/Stack'
// ... explicit exports only

// Alternative: Conditional exports for different use cases
export * from './components/atoms' // All atoms
export * from './components/molecules' // All molecules
```

### Individual Component Exports
```typescript
// src/components/atoms/index.ts
export { Button } from './Button'
export { Typography } from './Typography'
export { Stack } from './Stack'
// Avoid: export * from './Button' (reduces tree shaking effectiveness)
```

### Bundle Analysis Configuration
```javascript
// rollup.config.analysis.js
import { visualizer } from 'rollup-plugin-visualizer'
import bundleSize from 'rollup-plugin-bundle-size'

export default {
  // ... existing config
  plugins: [
    // ... existing plugins
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    bundleSize()
  ]
}
```

## Performance Optimization Patterns

### Lazy Loading Strategies
```typescript
// For large components that aren't always needed
const LazyComplexComponent = React.lazy(() => 
  import('./ComplexComponent').then(module => ({
    default: module.ComplexComponent
  }))
)

// Usage with Suspense
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComplexComponent />
  </Suspense>
)
```

### Code Splitting by Feature
```typescript
// Separate token exports for selective importing
// src/tokens/index.ts
export { colorTokens } from './color'
export { spacingTokens } from './spacing'
export { typographyTokens } from './typography'

// Allow consumers to import only what they need
import { colorTokens } from '@common-origin/design-system/tokens'
```

### Styled Components Optimization
```typescript
// Optimize styled-components for better performance
import styled, { css } from 'styled-components'

// Use css helper for complex styles
const complexStyles = css<{ $variant: string }>`
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'primary':
        return css`
          background: ${theme.semantic.color.background.primary};
          color: ${theme.semantic.color.text.inverse};
        `
      case 'secondary':
        return css`
          background: ${theme.semantic.color.background.secondary};
          color: ${theme.semantic.color.text.default};
        `
      default:
        return css`
          background: transparent;
          color: ${theme.semantic.color.text.default};
        `
    }
  }}
`

const OptimizedComponent = styled.button<{ $variant: string }>`
  ${complexStyles}
`
```

## Peer Dependencies Management

### Package.json Configuration
```json
{
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0",
    "styled-components": ">=5.3.0"
  },
  "peerDependenciesMeta": {
    "styled-components": {
      "optional": false
    }
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "styled-components": "^6.1.1"
  }
}
```

### Peer Dependency Validation
```typescript
// src/utils/validatePeerDeps.ts
const validatePeerDependencies = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      require('react')
      require('react-dom')
      require('styled-components')
    } catch (error) {
      console.error(
        'Missing required peer dependencies. Please install:',
        '\nnpm install react react-dom styled-components'
      )
    }
  }
}

// Call in main export
validatePeerDependencies()
```

## Build Process Optimization

### TypeScript Build Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist/types",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.*", "**/*.stories.*"]
}
```

### Build Script Optimization
```javascript
// scripts/build.js
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const buildSteps = [
  {
    name: 'Clean dist',
    command: 'rm -rf dist'
  },
  {
    name: 'Build tokens',
    command: 'npm run build:tokens'
  },
  {
    name: 'Build ESM',
    command: 'rollup -c rollup.config.esm.js'
  },
  {
    name: 'Build CJS',
    command: 'rollup -c rollup.config.cjs.js'
  },
  {
    name: 'Build types',
    command: 'tsc --project tsconfig.build.json'
  },
  {
    name: 'Generate package.json files',
    command: 'node scripts/generatePackageJson.js'
  }
]

console.log('🚀 Building design system package...\n')

buildSteps.forEach(({ name, command }) => {
  console.log(`📦 ${name}...`)
  try {
    execSync(command, { stdio: 'inherit' })
    console.log(`✅ ${name} complete\n`)
  } catch (error) {
    console.error(`❌ ${name} failed:`, error.message)
    process.exit(1)
  }
})

console.log('🎉 Build complete!')
```

## Package Size Monitoring

### Bundle Size Limits
```json
{
  "bundlesize": [
    {
      "path": "./dist/esm/index.js",
      "maxSize": "50kb"
    },
    {
      "path": "./dist/esm/components/atoms/Button/index.js",
      "maxSize": "5kb"
    },
    {
      "path": "./dist/esm/tokens/index.js",
      "maxSize": "10kb"
    }
  ]
}
```

### Automated Size Tracking
```javascript
// scripts/trackBundleSize.js
const fs = require('fs')
const path = require('path')
const { gzipSync } = require('zlib')

const getFileSize = (filePath) => {
  const content = fs.readFileSync(filePath)
  const gzipped = gzipSync(content)
  
  return {
    raw: content.length,
    gzipped: gzipped.length
  }
}

const trackBundleSizes = () => {
  const files = [
    'dist/esm/index.js',
    'dist/cjs/index.js',
    'dist/esm/tokens/index.js'
  ]
  
  const sizes = files.map(file => ({
    file,
    ...getFileSize(file)
  }))
  
  console.table(sizes)
  
  // Save to file for tracking
  fs.writeFileSync(
    'bundle-sizes.json',
    JSON.stringify({ timestamp: new Date().toISOString(), sizes }, null, 2)
  )
}

trackBundleSizes()
```

## Consumer Integration Patterns

### Installation Documentation
```markdown
## Installation

### NPM
```bash
npm install @common-origin/design-system react react-dom styled-components
```

### Yarn
```bash
yarn add @common-origin/design-system react react-dom styled-components
```

### Peer Dependencies
Ensure you have the required peer dependencies:
- React 17.0.0 or higher
- React DOM 17.0.0 or higher  
- Styled Components 5.3.0 or higher
```

### Usage Examples for Different Bundlers

#### Webpack Configuration
```javascript
// webpack.config.js
module.exports = {
  // ... other config
  resolve: {
    mainFields: ['module', 'main']
  },
  optimization: {
    usedExports: true,
    sideEffects: false
  }
}
```

#### Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['@common-origin/design-system']
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components']
    }
  }
})
```

#### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  transpilePackages: ['@common-origin/design-system'],
  compiler: {
    styledComponents: true
  }
}
```

## Testing Distribution

### Package Testing Setup
```javascript
// tests/package-integration.test.js
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

describe('Package Distribution', () => {
  beforeAll(() => {
    // Create temporary test project
    execSync('mkdir -p tmp/test-project')
    process.chdir('tmp/test-project')
    
    // Initialize package.json
    execSync('npm init -y')
    
    // Install built package
    execSync('npm install ../../dist')
  })
  
  afterAll(() => {
    // Cleanup
    process.chdir('../../')
    execSync('rm -rf tmp')
  })
  
  test('package can be imported', () => {
    const testFile = `
      const { Button, Typography } = require('@common-origin/design-system')
      console.log('Import successful:', typeof Button, typeof Typography)
    `
    
    fs.writeFileSync('test-import.js', testFile)
    const output = execSync('node test-import.js', { encoding: 'utf8' })
    expect(output).toContain('Import successful: function function')
  })
  
  test('ESM import works', () => {
    const testFile = `
      import { Button, Typography } from '@common-origin/design-system'
      console.log('ESM import successful:', typeof Button, typeof Typography)
    `
    
    fs.writeFileSync('test-esm.mjs', testFile)
    const output = execSync('node test-esm.mjs', { encoding: 'utf8' })
    expect(output).toContain('ESM import successful: function function')
  })
})
```

### Consumer App Testing
```tsx
// Create minimal React app for testing
const TestApp = () => {
  return (
    <TokenThemeProvider>
      <Stack direction="column" gap="md">
        <Typography variant="h1">Test App</Typography>
        <Button variant="primary" onClick={() => console.log('clicked')}>
          Test Button
        </Button>
      </Stack>
    </TokenThemeProvider>
  )
}

// Test that it renders without errors
test('design system components work in consumer app', () => {
  render(<TestApp />)
  expect(screen.getByText('Test App')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument()
})
```

## Version Management & Releases

### Semantic Versioning Strategy
```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes (component API changes, token removals)
MINOR: New features (new components, new tokens)
PATCH: Bug fixes, documentation updates
```

### Automated Release Process
```javascript
// scripts/release.js
const { execSync } = require('child_process')
const semver = require('semver')

const currentVersion = require('../package.json').version
const releaseType = process.argv[2] // patch, minor, major

const newVersion = semver.inc(currentVersion, releaseType)

console.log(`Releasing v${newVersion}...`)

const releaseSteps = [
  'npm run test',
  'npm run build',
  'npm run build:package',
  `npm version ${releaseType}`,
  'git push origin main --tags',
  'npm publish --access public'
]

releaseSteps.forEach(command => {
  console.log(`Running: ${command}`)
  execSync(command, { stdio: 'inherit' })
})

console.log(`🎉 Released v${newVersion}!`)
```

This comprehensive distribution strategy ensures optimal bundle sizes, broad compatibility, and reliable package consumption across different environments and build tools.