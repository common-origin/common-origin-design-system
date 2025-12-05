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
      type: "'primary' | 'secondary' | 'naked'",
      required: false,
      default: 'primary',
      description: 'Visual style variant: primary (high emphasis), secondary (medium emphasis), naked (minimal styling)'
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
    'component.button.primary.backgroundColor',
    'component.button.primary.textColor',
    'component.button.hover.backgroundColor',
    'component.button.active.backgroundColor',
    'component.button.disabled.backgroundColor',
    'component.button.variants.secondary.*',
    'component.button.variants.naked.*',
    'semantic.color.interactive.primary',
    'semantic.color.interactive.secondary',
    'semantic.spacing.button.padding.*',
    'semantic.spacing.layout.xs',
    'semantic.typography.button',
    'semantic.size.icon.*'
  ],
  
  examples: [
    {
      name: 'Button Variants',
      description: 'Different visual styles for various contexts',
      code: `<Stack direction="row" gap="md">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="naked">Naked</Button>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="naked">Naked</Button>
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
      description: 'Interactive states including disabled',
      code: `<Stack direction="row" gap="md">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="secondary" disabled>Secondary Disabled</Button>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Button>Enabled</Button>
          <Button disabled>Disabled</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" disabled>Secondary Disabled</Button>
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
      description: 'Icons automatically inherit the button text color across all variants',
      code: `<Stack direction="column" gap="sm">
  <Stack direction="row" gap="md">
    <Button iconName="message" variant="primary">Primary</Button>
    <Button iconName="message" variant="secondary">Secondary</Button>
    <Button iconName="message" variant="naked">Naked</Button>
  </Stack>
  <Stack direction="row" gap="md">
    <Button iconName="copy" variant="primary" disabled>Disabled</Button>
    <Button iconName="link" variant="secondary" purpose="link" url="/link">Link Button</Button>
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
            <Button iconName="copy" variant="primary" disabled>Disabled</Button>
            <Button iconName="link" variant="secondary" purpose="link" url="/link">Link Button</Button>
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
    'Variant Hierarchy: Primary for main CTAs, secondary for supporting actions, naked for minimal emphasis or custom contexts',
    'Size Guidelines: Small for compact interfaces, medium for standard use, large for prominent CTAs or touch interfaces',
    'Polymorphic Rendering: Automatically renders semantic HTML (<button> or <a>) with proper attributes based on purpose',
    'Icon Integration: Icons automatically inherit button text color and scale with size - no manual color/size management needed',
    'Form Integration: Type prop supports submit/reset functionality, onClick handler for custom button actions',
    'Link Behavior: Uses Next.js Link for client-side routing performance, supports target attribute for external links',
    'Disabled State: Prevents all interaction (click, keyboard, form submission) and provides visual/ARIA feedback',
    'Design Token Usage: All styling derives from component tokens ensuring consistency and theme support',
    'Performance: Efficient rendering with proper prop forwarding and styled-components optimization',
    'Browser Support: Works across all modern browsers with graceful degradation for older environments',
    'Custom Styling: Naked variant provides base structure for custom styling while maintaining accessibility'
  ]}
