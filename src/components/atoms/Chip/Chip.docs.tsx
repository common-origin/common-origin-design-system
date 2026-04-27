import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Chip } from './Chip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

export const chipDocs: ComponentDocumentation = {
  id: 'chip',
  name: 'Chip',
  description: 'The base Chip component for displaying categorical information, tags, and actionable labels. Supports multiple visual variants (default, emphasis, subtle, interactive) and two sizes. For toggleable multi-select filters, see BooleanChip. For dismissible applied-filter displays, see FilterChip.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ChipProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Content to display inside the chip. Typically text labels but can include icons or other React elements. When combined with onClick, content should clearly indicate the action that will be performed.'
    },
    {
      name: 'variant',
      type: "'default' | 'emphasis' | 'subtle' | 'interactive' | 'filter' | 'boolean' | 'light' | 'dark'",
      required: false,
      default: 'default',
      description: 'Visual style variant determining the chip\'s appearance and semantic hierarchy. Default for standard tags, emphasis for highlighting, subtle for background information, interactive for actionable elements, filter for dismissible applied filters, boolean for toggleable quick filters, light/dark for legacy compatibility.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: 'medium',
      description: 'Size variant affecting padding, font size, and overall dimensions. Small for compact layouts and dense interfaces, medium for standard use cases and general content categorization.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Click handler function that makes the chip interactive. When provided, the chip becomes focusable with button semantics and keyboard support. Essential for filter chips, removable tags, and actionable categories.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables interaction for clickable chips while maintaining visual context. When true, prevents onClick execution, keyboard activation, and focus while applying disabled styling to communicate unavailable state.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction verification. Supports consistent testing patterns across chip variants and interaction states throughout the component lifecycle.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Accessible label providing additional context when the visible text alone is insufficient for screen readers. Particularly important for chips with abbreviated content or when action context is needed.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'References the ID of an element providing additional description or instructions related to the chip\'s function or state, enhancing screen reader user understanding of complex interactions.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: 'button (when onClick provided)',
      description: 'ARIA role override for specific semantic meaning. Automatically set to "button" for interactive chips, but can be customized for specialized use cases requiring different assistive technology interpretation.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Legacy prop for backward compatibility. Content displayed in the chip when children prop is not provided. New implementations should use the children prop for better flexibility and React patterns.'
    }
  ],

  tokens: [
    // Default variant
    'component.chip.default.backgroundColor',
    'component.chip.default.textColor',
    'component.chip.default.borderRadius',
    'component.chip.default.padding',
    'component.chip.default.font',
    // Hover/Active states
    'component.chip.hover.backgroundColor',
    'component.chip.active.backgroundColor',
    // Disabled state
    'component.chip.disabled.backgroundColor',
    'component.chip.disabled.textColor',
    // Focus state
    'component.chip.focus.outline',
    'component.chip.focus.outlineOffset',
    // Emphasis variant
    'component.chip.variants.emphasis.backgroundColor',
    'component.chip.variants.emphasis.textColor',
    'component.chip.variants.emphasis.hover.backgroundColor',
    'component.chip.variants.emphasis.active.backgroundColor',
    'component.chip.variants.emphasis.disabled.backgroundColor',
    'component.chip.variants.emphasis.disabled.textColor',
    // Subtle variant
    'component.chip.variants.subtle.backgroundColor',
    'component.chip.variants.subtle.textColor',
    'component.chip.variants.subtle.hover.backgroundColor',
    'component.chip.variants.subtle.active.backgroundColor',
    'component.chip.variants.subtle.disabled.backgroundColor',
    'component.chip.variants.subtle.disabled.textColor',
    // Interactive variant
    'component.chip.variants.interactive.backgroundColor',
    'component.chip.variants.interactive.textColor',
    'component.chip.variants.interactive.hover.backgroundColor',
    'component.chip.variants.interactive.active.backgroundColor',
    'component.chip.variants.interactive.disabled.backgroundColor',
    'component.chip.variants.interactive.disabled.textColor',
    // Size variants
    'component.chip.sizes.small.padding',
    'component.chip.sizes.small.font',
    'component.chip.sizes.medium.padding',
    'component.chip.sizes.medium.font',
    // Selected state (boolean chips)
    'semantic.color.background.interactive-subtle',
    // Spacing
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    // Motion
    'semantic.motion.hover'
  ],

  examples: [
    {
      name: 'Content Categorization Chips',
      description: 'Static chips for organizing and labeling content with appropriate visual hierarchy',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Default - Standard content tags</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="default">Design</Chip>
      <Chip variant="default">Development</Chip>
      <Chip variant="default">Research</Chip>
      <Chip variant="default">Documentation</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Emphasis - Important categories</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="emphasis">Featured</Chip>
      <Chip variant="emphasis">Premium</Chip>
      <Chip variant="emphasis">New</Chip>
      <Chip variant="emphasis">Trending</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Subtle - Background information</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="subtle">Draft</Chip>
      <Chip variant="subtle">Archive</Chip>
      <Chip variant="subtle">Internal</Chip>
      <Chip variant="subtle">System</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Default - Standard content tags</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="default">Design</Chip>
              <Chip variant="default">Development</Chip>
              <Chip variant="default">Research</Chip>
              <Chip variant="default">Documentation</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Emphasis - Important categories</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="emphasis">Featured</Chip>
              <Chip variant="emphasis">Premium</Chip>
              <Chip variant="emphasis">New</Chip>
              <Chip variant="emphasis">Trending</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Subtle - Background information</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="subtle">Draft</Chip>
              <Chip variant="subtle">Archive</Chip>
              <Chip variant="subtle">Internal</Chip>
              <Chip variant="subtle">System</Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Interactive Filter Chips',
      description: 'Clickable chips for filtering, selection, and user interaction with proper accessibility',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Filter Categories - Click to toggle</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Articles')}
        aria-label="Filter by articles"
      >
        Articles
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Videos')}
        aria-label="Filter by videos"
      >
        Videos
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Images')}
        aria-label="Filter by images"
      >
        Images
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Documents')}
        aria-label="Filter by documents"
      >
        Documents
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Action Chips - Perform specific actions</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Share content')}
        aria-label="Share this content"
      >
        Share
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Export data')}
        aria-label="Export data as file"
      >
        Export
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Print view')}
        aria-label="Print current view"
      >
        Print
      </Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Filter Categories - Click to toggle</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Articles')}
                aria-label="Filter by articles"
              >
                Articles
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Videos')}
                aria-label="Filter by videos"
              >
                Videos
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Images')}
                aria-label="Filter by images"
              >
                Images
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Documents')}
                aria-label="Filter by documents"
              >
                Documents
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Action Chips - Perform specific actions</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Share content')}
                aria-label="Share this content"
              >
                Share
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Export data')}
                aria-label="Export data as file"
              >
                Export
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Print view')}
                aria-label="Print current view"
              >
                Print
              </Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Size Variants for Different Contexts',
      description: 'Chips in different sizes optimized for various interface contexts and accessibility requirements',
      code: `<Stack direction="column" gap="lg">
  <div>
    <Typography variant="small">Small - Compact interfaces and dense layouts</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip size="small" variant="default">Tag</Chip>
      <Chip size="small" variant="emphasis">Priority</Chip>
      <Chip size="small" variant="interactive" onClick={() => console.log('Small click')}>
        Action
      </Chip>
      <Chip size="small" variant="subtle">Meta</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Medium - Standard interface elements</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip size="medium" variant="default">Category</Chip>
      <Chip size="medium" variant="emphasis">Featured</Chip>
      <Chip size="medium" variant="interactive" onClick={() => console.log('Medium click')}>
        Filter
      </Chip>
      <Chip size="medium" variant="subtle">Status</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <div>
            <Typography variant="small">Small - Compact interfaces and dense layouts</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip size="small" variant="default">Tag</Chip>
              <Chip size="small" variant="emphasis">Priority</Chip>
              <Chip size="small" variant="interactive" onClick={() => console.log('Small click')}>
                Action
              </Chip>
              <Chip size="small" variant="subtle">Meta</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Medium - Standard interface elements</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip size="medium" variant="default">Category</Chip>
              <Chip size="medium" variant="emphasis">Featured</Chip>
              <Chip size="medium" variant="interactive" onClick={() => console.log('Medium click')}>
                Filter
              </Chip>
              <Chip size="medium" variant="subtle">Status</Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'State Management and Disabled Interaction',
      description: 'Chips with various interaction states including disabled conditions and accessibility considerations',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Active Interactive Chips</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="interactive" onClick={() => console.log('Available action')}>
        Available
      </Chip>
      <Chip variant="interactive" onClick={() => console.log('Active filter')}>
        Active Filter
      </Chip>
      <Chip variant="interactive" onClick={() => console.log('Selectable item')}>
        Selectable
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Disabled Interactive Chips</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Unavailable action"
      >
        Unavailable
      </Chip>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Disabled filter option"
      >
        Disabled Filter
      </Chip>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Locked selection"
      >
        Locked
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Mixed State Example</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="emphasis">Always Visible</Chip>
      <Chip variant="interactive" onClick={() => console.log('Sometimes clickable')}>
        Conditional
      </Chip>
      <Chip variant="interactive" disabled={true}>
        Sometimes Disabled
      </Chip>
      <Chip variant="subtle">Context Info</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Active Interactive Chips</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="interactive" onClick={() => console.log('Available action')}>
                Available
              </Chip>
              <Chip variant="interactive" onClick={() => console.log('Active filter')}>
                Active Filter
              </Chip>
              <Chip variant="interactive" onClick={() => console.log('Selectable item')}>
                Selectable
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Disabled Interactive Chips</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Unavailable action"
              >
                Unavailable
              </Chip>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Disabled filter option"
              >
                Disabled Filter
              </Chip>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Locked selection"
              >
                Locked
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Mixed State Example</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="emphasis">Always Visible</Chip>
              <Chip variant="interactive" onClick={() => console.log('Sometimes clickable')}>
                Conditional
              </Chip>
              <Chip variant="interactive" disabled={true}>
                Sometimes Disabled
              </Chip>
              <Chip variant="subtle">Context Info</Chip>
            </Stack>
          </div>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Interactive chips (variant="interactive" or when onClick is provided) automatically receive button semantics and announce as "button" elements to screen readers.',
      'Non-interactive chips are treated as static text content, preserving natural reading flow without interrupting screen reader navigation patterns.',
      'Tab key moves focus to interactive chips. Enter and Space keys activate the onClick handler following standard web interaction patterns.',
      'Focus indicators are highly visible with 2px outline and offset using component.chip.focus tokens (matching Button component), ensuring clear visual feedback for keyboard users.',
      'Disabled state is communicated through aria-disabled, preventing interaction while maintaining semantic context for assistive technology users.',
      'aria-label support for cases where visible text needs additional context — particularly useful for abbreviated or symbolic content.',
      'Color contrast ratios exceed WCAG 2.2 AA requirements (4.5:1 for normal text) across all variant combinations and interaction states.',
      'For toggleable filter controls, use BooleanChip (role="checkbox"). For dismissible applied filters, use FilterChip (role="status"). See the child pages for their specific accessibility contracts.'
    ],
    keyboardNavigation: 'Tab key moves focus to interactive chips with visible focus outline. Enter or Space key activates the chip\'s onClick handler. Disabled chips are excluded from tab order and do not respond to activation keys.',
    screenReader: 'Static chips announced as their text content. Interactive chips announced as "button" followed by content. Custom aria-label content takes precedence when provided.',
    focusManagement: 'Interactive chips receive focus with outline styling from component.chip.focus tokens (2px solid with 2px offset), matching Button component behavior. Focus moves in logical DOM order. Disabled chips cannot receive focus.'
  },

  notes: [
    'Content Strategy: Use chips for categorical information, content tagging, filtering interfaces, and quick actions. Choose variant based on information hierarchy — emphasis for important categories, subtle for metadata, interactive for user actions.',
    'Sub-variants: For toggleable multi-select filters use BooleanChip (a controlled checkbox-style toggle). For displaying applied filters that can optionally be dismissed use FilterChip. Both appear as child pages under Chip in the docs.',
    'Size Selection Guidelines: Small size for dense interfaces like toolbars and metadata displays. Medium size for standard content categorization and general purpose use.',
    'Interactive Behavior: When onClick is provided on Chip, it automatically becomes focusable with button semantics and keyboard support (Enter/Space to activate).',
    'Legacy Compatibility: Component supports legacy title prop and light/dark variants for backward compatibility, but new implementations should use children prop and current variant system.',
    'Performance Optimization: Component uses styled-components with direct token imports for efficient styling. Transitions and focus states leverage component tokens aligned with Button for consistent behavior.',
    'Design System Integration: Variants map to design tokens ensuring consistency with overall visual hierarchy. Interactive states use semantic.motion.hover for smooth transitions.',
    'Testing Support: data-testid prop enables consistent automated testing across chip variants and states.'
  ],

  anatomy: {
    description: 'A compact inline element with variant-specific styling, optional icons, and interactive states. Hover and active states use background-color changes (not opacity) for consistency with Button and IconButton components.',
    diagram: `
┌────────────────────────────────────┐
│  Chip Container                    │
│  ┌──────┐  ┌─────────┐  ┌───────┐ │
│  │ Icon │  │  Label  │  │ Close │ │
│  │(opt) │  │ (text)  │  │ (opt) │ │
│  └──────┘  └─────────┘  └───────┘ │
└────────────────────────────────────┘

States:
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Default │  │  Hover  │  │ Active  │
│   bg    │→ │ bg-hover│→ │bg-active│
└─────────┘  └─────────┘  └─────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners, variant-specific background color, and color-based hover/active states. Uses background-color transitions matching Button component pattern.',
        tokens: [
          'component.chip.default.backgroundColor',
          'component.chip.hover.backgroundColor',
          'component.chip.active.backgroundColor',
          'component.chip.default.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Icon (optional)',
        description: 'Leading icon slot. Shows checkmark for selected filter/boolean chips. Uses inherited color from container.',
        tokens: [
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Label',
        description: 'Text content using variant-specific color and size-based typography.',
        tokens: [
          'component.chip.default.textColor',
          'component.chip.sizes.medium.font',
          'component.chip.sizes.small.font'
        ]
      },
      {
        name: 'Close Button (optional)',
        description: 'Dismissible filter chips include a close button with its own hover state using subtle background-color change.',
        tokens: [
          'semantic.spacing.layout.sm',
          'semantic.border.radius.xs',
          'semantic.motion.hover'
        ]
      }
    ]
  }
}
