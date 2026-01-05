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
  name: 'List / ListItem',
  description: 'A flexible list component for displaying structured content with interactive states, expandable sections, badges, and secondary information. Designed for versatile data presentation including shopping lists, recipe ingredients, settings menus, and search results. Features comprehensive accessibility support with proper ARIA attributes, keyboard navigation, and minimum 44px touch targets.',
  category: 'Molecules',
  
  props: [
    // List props
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: '[List] ListItem components to display in the list. Each child should be a ListItem for proper styling and semantics.'
    },
    {
      name: 'dividers',
      type: 'boolean',
      required: false,
      default: 'true',
      description: '[List] Whether to show divider lines between list items. Defaults to true for clear visual separation.'
    },
    {
      name: 'spacing',
      type: "'compact' | 'comfortable'",
      required: false,
      default: 'comfortable',
      description: '[List] Spacing density for all list items. Compact (8px) for dense layouts, comfortable (12px) for standard use cases.'
    },
    
    // ListItem props
    {
      name: 'primary',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: '[ListItem] Main text content displayed prominently. Can be a string or React elements for custom formatting.'
    },
    {
      name: 'secondary',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: '[ListItem] Optional secondary text displayed below primary content in a smaller, subdued style. Perfect for descriptions or metadata.'
    },
    {
      name: 'badge',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: '[ListItem] Optional component displayed on the right side, typically a Chip, Badge, or count indicator.'
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: '[ListItem] Optional icon component displayed on the left side in a 24x24px container.'
    },
    {
      name: 'expandable',
      type: 'boolean',
      required: false,
      default: 'false',
      description: '[ListItem] Whether the item can expand to reveal additional content. Shows a rotating chevron indicator.'
    },
    {
      name: 'expanded',
      type: 'boolean',
      required: false,
      default: 'false',
      description: '[ListItem] Controlled expansion state. Only applies when expandable is true.'
    },
    {
      name: 'onToggle',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: '[ListItem] Callback fired when an expandable item is toggled. Required for controlled expansion.'
    },
    {
      name: 'interactive',
      type: 'boolean',
      required: false,
      default: 'false',
      description: '[ListItem] Whether the item is clickable/interactive. Adds hover states and button role.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: '[ListItem] Click handler for interactive items. Makes the item focusable with keyboard support.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: '[ListItem] Disables interaction while maintaining visual context. Applies 50% opacity and aria-disabled.'
    },
    {
      name: 'selected',
      type: 'boolean',
      required: false,
      default: 'false',
      description: '[ListItem] Marks the item as currently selected with subtle background highlight and aria-current.'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: '[ListItem] Content revealed when item is expanded. Rendered with indented padding and subtle background.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: '"listitem"',
      description: '[ListItem] Custom ARIA role. Useful for combobox patterns where role="option" is required.'
    },
    {
      name: 'aria-selected',
      type: 'boolean',
      required: false,
      default: 'undefined',
      description: '[ListItem] ARIA selected state, used with role="option" for combobox/listbox patterns.'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      default: 'undefined',
      description: '[ListItem] Custom element ID for ARIA references like aria-activedescendant.'
    },
    {
      name: 'tabIndex',
      type: 'number',
      required: false,
      default: 'undefined',
      description: '[ListItem] Custom tab index for focus management. Overrides default behavior.'
    },
    {
      name: 'onKeyDown',
      type: '(e: React.KeyboardEvent) => void',
      required: false,
      default: 'undefined',
      description: '[ListItem] Custom keyboard event handler. When provided, overrides default Enter/Space behavior.'
    }
  ],
  
  tokens: [
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
    'base.border.radius[1] (2px)',
    'base.border.radius[2] (4px)',
    'base.opacity[50] (0.5)',
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
      description: 'Compact spacing for dense layouts',
      code: `<List spacing="compact">
  <ListItem primary="Compact Item 1" secondary="Less spacing between items" />
  <ListItem primary="Compact Item 2" secondary="Better for mobile layouts" />
  <ListItem primary="Compact Item 3" secondary="More items visible at once" />
</List>`,
      renderComponent: () => (
        <List spacing="compact">
          <ListItem primary="Compact Item 1" secondary="Less spacing between items" />
          <ListItem primary="Compact Item 2" secondary="Better for mobile layouts" />
          <ListItem primary="Compact Item 3" secondary="More items visible at once" />
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
      'All interactive and expandable items meet minimum 44px touch target size (WCAG 2.2 AA)',
      'Proper semantic HTML with role="list" and role="listitem"',
      'Interactive items use role="button" with proper ARIA attributes',
      'Supports custom roles like role="option" for combobox/listbox patterns with aria-selected',
      'Expandable items include aria-expanded to communicate state',
      'Selected items use aria-current for proper state indication on button role',
      'Disabled items include aria-disabled attribute',
      'Full keyboard support: Tab for focus, Enter/Space for activation',
      'Custom keyboard handlers supported via onKeyDown prop for specialized interaction patterns',
      'Chevron indicator is decorative only with aria-hidden="true"',
      'Screen readers announce all item content, state, and available actions',
      'Focus indicators visible for keyboard navigation',
      'Color is not the only means of conveying information (icons + text + ARIA)',
    ],
    screenReader: 'List items are announced as "Button [primary text] [secondary text] [expanded/collapsed if expandable]". When using role="option", items are announced as "Option [primary text] [secondary text] [selected/not selected]". Selected state is communicated via aria-current for buttons or aria-selected for options. Disabled state is communicated via aria-disabled.',
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
        name: 'Icon Container',
        description: 'Optional 24x24px container for leading icon, aligned to the left with 12px/16px right margin (spacing dependent)'
      },
      {
        name: 'Text Content',
        description: 'Flexible content area containing primary text (body variant) and optional secondary text (small variant, subdued color)'
      },
      {
        name: 'Badge',
        description: 'Optional right-aligned slot for Chip, Badge, or other status indicators'
      },
      {
        name: 'Chevron Icon',
        description: 'Decorative 24x24px caret icon that rotates 180° when expanded. Only shown on expandable items. Has aria-hidden="true" for accessibility.'
      },
      {
        name: 'Expanded Content',
        description: 'Collapsible content area revealed when expanded. Features 200ms ease-out animation, indented padding, and subtle background color.'
      },
      {
        name: 'Divider',
        description: 'Optional 1px border line between items (controlled by List dividers prop)'
      }
    ]
  }
}
