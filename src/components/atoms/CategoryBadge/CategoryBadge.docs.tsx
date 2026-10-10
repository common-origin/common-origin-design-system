import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CategoryBadge } from './CategoryBadge'

export const categoryBadgeDocs: ComponentDocumentation = {
  id: 'category-badge',
  name: 'CategoryBadge',
  description: 'Deprecated: renamed to CategoryLabel (decision 0018) and removed in 3.0. Rename to CategoryLabel and map size="small" to "medium" and size="medium" (or no size) to "large"; color and variant are unchanged. A compact, color-coded badge for displaying transaction categories with customizable visual styles and optional icons. It is display-only; for a selectable or removable category use Chip. Designed for financial applications requiring clear visual categorization with semantic color meanings.',
  category: 'Atoms',
  parentId: 'category-label',
  
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
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Accessible label, announced instead of the visible text and icon, for example "Category: Food & Dining". It is rendered as visually hidden text and the visible content is hidden from assistive technology, because the label has no role that can carry a name (#78). Without it, screen readers read the visible text.'
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
    'semantic.color.category.blue', // Primary category color for general/default categories
    'semantic.color.category.blue-strong', // High contrast background for filled blue badges
    'semantic.color.category.blue-subtle', // Light background for minimal blue badges
    'semantic.color.category.purple', // Purple for entertainment and leisure categories
    'semantic.color.category.purple-strong', // Filled purple badge background
    'semantic.color.category.purple-subtle', // Minimal purple badge background
    'semantic.color.category.pink', // Pink for personal and lifestyle categories
    'semantic.color.category.pink-strong', // Filled pink badge background
    'semantic.color.category.pink-subtle', // Minimal pink badge background
    'semantic.color.category.yellow', // Yellow for transport and travel categories
    'semantic.color.category.yellow-strong', // Filled yellow badge background
    'semantic.color.category.yellow-subtle', // Minimal yellow badge background
    'semantic.color.category.green', // Green for income and positive financial categories
    'semantic.color.category.green-strong', // Filled green badge background
    'semantic.color.category.green-subtle', // Minimal green badge background
    'semantic.color.category.red', // Red for bills and required expenses
    'semantic.color.category.red-strong', // Filled red badge background
    'semantic.color.category.red-subtle', // Minimal red badge background
    'semantic.color.category.orange', // Orange for food and dining categories
    'semantic.color.category.orange-strong', // Filled orange badge background
    'semantic.color.category.orange-subtle', // Minimal orange badge background
    'semantic.color.category.gray', // Gray for uncategorized or neutral categories
    'semantic.color.category.gray-strong', // Filled gray badge background
    'semantic.color.category.gray-subtle', // Minimal gray badge background
    'semantic.color.category.blue-text', // blue text on white or blue-subtle (outlined, minimal)
    'semantic.color.category.purple-text', // purple text on white or purple-subtle (outlined, minimal)
    'semantic.color.category.pink-text', // pink text on white or pink-subtle (outlined, minimal)
    'semantic.color.category.yellow-text', // yellow text on white or yellow-subtle (outlined, minimal)
    'semantic.color.category.green-text', // green text on white or green-subtle (outlined, minimal)
    'semantic.color.category.red-text', // red text on white or red-subtle (outlined, minimal)
    'semantic.color.category.orange-text', // orange text on white or orange-subtle (outlined, minimal)
    'semantic.color.category.gray-text', // gray text on white or gray-subtle (outlined, minimal)
    'semantic.color.text.inverse', // White text for filled variant badges
    'semantic.size.label.medium', // 24px height for size="small"
    'semantic.size.label.large', // 32px height for size="medium"
    'semantic.spacing.layout.xs', // 4px vertical padding for small badges
    'semantic.spacing.layout.sm', // 8px horizontal padding for small badges; vertical padding for medium badges
    'semantic.spacing.layout.md', // 12px horizontal padding for medium badges
    'component.badge.label.typography.small', // Typography for small size badges
    'component.badge.label.typography.medium', // Typography for medium size badges
    'component.badge.label.fontWeight', // Label weight shared by the badge-like family
    'semantic.border.radius.circle', // Fully rounded corners for badge shape
    'semantic.border.width.thin', // 1px border for outlined variant
    'semantic.size.icon.xs', // 12px icon size for small badges
    'semantic.size.icon.sm', // 16px icon size for medium badges
    'semantic.spacing.layout.xs', // 4px gap between icon and label
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
      description: 'Eight semantic colors designed for common financial transaction categories. Each color has distinct meaning and meets WCAG AA text contrast in every variant.',
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
      'Display-only: renders a non-interactive span with no role and is not focusable',
      'Text meets WCAG 2.2 AA (4.5:1) in every colour and variant, enforced by tests: filled uses white on the -emphasis colour; outlined and minimal use the category -text token (the -emphasis colour, or one step darker for pink and yellow), on white or the -subtle fill. The outlined border keeps the base colour (#115).',
      'An aria-label is announced as visually hidden text, with the visible text and icon hidden from assistive technology (#78). Without one, screen readers read the visible text.',
      'The icon is currently exposed to screen readers by its internal name (for example "bell"), although it is meant to be decorative (tracked in #85). An aria-label hides it, along with the visible text (#78)',
      'No accessibility violations detected by jest-axe automated testing across all variants'
    ],
    keyboardNavigation: 'Not keyboard focusable. CategoryBadge has no interaction; use Chip when the category needs to be selected or removed.',
    screenReader: 'Without an aria-label, screen readers read the visible category text as part of the surrounding content, and the icon (if any) is decorative and silent (#85). With an aria-label, only that label is read: the visible text and icon are hidden from assistive technology (#78). A blank aria-label is ignored.'
  },

  anatomy: {
    description: 'A compact label: an optional icon and text inside a rounded container. Visual style adapts to the variant, color and size props. When an aria-label is given, the visible content is hidden from assistive technology and a visually hidden label is announced instead (#78).',
    diagram: `
┌──────────────────────────────────┐
│  CategoryBadge Container         │
│  ┌ Visible content ───────────┐  │
│  │ ┌──────┐  ┌───────────┐    │  │
│  │ │ Icon │  │   Label   │    │  │
│  │ │(opt) │  │  (text)   │    │  │
│  │ └──────┘  └───────────┘    │  │
│  └────────────────────────────┘  │
│  Hidden label (aria-label only)  │
└──────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners, variant-specific styling (filled/outlined/minimal), and color-based background or border.',
        tokens: [
          'semantic.color.category.blue',
          'semantic.color.category.purple',
          'semantic.color.category.pink',
          'semantic.color.category.yellow',
          'semantic.color.category.green',
          'semantic.color.category.red',
          'semantic.color.category.orange',
          'semantic.color.category.gray',
          'semantic.color.category.blue-strong',
          'semantic.color.category.purple-strong',
          'semantic.color.category.pink-strong',
          'semantic.color.category.yellow-strong',
          'semantic.color.category.green-strong',
          'semantic.color.category.red-strong',
          'semantic.color.category.orange-strong',
          'semantic.color.category.gray-strong',
          'semantic.color.category.blue-subtle',
          'semantic.color.category.purple-subtle',
          'semantic.color.category.pink-subtle',
          'semantic.color.category.yellow-subtle',
          'semantic.color.category.green-subtle',
          'semantic.color.category.red-subtle',
          'semantic.color.category.orange-subtle',
          'semantic.color.category.gray-subtle',
          'semantic.border.radius.circle',
          'semantic.border.width.thin'
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
          'component.badge.label.typography.small',
          'component.badge.label.typography.medium',
          'component.badge.label.fontWeight',
          'semantic.color.text.inverse'
        ]
      },
      {
        name: 'Visible content',
        description: 'Wraps the icon and text with display: contents, so it adds no box and keeps the container layout. It gets aria-hidden="true" only when an aria-label is given (#78).',
        tokens: []
      },
      {
        name: 'Hidden label (aria-label only)',
        description: 'Rendered only when a non-blank aria-label is given: the aria-label as visually hidden text, which is what screen readers read instead of the visible content (#78).',
        tokens: []
      }
    ]
  }
}
