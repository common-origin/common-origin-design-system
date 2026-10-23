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
      type: "'olive' | 'periwinkle' | 'rose' | 'magenta' | 'gray'",
      required: false,
      default: "'periwinkle'",
      description: 'The category colour: one of four display colours, which carry no meaning, or gray for uncategorised items (decision 0043). Pick any colour per category, and keep it consistent across a product. The old names (blue, purple, pink, yellow, green, red, orange) still work until 3.0, as deprecated aliases of the nearest display colour.'
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
    'semantic.color.category.olive', // Outline of an outlined olive badge
    'semantic.color.category.olive-strong', // Fill of a filled olive badge, with white text
    'semantic.color.category.olive-text', // Text of an outlined or minimal olive badge
    'semantic.color.category.olive-muted', // Fill of a minimal olive badge
    'semantic.color.category.periwinkle', // Outline of an outlined periwinkle badge
    'semantic.color.category.periwinkle-strong', // Fill of a filled periwinkle badge, with white text
    'semantic.color.category.periwinkle-text', // Text of an outlined or minimal periwinkle badge
    'semantic.color.category.periwinkle-muted', // Fill of a minimal periwinkle badge
    'semantic.color.category.rose', // Outline of an outlined rose badge
    'semantic.color.category.rose-strong', // Fill of a filled rose badge, with white text
    'semantic.color.category.rose-text', // Text of an outlined or minimal rose badge
    'semantic.color.category.rose-muted', // Fill of a minimal rose badge
    'semantic.color.category.magenta', // Outline of an outlined magenta badge
    'semantic.color.category.magenta-strong', // Fill of a filled magenta badge, with white text
    'semantic.color.category.magenta-text', // Text of an outlined or minimal magenta badge
    'semantic.color.category.magenta-muted', // Fill of a minimal magenta badge
    'semantic.color.category.gray', // Outline of an outlined gray badge
    'semantic.color.category.gray-strong', // Fill of a filled gray badge, with white text
    'semantic.color.category.gray-text', // Text of an outlined or minimal gray badge
    'semantic.color.category.gray-muted', // Fill of a minimal gray badge
    'semantic.color.text.inverse', // White text for filled variant badges
    'semantic.size.label.medium', // 24px height for size="small"
    'semantic.size.label.large', // 32px height for size="medium"
    'semantic.space.100', // 4px vertical padding for small badges
    'semantic.space.200', // 8px horizontal padding for small badges; vertical padding for medium badges
    'semantic.space.300', // 12px horizontal padding for medium badges
    'component.badge.label.typography.small', // Typography for small size badges
    'component.badge.label.typography.medium', // Typography for medium size badges
    'component.badge.label.fontWeight', // Label weight shared by the badge-like family
    'semantic.radius.full', // Fully rounded corners for badge shape
    'semantic.border.width.thin', // 1px border for outlined variant
    'semantic.size.icon.xs', // 12px icon size for small badges
    'semantic.size.icon.sm', // 16px icon size for medium badges
    'semantic.space.100', // 4px gap between icon and label
  ],

  examples: [
    {
      name: 'Category Badge Variants',
      description: 'Three visual styles for different emphasis levels. Filled for high priority categories, outlined for medium priority, and minimal for subtle categorization.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Filled (High Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="periwinkle" variant="filled">General</CategoryBadge>
      <CategoryBadge color="magenta" variant="filled">Entertainment</CategoryBadge>
      <CategoryBadge color="olive" variant="filled">Income</CategoryBadge>
      <CategoryBadge color="rose" variant="filled">Bills</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Outlined (Medium Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="periwinkle" variant="outlined">General</CategoryBadge>
      <CategoryBadge color="magenta" variant="outlined">Entertainment</CategoryBadge>
      <CategoryBadge color="olive" variant="outlined">Income</CategoryBadge>
      <CategoryBadge color="rose" variant="outlined">Bills</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Minimal (Low Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="periwinkle" variant="minimal">General</CategoryBadge>
      <CategoryBadge color="magenta" variant="minimal">Entertainment</CategoryBadge>
      <CategoryBadge color="olive" variant="minimal">Income</CategoryBadge>
      <CategoryBadge color="rose" variant="minimal">Bills</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Filled (High Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" variant="filled">General</CategoryBadge>
              <CategoryBadge color="magenta" variant="filled">Entertainment</CategoryBadge>
              <CategoryBadge color="olive" variant="filled">Income</CategoryBadge>
              <CategoryBadge color="rose" variant="filled">Bills</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Outlined (Medium Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" variant="outlined">General</CategoryBadge>
              <CategoryBadge color="magenta" variant="outlined">Entertainment</CategoryBadge>
              <CategoryBadge color="olive" variant="outlined">Income</CategoryBadge>
              <CategoryBadge color="rose" variant="outlined">Bills</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Minimal (Low Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" variant="minimal">General</CategoryBadge>
              <CategoryBadge color="magenta" variant="minimal">Entertainment</CategoryBadge>
              <CategoryBadge color="olive" variant="minimal">Income</CategoryBadge>
              <CategoryBadge color="rose" variant="minimal">Bills</CategoryBadge>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'All Category Colors',
      description: 'Four display colours and grey. They carry no meaning, so a category never reads as a status; beyond five categories, the icon and text tell them apart. Every variant meets WCAG AA text contrast.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryBadge color="periwinkle">General</CategoryBadge>
    <CategoryBadge color="magenta">Entertainment</CategoryBadge>
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryBadge color="olive">Income</CategoryBadge>
    <CategoryBadge color="rose">Bills</CategoryBadge>
    <CategoryBadge color="gray">Uncategorized</CategoryBadge>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryBadge color="periwinkle">General</CategoryBadge>
            <CategoryBadge color="magenta">Entertainment</CategoryBadge>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryBadge color="olive">Income</CategoryBadge>
            <CategoryBadge color="rose">Bills</CategoryBadge>
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
      <CategoryBadge color="periwinkle" icon="filter">Shopping</CategoryBadge>
      <CategoryBadge color="olive" icon="check">Income</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="periwinkle" icon="filter" size="small">Shopping</CategoryBadge>
      <CategoryBadge color="olive" icon="check" size="small">Income</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" icon="filter">Shopping</CategoryBadge>
              <CategoryBadge color="olive" icon="check">Income</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" icon="filter" size="small">Shopping</CategoryBadge>
              <CategoryBadge color="olive" icon="check" size="small">Income</CategoryBadge>
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
      <CategoryBadge color="periwinkle" size="small">Shopping</CategoryBadge>
      <CategoryBadge color="olive" size="small" variant="outlined">Income</CategoryBadge>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (32px height) - Standard layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryBadge color="periwinkle" size="medium">Shopping</CategoryBadge>
      <CategoryBadge color="olive" size="medium" variant="outlined">Income</CategoryBadge>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small (24px height) - Compact layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" size="small">Shopping</CategoryBadge>
              <CategoryBadge color="olive" size="small" variant="outlined">Income</CategoryBadge>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (32px height) - Standard layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryBadge color="periwinkle" size="medium">Shopping</CategoryBadge>
              <CategoryBadge color="olive" size="medium" variant="outlined">Income</CategoryBadge>
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
          'semantic.color.category.olive', // Outline of an outlined olive badge
          'semantic.color.category.olive-strong', // Fill of a filled olive badge, with white text
          'semantic.color.category.olive-text', // Text of an outlined or minimal olive badge
          'semantic.color.category.olive-muted', // Fill of a minimal olive badge
          'semantic.color.category.periwinkle', // Outline of an outlined periwinkle badge
          'semantic.color.category.periwinkle-strong', // Fill of a filled periwinkle badge, with white text
          'semantic.color.category.periwinkle-text', // Text of an outlined or minimal periwinkle badge
          'semantic.color.category.periwinkle-muted', // Fill of a minimal periwinkle badge
          'semantic.color.category.rose', // Outline of an outlined rose badge
          'semantic.color.category.rose-strong', // Fill of a filled rose badge, with white text
          'semantic.color.category.rose-text', // Text of an outlined or minimal rose badge
          'semantic.color.category.rose-muted', // Fill of a minimal rose badge
          'semantic.color.category.magenta', // Outline of an outlined magenta badge
          'semantic.color.category.magenta-strong', // Fill of a filled magenta badge, with white text
          'semantic.color.category.magenta-text', // Text of an outlined or minimal magenta badge
          'semantic.color.category.magenta-muted', // Fill of a minimal magenta badge
          'semantic.color.category.gray', // Outline of an outlined gray badge
          'semantic.color.category.gray-strong', // Fill of a filled gray badge, with white text
          'semantic.color.category.gray-text', // Text of an outlined or minimal gray badge
          'semantic.color.category.gray-muted', // Fill of a minimal gray badge
          'semantic.radius.full',
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
