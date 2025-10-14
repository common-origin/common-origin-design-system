import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Icon } from '../Icon'
import { Stack } from '../Stack'

export const iconDocs: ComponentDocumentation = {
  id: 'icon',
  name: 'Icon',
  description: 'Displays SVG icons with consistent sizing and semantic color variants. Renders inline SVG elements using path data from icons.json for optimal performance and styling control. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from IconProps interface
  props: [
    {
      name: 'name',
      type: 'keyof typeof iconsData',
      required: true,
      description: 'Name of the icon from the icons.json file (e.g., "arrowDown", "star", "heart")'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      required: false,
      description: 'Size variant affecting width and height dimensions'
    },
    {
      name: 'iconColor',
      type: "'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning'",
      required: false,
      description: 'Semantic color variant applied via CSS color property'
    }
  ],
  
  tokens: [
    'semantic.size.icon.xs',
    'semantic.size.icon.sm',
    'semantic.size.icon.md',
    'semantic.size.icon.lg',
    'semantic.size.icon.xl',
    'semantic.size.icon.2xl',
    'semantic.color.icon.default',
    'semantic.color.icon.emphasis',
    'semantic.color.icon.subdued',
    'semantic.color.icon.disabled',
    'semantic.color.icon.inverse',
    'semantic.color.icon.interactive',
    'semantic.color.icon.error',
    'semantic.color.icon.success',
    'semantic.color.icon.warning'
  ],
  
  accessibility: {
    notes: [
      'Includes aria-label for screen readers based on icon name',
      'Inline SVG display maintains text flow',
      'Semantic color variants provide visual hierarchy',
      'Icons have descriptive names for better accessibility',
      'SVG role="img" makes icons accessible to assistive technologies',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'All color variants meet contrast requirements for enhanced usability',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Not interactive - no keyboard navigation',
    screenReader: 'Aria-label based on icon name from JSON data',
    colorContrast: 'Color variants use semantic token colors for proper contrast'
  },
  
  examples: [
    {
      name: 'Basic Icon',
      description: 'Standard icon with default size and color',
      code: `<Icon name="play" />`,
      renderComponent: () => (
        <Icon name="play" />
      )
    },
    {
      name: 'Icon Sizes',
      description: 'Different size variants for various contexts',
      code: `<Icon name="menu" size="xs" />
<Icon name="menu" size="sm" />
<Icon name="menu" size="md" />
<Icon name="menu" size="lg" />
<Icon name="menu" size="xl" />
<Icon name="menu" size="2xl" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Icon name="menu" size="xs" />
          <Icon name="menu" size="sm" />
          <Icon name="menu" size="md" />
          <Icon name="menu" size="lg" />
          <Icon name="menu" size="xl" />
          <Icon name="menu" size="2xl" />
        </Stack>
      )
    },
    {
      name: 'Color Variants',
      description: 'Semantic color variations for different states',
      code: `<Icon name="userBox" iconColor="default" />
<Icon name="userBox" iconColor="emphasis" />
<Icon name="userBox" iconColor="subdued" />
<Icon name="userBox" iconColor="interactive" />
<Icon name="userBox" iconColor="error" />
<Icon name="userBox" iconColor="success" />
<Icon name="userBox" iconColor="warning" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Icon name="userBox" iconColor="default" />
          <Icon name="userBox" iconColor="emphasis" />
          <Icon name="userBox" iconColor="subdued" />
          <Icon name="userBox" iconColor="interactive" />
          <Icon name="userBox" iconColor="error" />
          <Icon name="userBox" iconColor="success" />
          <Icon name="userBox" iconColor="warning" />
        </Stack>
      )
    },
    {
      name: 'Available Icons',
      description: 'All available icons in the system',
      code: `<Icon name="add" />
<Icon name="arrowDown" />
<Icon name="arrowUp" />
<Icon name="arrowLeft" />
<Icon name="arrowRight" />
<Icon name="back" />
<Icon name="caret" />
<Icon name="close" />
<Icon name="copy" />
<Icon name="directionRight" />
<Icon name="lineOut" />
<Icon name="link" />
<Icon name="menu" />
<Icon name="message" />
<Icon name="pause" />
<Icon name="play" />
<Icon name="playBack" />
<Icon name="userBox" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Icon name="add" />
          <Icon name="arrowDown" />
          <Icon name="arrowUp" />
          <Icon name="arrowLeft" />
          <Icon name="arrowRight" />
          <Icon name="back" />
          <Icon name="caret" />
          <Icon name="close" />
          <Icon name="copy" />
          <Icon name="directionRight" />
          <Icon name="lineOut" />
          <Icon name="link" />
          <Icon name="menu" />
          <Icon name="message" />
          <Icon name="pause" />
          <Icon name="play" />
          <Icon name="playBack" />
          <Icon name="userBox" />
        </Stack>
      )
    }
  ],
  
  notes: [
    'Icons are loaded from styles/icons.json with SVG path data',
    'Renders inline SVG elements for optimal performance and styling control',
    'Color variants use semantic token colors via CSS color property',
    'Icon names must match keys in the icons.json file (e.g., "arrowDown", "back")',
    'Aria-label is automatically set to the icon name for accessibility',
    'SVG viewBox is set to "0 0 24 24" for consistent icon proportions',
    'Missing icons are handled gracefully with console warnings'
  ]
}
