import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { BooleanChip } from './BooleanChip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

// Stateful example for single-toggle use case
const SingleToggleExample: React.FC = () => {
  const [active, setActive] = React.useState(false)
  return (
    <BooleanChip selected={active} onClick={() => setActive(prev => !prev)}>
      {active ? 'Notifications On' : 'Notifications Off'}
    </BooleanChip>
  )
}

// Stateful example for multi-select filter panel
const ContentFilterExample: React.FC = () => {
  const [filters, setFilters] = React.useState({
    articles: true,
    videos: false,
    podcasts: false,
    images: true
  })

  const toggle = (key: keyof typeof filters) =>
    setFilters(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <Stack direction="column" gap="sm">
      <Typography variant="small">Content type</Typography>
      <Stack direction="row" gap="sm" wrap>
        <BooleanChip selected={filters.articles} onClick={() => toggle('articles')}>
          Articles
        </BooleanChip>
        <BooleanChip selected={filters.videos} onClick={() => toggle('videos')}>
          Videos
        </BooleanChip>
        <BooleanChip selected={filters.podcasts} onClick={() => toggle('podcasts')}>
          Podcasts
        </BooleanChip>
        <BooleanChip selected={filters.images} onClick={() => toggle('images')}>
          Images
        </BooleanChip>
      </Stack>
    </Stack>
  )
}

// Stateful example showing small size in a compact toolbar
const CompactTagFilterExample: React.FC = () => {
  const [tags, setTags] = React.useState<string[]>(['electronic'])

  const toggleTag = (tag: string) =>
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )

  const allTags = ['electronic', 'ambient', 'jazz', 'classical', 'hip-hop']

  return (
    <Stack direction="column" gap="sm">
      <Typography variant="small">Genre</Typography>
      <Stack direction="row" gap="xs" wrap>
        {allTags.map(tag => (
          <BooleanChip
            key={tag}
            size="small"
            selected={tags.includes(tag)}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </BooleanChip>
        ))}
      </Stack>
    </Stack>
  )
}

