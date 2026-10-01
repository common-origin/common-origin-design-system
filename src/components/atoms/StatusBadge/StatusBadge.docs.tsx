import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { StatusBadge } from './StatusBadge'

export const statusBadgeDocs: ComponentDocumentation = {
  id: 'status-badge',
  name: 'StatusBadge',
  description: 'Deprecated: renamed to StatusLabel (decision 0018) and removed in 3.0. Rename to StatusLabel; status, size, label and liveRegion are unchanged, and the icon is always shown (showIcon goes). A semantic status indicator badge displaying transaction or task states with color-coded visual feedback, icons, and screen reader support. Features ARIA live region announcements for dynamic status changes.',
  category: 'Atoms',
  parentId: 'status-label',
  
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
      name: 'showIcon',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Controls icon visibility. Icons provide additional visual reinforcement of status meaning. Set to false for text-only badges in space-constrained layouts.'
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
      description: 'Accessible label. It names the status and, because a live region announces its content rather than its name, it also replaces the announced content: the visible text and icon are hidden from assistive technology (#78). Defaults to "Status: {label}", with the visible text announced.'
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
    <StatusBadge status="pending" />
    <StatusBadge status="processing" />
    <StatusBadge status="scheduled" />
  </div>
  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <StatusBadge status="completed" />
    <StatusBadge status="failed" />
    <StatusBadge status="cancelled" />
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusBadge status="pending" />
            <StatusBadge status="processing" />
            <StatusBadge status="scheduled" />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusBadge status="completed" />
            <StatusBadge status="failed" />
            <StatusBadge status="cancelled" />
          </div>
        </div>
      )
    },
    {
      name: 'Custom Labels',
      description: 'Override default status labels for localization or context-specific messaging while maintaining semantic status colors.',
      code: `<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  <StatusBadge status="pending" label="Awaiting Approval" />
  <StatusBadge status="processing" label="In Progress" />
  <StatusBadge status="completed" label="Success" />
  <StatusBadge status="failed" label="Error" />
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <StatusBadge status="pending" label="Awaiting Approval" />
          <StatusBadge status="processing" label="In Progress" />
          <StatusBadge status="completed" label="Success" />
          <StatusBadge status="failed" label="Error" />
        </div>
      )
    },
    {
      name: 'Size Variants',
      description: 'Two size options for different layout contexts. Small for compact transaction lists, medium for prominent status displays.',
      code: `<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small (20px height)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <StatusBadge status="pending" size="small" />
      <StatusBadge status="completed" size="small" />
      <StatusBadge status="failed" size="small" />
    </div>
  </div>
  <div>
    <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (24px height)</p>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <StatusBadge status="pending" size="medium" />
      <StatusBadge status="completed" size="medium" />
      <StatusBadge status="failed" size="medium" />
    </div>
  </div>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Small (20px height)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusBadge status="pending" size="small" />
              <StatusBadge status="completed" size="small" />
              <StatusBadge status="failed" size="small" />
            </div>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Medium (24px height)</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusBadge status="pending" size="medium" />
              <StatusBadge status="completed" size="medium" />
              <StatusBadge status="failed" size="medium" />
            </div>
          </div>
        </div>
      )
    },
    {
      name: 'Without Icons',
      description: 'Text-only badges for space-constrained layouts or when icon meaning is redundant with surrounding context.',
      code: `<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
  <StatusBadge status="pending" showIcon={false} />
  <StatusBadge status="processing" showIcon={false} />
  <StatusBadge status="completed" showIcon={false} />
  <StatusBadge status="failed" showIcon={false} />
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <StatusBadge status="pending" showIcon={false} />
          <StatusBadge status="processing" showIcon={false} />
          <StatusBadge status="completed" showIcon={false} />
          <StatusBadge status="failed" showIcon={false} />
        </div>
      )
    },
    {
      name: 'Live Region Updates',
      description: 'ARIA live region enabled by default announces status changes to screen readers. Useful for dynamic status updates in transaction monitoring.',
      code: `// Live region announcements (enabled by default)
<StatusBadge status="processing" liveRegion={true} />

// Static status display (no announcements)
<StatusBadge status="completed" liveRegion={false} />`,
      renderComponent: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>With live announcements (default)</p>
            <StatusBadge status="processing" liveRegion={true} />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Static display (no announcements)</p>
            <StatusBadge status="completed" liveRegion={false} />
          </div>
        </div>
      )
    }
  ],

  accessibility: {
    notes: [
      'Uses role="status" for semantic ARIA landmark',
      'ARIA live region (aria-live="polite", aria-atomic="true") enabled by default for screen reader announcements',
      'The icon is decorative, but Icon does not yet honour aria-hidden, so screen readers may announce it as an image (for example "refresh") unless an aria-label is provided, which hides it. Making icons decorative by default is #85.',
      'Hidden "{status} status" text adds context beyond the visible label, unless an aria-label replaces the content (#78)',
      'Every status meets WCAG 2.2 AA (4.5:1) for its text and icon on its background, enforced by tests. Pending uses yellow.1000 (#825800), 5.69:1 (#115).',
      'Accessible name: the aria-label if provided, otherwise "Status: {label}". A provided aria-label also replaces the announced content (#78)',
      'No accessibility violations detected by jest-axe across all variants',
      'Non-interactive element (no keyboard navigation needed)'
    ],
    keyboardNavigation: 'Not applicable - status badges are non-interactive display elements.',
    screenReader: 'By default the status is named "Status: {label}", and screen readers read its content: the visible text, then hidden context text "{status} status" (and the icon, until #85). When aria-label is provided, it becomes both the name and the only content read; the visible text, icon and context text are hidden from assistive technology (#78). With liveRegion (the default) changes are announced politely; liveRegion={false} sets aria-live="off".'
  },

  anatomy: {
    description: 'A compact pill with status-specific styling: an icon (optional on the deprecated StatusBadge), the label text and hidden "{status} status" context, wrapped in a visible-content span. When an aria-label is given, that span is hidden from assistive technology and a visually hidden label is announced instead (#78).',
    diagram: `
┌───────────────────────────────────┐
│  StatusBadge (role="status")      │
│  ┌ Visible content ────────────┐  │
│  │ ┌──────┐  ┌──────────┐      │  │
│  │ │ Icon │  │  Label   │      │  │
│  │ │(opt) │  │  (text)  │      │  │
│  │ └──────┘  └──────────┘      │  │
│  │ Hidden "{status} status"    │  │
│  └─────────────────────────────┘  │
│  Hidden label (aria-label only)   │
└───────────────────────────────────┘
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
        description: 'Optional leading icon automatically selected based on status type. Sized according to the size. Decorative, but Icon does not yet honour aria-hidden, so it may be announced (#85) unless an aria-label hides the visible content.',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm'
        ]
      },
      {
        name: 'Label',
        description: 'Status text using status-specific color. Default labels provided but can be overridden. Typography scales with badge size.',
        tokens: [
          'component.badge.label.typography.small',
          'component.badge.label.typography.medium',
          'component.badge.label.fontWeight'
        ]
      },
      {
        name: 'Screen Reader Text',
        description: 'Visually hidden text providing additional context for assistive technologies: "{status} status". When an aria-label is provided, the visually hidden aria-label replaces it and the visible content (#78).',
        tokens: []
      },
      {
        name: 'Visible content',
        description: 'Wraps the icon, label and "{status} status" text with display: contents, so it adds no box and keeps the container layout. It gets aria-hidden="true" only when a non-blank aria-label is given (#78).',
        tokens: []
      },
      {
        name: 'Hidden label (aria-label only)',
        description: 'Rendered only when a non-blank aria-label is given: the aria-label as visually hidden text. Because a live region announces its content, this is what screen readers read; the aria-label also names the status (#78).',
        tokens: []
      }
    ]
  }
}
