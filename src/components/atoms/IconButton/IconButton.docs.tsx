import { ComponentDocumentation } from '../../../lib/docgen/types'
import { IconButton } from './IconButton'
import { Stack } from '../Stack'

export const iconButtonDocs: ComponentDocumentation = {
  id: 'iconbutton',
  name: 'IconButton',
  description: 'Interactive button displaying only an icon. Requires aria-label for accessibility and supports all button variants and sizes. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from IconButtonProps interface
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'naked'",
      required: true,
      description: 'Visual style variant of the icon button'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: 'medium',
      required: false,
      description: 'Size variant affecting button dimensions and icon size'
    },
    {
      name: 'iconName',
      type: 'string',
      required: true,
      description: 'Name of the icon to display'
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      description: 'URL for link-style icon buttons'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler function'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: true,
      description: 'Required accessible label for screen readers'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      description: 'ID of element that describes the button'
    },
    {
      name: 'aria-expanded',
      type: 'boolean',
      required: false,
      description: 'Indicates if button controls expanded/collapsed content'
    },
    {
      name: 'aria-pressed',
      type: 'boolean',
      required: false,
      description: 'Indicates pressed state for toggle buttons'
    }
  ],

  tokens: [
    'component.iconButton.primary.*',
    'component.iconButton.secondary.*',
    'component.iconButton.naked.*',
    'semantic.size.iconButton.small',
    'semantic.size.iconButton.medium',
    'semantic.size.iconButton.large',
    'semantic.motion.transition.fast'
  ],

  examples: [
    {
      name: 'Icon Button Variants',
      description: 'Different visual styles with proper accessibility',
      code: `<IconButton variant="primary" size="medium" iconName="arrowDown" aria-label="Open accordion" />
<IconButton variant="secondary" size="medium" iconName="arrowUp" aria-label="Close accordion" />
<IconButton variant="naked" size="medium" iconName="back" aria-label="Back to home" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <IconButton variant="primary" iconName="arrowDown" aria-label="Open accordion" />
          <IconButton variant="secondary" iconName="arrowUp" aria-label="Close accordion" />
          <IconButton variant="naked" iconName="back" aria-label="Back to home" />
        </Stack>
      )
    },
    {
      name: 'Icon Button Sizes',
      description: 'Different size variants for various contexts',
      code: `<IconButton variant="primary" size="small" iconName="close" aria-label="Close item" />
<IconButton variant="primary" size="medium" iconName="close" aria-label="Close item" />
<IconButton variant="primary" size="large" iconName="close" aria-label="Close item" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <IconButton variant="primary" size="small" iconName="close" aria-label="Close item" />
          <IconButton variant="primary" size="medium" iconName="close" aria-label="Close item" />
          <IconButton variant="primary" size="large" iconName="close" aria-label="Close item" />
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'aria-label is required for screen reader accessibility',
      'Use aria-expanded for buttons that control collapsible content',
      'Use aria-pressed for toggle-style buttons',
      'Keyboard navigation support (Tab, Enter, Space)',
      'Focus indicators visible and consistent with design system',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'All variants meet interactive element contrast requirements',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Tab to focus, Enter/Space to activate',
    screenReader: 'Announced with aria-label text and button role',
    focusManagement: 'Receives focus outline, supports focus-visible'
  },

  notes: [
    'Always provide meaningful aria-label for accessibility',
    'Use consistent icon names from your icon system',
    'Consider context when choosing variant and size',
    'For navigation, consider using url prop for semantic links',
    'Test with screen readers to ensure proper announcements'
  ]
}
