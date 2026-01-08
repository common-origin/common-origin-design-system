import React from 'react'
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Badge } from './Badge'
import { Button } from '../Button'
import { IconButton } from '../IconButton'

export const badgeDocs: ComponentDocumentation = {
  id: 'badge',
  name: 'Badge',
  description: 'A notification indicator that wraps components to show counts or presence status',
  category: 'Atoms',
  
  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      description: 'The component to wrap with the badge (Button, IconButton, Avatar, Chip, etc.)'
    },
    {
      name: 'count',
      type: 'number',
      required: false,
      default: '0',
      description: 'Number to display in the badge. Badge is hidden when 0 (unless dot variant is used)'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: '99',
      description: 'Maximum number to display before showing "99+" format'
    },
    {
      name: 'variant',
      type: '"default" | "primary" | "error" | "warning" | "success"',
      required: false,
      default: '"default"',
      description: 'Visual style variant affecting background color and semantic meaning'
    },
    {
      name: 'dot',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Show only a dot indicator instead of a count number. Always visible when true'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Custom screen reader label. Defaults to "{count} notification(s)" or "New notification indicator" for dot variant'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Additional CSS class for custom styling'
    }
  ],
  
  tokens: [
    // Colors
    'semantic.color.background.emphasis',
    'semantic.color.background.interactive',
    'semantic.color.background.error',
    'semantic.color.background.warning',
    'semantic.color.background.success',
    'semantic.color.text.inverse',
    'semantic.color.background.default',
    
    // Typography
    'semantic.typography.caption',
    
    // Border
    'semantic.border.radius.circle'
  ],
  
  examples: [
    {
      name: 'Basic Usage with Count',
      description: 'Badge showing notification count on a button',
      code: `<Badge count={5}>
  <Button>Notifications</Button>
</Badge>`,
      renderComponent: () => (
        <Badge count={5}>
          <Button>Notifications</Button>
        </Badge>
      )
    },
    {
      name: 'Dot Indicator',
      description: 'Simple presence indicator without showing a count',
      code: `<Badge dot>
  <Button>Messages</Button>
</Badge>`,
      renderComponent: () => (
        <Badge dot>
          <Button>Messages</Button>
        </Badge>
      )
    },
    {
      name: 'All Variants',
      description: 'Different semantic variants for various contexts',
      code: `<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
  <Badge count={3} variant="default">
    <Button>Default</Button>
  </Badge>
  <Badge count={5} variant="primary">
    <Button>Primary</Button>
  </Badge>
  <Badge count={2} variant="error">
    <Button>Error</Button>
  </Badge>
  <Badge count={4} variant="warning">
    <Button>Warning</Button>
  </Badge>
  <Badge count={1} variant="success">
    <Button>Success</Button>
  </Badge>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Badge count={3} variant="default">
            <Button>Default</Button>
          </Badge>
          <Badge count={5} variant="primary">
            <Button>Primary</Button>
          </Badge>
          <Badge count={2} variant="error">
            <Button>Error</Button>
          </Badge>
          <Badge count={4} variant="warning">
            <Button>Warning</Button>
          </Badge>
          <Badge count={1} variant="success">
            <Button>Success</Button>
          </Badge>
        </div>
      )
    },
    {
      name: 'Maximum Count Display',
      description: 'Shows "99+" when count exceeds the maximum threshold',
      code: `<div style={{ display: 'flex', gap: '16px' }}>
  <Badge count={99}>
    <Button>99 items</Button>
  </Badge>
  <Badge count={100}>
    <Button>100 items</Button>
  </Badge>
  <Badge count={1000} max={999}>
    <Button>Custom max</Button>
  </Badge>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Badge count={99}>
            <Button>99 items</Button>
          </Badge>
          <Badge count={100}>
            <Button>100 items</Button>
          </Badge>
          <Badge count={1000} max={999}>
            <Button>Custom max</Button>
          </Badge>
        </div>
      )
    },
    {
      name: 'With IconButton',
      description: 'Badge wrapping an IconButton for compact notification indicators',
      code: `<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
  <Badge count={3}>
    <IconButton iconName="message" variant="secondary" aria-label="Notifications" />
  </Badge>
  <Badge dot variant="error">
    <IconButton iconName="message" variant="secondary" aria-label="Messages" />
  </Badge>
  <Badge count={12} variant="primary">
    <IconButton iconName="message" variant="secondary" aria-label="Alerts" />
  </Badge>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge count={3}>
            <IconButton iconName="message" variant="secondary" aria-label="Notifications" />
          </Badge>
          <Badge dot variant="error">
            <IconButton iconName="message" variant="secondary" aria-label="Messages" />
          </Badge>
          <Badge count={12} variant="primary">
            <IconButton iconName="message" variant="secondary" aria-label="Alerts" />
          </Badge>
        </div>
      )
    },
    {
      name: 'Hidden on Zero',
      description: 'Badge automatically hides when count is 0 (except dot variant)',
      code: `<div style={{ display: 'flex', gap: '16px' }}>
  <Badge count={0}>
    <Button>No notifications</Button>
  </Badge>
  <Badge dot count={0}>
    <Button>Dot always shows</Button>
  </Badge>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Badge count={0}>
            <Button>No notifications</Button>
          </Badge>
          <Badge dot count={0}>
            <Button>Dot always shows</Button>
          </Badge>
        </div>
      )
    },
    {
      name: 'Custom Accessibility Labels',
      description: 'Providing context-specific labels for screen readers',
      code: `<div style={{ display: 'flex', gap: '16px' }}>
  <Badge count={5} aria-label="5 unread messages">
    <Button>Messages</Button>
  </Badge>
  <Badge dot aria-label="Online status indicator">
    <Button>User Status</Button>
  </Badge>
  <Badge count={3} variant="error" aria-label="3 critical alerts">
    <Button>Alerts</Button>
  </Badge>
</div>`,
      renderComponent: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
          <Badge count={5} aria-label="5 unread messages">
            <Button>Messages</Button>
          </Badge>
          <Badge dot aria-label="Online status indicator">
            <Button>User Status</Button>
          </Badge>
          <Badge count={3} variant="error" aria-label="3 critical alerts">
            <Button>Alerts</Button>
          </Badge>
        </div>
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses role="status" to announce the badge as a live region to screen readers',
      'Includes aria-live="polite" for non-intrusive count updates',
      'Provides default screen reader text: "{count} notification(s)" or "New notification indicator" for dot',
      'Supports custom aria-label for context-specific announcements',
      'Badge content is visually hidden but announced to screen readers',
      'Maintains focus on the wrapped component, badge is non-interactive',
      'Automatically hides when count is 0 to avoid announcing empty states',
      'Uses singular/plural forms correctly ("1 notification" vs "5 notifications")'
    ],
    keyboardNavigation: 'Badge is non-interactive and does not receive keyboard focus. Navigation focuses on the wrapped child component.',
    screenReader: 'Announces count or presence status. Example: "Button, Notifications. Status: 5 notifications" or "Button, Messages. Status: New notification indicator"'
  },
  
  anatomy: {
    description: 'A wrapper component with an absolutely positioned indicator in the top-right corner',
    diagram: `
┌─────────────────────────────┐
│  Badge Wrapper              │
│  ┌───────────────────────┐  │
│  │  Child Component     ◯│  │ ← Badge Indicator
│  │  (Button, Icon, etc) │5 │    (top-right corner)
│  └───────────────────────┘  │
└─────────────────────────────┘
    `,
    parts: [
      {
        name: 'Badge Wrapper',
        description: 'Inline-flex container that wraps the child component with relative positioning',
        tokens: []
      },
      {
        name: 'Child Component',
        description: 'The wrapped component (Button, IconButton, Avatar, Chip, etc.) that receives the badge indicator',
        tokens: []
      },
      {
        name: 'Badge Indicator',
        description: 'Absolutely positioned element in top-right corner showing count or dot. Includes white shadow for separation from background',
        tokens: [
          'semantic.color.background.emphasis',
          'semantic.color.text.inverse',
          'base.border.radius.circle',
          'semantic.typography.caption'
        ]
      },
      {
        name: 'Screen Reader Text',
        description: 'Visually hidden text providing accessible count or status announcement',
        tokens: []
      }
    ]
  }
}
