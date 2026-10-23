import { ComponentDocumentation } from '../../../lib/docgen/types'
import { CategoryLabel } from './CategoryLabel'
import { labelGuide, labelGuideNotes } from '../../../lib/docgen/labelGuide'

export const categoryLabelDocs: ComponentDocumentation = {
  id: 'category-label',
  name: 'CategoryLabel',
  description: 'Colour-codes an item\'s category, such as a transaction\'s (decision 0018). A static, display-only label with four display colours plus grey, filled, outlined and minimal styles, and an optional icon. Category colours carry no meaning (decision 0043): for status use StatusLabel. For a selectable or removable value use a chip. Replaces the deprecated CategoryBadge; it defaults to large (32px), so swapping the name doesn\'t change how anything looks.',
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
    'semantic.color.category.olive', // Outline of an outlined olive label
    'semantic.color.category.olive-strong', // Fill of a filled olive label, with white text
    'semantic.color.category.olive-text', // Text of an outlined or minimal olive label
    'semantic.color.category.olive-muted', // Fill of a minimal olive label
    'semantic.color.category.periwinkle', // Outline of an outlined periwinkle label
    'semantic.color.category.periwinkle-strong', // Fill of a filled periwinkle label, with white text
    'semantic.color.category.periwinkle-text', // Text of an outlined or minimal periwinkle label
    'semantic.color.category.periwinkle-muted', // Fill of a minimal periwinkle label
    'semantic.color.category.rose', // Outline of an outlined rose label
    'semantic.color.category.rose-strong', // Fill of a filled rose label, with white text
    'semantic.color.category.rose-text', // Text of an outlined or minimal rose label
    'semantic.color.category.rose-muted', // Fill of a minimal rose label
    'semantic.color.category.magenta', // Outline of an outlined magenta label
    'semantic.color.category.magenta-strong', // Fill of a filled magenta label, with white text
    'semantic.color.category.magenta-text', // Text of an outlined or minimal magenta label
    'semantic.color.category.magenta-muted', // Fill of a minimal magenta label
    'semantic.color.category.gray', // Outline of an outlined gray label
    'semantic.color.category.gray-strong', // Fill of a filled gray label, with white text
    'semantic.color.category.gray-text', // Text of an outlined or minimal gray label
    'semantic.color.category.gray-muted', // Fill of a minimal gray label
    'semantic.color.text.inverse', // White text for filled variant labels
    'semantic.size.label.medium', // 24px height for medium labels
    'semantic.size.label.large', // 32px height for large labels
    'semantic.space.100', // 4px vertical padding for medium labels; 4px gap between icon and label
    'semantic.space.200', // 8px horizontal padding for medium labels; vertical padding for large labels
    'semantic.space.300', // 12px horizontal padding for large labels
    'component.badge.label.typography.small', // Typography for medium labels
    'component.badge.label.typography.medium', // Typography for large labels
    'component.badge.label.fontWeight', // Label weight shared by the badge-like family
    'semantic.radius.full', // Fully rounded corners for label shape
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
      <CategoryLabel color="periwinkle" variant="filled">General</CategoryLabel>
      <CategoryLabel color="magenta" variant="filled">Entertainment</CategoryLabel>
      <CategoryLabel color="olive" variant="filled">Income</CategoryLabel>
      <CategoryLabel color="rose" variant="filled">Bills</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Outlined (Medium Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="periwinkle" variant="outlined">General</CategoryLabel>
      <CategoryLabel color="magenta" variant="outlined">Entertainment</CategoryLabel>
      <CategoryLabel color="olive" variant="outlined">Income</CategoryLabel>
      <CategoryLabel color="rose" variant="outlined">Bills</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Minimal (Low Emphasis)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="periwinkle" variant="minimal">General</CategoryLabel>
      <CategoryLabel color="magenta" variant="minimal">Entertainment</CategoryLabel>
      <CategoryLabel color="olive" variant="minimal">Income</CategoryLabel>
      <CategoryLabel color="rose" variant="minimal">Bills</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Filled (High Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" variant="filled">General</CategoryLabel>
              <CategoryLabel color="magenta" variant="filled">Entertainment</CategoryLabel>
              <CategoryLabel color="olive" variant="filled">Income</CategoryLabel>
              <CategoryLabel color="rose" variant="filled">Bills</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Outlined (Medium Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" variant="outlined">General</CategoryLabel>
              <CategoryLabel color="magenta" variant="outlined">Entertainment</CategoryLabel>
              <CategoryLabel color="olive" variant="outlined">Income</CategoryLabel>
              <CategoryLabel color="rose" variant="outlined">Bills</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Minimal (Low Emphasis)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" variant="minimal">General</CategoryLabel>
              <CategoryLabel color="magenta" variant="minimal">Entertainment</CategoryLabel>
              <CategoryLabel color="olive" variant="minimal">Income</CategoryLabel>
              <CategoryLabel color="rose" variant="minimal">Bills</CategoryLabel>
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
    <CategoryLabel color="periwinkle">General</CategoryLabel>
    <CategoryLabel color="magenta">Entertainment</CategoryLabel>
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <CategoryLabel color="olive">Income</CategoryLabel>
    <CategoryLabel color="rose">Bills</CategoryLabel>
    <CategoryLabel color="gray">Uncategorized</CategoryLabel>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryLabel color="periwinkle">General</CategoryLabel>
            <CategoryLabel color="magenta">Entertainment</CategoryLabel>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <CategoryLabel color="olive">Income</CategoryLabel>
            <CategoryLabel color="rose">Bills</CategoryLabel>
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
      <CategoryLabel color="periwinkle" icon="filter">Shopping</CategoryLabel>
      <CategoryLabel color="olive" icon="check">Income</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium Size with Icons</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="periwinkle" icon="filter" size="medium">Shopping</CategoryLabel>
      <CategoryLabel color="olive" icon="check" size="medium">Income</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" icon="filter">Shopping</CategoryLabel>
              <CategoryLabel color="olive" icon="check">Income</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium Size with Icons</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" icon="filter" size="medium">Shopping</CategoryLabel>
              <CategoryLabel color="olive" icon="check" size="medium">Income</CategoryLabel>
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
      <CategoryLabel color="periwinkle" size="medium">Shopping</CategoryLabel>
      <CategoryLabel color="olive" size="medium" variant="outlined">Income</CategoryLabel>
    </div>
  </div>
  
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large (32px height) - Standard layouts</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryLabel color="periwinkle" size="large">Shopping</CategoryLabel>
      <CategoryLabel color="olive" size="large" variant="outlined">Income</CategoryLabel>
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Medium (24px height) - Compact layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" size="medium">Shopping</CategoryLabel>
              <CategoryLabel color="olive" size="medium" variant="outlined">Income</CategoryLabel>
            </div>
          </div>
          
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Large (32px height) - Standard layouts</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <CategoryLabel color="periwinkle" size="large">Shopping</CategoryLabel>
              <CategoryLabel color="olive" size="large" variant="outlined">Income</CategoryLabel>
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
          'semantic.color.category.olive', // Outline of an outlined olive label
          'semantic.color.category.olive-strong', // Fill of a filled olive label, with white text
          'semantic.color.category.olive-text', // Text of an outlined or minimal olive label
          'semantic.color.category.olive-muted', // Fill of a minimal olive label
          'semantic.color.category.periwinkle', // Outline of an outlined periwinkle label
          'semantic.color.category.periwinkle-strong', // Fill of a filled periwinkle label, with white text
          'semantic.color.category.periwinkle-text', // Text of an outlined or minimal periwinkle label
          'semantic.color.category.periwinkle-muted', // Fill of a minimal periwinkle label
          'semantic.color.category.rose', // Outline of an outlined rose label
          'semantic.color.category.rose-strong', // Fill of a filled rose label, with white text
          'semantic.color.category.rose-text', // Text of an outlined or minimal rose label
          'semantic.color.category.rose-muted', // Fill of a minimal rose label
          'semantic.color.category.magenta', // Outline of an outlined magenta label
          'semantic.color.category.magenta-strong', // Fill of a filled magenta label, with white text
          'semantic.color.category.magenta-text', // Text of an outlined or minimal magenta label
          'semantic.color.category.magenta-muted', // Fill of a minimal magenta label
          'semantic.color.category.gray', // Outline of an outlined gray label
          'semantic.color.category.gray-strong', // Fill of a filled gray label, with white text
          'semantic.color.category.gray-text', // Text of an outlined or minimal gray label
          'semantic.color.category.gray-muted', // Fill of a minimal gray label
          'semantic.radius.full',
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

  guides: [labelGuide],
  notes: [
    'Renamed from CategoryBadge in 2.16 (decision 0018). CategoryBadge still works as a deprecated alias and is removed in 3.0. Migrate by renaming, with size="small" → "medium" and size="medium" (or no size) → "large". color and variant are unchanged.',
    ...labelGuideNotes
  ]
}
