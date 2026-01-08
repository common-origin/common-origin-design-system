import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Avatar } from './Avatar'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

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
      description: 'Full name of the person. Used for accessibility (alt text), initials generation (first & last name), and fallback display'
    },
    {
      name: 'picture',
      type: 'string',
      required: false,
      description: 'Profile picture URL. Supports common image formats. Falls back to initials on load error or missing URL'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      default: 'md',
      description: 'Size variant: xs (24px), sm (32px), md (48px), lg (64px), xl (96px). Affects both dimensions and initial text size'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Data test id for automated testing'
    }
  ],

  tokens: [
    'semantic.size.avatar.xs',
    'semantic.size.avatar.sm',
    'semantic.size.avatar.md',
    'semantic.size.avatar.lg',
    'semantic.size.avatar.xl',
    'semantic.border.radius.circle',
    'semantic.color.background.surface',
    'semantic.color.text.default',
    'base.fontFamily.body',
    'base.fontWeight.3',
    'base.fontSize.1',
    'base.fontSize.2',
    'base.fontSize.3',
    'base.fontSize.4',
    'base.fontSize.5'
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
      name: 'Image vs Initials Fallback',
      description: 'Demonstrates image loading and fallback to initials',
      code: `<Stack direction="row" gap="lg" alignItems="center">
  {/* Image that loads successfully */}
  <Stack direction="column" gap="sm" alignItems="center">
    <Avatar name="Alex Chen" picture="/valid-image.jpg" />
    <Typography variant="caption">With Image</Typography>
  </Stack>
  
  {/* Fallback to initials (broken/missing image) */}
  <Stack direction="column" gap="sm" alignItems="center">
    <Avatar name="Sarah Johnson" picture="/broken-image.jpg" />
    <Typography variant="caption">Initials Fallback</Typography>
  </Stack>
  
  {/* No image provided */}
  <Stack direction="column" gap="sm" alignItems="center">
    <Avatar name="Michael Rodriguez" />
    <Typography variant="caption">Initials Only</Typography>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="row" gap="lg" alignItems="center">
          {/* Image that loads successfully */}
          <Stack direction="column" gap="sm" alignItems="center">
            <Avatar name="Alex Chen" picture="/valid-image.jpg" />
            <Typography variant="caption">With Image</Typography>
          </Stack>
          
          {/* Fallback to initials (broken/missing image) */}
          <Stack direction="column" gap="sm" alignItems="center">
            <Avatar name="Sarah Johnson" picture="/broken-image.jpg" />
            <Typography variant="caption">Initials Fallback</Typography>
          </Stack>
          
          {/* No image provided */}
          <Stack direction="column" gap="sm" alignItems="center">
            <Avatar name="Michael Rodriguez" />
            <Typography variant="caption">Initials Only</Typography>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Name Variations',
      description: 'How different name formats generate initials',
      code: `<Stack direction="column" gap="md">
  <Stack direction="row" gap="md" alignItems="center">
    <Avatar name="John Doe" size="md" />
    <Typography variant="body">John Doe → JD</Typography>
  </Stack>
  
  <Stack direction="row" gap="md" alignItems="center">
    <Avatar name="Maria" size="md" />
    <Typography variant="body">Maria → M</Typography>
  </Stack>
  
  <Stack direction="row" gap="md" alignItems="center">
    <Avatar name="Jean-Pierre Baptiste" size="md" />
    <Typography variant="body">Jean-Pierre Baptiste → JB</Typography>
  </Stack>
  
  <Stack direction="row" gap="md" alignItems="center">
    <Avatar name="李明" size="md" />
    <Typography variant="body">李明 → 李明</Typography>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <Stack direction="row" gap="md" alignItems="center">
            <Avatar name="John Doe" size="md" />
            <Typography variant="body">John Doe → JD</Typography>
          </Stack>
          
          <Stack direction="row" gap="md" alignItems="center">
            <Avatar name="Maria" size="md" />
            <Typography variant="body">Maria → M</Typography>
          </Stack>
          
          <Stack direction="row" gap="md" alignItems="center">
            <Avatar name="Jean-Pierre Baptiste" size="md" />
            <Typography variant="body">Jean-Pierre Baptiste → JB</Typography>
          </Stack>
          
          <Stack direction="row" gap="md" alignItems="center">
            <Avatar name="李明" size="md" />
            <Typography variant="body">李明 → 李明</Typography>
          </Stack>
        </Stack>
      )
    },
    {
      name: 'Real-world Usage Patterns',
      description: 'Common avatar implementations in UI contexts',
      code: `<Stack direction="column" gap="xl">
  {/* User profile header */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">USER PROFILE</Typography>
    <Stack direction="row" gap="md" alignItems="center">
      <Avatar name="Emma Thompson" picture="/user-profile.jpg" size="lg" />
      <Stack direction="column" gap="xs">
        <Typography variant="h3">Emma Thompson</Typography>
        <Typography variant="body" color="subdued">Product Designer</Typography>
      </Stack>
    </Stack>
  </Stack>

  {/* Comment thread */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">COMMENT THREAD</Typography>
    <Stack direction="column" gap="md">
      <Stack direction="row" gap="sm" alignItems="flex-start">
        <Avatar name="David Kim" size="sm" />
        <Stack direction="column" gap="xs">
          <Typography variant="body">Great work on the new design system!</Typography>
          <Typography variant="small" color="subdued">2 hours ago</Typography>
        </Stack>
      </Stack>
      
      <Stack direction="row" gap="sm" alignItems="flex-start">
        <Avatar name="Lisa Chen" size="sm" />
        <Stack direction="column" gap="xs">
          <Typography variant="body">Thanks! The new components are much more accessible.</Typography>
          <Typography variant="small" color="subdued">1 hour ago</Typography>
        </Stack>
      </Stack>
    </Stack>
  </Stack>

  {/* Team member list */}
  <Stack direction="column" gap="sm">
    <Typography variant="label" color="subdued">TEAM MEMBERS</Typography>
    <Stack direction="row" gap="xs">
      <Avatar name="Alice Johnson" size="xs" />
      <Avatar name="Bob Wilson" size="xs" />
      <Avatar name="Carol Davis" size="xs" />
      <Avatar name="Daniel Brown" size="xs" />
      <Avatar name="Eve Martinez" size="xs" />
      <Typography variant="small" color="subdued">+3 more</Typography>
    </Stack>
  </Stack>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="xl">
          {/* User profile header */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">USER PROFILE</Typography>
            <Stack direction="row" gap="md" alignItems="center">
              <Avatar name="Emma Thompson" picture="/user-profile.jpg" size="lg" />
              <Stack direction="column" gap="xs">
                <Typography variant="h3">Emma Thompson</Typography>
                <Typography variant="body" color="subdued">Product Designer</Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Comment thread */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">COMMENT THREAD</Typography>
            <Stack direction="column" gap="md">
              <Stack direction="row" gap="sm" alignItems="flex-start">
                <Avatar name="David Kim" size="sm" />
                <Stack direction="column" gap="xs">
                  <Typography variant="body">Great work on the new design system!</Typography>
                  <Typography variant="small" color="subdued">2 hours ago</Typography>
                </Stack>
              </Stack>
              
              <Stack direction="row" gap="sm" alignItems="flex-start">
                <Avatar name="Lisa Chen" size="sm" />
                <Stack direction="column" gap="xs">
                  <Typography variant="body">Thanks! The new components are much more accessible.</Typography>
                  <Typography variant="small" color="subdued">1 hour ago</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Team member list */}
          <Stack direction="column" gap="sm">
            <Typography variant="label" color="subdued">TEAM MEMBERS</Typography>
            <Stack direction="row" gap="xs">
              <Avatar name="Alice Johnson" size="xs" />
              <Avatar name="Bob Wilson" size="xs" />
              <Avatar name="Carol Davis" size="xs" />
              <Avatar name="Daniel Brown" size="xs" />
              <Avatar name="Eve Martinez" size="xs" />
              <Typography variant="small" color="subdued">+3 more</Typography>
            </Stack>
          </Stack>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Image Alt Text: Uses person\'s full name for meaningful image description when profile picture loads',
      'Initials Fallback: Provides text-based representation when images fail, maintaining accessibility for screen readers',
      'Role Attribution: Uses role="img" with proper aria-label for consistent assistive technology support',
      'Visual Boundaries: Circular shape with clear contrast provides distinct visual separation in UI layouts',
      'Text Contrast: Initials text meets WCAG AA contrast ratio (4.5:1) against background colors across all variants',
      'Size Accessibility: All size variants maintain minimum touch target recommendations and readable text sizes',
      'Error Handling: Graceful degradation from image to initials preserves accessibility context without broken states',
      'Name Processing: Handles various name formats and languages while maintaining readable initials generation',
      'High Contrast Mode: Avatar boundaries and text remain visible in Windows High Contrast and similar modes',
      'Screen Reader Integration: Announced consistently whether showing image or initials, providing user identification context'
    ],
    keyboardNavigation: 'Non-interactive element - no keyboard navigation required. Focus flows around avatar to interactive elements',
    screenReader: 'Image announced as "image, [person name]" or initials announced as text content with role context',
    colorContrast: 'Initials text achieves WCAG AA compliance (4.5:1 ratio) against semantic background colors. Image content contrast handled by source.',
    focusManagement: 'Not focusable - used for visual identification only. Interactive patterns should wrap avatar in button/link if needed'
  },

  notes: [
    'Initials Generation: Extracts first letter of first word and first letter of last word. Single names show first letter only',
    'Image Fallback: Automatically switches to initials on image load error, network failure, or missing picture prop',
    'Size Guidelines: xs/sm for compact lists, md for standard UI, lg for profiles/headers, xl for prominent user identification',
    'Name Handling: Supports international names, hyphenated names, and non-Latin characters with intelligent parsing',
    'Performance: Efficient image loading with error boundaries and minimal re-renders on prop changes',
    'Semantic Design: Background uses semantic avatar tokens ensuring proper theme integration and color consistency',
    'Responsive Behavior: Fixed aspect ratio prevents layout shift during image loading or fallback transitions',
    'Browser Support: Works across all modern browsers with proper image loading and error handling',
    'Cultural Considerations: Initials logic respects different naming conventions and character systems',
    'Design System Integration: Consistent sizing with other components and proper spacing in layout contexts',
    'Testing: Handles edge cases like empty names, special characters, and various image formats gracefully',
    'Accessibility First: Built with screen reader and keyboard navigation considerations from the ground up'
  ]
}