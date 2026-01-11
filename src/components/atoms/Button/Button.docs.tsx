import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { Button } from './Button'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

/**
 * Button component documentation
 * This demonstrates automated prop extraction with enhanced curation
 */
export const buttonDocs: ComponentDocumentation = {
  id: 'button',
  name: 'Button',
  description: 'Interactive button component with various styles, sizes, and states. Supports both button and link purposes for semantic flexibility. Includes icon support with automatic color inheritance and size scaling. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from BaseButtonProps interface
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'naked' | 'emphasis' | 'danger'",
      required: false,
      default: 'primary',
      description: 'Visual style variant: primary (high emphasis, dark), secondary (medium emphasis, gray), naked (minimal styling, transparent), emphasis (blue interactive, prominent CTAs), danger (red, destructive actions)'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: 'medium',
      description: 'Size variant affecting padding, font size, and icon size. Small for compact spaces, large for prominence'
    },
    {
      name: 'iconName',
      type: 'keyof typeof iconsData',
      required: false,
      description: 'Icon displayed before button text. Automatically inherits text color and scales with size (small→xs, medium→sm, large→md icons)'
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      description: 'Navigation URL when purpose="link". Uses standard <a> tag by default, or custom linkComponent if provided'
    },
    {
      name: 'linkComponent',
      type: 'React.ComponentType<any>',
      required: false,
      description: 'Custom link component for client-side routing (e.g., Next.js Link, React Router Link). Receives href and children props. When not provided, uses standard <a> tag'
    },
    {
      name: 'purpose',
      type: "'button' | 'link'",
      required: false,
      default: 'button',
      description: 'Semantic purpose: "button" renders <button> element, "link" renders <a> element (or custom linkComponent wrapper)'
    },
    {
      name: 'target',
      type: 'string',
      required: false,
      description: 'Link target attribute for link purpose buttons (_blank for new tab, _self for same tab)'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button content - typically text, but can include additional elements'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables button interaction and applies disabled styling. Communicated to assistive technologies'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler for button purpose. Not used for link purpose buttons'
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      required: false,
      default: 'button',
      description: 'HTML button type for form interactions when purpose="button"'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for automated testing'
    }
  ],
  
  // Props will be auto-extracted from ButtonProps/LinkProps interfaces
  // We can enhance with better descriptions and examples
  tokens: [
    // Primary variant
    'component.button.primary.backgroundColor',
    'component.button.primary.textColor',
    'component.button.primary.borderRadius',
    'component.button.primary.padding',
    'component.button.primary.font',
    // Hover/Active states (primary)
    'component.button.hover.backgroundColor',
    'component.button.active.backgroundColor',
    // Disabled state
    'component.button.disabled.backgroundColor',
    'component.button.disabled.textColor',
    // Focus state
    'component.button.focus.outline',
    'component.button.focus.outlineOffset',
    // Secondary variant
    'component.button.variants.secondary.backgroundColor',
    'component.button.variants.secondary.textColor',
    'component.button.variants.secondary.hover.backgroundColor',
    'component.button.variants.secondary.active.backgroundColor',
    'component.button.variants.secondary.disabled.backgroundColor',
    'component.button.variants.secondary.disabled.textColor',
    // Naked variant
    'component.button.variants.naked.backgroundColor',
    'component.button.variants.naked.textColor',
    'component.button.variants.naked.hover.backgroundColor',
    'component.button.variants.naked.active.backgroundColor',
    'component.button.variants.naked.disabled.backgroundColor',
    'component.button.variants.naked.disabled.textColor',
    // Emphasis variant (blue interactive)
    'component.button.variants.emphasis.backgroundColor',
    'component.button.variants.emphasis.textColor',
    'component.button.variants.emphasis.hover.backgroundColor',
    'component.button.variants.emphasis.active.backgroundColor',
    'component.button.variants.emphasis.disabled.backgroundColor',
    'component.button.variants.emphasis.disabled.textColor',
    // Danger variant (red destructive)
    'component.button.variants.danger.backgroundColor',
    'component.button.variants.danger.textColor',
    'component.button.variants.danger.hover.backgroundColor',
    'component.button.variants.danger.active.backgroundColor',
    'component.button.variants.danger.disabled.backgroundColor',
    'component.button.variants.danger.disabled.textColor',
    // Size variants
    'component.button.sizes.small.padding',
    'component.button.sizes.small.font',
    'component.button.sizes.medium.padding',
    'component.button.sizes.medium.font',
    'component.button.sizes.large.padding',
    'component.button.sizes.large.font',
    // Spacing and motion
    'semantic.spacing.layout.xs',
    'semantic.motion.hover'
  ],
  
  examples: [
    {
      name: 'Button Variants',
      description: 'Five visual styles for different contexts: primary (dark, high emphasis), secondary (gray, medium emphasis), naked (transparent, minimal), emphasis (blue, prominent CTAs), danger (red, destructive actions)',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="naked">Naked</Button>
  </Stack>
  <Stack direction="row" gap="md">
    <Button variant="emphasis">Emphasis</Button>
    <Button variant="danger">Danger</Button>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Stack direction="row" gap="md">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="naked">Naked</Button>
          </Stack>
          <Stack direction="row" gap="md">
            <Button variant="emphasis">Emphasis</Button>
            <Button variant="danger">Danger</Button>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Button Sizes',
      description: 'Different sizes for hierarchy and context',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
  <Button size="large">Large</Button>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </Stack>
      )
    },
    {
      name: 'Button States',
      description: 'Interactive states including disabled. All variants share consistent disabled styling.',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md">
    <Button>Enabled</Button>
    <Button disabled>Disabled</Button>
  </Stack>
  <Stack direction="row" gap="md">
    <Button variant="emphasis">Emphasis</Button>
    <Button variant="emphasis" disabled>Emphasis Disabled</Button>
  </Stack>
  <Stack direction="row" gap="md">
    <Button variant="danger">Danger</Button>
    <Button variant="danger" disabled>Danger Disabled</Button>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Stack direction="row" gap="md">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </Stack>
          <Stack direction="row" gap="md">
            <Button variant="emphasis">Emphasis</Button>
            <Button variant="emphasis" disabled>Emphasis Disabled</Button>
          </Stack>
          <Stack direction="row" gap="md">
            <Button variant="danger">Danger</Button>
            <Button variant="danger" disabled>Danger Disabled</Button>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Link Purpose',
      description: 'Button component used as a link for navigation',
      code: `<Button purpose="link" url="/example" variant="primary">
  Navigate to Example
</Button>`,
      renderComponent: () => (
        <Button purpose="link" url="/example" variant="primary">
          Navigate to Example
        </Button>
      )
    },
    {
      name: 'Buttons with Icons',
      description: 'Icons automatically inherit button text color and scale with button size',
      code: `<Stack direction="row" gap="md">
  <Button iconName="add" variant="primary">Add Item</Button>
  <Button iconName="play" variant="secondary">Play</Button>
  <Button iconName="close" variant="naked">Close</Button>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Button iconName="add" variant="primary">Add Item</Button>
          <Button iconName="play" variant="secondary">Play</Button>
          <Button iconName="close" variant="naked">Close</Button>
        </Stack>
      )
    },
    {
      name: 'Icon Sizes',
      description: 'Icons automatically scale with button size for consistent proportions',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Button iconName="menu" size="small">Small</Button>
  <Button iconName="menu" size="medium">Medium</Button>
  <Button iconName="menu" size="large">Large</Button>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Button iconName="menu" size="small">Small</Button>
          <Button iconName="menu" size="medium">Medium</Button>
          <Button iconName="menu" size="large">Large</Button>
        </Stack>
      )
    },
    {
      name: 'Icon Color Inheritance',
      description: 'Icons automatically inherit the button text color across all variants including emphasis and danger',
      code: `<Stack direction="column" gap="sm">
  <Stack direction="row" gap="md">
    <Button iconName="message" variant="primary">Primary</Button>
    <Button iconName="message" variant="secondary">Secondary</Button>
    <Button iconName="message" variant="naked">Naked</Button>
  </Stack>
  <Stack direction="row" gap="md">
    <Button iconName="add" variant="emphasis">Add New</Button>
    <Button iconName="trash" variant="danger">Delete</Button>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          <Stack direction="row" gap="md">
            <Button iconName="message" variant="primary">Primary</Button>
            <Button iconName="message" variant="secondary">Secondary</Button>
            <Button iconName="message" variant="naked">Naked</Button>
          </Stack>
          <Stack direction="row" gap="md">
            <Button iconName="add" variant="emphasis">Add New</Button>
            <Button iconName="trash" variant="danger">Delete</Button>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Form Integration',
      description: 'Buttons in form contexts with proper types and states',
      code: `<Stack direction="column" gap="lg">
  {/* Form with submit button */}
  <Stack direction="column" gap="md">
    <Typography variant="h4">User Registration</Typography>
    <Stack direction="row" gap="md">
      <Button type="submit" variant="primary">
        Create Account
      </Button>
      <Button type="button" variant="secondary" onClick={() => console.log('Cancel')}>
        Cancel
      </Button>
    </Stack>
  </Stack>

  {/* Action buttons with icons */}
  <Stack direction="column" gap="md">
    <Typography variant="h4">Document Actions</Typography>
    <Stack direction="row" gap="sm">
      <Button iconName="add" size="small" variant="primary">
        New Document
      </Button>
      <Button iconName="copy" size="small" variant="secondary">
        Duplicate
      </Button>
      <Button iconName="lineOut" size="small" variant="naked">
        Export
      </Button>
    </Stack>
  </Stack>

  {/* Navigation buttons */}
  <Stack direction="column" gap="md">
    <Typography variant="h4">Navigation</Typography>
    <Stack direction="row" gap="md">
      <Button purpose="link" url="/dashboard" variant="primary">
        Go to Dashboard
      </Button>
      <Button purpose="link" url="/docs" target="_blank" variant="secondary" iconName="directionRight">
        View Documentation
      </Button>
    </Stack>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          {/* Form with submit button */}
          <Stack direction="column" gap="md">
            <Typography variant="h4">User Registration</Typography>
            <Stack direction="row" gap="md">
              <Button type="submit" variant="primary">
                Create Account
              </Button>
              <Button type="button" variant="secondary" onClick={() => console.log('Cancel')}>
                Cancel
              </Button>
            </Stack>
          </Stack>

          {/* Action buttons with icons */}
          <Stack direction="column" gap="md">
            <Typography variant="h4">Document Actions</Typography>
            <Stack direction="row" gap="sm">
              <Button iconName="add" size="small" variant="primary">
                New Document
              </Button>
              <Button iconName="copy" size="small" variant="secondary">
                Duplicate
              </Button>
              <Button iconName="lineOut" size="small" variant="naked">
                Export
              </Button>
            </Stack>
          </Stack>

          {/* Navigation buttons */}
          <Stack direction="column" gap="md">
            <Typography variant="h4">Navigation</Typography>
            <Stack direction="row" gap="md">
              <Button purpose="link" url="/dashboard" variant="primary">
                Go to Dashboard
              </Button>
              <Button purpose="link" url="/docs" target="_blank" variant="secondary" iconName="directionRight">
                View Documentation
              </Button>
            </Stack>
          </Stack>
        </Stack>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Semantic HTML: Uses proper <button> or <a> elements based on purpose prop ensuring correct assistive technology behavior',
      'Keyboard Navigation: Full keyboard support - Tab to focus, Enter/Space to activate, works in all navigation contexts',
      'Focus Management: Clear focus indicators with proper focus-visible styling, focus outline meets WCAG contrast requirements',
      'Screen Reader Support: Announced with correct role (button/link), includes button text and icon descriptions',
      'Disabled State: Properly communicated via aria-disabled and disabled attributes, prevents keyboard and mouse interaction',
      'Interactive States: Hover, active, and focus states provide clear feedback with sufficient color contrast ratios',
      'Form Integration: Submit/reset button types work correctly with form validation and submission flows',
      'Link Navigation: Next.js Link integration preserves client-side routing while maintaining accessibility',
      'Icon Accessibility: Icons inherit proper color contrast and are announced as part of button content',
      'Touch Accessibility: Minimum 44px touch target size maintained across all variants and sizes',
      'High Contrast Mode: All variants remain visible and functional in Windows High Contrast and similar modes',
      'WCAG 2.2 AA Compliance: Comprehensive testing ensures all interactive guidelines are met'
    ],
    keyboardNavigation: 'Tab: Focus button | Enter/Space: Activate button or follow link | Standard form navigation for submit/reset types',
    screenReader: 'Announced as "button" or "link" with content. Disabled state announced. Icon content integrated with button text.',
    focusManagement: 'Focus outline visible on keyboard navigation, respects focus-visible. Focus moves to next logical element after activation.',
    colorContrast: 'All variants exceed WCAG AA requirements (4.5:1 for text, 3:1 for non-text). Interactive states maintain contrast ratios.'
  },

  notes: [
    'Semantic Purpose: Use purpose="button" for actions (forms, modals, state changes), purpose="link" for navigation',
    'Variant Hierarchy: Primary for main actions, secondary for supporting actions, naked for minimal emphasis, emphasis for prominent blue CTAs, danger for destructive/irreversible actions',
    'Emphasis Variant: Use for sign-up flows, primary CTAs that need to stand out, and actions you want to encourage users to take',
    'Danger Variant: Reserve for destructive actions like delete, remove, or cancel subscription. Always pair with confirmation dialogs for irreversible actions',
    'Size Guidelines: Small for compact interfaces, medium for standard use, large for prominent CTAs or touch interfaces',
    'Polymorphic Rendering: Automatically renders semantic HTML (<button> or <a>) with proper attributes based on purpose',
    'Icon Integration: Icons automatically inherit button text color and scale with size - no manual color/size management needed',
    'Form Integration: Type prop supports submit/reset functionality, onClick handler for custom button actions',
    'Link Behavior: Uses Next.js Link for client-side routing performance, supports target attribute for external links',
    'Disabled State: Prevents all interaction (click, keyboard, form submission) and provides visual/ARIA feedback. All variants share consistent disabled styling.',
    'Hover/Active States: All variants use background-color changes (not opacity) for consistent behavior matching Chip and IconButton components',
    'Design Token Usage: All styling derives from component tokens ensuring consistency and theme support',
    'Performance: Efficient rendering with proper prop forwarding and styled-components optimization',
    'Browser Support: Works across all modern browsers with graceful degradation for older environments'
  ],

  anatomy: {
    description: 'A button element with variant-specific styling, optional leading icon, and text content. Hover and active states use background-color transitions for visual feedback.',
    diagram: `
┌─────────────────────────────────┐
│  Button Container               │
│  ┌──────┐  ┌────────────────┐  │
│  │ Icon │  │  Text Content  │  │
│  │(opt) │  │                │  │
│  └──────┘  └────────────────┘  │
└─────────────────────────────────┘

Variant Colors:
┌─────────┐ ┌─────────┐ ┌─────────┐
│ Primary │ │Secondary│ │  Naked  │
│ #212529 │ │ #dee2e6 │ │ transp. │
└─────────┘ └─────────┘ └─────────┘
┌─────────┐ ┌─────────┐
│Emphasis │ │ Danger  │
│ #0265DC │ │ #D31510 │
└─────────┘ └─────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root button or anchor element with variant-specific background, text color, and hover/active/disabled states using background-color transitions.',
        tokens: [
          'component.button.primary.backgroundColor',
          'component.button.hover.backgroundColor',
          'component.button.active.backgroundColor',
          'component.button.primary.borderRadius',
          'semantic.motion.hover'
        ]
      },
      {
        name: 'Icon (optional)',
        description: 'Leading icon that automatically inherits text color and scales with button size (small→xs, medium→sm, large→md).',
        tokens: [
          'semantic.spacing.layout.xs'
        ]
      },
      {
        name: 'Text Content',
        description: 'Button label using size-specific typography. Color inherited from variant.',
        tokens: [
          'component.button.sizes.small.font',
          'component.button.sizes.medium.font',
          'component.button.sizes.large.font'
        ]
      }
    ]
  }
}
