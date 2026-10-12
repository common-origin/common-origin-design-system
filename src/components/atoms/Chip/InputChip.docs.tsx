import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { InputChip } from './InputChip'
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
          <InputChip
            key={label}
            selected
            onDismiss={() => remove(label)}
          >
            {label}
          </InputChip>
        ))}
      </Stack>
    </Stack>
  )
}

export const inputChipDocs: ComponentDocumentation = {
  id: 'input-chip',
  name: 'InputChip',
  description:
    'A removable value, such as an applied filter, with an optional selected state (a checkmark, with the light-blue fill and blue text when enabled; disabled colours when disabled). The chip body is non-interactive. When onDismiss is provided, a close button lets the user remove the value. Announces as a status element to screen readers. Formerly FilterChip, which is now a deprecated alias (decision 0016).',
  category: 'Atoms',
  parentId: 'chip',

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description:
        'Label describing the applied filter, typically a short key-value string such as "Status: Active" or "Date: Last 30 days". When children is a string and onDismiss is provided, it is used to generate the close button\'s accessible label (e.g. "Remove Status: Active"). If children is not a string, the close button label falls back to "Remove filter".'
    },
    {
      name: 'selected',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Whether the filter is in its selected/applied state. When true, a checkmark icon appears on the left and, when enabled, the chip takes the selected treatment: the light-blue interactive-subtle fill with blue text. A selected disabled chip keeps the checkmark but uses the disabled colours. Typically true for filters that are actively filtering results, false for filter options that exist but are not yet applied.'
    },
    {
      name: 'onDismiss',
      type: '() => void',
      required: false,
      default: 'undefined',
      description:
        'Callback fired when the user removes the filter. When provided, a close (×) button is rendered on the right. Not called when the chip is disabled.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: 'undefined',
      description: 'Deprecated and ignored, removed in 3.0: chips have one size, 24px (decision 0035).'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description:
        'Prevents dismissal: the close button is disabled and aria-disabled is set on the container. A disabled chip uses the disabled colour tokens (component.chip.variants.subtle.disabled), whether or not it is selected; a selected disabled chip keeps its checkmark, in the disabled colour. Use when a filter is temporarily locked (e.g. while a network request is in flight).'
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
    // Subtle variant (InputChip always uses subtle variant)
    'component.chip.variants.subtle.backgroundColor',
    'component.chip.variants.subtle.textColor',
    'component.chip.variants.subtle.disabled.backgroundColor',
    'component.chip.variants.subtle.disabled.textColor',
    // Selected treatment (decision 0016)
    'semantic.color.fill.accent-muted',
    'semantic.color.text.accent',
    // Typography
    'component.chip.sizes.medium.font',
    // Height: one 24px size as a minimum (decisions 0034 and 0035); horizontal padding: semantic spacing
    'semantic.size.label.medium',
    'semantic.space.inset.sm',
    // Icon and close button spacing
    'semantic.space.100',
    'semantic.space.200',
    // Close button shape and states
    'component.chip.closeButton.size',
    'semantic.space.0',
    'semantic.radius.xs',
    'semantic.color.text.disabled',
    'semantic.color.fill.none-hover',
    'semantic.color.fill.none-pressed',
    // Focus ring (applies to both chip and close button)
    'component.chip.focus.outline',
    'semantic.border.focusOffset',
    // Transition
    'semantic.motion.hover'
  ],

  examples: [
    {
      name: 'Selected Filter Display',
      description:
        'The most common use of InputChip: displaying which filters are currently active. On these enabled chips, the selected prop shows a checkmark with the light-blue fill and blue text, communicating the filter is applied. No dismissal is shown here — use this when the filter cannot be individually removed.',
      code: `<Stack direction="column" gap="sm">
  <Typography variant="small">Active filters</Typography>
  <Stack direction="row" gap="sm" wrap>
    <InputChip selected>Status: Active</InputChip>
    <InputChip selected>Date: Last 30 days</InputChip>
    <InputChip selected={false}>Category: All</InputChip>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Typography variant="small">Active filters</Typography>
          <Stack direction="row" gap="sm" wrap>
            <InputChip selected>Status: Active</InputChip>
            <InputChip selected>Date: Last 30 days</InputChip>
            <InputChip selected={false}>Category: All</InputChip>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Dismissible Active Filters',
      description:
        'InputChips with onDismiss render a close (×) button. Each chip represents one applied filter. When the user clicks × or focuses the close button and presses Enter, Space, Delete or Backspace, the filter is removed. This pattern is standard above search results tables or data grids.',
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
        <InputChip
          key={label}
          selected
          onDismiss={() => remove(label)}
        >
          {label}
        </InputChip>
      ))}
    </Stack>
  </Stack>
)`,
      renderComponent: () => <ActiveFiltersExample />
    },
    {
      name: 'Disabled State',
      description:
        'Disabled InputChips cannot be dismissed. They use the disabled colours, whether or not they are selected; a selected disabled chip keeps its checkmark so the state stays visible. Use when a filter is temporarily locked — for example, while a server request triggered by a previous filter change is still loading.',
      code: `<Stack direction="row" gap="sm">
  <InputChip selected disabled>Loading…</InputChip>
  <InputChip selected onDismiss={() => {}} disabled>Locked Filter</InputChip>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="sm">
          <InputChip selected disabled>Loading…</InputChip>
          <InputChip selected onDismiss={() => {}} disabled>Locked Filter</InputChip>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'InputChip uses role="status" by default. This causes screen readers to announce the chip as live status information when it appears or changes, without requiring the user to navigate to it. This is appropriate for filter chips that appear above search results as filters are applied.',
      'The close button has an auto-generated aria-label derived from the chip\'s children text (e.g. "Remove Status: Active"). If children is not a string, the label falls back to "Remove filter". Always use string children with InputChip when dismissal is needed to ensure meaningful close button labels.',
      'The checkmark icon rendered when selected is wrapped in aria-hidden="true" — it is decorative and does not produce duplicate announcements.',
      'The chip container itself is not part of the Tab sequence. The chip body remains non-interactive; when onDismiss is provided, keyboard interaction is available on the trailing close button only.',
      'The close button is independently focusable when present and responds to Enter and Space. This allows keyboard users to navigate directly to the dismiss action without first focusing the chip body.',
      'When disabled, the chip remains non-interactive and the close button uses the native HTML disabled attribute, so it is not focusable or clickable.',
      'For filter bars with multiple InputChips, wrap the group in a landmark or add a visible heading so screen reader users can navigate to the active filter region efficiently.'
    ],
    keyboardNavigation:
      'Tab: Focus the close button (if present and not disabled) | Enter, Space, Delete or Backspace (on close button): Dismiss the filter | Shift+Tab: Move focus backward. The chip container itself is not keyboard-focusable.',
    screenReader:
      'Chip container announced with role="status" and aria-label (or visible text). Close button announced as "Remove [filter label], button". When the close button is disabled, its unavailable state is conveyed by native disabled button semantics. Custom role prop overrides the default "status" role when provided.',
    focusManagement:
      'The close button uses component.chip.focus.outline (2px solid outline) and semantic.border.focusOffset (2px offset) for focus visibility, consistent with BooleanChip and Button. The chip container itself is not keyboard-focusable. Disabled close buttons do not receive focus.',
    colorContrast:
      'Unselected text meets WCAG AA (4.5:1). An enabled selected chip uses blue text on the light-blue fill: 4.70:1 (text.interactive on background.interactive-subtle). The checkmark and close icon take the text colour. A selected disabled chip uses the disabled colours instead, with its checkmark kept; disabled text is exempt from the contrast minimum (WCAG 1.4.3).'
  },

  anatomy: {
    description:
      'An inline container displaying a filter label with an optional leading checkmark (when selected) and an optional trailing close button (when onDismiss is provided). The chip body is non-interactive — only the close button triggers user action.',
    diagram: `
┌────────────────────────────────────────┐
│  InputChip                            │
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
│  subtle bg    │  │ interactive   │  │  disabled bg  │
│  no checkmark │  │ subtle bg + ✓ │  │  no dismiss   │
└───────────────┘  └───────────────┘  └───────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description:
          'Span element with role="status" (default). Uses the subtle chip variant background, switching to the selected treatment when selected and enabled: semantic.color.fill.accent-muted with semantic.color.text.accent. When disabled, selected or not, it uses component.chip.variants.subtle.disabled. Handles Delete and Backspace that bubble up from the focused close button when onDismiss is provided; the container itself is not focusable.',
        tokens: [
          'component.chip.variants.subtle.backgroundColor',
          'component.chip.variants.subtle.textColor',
          'semantic.color.fill.accent-muted',
          'semantic.color.text.accent',
          'component.chip.default.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Checkmark Icon (selected only)',
        description:
          'Icon displayed with aria-hidden="true" when selected is true. Positioned to the left of the label via an inline-flex icon container with right margin.',
        tokens: [
          'semantic.space.100'
        ]
      },
      {
        name: 'Label',
        description:
          'The children prop rendered as filter text. Every chip is one size, 24px (decision 0035).',
        tokens: [
          'component.chip.sizes.medium.font',
          'component.chip.variants.subtle.textColor',
          'semantic.color.text.accent'
        ]
      },
      {
        name: 'Close Button (dismissible only)',
        description:
          'Button element rendered when onDismiss is provided. Has its own hover and active states (near-black at 10% and 15%). Independently focusable. Labelled with "Remove [label]" for screen readers.',
        tokens: [
          'component.chip.closeButton.size',
          'semantic.space.0',
          'semantic.space.200',
          'semantic.radius.xs',
          'semantic.color.text.disabled',
          'semantic.color.fill.none-hover',
          'semantic.color.fill.none-pressed',
          'component.chip.focus.outline',
          'semantic.border.focusOffset',
          'semantic.motion.hover'
        ]
      }
    ]
  },

  notes: [
    'Renamed from FilterChip in 2.16 (decision 0016). FilterChip still works as a deprecated alias. In 3.0 the name FilterChip moves to the toggle chip (today\'s BooleanChip), so replace FilterChip with InputChip before upgrading.',
    'InputChip vs BooleanChip: InputChip is a passive display element — its body is not clickable. It shows which filters are applied. BooleanChip is a toggle control — the whole chip is clickable to turn a filter on or off.',
    'The close button aria-label is derived from children when children is a string (e.g. children="Status: Active" → aria-label="Remove Status: Active"). Use string children whenever the chip is dismissible to guarantee a meaningful label.',
    'data-testid on the chip container generates a matching "-close" suffix on the close button automatically. For example, data-testid="status-filter" gives data-testid="status-filter-close" on the close button.',
    'InputChips are not form inputs — they do not submit values. They are display elements that communicate state and optionally trigger a removal callback.',
    'For a table filter bar: use BooleanChip (or similar toggles) to let users select filter values, then render InputChip above the results to show which filters are active and allow individual removal.'
  ]
}
