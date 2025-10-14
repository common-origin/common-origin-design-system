import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { Button } from './Button'
import { Stack } from '../Stack'

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
      description: 'Visual style variant of the button'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      description: 'Size variant affecting padding and font size'
    },
    {
      name: 'iconName',
      type: 'keyof typeof iconsData',
      required: false,
      description: 'Name of the icon to display before the button text. Icon automatically inherits button text color and scales with button size.'
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      description: 'URL for link purpose buttons'
    },
    {
      name: 'purpose',
      type: "'button' | 'link'",
      required: false,
      description: 'Semantic purpose determining HTML element (button vs anchor)'
    },
    {
      name: 'target',
      type: 'string',
      required: false,
      description: 'Target attribute for link purpose (_blank, _self, etc.)'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'Button content (text, icons, etc.)'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
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
    }
  ],
  
  accessibility: {
    notes: [
      'Proper semantic HTML (button/a) based on purpose prop',
      'Keyboard navigation support (Tab, Enter, Space)',
      'Screen reader friendly with proper roles',
      'Focus management with visible focus indicators',
      'Disabled state properly communicated to assistive technology',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'All variants meet interactive element contrast requirements',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Tab to focus, Enter/Space to activate',
    screenReader: 'Announced as "button" or "link" based on purpose',
    focusManagement: 'Receives focus outline, respects focus-visible'
  },
  
  notes: [
    'Use purpose="button" for actions, purpose="link" for navigation',
    'Primary variant for main actions, secondary for supporting actions',
    'Naked variant for minimal visual weight or custom styling',
    'Disabled state prevents interaction and updates visual appearance',
    'Size variants maintain consistent vertical rhythm across interfaces',
    'Icons automatically inherit button text color using CSS currentColor',
    'Icon size automatically scales with button size (small→xs, medium→sm, large→md)',
    'Icons are positioned before text content with semantic spacing',
    'All available icons can be found in the icon system documentation'
  ]
  
}
