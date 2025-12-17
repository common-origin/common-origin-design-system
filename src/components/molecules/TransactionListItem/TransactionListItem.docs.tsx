import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { TransactionListItem } from './TransactionListItem'
import { Stack } from '../../atoms/Stack'

export const transactionListItemDocs: ComponentDocumentation = {
  id: 'transaction-list-item',
  name: 'TransactionListItem',
  description: 'Comprehensive transaction list item displaying merchant info, amount, date, status, and metadata. Supports interactive states, status badges, category icons, and attachment indicators. Minimum height 72px with full keyboard accessibility.',
  category: 'Molecules',
  
  props: [
    {
      name: 'merchant',
      type: 'string',
      required: true,
      description: 'Merchant or transaction name displayed as primary text with medium weight'
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      description: 'Transaction amount. Positive values shown as income (green), negative as expenses (red)'
    },
    {
      name: 'date',
      type: 'Date | string',
      required: true,
      description: 'Transaction date formatted using smart mode (Today/Yesterday/day names)'
    },
    {
      name: 'status',
      type: "'completed' | 'pending' | 'failed'",
      required: false,
      default: "'completed'",
      description: 'Transaction status. Pending shows orange badge dot, failed shows red badge, completed shows no badge'
    },
    {
      name: 'category',
      type: "'shopping' | 'dining' | 'transport' | 'entertainment' | 'bills' | 'other'",
      required: false,
      description: 'Transaction category shown as icon next to merchant name'
    },
    {
      name: 'merchantLogo',
      type: 'string',
      required: false,
      description: 'URL for merchant logo displayed in avatar. Falls back to merchant initials if not provided'
    },
    {
      name: 'description',
      type: 'string',
      required: false,
      description: 'Optional description or note displayed below merchant name in subdued caption text'
    },
    {
      name: 'hasReceipt',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether transaction has attached receipt. Shows document icon indicator when true'
    },
    {
      name: 'hasNote',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether transaction has attached notes. Shows note icon indicator when true'
    },
    {
      name: 'currency',
      type: 'string',
      required: false,
      default: "'AUD'",
      description: 'Currency code for amount display (passed to MoneyDisplay component)'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler making the item interactive. Adds hover/active states and keyboard support'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier. Propagates to amount and date with suffixes for targeted testing'
    }
  ],

  tokens: [
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.xs',
    'semantic.color.background.default',
    'semantic.color.background.interactive-hover',
    'semantic.color.background.interactive-active',
    'semantic.color.border.default',
    'semantic.color.border.interactive',
    'semantic.color.icon.subdued',
    'semantic.typography.body',
    'semantic.typography.caption'
  ],

  examples: [
    {
      name: 'Basic Expense Transaction',
      description: 'Simple expense transaction with negative amount.',
      code: `<TransactionListItem
  merchant="Coffee Shop"
  amount={-4.50}
  date={new Date()}
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Coffee Shop"
          amount={-4.50}
          date={new Date()}
        />
      )
    },
    {
      name: 'Income Transaction',
      description: 'Positive amount shown in green with plus sign.',
      code: `<TransactionListItem
  merchant="Salary Deposit"
  amount={2500.00}
  date={new Date()}
  category="other"
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Salary Deposit"
          amount={2500.00}
          date={new Date()}
          category="other"
        />
      )
    },
    {
      name: 'Pending Transaction',
      description: 'Transaction with pending status showing orange badge dot.',
      code: `<TransactionListItem
  merchant="Online Store"
  amount={-125.99}
  date={new Date()}
  status="pending"
  category="shopping"
  description="Order #12345"
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Online Store"
          amount={-125.99}
          date={new Date()}
          status="pending"
          category="shopping"
          description="Order #12345"
        />
      )
    },
    {
      name: 'Failed Transaction',
      description: 'Transaction with failed status showing red error badge.',
      code: `<TransactionListItem
  merchant="Gas Station"
  amount={-65.00}
  date={new Date()}
  status="failed"
  category="transport"
  description="Payment declined"
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Gas Station"
          amount={-65.00}
          date={new Date()}
          status="failed"
          category="transport"
          description="Payment declined"
        />
      )
    },
    {
      name: 'With Category and Metadata',
      description: 'Transaction with category icon, receipt, and note indicators.',
      code: `<TransactionListItem
  merchant="Restaurant"
  amount={-87.50}
  date={new Date()}
  category="dining"
  description="Dinner with team"
  hasReceipt
  hasNote
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Restaurant"
          amount={-87.50}
          date={new Date()}
          category="dining"
          description="Dinner with team"
          hasReceipt
          hasNote
        />
      )
    },
    {
      name: 'Interactive Transaction',
      description: 'Clickable transaction with hover and focus states.',
      code: `<TransactionListItem
  merchant="Grocery Store"
  amount={-156.23}
  date={new Date()}
  category="shopping"
  description="Weekly groceries"
  onClick={() => alert('Transaction clicked')}
/>`,
      renderComponent: () => (
        <TransactionListItem
          merchant="Grocery Store"
          amount={-156.23}
          date={new Date()}
          category="shopping"
          description="Weekly groceries"
          onClick={() => alert('Transaction clicked')}
        />
      )
    },
    {
      name: 'Transaction List',
      description: 'Multiple transactions in a list context.',
      code: `<Stack direction="column" gap="none">
  <TransactionListItem
    merchant="Coffee Shop"
    amount={-4.50}
    date={new Date()}
    category="dining"
    onClick={() => console.log('Coffee clicked')}
  />
  <TransactionListItem
    merchant="Subway"
    amount={-3.20}
    date={new Date()}
    status="pending"
    category="transport"
    onClick={() => console.log('Subway clicked')}
  />
  <TransactionListItem
    merchant="Supermarket"
    amount={-87.65}
    date={new Date()}
    category="shopping"
    hasReceipt
    onClick={() => console.log('Supermarket clicked')}
  />
  <TransactionListItem
    merchant="Freelance Payment"
    amount={500.00}
    date={new Date()}
    category="other"
    description="Project #456"
    onClick={() => console.log('Payment clicked')}
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="none">
          <TransactionListItem
            merchant="Coffee Shop"
            amount={-4.50}
            date={new Date()}
            category="dining"
            onClick={() => console.log('Coffee clicked')}
          />
          <TransactionListItem
            merchant="Subway"
            amount={-3.20}
            date={new Date()}
            status="pending"
            category="transport"
            onClick={() => console.log('Subway clicked')}
          />
          <TransactionListItem
            merchant="Supermarket"
            amount={-87.65}
            date={new Date()}
            category="shopping"
            hasReceipt
            onClick={() => console.log('Supermarket clicked')}
          />
          <TransactionListItem
            merchant="Freelance Payment"
            amount={500.00}
            date={new Date()}
            category="other"
            description="Project #456"
            onClick={() => console.log('Payment clicked')}
          />
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses role="button" for interactive items with onClick handler',
      'Keyboard accessible with Tab, Enter, and Space key support',
      'Descriptive aria-label on clickable items includes merchant, type (expense/income), and amount',
      'Status badges have descriptive aria-labels (Pending/Failed transaction)',
      'Category icons have aria-labels describing the category',
      'Metadata icons (receipt, note) have aria-labels for screen reader users',
      'Focus visible outline meets WCAG 2.2 AA requirements',
      'Color is not sole indicator - badges, icons, and text provide redundant information',
      'Text truncation preserves readability for long merchant names and descriptions'
    ],
    keyboardNavigation: 'Tab: Focus item (if clickable) | Enter/Space: Activate onClick handler',
    screenReader: 'Announces merchant name, transaction type (expense/income), amount, date, status, category, and metadata indicators',
    focusManagement: 'Interactive items receive focus with visible outline. Focus order follows visual layout.',
    colorContrast: 'All text and icons meet WCAG AA contrast (4.5:1). Amount colors (green/red) provide additional visual context but not sole indicator'
  },

  anatomy: {
    description: 'Horizontal layout with avatar section and main content area containing two rows of information',
    diagram: `
┌──────────────────────────────────────────────────────┐
│ StyledContainer (min-height: 72px)                   │
│                                                      │
│  ┌─────────┐  ┌────────────────────────────────┐   │
│  │ Avatar  │  │ StyledMainContent              │   │
│  │ Section │  │                                │   │
│  │         │  │  ┌──────────────────────────┐  │   │
│  │ [Logo/  │  │  │ TopRow                   │  │   │
│  │ Initials│  │  │ [Icon] Merchant  Amount  │  │   │
│  │ +Badge] │  │  └──────────────────────────┘  │   │
│  │         │  │                                │   │
│  └─────────┘  │  ┌──────────────────────────┐  │   │
│               │  │ BottomRow                │  │   │
│               │  │ Date • Desc  [Receipt][Note]│  │
│               │  └──────────────────────────┘  │   │
│               └────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'StyledContainer',
        description: 'Root container with flexbox layout, min-height 72px, interactive states (hover/active/focus)',
        tokens: [
          'semantic.spacing.layout.md',
          'semantic.color.background.default',
          'semantic.color.background.interactive-hover',
          'semantic.color.background.interactive-active',
          'semantic.color.border.default',
          'semantic.color.border.interactive'
        ]
      },
      {
        name: 'StyledAvatarSection',
        description: 'Fixed-width section containing Avatar with optional status Badge overlay',
        tokens: []
      },
      {
        name: 'Avatar',
        description: 'Merchant logo or initials with medium size (40px)',
        tokens: []
      },
      {
        name: 'Badge (Status)',
        description: 'Dot badge overlay on avatar for pending status, inline badge for failed status',
        tokens: []
      },
      {
        name: 'StyledMainContent',
        description: 'Flexible content area with two-row layout for transaction details',
        tokens: ['semantic.spacing.layout.xs']
      },
      {
        name: 'TopRow',
        description: 'First row containing merchant info and amount with space-between justification',
        tokens: ['semantic.spacing.layout.sm']
      },
      {
        name: 'MerchantSection',
        description: 'Left section with category icon, merchant name (truncated), and failed badge',
        tokens: ['semantic.spacing.layout.xs']
      },
      {
        name: 'Category Icon',
        description: 'Small icon indicating transaction category',
        tokens: ['semantic.color.icon.subdued']
      },
      {
        name: 'Merchant Typography',
        description: 'Body text with medium weight, truncates with ellipsis for long names',
        tokens: ['semantic.typography.body']
      },
      {
        name: 'MoneyDisplay',
        description: 'Amount with automatic variant (positive/negative), sign display, medium size',
        tokens: []
      },
      {
        name: 'BottomRow',
        description: 'Second row containing date/description and metadata indicators',
        tokens: ['semantic.spacing.layout.sm']
      },
      {
        name: 'DateFormatter',
        description: 'Smart-formatted date (Today/Yesterday/day names)',
        tokens: []
      },
      {
        name: 'Description',
        description: 'Optional subdued caption text with bullet separator, truncates if long',
        tokens: ['semantic.typography.caption']
      },
      {
        name: 'Metadata Icons',
        description: 'Small icons for receipt and note attachments',
        tokens: ['semantic.spacing.layout.xs', 'semantic.color.icon.subdued']
      }
    ]
  },

  notes: [
    'Composes from Avatar, Badge, MoneyDisplay, Icon, DateFormatter, Typography',
    'Minimum height 72px ensures consistent touch targets and visual rhythm',
    'Interactive items have hover, active, and focus states with proper styling',
    'Keyboard navigation supports Enter and Space for activation',
    'Status badges use dot indicators (pending) or inline badges (failed)',
    'Category icons use placeholder icons until custom icons added',
    'Text truncation prevents layout breakage with long merchant names',
    'Amount automatically styled: negative=red, positive=green, zero=default',
    'Smart date formatting shows relative dates (Today/Yesterday) for recent transactions',
    'Metadata icons (receipt, note) appear in bottom-right for visual balance',
    'Works in lists with no gap - borders provide separation between items',
    'data-testid propagates to amount and date for comprehensive test coverage'
  ]
}
