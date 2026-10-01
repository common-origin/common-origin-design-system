import { ComponentDocumentation } from '../../../lib/docgen/types'
import { StatusLabel } from './StatusLabel'
import { labelGuideNotes } from '../../../lib/docgen/labelGuide'

export const statusLabelDocs: ComponentDocumentation = {
  id: 'status-label',
  name: 'StatusLabel',
  description: 'Conveys the status of something, such as a transaction or task (decision 0018). Uses only the status colour tokens and always shows an icon with its text, so status is never conveyed by colour alone. Not interactive. Announces status changes through an ARIA live region. Replaces the deprecated StatusBadge, with the same props apart from showIcon.',
  category: 'Atoms',
  
  props: [
    {
      name: 'status',
      type: "'pending' | 'completed' | 'failed' | 'cancelled' | 'processing' | 'scheduled'",
      required: true,
      default: 'undefined',
      description: 'The status type determining color, icon, and default label. Maps to semantic status colors and appropriate iconography for clear visual communication.'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      default: 'Derived from status type',
      description: 'Custom label text overriding the default status label. Use for localization or context-specific messaging while maintaining semantic status colors.'
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: "'medium'",
      description: 'Size variant affecting height, padding, typography, and icon size. Small (20px) for compact layouts, medium (24px) for standard visibility.'
    },
    {
      name: 'liveRegion',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Enables ARIA live region for screen reader announcements when status changes. Set to false for static status displays that don\'t update dynamically: this sets aria-live="off", because role="status" is otherwise announced politely.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: '"Status: {label}"',
      description: 'Custom accessible label for screen readers. Automatically generated from status label but can be overridden for additional context.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for automated test location and interaction verification.'
    }
  ],

  tokens: [
    // Status colors
    'semantic.color.status.pending',
    'semantic.color.status.pending-bg',
    'semantic.color.status.completed',
    'semantic.color.status.completed-bg',
    'semantic.color.status.failed',
    'semantic.color.status.failed-bg',
    'semantic.color.status.cancelled',
    'semantic.color.status.cancelled-bg',
    'semantic.color.status.processing',
    'semantic.color.status.processing-bg',
    'semantic.color.status.scheduled',
    'semantic.color.status.scheduled-bg',
    // Height (decision 0018 size scale)
    'semantic.size.label.small',
    'semantic.size.label.medium',
    // Spacing
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    // Typography
    'component.badge.label.typography.small',
    'component.badge.label.typography.medium',
    'component.badge.label.fontWeight',
    // Border
    'semantic.border.radius.circle',
    // Icon sizes
    'semantic.size.icon.xs',
    'semantic.size.icon.sm',
    // Motion
    'semantic.motion.transition.fast',
    'semantic.motion.duration.normal',
    'semantic.motion.easing.easeOut',
  ],

  examples: [
    {
      name: 'All Status Types',
      description: 'Six semantic status types with color-coded visual feedback and appropriate iconography. Each status has distinct meaning for transaction or task states.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <StatusLabel status="pending" />
    <StatusLabel status="processing" />
    <StatusLabel status="scheduled" />
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <StatusLabel status="completed" />
    <StatusLabel status="failed" />
    <StatusLabel status="cancelled" />
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusLabel status="pending" />
            <StatusLabel status="processing" />
            <StatusLabel status="scheduled" />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusLabel status="completed" />
            <StatusLabel status="failed" />
            <StatusLabel status="cancelled" />
          </div>
        </div>
      )
    },
    {
      name: 'Custom Labels',
      description: 'Override default status labels for localization or context-specific messaging while maintaining semantic status colors.',
      code: `<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  <StatusLabel status="pending" label="Awaiting Approval" />
  <StatusLabel status="processing" label="In Progress" />
  <StatusLabel status="completed" label="Success" />
  <StatusLabel status="failed" label="Error" />
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <StatusLabel status="pending" label="Awaiting Approval" />
          <StatusLabel status="processing" label="In Progress" />
          <StatusLabel status="completed" label="Success" />
          <StatusLabel status="failed" label="Error" />
        </div>
      )
    },
    {
      name: 'Size Variants',
      description: 'Two size options for different layout contexts. Small for compact transaction lists, medium for prominent status displays.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', }}>Small (20px height)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <StatusLabel status="pending" size="small" />
      <StatusLabel status="completed" size="small" />
      <StatusLabel status="failed" size="small" />
    </div>
  </div>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', }}>Medium (24px height)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <StatusLabel status="pending" size="medium" />
      <StatusLabel status="completed" size="medium" />
      <StatusLabel status="failed" size="medium" />
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', }}>Small (20px height)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusLabel status="pending" size="small" />
              <StatusLabel status="completed" size="small" />
              <StatusLabel status="failed" size="small" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', }}>Medium (24px height)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusLabel status="pending" size="medium" />
              <StatusLabel status="completed" size="medium" />
              <StatusLabel status="failed" size="medium" />
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Live Region Updates',
      description: 'ARIA live region enabled by default announces status changes to screen readers. Useful for dynamic status updates in transaction monitoring.',
      code: `// Live region announcements (enabled by default)
<StatusLabel status="processing" liveRegion={true} />

// Static status display (no announcements)
<StatusLabel status="completed" liveRegion={false} />`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', }}>With live announcements (default)</p>
            <StatusLabel status="processing" liveRegion={true} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', }}>Static display (no announcements)</p>
            <StatusLabel status="completed" liveRegion={false} />
          </div>
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses role="status" for semantic ARIA landmark',
      'ARIA live region (aria-live="polite", aria-atomic="true") enabled by default for screen reader announcements',
      'The icon is decorative, but Icon does not yet honour aria-hidden, so screen readers may announce it as an image (for example "refresh"). Making icons decorative by default is #85.',
      'Screen reader text provides additional context beyond visible label',
      'Every status meets WCAG 2.2 AA (4.5:1) for its text and icon on its background, enforced by tests. Pending uses yellow.1000 (#825800), 5.69:1 (#115).',
      'Automatic aria-label generation: "Status: {label}"',
      'No accessibility violations detected by jest-axe across all variants',
      'Non-interactive element (no keyboard navigation needed)'
    ],
    keyboardNavigation: 'Not applicable - status labels are non-interactive display elements.',
    screenReader: 'Screen readers announce "Status: {label}" followed by hidden context text "{status} status". When liveRegion is true, changes are announced automatically.'
  },

  anatomy: {
    description: 'A compact pill with status-specific styling containing an icon and label text. Color and icon automatically determined by status type.',
    diagram: `
┌──────────────────────────┐
│  StatusLabel Container   │
│  ┌──────┐  ┌──────────┐ │
│  │ Icon │  │  Label   │ │
│  │      │  │  (text)  │ │
│  └──────┘  └──────────┘ │
│  Hidden SR context text  │
└──────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners and status-specific background color. Includes role="status" and optional ARIA live region attributes.',
        tokens: [
          'semantic.color.status.pending',
          'semantic.color.status.completed',
          'semantic.color.status.failed',
          'semantic.color.status.cancelled',
          'semantic.color.status.processing',
          'semantic.color.status.scheduled',
          'semantic.color.status.pending-bg',
          'semantic.color.status.completed-bg',
          'semantic.color.status.failed-bg',
          'semantic.color.status.cancelled-bg',
          'semantic.color.status.processing-bg',
          'semantic.color.status.scheduled-bg',
          'semantic.border.radius.circle',
          'semantic.size.label.small',
          'semantic.size.label.medium'
        ]
      },
      {
        name: 'Icon',
        description: 'Leading icon, always shown, selected by status type. xs on small labels and sm on medium. Decorative (see the accessibility notes and #85).',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm'
        ]
      },
      {
        name: 'Label',
        description: 'Status text using status-specific color. Default labels provided but can be overridden. Typography scales with the label size.',
        tokens: [
          'component.badge.label.typography.small',
          'component.badge.label.typography.medium',
          'component.badge.label.fontWeight'
        ]
      },
      {
        name: 'Screen Reader Text',
        description: 'Visually hidden text providing additional context for assistive technologies. Contains "{status} status" for clarity.',
        tokens: []
      }
    ]
  },

  notes: [
    'Renamed from StatusBadge in 2.16 (decision 0018). StatusBadge still works as a deprecated alias and is removed in 3.0. Migrate by renaming: status, size, label and liveRegion are unchanged. showIcon={false} is no longer possible.',
    ...labelGuideNotes
  ]
}
