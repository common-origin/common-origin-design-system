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
  // Separate entries: spreading both presets into one object would let jsx-runtime's `rules` replace recommended's.
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    ...react.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    ...react.configs.flat['jsx-runtime'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    rules: {
      // Quotes and apostrophes in JSX text render fine; still catch the characters that signal JSX typos.
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    },
  },
  {
    // TypeScript already checks props
    files: ['**/*.{ts,tsx}'],
    rules: { 'react/prop-types': 'off' },
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
    // jest.mock factories are hoisted, so they must use require(); the mocked components aren't typed
    files: ['jest.setup.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off', 'react/prop-types': 'off' },
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
    // Decision 0014: components never use base tokens; they use semantic or component tokens.
    // Also covers src/lib/styleUtils.ts, which ships in the package and styles components.
    files: ['src/components/**/*.{ts,tsx}', 'src/lib/styleUtils.ts'],
    ignores: ['**/*.docs.tsx', '**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "MemberExpression[object.name='tokens'][property.name='base']",
          message: 'Components must not use base tokens (decision 0014). Use a semantic or component token.',
        },
        {
          selector: "VariableDeclarator[init.name='tokens'] > ObjectPattern > Property[key.name='base']",
          message: 'Components must not use base tokens (decision 0014). Use a semantic or component token.',
        },
      ],
    },
  },
  {
    // Latent bugs in dead custom transforms — removed in the Style Dictionary migration (#24, step 2)
    files: ['config/style-dictionary.config.js'],
    rules: { 'no-undef': 'warn', 'no-useless-escape': 'warn', 'no-constant-binary-expression': 'warn' },
  },
)
