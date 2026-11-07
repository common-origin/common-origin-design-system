import type { ComponentDocumentation } from '@/lib/docgen/types'
import { SidebarNavItem } from './SidebarNavItem'
import { SidebarNavContext } from './SidebarNavContext'

const list = { listStyle: 'none', margin: 0, padding: 0, width: '100%', maxWidth: 224 }

export const sidebarNavItemDocs: ComponentDocumentation = {
  id: 'sidebar-nav-item',
  name: 'SidebarNavItem',
  description:
    'One row of a SidebarNav: a link to a page, or a button for an action such as "New chat". It shows an optional icon, the label (truncated to one line) and optional trailing content, and marks the current page. In a collapsed SidebarNav it shows its icon only, with the label as its name and in a Tooltip.',
  category: 'Molecules',

  props: [
    { name: 'label', type: 'string', required: true, description: 'The item\'s label. In the rail it becomes the accessible name and shows in a Tooltip.' },
    { name: 'icon', type: 'IconName', required: false, description: 'A leading icon. Items without one are hidden in the rail.' },
    { name: 'url', type: 'string', required: false, description: 'Where the item goes. With a url the item is a link (using SidebarNav\'s linkComponent for internal URLs); without one it\'s a button.' },
    { name: 'onClick', type: '(event) => void', required: false, description: 'Called when the item is activated. Without a url, the item is a button.' },
    { name: 'current', type: 'boolean', required: false, default: 'false', description: 'The page the user is on: aria-current="page" and the light-blue selected treatment.' },
    { name: 'trailing', type: 'ReactNode', required: false, description: 'Content at the end of the row: a Badge for new or unread items, or quiet meta text such as "3/10". A string is shown as meta text.' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the item\'s link or button' },
  ],

  tokens: [
    'semantic.size.row.sm',
    'semantic.space.200',
    'semantic.space.inset.xs',
    'semantic.space.inset.sm',
    'semantic.radius.sm',
    'semantic.typography.small',
    'semantic.typography.caption',
    'semantic.color.text.default',
    'semantic.color.text.muted',
    'semantic.border.focus',
    'semantic.border.focusOffset',
    'semantic.motion.duration.fast',
    'semantic.motion.easing.decelerate',
  ],

  examples: [
    {
      name: 'Pages and actions',
      description: 'Links to pages, the current one marked, and a button for an action. In a SidebarNav they sit in its list; here they sit in a plain list.',
      code: `<ul>
  <SidebarNavItem label="New chat" icon="edit" onClick={startChat} />
  <SidebarNavItem label="Home" icon="home" url="/" current />
  <SidebarNavItem label="Invite users" icon="userBox" url="/invite" trailing="3/10" />
</ul>`,
      renderComponent: () => (
        <ul style={list}>
          <SidebarNavItem label="New chat" icon="edit" onClick={() => {}} />
          <SidebarNavItem label="Home" icon="home" url="#home" current />
          <SidebarNavItem label="Invite users" icon="userBox" url="#invite" trailing="3/10" />
        </ul>
      ),
    },
    {
      name: 'Long labels',
      description: 'Labels truncate to one line; the full label is still the item\'s name',
      code: `<SidebarNavItem label="Urgent to-dos this morning before the supplier call" url="/chats/42" />`,
      renderComponent: () => (
        <ul style={list}>
          <SidebarNavItem label="Urgent to-dos this morning before the supplier call" url="#chat" />
        </ul>
      ),
    },
    {
      name: 'In the rail',
      description: 'In a collapsed SidebarNav, items show their icon only, with the label in a Tooltip. Items without an icon are hidden.',
      code: `<SidebarNav collapsed>…</SidebarNav>`,
      renderComponent: () => (
        <SidebarNavContext.Provider value={{ collapsed: true, glide: false }}>
          <ul style={{ ...list, maxWidth: 56 }}>
            <SidebarNavItem label="Home" icon="home" url="#home" current />
            <SidebarNavItem label="Search" icon="search" url="#search" />
          </ul>
        </SidebarNavContext.Provider>
      ),
    },
  ],

  accessibility: {
    notes: [
      'A link with a url, a button without one; renders inside an li so it sits in a list',
      'The current page has aria-current="page" and the light-blue selected treatment, not colour alone: the attribute carries it for assistive technology',
      'The icon is decorative; the label names the item. In the rail the label becomes aria-label, and a label Tooltip shows it',
      'Long labels truncate visually; the full label is always the accessible name',
      'At least 24px tall in every density (decision 0051)',
    ],
    keyboardNavigation: 'Tab moves between items; Enter follows a link or activates a button',
    focusManagement: 'The system focus ring, drawn inside the row so a scrolling list does not clip it',
  },

  anatomy: {
    description: 'A dense row: icon, label, trailing content.',
    parts: [
      { name: 'Row', description: 'A link or button with the shared row states (0030). Inside SidebarNav its hover is the gliding highlight (0053)', tokens: ['semantic.size.row.sm', 'semantic.radius.sm'] },
      { name: 'Icon', description: 'Optional, decorative, in the text colour' },
      { name: 'Label', description: 'Small text, truncated to one line', tokens: ['semantic.typography.small'] },
      { name: 'Trailing', description: 'A Badge, or quiet meta text', tokens: ['semantic.typography.caption', 'semantic.color.text.muted'] },
    ],
  },
}
