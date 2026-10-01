import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Chip } from './Chip'
import { InputChip } from './InputChip'
import { BooleanChip } from './BooleanChip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

// Stateful example comparing the three chip types
const ChipTypesExample: React.FC = () => {
  const [inStock, setInStock] = React.useState(true)
  const [onSale, setOnSale] = React.useState(false)
  const [applied, setApplied] = React.useState(['Brand: Acme', 'Price: Under $50'])

  return (
    <Stack direction="column" gap="lg">
      <Stack direction="column" gap="sm">
        <Typography variant="small">Static: Chip</Typography>
        <Stack direction="row" gap="sm" wrap>
          <Chip>Design</Chip>
          <Chip>Research</Chip>
        </Stack>
      </Stack>
      <Stack direction="column" gap="sm">
        <Typography variant="small">Filter: BooleanChip (FilterChip in 3.0)</Typography>
        <Stack direction="row" gap="sm" wrap>
          <BooleanChip selected={inStock} onClick={() => setInStock(!inStock)}>In stock</BooleanChip>
          <BooleanChip selected={onSale} onClick={() => setOnSale(!onSale)}>On sale</BooleanChip>
        </Stack>
      </Stack>
      <Stack direction="column" gap="sm">
        <Typography variant="small">Input: InputChip</Typography>
        <Stack direction="row" gap="sm" wrap>
          {applied.map(label => (
            <InputChip key={label} onDismiss={() => setApplied(prev => prev.filter(l => l !== label))}>
              {label}
            </InputChip>
          ))}
          {applied.length === 0 && (
            <Typography variant="small" color="subdued">All removed. Refresh to reset.</Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const chipDocs: ComponentDocumentation = {
  id: 'chip',
  name: 'Chip',
  description: 'A static, non-interactive label for tags, categories and metadata. Chips are classified by job, not emphasis (decision 0016): Chip is a static label, BooleanChip toggles a filter on and off (it becomes FilterChip in 3.0), and InputChip is a removable value such as an applied filter (formerly FilterChip). The static Chip\'s emphasis, subtle, interactive, light and dark variants and its onClick are deprecated and will be removed in 3.0.',
  category: 'Atoms',

  props: [
    {
      name: 'children',
      type: 'ReactNode',
      required: false,
      description: 'Content to display inside the chip, typically a short text label.'
    },
    {
      name: 'variant',
      type: "'default'",
      required: false,
      default: 'default',
      description: "Visual style. Only 'default' stays in 3.0. Deprecated, removed in 3.0: 'emphasis', 'subtle', 'interactive', and the legacy 'light' (same as default) and 'dark'. Chips have no emphasis levels."
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: 'medium',
      description: 'Small for dense interfaces such as toolbars and metadata rows; medium for standard use.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Deprecated, removed in 3.0: the static Chip is not interactive. For a clickable action use a Button; for a toggle use BooleanChip (FilterChip in 3.0). While it remains, it gives the chip button semantics and Enter/Space activation.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Applies disabled styling and aria-disabled.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for the chip element.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Accessible label when the visible text alone is not enough, such as abbreviated content.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description: 'ID of an element that further describes the chip.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      description: 'ARIA role override. A static chip has no role by default.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Legacy alternative to children, used when children is not provided. Prefer children.'
    }
  ],

  tokens: [
    // Default variant
    'component.chip.default.backgroundColor',
    'component.chip.default.textColor',
    'component.chip.default.borderRadius',
    'component.chip.default.padding',
    'component.chip.default.font',
    // Disabled state
    'component.chip.disabled.backgroundColor',
    'component.chip.disabled.textColor',
    // Size variants
    'component.chip.sizes.small.padding',
    'component.chip.sizes.small.font',
    'component.chip.sizes.medium.padding',
    'component.chip.sizes.medium.font',
    // Motion
    'semantic.motion.hover',
    // Deprecated: hover, active and focus apply only to a chip with onClick
    'component.chip.hover.backgroundColor',
    'component.chip.active.backgroundColor',
    'component.chip.focus.outline',
    'component.chip.focus.outlineOffset',
    // Deprecated variants, removed in 3.0
    'component.chip.variants.emphasis.backgroundColor',
    'component.chip.variants.emphasis.textColor',
    'component.chip.variants.emphasis.hover.backgroundColor',
    'component.chip.variants.emphasis.active.backgroundColor',
    'component.chip.variants.emphasis.disabled.backgroundColor',
    'component.chip.variants.emphasis.disabled.textColor',
    'component.chip.variants.subtle.backgroundColor',
    'component.chip.variants.subtle.textColor',
    'component.chip.variants.subtle.hover.backgroundColor',
    'component.chip.variants.subtle.active.backgroundColor',
    'component.chip.variants.subtle.disabled.backgroundColor',
    'component.chip.variants.subtle.disabled.textColor',
    'component.chip.variants.interactive.backgroundColor',
    'component.chip.variants.interactive.textColor',
    'component.chip.variants.interactive.hover.backgroundColor',
    'component.chip.variants.interactive.active.backgroundColor',
    'component.chip.variants.interactive.disabled.backgroundColor',
    'component.chip.variants.interactive.disabled.textColor'
  ],

  examples: [
    {
      name: 'Chip Types',
      description: 'Pick a chip by its job. Chip is a static label. BooleanChip toggles a filter on and off. InputChip is a removable value, such as an applied filter. Selected filter and input chips use the light-blue fill with blue text and a checkmark.',
      code: `<Stack direction="column" gap="lg">
  {/* Static */}
  <Stack direction="row" gap="sm" wrap>
    <Chip>Design</Chip>
    <Chip>Research</Chip>
  </Stack>

  {/* Filter: toggles on and off */}
  <Stack direction="row" gap="sm" wrap>
    <BooleanChip selected={inStock} onClick={() => setInStock(!inStock)}>In stock</BooleanChip>
    <BooleanChip selected={onSale} onClick={() => setOnSale(!onSale)}>On sale</BooleanChip>
  </Stack>

  {/* Input: removable values */}
  <Stack direction="row" gap="sm" wrap>
    {applied.map(label => (
      <InputChip key={label} onDismiss={() => remove(label)}>{label}</InputChip>
    ))}
  </Stack>
</Stack>`,
      renderComponent: () => <ChipTypesExample />
    },
    {
      name: 'Static Labels',
      description: 'Static chips label content with tags, categories and metadata. They are not interactive.',
      code: `<Stack direction="row" gap="sm" wrap>
  <Chip>Design</Chip>
  <Chip>Development</Chip>
  <Chip>Research</Chip>
  <Chip>Documentation</Chip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm" wrap>
          <Chip>Design</Chip>
          <Chip>Development</Chip>
          <Chip>Research</Chip>
          <Chip>Documentation</Chip>
        </Stack>
      )
    },
    {
      name: 'Sizes',
      description: 'Small for dense interfaces such as toolbars and metadata rows; medium for standard use.',
      code: `<Stack direction="row" gap="sm" alignItems="center">
  <Chip size="small">Small</Chip>
  <Chip size="medium">Medium</Chip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm" alignItems="center">
          <Chip size="small">Small</Chip>
          <Chip size="medium">Medium</Chip>
        </Stack>
      )
    },
    {
      name: 'Deprecated Variants',
      description: 'These still render in 2.x but will be removed in 3.0. Replace them with the default chip; replace a chip with onClick with a Button (an action) or a BooleanChip (a toggle).',
      code: `{/* Deprecated: remove the variant */}
<Chip variant="emphasis">Featured</Chip>   →  <Chip>Featured</Chip>
<Chip variant="subtle">Draft</Chip>        →  <Chip>Draft</Chip>
<Chip variant="light">Archive</Chip>       →  <Chip>Archive</Chip>

{/* Deprecated: onClick */}
<Chip variant="interactive" onClick={save}>Save</Chip>
  →  <Button variant="secondary" size="small" onClick={save}>Save</Button>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm" wrap>
          <Chip variant="emphasis">Featured</Chip>
          <Chip variant="subtle">Draft</Chip>
          <Chip variant="interactive">Interactive</Chip>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'A static chip is plain text content with no role, so it doesn\'t interrupt screen reader reading flow.',
      'Disabled state is communicated through aria-disabled.',
      'Use aria-label when the visible text needs more context, such as abbreviated content.',
      'Default chip text meets WCAG 2.2 AA (4.5:1).',
      'BooleanChip uses role="checkbox" with aria-checked; InputChip uses role="status" and a labelled close button. See their pages for the full accessibility contract.',
      'Deprecated: a chip with onClick gets button semantics, focus and Enter/Space activation. Use a Button instead, which has these natively.'
    ],
    keyboardNavigation: 'A static chip is not focusable. (Deprecated: a chip with onClick is focusable and activates with Enter or Space.)',
    screenReader: 'Announced as its text content, or its aria-label when provided.',
    focusManagement: 'A static chip does not take focus.'
  },

  notes: [
    'Chip types (decision 0016): Chip for a static label, BooleanChip to toggle a filter, InputChip for a removable value. No chip has emphasis levels, and chips keep their rounded 12px radius while Buttons use 4px, so the shapes signal different jobs.',
    'Upcoming rename in 3.0: FilterChip (today a deprecated alias of InputChip) becomes the toggle chip, and BooleanChip is removed. Migrate in order: replace FilterChip with InputChip now, then BooleanChip with FilterChip when you upgrade to 3.0. Plain JavaScript projects get no error if they skip the first step, because the name FilterChip changes meaning.',
    'Deprecated in 2.16, removed in 3.0: the emphasis, subtle, interactive, light and dark variants and onClick. For a clickable action use a Button; for a toggle use BooleanChip (FilterChip in 3.0).',
    'Tag also has emphasis and interactive variants; its future is decided separately (#62).',
    'Size: small for dense interfaces such as toolbars and metadata rows; medium for standard use.'
  ],

  anatomy: {
    description: 'A compact inline label with a rounded container and text. InputChip and BooleanChip add a leading checkmark when selected, and InputChip adds a trailing close button when dismissible.',
    diagram: `
┌────────────────────────────────────┐
│  Chip Container                    │
│  ┌──────┐  ┌─────────┐  ┌───────┐ │
│  │ Icon │  │  Label  │  │ Close │ │
│  │(opt) │  │ (text)  │  │ (opt) │ │
│  └──────┘  └─────────┘  └───────┘ │
└────────────────────────────────────┘

Icon: checkmark on selected BooleanChip and InputChip
Close: InputChip with onDismiss
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners and the default chip background.',
        tokens: [
          'component.chip.default.backgroundColor',
          'component.chip.default.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Icon (optional)',
        description: 'Leading checkmark on selected BooleanChip and InputChip.',
        tokens: [
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Label',
        description: 'Text content with size-based typography.',
        tokens: [
          'component.chip.default.textColor',
          'component.chip.sizes.medium.font',
          'component.chip.sizes.small.font'
        ]
      },
      {
        name: 'Close Button (optional)',
        description: 'InputChip only: a labelled close button with its own hover and pressed overlay.',
        tokens: [
          'semantic.spacing.layout.sm',
          'semantic.border.radius.xs',
          'semantic.motion.hover'
        ]
      }
    ]
  }
}
