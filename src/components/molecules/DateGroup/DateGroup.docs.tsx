import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { DateGroup } from './DateGroup'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

export const dateGroupDocs: ComponentDocumentation = {
  id: 'date-group',
  name: 'DateGroup',
  description: 'Groups related content under a formatted date header with optional total amount and item count. Commonly used for transaction lists, activity feeds, and chronological data. Supports sticky headers for scrollable lists.',
  category: 'Molecules',
  
  props: [
    {
      name: 'date',
      type: 'Date | string',
      required: true,
      description: 'Date for this group header. Formats using DateFormatter component with specified mode.'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Content to render under the date header, typically a list of transactions or items'
    },
    {
      name: 'format',
      type: "'absolute' | 'relative' | 'smart'",
      required: false,
      default: "'smart'",
      description: 'Date formatting mode: absolute (full date), relative (X days ago), smart (Today/Yesterday/day names)'
    },
    {
      name: 'showTotal',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether to display total amount for this date group'
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: false,
      description: 'Total monetary amount for this date group (displayed with sign indicator if showTotal is true)'
    },
    {
      name: 'showCount',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether to display count of items in this group'
    },
    {
      name: 'count',
      type: 'number',
      required: false,
      description: 'Number of items in this date group (displayed with proper pluralization if showCount is true)'
    },
    {
      name: 'sticky',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Makes header sticky at top of container during scroll (useful for long lists)'
    },
    {
      name: 'currency',
      type: 'string',
      required: false,
      default: "'AUD'",
      description: 'Currency code for total amount display (passed to MoneyDisplay component)'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for automated testing. Propagates to header, date, total, count, and content sections.'
    }
  ],

  tokens: [
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.sm',
    'semantic.color.background.default',
    'semantic.color.border.default',
    'semantic.shadow.sm',
    'semantic.typography.body',
    'semantic.typography.caption'
  ],

  examples: [
    {
      name: 'Basic Date Group',
      description: 'Simple date header with transaction list.',
      code: `<DateGroup date={new Date()}>
  <Stack direction="column" gap="none">
    <Typography>Coffee Shop - $4.50</Typography>
    <Typography>Grocery Store - $87.25</Typography>
    <Typography>Gas Station - $65.00</Typography>
  </Stack>
</DateGroup>`,
      renderComponent: () => (
        <DateGroup date={new Date()}>
          <Stack direction="column" gap="sm">
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Coffee Shop - $4.50</Typography>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Grocery Store - $87.25</Typography>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Gas Station - $65.00</Typography>
            </div>
          </Stack>
        </DateGroup>
      )
    },
    {
      name: 'With Total and Count',
      description: 'Date group showing total amount and item count.',
      code: `<DateGroup 
  date={new Date()} 
  showTotal 
  totalAmount={-156.75}
  showCount
  count={3}
>
  <Stack direction="column" gap="none">
    <Typography>Coffee Shop - $4.50</Typography>
    <Typography>Grocery Store - $87.25</Typography>
    <Typography>Gas Station - $65.00</Typography>
  </Stack>
</DateGroup>`,
      renderComponent: () => (
        <DateGroup 
          date={new Date()} 
          showTotal 
          totalAmount={-156.75}
          showCount
          count={3}
        >
          <Stack direction="column" gap="sm">
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Coffee Shop - $4.50</Typography>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Grocery Store - $87.25</Typography>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Gas Station - $65.00</Typography>
            </div>
          </Stack>
        </DateGroup>
      )
    },
    {
      name: 'Sticky Header',
      description: 'Date group with sticky header for scrolling lists.',
      code: `<div style={{ height: '300px', overflow: 'auto' }}>
  <DateGroup 
    date={new Date()} 
    sticky
    showTotal
    totalAmount={-245.50}
  >
    <Stack direction="column" gap="none">
      {Array.from({ length: 20 }, (_, i) => (
        <Typography key={i}>Transaction {i + 1}</Typography>
      ))}
    </Stack>
  </DateGroup>
</div>`,
      renderComponent: () => (
        <div style={{ height: '300px', overflow: 'auto', border: '1px solid #eee' }}>
          <DateGroup 
            date={new Date()} 
            sticky
            showTotal
            totalAmount={-245.50}
          >
            <Stack direction="column" gap="sm">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
                  <Typography>Transaction {i + 1} - $12.50</Typography>
                </div>
              ))}
            </Stack>
          </DateGroup>
        </div>
      )
    },
    {
      name: 'Smart Date Formatting',
      description: 'Demonstrating smart date formatting with Today/Yesterday.',
      code: `<Stack direction="column" gap="lg">
  <DateGroup date={new Date()} format="smart">
    <Typography>Today's transactions</Typography>
  </DateGroup>
  
  <DateGroup 
    date={new Date(Date.now() - 86400000)} 
    format="smart"
  >
    <Typography>Yesterday's transactions</Typography>
  </DateGroup>
  
  <DateGroup 
    date={new Date('2024-01-01')} 
    format="absolute"
  >
    <Typography>Older transactions</Typography>
  </DateGroup>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <DateGroup date={new Date()} format="smart">
            <div style={{ padding: '12px 16px' }}>
              <Typography>Today's transactions</Typography>
            </div>
          </DateGroup>
          
          <DateGroup 
            date={new Date(Date.now() - 86400000)} 
            format="smart"
          >
            <div style={{ padding: '12px 16px' }}>
              <Typography>Yesterday's transactions</Typography>
            </div>
          </DateGroup>
          
          <DateGroup 
            date={new Date('2024-01-01')} 
            format="absolute"
          >
            <div style={{ padding: '12px 16px' }}>
              <Typography>Older transactions</Typography>
            </div>
          </DateGroup>
        </Stack>
      )
    },
    {
      name: 'Positive Total (Income)',
      description: 'Date group with positive total amount shown in green.',
      code: `<DateGroup 
  date={new Date()} 
  showTotal 
  totalAmount={1250.00}
  showCount
  count={2}
>
  <Stack direction="column" gap="none">
    <Typography>Salary Deposit - $1000.00</Typography>
    <Typography>Refund - $250.00</Typography>
  </Stack>
</DateGroup>`,
      renderComponent: () => (
        <DateGroup 
          date={new Date()} 
          showTotal 
          totalAmount={1250.00}
          showCount
          count={2}
        >
          <Stack direction="column" gap="sm">
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Salary Deposit - $1000.00</Typography>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>
              <Typography>Refund - $250.00</Typography>
            </div>
          </Stack>
        </DateGroup>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic role="group" for proper content grouping',
      'Descriptive aria-label on group includes date context',
      'Sticky header maintains accessibility during scroll',
      'MoneyDisplay component provides proper aria-labels for amounts',
      'DateFormatter component ensures consistent date reading',
      'Proper color contrast for all text elements (WCAG 2.2 AA)',
      'Item count uses caption typography for clear hierarchy'
    ],
    keyboardNavigation: 'No interactive elements in header - keyboard navigation flows through children naturally',
    screenReader: 'Announces as group with date context, reads header information (date, count, total) before child content',
    focusManagement: 'Focus management handled by child components (e.g., transaction items)',
    colorContrast: 'Total amount colors (positive green, negative red) meet WCAG AA contrast requirements against background'
  },

  anatomy: {
    description: 'Two-part structure with sticky-capable header and flexible content area',
    diagram: `
┌────────────────────────────────────────────┐
│ StyledHeader (sticky optional)             │
│ ┌────────────────┐  ┌──────────────────┐  │
│ │ LeftSection    │  │ RightSection     │  │
│ │ [Date] (Count) │  │ [Total Amount]   │  │
│ └────────────────┘  └──────────────────┘  │
└────────────────────────────────────────────┘
┌────────────────────────────────────────────┐
│ StyledContent                              │
│                                            │
│  {children}                                │
│  (Transaction items, etc.)                 │
│                                            │
└────────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'StyledHeader',
        description: 'Header container with flexbox layout, border, and optional sticky positioning',
        tokens: [
          'semantic.spacing.layout.md',
          'semantic.spacing.layout.sm',
          'semantic.color.background.default',
          'semantic.color.border.default',
          'semantic.shadow.sm'
        ]
      },
      {
        name: 'StyledLeftSection',
        description: 'Left-aligned section containing DateFormatter and optional item count',
        tokens: ['semantic.spacing.layout.sm']
      },
      {
        name: 'DateFormatter',
        description: 'Date display with configurable formatting mode (smart/absolute/relative)',
        tokens: ['semantic.typography.body']
      },
      {
        name: 'Count Display',
        description: 'Optional item count in parentheses with subdued color and caption typography',
        tokens: ['semantic.typography.caption']
      },
      {
        name: 'StyledRightSection',
        description: 'Right-aligned section containing optional total amount display',
        tokens: ['semantic.spacing.layout.md']
      },
      {
        name: 'MoneyDisplay (Total)',
        description: 'Total amount with automatic variant (positive/negative/default) and sign display',
        tokens: []
      },
      {
        name: 'StyledContent',
        description: 'Content container for children (transactions, items, etc.)',
        tokens: []
      }
    ]
  },

  notes: [
    'Composes from DateFormatter, MoneyDisplay, Stack, and Typography atoms',
    'Smart date formatting ideal for recent transactions (Today/Yesterday)',
    'Total amount automatically styled: positive=green, negative=red, zero=default',
    'Sticky header useful for long scrolling lists - maintains context',
    'Item count displays with proper pluralization (1 item vs. 2 items)',
    'Header border provides clear visual separation',
    'Flexible content area accepts any children (typically transaction items)',
    'data-testid propagates to all major sections for easy testing',
    'Currency prop passed to MoneyDisplay for international support',
    'Works with both Date objects and ISO date strings'
  ]
}
