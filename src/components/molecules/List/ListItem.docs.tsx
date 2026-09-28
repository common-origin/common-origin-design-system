import { ComponentDocumentation } from '../../../lib/docgen/types'
import { List } from './List'
import { ListItem } from './ListItem'

export const listItemDocs: ComponentDocumentation = {
  id: 'list-item',
  name: 'ListItem',
  description: 'A single row in a List, with a primary label and optional secondary text, leading icon, trailing badge, and expandable content. Items can be static, interactive, selected, disabled or destructive. Always render ListItems inside a List. See List for layout, dividers, examples of each pattern, and accessibility.',
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
      description: 'Callback fired when an expandable item is toggled. Required for controlled expansion.'
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
      description: 'Click handler for interactive items. Makes the item focusable with keyboard support.'
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
      default: "'comfortable'",
      description: 'Padding density. Compact for dense layouts, comfortable for standard use. Set it on each item; List does not pass its own spacing down.'
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
    'semantic.color.background.interactive-subtle',
    'semantic.color.background.interactive-hover',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.opacity.disabled',
    'component.listItem.expandedIndent.comfortable',
    'component.listItem.expandedIndent.compact'
  ],

  examples: [
    {
      name: 'Item States',
      description: 'Static, interactive, selected, disabled and destructive items.',
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
  ]
}
