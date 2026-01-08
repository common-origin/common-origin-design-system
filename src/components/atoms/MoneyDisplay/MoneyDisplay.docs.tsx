import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { MoneyDisplay } from './MoneyDisplay'
import { Stack } from '../Stack'

export const moneyDisplayDocs: ComponentDocumentation = {
  id: 'money-display',
  name: 'MoneyDisplay',
  description: 'Displays monetary amounts with consistent formatting, currency symbols, and semantic color coding. Uses icons (addRing/remove) for positive/negative indicators with colored styling. Uses Intl.NumberFormat for proper locale-based currency formatting with comprehensive accessibility support.',
  category: 'Atoms',
  
  props: [
    {
      name: 'amount',
      type: 'number',
      required: true,
      description: 'The monetary amount to display (positive or negative)'
    },
    {
      name: 'currency',
      type: 'string',
      required: false,
      default: "'AUD'",
      description: 'Currency code (ISO 4217 format like AUD, USD, EUR)'
    },
    {
      name: 'variant',
      type: "'default' | 'positive' | 'negative' | 'neutral'",
      required: false,
      default: "'default'",
      description: 'Visual variant affecting icon color: default (no icon), positive (green addRing icon for credits/income), negative (red remove icon for debits/expenses), neutral (gray text for informational)'
    },
    {
      name: 'showSign',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show icon indicator for positive/negative amounts. Positive shows green addRing icon, negative shows red remove icon. Negative amounts always show icon regardless.'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large' | 'xlarge'",
      required: false,
      default: "'medium'",
      description: 'Size variant: small (caption typography), medium (body typography), large (h3 typography), xlarge (h2 typography)'
    },
    {
      name: 'weight',
      type: "'regular' | 'medium' | 'bold'",
      required: false,
      default: "'regular'",
      description: 'Font weight for the displayed amount: regular (400), medium (500), bold (700)'
    },
    {
      name: 'locale',
      type: 'string',
      required: false,
      default: "'en-AU'",
      description: 'Locale for number formatting (affects decimal separator, thousands separator, currency symbol position)'
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      required: false,
      default: "'left'",
      description: 'Text alignment for the amount display'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing'
    }
  ],

  tokens: [
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.icon.success - Green color for positive/addRing icon',
    'semantic.color.icon.error - Red color for negative/remove icon',
    'semantic.size.icon.xs - Icon size for small amounts',
    'semantic.size.icon.sm - Icon size for medium amounts',
    'semantic.size.icon.md - Icon size for large amounts',
    'semantic.size.icon.lg - Icon size for xlarge amounts',
    'semantic.typography.caption',
    'semantic.typography.body',
    'semantic.typography.h3',
    'semantic.typography.h2'
  ],

  examples: [
    {
      name: 'Basic Amount',
      description: 'Simple monetary amount with default AUD formatting.',
      code: `<MoneyDisplay amount={100.50} />`,
      renderComponent: () => (
        <MoneyDisplay amount={100.50} />
      )
    },
    {
      name: 'Positive Transaction',
      description: 'Credit or income shown in green with + sign.',
      code: `<MoneyDisplay 
  amount={1250.00} 
  variant="positive" 
  showSign 
/>`,
      renderComponent: () => (
        <MoneyDisplay 
          amount={1250.00} 
          variant="positive" 
          showSign 
        />
      )
    },
    {
      name: 'Negative Transaction',
      description: 'Debit or expense shown in red.',
      code: `<MoneyDisplay 
  amount={-45.50} 
  variant="negative" 
/>`,
      renderComponent: () => (
        <MoneyDisplay 
          amount={-45.50} 
          variant="negative" 
        />
      )
    },
    {
      name: 'Large Balance',
      description: 'Account balance with large size and bold weight.',
      code: `<MoneyDisplay 
  amount={5280.42} 
  size="xlarge" 
  weight="bold" 
/>`,
      renderComponent: () => (
        <MoneyDisplay 
          amount={5280.42} 
          size="xlarge" 
          weight="bold" 
        />
      )
    },
    {
      name: 'Size Variants',
      description: 'Comparing different size options.',
      code: `<Stack direction="column" gap="md">
  <MoneyDisplay amount={99.99} size="small" />
  <MoneyDisplay amount={99.99} size="medium" />
  <MoneyDisplay amount={99.99} size="large" />
  <MoneyDisplay amount={99.99} size="xlarge" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <MoneyDisplay amount={99.99} size="small" />
          <MoneyDisplay amount={99.99} size="medium" />
          <MoneyDisplay amount={99.99} size="large" />
          <MoneyDisplay amount={99.99} size="xlarge" />
        </Stack>
      )
    },
    {
      name: 'Color Variants',
      description: 'Different semantic color meanings.',
      code: `<Stack direction="column" gap="md">
  <MoneyDisplay amount={250.00} variant="positive" showSign />
  <MoneyDisplay amount={-125.50} variant="negative" />
  <MoneyDisplay amount={1500.00} variant="default" />
  <MoneyDisplay amount={0.00} variant="neutral" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <MoneyDisplay amount={250.00} variant="positive" showSign />
          <MoneyDisplay amount={-125.50} variant="negative" />
          <MoneyDisplay amount={1500.00} variant="default" />
          <MoneyDisplay amount={0.00} variant="neutral" />
        </Stack>
      )
    },
    {
      name: 'Weight Variants',
      description: 'Different font weights for emphasis.',
      code: `<Stack direction="column" gap="md">
  <MoneyDisplay amount={99.99} weight="regular" />
  <MoneyDisplay amount={99.99} weight="medium" />
  <MoneyDisplay amount={99.99} weight="bold" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <MoneyDisplay amount={99.99} weight="regular" />
          <MoneyDisplay amount={99.99} weight="medium" />
          <MoneyDisplay amount={99.99} weight="bold" />
        </Stack>
      )
    },
    {
      name: 'Alignment Options',
      description: 'Text alignment for different layouts.',
      code: `<div style={{ width: '200px', border: '1px solid #e0e0e0' }}>
  <Stack direction="column" gap="sm">
    <MoneyDisplay amount={99.99} align="left" />
    <MoneyDisplay amount={99.99} align="center" />
    <MoneyDisplay amount={99.99} align="right" />
  </Stack>
</div>`,
      renderComponent: () => (
        <div style={{ width: '200px', border: '1px solid #e0e0e0' }}>
          <Stack direction="column" gap="sm">
            <MoneyDisplay amount={99.99} align="left" />
            <MoneyDisplay amount={99.99} align="center" />
            <MoneyDisplay amount={99.99} align="right" />
          </Stack>
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic HTML with Typography component for proper text rendering',
      'Provides comprehensive aria-label with spelled out amounts (e.g., "negative forty-five dollars and fifty cents")',
      'Color is not the only indicator - icons (addRing/remove) provide additional visual context',
      'Icons have their own aria-labels for screen reader accessibility',
      'Sufficient color contrast for all variants meeting WCAG 2.2 AA requirements',
      'Works correctly with screen readers announcing full amount with currency'
    ],
    keyboardNavigation: 'Not interactive - display component only',
    screenReader: 'Announces full amount with spelled out currency: "negative forty-five dollars and fifty cents"',
    focusManagement: 'Not focusable - static display component',
    colorContrast: 'All color variants meet WCAG AA contrast requirements (4.5:1 minimum)'
  },

  anatomy: {
    description: 'A flex wrapper that displays an optional sign icon followed by Typography for the amount.',
    diagram: `
┌───────────────────────────────────┐
│ StyledWrapper (inline-flex)       │
│  ┌────────┐  ┌─────────────────┐  │
│  │ Icon   │  │ Typography      │  │
│  │ +/−    │  │  $5,280.42      │  │
│  └────────┘  └─────────────────┘  │
└───────────────────────────────────┘
    `,
    parts: [
      {
        name: 'StyledWrapper',
        description: 'Outer span with inline-flex display for vertical centering of icon and text',
        tokens: []
      },
      {
        name: 'Icon (optional)',
        description: 'addRing icon for positive amounts, remove icon for negative amounts, with semantic colors',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm',
          'semantic.size.icon.md',
          'semantic.size.icon.lg',
          'semantic.color.icon.success',
          'semantic.color.icon.error'
        ]
      },
      {
        name: 'Typography',
        description: 'Inner Typography component with dynamic variant and font weight for the amount',
        tokens: [
          'semantic.typography.caption',
          'semantic.typography.body',
          'semantic.typography.h3',
          'semantic.typography.h2',
          'semantic.color.text.default',
          'semantic.color.text.subdued'
        ]
      }
    ]
  },

  notes: [
    'Uses Intl.NumberFormat for locale-aware currency formatting',
    'Defaults to AUD currency with en-AU locale for Australian market',
    'Automatically handles thousands separators based on locale',
    'Always displays two decimal places for monetary amounts',
    'Negative amounts always show remove icon, even without showSign prop',
    'Sign icons: addRing (circle with plus) for positive, remove (circle with minus) for negative',
    'Size prop maps to Typography variants: small→caption, medium→body, large→h3, xlarge→h2',
    'Variant colors use semantic financial tokens for consistency',
    'Composes from existing Typography component for reliable text rendering',
    'Aria-label provides full accessibility information for screen readers'
  ]
}
