import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { List } from './List'
import { ListItem } from './ListItem'
import { Chip } from '../../atoms/Chip'
import { Icon } from '../../atoms/Icon'
import { Typography } from '../../atoms/Typography'

// Example component for expandable items
const ExpandableListExample: React.FC = () => {
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({
    recipe1: false,
    recipe2: false
  })
  
  const toggleItem = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }
  
  return (
    <List>
      <ListItem 
        primary="Classic Margherita Pizza"
        secondary="Ready in 25 minutes"
        expandable
        expanded={expanded.recipe1}
        onToggle={() => toggleItem('recipe1')}
      >
        <Typography variant="body">
          Ingredients: Pizza dough, tomato sauce, fresh mozzarella, basil, olive oil
        </Typography>
      </ListItem>
      <ListItem 
        primary="Spaghetti Carbonara"
        secondary="Ready in 20 minutes"
        expandable
        expanded={expanded.recipe2}
        onToggle={() => toggleItem('recipe2')}
      >
        <Typography variant="body">
          Ingredients: Spaghetti, eggs, parmesan, pancetta, black pepper
        </Typography>
      </ListItem>
    </List>
  )
}

// Example component for interactive selection
const InteractiveListExample: React.FC = () => {
  const [selected, setSelected] = React.useState<string>('option2')
  
  return (
    <List>
      <ListItem 
        primary="Light Mode"
        secondary="Optimized for daytime use"
        interactive
        selected={selected === 'option1'}
        onClick={() => setSelected('option1')}
      />
      <ListItem 
        primary="Dark Mode"
        secondary="Reduced eye strain in low light"
        interactive
        selected={selected === 'option2'}
        onClick={() => setSelected('option2')}
      />
      <ListItem 
        primary="Auto"
        secondary="Matches system preferences"
        interactive
        selected={selected === 'option3'}
        onClick={() => setSelected('option3')}
      />
    </List>
  )
}

