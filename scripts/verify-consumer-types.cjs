#!/usr/bin/env node

/**
 * Type-checks a throwaway consumer project against the built package under node10, node16 and
 * bundler module resolution, with `resolveJsonModule` off and `skipLibCheck` off.
 * `@ts-expect-error` lines fail the check if any exported type has silently become `any`.
 */

const { execFileSync } = require('child_process')
const { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync, existsSync } = require('fs')
const { join } = require('path')
const { tmpdir } = require('os')

const ROOT = join(__dirname, '..')
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc')

if (!existsSync(join(ROOT, 'dist', 'index.d.ts'))) {
  console.error('❌ dist/ not found. Run npm run build:package first.')
  process.exit(1)
}

// Default import of the tokens entry. Excluded under node16 ESM: the ESM build is `.js` in a package
// without "type": "module", so Node-native ESM types it as CJS. Tracked in #41 (package build).
const defaultImportSource = `
import tokensOnly from '@common-origin/design-system/tokens'

export const standalone: string = tokensOnly.semantic.color.text.default
// @ts-expect-error unknown token path
tokensOnly.semantic.color.text.doesNotExist
`

const consumerSource = `
import {
  Box, Button, Icon, ResponsiveGrid, iconsData, tokens,
  type IconName, type Tokens, type TokensBase, type TokensComponent,
} from '@common-origin/design-system'
import { tokens as namedTokens, type TokensSemantic } from '@common-origin/design-system/tokens'

// Each exported type must be a real type, not any: invalid accesses must error.
export function exportedTypesAreNotAny(t: Tokens, b: TokensBase, s: TokensSemantic, c: TokensComponent) {
  // @ts-expect-error Tokens has no such key
  t.notATier
  // @ts-expect-error TokensBase has no such key
  b.notABaseGroup
  // @ts-expect-error TokensSemantic has no such key
  s.notASemanticGroup
  // @ts-expect-error TokensComponent has no such key
  c.notAComponent
  // @ts-expect-error iconsData is keyed by IconName
  iconsData.notAnIcon
  // @ts-expect-error icon metadata has no such field
  iconsData.add.notAField
}

const text: string = tokens.semantic.color.text.default
const standalone: string = namedTokens.semantic.color.text.default
const semantic: TokensSemantic = namedTokens.semantic
const whole: Tokens = tokens
const icon: IconName = 'add'
const path: string = iconsData.add.path

// @ts-expect-error token values are strings, not numbers
const notNumber: number = tokens.semantic.color.text.default
// @ts-expect-error unknown token path
namedTokens.semantic.color.text.doesNotExist
// @ts-expect-error unknown icon name
const badIcon: IconName = 'not-an-icon'

export const App = () => (
  <Box p="md" bg="default">
    <ResponsiveGrid cols={1} gap="4">
      <Button variant="primary">{text}{standalone}{String(semantic)}{String(whole)}{path}</Button>
      <Icon name={icon} />
      {/* @ts-expect-error gap must be a spacing token key */}
      <ResponsiveGrid cols={1} gap="huge">{notNumber}{badIcon}</ResponsiveGrid>
      {/* @ts-expect-error p must be a layout spacing token key */}
      <Box p="enormous" />
    </ResponsiveGrid>
  </Box>
)
`

const modes = [
  { name: 'node10', module: 'commonjs', moduleResolution: 'node10', type: 'commonjs', defaultImport: true },
  { name: 'node16 (CJS)', module: 'node16', moduleResolution: 'node16', type: 'commonjs', defaultImport: true },
  { name: 'node16 (ESM)', module: 'node16', moduleResolution: 'node16', type: 'module', defaultImport: false },
  { name: 'bundler', module: 'esnext', moduleResolution: 'bundler', type: 'module', defaultImport: true },
]

const dir = mkdtempSync(join(tmpdir(), 'co-consumer-'))
let failed = false

try {
  const nm = join(dir, 'node_modules')
  mkdirSync(join(nm, '@common-origin'), { recursive: true })
  mkdirSync(join(nm, '@types'), { recursive: true })
  symlinkSync(ROOT, join(nm, '@common-origin', 'design-system'), 'dir')
  for (const name of ['react', 'react-dom', 'styled-components', 'date-fns']) {
    symlinkSync(join(ROOT, 'node_modules', name), join(nm, name), 'dir')
  }
  for (const name of ['react', 'react-dom']) {
    symlinkSync(join(ROOT, 'node_modules', '@types', name), join(nm, '@types', name), 'dir')
  }
  writeFileSync(join(dir, 'app.tsx'), consumerSource)
  writeFileSync(join(dir, 'default-import.ts'), defaultImportSource)

  for (const mode of modes) {
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: 'consumer', private: true, type: mode.type }))
    writeFileSync(
      join(dir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          noEmit: true,
          jsx: 'react-jsx',
          esModuleInterop: true,
          skipLibCheck: false,
          resolveJsonModule: false,
          module: mode.module,
          moduleResolution: mode.moduleResolution,
          target: 'es2020',
          types: [],
        },
        files: mode.defaultImport ? ['app.tsx', 'default-import.ts'] : ['app.tsx'],
      }),
    )
    try {
      execFileSync(process.execPath, [TSC, '-p', dir], { stdio: 'pipe', encoding: 'utf8' })
      console.log(`✅ ${mode.name}`)
    } catch (error) {
      failed = true
      console.error(`❌ ${mode.name}\n${(error.stdout || '') + (error.stderr || '')}`.replaceAll(dir + '/', ''))
    }
  }
} finally {
  rmSync(dir, { recursive: true, force: true })
}

if (failed) {
  console.error('\nConsumer type check failed — published types are broken for at least one resolution mode.')
  process.exit(1)
}
console.log('Consumer type check passed in all resolution modes.')
