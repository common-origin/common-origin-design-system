import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Chip } from './Chip'
import { InputChip } from './InputChip'
import { FilterChip } from './FilterChip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'
import { labelGuide, labelGuideNotes } from '../../../lib/docgen/labelGuide'

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
        <Typography variant="small">Filter: FilterChip</Typography>
        <Stack direction="row" gap="sm" wrap>
          <FilterChip selected={inStock} onClick={() => setInStock(!inStock)}>In stock</FilterChip>
          <FilterChip selected={onSale} onClick={() => setOnSale(!onSale)}>On sale</FilterChip>
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
  description: 'A static, non-interactive label for tags, categories and metadata. Chips are classified by job, not emphasis (decision 0016): Chip is a static label, FilterChip toggles a filter on and off, and InputChip is a removable value such as an applied filter. For a clickable action, use a Button.',
  category: 'Atoms',

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Content to display inside the chip, typically a short text label.'
    },
    {
      name: 'variant',
      type: "'default'",
      required: false,
      default: 'default',
      description: "Visual style. The static Chip has one: chips have no emphasis levels (decision 0016)."
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
      default: 'undefined',
      description: 'Test identifier for the chip element.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Accessible label when the visible text alone is not enough, such as abbreviated content.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'ID of an element that further describes the chip.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'ARIA role override. A static chip has no role by default.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Legacy alternative to children, used when children is not provided. Prefer children.'
    }
  ],

  tokens: [
    // Default variant
    'component.chip.default.backgroundColor',
    'component.chip.default.textColor',
    'component.chip.default.borderRadius',
    // Disabled state
    'component.chip.disabled.backgroundColor',
    'component.chip.disabled.textColor',
    // Typography
    'component.chip.sizes.medium.font',
    // Height: one 24px size as a minimum (decisions 0034 and 0035); horizontal padding: semantic spacing
    'semantic.size.label.medium',
    'semantic.space.inset.sm',
    // Motion
    'semantic.motion.transition.feedback'
  ],

  examples: [
    {
      name: 'Chip Types',
      description: 'Pick a chip by its job. Chip is a static label. FilterChip toggles a filter on and off. InputChip is a removable value, such as an applied filter. Selected filter and input chips show a checkmark, with the light-blue fill and blue text when enabled; a disabled chip uses the disabled colours, selected or not.',
      code: `<Stack direction="column" gap="lg">
  {/* Static */}
  <Stack direction="row" gap="sm" wrap>
    <Chip>Design</Chip>
    <Chip>Research</Chip>
  </Stack>

  {/* Filter: toggles on and off */}
  <Stack direction="row" gap="sm" wrap>
    <FilterChip selected={inStock} onClick={() => setInStock(!inStock)}>In stock</FilterChip>
    <FilterChip selected={onSale} onClick={() => setOnSale(!onSale)}>On sale</FilterChip>
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
    }
  ],

  accessibility: {
    notes: [
      'A static chip is plain text content with no role, so it doesn\'t interrupt screen reader reading flow.',
      'Disabled state is communicated through aria-disabled.',
      'Use aria-label when the visible text needs more context, such as abbreviated content.',
      'Default chip text meets WCAG 2.2 AA (4.5:1).',
      'FilterChip uses role="checkbox" with aria-checked; InputChip uses role="status" and a labelled close button. See their pages for the full accessibility contract.'
    ],
    keyboardNavigation: 'A static chip is not focusable.',
    screenReader: 'Announced as its text content, or its aria-label when provided.',
    focusManagement: 'A static chip does not take focus.'
  },

  guides: [labelGuide],
  notes: [
    'Chip types (decision 0016): Chip for a static label, FilterChip to toggle a filter, InputChip for a removable value. No chip has emphasis levels, and chips keep their rounded 12px radius while Buttons use 4px, so the shapes signal different jobs.',
    'Renamed in 3.0: the toggle chip, BooleanChip, is now FilterChip, and the removable chip once called FilterChip is InputChip. Migrate in that order: FilterChip → InputChip first, then BooleanChip → FilterChip. Plain JavaScript projects get no error if they skip the first step, because the name FilterChip changed meaning.',
    'Removed in 3.0: the static Chip\'s emphasis, subtle, interactive, light and dark variants, its onClick, LegacyChip, and every chip\'s size prop (chips have one size, 24px, decision 0035). For a clickable action use a Button; for a toggle use FilterChip.',
    ...labelGuideNotes
  ],

  anatomy: {
    description: 'A compact inline label with a rounded container and text. InputChip and FilterChip add a leading checkmark when selected, and InputChip adds a trailing close button when dismissible.',
    diagram: `
┌────────────────────────────────────┐
│  Chip Container                    │
│  ┌──────┐  ┌─────────┐  ┌───────┐ │
│  │ Icon │  │  Label  │  │ Close │ │
│  │(opt) │  │ (text)  │  │ (opt) │ │
│  └──────┘  └─────────┘  └───────┘ │
└────────────────────────────────────┘

Icon: checkmark on selected FilterChip and InputChip
Close: InputChip with onDismiss
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners and the default chip background.',
        tokens: [
          'component.chip.default.backgroundColor',
          'component.chip.default.borderRadius',
          'semantic.motion.transition.feedback'
        ]
      },
      {
        name: 'Icon (optional)',
        description: 'Leading checkmark on selected FilterChip and InputChip, in the chip text colour.',
        tokens: [
          'semantic.space.100'
        ]
      },
      {
        name: 'Label',
        description: 'Text content with size-based typography.',
        tokens: [
          'component.chip.default.textColor',
          'component.chip.sizes.medium.font',
        ]
      },
      {
        name: 'Close Button (optional)',
        description: 'InputChip only: a labelled close button with its own hover and pressed overlay.',
        tokens: [
          'semantic.space.200',
          'semantic.radius.xs',
          'semantic.motion.transition.feedback'
        ]
      }
    ]
  }
}
