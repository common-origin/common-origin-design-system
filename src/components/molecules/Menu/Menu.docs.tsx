import { useState } from 'react'
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Menu, MenuDivider, MenuGroup, MenuItem, MenuItemCheckbox, MenuItemRadio } from './Menu'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { Icon } from '../../atoms/Icon'
import { Avatar } from '../../atoms/Avatar'

function ViewMenu() {
  const [sort, setSort] = useState('recent')
  const [archived, setArchived] = useState(false)
  return (
    <Menu trigger={<Button variant="secondary">View</Button>}>
      <MenuGroup label="Sort by">
        <MenuItemRadio checked={sort === 'recent'} onSelect={() => setSort('recent')}>
          Most recent
        </MenuItemRadio>
        <MenuItemRadio checked={sort === 'name'} onSelect={() => setSort('name')}>
          Name
        </MenuItemRadio>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup>
        <MenuItemCheckbox checked={archived} onCheckedChange={setArchived}>
          Show archived
        </MenuItemCheckbox>
      </MenuGroup>
    </Menu>
  )
}

function WorkspaceMenu() {
  const [current, setCurrent] = useState('ops')
  return (
    <Menu trigger={<Button variant="secondary">Workspace</Button>}>
      <MenuGroup label="Workspaces">
        <MenuItemRadio
          checked={current === 'ops'}
          onSelect={() => setCurrent('ops')}
          icon={<Avatar name="Creamery Ops" size="xs" />}
          description="Pro plan"
        >
          Creamery Ops
        </MenuItemRadio>
        <MenuItemRadio
          checked={current === 'lab'}
          onSelect={() => setCurrent('lab')}
          icon={<Avatar name="Flavour Lab" size="xs" />}
          description="Free plan"
        >
          Flavour Lab
        </MenuItemRadio>
      </MenuGroup>
      <MenuDivider />
      <MenuItem icon={<Icon name="add" size="sm" />}>Create workspace</MenuItem>
    </Menu>
  )
}

