import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CategoryBadge } from './CategoryBadge'

export const categoryBadgeDocs: ComponentDocumentation = {
  id: 'category-badge',
  name: 'CategoryBadge',
  description: 'A compact, color-coded badge for displaying transaction categories with customizable visual styles, optional icons, and interactive capabilities. Designed for financial applications requiring clear visual categorization with semantic color meanings.',
  category: 'Atoms',
  
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: 'The category label content to display inside the badge. Typically a short category name like "Shopping", "Food", "Transport", or "Entertainment".'
    },
    {
      name: 'color',
      type: "'blue' | 'purple' | 'pink' | 'yellow' | 'green' | 'red' | 'orange' | 'gray'",
      required: false,
      default: "'blue'",
      description: 'The semantic color of the badge, typically mapped to specific category types. Blue for general, purple for entertainment, pink for personal, yellow for transport, green for income, red for bills, orange for food, gray for uncategorized.'
    },
    {
      name: 'variant',
      type: "'filled' | 'outlined' | 'minimal'",
      required: false,
      default: "'filled'",
      description: 'The visual style variant. Filled for high emphasis (solid background), outlined for medium emphasis (bordered), minimal for low emphasis (subtle background).'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: "'medium'",
      description: 'The size of the badge affecting height, padding, and typography. Small (24px) for compact layouts like transaction list items, medium (32px) for standard use in forms and headers.'
    },
    {
      name: 'icon',
      type: 'IconName',
      required: false,
      default: 'undefined',
      description: 'Optional icon name to display before the label. Icons provide visual reinforcement of category meaning. Icon size automatically adjusts based on badge size.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Click handler that makes the badge interactive. When provided, the badge becomes a button with full keyboard support (Enter/Space), focus indicators, and hover states. Use for clickable category filters or navigation.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables interaction for clickable badges while maintaining visual context. When true, prevents onClick execution, keyboard activation, and applies 50% opacity with not-allowed cursor.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Accessible label providing additional context for screen readers. Useful when the visible label is abbreviated or when action context is needed (e.g., "Filter by shopping category").'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction verification. Supports consistent testing patterns across different badge states and variants.'
    }
  ],

  tokens: [
    'semantic.color.category.blue - Primary category color for general/default categories',
    'semantic.color.category.blue-emphasis - High contrast background for filled blue badges',
    'semantic.color.category.blue-subtle - Light background for minimal blue badges',
    'semantic.color.category.purple - Purple for entertainment and leisure categories',
    'semantic.color.category.purple-emphasis - Filled purple badge background',
    'semantic.color.category.purple-subtle - Minimal purple badge background',
    'semantic.color.category.pink - Pink for personal and lifestyle categories',
    'semantic.color.category.pink-emphasis - Filled pink badge background',
    'semantic.color.category.pink-subtle - Minimal pink badge background',
    'semantic.color.category.yellow - Yellow for transport and travel categories',
    'semantic.color.category.yellow-emphasis - Filled yellow badge background',
    'semantic.color.category.yellow-subtle - Minimal yellow badge background',
    'semantic.color.category.green - Green for income and positive financial categories',
    'semantic.color.category.green-emphasis - Filled green badge background',
    'semantic.color.category.green-subtle - Minimal green badge background',
    'semantic.color.category.red - Red for bills and required expenses',
    'semantic.color.category.red-emphasis - Filled red badge background',
    'semantic.color.category.red-subtle - Minimal red badge background',
    'semantic.color.category.orange - Orange for food and dining categories',
    'semantic.color.category.orange-emphasis - Filled orange badge background',
    'semantic.color.category.orange-subtle - Minimal orange badge background',
    'semantic.color.category.gray - Gray for uncategorized or neutral categories',
    'semantic.color.category.gray-emphasis - Filled gray badge background',
    'semantic.color.category.gray-subtle - Minimal gray badge background',
    'semantic.color.text.inverse - White text for filled variant badges',
    'base.spacing.1 - 2px padding for small size (horizontal)',
    'base.spacing.2 - 4px padding for small size (vertical)',
    'base.spacing.3 - 6px padding for medium size',
    'semantic.typography.caption - Typography for small size badges',
    'semantic.typography.small - Typography for medium size badges',
    'base.border.radius.pill - Fully rounded corners for badge shape',
    'base.border.width.1 - 1px border for outlined variant',
    'semantic.size.icon.xs - 12px icon size for small badges',
    'semantic.size.icon.sm - 16px icon size for medium badges',
    'base.spacing.1 - 2px gap between icon and label'
  ],

  examples: [
    {
      name: 'Category Badge Variants',
      description: 'Three visual styles for different emphasis levels. Filled for high priority categories, outlined for medium priority, and minimal for subtle categorization.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Filled (High Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" variant="filled">General</CategoryBadge>
      <CategoryBadge color="purple" variant="filled">Entertainment</CategoryBadge>
      <CategoryBadge color="green" variant="filled">Income</CategoryBadge>
      <CategoryBadge color="red" variant="filled">Bills</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Outlined (Medium Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" variant="outlined">General</CategoryBadge>
      <CategoryBadge color="purple" variant="outlined">Entertainment</CategoryBadge>
      <CategoryBadge color="green" variant="outlined">Income</CategoryBadge>
      <CategoryBadge color="red" variant="outlined">Bills</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Minimal (Low Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" variant="minimal">General</CategoryBadge>
      <CategoryBadge color="purple" variant="minimal">Entertainment</CategoryBadge>
      <CategoryBadge color="green" variant="minimal">Income</CategoryBadge>
      <CategoryBadge color="red" variant="minimal">Bills</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Filled (High Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" variant="filled">General</CategoryBadge>
              <CategoryBadge color="purple" variant="filled">Entertainment</CategoryBadge>
              <CategoryBadge color="green" variant="filled">Income</CategoryBadge>
              <CategoryBadge color="red" variant="filled">Bills</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Outlined (Medium Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" variant="outlined">General</CategoryBadge>
              <CategoryBadge color="purple" variant="outlined">Entertainment</CategoryBadge>
              <CategoryBadge color="green" variant="outlined">Income</CategoryBadge>
              <CategoryBadge color="red" variant="outlined">Bills</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Minimal (Low Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" variant="minimal">General</CategoryBadge>
              <CategoryBadge color="purple" variant="minimal">Entertainment</CategoryBadge>
              <CategoryBadge color="green" variant="minimal">Income</CategoryBadge>
              <CategoryBadge color="red" variant="minimal">Bills</CategoryBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'All Category Colors',
      description: 'Eight semantic colors designed for common financial transaction categories. Each color has distinct meaning and maintains WCAG AA contrast ratios across all variants.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryBadge color="blue">General</CategoryBadge>
    <CategoryBadge color="purple">Entertainment</CategoryBadge>
    <CategoryBadge color="pink">Personal</CategoryBadge>
    <CategoryBadge color="yellow">Transport</CategoryBadge>
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryBadge color="green">Income</CategoryBadge>
    <CategoryBadge color="red">Bills</CategoryBadge>
    <CategoryBadge color="orange">Food</CategoryBadge>
    <CategoryBadge color="gray">Uncategorized</CategoryBadge>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryBadge color="blue">General</CategoryBadge>
            <CategoryBadge color="purple">Entertainment</CategoryBadge>
            <CategoryBadge color="pink">Personal</CategoryBadge>
            <CategoryBadge color="yellow">Transport</CategoryBadge>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryBadge color="green">Income</CategoryBadge>
            <CategoryBadge color="red">Bills</CategoryBadge>
            <CategoryBadge color="orange">Food</CategoryBadge>
            <CategoryBadge color="gray">Uncategorized</CategoryBadge>
          </div>
        </div>
      )
    },
    {
      name: 'With Icons',
      description: 'Category badges with optional icons for enhanced visual recognition. Icons automatically size based on the badge size variant.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" icon="filter">Shopping</CategoryBadge>
      <CategoryBadge color="orange" icon="refresh">Food & Dining</CategoryBadge>
      <CategoryBadge color="yellow" icon="bell">Transport</CategoryBadge>
      <CategoryBadge color="green" icon="check">Income</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" icon="filter" size="small">Shopping</CategoryBadge>
      <CategoryBadge color="orange" icon="refresh" size="small">Food</CategoryBadge>
      <CategoryBadge color="yellow" icon="bell" size="small">Transport</CategoryBadge>
      <CategoryBadge color="green" icon="check" size="small">Income</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" icon="filter">Shopping</CategoryBadge>
              <CategoryBadge color="orange" icon="refresh">Food & Dining</CategoryBadge>
              <CategoryBadge color="yellow" icon="bell">Transport</CategoryBadge>
              <CategoryBadge color="green" icon="check">Income</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" icon="filter" size="small">Shopping</CategoryBadge>
              <CategoryBadge color="orange" icon="refresh" size="small">Food</CategoryBadge>
              <CategoryBadge color="yellow" icon="bell" size="small">Transport</CategoryBadge>
              <CategoryBadge color="green" icon="check" size="small">Income</CategoryBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Size Comparison',
      description: 'Two size options for different contexts. Small for compact layouts like transaction lists, medium for standard UI elements and forms.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small (24px height) - Compact layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" size="small">Shopping</CategoryBadge>
      <CategoryBadge color="orange" size="small" icon="refresh">Food</CategoryBadge>
      <CategoryBadge color="green" size="small" variant="outlined">Income</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (32px height) - Standard layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="blue" size="medium">Shopping</CategoryBadge>
      <CategoryBadge color="orange" size="medium" icon="refresh">Food & Dining</CategoryBadge>
      <CategoryBadge color="green" size="medium" variant="outlined">Income</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small (24px height) - Compact layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" size="small">Shopping</CategoryBadge>
              <CategoryBadge color="orange" size="small" icon="refresh">Food</CategoryBadge>
              <CategoryBadge color="green" size="small" variant="outlined">Income</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (32px height) - Standard layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="blue" size="medium">Shopping</CategoryBadge>
              <CategoryBadge color="orange" size="medium" icon="refresh">Food & Dining</CategoryBadge>
              <CategoryBadge color="green" size="medium" variant="outlined">Income</CategoryBadge>
            </div>
          </div>
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses semantic button role when interactive (onClick provided), no role when static',
      'Full keyboard support with Enter and Space key activation for clickable badges',
      'Focus indicators provided by design system focus tokens with visible outline',
      'All color variants maintain WCAG 2.2 AA contrast ratios (4.5:1 for text, 3:1 for UI components)',
      'Disabled state communicated via aria-disabled="true" and 50% opacity',
      'Supports aria-label for additional context when category name alone is insufficient',
      'Icon and text content are both accessible to screen readers',
      'No accessibility violations detected by jest-axe automated testing across all variants'
    ],
    keyboardNavigation: 'Tab to focus interactive badges, Enter or Space to activate onClick handler. Non-interactive badges are not keyboard focusable.',
    screenReader: 'Screen readers announce the category label and role. When interactive, announced as "button" with the label. When aria-label is provided, that label is announced. Disabled badges are announced as "disabled".'
  },

  anatomy: {
    description: 'A compact badge consisting of an optional icon and text label within a rounded container. Visual style adapts based on variant, color, and size props.',
    diagram: `
┌────────────────────────────┐
│  CategoryBadge Container   │
│  ┌──────┐  ┌───────────┐  │
│  │ Icon │  │   Label   │  │
│  │(opt) │  │  (text)   │  │
│  └──────┘  └───────────┘  │
└────────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners, variant-specific styling (filled/outlined/minimal), and color-based background or border. Becomes button with hover/focus states when clickable.',
        tokens: [
          'semantic.color.category.[color]',
          'semantic.color.category.[color]-emphasis',
          'semantic.color.category.[color]-subtle',
          'base.border.radius.pill',
          'base.border.width.1'
        ]
      },
      {
        name: 'Icon',
        description: 'Optional leading icon with size adjusted based on badge size variant. Automatically colored to match text color for visual consistency.',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm'
        ]
      },
      {
        name: 'Label',
        description: 'Text content displaying the category name. Typography scales with badge size. Color adapts based on variant (inverse for filled, color for outlined/minimal).',
        tokens: [
          'semantic.typography.caption',
          'semantic.typography.small',
          'semantic.color.text.inverse'
        ]
      }
    ]
  }
}
