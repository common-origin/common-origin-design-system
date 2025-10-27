#!/usr/bin/env node

/**
 * Pre-publish verification script
 * 
 * Checks that no path aliases (@/) exist in generated .d.ts files.
 * Path aliases work internally but break in consuming projects.
 */

const { execSync } = require('child_process')
const { existsSync } = require('fs')
const { join } = require('path')

const DIST_DIR = join(__dirname, '../dist')

console.log('🔍 Verifying type definitions...\n')

// Check if dist directory exists
if (!existsSync(DIST_DIR)) {
  console.error('❌ Error: dist/ directory not found. Run npm run build:package first.')
  process.exit(1)
}

try {
  // Search for path aliases in .d.ts files
  const result = execSync(
    `grep -r "@/" dist/**/*.d.ts 2>/dev/null || true`,
    { encoding: 'utf-8', cwd: join(__dirname, '..') }
  )

  if (result.trim()) {
    console.error('❌ VERIFICATION FAILED!\n')
    console.error('Found path aliases (@/) in generated type definitions:')
    console.error(result)
    console.error('\nPath aliases don\'t work in consuming projects.')
    console.error('Fix: Use relative imports instead of @/ in source files.\n')
    console.error('See: .github/CONTRIBUTING.md for guidelines\n')
    process.exit(1)
  }

  console.log('✅ Type definition verification passed!')
  console.log('   No path aliases found in .d.ts files\n')
  process.exit(0)

} catch (error) {
  console.error('❌ Error during verification:', error.message)
  process.exit(1)
}
