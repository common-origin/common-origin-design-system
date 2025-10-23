import { ComponentDocumentation } from '../../../lib/docgen/types'
import { IconButton } from './IconButton'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

export const iconButtonDocs: ComponentDocumentation = {
  id: 'iconbutton',
  name: 'IconButton',
  description: 'A versatile interactive button component that displays only an icon with comprehensive accessibility support. Essential for space-efficient interfaces while maintaining full usability for all users. Features mandatory ARIA labeling, keyboard navigation, state management, and WCAG 2.2 AA compliance with automated accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from IconButtonProps interface
  props: [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'naked'",
      required: true,
      description: 'Visual style variant determining the button\'s appearance and semantic meaning. Primary for main actions, secondary for supporting actions, and naked for minimal visual weight while maintaining functionality.'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      default: 'medium',
      required: false,
      description: 'Size variant affecting button dimensions, touch target size, and contained icon proportions. Ensures appropriate interaction area for different use cases and device contexts.'
    },
    {
      name: 'iconName',
      type: 'keyof typeof iconsData',
      required: true,
      description: 'Name of the icon to display from the design system icon library. Must be a valid icon identifier that exists in the icon data registry for proper rendering and accessibility.'
    },
    {
      name: 'url',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Optional URL for navigation functionality. When provided, the button will navigate to the specified location using appropriate methods (internal navigation or external links with security considerations).'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Click handler function executed when the button is activated via mouse click, keyboard interaction, or assistive technology. Provides programmatic control over button behavior.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: true,
      description: 'Required accessible label that describes the button\'s purpose for screen reader users. Critical for accessibility since icon-only buttons lack visible text content that conveys meaning to assistive technologies.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'References the ID of an element that provides additional description or context about the button\'s function, enhancing screen reader understanding for complex interactions.'
    },
    {
      name: 'aria-expanded',
      type: 'boolean',
      required: false,
      default: 'undefined',
      description: 'Indicates whether the button controls content that can be expanded (true) or collapsed (false). Essential for dropdown, accordion, and collapsible content interactions.'
    },
    {
      name: 'aria-pressed',
      type: 'boolean',
      required: false,
      default: 'undefined',
      description: 'Indicates the pressed state for toggle-style buttons. Use true for active/selected state, false for inactive, and omit for non-toggle buttons to maintain proper state communication.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables button interaction and applies appropriate visual styling. When true, prevents click handlers and keyboard activation while maintaining accessibility attributes for screen reader context.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction. Supports consistent test implementation across the component lifecycle and integration testing scenarios.'
    },
    {
      name: '...htmlProps',
      type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
      required: false,
      default: '{}',
      description: 'All standard HTML button attributes including className, id, style, type, and event handlers. Provides full extensibility while maintaining semantic button behavior and accessibility properties.'
    }
  ],

  tokens: [
    'component.iconButton.primary.backgroundColor - Primary variant background color and visual hierarchy',
    'component.iconButton.secondary.backgroundColor - Secondary variant styling for supporting actions',
    'component.iconButton.naked.backgroundColor - Minimal variant with transparent background styling',
    'component.iconButton.sizes.small.minWidth - Small size variant dimensions and touch targets',
    'component.iconButton.sizes.medium.minWidth - Medium size variant optimal for most interfaces',
    'component.iconButton.sizes.large.minWidth - Large size variant for prominent actions and accessibility',
    'component.iconButton.hover.backgroundColor - Interactive hover state visual feedback',
    'component.iconButton.focus.outline - Keyboard focus indicator styling and visibility',
    'semantic.motion.transition.normal - Smooth state transitions and user feedback timing'
  ],

  examples: [
    {
      name: 'Primary Action Buttons',
      description: 'High-emphasis icon buttons for primary actions with strong visual hierarchy',
      code: `<Stack direction="row" gap="md">
  <IconButton 
    variant="primary" 
    size="medium" 
    iconName="plus" 
    aria-label="Add new item"
    onClick={() => console.log('Add item')}
  />
  <IconButton 
    variant="primary" 
    size="medium" 
    iconName="save" 
    aria-label="Save changes"
    onClick={() => console.log('Save')}
  />
  <IconButton 
    variant="primary" 
    size="medium" 
    iconName="share" 
    aria-label="Share content"
    onClick={() => console.log('Share')}
  />
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <IconButton 
            variant="primary" 
            size="medium" 
            iconName="add" 
            aria-label="Add new item"
            onClick={() => console.log('Add item')}
          />
          <IconButton 
            variant="primary" 
            size="medium" 
            iconName="copy" 
            aria-label="Save changes"
            onClick={() => console.log('Save')}
          />
          <IconButton 
            variant="primary" 
            size="medium" 
            iconName="link" 
            aria-label="Share content"
            onClick={() => console.log('Share')}
          />
        </Stack>
      )
    },
    {
      name: 'Size Variants for Context',
      description: 'Different sizes optimized for various interface contexts and accessibility requirements',
      code: `<Stack direction="column" gap="lg">
  <div>
    <Typography variant="small" style={{ marginBottom: '8px', display: 'block' }}>
      Small - Compact interfaces, toolbars
    </Typography>
    <Stack direction="row" gap="sm">
      <IconButton variant="secondary" size="small" iconName="edit" aria-label="Edit item" />
      <IconButton variant="secondary" size="small" iconName="delete" aria-label="Delete item" />
      <IconButton variant="secondary" size="small" iconName="more" aria-label="More options" />
    </Stack>
  </div>
  
  <div>
    <Typography variant="small" style={{ marginBottom: '8px', display: 'block' }}>
      Medium - Default interface elements
    </Typography>
    <Stack direction="row" gap="sm">
      <IconButton variant="secondary" size="medium" iconName="edit" aria-label="Edit item" />
      <IconButton variant="secondary" size="medium" iconName="delete" aria-label="Delete item" />
      <IconButton variant="secondary" size="medium" iconName="more" aria-label="More options" />
    </Stack>
  </div>
  
  <div>
    <Typography variant="small" style={{ marginBottom: '8px', display: 'block' }}>
      Large - Prominent actions, mobile interfaces
    </Typography>
    <Stack direction="row" gap="sm">
      <IconButton variant="secondary" size="large" iconName="edit" aria-label="Edit item" />
      <IconButton variant="secondary" size="large" iconName="delete" aria-label="Delete item" />
      <IconButton variant="secondary" size="large" iconName="more" aria-label="More options" />
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <div>
            <Typography variant="small">
              Small - Compact interfaces, toolbars
            </Typography>
            <Stack direction="row" gap="sm">
              <IconButton variant="secondary" size="small" iconName="copy" aria-label="Edit item" />
              <IconButton variant="secondary" size="small" iconName="close" aria-label="Delete item" />
              <IconButton variant="secondary" size="small" iconName="menu" aria-label="More options" />
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">
              Medium - Default interface elements
            </Typography>
            <Stack direction="row" gap="sm">
              <IconButton variant="secondary" size="medium" iconName="copy" aria-label="Edit item" />
              <IconButton variant="secondary" size="medium" iconName="close" aria-label="Delete item" />
              <IconButton variant="secondary" size="medium" iconName="menu" aria-label="More options" />
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">
              Large - Prominent actions, mobile interfaces
            </Typography>
            <Stack direction="row" gap="sm">
              <IconButton variant="secondary" size="large" iconName="copy" aria-label="Edit item" />
              <IconButton variant="secondary" size="large" iconName="close" aria-label="Delete item" />
              <IconButton variant="secondary" size="large" iconName="menu" aria-label="More options" />
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Interactive States and Toggle Patterns',
      description: 'Buttons with state management including toggle behavior and expanded content control',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md">
    <IconButton 
      variant="secondary" 
      size="medium" 
      iconName="bookmark" 
      aria-label="Bookmark item"
      aria-pressed={false}
      onClick={() => console.log('Toggle bookmark')}
    />
    <IconButton 
      variant="primary" 
      size="medium" 
      iconName="bookmark" 
      aria-label="Remove bookmark"
      aria-pressed={true}
      onClick={() => console.log('Toggle bookmark')}
    />
  </Stack>
  
  <Stack direction="row" gap="md">
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="arrowDown" 
      aria-label="Expand details"
      aria-expanded={false}
      onClick={() => console.log('Toggle expansion')}
    />
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="arrowUp" 
      aria-label="Collapse details"
      aria-expanded={true}
      onClick={() => console.log('Toggle expansion')}
    />
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">
              Toggle States - Bookmark example
            </Typography>
            <Stack direction="row" gap="md">
              <IconButton 
                variant="secondary" 
                size="medium" 
                iconName="userBox" 
                aria-label="Bookmark item"
                aria-pressed={false}
                onClick={() => console.log('Toggle bookmark')}
              />
              <IconButton 
                variant="primary" 
                size="medium" 
                iconName="userBox" 
                aria-label="Remove bookmark"
                aria-pressed={true}
                onClick={() => console.log('Toggle bookmark')}
              />
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">
              Expandable Content Control
            </Typography>
            <Stack direction="row" gap="md">
              <IconButton 
                variant="naked" 
                size="medium" 
                iconName="arrowDown" 
                aria-label="Expand details"
                aria-expanded={false}
                onClick={() => console.log('Toggle expansion')}
              />
              <IconButton 
                variant="naked" 
                size="medium" 
                iconName="arrowUp" 
                aria-label="Collapse details"
                aria-expanded={true}
                onClick={() => console.log('Toggle expansion')}
              />
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Navigation and External Links',
      description: 'Icon buttons configured for navigation with proper security and accessibility handling',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md">
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="back" 
      aria-label="Go back to previous page"
      url="/previous"
    />
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="home" 
      aria-label="Go to homepage"
      url="/"
    />
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="external" 
      aria-label="Open in new window"
      url="https://example.com"
    />
  </Stack>
  
  <Stack direction="row" gap="md">
    <IconButton 
      variant="secondary" 
      size="medium" 
      iconName="download" 
      aria-label="Download file"
      onClick={() => console.log('Download initiated')}
    />
    <IconButton 
      variant="secondary" 
      size="medium" 
      iconName="print" 
      aria-label="Print document"
      onClick={() => window.print()}
    />
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">
              Navigation Actions
            </Typography>
            <Stack direction="row" gap="md">
              <IconButton 
                variant="naked" 
                size="medium" 
                iconName="back" 
                aria-label="Go back to previous page"
                onClick={() => console.log('Navigate back')}
              />
              <IconButton 
                variant="naked" 
                size="medium" 
                iconName="directionRight" 
                aria-label="Go to homepage"
                onClick={() => console.log('Navigate home')}
              />
              <IconButton 
                variant="naked" 
                size="medium" 
                iconName="link" 
                aria-label="Open in new window"
                onClick={() => console.log('External link')}
              />
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">
              System Actions
            </Typography>
            <Stack direction="row" gap="md">
              <IconButton 
                variant="secondary" 
                size="medium" 
                iconName="copy" 
                aria-label="Download file"
                onClick={() => console.log('Download initiated')}
              />
              <IconButton 
                variant="secondary" 
                size="medium" 
                iconName="lineOut" 
                aria-label="Print document"
                onClick={() => console.log('Print document')}
              />
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Disabled States and Context',
      description: 'Properly disabled buttons that maintain accessibility context and visual hierarchy',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md">
    <IconButton 
      variant="primary" 
      size="medium" 
      iconName="save" 
      aria-label="Save changes"
      disabled={true}
    />
    <IconButton 
      variant="secondary" 
      size="medium" 
      iconName="edit" 
      aria-label="Edit item"
      disabled={true}
    />
    <IconButton 
      variant="naked" 
      size="medium" 
      iconName="delete" 
      aria-label="Delete item"
      disabled={true}
    />
  </Stack>
  
  <Typography variant="small">
    Disabled buttons maintain their semantic meaning and aria-label for context 
    while preventing interaction and applying appropriate visual styling.
  </Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Stack direction="row" gap="md">
            <IconButton 
              variant="primary" 
              size="medium" 
              iconName="copy" 
              aria-label="Save changes"
              disabled={true}
            />
            <IconButton 
              variant="secondary" 
              size="medium" 
              iconName="message" 
              aria-label="Edit item"
              disabled={true}
            />
            <IconButton 
              variant="naked" 
              size="medium" 
              iconName="close" 
              aria-label="Delete item"
              disabled={true}
            />
          </Stack>
          
          <Typography variant="small">
            Disabled buttons maintain their semantic meaning and aria-label for context 
            while preventing interaction and applying appropriate visual styling.
          </Typography>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Mandatory aria-label attribute provides essential context for screen reader users since icon-only buttons lack visible text',
      'Comprehensive keyboard navigation support with Tab for focus and Enter/Space for activation following standard interaction patterns',
      'Dynamic ARIA state management through aria-pressed for toggle buttons and aria-expanded for collapsible content controllers',
      'Focus indicators are highly visible and consistent with design system standards, supporting focus-visible for enhanced keyboard navigation',
      'Icon elements marked with aria-hidden="true" to prevent duplicate announcements while preserving button semantic meaning',
      'Disabled state properly communicated through aria-disabled attribute and tabIndex management for assistive technology compatibility',
      'High contrast mode support with adaptive border styling ensuring visibility across all user preference settings',
      'Color contrast ratios exceed WCAG 2.2 AA requirements (3:1 minimum) for all interactive states and variant combinations',
      'Touch target sizes meet accessibility guidelines with minimum 44px interaction areas on medium and large size variants',
      'Automated accessibility testing with jest-axe integration ensures ongoing compliance throughout component lifecycle',
      'Screen reader testing validates proper announcement patterns: "aria-label text, button" with appropriate state information',
      'Reduced motion preference support disables animations for users with vestibular sensitivity or motion preferences'
    ],
    keyboardNavigation: 'Tab key moves focus to button with visible focus indicator. Enter or Space key activates the button. Disabled buttons are excluded from tab order via tabIndex=-1.',
    screenReader: 'Announced as "aria-label text, button" with additional state information (pressed, expanded, disabled) when applicable. Icon content hidden from screen readers to prevent confusion.',
    focusManagement: 'Receives standard focus outline with enhanced visibility. Supports focus-visible for keyboard vs mouse interaction distinction. Focus is properly removed when disabled and restored when re-enabled.'
  },

  notes: [
    'Mandatory aria-label Requirement: Every IconButton must include a descriptive aria-label since icons alone cannot convey meaning to screen reader users. Use clear, action-oriented language that describes what the button will do.',
    'Icon System Integration: iconName prop must reference valid icons from the design system registry. The component automatically handles icon sizing and color coordination based on button variant and size selections.',
    'State Management Best Practices: Use aria-pressed for toggle functionality (true/false/undefined) and aria-expanded for collapsible content control. These attributes are essential for proper assistive technology communication.',
    'Touch Target Optimization: Medium and large size variants provide 44px minimum touch targets meeting accessibility guidelines. Small variant should be used cautiously in touch interfaces and never for primary actions.',
    'Navigation Security: URL-based navigation includes security considerations with noopener/noreferrer for external links and proper internal navigation handling to prevent security vulnerabilities.',
    'Performance Considerations: Component uses styled-components with prop filtering to prevent DOM attribute warnings. Icon rendering is optimized through the integrated Icon component with proper color coordination.',
    'Responsive Design Integration: Size variants are designed to work seamlessly across device types. Consider using larger sizes on mobile interfaces for improved usability and accessibility compliance.',
    'Testing Integration: data-testid prop enables consistent automated testing. Component includes comprehensive test coverage for interaction patterns, keyboard navigation, and accessibility compliance verification.'
  ]
}
