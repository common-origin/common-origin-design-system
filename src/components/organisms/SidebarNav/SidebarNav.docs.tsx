import { useState } from 'react'
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { SidebarNav } from './SidebarNav'
import { SidebarNavItem } from '../../molecules/SidebarNavItem'
import { SidebarNavSection } from '../../molecules/SidebarNavSection'
import { WorkspaceSwitcher } from '../../molecules/WorkspaceSwitcher'
import { MenuItem } from '../../molecules/Menu'
import { Sheet } from '../../molecules/Sheet'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Icon } from '../../atoms/Icon'

const workspaces = [
  { id: 'ops', name: 'Creamery Ops', description: 'Pro plan' },
  { id: 'lab', name: 'Flavour Lab', description: 'Free plan' },
]

function Body() {
  return (
    <>
      <SidebarNavItem label="New chat" icon="edit" onClick={() => {}} />
      <SidebarNavItem label="Home" icon="home" url="#home" current />
      <SidebarNavItem label="Invite users" icon="userBox" url="#invite" meta="3/10" />
      <SidebarNavSection
        label="Chats"
        collapsible
        action={<IconButton variant="naked" size="small" iconName="search" aria-label="Search chats" />}
      >
        <SidebarNavItem label="Supplier records" url="#chat-1" />
        <SidebarNavItem label="Urgent to-dos this morning" url="#chat-2" />
        <SidebarNavItem label="Flavour page ticket" url="#chat-3" />
        <SidebarNavItem label="Workload summary" url="#chat-4" />
      </SidebarNavSection>
    </>
  )
}

function Switcher() {
  const [value, setValue] = useState('ops')
  return (
    <WorkspaceSwitcher workspaces={workspaces} value={value} onChange={setValue}>
      <MenuItem icon={<Icon name="add" size="sm" />}>Create workspace</MenuItem>
    </WorkspaceSwitcher>
  )
}

const frame = { height: 440, display: 'flex' }

function InASheet() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" iconName="menu" onClick={() => setOpen(true)}>
        Menu
      </Button>
      <Sheet isOpen={open} onClose={() => setOpen(false)} position="left" title="Navigation">
        <SidebarNav label="Main" collapsible={false} header={<Switcher />}>
          <Body />
        </SidebarNav>
      </Sheet>
    </>
  )
}

