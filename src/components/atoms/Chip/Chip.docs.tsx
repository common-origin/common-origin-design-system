import { ComponentDocumentation } from '../../../lib/docgen/types'
import { Chip } from './Chip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

export const chipDocs: ComponentDocumentation = {
  id: 'chip',
  name: 'Chip',
  description: 'A versatile compact element for displaying categorical information, tags, filters, or interactive actions. Designed for efficient content organization with multiple visual variants supporting both static display and interactive functionality. Features comprehensive accessibility support, keyboard navigation, and WCAG 2.2 AA compliance with automated testing integration.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ChipProps interface
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Content to display inside the chip. Typically text labels but can include icons or other React elements. When combined with onClick, content should clearly indicate the action that will be performed.'
    },
    {
      name: 'variant',
      type: "'default' | 'emphasis' | 'subtle' | 'interactive' | 'light' | 'dark'",
      required: false,
      default: 'default',
      description: 'Visual style variant determining the chip\'s appearance and semantic hierarchy. Default for standard tags, emphasis for highlighting, subtle for background information, interactive for actionable elements, light/dark for legacy compatibility.'
    },
    {
      name: 'size',
      type: "'small' | 'medium' | 'large'",
      required: false,
      default: 'medium',
      description: 'Size variant affecting padding, font size, and overall dimensions. Small for compact layouts, medium for standard use cases, large for prominent categorization or enhanced touch targets.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Click handler function that makes the chip interactive. When provided, the chip becomes focusable with button semantics and keyboard support. Essential for filter chips, removable tags, and actionable categories.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables interaction for clickable chips while maintaining visual context. When true, prevents onClick execution, keyboard activation, and focus while applying disabled styling to communicate unavailable state.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction verification. Supports consistent testing patterns across chip variants and interaction states throughout the component lifecycle.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Accessible label providing additional context when the visible text alone is insufficient for screen readers. Particularly important for chips with abbreviated content or when action context is needed.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'References the ID of an element providing additional description or instructions related to the chip\'s function or state, enhancing screen reader user understanding of complex interactions.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: 'button (when onClick provided)',
      description: 'ARIA role override for specific semantic meaning. Automatically set to "button" for interactive chips, but can be customized for specialized use cases requiring different assistive technology interpretation.'
    },
    {
      name: 'title',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Legacy prop for backward compatibility. Content displayed in the chip when children prop is not provided. New implementations should use the children prop for better flexibility and React patterns.'
    }
  ],

  tokens: [
    'component.chip.default.backgroundColor - Standard chip background for general categorization',
    'component.chip.emphasis.backgroundColor - High-contrast background for important categorization',
    'component.chip.subtle.backgroundColor - Low-contrast background for supporting information',
    'component.chip.interactive.backgroundColor - Interactive chip styling with hover states',
    'component.chip.sizes.small.font - Compact font sizing for dense layouts',
    'component.chip.sizes.medium.font - Standard font sizing for most interfaces',
    'component.chip.sizes.large.font - Prominent font sizing for enhanced visibility',
    'component.chip.default.borderRadius - Consistent rounded corners across variants',
    'semantic.motion.interactive - Smooth transitions for hover and focus states'
  ],

  examples: [
    {
      name: 'Content Categorization Chips',
      description: 'Static chips for organizing and labeling content with appropriate visual hierarchy',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Default - Standard content tags</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="default">Design</Chip>
      <Chip variant="default">Development</Chip>
      <Chip variant="default">Research</Chip>
      <Chip variant="default">Documentation</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Emphasis - Important categories</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="emphasis">Featured</Chip>
      <Chip variant="emphasis">Premium</Chip>
      <Chip variant="emphasis">New</Chip>
      <Chip variant="emphasis">Trending</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Subtle - Background information</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="subtle">Draft</Chip>
      <Chip variant="subtle">Archive</Chip>
      <Chip variant="subtle">Internal</Chip>
      <Chip variant="subtle">System</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Default - Standard content tags</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="default">Design</Chip>
              <Chip variant="default">Development</Chip>
              <Chip variant="default">Research</Chip>
              <Chip variant="default">Documentation</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Emphasis - Important categories</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="emphasis">Featured</Chip>
              <Chip variant="emphasis">Premium</Chip>
              <Chip variant="emphasis">New</Chip>
              <Chip variant="emphasis">Trending</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Subtle - Background information</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="subtle">Draft</Chip>
              <Chip variant="subtle">Archive</Chip>
              <Chip variant="subtle">Internal</Chip>
              <Chip variant="subtle">System</Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Interactive Filter Chips',
      description: 'Clickable chips for filtering, selection, and user interaction with proper accessibility',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Filter Categories - Click to toggle</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Articles')}
        aria-label="Filter by articles"
      >
        Articles
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Videos')}
        aria-label="Filter by videos"
      >
        Videos
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Images')}
        aria-label="Filter by images"
      >
        Images
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Filter: Documents')}
        aria-label="Filter by documents"
      >
        Documents
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Action Chips - Perform specific actions</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Share content')}
        aria-label="Share this content"
      >
        Share
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Export data')}
        aria-label="Export data as file"
      >
        Export
      </Chip>
      <Chip 
        variant="interactive" 
        onClick={() => console.log('Print view')}
        aria-label="Print current view"
      >
        Print
      </Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Filter Categories - Click to toggle</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Articles')}
                aria-label="Filter by articles"
              >
                Articles
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Videos')}
                aria-label="Filter by videos"
              >
                Videos
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Images')}
                aria-label="Filter by images"
              >
                Images
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Filter: Documents')}
                aria-label="Filter by documents"
              >
                Documents
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Action Chips - Perform specific actions</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Share content')}
                aria-label="Share this content"
              >
                Share
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Export data')}
                aria-label="Export data as file"
              >
                Export
              </Chip>
              <Chip 
                variant="interactive" 
                onClick={() => console.log('Print view')}
                aria-label="Print current view"
              >
                Print
              </Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'Size Variants for Different Contexts',
      description: 'Chips in different sizes optimized for various interface contexts and accessibility requirements',
      code: `<Stack direction="column" gap="lg">
  <div>
    <Typography variant="small">Small - Compact interfaces and dense layouts</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip size="small" variant="default">Tag</Chip>
      <Chip size="small" variant="emphasis">Priority</Chip>
      <Chip size="small" variant="interactive" onClick={() => console.log('Small click')}>
        Action
      </Chip>
      <Chip size="small" variant="subtle">Meta</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Medium - Standard interface elements</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip size="medium" variant="default">Category</Chip>
      <Chip size="medium" variant="emphasis">Featured</Chip>
      <Chip size="medium" variant="interactive" onClick={() => console.log('Medium click')}>
        Filter
      </Chip>
      <Chip size="medium" variant="subtle">Status</Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Large - Prominent display and mobile interfaces</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip size="large" variant="default">Collection</Chip>
      <Chip size="large" variant="emphasis">Important</Chip>
      <Chip size="large" variant="interactive" onClick={() => console.log('Large click')}>
        Primary Action
      </Chip>
      <Chip size="large" variant="subtle">Information</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <div>
            <Typography variant="small">Small - Compact interfaces and dense layouts</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip size="small" variant="default">Tag</Chip>
              <Chip size="small" variant="emphasis">Priority</Chip>
              <Chip size="small" variant="interactive" onClick={() => console.log('Small click')}>
                Action
              </Chip>
              <Chip size="small" variant="subtle">Meta</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Medium - Standard interface elements</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip size="medium" variant="default">Category</Chip>
              <Chip size="medium" variant="emphasis">Featured</Chip>
              <Chip size="medium" variant="interactive" onClick={() => console.log('Medium click')}>
                Filter
              </Chip>
              <Chip size="medium" variant="subtle">Status</Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Large - Prominent display and mobile interfaces</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip size="large" variant="default">Collection</Chip>
              <Chip size="large" variant="emphasis">Important</Chip>
              <Chip size="large" variant="interactive" onClick={() => console.log('Large click')}>
                Primary Action
              </Chip>
              <Chip size="large" variant="subtle">Information</Chip>
            </Stack>
          </div>
        </Stack>
      )
    },
    {
      name: 'State Management and Disabled Interaction',
      description: 'Chips with various interaction states including disabled conditions and accessibility considerations',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Active Interactive Chips</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="interactive" onClick={() => console.log('Available action')}>
        Available
      </Chip>
      <Chip variant="interactive" onClick={() => console.log('Active filter')}>
        Active Filter
      </Chip>
      <Chip variant="interactive" onClick={() => console.log('Selectable item')}>
        Selectable
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Disabled Interactive Chips</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Unavailable action"
      >
        Unavailable
      </Chip>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Disabled filter option"
      >
        Disabled Filter
      </Chip>
      <Chip 
        variant="interactive" 
        disabled={true}
        onClick={() => console.log('This will not execute')}
        aria-label="Locked selection"
      >
        Locked
      </Chip>
    </Stack>
  </div>
  
  <div>
    <Typography variant="small">Mixed State Example</Typography>
    <Stack direction="row" gap="sm" wrap>
      <Chip variant="emphasis">Always Visible</Chip>
      <Chip variant="interactive" onClick={() => console.log('Sometimes clickable')}>
        Conditional
      </Chip>
      <Chip variant="interactive" disabled={true}>
        Sometimes Disabled
      </Chip>
      <Chip variant="subtle">Context Info</Chip>
    </Stack>
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Active Interactive Chips</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="interactive" onClick={() => console.log('Available action')}>
                Available
              </Chip>
              <Chip variant="interactive" onClick={() => console.log('Active filter')}>
                Active Filter
              </Chip>
              <Chip variant="interactive" onClick={() => console.log('Selectable item')}>
                Selectable
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Disabled Interactive Chips</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Unavailable action"
              >
                Unavailable
              </Chip>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Disabled filter option"
              >
                Disabled Filter
              </Chip>
              <Chip 
                variant="interactive" 
                disabled={true}
                onClick={() => console.log('This will not execute')}
                aria-label="Locked selection"
              >
                Locked
              </Chip>
            </Stack>
          </div>
          
          <div>
            <Typography variant="small">Mixed State Example</Typography>
            <Stack direction="row" gap="sm" wrap>
              <Chip variant="emphasis">Always Visible</Chip>
              <Chip variant="interactive" onClick={() => console.log('Sometimes clickable')}>
                Conditional
              </Chip>
              <Chip variant="interactive" disabled={true}>
                Sometimes Disabled
              </Chip>
              <Chip variant="subtle">Context Info</Chip>
            </Stack>
          </div>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'Interactive chips automatically receive button semantics and announce as "button" elements to screen readers with appropriate role and state information',
      'Non-interactive chips are treated as static text content, preserving natural reading flow without interrupting screen reader navigation patterns',
      'Comprehensive keyboard navigation support: Tab key moves focus to interactive chips, Enter and Space keys activate them following standard web interaction patterns',
      'Focus indicators are highly visible with 2px outline and offset, ensuring clear visual feedback for keyboard users across all color themes and high contrast modes',
      'Disabled state is properly communicated through aria-disabled attribute, preventing interaction while maintaining semantic context for assistive technology users',
      'Content accessibility preserved through natural DOM structure - screen readers announce chip content exactly as provided in the children prop',
      'aria-label support for cases where visible text needs additional context or clarification for screen reader users, particularly useful for abbreviated or symbolic content',
      'Color contrast ratios exceed WCAG 2.2 AA requirements (4.5:1 for normal text, 3:1 for large text) across all variant combinations and interaction states',
      'Touch target sizes meet accessibility guidelines with adequate spacing for finger interaction, especially important for mobile interfaces and users with motor impairments',
      'Automated accessibility testing integration with jest-axe ensures ongoing compliance throughout component development and prevents regression issues',
      'High contrast mode support maintains visibility and usability across all user preference settings and assistive technology configurations',
      'Screen reader testing validates announcement patterns: static chips read as content, interactive chips announce as "button" with appropriate state and action context'
    ],
    keyboardNavigation: 'Tab key moves focus to interactive chips with visible focus outline. Enter or Space key activates the chip\'s onClick handler. Disabled chips are excluded from tab order and do not respond to activation keys.',
    screenReader: 'Static chips announced as their text content. Interactive chips announced as "button" followed by content and state information (disabled, pressed, expanded). Custom aria-label content takes precedence when provided.',
    focusManagement: 'Interactive chips receive focus with 2px outline and 2px offset for clear visibility. Focus moves in logical DOM order. Disabled chips cannot receive focus and are excluded from tab navigation sequence.'
  },

  notes: [
    'Content Strategy: Use chips for categorical information, content tagging, filtering interfaces, and quick actions. Choose variant based on information hierarchy - emphasis for important categories, subtle for metadata, interactive for user actions.',
    'Size Selection Guidelines: Small size for dense interfaces like toolbars and metadata displays. Medium size for standard content categorization. Large size for prominent actions, mobile interfaces, and enhanced accessibility requirements.',
    'Interactive Behavior: When onClick is provided, chip automatically becomes focusable with button semantics. Consider the action consequence and provide clear aria-label when the action is not obvious from the visible text content.',
    'State Management: Use disabled prop to temporarily prevent interaction while maintaining visual context. Useful for conditional features, permission-based actions, or loading states where the chip should remain visible but non-functional.',
    'Legacy Compatibility: Component supports legacy title prop and light/dark variants for backward compatibility, but new implementations should use children prop and current variant system for better flexibility.',
    'Performance Optimization: Component uses CSS custom properties to avoid prop drilling and styled-component re-renders. Styles are applied efficiently through CSS variables set at the component wrapper level.',
    'Design System Integration: Variants map to design tokens ensuring consistency with overall visual hierarchy. Interactive states provide smooth transitions that enhance user feedback without being distracting or overwhelming.',
    'Testing Support: data-testid prop enables consistent automated testing across chip variants and states. Component includes comprehensive test coverage for interaction patterns, accessibility compliance, and state management scenarios.'
  ]
}
