import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

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
      description: 'Icon name from icons.json (add, arrowDown, menu, play, etc.). Must match exact key in icon data file'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      required: false,
      default: 'lg',
      description: 'Size variant from 12px (xs) to 48px (2xl). Uses semantic.size.icon tokens for consistent scaling'
    },
    {
      name: 'iconColor',
      type: "'default' | 'emphasis' | 'subdued' | 'disabled' | 'inverse' | 'interactive' | 'error' | 'success' | 'warning' | 'inherit'",
      required: false,
      default: 'default',
      description: 'Semantic color variant. Use "inherit" to inherit color from parent text context'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing purposes'
    }
  ],
  
  tokens: [
    // Size tokens
    'semantic.size.icon.xs',    // 12px
    'semantic.size.icon.sm',    // 16px
    'semantic.size.icon.md',    // 20px
    'semantic.size.icon.lg',    // 24px (default)
    'semantic.size.icon.xl',    // 32px
    'semantic.size.icon.2xl',   // 48px
    // Color tokens
    'semantic.color.icon.default',
    'semantic.color.icon.emphasis',
    'semantic.color.icon.subdued',
    'semantic.color.icon.disabled',
    'semantic.color.icon.inverse',
    'semantic.color.icon.interactive',
    'semantic.color.icon.error',
    'semantic.color.icon.success',
    'semantic.color.icon.warning',
    // Note: 'inherit' uses currentColor (no token)
  ],
  
  accessibility: {
    notes: [
      'Semantic Labeling: Automatically generates aria-label from icon name in JSON data for screen reader accessibility',
      'SVG Accessibility: Uses role="img" and proper ARIA attributes to ensure assistive technology compatibility',
      'Decorative vs Semantic: When used decoratively (within buttons/links), parent elements should handle accessibility context',
      'Color Independence: Never rely solely on color to convey information - always pair with text or other indicators',
      'Text Integration: Icons integrate naturally with text flow using inline-flex display and proper alignment',
      'Contrast Compliance: All color variants meet WCAG AA contrast requirements against standard backgrounds',
      'High Contrast Mode: Icons remain visible and functional in Windows High Contrast and similar accessibility modes',
      'Screen Magnification: Vector SVG format ensures crisp rendering at all zoom levels up to 200% text scaling',
      'Reduced Motion: Static icons respect user motion preferences - no animated or moving elements',
      'Keyboard Navigation: Non-interactive by default - keyboard behavior handled by containing interactive elements',
      'Focus Management: Does not interfere with focus flow - focus moves through parent interactive elements',
      'Automated Testing: Comprehensive jest-axe testing validates accessibility compliance across all variants'
    ],
    keyboardNavigation: 'Non-interactive element - keyboard navigation handled by parent components (buttons, links, etc.)',
    screenReader: 'Announced as image with aria-label derived from icon name. Context provided by surrounding content or parent interactive elements',
    colorContrast: 'All semantic color variants exceed WCAG AA contrast requirements. Use high-contrast variants (emphasis, inverse) for critical visual information',
    focusManagement: 'Not focusable - icon content is announced when parent interactive elements receive focus'
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
      description: 'Semantic color variations for different states and contexts',
      code: `<Stack direction="column" gap="md">
  {/* Standard colors */}
  <Stack direction="row" gap="md" alignItems="center">
    <Icon name="userBox" iconColor="default" />
    <Icon name="userBox" iconColor="emphasis" />
    <Icon name="userBox" iconColor="subdued" />
    <Icon name="userBox" iconColor="disabled" />
  </Stack>
  
  {/* Interactive and state colors */}
  <Stack direction="row" gap="md" alignItems="center">
    <Icon name="userBox" iconColor="interactive" />
    <Icon name="userBox" iconColor="error" />
    <Icon name="userBox" iconColor="success" />
    <Icon name="userBox" iconColor="warning" />
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          {/* Standard colors */}
          <Stack direction="row" gap="md" alignItems="center">
            <Icon name="userBox" iconColor="default" />
            <Icon name="userBox" iconColor="emphasis" />
            <Icon name="userBox" iconColor="subdued" />
            <Icon name="userBox" iconColor="disabled" />
          </Stack>
          
          {/* Interactive and state colors */}
          <Stack direction="row" gap="md" alignItems="center">
            <Icon name="userBox" iconColor="interactive" />
            <Icon name="userBox" iconColor="error" />
            <Icon name="userBox" iconColor="success" />
            <Icon name="userBox" iconColor="warning" />
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Contextual Color Inheritance',
      description: 'Using "inherit" to match parent text color',
      code: `<Stack direction="column" gap="md">
  <Typography variant="body" color="interactive">
    <Icon name="link" iconColor="inherit" /> Interactive link text
  </Typography>
  <Typography variant="body" color="error">
    <Icon name="close" iconColor="inherit" /> Error message text
  </Typography>
  <Typography variant="body" color="success">
    <Icon name="userBox" iconColor="inherit" /> Success status text
  </Typography>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Typography variant="body" color="interactive">
            <Icon name="link" iconColor="inherit" /> Interactive link text
          </Typography>
          <Typography variant="body" color="error">
            <Icon name="close" iconColor="inherit" /> Error message text
          </Typography>
          <Typography variant="body" color="success">
            <Icon name="userBox" iconColor="inherit" /> Success status text
          </Typography>
        </Stack>
      )
    },
    {
      name: 'Available Icons Grid',
      description: 'Complete icon library organized by category with names (36 icons total)',
      code: `{/* Action Icons */}
<Stack direction="row" gap="lg" wrap>
  <Icon name="add" /> <Icon name="addRing" /> <Icon name="cancel" />
  <Icon name="check" /> <Icon name="checkRing" /> <Icon name="close" />
  <Icon name="crossCircle" /> <Icon name="copy" /> <Icon name="edit" />
  <Icon name="export" /> <Icon name="filter" /> <Icon name="order" />
  <Icon name="refresh" /> <Icon name="remove" /> <Icon name="search" />
  <Icon name="trash" />
</Stack>

{/* Navigation Icons */}
<Stack direction="row" gap="lg" wrap>
  <Icon name="arrowDown" /> <Icon name="arrowUp" />
  <Icon name="arrowLeft" /> <Icon name="arrowRight" />
  <Icon name="back" /> <Icon name="caret" />
  <Icon name="caretDown" /> <Icon name="caretUp" />
  <Icon name="directionRight" />
</Stack>

{/* Interface Icons */}
<Stack direction="row" gap="lg" wrap>
  <Icon name="bell" /> <Icon name="fileDocSearch" /> <Icon name="info" />
  <Icon name="lamp" /> <Icon name="menu" /> <Icon name="paper" />
  <Icon name="table" /> <Icon name="view" /> <Icon name="viewHide" />
</Stack>

{/* Media & Communication */}
<Stack direction="row" gap="lg" wrap>
  <Icon name="play" /> <Icon name="pause" /> <Icon name="playBack" />
  <Icon name="message" /> <Icon name="link" />
</Stack>

{/* Other Icons */}
<Stack direction="row" gap="lg" wrap>
  <Icon name="userBox" /> <Icon name="lineOut" />
  <Icon name="star" /> <Icon name="starFilled" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          {/* Action Icons */}
          <Stack direction="column" gap="md">
            <Typography variant="label" color="subdued">ACTION ICONS (16)</Typography>
            <Stack direction="row" gap="lg" wrap>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="add" />
                <Typography variant="caption">add</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="addRing" />
                <Typography variant="caption">addRing</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="cancel" />
                <Typography variant="caption">cancel</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="check" />
                <Typography variant="caption">check</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="checkRing" />
                <Typography variant="caption">checkRing</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="close" />
                <Typography variant="caption">close</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="crossCircle" />
                <Typography variant="caption">crossCircle</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="copy" />
                <Typography variant="caption">copy</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="edit" />
                <Typography variant="caption">edit</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="export" />
                <Typography variant="caption">export</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="filter" />
                <Typography variant="caption">filter</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="order" />
                <Typography variant="caption">order</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="refresh" />
                <Typography variant="caption">refresh</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="remove" />
                <Typography variant="caption">remove</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="search" />
                <Typography variant="caption">search</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="trash" />
                <Typography variant="caption">trash</Typography>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Navigation Icons */}
          <Stack direction="column" gap="md">
            <Typography variant="label" color="subdued">NAVIGATION ICONS (9)</Typography>
            <Stack direction="row" gap="lg" wrap>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="arrowDown" />
                <Typography variant="caption">arrowDown</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="arrowUp" />
                <Typography variant="caption">arrowUp</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="arrowLeft" />
                <Typography variant="caption">arrowLeft</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="arrowRight" />
                <Typography variant="caption">arrowRight</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="back" />
                <Typography variant="caption">back</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="caret" />
                <Typography variant="caption">caret</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="caretDown" />
                <Typography variant="caption">caretDown</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="caretUp" />
                <Typography variant="caption">caretUp</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="directionRight" />
                <Typography variant="caption">directionRight</Typography>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Interface Icons */}
          <Stack direction="column" gap="md">
            <Typography variant="label" color="subdued">INTERFACE ICONS (9)</Typography>
            <Stack direction="row" gap="lg" wrap>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="bell" />
                <Typography variant="caption">bell</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="fileDocSearch" />
                <Typography variant="caption">fileDocSearch</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="info" />
                <Typography variant="caption">info</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="lamp" />
                <Typography variant="caption">lamp</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="menu" />
                <Typography variant="caption">menu</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="paper" />
                <Typography variant="caption">paper</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="table" />
                <Typography variant="caption">table</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="view" />
                <Typography variant="caption">view</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="viewHide" />
                <Typography variant="caption">viewHide</Typography>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Media & Communication Icons */}
          <Stack direction="column" gap="md">
            <Typography variant="label" color="subdued">MEDIA & COMMUNICATION (5)</Typography>
            <Stack direction="row" gap="lg" wrap>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="play" />
                <Typography variant="caption">play</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="pause" />
                <Typography variant="caption">pause</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="playBack" />
                <Typography variant="caption">playBack</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="message" />
                <Typography variant="caption">message</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="link" />
                <Typography variant="caption">link</Typography>
              </Stack>
            </Stack>
          </Stack>
          
          {/* Other Icons */}
          <Stack direction="column" gap="md">
            <Typography variant="label" color="subdued">OTHER ICONS (4)</Typography>
            <Stack direction="row" gap="lg" wrap>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="userBox" />
                <Typography variant="caption">userBox</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="lineOut" />
                <Typography variant="caption">lineOut</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="star" />
                <Typography variant="caption">star</Typography>
              </Stack>
              <Stack direction="column" gap="sm" alignItems="center">
                <Icon name="starFilled" />
                <Typography variant="caption">starFilled</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Real-world Usage Patterns',
      description: 'Common patterns showing icons in context with buttons, lists, and navigation',
      code: `{/* Button with icon */}
<Stack direction="row" gap="sm" alignItems="center">
  <Icon name="add" size="sm" iconColor="inherit" />
  <Typography variant="button2">Add Item</Typography>
</Stack>

{/* Status message with icon */}
<Stack direction="row" gap="sm" alignItems="center">
  <Icon name="userBox" size="md" iconColor="success" />
  <Typography variant="body" color="success">
    Profile updated successfully
  </Typography>
</Stack>

{/* Navigation item */}
<Stack direction="row" gap="md" alignItems="center" justifyContent="space-between">
  <Stack direction="row" gap="sm" alignItems="center">
    <Icon name="message" iconColor="subdued" />
    <Typography variant="body">Messages</Typography>
  </Stack>
  <Icon name="arrowRight" iconColor="subdued" size="sm" />
</Stack>

{/* Media controls */}
<Stack direction="row" gap="sm" alignItems="center">
  <Icon name="playBack" iconColor="interactive" />
  <Icon name="play" iconColor="interactive" size="xl" />
  <Icon name="pause" iconColor="subdued" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          {/* Button with icon */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">BUTTON WITH ICON</Typography>
            <Stack direction="row" gap="sm" alignItems="center">
              <Icon name="add" size="sm" iconColor="inherit" />
              <Typography variant="button2">Add Item</Typography>
            </Stack>
          </Stack>
          
          {/* Status message with icon */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">STATUS MESSAGE</Typography>
            <Stack direction="row" gap="sm" alignItems="center">
              <Icon name="userBox" size="md" iconColor="success" />
              <Typography variant="body" color="success">
                Profile updated successfully
              </Typography>
            </Stack>
          </Stack>
          
          {/* Navigation item */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">NAVIGATION ITEM</Typography>
            <Stack direction="row" gap="md" alignItems="center" justifyContent="space-between">
              <Stack direction="row" gap="sm" alignItems="center">
                <Icon name="message" iconColor="subdued" />
                <Typography variant="body">Messages</Typography>
              </Stack>
              <Icon name="arrowRight" iconColor="subdued" size="sm" />
            </Stack>
          </Stack>
          
          {/* Media controls */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">MEDIA CONTROLS</Typography>
            <Stack direction="row" gap="sm" alignItems="center">
              <Icon name="playBack" iconColor="interactive" />
              <Icon name="play" iconColor="interactive" size="xl" />
              <Icon name="pause" iconColor="subdued" />
            </Stack>
          </Stack>
        </Stack>
      )
    }
  ],
  
  notes: [
    'Icon Library: Icons loaded from styles/icons.json with SVG path data - add new icons by extending this JSON file',
    'Size Guidelines: xs/sm for inline text, md/lg for buttons and UI elements, xl/2xl for feature graphics and headers',
    'Color Semantics: Use semantic colors (error, success, warning) consistently with their meaning, not just for visual variety',
    'Inherit Color: Use iconColor="inherit" to match parent text color for seamless text integration',
    'Performance: Renders inline SVG for optimal loading, caching, and style control compared to icon fonts or external images',
    'Accessibility First: Automatically provides proper ARIA labels - for decorative use, ensure parent elements handle context',
    'Consistent Proportions: All icons use 24x24 viewBox for uniform visual weight and predictable spacing',
    'Missing Icon Handling: Component gracefully handles missing icons with console warnings for development debugging',
    'Browser Support: SVG and CSS currentColor supported in all modern browsers with consistent rendering',
    'Design Token Integration: All sizing and colors derive from semantic design tokens ensuring system consistency',
    'Responsive Design: Vector format scales cleanly at all screen densities and zoom levels without pixelation',
    'Theme Support: Color variants work automatically with light/dark theme switching through semantic tokens'
  ]
}