export const sidebarNavDocs: ComponentDocumentation = {
  id: 'sidebar-nav',
  name: 'SidebarNav',
  description:
    'A product\'s sidebar navigation: a header (such as a WorkspaceSwitcher), a scrolling body of SidebarNavItems and SidebarNavSections, and a footer. It collapses to an icon rail, and one highlight glides to the row under the pointer or keyboard focus. Row heights follow density on the region around it; the width is a prop. On small screens, place it in a Sheet.',
  category: 'Navigation',
  tier: 'Organism',

  props: [
    { name: 'label', type: 'string', required: true, description: 'Names the navigation landmark, such as "Main"' },
    { name: 'children', type: 'ReactNode', required: true, description: 'SidebarNavItems and SidebarNavSections, in order. Consecutive items form one list. The body scrolls when it\'s too tall.' },
    { name: 'header', type: 'ReactNode', required: false, description: 'Content above the body, such as a WorkspaceSwitcher. The collapse toggle sits beside it.' },
    { name: 'footer', type: 'ReactNode', required: false, description: 'Content below the body, such as an upgrade prompt. Hidden in the rail.' },
    { name: 'width', type: "'narrow' | 'default' | 'wide'", required: false, default: "'default'", description: 'The expanded width: 224, 256 or 300px. Collapsed, it\'s always the 56px rail.' },
    { name: 'collapsed', type: 'boolean', required: false, description: 'Whether it\'s the icon rail (controlled). Use with onCollapsedChange.' },
    { name: 'defaultCollapsed', type: 'boolean', required: false, default: 'false', description: 'Whether it starts as the rail (uncontrolled). Saving the state between visits is the product\'s job.' },
    { name: 'onCollapsedChange', type: '(collapsed: boolean) => void', required: false, description: 'Called when the toggle collapses or expands it' },
    { name: 'collapsible', type: 'boolean', required: false, default: 'true', description: 'Whether it has a collapse toggle. Turn it off where it can\'t collapse, such as inside a Sheet.' },
    { name: 'linkComponent', type: 'ComponentType', required: false, description: 'A router\'s link component, such as Next\'s Link, used by every item for internal URLs' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the nav' },
  ],

  tokens: [
    'component.sidebarNav.width.rail',
    'component.sidebarNav.width.narrow',
    'component.sidebarNav.width.default',
    'component.sidebarNav.width.wide',
    'semantic.color.fill.muted',
    'semantic.radius.md',
    'semantic.space.100',
    'semantic.space.200',
    'semantic.motion.duration.fast',
    'semantic.motion.duration.moderate',
    'semantic.motion.easing.decelerate',
    'semantic.motion.easing.accelerate',
  ],

  examples: [
    {
      name: 'Sidebar',
      description: 'A workspace switcher, top-level items and a collapsible section of chats. Hover the rows to see the highlight glide; the toggle collapses it to the rail.',
      code: `<SidebarNav label="Main" header={<WorkspaceSwitcher … />} linkComponent={Link}>
  <SidebarNavItem label="New chat" icon="edit" onClick={startChat} />
  <SidebarNavItem label="Home" icon="home" url="/" current />
  <SidebarNavItem label="Invite users" icon="userBox" url="/invite" meta="3/10" />
  <SidebarNavSection label="Chats" collapsible action={<IconButton … aria-label="Search chats" />}>
    <SidebarNavItem label="Supplier records" url="/chats/1" />
    …
  </SidebarNavSection>
</SidebarNav>`,
      renderComponent: () => (
        <div style={frame}>
          <SidebarNav label="Example" header={<Switcher />} footer={<Button variant="secondary" size="small" style={{ width: '100%' }}>Upgrade</Button>}>
            <Body />
          </SidebarNav>
        </div>
      ),
    },
    {
      name: 'Dense',
      description: 'Density is set on the region around it, never on the nav: rows are 24px in compact',
      code: `<div data-co-density="compact">
  <SidebarNav label="Main">…</SidebarNav>
</div>`,
      renderComponent: () => (
        <div style={frame} data-co-density="compact">
          <SidebarNav label="Dense example" width="narrow" header={<Switcher />}>
            <Body />
          </SidebarNav>
        </div>
      ),
    },
    {
      name: 'On small screens',
      description: 'There\'s no breakpoint logic: place it in a Sheet, expanded and without the toggle',
      code: `<Sheet isOpen={open} onClose={close} position="left" title="Navigation">
  <SidebarNav label="Main" collapsible={false}>…</SidebarNav>
</Sheet>`,
      renderComponent: () => <InASheet />,
    },
  ],

  accessibility: {
    notes: [
      'A nav landmark named by label; items are lists of links and buttons, sections are lists named by their labels',
      'The current page has aria-current="page"',
      'The toggle is named for what it will do ("Collapse sidebar", "Expand sidebar"), with aria-expanded',
      'In the rail every item is named by its label and shows it in a Tooltip; items without an icon are hidden',
      'The highlight is decorative (aria-hidden) and follows keyboard focus as well as the pointer; it\'s hidden in forced colours, where rows outline themselves',
      'Rows are at least 24px tall in every density (decision 0051)',
    ],
    keyboardNavigation: 'Tab moves through the header, items, section toggles and actions, and the footer in order',
    focusManagement: 'Collapsing or expanding keeps focus on the toggle',
  },

  anatomy: {
    description: 'A nav column: header, scrolling body, footer.',
    parts: [
      { name: 'Header', description: 'Product content such as a WorkspaceSwitcher, and the collapse toggle beside it. In the rail an expand toggle takes the content\'s place; the two cross-fade, so nothing moves' },
      { name: 'Body', description: 'Items and sections; scrolls when too tall' },
      { name: 'Highlight', description: 'One shape in the row hover colour that glides to the hovered or focused row over duration.fast, stepping aside for the current page (0053)', tokens: ['semantic.color.fill.muted', 'semantic.motion.duration.fast'] },
      { name: 'Footer', description: 'Optional content below the body, hidden in the rail' },
      { name: 'Surface', description: 'The page background, with no edge or fill of its own (P1). Collapsing animates the width over duration.moderate, decelerating, while labels fade and icons stay put', tokens: ['component.sidebarNav.width.default', 'component.sidebarNav.width.rail'] },
    ],
  },
}
