import type { ComponentDocumentation } from '@/lib/docgen/types'
import { SidebarNavSection } from './SidebarNavSection'
import { SidebarNavItem } from '../SidebarNavItem'
import { IconButton } from '../../atoms/IconButton'

const frame = { width: '100%', maxWidth: 224 }

export const sidebarNavSectionDocs: ComponentDocumentation = {
  id: 'sidebar-nav-section',
  name: 'SidebarNavSection',
  description:
    'A labelled group of SidebarNavItems in a SidebarNav, such as a list of chats. Its label can be a disclosure that shows and hides the items, and it can carry one action, such as "New chat" or "Search". In the rail its label and action are hidden and a rule separates it from the section above.',
  category: 'Molecules',

  props: [
    { name: 'label', type: 'string', required: true, description: 'The section\'s visible label, which also names its list' },
    { name: 'children', type: 'ReactNode', required: true, description: 'The section\'s SidebarNavItems' },
    { name: 'collapsible', type: 'boolean', required: false, default: 'false', description: 'Whether the label is a disclosure button that shows and hides the items' },
    { name: 'expanded', type: 'boolean', required: false, description: 'Whether the items are shown (controlled). Use with onExpandedChange.' },
    { name: 'defaultExpanded', type: 'boolean', required: false, default: 'true', description: 'Whether the items start shown (uncontrolled)' },
    { name: 'onExpandedChange', type: '(expanded: boolean) => void', required: false, description: 'Called when a collapsible section is shown or hidden' },
    { name: 'action', type: 'ReactElement', required: false, description: 'One action for the section, such as a small naked IconButton. Hidden in the rail.' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the section' },
  ],

  tokens: [
    'semantic.typography.caption',
    'semantic.color.text.muted',
    'semantic.size.row.sm',
    'semantic.space.100',
    'semantic.space.inset.sm',
    'semantic.radius.sm',
    'semantic.border.default',
    'semantic.border.focus',
    'semantic.border.focusOffset',
    'semantic.motion.duration.fast',
    'semantic.motion.duration.moderate',
    'semantic.motion.easing.standard',
    'semantic.motion.easing.decelerate',
  ],

  examples: [
    {
      name: 'Collapsible, with an action',
      description: 'The label shows and hides the chats; the action starts a new one',
      code: `<SidebarNavSection
  label="Chats"
  collapsible
  action={<IconButton variant="naked" size="small" iconName="add" aria-label="New chat" />}
>
  <SidebarNavItem label="Supplier records" url="/chats/1" />
  <SidebarNavItem label="Urgent to-dos this morning" url="/chats/2" current />
  <SidebarNavItem label="Flavour page ticket" url="/chats/3" />
</SidebarNavSection>`,
      renderComponent: () => (
        <div style={frame}>
          <SidebarNavSection
            label="Chats"
            collapsible
            action={<IconButton variant="naked" size="small" iconName="add" aria-label="New chat" />}
          >
            <SidebarNavItem label="Supplier records" url="#chat-1" />
            <SidebarNavItem label="Urgent to-dos this morning" url="#chat-2" current />
            <SidebarNavItem label="Flavour page ticket" url="#chat-3" />
          </SidebarNavSection>
        </div>
      ),
    },
    {
      name: 'Static',
      description: 'A plain label groups items that are always shown',
      code: `<SidebarNavSection label="Workspace">
  <SidebarNavItem label="Members" icon="userBox" url="/members" />
  <SidebarNavItem label="Billing" icon="creditCard" url="/billing" />
</SidebarNavSection>`,
      renderComponent: () => (
        <div style={frame}>
          <SidebarNavSection label="Workspace">
            <SidebarNavItem label="Members" icon="userBox" url="#members" />
            <SidebarNavItem label="Billing" icon="creditCard" url="#billing" />
          </SidebarNavSection>
        </div>
      ),
    },
  ],

  accessibility: {
    notes: [
      'The items are a list named by the section\'s label, which stays as a visually hidden name in the rail',
      'A collapsible label is a button with aria-expanded and aria-controls; hidden items leave the keyboard and screen readers once the collapse finishes',
      'The caret is decorative; the button\'s name is the label',
      'The label is not a heading, so sections don\'t add noise to a page\'s heading outline',
    ],
    keyboardNavigation: 'Tab reaches the disclosure button and the action; Enter or Space shows and hides the items',
    focusManagement: 'Hiding the items doesn\'t move focus, which stays on the disclosure button',
  },

  anatomy: {
    description: 'A header (label and action) above a list of items.',
    parts: [
      { name: 'Label', description: 'Quiet caption text, or a disclosure button with a caret that turns to point right when hidden', tokens: ['semantic.typography.caption', 'semantic.color.text.muted'] },
      { name: 'Action', description: 'One optional control, such as a small naked IconButton' },
      { name: 'List', description: 'The items. Its height animates over duration.moderate (standard easing) when shown or hidden, and changes at once under reduced motion', tokens: ['semantic.motion.duration.moderate', 'semantic.motion.easing.standard'] },
      { name: 'Rule', description: 'In the rail, a decorative rule above the section in place of its label', tokens: ['semantic.border.default'] },
    ],
  },
}
