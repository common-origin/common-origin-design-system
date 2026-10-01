import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { TabBar } from './TabBar'

export const tabBarDocs: ComponentDocumentation = {
  id: 'tab-bar',
  name: 'TabBar',
  description: 'An accessible tabbed navigation component with keyboard support and optional count badges. Implements the WAI-ARIA tablist pattern with a roving tabindex. TabBar has one look (decision 0020): the selected tab takes the light-blue selected treatment (fill and blue text) with a blue underline. The variant prop is deprecated; its old default and pills values now render the same way.',
  category: 'Molecules',

  props: [
    {
      name: 'tabs',
      type: 'Tab[]',
      required: true,
      default: 'undefined',
      description: 'Array of tab configurations. Each tab requires id and label. Optional badge (number) and disabled (boolean) properties available.'
    },
    {
      name: 'activeTab',
      type: 'string',
      required: true,
      default: 'undefined',
      description: 'ID of the currently active tab. Must match one of the tab IDs in the tabs array.'
    },
    {
      name: 'onTabChange',
      type: '(tabId: string) => void',
      required: true,
      default: 'undefined',
      description: 'Callback function invoked when user selects a different tab. Receives the selected tab ID. Not called for disabled tabs.'
    },
    {
      name: 'variant',
      type: "'default' | 'pills' | 'underline'",
      required: false,
      default: "'underline'",
      description: "Deprecated, removed in 3.0 (decision 0020). TabBar has one look; every value renders as underline. Remove the prop."
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Testing identifier for the tablist container. Individual tabs get auto-generated IDs: {data-testid}-tab-{tabId}.'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: '"Tab navigation"',
      description: 'Accessible label for the tablist. Helps screen reader users understand the purpose of the tab group.'
    }
  ],

  tokens: [
    // Tab list
    'semantic.border.width.thin',
    'semantic.color.border.subtle',
    'component.tabBar.scrollbar.height',
    'semantic.color.background.subtle',
    'semantic.color.border.default',
    'semantic.border.radius.sm',
    // Tab
    'semantic.typography.button2',
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',
    'semantic.color.text.subdued',
    'semantic.color.text.default',
    'semantic.motion.hover',
    // Selected tab (decisions 0016, 0020): the text darkens with the fill
    'semantic.color.background.interactive-subtle',
    'semantic.color.text.interactive',
    'semantic.color.background.interactive-subtle-hover',
    'semantic.color.text.interactive-hover',
    'semantic.color.background.interactive-subtle-active',
    'semantic.color.text.interactive-active',
    // Underline
    'semantic.color.background.interactive',
    'semantic.border.width.thick',
    // Focus
    'semantic.color.border.strong',
    'semantic.spacing.layout.xs',
    // Count badge
    'component.tabBar.badge.size',
    'component.tabBar.badge.typography',
    'component.tabBar.badge.fontWeight',
    'semantic.border.radius.circle',
    'semantic.color.text.inverse'
  ],

  examples: [
    {
      name: 'Tabs',
      description: 'The selected tab has the light-blue fill, blue text and a blue underline. Unselected tabs are quiet: subdued text that darkens on hover.',
      code: `const [activeTab, setActiveTab] = React.useState('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' }
]

return (
  <TabBar
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
)`,
      renderComponent: () => {
        const BasicExample = () => {
          const [activeTab, setActiveTab] = React.useState('overview')
          const tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'details', label: 'Details' },
            { id: 'settings', label: 'Settings' }
          ]
          return <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        }
        return <BasicExample />
      }
    },
    {
      name: 'With Badge Counts',
      description: 'Display notification or item counts within tabs. Badges automatically show "99+" for values over 99. Perfect for inbox, notifications, or filtered lists.',
      code: `const [activeTab, setActiveTab] = React.useState('all')

const tabs = [
  { id: 'all', label: 'All Items', badge: 127 },
  { id: 'pending', label: 'Pending', badge: 5 },
  { id: 'completed', label: 'Completed', badge: 122 },
  { id: 'archived', label: 'Archived' }
]

return (
  <TabBar 
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
)`,
      renderComponent: () => {
        const BadgeExample = () => {
          const [activeTab, setActiveTab] = React.useState('all')

          const tabs = [
            { id: 'all', label: 'All Items', badge: 127 },
            { id: 'pending', label: 'Pending', badge: 5 },
            { id: 'completed', label: 'Completed', badge: 122 },
            { id: 'archived', label: 'Archived' }
          ]

          return (
            <TabBar 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )
        }
        return <BadgeExample />
      }
    },
    {
      name: 'With Disabled Tabs',
      description: 'Disable specific tabs to prevent interaction while maintaining visual context. Useful for restricted access, incomplete features, or conditional navigation.',
      code: `const [activeTab, setActiveTab] = React.useState('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions', badge: 12 },
  { id: 'analytics', label: 'Analytics', disabled: true },
  { id: 'settings', label: 'Settings', disabled: true }
]

return (
  <TabBar 
    tabs={tabs}
    activeTab={activeTab}
    onTabChange={setActiveTab}
  />
)`,
      renderComponent: () => {
        const DisabledTabsExample = () => {
          const [activeTab, setActiveTab] = React.useState('overview')

          const tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'transactions', label: 'Transactions', badge: 12 },
            { id: 'analytics', label: 'Analytics', disabled: true },
            { id: 'settings', label: 'Settings', disabled: true }
          ]

          return (
            <TabBar 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )
        }
        return <DisabledTabsExample />
      }
    },
    {
      name: 'Many Tabs with Scrolling',
      description: 'Horizontal scrolling activates automatically when tabs exceed container width. Styled scrollbar provides smooth navigation for overflow content.',
      code: `const [activeTab, setActiveTab] = React.useState('dashboard')

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transactions', label: 'Transactions', badge: 45 },
  { id: 'accounts', label: 'Accounts' },
  { id: 'cards', label: 'Cards' },
  { id: 'investments', label: 'Investments', badge: 3 },
  { id: 'reports', label: 'Reports' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' }
]

return (
  <div style={{ maxWidth: '600px' }}>
    <TabBar 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    />
  </div>
)`,
      renderComponent: () => {
        const ScrollingTabsExample = () => {
          const [activeTab, setActiveTab] = React.useState('dashboard')

          const tabs = [
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'transactions', label: 'Transactions', badge: 45 },
            { id: 'accounts', label: 'Accounts' },
            { id: 'cards', label: 'Cards' },
            { id: 'investments', label: 'Investments', badge: 3 },
            { id: 'reports', label: 'Reports' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'settings', label: 'Settings' }
          ]

          return (
            <div style={{ maxWidth: '600px' }}>
              <TabBar 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          )
        }
        return <ScrollingTabsExample />
      }
    },
    {
      name: 'Controlled Tab State',
      description: 'Full control over active tab with external state management. Demonstrates integration with React state, URL parameters, or state management libraries.',
      code: `const [activeTab, setActiveTab] = React.useState('account')
const [changeCount, setChangeCount] = React.useState(0)

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing', label: 'Billing' }
]

const handleTabChange = (tabId: string) => {
  setActiveTab(tabId)
  setChangeCount(prev => prev + 1)
  console.log(\`Switched to: \${tabId}\`)
}

return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <TabBar 
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
    <div style={{ 
      padding: '16px', 
      fontSize: '14px'
    }}>
      <strong>Active Tab:</strong> {activeTab} | <strong>Tab Changes:</strong> {changeCount}
    </div>
  </div>
)`,
      renderComponent: () => {
        const ControlledStateExample = () => {
          const [activeTab, setActiveTab] = React.useState('account')
          const [changeCount, setChangeCount] = React.useState(0)

          const tabs = [
            { id: 'account', label: 'Account' },
            { id: 'security', label: 'Security' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'billing', label: 'Billing' }
          ]

          const handleTabChange = (tabId: string) => {
            setActiveTab(tabId)
            setChangeCount(prev => prev + 1)
          }

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TabBar 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
              <div style={{ 
                padding: '16px', 
                fontSize: '14px'
              }}>
                <strong>Active Tab:</strong> {activeTab} | <strong>Tab Changes:</strong> {changeCount}
              </div>
            </div>
          )
        }
        return <ControlledStateExample />
      }
    }
  ],

  accessibility: {
    notes: [
      'Implements WAI-ARIA tablist pattern with role="tablist" on container and role="tab" on each tab',
      'Roving tabindex pattern: only focused tab has tabIndex="0", others have tabIndex="-1"',
      'Full keyboard navigation: ArrowLeft/Right to move between tabs, Home/End to jump to first/last',
      'Automatically skips disabled tabs during keyboard navigation with wrap-around behavior',
      'Active tab marked with aria-selected="true", inactive tabs with aria-selected="false"',
      'Disabled tabs have aria-disabled="true" and cannot be activated',
      'Badge counts include aria-label for screen reader announcement (e.g., "5 items")',
      'Focus management syncs with activeTab prop changes for external state updates',
      'Selected tab text meets WCAG 2.2 AA in every state: 4.70:1 at rest, 5.60:1 on hover and 6.65:1 when pressed (decision 0016)',
      'The selected state does not rely on colour alone: the selected tab also has the underline and aria-selected="true"',
      'No accessibility violations detected by jest-axe, including for the deprecated variant values'
    ],
    keyboardNavigation: 'Tab key focuses the tab group (enters first or currently active tab). ArrowLeft moves to previous tab, ArrowRight moves to next tab (both wrap around ends). Home jumps to first tab, End jumps to last tab. All navigation automatically skips disabled tabs. Click or tap to activate focused tab.',
    screenReader: 'Screen readers announce "Tab navigation, tablist" for the container. Each tab is announced as "tab" with its label and selection state. Active tabs: "{label}, tab, selected". Inactive tabs: "{label}, tab, not selected". Disabled tabs: "{label}, tab, disabled". Badge counts announced as "{number} items".'
  },

  anatomy: {
    description: 'A horizontal tablist container with a bottom border and a row of tab buttons. Each tab shows a label and an optional count badge. The selected tab has the light-blue fill, blue text and a blue underline.',
    diagram: `
┌────────────────────────────────────────────────────┐
│  TabList Container (role="tablist")                │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│  │ Tab 1     │ │ Tab 2 [5] │ │ Tab 3     │  ...   │
│  │ (active)  │ │ (badge)   │ │ (inactive)│        │
│  └───────────┘ └───────────┘ └───────────┘        │
│  └─────────────────────────────────────────────►   │
│         Horizontal scroll if overflow              │
└────────────────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'TabList Container',
        description: 'Horizontal scrollable container with role="tablist". Displays tabs in a row with optional overflow scrolling. Styled scrollbar for better UX.',
        tokens: [
          'semantic.border.width.thin',
          'semantic.color.border.subtle',
          'component.tabBar.scrollbar.height'
        ]
      },
      {
        name: 'Tab Button',
        description: 'Individual tab element with role="tab". Unselected: subdued text, no fill, darkening to the default text colour on hover. Selected: the light-blue fill with blue text, both darkening on hover and press. Disabled tabs are at half opacity. Includes aria-selected and aria-disabled attributes.',
        tokens: [
          'semantic.color.text.subdued',
          'semantic.color.text.default',
          'semantic.color.background.interactive-subtle',
          'semantic.color.text.interactive',
          'semantic.color.background.interactive-subtle-hover',
          'semantic.color.text.interactive-hover',
          'semantic.color.background.interactive-subtle-active',
          'semantic.color.text.interactive-active',
          'semantic.typography.button2',
          'semantic.spacing.layout.md',
          'semantic.spacing.layout.lg'
        ]
      },
      {
        name: 'Badge',
        description: 'Optional circular badge displaying notification or item count. Positioned inline after tab label. Shows "99+" for values over 99. Has aria-label for accessibility.',
        tokens: [
          'semantic.color.background.interactive',
          'semantic.color.text.inverse',
          'semantic.border.radius.circle',
          'component.tabBar.badge.typography',
          'component.tabBar.badge.fontWeight'
        ]
      },
      {
        name: 'Underline',
        description: 'A blue underline under the selected tab, on top of the tab list border. Transitions with the hover motion token when the selection changes.',
        tokens: [
          'semantic.color.background.interactive',
          'semantic.border.width.thick',
          'semantic.motion.hover'
        ]
      }
    ]
  }
}
