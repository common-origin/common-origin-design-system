import { useState } from 'react'
import type { ComponentDocumentation } from '@/lib/docgen/types'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'
import { MenuItem } from '../Menu'
import { Icon } from '../../atoms/Icon'

const workspaces = [
  { id: 'ops', name: 'Creamery Ops', description: 'Pro plan' },
  { id: 'lab', name: 'Flavour Lab', description: 'Free plan' },
]

function Example() {
  const [value, setValue] = useState('ops')
  return (
    <div style={{ width: '100%', maxWidth: 224 }}>
      <WorkspaceSwitcher workspaces={workspaces} value={value} onChange={setValue}>
        <MenuItem icon={<Icon name="add" size="sm" />}>Create workspace</MenuItem>
      </WorkspaceSwitcher>
    </div>
  )
}

export const workspaceSwitcherDocs: ComponentDocumentation = {
  id: 'workspace-switcher',
  name: 'WorkspaceSwitcher',
  description:
    'Shows the current workspace and switches between workspaces, from a SidebarNav header. Built on Menu: a labelled group of the workspaces as radio items, then any actions. In the rail it shows the Avatar only, with the name in a Tooltip.',
  category: 'Molecules',
  props: [
    { name: 'workspaces', type: '{ id, name, picture?, description? }[]', required: true, description: 'The workspaces to choose from' },
    { name: 'value', type: 'string', required: true, description: "The current workspace's id" },
    { name: 'onChange', type: '(id: string) => void', required: true, description: "Called with a workspace's id when it's chosen" },
    { name: 'label', type: 'string', required: false, default: "'Workspaces'", description: 'The label of the workspaces group in the menu' },
    { name: 'children', type: 'ReactNode', required: false, description: 'Actions after the workspaces, such as a MenuItem for "Create workspace"' },
    { name: 'data-testid', type: 'string', required: false, description: 'Test identifier for the trigger' },
  ],
  tokens: [
    'semantic.size.row.sm',
    'semantic.space.200',
    'semantic.space.inset.xs',
    'semantic.space.inset.sm',
    'semantic.radius.md',
    'semantic.typography.label',
    'semantic.color.text.default',
    'semantic.color.text.muted',
    'semantic.border.focus',
    'semantic.border.focusOffset',
  ],
  examples: [
    {
      name: 'Switch workspaces',
      description: 'The current workspace, a menu of the others, and an action',
      code: `<WorkspaceSwitcher workspaces={workspaces} value={value} onChange={setValue}>
  <MenuItem icon={<Icon name="add" size="sm" />}>Create workspace</MenuItem>
</WorkspaceSwitcher>`,
      renderComponent: () => <Example />,
    },
  ],
  accessibility: {
    notes: [
      "A menu button: the trigger's name is the current workspace's name, and its Avatar is hidden from assistive technology",
      'The workspaces are a labelled group of radio items, the current one checked',
      "In the rail the trigger shows the Avatar only; the name becomes its aria-label and shows in a Tooltip",
    ],
    keyboardNavigation: "Menu's keyboard support: Enter, Space or Arrow Down open it; arrows, typeahead and Escape inside",
  },
}
