import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CategoryLabel } from './CategoryLabel'
import { labelGuideNotes } from '../../../lib/docgen/labelGuide'

export const categoryLabelDocs: ComponentDocumentation = {
  id: 'category-label',
  name: 'CategoryLabel',
  description: 'Colour-codes an item\'s category, such as a transaction\'s (decision 0018). A static, display-only label with 8 category colours, filled, outlined and minimal styles, and an optional icon. Category colours carry no status meaning: for status use StatusLabel. For a selectable or removable value use a chip. Replaces the deprecated CategoryBadge; it defaults to large (32px), so swapping the name doesn\'t change how anything looks.',
  category: 'Atoms',
  
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: 'The category label content to display inside the label. Typically a short category name like "Shopping", "Food", "Transport", or "Entertainment".'
    },
    {
      name: 'color',
      type: "'blue' | 'purple' | 'pink' | 'yellow' | 'green' | 'red' | 'orange' | 'gray'",
      required: false,
      default: "'blue'",
      description: 'The semantic color of the label, typically mapped to specific category types. Blue for general, purple for entertainment, pink for personal, yellow for transport, green for income, red for bills, orange for food, gray for uncategorized.'
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
      type: "'medium' | 'large'",
      required: false,
      default: "'large'",
      description: 'The size of the label affecting height, padding, and typography, on the decision 0018 scale. Medium (24px) for compact layouts like transaction list items, large (32px) for standard use in forms and headers. CategoryBadge small is CategoryLabel medium, and CategoryBadge medium is CategoryLabel large.'
    },
    {
      name: 'icon',
      type: 'IconName',
      required: false,
      default: 'undefined',
      description: 'Optional icon name to display before the label. Icons provide visual reinforcement of category meaning. Icon size automatically adjusts based on label size.'
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
      description: 'Testing identifier for automated test location and interaction verification. Supports consistent testing patterns across different label states and variants.'
    }
  ],

  tokens: [
    'semantic.color.category.blue', // Primary category color for general/default categories
    'semantic.color.category.blue-emphasis', // High contrast background for filled blue labels
    'semantic.color.category.blue-subtle', // Light background for minimal blue labels
    'semantic.color.category.purple', // Purple for entertainment and leisure categories
    'semantic.color.category.purple-emphasis', // Filled purple label background
    'semantic.color.category.purple-subtle', // Minimal purple label background
    'semantic.color.category.pink', // Pink for personal and lifestyle categories
    'semantic.color.category.pink-emphasis', // Filled pink label background
    'semantic.color.category.pink-subtle', // Minimal pink label background
    'semantic.color.category.yellow', // Yellow for transport and travel categories
    'semantic.color.category.yellow-emphasis', // Filled yellow label background
    'semantic.color.category.yellow-subtle', // Minimal yellow label background
    'semantic.color.category.green', // Green for income and positive financial categories
    'semantic.color.category.green-emphasis', // Filled green label background
    'semantic.color.category.green-subtle', // Minimal green label background
    'semantic.color.category.red', // Red for bills and required expenses
    'semantic.color.category.red-emphasis', // Filled red label background
    'semantic.color.category.red-subtle', // Minimal red label background
    'semantic.color.category.orange', // Orange for food and dining categories
    'semantic.color.category.orange-emphasis', // Filled orange label background
    'semantic.color.category.orange-subtle', // Minimal orange label background
    'semantic.color.category.gray', // Gray for uncategorized or neutral categories
    'semantic.color.category.gray-emphasis', // Filled gray label background
    'semantic.color.category.gray-subtle', // Minimal gray label background
    'semantic.color.category.blue-text', // blue text on white or blue-subtle (outlined, minimal)
    'semantic.color.category.purple-text', // purple text on white or purple-subtle (outlined, minimal)
    'semantic.color.category.pink-text', // pink text on white or pink-subtle (outlined, minimal)
    'semantic.color.category.yellow-text', // yellow text on white or yellow-subtle (outlined, minimal)
    'semantic.color.category.green-text', // green text on white or green-subtle (outlined, minimal)
    'semantic.color.category.red-text', // red text on white or red-subtle (outlined, minimal)
    'semantic.color.category.orange-text', // orange text on white or orange-subtle (outlined, minimal)
    'semantic.color.category.gray-text', // gray text on white or gray-subtle (outlined, minimal)
    'semantic.color.text.inverse', // White text for filled variant labels
    'semantic.size.label.medium', // 24px height for medium labels
    'semantic.size.label.large', // 32px height for large labels
    'semantic.spacing.layout.xs', // 4px vertical padding for medium labels; 4px gap between icon and label
    'semantic.spacing.layout.sm', // 8px horizontal padding for medium labels; vertical padding for large labels
    'semantic.spacing.layout.md', // 12px horizontal padding for large labels
    'component.badge.label.typography.small', // Typography for medium labels
    'component.badge.label.typography.medium', // Typography for large labels
    'component.badge.label.fontWeight', // Label weight shared by the badge-like family
    'semantic.border.radius.circle', // Fully rounded corners for label shape
    'semantic.border.width.thin', // 1px border for outlined variant
    'semantic.size.icon.xs', // 12px icon size for medium labels
    'semantic.size.icon.sm', // 16px icon size for large labels
  ],

  examples: [
    {
      name: 'Category Label Variants',
      description: 'Three visual styles for different emphasis levels. Filled for high priority categories, outlined for medium priority, and minimal for subtle categorization.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Filled (High Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" variant="filled">General</CategoryLabel>
      <CategoryLabel color="purple" variant="filled">Entertainment</CategoryLabel>
      <CategoryLabel color="green" variant="filled">Income</CategoryLabel>
      <CategoryLabel color="red" variant="filled">Bills</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Outlined (Medium Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" variant="outlined">General</CategoryLabel>
      <CategoryLabel color="purple" variant="outlined">Entertainment</CategoryLabel>
      <CategoryLabel color="green" variant="outlined">Income</CategoryLabel>
      <CategoryLabel color="red" variant="outlined">Bills</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Minimal (Low Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" variant="minimal">General</CategoryLabel>
      <CategoryLabel color="purple" variant="minimal">Entertainment</CategoryLabel>
      <CategoryLabel color="green" variant="minimal">Income</CategoryLabel>
      <CategoryLabel color="red" variant="minimal">Bills</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Filled (High Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" variant="filled">General</CategoryLabel>
              <CategoryLabel color="purple" variant="filled">Entertainment</CategoryLabel>
              <CategoryLabel color="green" variant="filled">Income</CategoryLabel>
              <CategoryLabel color="red" variant="filled">Bills</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Outlined (Medium Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" variant="outlined">General</CategoryLabel>
              <CategoryLabel color="purple" variant="outlined">Entertainment</CategoryLabel>
              <CategoryLabel color="green" variant="outlined">Income</CategoryLabel>
              <CategoryLabel color="red" variant="outlined">Bills</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Minimal (Low Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" variant="minimal">General</CategoryLabel>
              <CategoryLabel color="purple" variant="minimal">Entertainment</CategoryLabel>
              <CategoryLabel color="green" variant="minimal">Income</CategoryLabel>
              <CategoryLabel color="red" variant="minimal">Bills</CategoryLabel>
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
    <CategoryLabel color="blue">General</CategoryLabel>
    <CategoryLabel color="purple">Entertainment</CategoryLabel>
    <CategoryLabel color="pink">Personal</CategoryLabel>
    <CategoryLabel color="yellow">Transport</CategoryLabel>
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryLabel color="green">Income</CategoryLabel>
    <CategoryLabel color="red">Bills</CategoryLabel>
    <CategoryLabel color="orange">Food</CategoryLabel>
    <CategoryLabel color="gray">Uncategorized</CategoryLabel>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryLabel color="blue">General</CategoryLabel>
            <CategoryLabel color="purple">Entertainment</CategoryLabel>
            <CategoryLabel color="pink">Personal</CategoryLabel>
            <CategoryLabel color="yellow">Transport</CategoryLabel>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryLabel color="green">Income</CategoryLabel>
            <CategoryLabel color="red">Bills</CategoryLabel>
            <CategoryLabel color="orange">Food</CategoryLabel>
            <CategoryLabel color="gray">Uncategorized</CategoryLabel>
          </div>
        </div>
      )
    },
    {
      name: 'With Icons',
      description: 'Category labels with optional icons for enhanced visual recognition. Icons automatically size based on the label size variant.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" icon="filter">Shopping</CategoryLabel>
      <CategoryLabel color="orange" icon="refresh">Food & Dining</CategoryLabel>
      <CategoryLabel color="yellow" icon="bell">Transport</CategoryLabel>
      <CategoryLabel color="green" icon="check">Income</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" icon="filter" size="medium">Shopping</CategoryLabel>
      <CategoryLabel color="orange" icon="refresh" size="medium">Food</CategoryLabel>
      <CategoryLabel color="yellow" icon="bell" size="medium">Transport</CategoryLabel>
      <CategoryLabel color="green" icon="check" size="medium">Income</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" icon="filter">Shopping</CategoryLabel>
              <CategoryLabel color="orange" icon="refresh">Food & Dining</CategoryLabel>
              <CategoryLabel color="yellow" icon="bell">Transport</CategoryLabel>
              <CategoryLabel color="green" icon="check">Income</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" icon="filter" size="medium">Shopping</CategoryLabel>
              <CategoryLabel color="orange" icon="refresh" size="medium">Food</CategoryLabel>
              <CategoryLabel color="yellow" icon="bell" size="medium">Transport</CategoryLabel>
              <CategoryLabel color="green" icon="check" size="medium">Income</CategoryLabel>
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Size Comparison',
      description: 'Two size options for different contexts. Medium for compact layouts like transaction lists, large (the default) for standard UI elements and forms.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium (24px height) - Compact layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" size="medium">Shopping</CategoryLabel>
      <CategoryLabel color="orange" size="medium" icon="refresh">Food</CategoryLabel>
      <CategoryLabel color="green" size="medium" variant="outlined">Income</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large (32px height) - Standard layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="blue" size="large">Shopping</CategoryLabel>
      <CategoryLabel color="orange" size="large" icon="refresh">Food & Dining</CategoryLabel>
      <CategoryLabel color="green" size="large" variant="outlined">Income</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium (24px height) - Compact layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" size="medium">Shopping</CategoryLabel>
              <CategoryLabel color="orange" size="medium" icon="refresh">Food</CategoryLabel>
              <CategoryLabel color="green" size="medium" variant="outlined">Income</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large (32px height) - Standard layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="blue" size="large">Shopping</CategoryLabel>
              <CategoryLabel color="orange" size="large" icon="refresh">Food & Dining</CategoryLabel>
              <CategoryLabel color="green" size="large" variant="outlined">Income</CategoryLabel>
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
    keyboardNavigation: 'Not keyboard focusable. CategoryLabel has no interaction; use Chip when the category needs to be selected or removed.',
    screenReader: 'Without an aria-label, screen readers read the visible category text as part of the surrounding content, and the icon (if any) is also announced by its internal name, such as "bell" (#85). With an aria-label, only that label is read: the visible text and icon are hidden from assistive technology (#78). A blank aria-label is ignored.'
  },

  anatomy: {
    description: 'A compact label: an optional icon and text inside a rounded container. Visual style adapts to the variant, color and size props. When an aria-label is given, the visible content is hidden from assistive technology and a visually hidden label is announced instead (#78).',
    diagram: `
┌──────────────────────────────────┐
│  CategoryLabel Container         │
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
          'semantic.color.category.blue-emphasis',
          'semantic.color.category.purple-emphasis',
          'semantic.color.category.pink-emphasis',
          'semantic.color.category.yellow-emphasis',
          'semantic.color.category.green-emphasis',
          'semantic.color.category.red-emphasis',
          'semantic.color.category.orange-emphasis',
          'semantic.color.category.gray-emphasis',
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
        description: 'Optional leading icon with size adjusted based on the label size. Automatically colored to match text color for visual consistency.',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm'
        ]
      },
      {
        name: 'Label',
        description: 'Text content displaying the category name. Typography scales with the label size. Color adapts based on variant (inverse for filled, color for outlined/minimal).',
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
  },

  notes: [
    'Renamed from CategoryBadge in 2.16 (decision 0018). CategoryBadge still works as a deprecated alias and is removed in 3.0. Migrate by renaming, with size="small" → "medium" and size="medium" (or no size) → "large". color and variant are unchanged.',
    ...labelGuideNotes
  ]
}
