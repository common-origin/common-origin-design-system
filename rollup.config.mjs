import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { fileURLToPath } from 'url'
import { basename, dirname } from 'path'
import { copyFile, mkdir } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ships the raw JSON data files in dist/styles. Inline rather than rollup-plugin-copy,
// whose glob dependencies carry an unpatched advisory (braces, GHSA-vfj7-8cjw-p6xm).
const copyFiles = (files, dest) => ({
  name: 'copy-files',
  async buildEnd() {
    await mkdir(dest, { recursive: true })
    await Promise.all(files.map((file) => copyFile(file, `${dest}/${basename(file)}`)))
  },
})

// React Server Components (Next.js App Router) support.
// Components use hooks and styled-components, so they must be Client Components.
// Rollup strips module-level directives, so the build splits the main entry into:
// - the entry (index.js / index.esm.js): no directive, only re-exports
// - a "client" chunk with every component, which starts with 'use client'
// - a "data" chunk with tokens and icon data, with no directive
// A Server Component can then render components (as client references) and still
// read `tokens` and `iconsData` from the main entry as plain data. The separate
// tokens entry below stays directive-free too.
const USE_CLIENT = "'use client';"

// The ESM build ships one module per source file (decision 0042), so a consumer bundles only the
// components it imports. Component and lib modules start with 'use client'; the entry, data and
// tokens modules don't, so Server Components can read them.
const isClientModule = (id) => Boolean(id) && /[\\/]src[\\/](components|lib)[\\/]/.test(id)

// styled-components has no ESM entry for Node, so Node's own ESM loader hands a default import
// the CommonJS module object, with the function on its `default` property; bundlers hand over the
// function. Normalise the default import in the ESM output so native Node ESM works too (decision
// 0042). ES5-safe: the function is always truthy.
const styledDefaultInterop = () => ({
  name: 'styled-default-interop',
  renderChunk(code) {
    const match = code.match(/import (\w+)((?:, \{[^}]*\})?) from 'styled-components';/)
    if (!match) return null
    const [statement, name, named] = match
    return code.replace(statement, `import ${name}$module${named} from 'styled-components';\nconst ${name} = ${name}$module.default || ${name}$module;`)
  },
})

const esmModules = {
  dir: 'dist',
  format: 'esm',
  sourcemap: true,
  preserveModules: true,
  preserveModulesRoot: 'src',
  // npm pack drops nested node_modules folders, so bundled helpers (tslib) go to vendor/
  entryFileNames: (chunk) => `${chunk.name.replace(/(^|\/)node_modules\//g, '$1vendor/')}.mjs`,
  banner: (chunk) => (isClientModule(chunk.facadeModuleId) ? USE_CLIENT : ''),
  plugins: [styledDefaultInterop()],
}
const DATA_MODULES = /[\\/]src[\\/](styles[\\/][^\\/]+\.json|types[\\/](tokens|icons)\.ts)$/

const mainChunks = (id) => {
  if (id.includes('node_modules') || id.startsWith('\0')) return undefined
  if (DATA_MODULES.test(id)) return 'data'
  if (id.endsWith('/src/index.ts')) return undefined
  return 'client'
}

const mainOutput = (format, suffix) => ({
  dir: 'dist',
  format,
  exports: 'auto',
  // Externals like styled-components ship CJS as { __esModule, default }. 'auto'
  // makes require() consumers use .default for those instead of the whole module.
  interop: 'auto',
  sourcemap: true,
  entryFileNames: `index${suffix}.js`,
  chunkFileNames: `[name]${suffix}.js`,
  manualChunks: mainChunks,
  banner: (chunk) => (chunk.name === 'client' ? USE_CLIENT : ''),
})

export default [
  // Main package build
  {
    input: 'src/index.ts',
    // CommonJS stays one bundle; ESM is per module (decision 0042)
    output: [mainOutput('cjs', ''), esmModules],
  external: [
    'react',
    'react-dom',
    'styled-components',
    'next/image',
    'next/link',
    'date-fns',
  ],
  plugins: [
    peerDepsExternal(),
    json(),
    copyFiles(['src/styles/icons.json', 'src/styles/tokens.json'], 'dist/styles'),
    // CSS custom properties, published as @common-origin/design-system/tokens.css (decision 0017),
    // with the declaration that lets the side-effect import type-check
    copyFiles(['src/styles/tokens.css', 'src/styles/tokens.css.d.ts'], 'dist'),
    resolve({
      browser: true,
      preferBuiltins: false,
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      // The package keeps compiling to ES5 whatever tsconfig.json targets for the docs site;
      // changing what consumers receive is a separate decision.
      target: 'es5',
      declaration: true,
      declarationDir: 'dist',
      include: [
        'src/index.ts',
        'src/types/**/*',
        'src/styles/**/*',
        // Components read tokens as CSS variables through these two (decision 0041)
        'src/lib/cssTokens.ts',
        'src/lib/cssVariables.ts',
        'src/lib/styleUtils.ts',
        'src/lib/tokenAliases.ts',
        'src/lib/usePresence.ts',
        'src/components/index.ts',
        'src/components/atoms/**/*',
        'src/components/molecules/**/*',
        'src/components/layout/**/*',
      ],
      exclude: [
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.docs.tsx',
      ],
    }),
    babel({
      // All Babel config for the package lives here; there is no .babelrc.
      babelrc: false,
      configFile: false,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      // Stable displayName and componentId on every styled component (consumers' SSR relies on them)
      plugins: [
        ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false, pure: true }],
      ],
    }),
  ],
  },
  // Tokens-only build
  {
    input: 'src/tokens.ts',
    output: [
      {
        file: 'dist/tokens/index.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: 'dist/tokens/index.mjs',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    external: [],
    plugins: [
      json(),
      resolve({
        browser: false,
        preferBuiltins: false,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        target: 'es5',
        declaration: true,
        declarationDir: 'dist/tokens',
        include: ['src/tokens.ts', 'src/types/tokens.ts', 'src/styles/**/*'],
        exclude: ['**/*.test.*', '**/*.docs.*'],
      }),
    ],
  },
]