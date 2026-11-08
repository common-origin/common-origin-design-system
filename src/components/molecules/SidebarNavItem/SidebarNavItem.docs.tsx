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
    { name: 'meta', type: 'string', required: false, description: 'Quiet text at the end of the row, such as "3/10". Hidden in the rail.' },
    { name: 'badge', type: "number | 'dot'", required: false, description: 'New or unread items: a count, or a dot. Shown as an accent Badge count at the end of the row, as a dot inside the icon\'s corner in the rail, and added to the item\'s name.' },
    { name: 'badgeLabel', type: 'string', required: false, default: '"{count} new", or "new" for a dot', description: 'How the badge reads in the item\'s name, such as "3 unread"' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the item\'s link or button' },
  ],

  tokens: [
    'semantic.size.row.sm',
    'semantic.space.200',
    'semantic.space.inset.xs',
    'semantic.space.inset.sm',
    'semantic.radius.md',
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
  <SidebarNavItem label="Chats" icon="message" url="/chats" badge={3} badgeLabel="3 unread" />
  <SidebarNavItem label="Invite users" icon="userBox" url="/invite" meta="3/10" />
</ul>`,
      renderComponent: () => (
        <ul style={list}>
          <SidebarNavItem label="New chat" icon="edit" onClick={() => {}} />
          <SidebarNavItem label="Home" icon="home" url="#home" current />
          <SidebarNavItem label="Chats" icon="message" url="#chats" badge={3} badgeLabel="3 unread" />
          <SidebarNavItem label="Invite users" icon="userBox" url="#invite" meta="3/10" />
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
      description: 'Inside a collapsed SidebarNav, items show their icon only, with any badge as a dot inside it, with the label in a Tooltip. Items without an icon are hidden. The same items as above; SidebarNav sets the rail.',
      code: `<SidebarNavItem label="Home" icon="home" url="/" current />
<SidebarNavItem label="Chats" icon="message" url="/chats" badge={3} badgeLabel="3 unread" />`,
      renderComponent: () => (
        <SidebarNavContext.Provider value={{ collapsed: true, glide: false }}>
          <ul style={{ ...list, maxWidth: 56 }}>
            <SidebarNavItem label="Home" icon="home" url="#home" current />
            <SidebarNavItem label="Chats" icon="message" url="#chats" badge={3} badgeLabel="3 unread" />
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
      'An item with a badge is named with it, such as "Chats, 3 unread", in both layouts',
      'aria-current="page" marks only links: a button item is never the current page',
      'Long labels truncate visually; the full label is always the accessible name',
      'At least 24px tall in every density (decision 0051)',
    ],
    keyboardNavigation: 'Tab moves between items; Enter follows a link or activates a button',
    focusManagement: 'The system focus ring, drawn inside the row so a scrolling list does not clip it',
  },

  anatomy: {
    description: 'A dense row: icon, label, trailing content.',
    parts: [
      { name: 'Row', description: 'A link or button with the shared row states (0030). Inside SidebarNav its hover is the gliding highlight (0053)', tokens: ['semantic.size.row.sm', 'semantic.radius.md'] },
      { name: 'Icon', description: 'Optional, decorative, in the text colour' },
      { name: 'Label', description: 'Small text, truncated to one line', tokens: ['semantic.typography.small'] },
      { name: 'Badge', description: 'An accent Badge count at the end of the row for new or unread items; in the rail, a dot inside the icon\'s top-right corner, clear of the rows around it' },
      { name: 'Meta', description: 'Quiet text at the end, hidden in the rail', tokens: ['semantic.typography.caption', 'semantic.color.text.muted'] },
    ],
  },
}
