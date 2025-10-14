import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Avatar } from './Avatar'
import { Stack } from '../Stack'

export const avatarDocs: ComponentDocumentation = {
  id: 'avatar',
  name: 'Avatar',
  description: 'Display user profile pictures with fallback to initials. Supports multiple sizes and graceful degradation when images fail to load. WCAG 2.2 AA compliant with comprehensive accessibility testing.',
  category: 'Atoms',
  
  // Props extracted with full type safety from AvatarProps interface
  props: [
    {
      name: 'name',
      type: 'string',
      required: true,
      description: 'Full name of the person, used for initials fallback and accessibility'
    },
    {
      name: 'picture',
      type: 'string',
      required: false,
      description: 'URL of the profile picture image'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      description: 'Size variant affecting dimensions and font size'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for testing'
    }
  ],

  tokens: [
    'semantic.size.avatar.xs',
    'semantic.size.avatar.sm',
    'semantic.size.avatar.md',
    'semantic.size.avatar.lg',
    'semantic.size.avatar.xl',
    'semantic.color.avatar.background',
    'semantic.color.avatar.text',
    'semantic.typography.avatar'
  ],

  examples: [
    {
      name: 'Avatar Sizes',
      description: 'Different size variants for various contexts',
      code: `<Stack direction="row" gap="md" alignItems="center">
  <Avatar name="John Doe" size="xs" />
  <Avatar name="Jane Smith" size="sm" />
  <Avatar name="Alex Johnson" size="md" />
  <Avatar name="Sarah Wilson" size="lg" />
  <Avatar name="Michael Brown" size="xl" />
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="md" alignItems="center">
          <Avatar name="John Doe" size="xs" />
          <Avatar name="Jane Smith" size="sm" />
          <Avatar name="Alex Johnson" size="md" />
          <Avatar name="Sarah Wilson" size="lg" />
          <Avatar name="Michael Brown" size="xl" />
        </Stack>
      )
    },
    {
      name: 'With Profile Pictures',
      description: 'Avatars displaying actual profile images',
      code: `<Avatar name="John Doe" picture="/assets/avatar.jpg" />`,
      renderComponent: () => (
        <Stack direction="row" gap="md">
          <Avatar name="John Doe" picture="/assets/avatar.jpg" />
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Alt text includes person\'s name for screen readers',
      'Initials fallback when image unavailable',
      'Circular shape provides clear visual boundary',
      'Color contrast meets accessibility standards',
      'WCAG 2.2 AA compliant with comprehensive accessibility testing',
      'All size variants maintain proper contrast ratios',
      'Automated jest-axe testing ensures ongoing accessibility compliance'
    ],
    keyboardNavigation: 'Not interactive - no keyboard navigation',
    screenReader: 'Announced with person\'s name',
    colorContrast: 'Text on background meets WCAG AA requirements'
  },

  notes: [
    'Automatically generates initials from first and last name',
    'Gracefully handles missing or broken image URLs',
    'Sizes maintain consistent proportions across the design system',
    'Background colors provide sufficient contrast for text',
    'Use larger sizes for primary user identification, smaller for lists'
  ]
}