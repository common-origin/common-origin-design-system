import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { FilterChip } from './FilterChip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

// Stateful example for dismissible filter tags
const ActiveFiltersExample: React.FC = () => {
  const [activeFilters, setActiveFilters] = React.useState([
    'Status: Active',
    'Date: Last 30 days',
    'Category: Design'
  ])

  const remove = (label: string) =>
    setActiveFilters(prev => prev.filter(f => f !== label))

  if (activeFilters.length === 0) {
    return (
      <Typography variant="small" color="subdued">
        All filters removed. Refresh to reset.
      </Typography>
    )
  }

  return (
    <Stack direction="column" gap="sm">
      <Typography variant="small">Active filters</Typography>
      <Stack direction="row" gap="sm" wrap>
        {activeFilters.map(label => (
          <FilterChip
            key={label}
            selected
            onDismiss={() => remove(label)}
          >
            {label}
          </FilterChip>
        ))}
      </Stack>
    </Stack>
  )
}

export const filterChipDocs: ComponentDocumentation = {
  id: 'filter-chip',
  name: 'FilterChip',
  description:
    'Displays an applied filter with an optional selected state and dismissal action. The chip body is non-interactive — it communicates what filter is active. When onDismiss is provided, a close button appears that lets the user remove the filter. Announces as a status element to screen readers.',
  category: 'Atoms',

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description:
        'Label describing the applied filter, typically a short key-value string such as "Status: Active" or "Date: Last 30 days". Used to generate the close button\'s accessible label when aria-label is not provided (e.g. "Remove Status: Active").'
    },
    {
      name: 'selected',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Whether the filter is in its selected/applied state. When true, a checkmark icon appears on the left and the background changes to the interactive-subtle colour. Typically true for filters that are actively filtering results, false for filter options that exist but are not yet applied.'
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      default: 'undefined',
      description:
        'Callback fired when the user removes the filter. When provided, a close (×) button is rendered on the right. Also allows dismissal via Delete or Backspace keys when the chip container is focused. Not called when the chip is disabled.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: 'medium',
      description:
        'Size variant controlling padding and font size. Use small in compact filter bars or toolbars; medium for standard filter displays above tables or lists.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Prevents dismissal and applies reduced-opacity styling. The close button becomes non-functional and aria-disabled is set on the container. Use when a filter is temporarily locked (e.g. while a network request is in flight).'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: 'status',
      description:
        'ARIA role override for the chip container. Defaults to "status" which causes screen readers to announce the chip as status information without requiring user focus. Override only when a different semantic is required by the parent context.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'Accessible label for the chip container. Override the default visible text when extra context is needed, for example when the chip label uses abbreviations.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'ID of an element that provides additional context for this filter chip, such as a description of what the filter affects.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description:
        'Test identifier placed on the chip container. The close button receives this value suffixed with "-close" (e.g. "status-filter-close") for independent targeting in automated tests.'
    }
  ],

  tokens: [
    // Base shape
    'component.chip.default.borderRadius',
    'component.chip.default.textColor',
    // Subtle variant (FilterChip always uses subtle variant)
    'component.chip.variants.subtle.backgroundColor',
    'component.chip.variants.subtle.textColor',
    'component.chip.variants.subtle.disabled.backgroundColor',
    'component.chip.variants.subtle.disabled.textColor',
    // Selected state background
    'semantic.color.background.interactive-subtle',
    // Size variants
    'component.chip.sizes.small.padding',
    'component.chip.sizes.small.font',
    'component.chip.sizes.medium.padding',
    'component.chip.sizes.medium.font',
    // Icon and close button spacing
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    // Close button shape and states
    'semantic.border.radius.xs',
    'semantic.color.text.disabled',
    // Focus ring (applies to both chip and close button)
    'component.chip.focus.outline',
    'component.chip.focus.outlineOffset',
    // Transition
    'semantic.motion.hover'
  ],

  examples: [
    {
      name: 'Selected Filter Display',
      description:
        'The most common use of FilterChip: displaying which filters are currently active. The selected prop shows a checkmark and the interactive-subtle background, communicating the filter is applied. No dismissal is shown here — use this when the filter cannot be individually removed.',
      code: `<Stack direction="column" gap="sm">
  <Typography variant="small">Active filters</Typography>
  <Stack direction="row" gap="sm" wrap>
    <FilterChip selected>Status: Active</FilterChip>
    <FilterChip selected>Date: Last 30 days</FilterChip>
    <FilterChip selected={false}>Category: All</FilterChip>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Typography variant="small">Active filters</Typography>
          <Stack direction="row" gap="sm" wrap>
            <FilterChip selected>Status: Active</FilterChip>
            <FilterChip selected>Date: Last 30 days</FilterChip>
            <FilterChip selected={false}>Category: All</FilterChip>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Dismissible Active Filters',
      description:
        'FilterChips with onDismiss render a close (×) button. Each chip represents one applied filter. When the user clicks × or presses Delete/Backspace while the chip is focused, the filter is removed. This pattern is standard above search results tables or data grids.',
      code: `const [activeFilters, setActiveFilters] = React.useState([
  'Status: Active',
  'Date: Last 30 days',
  'Category: Design'
])

const remove = (label) =>
  setActiveFilters(prev => prev.filter(f => f !== label))

return (
  <Stack direction="column" gap="sm">
    <Typography variant="small">Active filters</Typography>
    <Stack direction="row" gap="sm" wrap>
      {activeFilters.map(label => (
        <FilterChip
          key={label}
          selected
          onDismiss={() => remove(label)}
        >
          {label}
        </FilterChip>
      ))}
    </Stack>
  </Stack>
)`,
      renderComponent: () => <ActiveFiltersExample />
    },
    {
      name: 'Size Variants',
      description:
        'Small FilterChips suit compact toolbars and inline filter displays. Medium chips are the default for standard filter bars. Both sizes support selected state and dismissal.',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Small — compact toolbar</Typography>
    <Stack direction="row" gap="xs" wrap>
      <FilterChip selected size="small">Genre: Electronic</FilterChip>
      <FilterChip selected size="small" onDismiss={() => {}}>BPM: 120–140</FilterChip>
      <FilterChip selected={false} size="small">Key: Any</FilterChip>
    </Stack>
  </div>
  <div>
    <Typography variant="small">Medium — standard filter bar</Typography>
    <Stack direction="row" gap="sm" wrap>
      <FilterChip selected>Genre: Electronic</FilterChip>
      <FilterChip selected onDismiss={() => {}}>BPM: 120–140</FilterChip>
      <FilterChip selected={false}>Key: Any</FilterChip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Small — compact toolbar</Typography>
            <Stack direction="row" gap="xs" wrap>
              <FilterChip selected size="small">Genre: Electronic</FilterChip>
              <FilterChip selected size="small" onDismiss={() => {}}>BPM: 120–140</FilterChip>
              <FilterChip selected={false} size="small">Key: Any</FilterChip>
            </Stack>
          </div>
          <div>
            <Typography variant="small">Medium — standard filter bar</Typography>
            <Stack direction="row" gap="sm" wrap>
              <FilterChip selected>Genre: Electronic</FilterChip>
              <FilterChip selected onDismiss={() => {}}>BPM: 120–140</FilterChip>
              <FilterChip selected={false}>Key: Any</FilterChip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Disabled State',
      description:
        'Disabled FilterChips are visually muted and cannot be dismissed. Use when a filter is temporarily locked — for example, while a server request triggered by a previous filter change is still loading.',
      code: `<Stack direction="row" gap="sm">
  <FilterChip selected disabled>Loading…</FilterChip>
  <FilterChip selected onDismiss={() => {}} disabled>Locked Filter</FilterChip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm">
          <FilterChip selected disabled>Loading…</FilterChip>
          <FilterChip selected onDismiss={() => {}} disabled>Locked Filter</FilterChip>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'FilterChip uses role="status" by default. This causes screen readers to announce the chip as live status information when it appears or changes, without requiring the user to navigate to it. This is appropriate for filter chips that appear above search results as filters are applied.',
      'The close button has an auto-generated aria-label derived from the chip\'s children text (e.g. "Remove Status: Active"). If children is not a string, the label falls back to "Remove filter". Always use string children with FilterChip when dismissal is needed to ensure meaningful close button labels.',
      'The checkmark icon rendered when selected is wrapped in aria-hidden="true" — it is decorative and does not produce duplicate announcements.',
      'When the chip container itself is focused (e.g. after Tab navigation), pressing Delete or Backspace fires onDismiss. This mirrors the keyboard interaction expected for removable tags and filters.',
      'The close button is independently focusable (tabIndex=0) and responds to Enter and Space. This allows keyboard users to navigate directly to the close button without first focusing the chip body.',
      'When disabled, aria-disabled="true" is set on both the container and the close button. Interaction is prevented at the handler level rather than the HTML disabled attribute to preserve focus visibility if needed.',
      'For filter bars with multiple FilterChips, wrap the group in a landmark or add a visible heading so screen reader users can navigate to the active filter region efficiently.'
    ],
    keyboardNavigation:
      'Tab: Focus the chip container | Delete or Backspace (when focused on container): Dismiss the filter | Tab again: Focus the close button (if present) | Enter or Space (on close button): Dismiss the filter | Shift+Tab: Move focus backward.',
    screenReader:
      'Chip container announced with role="status" and aria-label (or visible text). Close button announced as "Remove [filter label], button". Disabled state announced via aria-disabled. Custom role prop overrides the default "status" role when provided.',
    focusManagement:
      'Both the chip container (when keyboard-dismissible) and the close button use component.chip.focus tokens (2px solid outline with 2px offset) for focus visibility, consistent with BooleanChip and Button. Disabled chips and disabled close buttons do not receive focus.',
    colorContrast:
      'Text and icon colours exceed WCAG AA requirements (4.5:1) in both selected and unselected states. The interactive-subtle background used for selected state maintains sufficient contrast with chip text.'
  },

  anatomy: {
    description:
      'An inline container displaying a filter label with an optional leading checkmark (when selected) and an optional trailing close button (when onDismiss is provided). The chip body is non-interactive — only the close button triggers user action.',
    diagram: `
┌────────────────────────────────────────┐
│  FilterChip                            │
│  ┌──────┐  ┌───────────────┐  ┌─────┐ │
│  │  ✓   │  │    Label      │  │  ×  │ │
│  │(sel) │  │  (children)   │  │(opt)│ │
│  └──────┘  └───────────────┘  └─────┘ │
└────────────────────────────────────────┘
  ↑ aria-hidden   ↑ role="status"   ↑ role="button"
                                      aria-label="Remove [label]"

States:
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  Unselected   │  │   Selected    │  │   Disabled    │
│  subtle bg    │  │ interactive   │  │  opacity 50%  │
│  no checkmark │  │ subtle bg + ✓ │  │  no dismiss   │
└───────────────┘  └───────────────┘  └───────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description:
          'Span element with role="status" (default). Uses the subtle chip variant background, switching to semantic.color.background.interactive-subtle when selected. Receives keyboard dismiss events (Delete/Backspace) when onDismiss is provided.',
        tokens: [
          'component.chip.variants.subtle.backgroundColor',
          'component.chip.variants.subtle.textColor',
          'semantic.color.background.interactive-subtle',
          'component.chip.default.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Checkmark Icon (selected only)',
        description:
          'Icon displayed with aria-hidden="true" when selected is true. Positioned to the left of the label via an inline-flex icon container with right margin.',
        tokens: [
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Label',
        description:
          'The children prop rendered as filter text. Size variant controls font and padding.',
        tokens: [
          'component.chip.sizes.medium.font',
          'component.chip.sizes.medium.padding',
          'component.chip.sizes.small.font',
          'component.chip.sizes.small.padding',
          'component.chip.default.textColor'
        ]
      },
      {
        name: 'Close Button (dismissible only)',
        description:
          'Button element rendered when onDismiss is provided. Has its own hover (rgba black 10%) and active (rgba black 15%) states. Independently focusable. Labelled with "Remove [label]" for screen readers.',
        tokens: [
          'semantic.spacing.layout.sm',
          'semantic.border.radius.xs',
          'semantic.color.text.disabled',
          'component.chip.focus.outline',
          'component.chip.focus.outlineOffset',
          'semantic.motion.hover'
        ]
      }
    ]
  },

  notes: [
    'FilterChip vs BooleanChip: FilterChip is a passive display element — its body is not clickable. It shows which filters are applied. BooleanChip is a toggle control — the whole chip is clickable to turn a filter on or off.',
    'The close button aria-label is derived from children when children is a string (e.g. children="Status: Active" → aria-label="Remove Status: Active"). Use string children whenever the chip is dismissible to guarantee a meaningful label.',
    'data-testid on the chip container generates a matching "-close" suffix on the close button automatically. For example, data-testid="status-filter" gives data-testid="status-filter-close" on the close button.',
    'FilterChips are not form inputs — they do not submit values. They are display elements that communicate state and optionally trigger a removal callback.',
    'For a table filter bar: use BooleanChip (or similar toggles) to let users select filter values, then render FilterChip above the results to show which filters are active and allow individual removal.'
  ]
}