export const listDocs: ComponentDocumentation = {
  id: 'list',
  name: 'List',
  description: 'A flexible list component for displaying structured content with interactive states, expandable sections, badges, and secondary information. Designed for versatile data presentation including shopping lists, recipe ingredients, settings menus, and search results. Features comprehensive accessibility support with proper ARIA attributes, keyboard navigation, and minimum 44px touch targets.',
  category: 'Molecules',
  
  props: [
    // List props
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: 'ListItem components to display in the list. Each child should be a ListItem for proper styling and semantics.'
    },
    {
      name: 'dividers',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show divider lines between list items. Defaults to true for clear visual separation.'
    },
    {
      name: 'spacing',
      type: "'compact' | 'comfortable'",
      required: false,
      default: 'comfortable',
      description: 'Accepted for API compatibility but currently has no effect: it is not passed to the items. Set spacing on each ListItem instead.'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Additional CSS class name for the list element.'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Test identifier for automated testing.'
    }
  ],
  
  tokens: [
    'component.listItem.expandedIndent.comfortable',
    'component.listItem.expandedIndent.compact',
    'semantic.size.touchTarget',
    'semantic.border.focusOffset',
    'semantic.border.width.thick',
    'semantic.color.border.interactive',
    'semantic.size.icon.lg',
    'semantic.border.width.thin',
    'semantic.spacing.layout.xs (4px)',
    'semantic.spacing.layout.sm (8px)',
    'semantic.spacing.layout.md (12px)',
    'semantic.spacing.layout.lg (16px)',
    'semantic.color.background.default',
    'semantic.color.background.subtle',
    'semantic.color.background.interactive-subtle',
    'semantic.color.background.interactive-hover',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.icon.default',
    'semantic.color.icon.subdued',
    'semantic.color.border.default',
    'semantic.border.radius.xs (2px)',
    'semantic.border.radius.sm (4px)',
    'semantic.opacity.disabled (0.5)',
    // Motion
    'semantic.motion.duration.fast',
    'semantic.motion.duration.normal',
    'semantic.motion.easing.easeOut',
  ],
  
  examples: [
    {
      name: 'Basic List',
      description: 'A simple list with primary text and default spacing',
      code: `<List>
  <ListItem primary="Apples" />
  <ListItem primary="Bananas" />
  <ListItem primary="Oranges" />
  <ListItem primary="Grapes" />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem primary="Apples" />
          <ListItem primary="Bananas" />
          <ListItem primary="Oranges" />
          <ListItem primary="Grapes" />
        </List>
      )
    },
    {
      name: 'With Secondary Text',
      description: 'List items with descriptions or metadata',
      code: `<List>
  <ListItem 
    primary="Margherita Pizza" 
    secondary="Classic tomato and mozzarella"
  />
  <ListItem 
    primary="Pepperoni" 
    secondary="Spicy pepperoni with extra cheese"
  />
  <ListItem 
    primary="Vegetarian" 
    secondary="Assorted vegetables and olives"
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            primary="Margherita Pizza" 
            secondary="Classic tomato and mozzarella"
          />
          <ListItem 
            primary="Pepperoni" 
            secondary="Spicy pepperoni with extra cheese"
          />
          <ListItem 
            primary="Vegetarian" 
            secondary="Assorted vegetables and olives"
          />
        </List>
      )
    },
    {
      name: 'Spacing Variants',
      description: 'Compact spacing for dense layouts, set on each ListItem',
      code: `<List>
  <ListItem spacing="compact" primary="Compact Item 1" secondary="Less spacing between items" />
  <ListItem spacing="compact" primary="Compact Item 2" secondary="Better for mobile layouts" />
  <ListItem spacing="compact" primary="Compact Item 3" secondary="More items visible at once" />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem spacing="compact" primary="Compact Item 1" secondary="Less spacing between items" />
          <ListItem spacing="compact" primary="Compact Item 2" secondary="Better for mobile layouts" />
          <ListItem spacing="compact" primary="Compact Item 3" secondary="More items visible at once" />
        </List>
      )
    },
    {
      name: 'Without Dividers',
      description: 'Cleaner look without border lines',
      code: `<List dividers={false}>
  <ListItem primary="Item without dividers" />
  <ListItem primary="Cleaner appearance" />
  <ListItem primary="Better for simple lists" />
</List>`,
      renderComponent: () => (
        <List dividers={false}>
          <ListItem primary="Item without dividers" />
          <ListItem primary="Cleaner appearance" />
          <ListItem primary="Better for simple lists" />
        </List>
      )
    },
    {
      name: 'With Icons',
      description: 'List items with leading icons',
      code: `<List>
  <ListItem 
    icon={<Icon name="add" iconColor="default" size="lg" />}
    primary="Add New Item"
    secondary="Create a new entry"
  />
  <ListItem 
    icon={<Icon name="caretRight" iconColor="default" size="lg" />}
    primary="Edit Settings"
    secondary="Modify preferences"
  />
  <ListItem 
    icon={<Icon name="crossCircle" iconColor="default" size="lg" />}
    primary="Delete Items"
    secondary="Remove selected entries"
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            icon={<Icon name="add" iconColor="default" size="lg" />}
            primary="Add New Item"
            secondary="Create a new entry"
          />
          <ListItem 
            icon={<Icon name="arrowRight" iconColor="default" size="lg" />}
            primary="Edit Settings"
            secondary="Modify preferences"
          />
          <ListItem 
            icon={<Icon name="crossCircle" iconColor="default" size="lg" />}
            primary="Delete Items"
            secondary="Remove selected entries"
          />
        </List>
      )
    },
    {
      name: 'With Badges',
      description: 'List items with status indicators or counts',
      code: `<List>
  <ListItem 
    primary="Inbox"
    secondary="Unread messages"
    badge={<Chip variant="emphasis" size="small">12</Chip>}
  />
  <ListItem 
    primary="Sent"
    secondary="Outgoing messages"
    badge={<Chip variant="subtle" size="small">48</Chip>}
  />
  <ListItem 
    primary="Drafts"
    secondary="Work in progress"
    badge={<Chip variant="default" size="small">3</Chip>}
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            primary="Inbox"
            secondary="Unread messages"
            badge={<Chip variant="emphasis" size="small">12</Chip>}
          />
          <ListItem 
            primary="Sent"
            secondary="Outgoing messages"
            badge={<Chip variant="subtle" size="small">48</Chip>}
          />
          <ListItem 
            primary="Drafts"
            secondary="Work in progress"
            badge={<Chip variant="default" size="small">3</Chip>}
          />
        </List>
      )
    },
    {
      name: 'Interactive Selection',
      description: 'Clickable items with selected state (stateful example)',
      code: `const [selected, setSelected] = React.useState('option2')

return (
  <List>
    <ListItem 
      primary="Light Mode"
      secondary="Optimized for daytime use"
      interactive
      selected={selected === 'option1'}
      onClick={() => setSelected('option1')}
    />
    <ListItem 
      primary="Dark Mode"
      secondary="Reduced eye strain in low light"
      interactive
      selected={selected === 'option2'}
      onClick={() => setSelected('option2')}
    />
    <ListItem 
      primary="Auto"
      secondary="Matches system preferences"
      interactive
      selected={selected === 'option3'}
      onClick={() => setSelected('option3')}
    />
  </List>
)`,
      renderComponent: () => <InteractiveListExample />
    },
    {
      name: 'Expandable Items',
      description: 'Items that expand to reveal additional content (stateful example)',
      code: `const [expanded, setExpanded] = React.useState({ recipe1: false, recipe2: false })

const toggleItem = (id: string) => {
  setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
}

return (
  <List>
    <ListItem 
      primary="Classic Margherita Pizza"
      secondary="Ready in 25 minutes"
      expandable
      expanded={expanded.recipe1}
      onToggle={() => toggleItem('recipe1')}
    >
      <Typography variant="body">
        Ingredients: Pizza dough, tomato sauce, fresh mozzarella, basil, olive oil
      </Typography>
    </ListItem>
    <ListItem 
      primary="Spaghetti Carbonara"
      secondary="Ready in 20 minutes"
      expandable
      expanded={expanded.recipe2}
      onToggle={() => toggleItem('recipe2')}
    >
      <Typography variant="body">
        Ingredients: Spaghetti, eggs, parmesan, pancetta, black pepper
      </Typography>
    </ListItem>
  </List>
)`,
      renderComponent: () => <ExpandableListExample />
    },
    {
      name: 'Shopping List Example',
      description: 'Complete shopping list with icons, badges, and interactive states',
      code: `<List>
  <ListItem 
    icon={<Icon name="add" iconColor="success" size="lg" />}
    primary="Milk"
    secondary="2% organic"
    badge={<Chip variant="default" size="small">$4.99</Chip>}
    interactive
    onClick={() => console.log('Toggle milk')}
  />
  <ListItem 
    icon={<Icon name="add" iconColor="success" size="lg" />}
    primary="Bread"
    secondary="Whole wheat"
    badge={<Chip variant="default" size="small">$3.49</Chip>}
    interactive
    onClick={() => console.log('Toggle bread')}
  />
  <ListItem 
    icon={<Icon name="crossCircle" iconColor="subdued" size="lg" />}
    primary="Eggs"
    secondary="Free range, dozen"
    badge={<Chip variant="subtle" size="small">$6.99</Chip>}
    interactive
    onClick={() => console.log('Toggle eggs')}
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            icon={<Icon name="add" iconColor="success" size="lg" />}
            primary="Milk"
            secondary="2% organic"
            badge={<Chip variant="default" size="small">$4.99</Chip>}
            interactive
            onClick={() => console.log('Toggle milk')}
          />
          <ListItem 
            icon={<Icon name="add" iconColor="success" size="lg" />}
            primary="Bread"
            secondary="Whole wheat"
            badge={<Chip variant="default" size="small">$3.49</Chip>}
            interactive
            onClick={() => console.log('Toggle bread')}
          />
          <ListItem 
            icon={<Icon name="crossCircle" iconColor="subdued" size="lg" />}
            primary="Eggs"
            secondary="Free range, dozen"
            badge={<Chip variant="subtle" size="small">$6.99</Chip>}
            interactive
            onClick={() => console.log('Toggle eggs')}
          />
        </List>
      )
    },
    {
      name: 'Disabled State',
      description: 'Disabled items maintain context but prevent interaction',
      code: `<List>
  <ListItem 
    primary="Available Option"
    secondary="This item is clickable"
    interactive
    onClick={() => console.log('Clicked')}
  />
  <ListItem 
    primary="Unavailable Option"
    secondary="This item is currently disabled"
    interactive
    onClick={() => console.log('Will not fire')}
    disabled
  />
  <ListItem 
    primary="Another Available Option"
    secondary="This item is clickable"
    interactive
    onClick={() => console.log('Clicked')}
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            primary="Available Option"
            secondary="This item is clickable"
            interactive
            onClick={() => console.log('Clicked')}
          />
          <ListItem 
            primary="Unavailable Option"
            secondary="This item is currently disabled"
            interactive
            onClick={() => console.log('Will not fire')}
            disabled
          />
          <ListItem 
            primary="Another Available Option"
            secondary="This item is clickable"
            interactive
            onClick={() => console.log('Clicked')}
          />
        </List>
      )
    },
    {
      name: 'Destructive Actions',
      description: 'Items styled as destructive/danger actions (used in ActionSheet)',
      code: `<List>
  <ListItem 
    icon={<Icon name="edit" iconColor="default" size="md" />}
    primary="Edit Item"
    interactive
    onClick={() => console.log('Edit')}
  />
  <ListItem 
    icon={<Icon name="trash" iconColor="error" size="md" />}
    primary="Delete Item"
    interactive
    onClick={() => console.log('Delete')}
    destructive
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem 
            icon={<Icon name="edit" iconColor="default" size="md" />}
            primary="Edit Item"
            interactive
            onClick={() => console.log('Edit')}
          />
          <ListItem 
            icon={<Icon name="trash" iconColor="error" size="md" />}
            primary="Delete Item"
            interactive
            onClick={() => console.log('Delete')}
            destructive
          />
        </List>
      )
    },
    {
      name: 'Combobox Pattern',
      description: 'ListItem can be used for autocomplete/combobox with role="option"',
      code: `const ComboboxExample = () => {
  const [selected, setSelected] = React.useState(1)
  const options = [
    { id: 1, label: 'Apple', description: 'Fresh fruit' },
    { id: 2, label: 'Banana', description: 'Rich in potassium' },
    { id: 3, label: 'Orange', description: 'Vitamin C' }
  ]
  
  return (
    <div style={{ position: 'relative' }}>
      <ul role="listbox" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {options.map((opt) => (
          <ListItem
            key={opt.id}
            id={\`option-\${opt.id}\`}
            role="option"
            aria-selected={selected === opt.id}
            primary={opt.label}
            secondary={opt.description}
            interactive
            selected={selected === opt.id}
            spacing="compact"
            onClick={() => setSelected(opt.id)}
          />
        ))}
      </ul>
    </div>
  )
}`,
      renderComponent: () => {
        const ComboboxExample = () => {
          const [selected, setSelected] = React.useState(1)
          const options = [
            { id: 1, label: 'Apple', description: 'Fresh fruit' },
            { id: 2, label: 'Banana', description: 'Rich in potassium' },
            { id: 3, label: 'Orange', description: 'Vitamin C' }
          ]
          
          return (
            <div style={{ position: 'relative' }}>
              <ul role="listbox" style={{ listStyle: 'none', padding: 0, margin: 0, border: '1px solid #dee2e6', borderRadius: '4px' }}>
                {options.map((opt) => (
                  <ListItem
                    key={opt.id}
                    id={`option-${opt.id}`}
                    role="option"
                    aria-selected={selected === opt.id}
                    primary={opt.label}
                    secondary={opt.description}
                    interactive
                    selected={selected === opt.id}
                    spacing="compact"
                    onClick={() => setSelected(opt.id)}
                  />
                ))}
              </ul>
            </div>
          )
        }
        return <ComboboxExample />
      }
    }
  ],
  
  accessibility: {
    notes: [
      'Renders a ul with role="list"; each ListItem renders role="listitem"',
      'Dividers are visual only and are not announced',
      'Item-level behaviour (interactive, expandable, selected, disabled, combobox options, keyboard support) is documented on the ListItem page'
    ],
    screenReader: 'Screen readers announce a list and its number of items. See ListItem for how individual items are announced.',
  },
  
  anatomy: {
    description: 'List items consist of an optional leading icon (24x24px), text content area with primary and optional secondary text, optional trailing badge, and a decorative chevron for expandable items. Expanded content is indented and highlighted with a subtle background.',
    diagram: `
┌────────────────────────────────────────────────────────────┐
│ List (role="list")                                         │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ ListItem (role="listitem")                             │ │
│ │ ┌────┐  ┌───────────────────────┐  ┌──────────┐  ┌─┐ │ │
│ │ │Icon│  │ Primary Text          │  │  Badge   │  │▼│ │ │
│ │ │24x │  │ Secondary Text        │  │ (Chip)   │  └─┘ │ │
│ │ │24px│  └───────────────────────┘  └──────────┘      │ │
│ │ └────┘        Text Content          Right Content     │ │
│ │                                                        │ │
│ │ ┌────────────────────────────────────────────────┐    │ │
│ │ │ Expanded Content (indented, subtle bg)         │    │ │
│ │ │ - Animated with max-height transition          │    │ │
│ │ │ - Only visible when expanded={true}            │    │ │
│ │ └────────────────────────────────────────────────┘    │ │
│ └────────────────────────────────────────────────────────┘ │
│                      ▲ Divider (optional)                  │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ ListItem (role="listitem")                             │ │
│ │ ...                                                    │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
`,
    parts: [
      {
        name: 'ListItem',
        description: 'Each row. Its icon, text, badge, chevron and expanded content are described on the ListItem page.'
      },
      {
        name: 'Divider',
        description: 'Optional 1px border line between items (controlled by List dividers prop)'
      }
    ]
  }
}
