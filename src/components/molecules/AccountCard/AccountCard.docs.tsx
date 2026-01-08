import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { AccountCard } from './AccountCard'
import { Stack } from '../../atoms/Stack'

export const accountCardDocs: ComponentDocumentation = {
  id: 'account-card',
  name: 'AccountCard',
  description: 'Feature-rich account card displaying account type, name, balance, trend indicator, and action buttons. Minimum 300x200px with elevation shadow and optional interactive states. Ideal for dashboard account overviews and financial summaries.',
  category: 'Molecules',
  
  props: [
    {
      name: 'accountType',
      type: "'checking' | 'savings' | 'credit' | 'investment' | 'loan'",
      required: true,
      description: 'Type of account determining the icon displayed in the header'
    },
    {
      name: 'accountName',
      type: 'string',
      required: true,
      description: 'Display name of the account shown as h4 heading'
    },
    {
      name: 'balance',
      type: 'number',
      required: true,
      description: 'Account balance displayed in large xlarge size with bold weight'
    },
    {
      name: 'accountNumber',
      type: 'string',
      required: false,
      description: 'Last 4 digits of account number shown as •••• 1234 in subdued caption text'
    },
    {
      name: 'trend',
      type: "'up' | 'down' | 'neutral'",
      required: false,
      description: 'Trend direction showing balance change with directional arrow icon'
    },
    {
      name: 'trendValue',
      type: 'string',
      required: false,
      description: 'Trend value text (e.g., "+2.5%" or "$150") displayed with trend icon'
    },
    {
      name: 'action',
      type: "{ label: string; onClick: () => void; icon?: IconName; variant?: 'primary' | 'secondary' | 'naked' }",
      required: false,
      description: 'Primary action button with label, click handler, optional icon and variant'
    },
    {
      name: 'secondaryAction',
      type: "{ label: string; onClick: () => void; icon?: IconName; variant?: 'primary' | 'secondary' | 'naked' }",
      required: false,
      description: 'Secondary action button (defaults to naked variant) with label and click handler'
    },
    {
      name: 'currency',
      type: 'string',
      required: false,
      default: "'AUD'",
      description: 'Currency code for balance display (passed to MoneyDisplay component)'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler making entire card interactive with hover, active, and focus states'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier. Propagates to balance and action buttons with suffixes.'
    }
  ],

  tokens: [
    'semantic.spacing.layout.lg',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.xs',
    'semantic.color.background.surface',
    'semantic.color.background.inverse',
    'semantic.color.border.default',
    'semantic.border.radius.md',
    'semantic.color.icon.interactive',
    'semantic.color.icon.inverse',
    'semantic.color.text.subdued',
    'semantic.color.text.success',
    'semantic.color.text.error',
    'semantic.typography.h4',
    'semantic.typography.caption'
  ],

  examples: [
    {
      name: 'Checking Account',
      description: 'Basic checking account with positive balance.',
      code: `<AccountCard
  accountType="checking"
  accountName="Personal Checking"
  balance={5432.10}
  accountNumber="1234"
/>`,
      renderComponent: () => (
        <AccountCard
          accountType="checking"
          accountName="Personal Checking"
          balance={5432.10}
          accountNumber="1234"
        />
      )
    },
    {
      name: 'Savings with Upward Trend',
      description: 'Savings account showing positive growth trend.',
      code: `<AccountCard
  accountType="savings"
  accountName="Emergency Fund"
  balance={12500.00}
  accountNumber="5678"
  trend="up"
  trendValue="+2.5%"
  action={{
    label: 'Deposit',
    onClick: () => console.log('Deposit'),
    icon: 'add'
  }}
/>`,
      renderComponent: () => (
        <AccountCard
          accountType="savings"
          accountName="Emergency Fund"
          balance={12500.00}
          accountNumber="5678"
          trend="up"
          trendValue="+2.5%"
          action={{
            label: 'Deposit',
            onClick: () => console.log('Deposit'),
            icon: 'add'
          }}
        />
      )
    },
    {
      name: 'Credit Card with Balance Due',
      description: 'Credit card showing negative balance (debt) with downward trend.',
      code: `<AccountCard
  accountType="credit"
  accountName="Platinum Card"
  balance={-1234.56}
  accountNumber="9012"
  trend="down"
  trendValue="-15% from limit"
  action={{
    label: 'Pay Now',
    onClick: () => console.log('Pay'),
    variant: 'primary'
  }}
  secondaryAction={{
    label: 'View Transactions',
    onClick: () => console.log('View')
  }}
/>`,
      renderComponent: () => (
        <AccountCard
          accountType="credit"
          accountName="Platinum Card"
          balance={-1234.56}
          accountNumber="9012"
          trend="down"
          trendValue="-15% from limit"
          action={{
            label: 'Pay Now',
            onClick: () => console.log('Pay'),
            variant: 'primary'
          }}
          secondaryAction={{
            label: 'View Transactions',
            onClick: () => console.log('View')
          }}
        />
      )
    },
    {
      name: 'Investment Account',
      description: 'Investment account with neutral trend and actions.',
      code: `<AccountCard
  accountType="investment"
  accountName="Growth Portfolio"
  balance={45678.90}
  trend="neutral"
  trendValue="0.0% today"
  action={{
    label: 'Trade',
    onClick: () => console.log('Trade'),
    variant: 'primary'
  }}
  secondaryAction={{
    label: 'Reports',
    onClick: () => console.log('Reports')
  }}
/>`,
      renderComponent: () => (
        <AccountCard
          accountType="investment"
          accountName="Growth Portfolio"
          balance={45678.90}
          trend="neutral"
          trendValue="0.0% today"
          action={{
            label: 'Trade',
            onClick: () => console.log('Trade'),
            variant: 'primary'
          }}
          secondaryAction={{
            label: 'Reports',
            onClick: () => console.log('Reports')
          }}
        />
      )
    },
    {
      name: 'Interactive Card',
      description: 'Clickable card with hover and focus states.',
      code: `<AccountCard
  accountType="checking"
  accountName="Business Checking"
  balance={25000.00}
  accountNumber="3456"
  trend="up"
  trendValue="+$1,250"
  onClick={() => alert('Card clicked - navigate to details')}
/>`,
      renderComponent: () => (
        <AccountCard
          accountType="checking"
          accountName="Business Checking"
          balance={25000.00}
          accountNumber="3456"
          trend="up"
          trendValue="+$1,250"
          onClick={() => alert('Card clicked - navigate to details')}
        />
      )
    },
    {
      name: 'Account Grid',
      description: 'Multiple account cards in a responsive grid layout.',
      code: `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
  <AccountCard
    accountType="checking"
    accountName="Checking"
    balance={5432.10}
    trend="up"
    trendValue="+$150"
  />
  <AccountCard
    accountType="savings"
    accountName="Savings"
    balance={12500.00}
    trend="up"
    trendValue="+2.5%"
  />
  <AccountCard
    accountType="credit"
    accountName="Credit Card"
    balance={-1234.56}
    trend="down"
    trendValue="-15%"
  />
</div>`,
      renderComponent: () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          <AccountCard
            accountType="checking"
            accountName="Checking"
            balance={5432.10}
            trend="up"
            trendValue="+$150"
          />
          <AccountCard
            accountType="savings"
            accountName="Savings"
            balance={12500.00}
            trend="up"
            trendValue="+2.5%"
          />
          <AccountCard
            accountType="credit"
            accountName="Credit Card"
            balance={-1234.56}
            trend="down"
            trendValue="-15%"
          />
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses role="article" for non-interactive cards and role="button" for clickable cards',
      'Keyboard accessible with Tab, Enter, and Space key support for interactive cards',
      'Descriptive aria-label on clickable cards includes account name and balance',
      'Account type icon has descriptive aria-label',
      'Trend icon has descriptive aria-label indicating direction',
      'Focus visible outline with 2px border and offset meets WCAG 2.2 AA',
      'Action buttons maintain full keyboard and screen reader accessibility',
      'Card elevation and hover states provide visual feedback for interactivity',
      'Trend colors (green/red) provide additional context but not sole indicator'
    ],
    keyboardNavigation: 'Tab: Focus card (if clickable) or actions | Enter/Space: Activate card onClick | Tab through action buttons',
    screenReader: 'Announces account type, name, balance, optional account number, trend information, and available actions',
    focusManagement: 'Interactive cards receive focus with visible outline. Action buttons maintain independent focus states.',
    colorContrast: 'All text and icons meet WCAG AA contrast (4.5:1). Trend colors provide context but text labels ensure clarity'
  },

  anatomy: {
    description: 'Card container with header section, balance display, optional trend, and action buttons',
    diagram: `
┌──────────────────────────────────────┐
│ Box (300x200 min)                    │
│ ┌──────────────────────────────────┐ │
│ │ StyledHeader                     │ │
│ │  ┌────┐  Account Name            │ │
│ │  │Icon│  •••• 1234               │ │
│ │  └────┘                          │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ BalanceSection                   │ │
│ │  Balance (caption, subdued)      │ │
│ │  $12,345.67 (xlarge, bold)       │ │
│ │  ↑ +2.5% (xs icon + caption)     │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ StyledActions                    │ │
│ │  [Primary Button] [Secondary]    │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Box (Card Container)',
        description: 'Root Box component with min dimensions, padding, border, and shadow',
        tokens: [
          'semantic.spacing.layout.lg',
          'semantic.color.background.surface',
          'semantic.color.border.default'
        ]
      },
      {
        name: 'StyledHeader',
        description: 'Header section with flex layout containing icon and account name/number',
        tokens: ['semantic.spacing.layout.md']
      },
      {
        name: 'StyledIconWrapper',
        description: 'Icon container with inverse background color, rounded corners, and fixed dimensions (40x40px)',
        tokens: [
          'semantic.color.background.inverse',
          'semantic.border.radius.md',
          'semantic.color.icon.interactive'
        ]
      },
      {
        name: 'Account Type Icon',
        description: 'Medium-sized icon indicating account type with inverse color',
        tokens: ['semantic.color.icon.inverse']
      },
      {
        name: 'Account Name',
        description: 'H4 heading for account display name',
        tokens: ['semantic.typography.h4']
      },
      {
        name: 'Account Number',
        description: 'Optional last 4 digits in subdued caption text with bullet prefix',
        tokens: ['semantic.typography.caption', 'semantic.color.text.subdued']
      },
      {
        name: 'StyledBalanceSection',
        description: 'Balance display area with label, amount, and optional trend',
        tokens: ['semantic.spacing.layout.lg']
      },
      {
        name: 'Balance Label',
        description: 'Caption text reading "Balance" in subdued color',
        tokens: ['semantic.typography.caption', 'semantic.color.text.subdued']
      },
      {
        name: 'MoneyDisplay',
        description: 'Large balance display (xlarge size, bold weight) with currency formatting',
        tokens: []
      },
      {
        name: 'StyledTrendSection',
        description: 'Trend indicator with directional icon and value text',
        tokens: ['semantic.spacing.layout.xs', 'semantic.spacing.layout.sm']
      },
      {
        name: 'Trend Icon',
        description: 'Small directional arrow (up/down/right) with semantic color',
        tokens: ['semantic.color.text.success', 'semantic.color.text.error', 'semantic.color.text.subdued']
      },
      {
        name: 'Trend Value',
        description: 'Caption text showing trend percentage or amount with matching color',
        tokens: ['semantic.typography.caption']
      },
      {
        name: 'StyledActions',
        description: 'Action button container with flex layout and equal-width buttons',
        tokens: ['semantic.spacing.layout.sm']
      }
    ]
  },

  notes: [
    'Composes from Stack, Box, Icon, Typography, MoneyDisplay, and Button atoms',
    'Minimum dimensions 300x200px ensure consistent card sizes in grids',
    'Elevation shadow provides depth and hierarchy',
    'Interactive cards have enhanced hover shadow and slight lift transform',
    'Account type icons use placeholder icons until custom financial icons added',
    'Trend indicators use directional arrows with semantic colors (green=up, red=down, gray=neutral)',
    'Action buttons expand to fill available width with equal distribution',
    'Primary action defaults to primary variant, secondary to naked variant',
    'Balance displayed in xlarge bold for prominent visibility',
    'Account number masked with bullets (••••) for security indication',
    'Works in grid layouts with responsive wrapping',
    'data-testid propagates to balance and action buttons for testing'
  ]
}
