import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.next/**',
      'coverage/**',
      'public/**',
      '.rollup.cache/**',
      'next-env.d.ts',
      'src/styles/tokens.d.ts',
      'lib/tokens.js',
      'src/lib/tokens.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.node },
    },
  },
  reactHooks.configs.flat['recommended-latest'] ?? reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'jest.setup.js'],
    languageOptions: { globals: { ...globals.jest } },
  },
  {
    // jest.mock factories are hoisted, so they must use require()
    files: ['jest.setup.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: { ...globals.node } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  // Known backlog: warnings, not errors, so CI passes today. `npm run lint` uses --max-warnings,
  // so the count can only go down. Promote each rule to 'error' once its warnings are fixed.
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
      // React Compiler rules: fixing these changes component behaviour, so each needs its own PR with tests.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
  {
    // Hotjar snippet — being removed or gated in #33
    files: ['pages/_app.tsx'],
    rules: { '@typescript-eslint/ban-ts-comment': 'warn', 'prefer-rest-params': 'warn' },
  },
  {
    // Latent bugs in dead custom transforms — removed in the Style Dictionary migration (#24, step 2)
    files: ['config/style-dictionary.config.js'],
    rules: { 'no-undef': 'warn', 'no-useless-escape': 'warn', 'no-constant-binary-expression': 'warn' },
  },
)
