import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import copy from 'rollup-plugin-copy'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
    output: [mainOutput('cjs', ''), mainOutput('esm', '.esm')],
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
    copy({
      targets: [
        { src: 'src/styles/icons.json', dest: 'dist/styles' },
        { src: 'src/styles/tokens.json', dest: 'dist/styles' }
      ]
    }),
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
      declaration: true,
      declarationDir: 'dist',
      include: [
        'src/index.ts',
        'src/types/**/*',
        'src/styles/**/*',
        'src/lib/styleUtils.ts',
        'src/components/index.ts',
        'src/components/dateFormatter.tsx',
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
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
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
        file: 'dist/tokens/index.esm.js',
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
        declaration: true,
        declarationDir: 'dist/tokens',
        include: ['src/tokens.ts', 'src/types/tokens.ts', 'src/styles/**/*'],
        exclude: ['**/*.test.*', '**/*.docs.*'],
      }),
    ],
  },
]