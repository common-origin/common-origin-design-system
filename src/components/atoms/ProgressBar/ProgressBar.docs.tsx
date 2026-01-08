import { ComponentDocumentation } from '../../../lib/docgen/types'
import React from 'react'
import { ProgressBar } from './ProgressBar'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

export const progressBarDocs: ComponentDocumentation = {
  id: 'progressbar',
  name: 'ProgressBar',
  description: 'A visual indicator component for displaying completion progress or task status. Supports both horizontal and vertical orientations with multiple color variants for different states. Designed for file uploads, loading states, task completion, and any scenario requiring visual progress feedback. Features comprehensive accessibility support with ARIA attributes and WCAG 2.2 AA compliance.',
  category: 'Atoms',
  
  // Props extracted with full type safety from ProgressBarProps interface
  props: [
    {
      name: 'value',
      type: 'number',
      required: true,
      description: 'Progress value from 0 to 100 representing the percentage of completion. Values outside this range are automatically clamped. Supports decimal values for precise progress tracking.'
    },
    {
      name: 'variant',
      type: "'horizontal' | 'vertical'",
      required: false,
      default: 'horizontal',
      description: 'Orientation variant determining the direction of progress visualization. Horizontal for standard progress bars in forms and uploads, vertical for side panels, dashboards, or space-constrained layouts.'
    },
    {
      name: 'color',
      type: "'default' | 'success' | 'error'",
      required: false,
      default: 'default',
      description: 'Color variant indicating progress state or semantic meaning. Default (primary) for standard progress, success for completed tasks, error for failed operations or warning states.'
    },
    {
      name: 'height',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      default: 'md',
      description: 'Height size for horizontal progress bars using design system tokens. sm (0.25rem/4px) for subtle indicators, md (0.5rem/8px) for standard use, lg (1rem/16px) for prominent displays, xl (1.25rem/20px) for high visibility.'
    },
    {
      name: 'width',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      required: false,
      default: 'md',
      description: 'Width size for vertical progress bars using design system tokens. sm (0.25rem/4px) for subtle indicators, md (0.5rem/8px) for standard use, lg (1rem/16px) for prominent displays, xl (1.25rem/20px) for high visibility.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and progress value verification. Supports consistent testing patterns across progress bar variants and states.'
    }
  ],

  tokens: [
    'semantic.color.background.disabled',
    'semantic.color.background.interactive',
    'semantic.color.background.success',
    'semantic.color.background.error',
    'semantic.border.radius.xs',
    'semantic.motion.transition.normal',
    'component.progressBar.sizes.sm.height',
    'component.progressBar.sizes.md.height',
    'component.progressBar.sizes.lg.height',
    'component.progressBar.sizes.xl.height'
  ],

  examples: [
    {
      name: 'Horizontal Progress Variants',
      description: 'Standard horizontal progress bars showing different completion levels',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">0% Complete</Typography>
    <ProgressBar value={0} />
  </div>
  
  <div>
    <Typography variant="small">25% Complete</Typography>
    <ProgressBar value={25} />
  </div>
  
  <div>
    <Typography variant="small">50% Complete</Typography>
    <ProgressBar value={50} />
  </div>
  
  <div>
    <Typography variant="small">75% Complete</Typography>
    <ProgressBar value={75} />
  </div>
  
  <div>
    <Typography variant="small">100% Complete</Typography>
    <ProgressBar value={100} />
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">0% Complete</Typography>
            <ProgressBar value={0} />
          </div>
          
          <div>
            <Typography variant="small">25% Complete</Typography>
            <ProgressBar value={25} />
          </div>
          
          <div>
            <Typography variant="small">50% Complete</Typography>
            <ProgressBar value={50} />
          </div>
          
          <div>
            <Typography variant="small">75% Complete</Typography>
            <ProgressBar value={75} />
          </div>
          
          <div>
            <Typography variant="small">100% Complete</Typography>
            <ProgressBar value={100} />
          </div>
        </Stack>
      )
    },
    {
      name: 'Color Variants',
      description: 'Different color variants for various progress states and semantic meanings',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Default - Standard progress</Typography>
    <ProgressBar value={60} color="default" />
  </div>
  
  <div>
    <Typography variant="small">Success - Task completed</Typography>
    <ProgressBar value={100} color="success" />
  </div>
  
  <div>
    <Typography variant="small">Error - Failed operation</Typography>
    <ProgressBar value={45} color="error" />
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Default - Standard progress</Typography>
            <ProgressBar value={60} color="default" />
          </div>
          
          <div>
            <Typography variant="small">Success - Task completed</Typography>
            <ProgressBar value={100} color="success" />
          </div>
          
          <div>
            <Typography variant="small">Error - Failed operation</Typography>
            <ProgressBar value={45} color="error" />
          </div>
        </Stack>
      )
    },
    {
      name: 'Custom Sizes',
      description: 'Horizontal progress bars with different height sizes using design system tokens',
      code: `<Stack direction="column" gap="md">
  <div>
    <Typography variant="small">Small (sm) - Subtle indicator</Typography>
    <ProgressBar value={70} height="sm" />
  </div>
  
  <div>
    <Typography variant="small">Medium (md) - Standard use</Typography>
    <ProgressBar value={70} height="md" />
  </div>
  
  <div>
    <Typography variant="small">Large (lg) - Prominent display</Typography>
    <ProgressBar value={70} height="lg" />
  </div>
  
  <div>
    <Typography variant="small">Extra Large (xl) - High visibility</Typography>
    <ProgressBar value={70} height="xl" />
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="md">
          <div>
            <Typography variant="small">Small (sm) - Subtle indicator</Typography>
            <ProgressBar value={70} height="sm" />
          </div>
          
          <div>
            <Typography variant="small">Medium (md) - Standard use</Typography>
            <ProgressBar value={70} height="md" />
          </div>
          
          <div>
            <Typography variant="small">Large (lg) - Prominent display</Typography>
            <ProgressBar value={70} height="lg" />
          </div>
          
          <div>
            <Typography variant="small">Extra Large (xl) - High visibility</Typography>
            <ProgressBar value={70} height="xl" />
          </div>
        </Stack>
      )
    },
    {
      name: 'Vertical Progress Bars',
      description: 'Vertical orientation for side panels, dashboards, and space-constrained layouts',
      code: `<div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={20} variant="vertical" />
    </div>
    <Typography variant="small">20%</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={40} variant="vertical" />
    </div>
    <Typography variant="small">40%</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={60} variant="vertical" />
    </div>
    <Typography variant="small">60%</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={80} variant="vertical" />
    </div>
    <Typography variant="small">80%</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={100} variant="vertical" />
    </div>
    <Typography variant="small">100%</Typography>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={20} variant="vertical" />
            </div>
            <Typography variant="small">20%</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={40} variant="vertical" />
            </div>
            <Typography variant="small">40%</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={60} variant="vertical" />
            </div>
            <Typography variant="small">60%</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={80} variant="vertical" />
            </div>
            <Typography variant="small">80%</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={100} variant="vertical" />
            </div>
            <Typography variant="small">100%</Typography>
          </div>
        </div>
      )
    },
    {
      name: 'Vertical Color Variants',
      description: 'Vertical progress bars with different color states',
      code: `<div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={70} variant="vertical" color="default" />
    </div>
    <Typography variant="small">Default</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={70} variant="vertical" color="success" />
    </div>
    <Typography variant="small">Success</Typography>
  </div>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
    <div style={{ height: '200px' }}>
      <ProgressBar value={70} variant="vertical" color="error" />
    </div>
    <Typography variant="small">Error</Typography>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={70} variant="vertical" color="default" />
            </div>
            <Typography variant="small">Default</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={70} variant="vertical" color="success" />
            </div>
            <Typography variant="small">Success</Typography>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '200px' }}>
              <ProgressBar value={70} variant="vertical" color="error" />
            </div>
            <Typography variant="small">Error</Typography>
          </div>
        </div>
      )
    },
    {
      name: 'Real-World Usage Examples',
      description: 'Practical applications showing progress bars in common interface scenarios',
      code: `<Stack direction="column" gap="lg">
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Typography variant="small">Uploading document.pdf</Typography>
      <Typography variant="small" style={{ color: '#666' }}>78%</Typography>
    </div>
    <ProgressBar value={78} color="default" />
  </div>

  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Typography variant="small">Installation Complete</Typography>
      <span style={{ fontSize: '14px', color: '#16a34a' }}>100%</span>
    </div>
    <ProgressBar value={100} color="success" />
  </div>

  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Typography variant="small">Upload Failed</Typography>
      <span style={{ fontSize: '14px', color: '#dc2626' }}>45%</span>
    </div>
    <ProgressBar value={45} color="error" />
  </div>

  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <Typography variant="small">Loading resources...</Typography>
      <span style={{ fontSize: '14px', color: '#666' }}>23%</span>
    </div>
    <ProgressBar value={23} color="default" height="6px" />
  </div>
</Stack>`,
      renderComponent: () => (
        <Stack direction="column" gap="lg">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography variant="small">Uploading document.pdf</Typography>
              <span style={{ fontSize: '14px', color: '#666' }}>78%</span>
            </div>
            <ProgressBar value={78} color="default" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography variant="small">Installation Complete</Typography>
              <span style={{ fontSize: '14px', color: '#16a34a' }}>100%</span>
            </div>
            <ProgressBar value={100} color="success" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography variant="small">Upload Failed</Typography>
              <span style={{ fontSize: '14px', color: '#dc2626' }}>45%</span>
            </div>
            <ProgressBar value={45} color="error" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Typography variant="small">Loading resources...</Typography>
              <span style={{ fontSize: '14px', color: '#666' }}>23%</span>
            </div>
            <ProgressBar value={23} color="default" height="sm" />
          </div>
        </Stack>
      )
    }
  ],

  accessibility: {
    notes: [
      'ProgressBar is a non-interactive visual indicator component that communicates completion status through role="progressbar" and ARIA value attributes',
      'Screen readers announce the current progress value automatically when aria-valuenow changes, providing real-time feedback to users about task completion',
      'No keyboard navigation required as ProgressBar is a presentation-only component without interactive elements or user controls',
      'Color variants (success, error, default) provide visual feedback but should always be accompanied by text labels for users with color vision deficiencies',
      'ARIA attributes (aria-valuenow, aria-valuemin, aria-valuemax) ensure progress values are accurately communicated to assistive technologies',
      'Progress values are clamped to 0-100 range automatically, preventing invalid ARIA attribute values that could confuse screen readers',
      'Component meets WCAG 2.2 AA requirements when used with descriptive text labels indicating what task is in progress',
      'Color contrast ratios exceed minimum requirements across all color variants, ensuring visibility for users with low vision',
      'Smooth transition animations enhance visual feedback without creating distracting motion that could trigger vestibular disorders',
      'Automated accessibility testing with jest-axe validates ARIA implementation and prevents regression issues throughout development'
    ],
    keyboardNavigation: 'Not applicable - ProgressBar is a visual indicator without interactive elements. No keyboard controls required.',
    screenReader: 'Announced as "progress bar" with current value. Screen readers automatically announce changes to aria-valuenow. Example: "progress bar, 75 percent"',
    focusManagement: 'Not applicable - ProgressBar cannot receive focus as it is a non-interactive presentation component.'
  },

  anatomy: {
    description: 'A simple two-part component consisting of a background container and an animated fill indicator',
    diagram: `
Horizontal:
┌─────────────────────────────────────┐
│ Container (background)              │
│ ┌─────────────────┐                 │
│ │ Fill (progress) │                 │
│ └─────────────────┘                 │
└─────────────────────────────────────┘

Vertical:
┌───────┐
│       │
│       │
│       │
│ ┌───┐ │
│ │Fill│ │
│ │   │ │
│ └───┘ │
└───────┘
Container
    `,
    parts: [
      {
        name: 'Container',
        description: 'Background track providing visual context for progress. Sets the maximum width/height and provides subtle background color.',
        tokens: [
          'semantic.color.background.progressTrack',
          'semantic.spacing.borderRadius.small',
          'semantic.motion.transition.normal',
          'component.progressBar.sizes.sm.height',
          'component.progressBar.sizes.md.height',
          'component.progressBar.sizes.lg.height',
          'component.progressBar.sizes.xl.height'
        ]
      },
      {
        name: 'Fill',
        description: 'Colored indicator showing current progress. Animates smoothly when value changes. Color varies by variant (default/success/error).',
        tokens: [
          'semantic.color.core.primary',
          'semantic.color.core.success',
          'semantic.color.core.error',
          'semantic.spacing.borderRadius.small',
          'semantic.motion.transition.normal'
        ]
      }
    ]
  },

  notes: [
    'Usage Context: Use ProgressBar for file uploads, form submissions, multi-step processes, loading states, and any scenario requiring visual progress feedback with known completion percentage.',
    'Orientation Selection: Choose horizontal variant for standard progress indicators in forms and content areas. Choose vertical variant for sidebars, dashboards, comparison displays, or space-constrained layouts.',
    'Color Semantics: Use default (primary) color for standard progress tracking. Reserve success color exclusively for 100% completion states. Use error color only for failed operations, not slow progress.',
    'Labeling Requirements: Always provide descriptive text labels indicating what task is in progress and current percentage. This is essential for accessibility and user understanding across all abilities.',
    'Indeterminate States: ProgressBar requires a known value (0-100). For indeterminate loading states where progress cannot be calculated, use a loading spinner or skeleton component instead.',
    'Size Guidelines: Use sm (4px) for subtle, non-critical indicators. Use md (8px) for standard progress displays. Use lg (16px) for prominent displays. Use xl (20px) for user-critical tasks like file uploads. All sizes use design system tokens for consistency.',
    'Performance: Progress value updates trigger smooth CSS transitions. Avoid updating values more frequently than every 100ms to prevent excessive re-renders and maintain smooth animations.',
    'Design Token Integration: All colors, border radius, sizes, and transitions use design system tokens, ensuring consistency with overall visual hierarchy and brand guidelines.',
    'Testing Support: data-testid prop enables consistent automated testing across different progress states and variants, with comprehensive test coverage for accessibility compliance.'
  ]
}

