import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  // Main package build
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'auto',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        exports: 'auto',
        sourcemap: true,
      },
    ],
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
        include: ['src/tokens.ts', 'src/styles/**/*'],
        exclude: ['**/*.test.*', '**/*.docs.*'],
      }),
    ],
  },
]