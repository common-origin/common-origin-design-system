import { ComponentDocumentation } from '../../../lib/docgen/types'
import { List } from './List'
import { ListItem } from './ListItem'
import { Chip } from '../../atoms/Chip'
import { Icon } from '../../atoms/Icon'

export const listItemDocs: ComponentDocumentation = {
  id: 'list-item',
  name: 'ListItem',
  description: 'A single row in a List, with a primary label and optional secondary text, leading icon, trailing badge, and expandable content. Items can be static, interactive, selected, disabled or destructive. Always render ListItems inside a List, which provides the list semantics and dividers. List has more patterns, including expandable items and a combobox.',
  category: 'Molecules',
  parentId: 'list',

  props: [
    {
      name: 'primary',
      type: 'React.ReactNode',
      required: true,
      default: 'undefined',
      description: 'Main text content displayed prominently. Can be a string or React elements for custom formatting.'
    },
    {
      name: 'secondary',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Optional secondary text displayed below primary content in a smaller, subdued style. Perfect for descriptions or metadata.'
    },
    {
      name: 'badge',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Optional component displayed on the right side, typically a Chip, Badge, or count indicator.'
    },
    {
      name: 'icon',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Optional icon component displayed on the left side in a 24x24px container.'
    },
    {
      name: 'expandable',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the item can expand to reveal additional content. Shows a rotating chevron indicator.'
    },
    {
      name: 'expanded',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Controlled expansion state. Only applies when expandable is true.'
    },
    {
      name: 'onToggle',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Callback fired when an expandable item is clicked or activated with Enter or Space. Required for controlled expansion. When set on an expandable item, it replaces onClick rather than firing alongside it.'
    },
    {
      name: 'interactive',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the item is clickable. Adds hover states, a button role on the item\'s content, and makes it focusable.'
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      default: 'undefined',
      description: 'Click handler, also triggered by Enter and Space. Set interactive as well: onClick alone does not make the item focusable or give it a button role, so it would be mouse-only. On an expandable item with onToggle, onToggle is called instead and onClick is not.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables interaction while maintaining visual context. Applies 50% opacity and aria-disabled.'
    },
    {
      name: 'selected',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Marks the item as currently selected with a subtle background highlight. Sets aria-current on the item\'s content element.'
    },
    {
      name: 'destructive',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Applies destructive/danger styling with error color text. Used for delete or remove actions in action sheets and menus.'
    },
    {
      name: 'children',
      type: 'React.ReactNode',
      required: false,
      default: 'undefined',
      description: 'Content revealed when item is expanded. Rendered with indented padding and subtle background.'
    },
    {
      name: 'role',
      type: 'string',
      required: false,
      default: '"listitem"',
      description: 'Custom ARIA role. Useful for combobox patterns where role="option" is required.'
    },
    {
      name: 'aria-selected',
      type: 'boolean',
      required: false,
      default: 'undefined',
      description: 'ARIA selected state, used with role="option" for combobox/listbox patterns.'
    },
    {
      name: 'id',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Custom element ID for ARIA references like aria-activedescendant.'
    },
    {
      name: 'tabIndex',
      type: 'number',
      required: false,
      default: 'undefined',
      description: 'Custom tab index for focus management. Overrides default behavior.'
    },
    {
      name: 'onKeyDown',
      type: '(e: React.KeyboardEvent) => void',
      required: false,
      default: 'undefined',
      description: 'Custom keyboard event handler. When provided, overrides default Enter/Space behavior.'
    },
    {
      name: 'spacing',
      type: "'compact' | 'comfortable'",
      required: false,
      default: "the List's spacing, or 'comfortable'",
      description: 'Padding density. Compact for dense layouts, comfortable for standard use. Defaults to the parent List\'s spacing (comfortable outside a List); set it to override the List for this item.'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      default: 'undefined',
      description: 'Additional CSS class name for the list item element.'
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
    'semantic.size.touchTarget',
    'semantic.size.icon.lg',
    'semantic.spacing.layout.xs',
    'semantic.spacing.layout.sm',
    'semantic.spacing.layout.md',
    'semantic.spacing.layout.lg',
    'semantic.border.radius.sm',
    'semantic.border.width.thick',
    'semantic.border.focusOffset',
    'semantic.color.border.interactive',
    'semantic.color.background.subtle',
    'semantic.color.background.interactive-subtle',
    'semantic.color.text.error',
    'semantic.color.icon.subdued',
    'semantic.opacity.disabled',
    'semantic.motion.duration.fast',
    'semantic.motion.duration.normal',
    'semantic.motion.easing.easeOut',
    'component.button.variants.secondary.backgroundColor',
    'component.button.variants.naked.backgroundColor',
    'component.listItem.expandedIndent.comfortable',
    'component.listItem.expandedIndent.compact'
  ],

  examples: [
    {
      name: 'Basic Usage',
      description: 'Primary text only, or with secondary text below it.',
      code: `<List>
  <ListItem primary="Milk" />
  <ListItem primary="Bread" secondary="Wholemeal, sliced" />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem primary="Milk" />
          <ListItem primary="Bread" secondary="Wholemeal, sliced" />
        </List>
      )
    },
    {
      name: 'Icon and Badge',
      description: 'A leading icon and a trailing badge, such as a Chip.',
      code: `<List>
  <ListItem
    primary="Notifications"
    secondary="Push and email"
    icon={<Icon name="bell" iconColor="default" size="lg" />}
    badge={<Chip size="small">3 new</Chip>}
  />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem
            primary="Notifications"
            secondary="Push and email"
            icon={<Icon name="bell" iconColor="default" size="lg" />}
            badge={<Chip size="small">3 new</Chip>}
          />
        </List>
      )
    },
    {
      name: 'Item States',
      description: 'Static, interactive, selected, disabled and destructive items. Interactive items need interactive as well as onClick.',
      code: `<List>
  <ListItem primary="Static item" secondary="No interaction" />
  <ListItem primary="Interactive item" interactive onClick={() => {}} />
  <ListItem primary="Selected item" interactive selected onClick={() => {}} />
  <ListItem primary="Disabled item" interactive disabled onClick={() => {}} />
  <ListItem primary="Delete" interactive destructive onClick={() => {}} />
</List>`,
      renderComponent: () => (
        <List>
          <ListItem primary="Static item" secondary="No interaction" />
          <ListItem primary="Interactive item" interactive onClick={() => {}} />
          <ListItem primary="Selected item" interactive selected onClick={() => {}} />
          <ListItem primary="Disabled item" interactive disabled onClick={() => {}} />
          <ListItem primary="Delete" interactive destructive onClick={() => {}} />
        </List>
      )
    }
  ],

  accessibility: {
    notes: [
      'Renders an li with role="listitem" by default; the parent List provides role="list"',
      'Interactive and expandable items get role="button" on their content, are focusable, and meet the 44px minimum touch target (WCAG 2.2 AA)',
      'onClick alone does not make an item keyboard accessible: set interactive (or expandable) as well',
      'Enter and Space activate interactive items and toggle expandable ones (an expandable item with onToggle calls onToggle, not onClick)',
      'Expandable items set aria-expanded; collapsed content is hidden from keyboard and screen readers',
      'Selected items set aria-current; disabled items set aria-disabled',
      'For combobox or listbox patterns, pass role="option" with aria-selected, id and tabIndex, and handle keys with onKeyDown',
      'The leading icon container and the chevron are decorative (aria-hidden="true")',
      'Destructive items rely on colour, so make the action clear in the text (for example "Delete")'
    ],
    keyboardNavigation: 'Tab moves to interactive and expandable items. Enter or Space activates or toggles them. A custom onKeyDown replaces the default Enter/Space handling.',
    screenReader: 'Interactive items are announced as a button with the primary and secondary text, plus expanded/collapsed when expandable. With role="option", items are announced as options with their selected state. Selected state is exposed via aria-current for buttons or aria-selected for options; disabled via aria-disabled.'
  },

  anatomy: {
    description: 'A row with an optional leading icon, a text area with primary and optional secondary text, an optional trailing badge, and a chevron on expandable items. Expanded content sits below the row, indented, on a subtle background.',
    diagram: `
┌──────────────────────────────────────────────────────┐
│ ┌────┐  ┌──────────────────────┐  ┌───────┐  ┌───┐  │
│ │Icon│  │ Primary text         │  │ Badge │  │ ▼ │  │
│ │    │  │ Secondary text       │  │       │  └───┘  │
│ └────┘  └──────────────────────┘  └───────┘ Chevron │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Expanded content (when expanded)                 │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
`,
    parts: [
      {
        name: 'Icon Container',
        description: 'Optional 24x24px container for the leading icon, with right margin that depends on spacing'
      },
      {
        name: 'Text Content',
        description: 'Primary text (body) and optional secondary text (small, subdued)'
      },
      {
        name: 'Badge',
        description: 'Optional right-aligned slot for a Chip, Badge or other status indicator'
      },
      {
        name: 'Chevron Icon',
        description: 'Decorative caret shown on expandable items. It rotates 180° when expanded over semantic.motion.duration.fast (easeOut), the same as the Dropdown chevron, and flips instantly with prefers-reduced-motion. aria-hidden="true".'
      },
      {
        name: 'Expanded Content',
        description: 'Revealed when expanded. Height, padding and opacity animate over semantic.motion.duration.normal (easeOut); with prefers-reduced-motion it fades without the height change. Collapsed content is hidden from keyboard and screen readers.'
      }
    ]
  }
}
