import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Typography } from '../Typography'
import { iconSet } from '../../../types/iconSet'
import type { IconCategory, IconName } from '../../../types/icons'

// The icon set by category, names sorted, so the gallery shows every icon as soon as it's added
const ICON_CATEGORIES = Object.entries(
  (Object.keys(iconSet) as IconName[]).reduce<Partial<Record<IconCategory, IconName[]>>>((groups, name) => {
    const category = iconSet[name].category
    groups[category] = [...(groups[category] ?? []), name]
    return groups
  }, {})
)
  .map(([category, names]) => [category, (names ?? []).slice().sort()] as const)
  .sort(([a], [b]) => a.localeCompare(b))

export const iconDocs: ComponentDocumentation = {
  id: 'icon',
  name: 'Icon',
  description: 'Displays SVG icons with consistent sizing and semantic color variants. Draws each icon inline from iconSet, in currentColor: Lucide\'s 2px line icons and the system\'s own drawings (decision 0058). WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Content',
  tier: 'Atom',
  
  // Props extracted with full type safety from IconProps interface
  props: [
    {
      name: 'name',
      type: 'IconName',
      required: true,
      description: 'Icon name: a key of iconSet (add, arrowDown, menu, play and so on)'
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
      name: 'aria-label',
      type: 'string',
      required: false,
      description: 'Makes the icon meaningful: it is announced as an image with this name. Without aria-label or title the icon is decorative and hidden from assistive technology. Use a human-readable name, never the internal icon name (the icon\'s ariaLabelDefault in iconSet is a starting point)'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      description: 'Like aria-label, and also shown as a tooltip. aria-label wins if both are given'
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
    'semantic.color.icon.muted',
    'semantic.color.icon.disabled',
    'semantic.color.icon.inverse',
    'semantic.color.icon.accent',
    'semantic.color.icon.danger',
    'semantic.color.icon.success',
    'semantic.color.icon.warning',
    // Note: 'inherit' uses currentColor (no token)
  ],
  
  accessibility: {
    notes: [
      'Decorative by default: without aria-label or title, the SVG has aria-hidden="true" and no role, so screen readers skip it. Most icons sit next to text or inside a labelled control, where announcing them would only repeat or add noise',
      'Meaningful icons: pass aria-label (or title) with a human-readable name, and the SVG becomes role="img" with that name. Do this when the icon is the only way a piece of information is shown, such as MoneyDisplay\'s plus and minus signs',
      'Never announce an internal icon name such as "arrowDown" or "addRing" (#85, WCAG 1.1.1). A blank label counts as no label',
      'Color Independence: Never rely solely on color to convey information - always pair with text or other indicators',
      'Text Integration: Icons integrate naturally with text flow using inline-flex display and proper alignment',
      'Contrast Compliance: All color variants meet WCAG AA contrast requirements against standard backgrounds',
      'Screen Magnification: Vector SVG format ensures crisp rendering at all zoom levels up to 200% text scaling',
      'Reduced Motion: Static icons respect user motion preferences - no animated or moving elements',
      'Keyboard Navigation: Non-interactive by default - keyboard behavior handled by containing interactive elements',
      'Focus Management: Does not interfere with focus flow - focus moves through parent interactive elements',
      'Automated Testing: Comprehensive jest-axe testing validates accessibility compliance across all variants'
    ],
    keyboardNavigation: 'Non-interactive element - keyboard navigation handled by parent components (buttons, links, etc.)',
    screenReader: 'Silent by default. With aria-label or title, announced as an image with that name',
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
      name: 'Meaningful Icon',
      description: 'An icon that is the only way something is shown needs a human-readable name. Without one, icons are decorative and silent',
      code: `<Icon name="paper" size="sm" aria-label="Has note" />`,
      renderComponent: () => (
        <Icon name="paper" size="sm" aria-label="Has note" />
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
      name: 'Icon set',
      description: 'Every icon in iconSet, grouped by category, with the name to pass to Icon. Icons added with npm run icon:add appear here',
      code: `import { Icon, iconSet, type IconName } from '@common-origin/design-system'

{(Object.keys(iconSet) as IconName[]).map((name) => (
  <Icon key={name} name={name} />
))}`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          {ICON_CATEGORIES.map(([category, names]) => (
            <Stack key={category} direction="column" gap="md">
              <Typography variant="label" color="subdued">{`${category.toUpperCase()} (${names.length})`}</Typography>
              <Stack direction="row" gap="lg" wrap>
                {names.map((name) => (
                  <Stack key={name} direction="column" gap="sm" alignItems="center">
                    <Icon name={name} />
                    <Typography variant="small" color="subdued">{name}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}
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
    'Icon set: Icon draws from iconSet, exported by the package. Each icon has its metadata, where it comes from (Lucide or the system\'s own drawings), how it\'s painted (stroke, fill or both) and its shapes on a 24px grid. Lines are 2px at 24px and scale with the icon (decision 0058)',
    'Deprecated: iconsData is frozen at the 64 icons of 3.2.0 as single filled paths. Icons added since aren\'t in it. Use iconSet; iconsData is removed in 4.0',
    'Size Guidelines: xs/sm for inline text, md/lg for buttons and UI elements, xl/2xl for feature graphics and headers',
    'Color Semantics: Use semantic colors (error, success, warning) consistently with their meaning, not just for visual variety',
    'Inherit Color: Use iconColor="inherit" to match parent text color for seamless text integration',
    'Performance: Renders inline SVG for optimal loading, caching, and style control compared to icon fonts or external images',
    'Accessibility: decorative unless given aria-label or title; give a name only when the icon carries information nothing else shows',
    'Consistent Proportions: All icons use 24x24 viewBox for uniform visual weight and predictable spacing',
    'Missing Icon Handling: Component gracefully handles missing icons with console warnings for development debugging',
    'Browser Support: SVG and CSS currentColor supported in all modern browsers with consistent rendering',
    'Design Token Integration: All sizing and colors derive from semantic design tokens ensuring system consistency',
    'Responsive Design: Vector format scales cleanly at all screen densities and zoom levels without pixelation',
    'Theme Support: Color variants work automatically with light/dark theme switching through semantic tokens'
  ]
}
