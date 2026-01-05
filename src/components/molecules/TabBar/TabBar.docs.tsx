import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { TabBar, Tab } from './TabBar'

export const tabBarDocs: ComponentDocumentation = {
  id: 'tab-bar',
  name: 'TabBar',
  description: 'A fully accessible tabbed navigation component with keyboard support, multiple visual variants, and optional badge indicators. Implements WAI-ARIA tablist pattern with roving tabindex for optimal keyboard navigation.',
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
      default: "'default'",
      description: 'Visual style variant. Default for standard bordered tabs, pills for rounded button-like tabs, underline for minimal tabs with bottom border indicator.'
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
    'semantic.color.background.default - Container background',
    'semantic.color.background.interactive - Active tab background (default variant)',
    'semantic.color.background.interactive-subtle - Hover state background',
    'semantic.color.text.default - Inactive tab text color',
    'semantic.color.text.emphasis - Active tab text color',
    'semantic.color.border.default - Tab borders (default variant)',
    'semantic.color.border.emphasis - Active tab bottom border (underline variant)',
    'base.spacing.2 - 4px vertical padding for tabs',
    'base.spacing.4 - 8px horizontal padding for tabs',
    'semantic.typography.body2 - Tab label typography',
    'base.border.radius.md - Rounded corners for pills variant',
    'base.border.width.1 - 1px border width',
    'semantic.motion.interactive - Smooth transitions for hover/active states'
  ],

  examples: [
    {
      name: 'Tab Variants',
      description: 'Three visual styles for different interface contexts. Default for standard application tabs, pills for prominent navigation, underline for minimal content sections.',
      code: `const [activeDefault, setActiveDefault] = React.useState('overview')
const [activePills, setActivePills] = React.useState('overview')
const [activeUnderline, setActiveUnderline] = React.useState('overview')

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' }
]

return (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Default Variant</p>
      <TabBar 
        tabs={tabs}
        activeTab={activeDefault}
        onTabChange={setActiveDefault}
        variant="default"
      />
    </div>
    
    <div>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Pills Variant</p>
      <TabBar 
        tabs={tabs}
        activeTab={activePills}
        onTabChange={setActivePills}
        variant="pills"
      />
    </div>
    
    <div>
      <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Underline Variant</p>
      <TabBar 
        tabs={tabs}
        activeTab={activeUnderline}
        onTabChange={setActiveUnderline}
        variant="underline"
      />
    </div>
  </div>
)`,
      renderComponent: () => {
        const TabVariantsExample = () => {
          const [activeDefault, setActiveDefault] = React.useState('overview')
          const [activePills, setActivePills] = React.useState('overview')
          const [activeUnderline, setActiveUnderline] = React.useState('overview')

          const tabs = [
            { id: 'overview', label: 'Overview' },
            { id: 'details', label: 'Details' },
            { id: 'settings', label: 'Settings' }
          ]

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Default Variant</p>
                <TabBar 
                  tabs={tabs}
                  activeTab={activeDefault}
                  onTabChange={setActiveDefault}
                  variant="default"
                />
              </div>
              
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Pills Variant</p>
                <TabBar 
                  tabs={tabs}
                  activeTab={activePills}
                  onTabChange={setActivePills}
                  variant="pills"
                />
              </div>
              
              <div>
                <p style={{ marginBottom: '12px', fontSize: '14px', color: '#666' }}>Underline Variant</p>
                <TabBar 
                  tabs={tabs}
                  activeTab={activeUnderline}
                  onTabChange={setActiveUnderline}
                  variant="underline"
                />
              </div>
            </div>
          )
        }
        return <TabVariantsExample />
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
    variant="pills"
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
              variant="pills"
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
      variant="underline"
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
                variant="underline"
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
      variant="pills"
    />
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px',
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
                variant="pills"
              />
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px',
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
      'All color variants maintain WCAG 2.2 AA contrast ratios',
      'No accessibility violations detected by jest-axe across all variants and states'
    ],
    keyboardNavigation: 'Tab key focuses the tab group (enters first or currently active tab). ArrowLeft moves to previous tab, ArrowRight moves to next tab (both wrap around ends). Home jumps to first tab, End jumps to last tab. All navigation automatically skips disabled tabs. Click or tap to activate focused tab.',
    screenReader: 'Screen readers announce "Tab navigation, tablist" for the container. Each tab is announced as "tab" with its label and selection state. Active tabs: "{label}, tab, selected". Inactive tabs: "{label}, tab, not selected". Disabled tabs: "{label}, tab, disabled". Badge counts announced as "{number} items".'
  },

  anatomy: {
    description: 'A horizontal tablist container with multiple tab buttons. Each tab can display a label and optional badge. Visual style varies by variant prop.',
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
          'semantic.color.background.default',
          'semantic.color.border.default'
        ]
      },
      {
        name: 'Tab Button',
        description: 'Individual tab element with role="tab". Changes appearance based on active state, disabled state, and variant. Includes aria-selected and aria-disabled attributes.',
        tokens: [
          'semantic.color.background.interactive',
          'semantic.color.background.interactive-subtle',
          'semantic.color.text.default',
          'semantic.color.text.emphasis',
          'semantic.typography.body2',
          'base.spacing.2',
          'base.spacing.4'
        ]
      },
      {
        name: 'Badge',
        description: 'Optional circular badge displaying notification or item count. Positioned inline after tab label. Shows "99+" for values over 99. Has aria-label for accessibility.',
        tokens: [
          'semantic.color.background.interactive',
          'semantic.color.text.inverse',
          'base.border.radius.circle',
          'semantic.typography.caption'
        ]
      },
      {
        name: 'Active Indicator',
        description: 'Visual indicator showing selected tab. Varies by variant: solid background (default/pills) or bottom border (underline). Animates smoothly on tab change.',
        tokens: [
          'semantic.color.border.emphasis',
          'semantic.motion.interactive'
        ]
      }
    ]
  }
}
