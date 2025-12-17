import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { StatusBadge } from './StatusBadge'

export const statusBadgeDocs: ComponentDocumentation = {
  id: 'status-badge',
  name: 'StatusBadge',
  description: 'A semantic status indicator badge displaying transaction or task states with color-coded visual feedback, icons, and screen reader support. Features ARIA live region announcements for dynamic status changes.',
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
      description: 'Enables ARIA live region for screen reader announcements when status changes. Set to false for static status displays that don\'t update dynamically.'
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
    'semantic.color.status.pending - Yellow color for awaiting states',
    'semantic.color.status.pending-bg - Light yellow background',
    'semantic.color.status.completed - Green color for successful states',
    'semantic.color.status.completed-bg - Light green background',
    'semantic.color.status.failed - Red color for error states',
    'semantic.color.status.failed-bg - Light red background',
    'semantic.color.status.cancelled - Gray color for cancelled states',
    'semantic.color.status.cancelled-bg - Light gray background',
    'semantic.color.status.processing - Blue color for active processing',
    'semantic.color.status.processing-bg - Light blue background',
    'semantic.color.status.scheduled - Purple color for future scheduled states',
    'semantic.color.status.scheduled-bg - Light purple background',
    'base.spacing.1 - 2px padding (vertical for small)',
    'base.spacing.2 - 4px padding (vertical for medium)',
    'base.spacing.3 - 6px padding (horizontal)',
    'semantic.typography.caption - Typography for small size',
    'semantic.typography.small - Typography for medium size',
    'base.border.radius.pill - Fully rounded corners',
    'semantic.size.icon.xs - 12px icon for small badges',
    'semantic.size.icon.sm - 16px icon for medium badges'
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
      'Icons have aria-hidden="true" to prevent redundant announcements',
      'Screen reader text provides additional context beyond visible label',
      'All status colors maintain WCAG 2.2 AA contrast ratios (4.5:1 for text)',
      'Automatic aria-label generation: "Status: {label}"',
      'No accessibility violations detected by jest-axe across all variants',
      'Non-interactive element (no keyboard navigation needed)'
    ],
    keyboardNavigation: 'Not applicable - status badges are non-interactive display elements.',
    screenReader: 'Screen readers announce "Status: {label}" followed by hidden context text "{status} status". When liveRegion is true, changes are announced automatically.'
  },

  anatomy: {
    description: 'A compact badge with status-specific styling containing an optional icon and label text. Color and icon automatically determined by status type.',
    diagram: `
┌──────────────────────────┐
│  StatusBadge Container   │
│  ┌──────┐  ┌──────────┐ │
│  │ Icon │  │  Label   │ │
│  │(opt) │  │  (text)  │ │
│  └──────┘  └──────────┘ │
│  Hidden SR context text  │
└──────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root element with rounded corners and status-specific background color. Includes role="status" and optional ARIA live region attributes.',
        tokens: [
          'semantic.color.status.[type]',
          'semantic.color.status.[type]-bg',
          'base.border.radius.pill'
        ]
      },
      {
        name: 'Icon',
        description: 'Optional leading icon automatically selected based on status type. Sized according to badge size variant. Has aria-hidden="true".',
        tokens: [
          'semantic.size.icon.xs',
          'semantic.size.icon.sm'
        ]
      },
      {
        name: 'Label',
        description: 'Status text using status-specific color. Default labels provided but can be overridden. Typography scales with badge size.',
        tokens: [
          'semantic.typography.caption',
          'semantic.typography.small'
        ]
      },
      {
        name: 'Screen Reader Text',
        description: 'Visually hidden text providing additional context for assistive technologies. Contains "{status} status" for clarity.',
        tokens: []
      }
    ]
  }
}