export const menuDocs: ComponentDocumentation = {
  id: 'menu',
  name: 'Menu',
  description:
    'A menu of actions and choices that opens from a button, following the WAI-ARIA menu button pattern. Items are actions, one-of-a-set choices (radio) or on/off options (checkbox), grouped and separated. It renders in the browser\'s top layer, so no scrolling container clips it. For choosing a form value, use Dropdown.',
  category: 'Molecules',

  props: [
    { name: 'trigger', type: 'ReactElement', required: true, description: 'The element that opens the menu, such as a Button or IconButton. It gets aria-haspopup, aria-expanded and aria-controls, and names the menu. It can be wrapped in a Tooltip.' },
    { name: 'children', type: 'ReactNode', required: true, description: 'MenuItem, MenuItemRadio, MenuItemCheckbox, MenuGroup and MenuDivider' },
    { name: 'open', type: 'boolean', required: false, description: 'Whether the menu is open (controlled). Use with onOpenChange.' },
    { name: 'defaultOpen', type: 'boolean', required: false, default: 'false', description: 'Whether the menu starts open (uncontrolled)' },
    { name: 'onOpenChange', type: '(open: boolean) => void', required: false, description: 'Called when the menu opens or closes' },
    { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", required: false, default: "'bottom'", description: 'The side of the trigger it opens on. It flips when there is no room.' },
    { name: 'align', type: "'start' | 'center' | 'end'", required: false, default: "'start'", description: 'Where it lines up along the trigger\'s edge' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the menu' },
    { name: 'MenuItem', type: 'component', required: false, description: 'An action: children (label), icon, description, shortcut ({ label, keys }), disabled, destructive, onSelect. Activating it closes the menu.' },
    { name: 'MenuItemRadio', type: 'component', required: false, description: 'One choice of a set, inside a MenuGroup: checked, onSelect, plus the item props. Choosing it closes the menu.' },
    { name: 'MenuItemCheckbox', type: 'component', required: false, description: 'An on/off option, inside a MenuGroup: checked, onCheckedChange, plus the item props. Toggling it keeps the menu open.' },
    { name: 'MenuGroup', type: 'component', required: false, description: 'Groups items. An optional visible label also names the group. Radio and checkbox items always sit in a group.' },
    { name: 'MenuDivider', type: 'component', required: false, description: 'Separates groups' },
  ],

  tokens: [
    'semantic.surface.raised',
    'semantic.border.default',
    'semantic.radius.md',
    'semantic.elevation.floating',
    'semantic.size.menu.maxHeight',
    'semantic.size.4500',
    'semantic.size.7500',
    'semantic.size.row.sm',
    'semantic.space.100',
    'semantic.space.200',
    'semantic.space.inset.xs',
    'semantic.space.inset.md',
    'semantic.typography.small',
    'semantic.typography.caption',
    'semantic.color.text.default',
    'semantic.color.text.muted',
    'semantic.color.text.danger',
    'semantic.color.text.disabled',
    'semantic.border.focus',
    'semantic.border.focusOffset',
    'semantic.motion.duration.fast',
    'semantic.motion.easing.decelerate',
    'semantic.motion.distance.sm',
  ],

  examples: [
    {
      name: 'Actions',
      description: 'Icons, a shortcut, a disabled item and a destructive action',
      code: `<Menu trigger={<IconButton variant="naked" iconName="meatballs" aria-label="More" />}>
  <MenuItem icon={<Icon name="edit" size="sm" />} shortcut={{ label: '⌘R', keys: 'Meta+R' }}>Rename</MenuItem>
  <MenuItem icon={<Icon name="copy" size="sm" />} disabled>Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem icon={<Icon name="trash" size="sm" />} destructive>Delete</MenuItem>
</Menu>`,
      renderComponent: () => (
        <Menu trigger={<IconButton variant="naked" iconName="meatballs" aria-label="More" />}>
          <MenuItem icon={<Icon name="edit" size="sm" />} shortcut={{ label: '⌘R', keys: 'Meta+R' }}>
            Rename
          </MenuItem>
          <MenuItem icon={<Icon name="copy" size="sm" />} disabled>
            Duplicate
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<Icon name="trash" size="sm" />} destructive>
            Delete
          </MenuItem>
        </Menu>
      ),
    },
    {
      name: 'Choices',
      description: 'Radio items choose one of a set and close the menu; checkbox items toggle and keep it open',
      code: `<Menu trigger={<Button variant="secondary">View</Button>}>
  <MenuGroup label="Sort by">
    <MenuItemRadio checked={sort === 'recent'} onSelect={() => setSort('recent')}>Most recent</MenuItemRadio>
    <MenuItemRadio checked={sort === 'name'} onSelect={() => setSort('name')}>Name</MenuItemRadio>
  </MenuGroup>
  <MenuDivider />
  <MenuGroup>
    <MenuItemCheckbox checked={archived} onCheckedChange={setArchived}>Show archived</MenuItemCheckbox>
  </MenuGroup>
</Menu>`,
      renderComponent: () => <ViewMenu />,
    },
    {
      name: 'Avatars and descriptions',
      description: 'A leading Avatar and secondary text, as WorkspaceSwitcher uses',
      code: `<Menu trigger={<Button variant="secondary">Workspace</Button>}>
  <MenuGroup label="Workspaces">
    <MenuItemRadio checked icon={<Avatar name="Creamery Ops" size="xs" />} description="Pro plan">Creamery Ops</MenuItemRadio>
    <MenuItemRadio checked={false} icon={<Avatar name="Flavour Lab" size="xs" />} description="Free plan">Flavour Lab</MenuItemRadio>
  </MenuGroup>
  <MenuDivider />
  <MenuItem icon={<Icon name="add" size="sm" />}>Create workspace</MenuItem>
</Menu>`,
      renderComponent: () => <WorkspaceMenu />,
    },
  ],

  accessibility: {
    notes: [
      'Follows the WAI-ARIA menu button pattern: the trigger has aria-haspopup="menu", aria-expanded and aria-controls, and the menu is named by its trigger',
      'Items are menuitem, menuitemradio or menuitemcheckbox; checked items have aria-checked and a checkmark, so the state is not colour alone',
      'Groups use role="group", named by their visible label; MenuDivider is a separator',
      'A disabled item stays focusable, with aria-disabled, but does nothing when activated',
      'Leading icons and avatars are decorative; a shortcut is exposed with aria-keyshortcuts and its display text is hidden from assistive technology',
      'Menu shows shortcuts but does not bind them: the product handles the keys',
    ],
    keyboardNavigation:
      'On the trigger: Enter, Space or Arrow Down open on the first item; Arrow Up opens on the last. In the menu: Arrow Down and Up move (wrapping), Home and End jump, typing jumps to a matching item, Enter and Space activate, Escape closes and returns focus to the trigger, Tab closes and moves on.',
    screenReader: 'Announced as a menu named by its trigger, with each item\'s role, label, description, checked state and shortcut',
    focusManagement: 'Opening focuses the first or last item; closing with Escape or by choosing an item returns focus to the trigger; pressing outside or Tab leaves focus where it went',
  },

  anatomy: {
    description: 'A trigger and a panel of items in the top layer.',
    parts: [
      { name: 'Trigger', description: 'Any button. Wrapped without a box of its own, so it can also carry a Tooltip' },
      {
        name: 'Panel',
        description: 'Dropdown\'s floating panel: the raised surface, a decorative outline, floating elevation and a medium radius. It drops in over duration.fast and only fades under reduced motion. Scrolls beyond size.menu.maxHeight',
        tokens: ['semantic.surface.raised', 'semantic.border.default', 'semantic.elevation.floating', 'semantic.size.menu.maxHeight'],
      },
      {
        name: 'Item',
        description: 'A dense row (size.row.sm) with the shared row states: the hover colour on hover and focus, the light-blue selected ladder when checked. An optional leading Icon or Avatar, the label, optional secondary text, an optional shortcut and a checkmark when checked',
        tokens: ['semantic.size.row.sm', 'semantic.typography.small', 'semantic.color.text.danger'],
      },
      { name: 'Group label', description: 'Caption text in the muted colour', tokens: ['semantic.typography.caption', 'semantic.color.text.muted'] },
      { name: 'Divider', description: 'A 1px rule in the decorative border colour between groups, with a small gap above and below', tokens: ['semantic.border.default', 'semantic.space.100'] },
    ],
  },
}
