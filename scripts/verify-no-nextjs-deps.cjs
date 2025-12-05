#!/usr/bin/env node

const { execSync } = require('child_process')
const { existsSync } = require('fs')

console.log('🔍 Verifying no Next.js imports in dist...\n')

if (!existsSync('./dist')) {
  console.error('❌ Error: dist/ directory not found. Run npm run build:package first.')
  process.exit(1)
}

let hasErrors = false

// Check for Next.js imports in JS files
try {
  const grepResult = execSync(
    `grep -r "from 'next" dist/*.js dist/**/*.js 2>/dev/null || true`,
    { encoding: 'utf-8' }
  )

  if (grepResult.trim()) {
    console.error('❌ VERIFICATION FAILED!\n')
    console.error('Found Next.js imports in dist files:\n')
    console.error(grepResult)
    hasErrors = true
  }
} catch (error) {
  // Grep returns non-zero when no matches, which is what we want
}

// Check for Next.js imports with double quotes
try {
  const grepResult2 = execSync(
    `grep -r 'from "next' dist/*.js dist/**/*.js 2>/dev/null || true`,
    { encoding: 'utf-8' }
  )

  if (grepResult2.trim()) {
    console.error('❌ VERIFICATION FAILED!\n')
    console.error('Found Next.js imports in dist files:\n')
    console.error(grepResult2)
    hasErrors = true
  }
} catch (error) {
  // Grep returns non-zero when no matches, which is what we want
}

// Check for next/ references in general
try {
  const grepResult3 = execSync(
    `grep -r "next/" dist/*.js dist/**/*.js 2>/dev/null || true`,
    { encoding: 'utf-8' }
  )

  if (grepResult3.trim()) {
    console.error('❌ VERIFICATION FAILED!\n')
    console.error('Found next/ references in dist files:\n')
    console.error(grepResult3)
    hasErrors = true
  }
} catch (error) {
  // Grep returns non-zero when no matches, which is what we want
}

if (hasErrors) {
  console.error('\n❌ Next.js imports should be externalized in rollup.config.js')
  console.error('Components should be framework-agnostic.')
  process.exit(1)
}

console.log('✅ No Next.js imports found in dist files')
console.log('✅ Package is framework-agnostic')
console.log('\n📦 Package is ready for publishing!')