export const booleanChipDocs: ComponentDocumentation = {
  id: 'boolean-chip',
  name: 'BooleanChip',
  description:
    'A toggleable chip for multi-select filter controls. The entire chip body is clickable — clicking or pressing Space/Enter toggles between selected and unselected states. Shows a checkmark icon when selected. Announces as a checkbox to assistive technologies.',
  category: 'Atoms',
  parentId: 'chip',

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description:
        'Label displayed inside the chip. Typically a short string describing the filter option (e.g. "Articles", "Videos"). Also used to construct the accessible label when aria-label is not provided.'
    },
    {
      name: 'selected',
      type: 'boolean',
      required: true,
      description:
        'Controls the checked state of the chip. When true, a checkmark icon appears on the left and the background changes to the interactive-subtle colour. This is a controlled prop — the parent is responsible for toggling it via the onClick handler.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: true,
      description:
        'Called when the chip is clicked or activated via keyboard (Space or Enter). Use this to toggle the selected state in the parent component. Not called when the chip is disabled.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: 'medium',
      description:
        'Size variant affecting padding and font size. Use small for compact toolbars or dense filter bars; medium for standard filter panels.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Prevents interaction and applies reduced-opacity disabled styling. When disabled, the chip is removed from the tab order and onClick is not called. aria-disabled is set to communicate the state to assistive technologies.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'Accessible label for screen readers when the visible text alone is insufficient. If the chip label is abbreviated (e.g. "Vid." instead of "Videos"), use this to provide the full label.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'ID of an element that provides additional description for this chip. Useful when grouped chips share a common instruction element (e.g. "Select all content types that apply").'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'Test identifier for locating the chip in automated tests. Makes it easy to assert checked state and simulate toggle interactions in test suites.'
    }
  ],

  tokens: [
    // Base layout and shape
    'component.chip.default.borderRadius',
    'component.chip.default.textColor',
    // Subtle variant (used by BooleanChip body)
    'component.chip.variants.subtle.backgroundColor',
    'component.chip.variants.subtle.textColor',
    'component.chip.variants.subtle.hover.backgroundColor',
    'component.chip.variants.subtle.active.backgroundColor',
    'component.chip.variants.subtle.disabled.backgroundColor',
    'component.chip.variants.subtle.disabled.textColor',
    // Selected state background
    'semantic.color.background.interactive-subtle',
    // Size variants
    'component.chip.sizes.small.padding',
    'component.chip.sizes.small.font',
    'component.chip.sizes.medium.padding',
    'component.chip.sizes.medium.font',
    // Icon spacing
    'semantic.spacing.layout.xs',
    // Focus ring
    'component.chip.focus.outline',
    'component.chip.focus.outlineOffset',
    // Transition
    'semantic.motion.hover'
  ],

  examples: [
    {
      name: 'Basic Toggle',
      description:
        'A single BooleanChip wired to local state. Click the chip to toggle it between selected and unselected. The checkmark icon and background colour change together with the selected state.',
      code: `const [active, setActive] = React.useState(false)

return (
  <BooleanChip selected={active} onClick={() => setActive(prev => !prev)}>
    {active ? 'Notifications On' : 'Notifications Off'}
  </BooleanChip>
)`,
      renderComponent: () => <SingleToggleExample />
    },
    {
      name: 'Multi-select Filter Panel',
      description:
        'The primary use case for BooleanChip: a group of toggleable options where users select one or more values. Each chip controls a boolean flag in shared state. Selected chips show a checkmark.',
      code: `const [filters, setFilters] = React.useState({
  articles: true,
  videos: false,
  podcasts: false,
  images: true
})

const toggle = (key) =>
  setFilters(prev => ({ ...prev, [key]: !prev[key] }))

return (
  <Stack direction="column" gap="sm">
    <Typography variant="small">Content type</Typography>
    <Stack direction="row" gap="sm" wrap>
      <BooleanChip selected={filters.articles} onClick={() => toggle('articles')}>
        Articles
      </BooleanChip>
      <BooleanChip selected={filters.videos} onClick={() => toggle('videos')}>
        Videos
      </BooleanChip>
      <BooleanChip selected={filters.podcasts} onClick={() => toggle('podcasts')}>
        Podcasts
      </BooleanChip>
      <BooleanChip selected={filters.images} onClick={() => toggle('images')}>
        Images
      </BooleanChip>
    </Stack>
  </Stack>
)`,
      renderComponent: () => <ContentFilterExample />
    },
    {
      name: 'Compact Size in a Tag Filter Bar',
      description:
        'Small-size BooleanChips suit dense toolbars and tag filters where space is at a premium. The selected state is still clearly communicated through the checkmark icon and background change.',
      code: `const [tags, setTags] = React.useState(['electronic'])

const toggleTag = (tag) =>
  setTags(prev =>
    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
  )

const allTags = ['electronic', 'ambient', 'jazz', 'classical', 'hip-hop']

return (
  <Stack direction="column" gap="sm">
    <Typography variant="small">Genre</Typography>
    <Stack direction="row" gap="xs" wrap>
      {allTags.map(tag => (
        <BooleanChip
          key={tag}
          size="small"
          selected={tags.includes(tag)}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </BooleanChip>
      ))}
    </Stack>
  </Stack>
)`,
      renderComponent: () => <CompactTagFilterExample />
    },
    {
      name: 'Disabled State',
      description:
        'A disabled BooleanChip communicates an unavailable filter option while preserving visual context. It cannot be focused, clicked, or activated via keyboard. The aria-disabled attribute ensures screen readers announce the disabled state.',
      code: `<Stack direction="row" gap="sm">
  <BooleanChip selected={true} onClick={() => {}} disabled>
    Premium Only
  </BooleanChip>
  <BooleanChip selected={false} onClick={() => {}} disabled>
    Archived
  </BooleanChip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm">
          <BooleanChip selected={true} onClick={() => {}} disabled>
            Premium Only
          </BooleanChip>
          <BooleanChip selected={false} onClick={() => {}} disabled>
            Archived
          </BooleanChip>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'BooleanChip uses role="checkbox" so screen readers announce it as a checkbox control, not a generic button. Users understand they are toggling a binary on/off state.',
      'aria-checked is set to "true" when selected and "false" when not selected, providing a redundant accessibility signal alongside the visual checkmark icon.',
      'The checkmark icon rendered when selected is wrapped in aria-hidden="true" — it is purely decorative and does not produce duplicate announcements.',
      'When disabled, aria-disabled="true" is set and the chip is removed from the tab order (tabIndex is unset). The disabled prop alone would prevent interaction but aria-disabled also communicates state to assistive technologies.',
      'Focus is indicated with a 2px outline (component.chip.focus tokens), matching the Button and FilterChip focus ring for consistent keyboard navigation across the design system.',
      'Space and Enter both activate the chip, following the standard checkbox/button keyboard contract for web controls.',
      'BooleanChips should be grouped semantically. Wrap a set of related BooleanChips in a fieldset with a legend, or reference a heading via aria-describedby to communicate the filter group\'s purpose to screen readers.'
    ],
    keyboardNavigation:
      'Tab: Move focus to the chip | Space or Enter: Toggle selected state | Shift+Tab: Move focus backward. Disabled chips are excluded from the tab order.',
    screenReader:
      'Announced as "checkbox, [label], checked/not checked". Custom aria-label overrides the visible children text when provided. Disabled chips are announced as "checkbox, [label], dimmed" or similar depending on the screen reader.',
    focusManagement:
      'Focus outline uses component.chip.focus.outline (2px solid) and component.chip.focus.outlineOffset tokens. Focus is visible on keyboard navigation only (focus-visible). Disabled chips cannot receive focus.',
    colorContrast:
      'Text and icon colours exceed WCAG AA requirements (4.5:1) in both selected and unselected states across all chip size variants.'
  },

  anatomy: {
    description:
      'A single inline element that acts as a checkbox control. The left icon slot shows a checkmark only when selected. The label is the primary content. There is no close button on BooleanChip — only FilterChip supports dismissal.',
    diagram: `
┌──────────────────────────────┐
│  BooleanChip                 │
│  ┌──────┐  ┌───────────────┐ │
│  │  ✓   │  │     Label     │ │
│  │(sel) │  │   (children)  │ │
│  └──────┘  └───────────────┘ │
└──────────────────────────────┘

States:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Unselected  │  │   Selected   │  │   Disabled   │
│  subtle bg   │  │ interactive  │  │  opacity 50% │
│  no icon     │  │ subtle bg +✓ │  │  no pointer  │
└──────────────┘  └──────────────┘  └──────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description:
          'Span element with role="checkbox". Uses the subtle chip variant background by default, switching to semantic.color.background.interactive-subtle when selected. Hover and active states use background-color transitions matching other chip and button components.',
        tokens: [
          'component.chip.variants.subtle.backgroundColor',
          'component.chip.variants.subtle.hover.backgroundColor',
          'component.chip.variants.subtle.active.backgroundColor',
          'semantic.color.background.interactive-subtle',
          'component.chip.default.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Checkmark Icon (selected only)',
        description:
          'Icon rendered with aria-hidden="true" when selected prop is true. Positioned to the left of the label via an inline-flex icon container with right margin.',
        tokens: [
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Label',
        description:
          'The children prop rendered as chip text. Size variant controls font and padding.',
        tokens: [
          'component.chip.sizes.medium.font',
          'component.chip.sizes.medium.padding',
          'component.chip.sizes.small.font',
          'component.chip.sizes.small.padding',
          'component.chip.default.textColor'
        ]
      }
    ]
  },

  notes: [
    'BooleanChip vs FilterChip: BooleanChip is fully clickable to toggle on/off. FilterChip is a read-only display of an applied filter — its body is not clickable. Only FilterChip supports dismissal via a close button.',
    'Always pair BooleanChips with a visible group label (Typography or fieldset/legend) so users understand what the chips are filtering.',
    'Both selected and onClick are required props. BooleanChip is a controlled component — maintain toggle state in the parent using useState or equivalent.',
    'The chip body is the entire interactive surface. Do not nest interactive elements inside children — if you need a close/dismiss action, use FilterChip instead.',
    'For very long labels, the chip will expand horizontally. Prefer short labels (1–3 words) and group many options in a wrapping row layout.'
  ]
}
