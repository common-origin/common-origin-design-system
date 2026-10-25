import React from 'react'
import { ComponentDocumentation } from '../../../lib/docgen/types'
import { SuggestionChip } from './SuggestionChip'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

const suggestions = ['Swap Tuesday for something lighter', 'Drop Wednesday', 'Add a vegetarian night']

// Picking a suggestion fills a field; it never sends (decision 0046)
const FillExample: React.FC = () => {
  const [text, setText] = React.useState('')

  return (
    <Stack direction="column" gap="sm">
      <Stack direction="row" gap="sm" wrap>
        {suggestions.map((suggestion) => (
          <SuggestionChip key={suggestion} onClick={() => setText(suggestion)}>
            {suggestion}
          </SuggestionChip>
        ))}
      </Stack>
      <Typography variant="small" color="subdued">
        {text ? `The input now holds: “${text}”` : 'Pick a suggestion to fill the input.'}
      </Typography>
    </Stack>
  )
}

export const suggestionChipDocs: ComponentDocumentation = {
  id: 'suggestion-chip',
  name: 'SuggestionChip',
  description:
    'Offers text to put in an agent input: a prompt starter or a follow-up. Picking it fills the input so the user can edit before sending; it never sends or runs a command. It is the Suggestion chip type from decision 0046, the one chip that acts on click. Outlined, with no selected state. In agent interfaces, pass suggestions to AgentInput, which renders these chips for you.',
  category: 'Atoms',
  parentId: 'chip',

  props: [
    {
      name: 'children',
      type: 'React.ReactNode',
      required: true,
      default: undefined,
      description:
        'The suggestion text. It is also the button\'s accessible name. Keep it short; a long suggestion wraps inside the chip rather than being cut off.',
    },
    {
      name: 'onClick',
      type: '() => void',
      required: true,
      default: undefined,
      description: 'Called when the suggestion is picked. Put its text in the input and focus it; never send it (decision 0046).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables the chip. A native disabled button: not focusable and not clickable.',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing.',
    },
  ],

  tokens: [
    'component.chip.default.borderRadius',
    'component.chip.sizes.medium.font',
    'component.chip.focus.outline',
    'semantic.size.label.medium',
    'semantic.space.inset.sm',
    'semantic.border.width.thin',
    'semantic.border.focusOffset',
    'semantic.color.border.input',
    'semantic.color.border.default',
    'semantic.color.fill.none',
    'semantic.color.fill.none-hover',
    'semantic.color.fill.none-pressed',
    'semantic.color.text.default',
    'semantic.color.text.disabled',
    'semantic.motion.transition.feedback',
  ],

  examples: [
    {
      name: 'Suggestions',
      description: 'Picking a suggestion fills the input; the user sends it.',
      code: `<Stack direction="row" gap="sm" wrap>
  {suggestions.map((suggestion) => (
    <SuggestionChip key={suggestion} onClick={() => setText(suggestion)}>
      {suggestion}
    </SuggestionChip>
  ))}
</Stack>`,
      renderComponent: () => <FillExample />,
    },
    {
      name: 'Long Suggestion',
      description: 'Text longer than the space available wraps inside the chip, which grows taller; nothing is cut off.',
      code: `<SuggestionChip onClick={fill}>
  Swap Tuesday for something lighter and keep Friday as pizza night with the kids
</SuggestionChip>`,
      renderComponent: () => (
        <div style={{ maxWidth: 260 }}>
          <SuggestionChip onClick={() => {}}>
            Swap Tuesday for something lighter and keep Friday as pizza night with the kids
          </SuggestionChip>
        </div>
      ),
    },
    {
      name: 'Disabled',
      description: 'A disabled suggestion keeps its outline in the disabled border colour.',
      code: `<SuggestionChip onClick={fill} disabled>Drop Wednesday</SuggestionChip>`,
      renderComponent: () => (
        <SuggestionChip onClick={() => {}} disabled>
          Drop Wednesday
        </SuggestionChip>
      ),
    },
  ],

  accessibility: {
    notes: [
      'A native button with type="button": Enter and Space pick it, and it is in the Tab order.',
      'Its accessible name is the suggestion text, so a screen reader user hears exactly what will go into the input.',
      'Picking a suggestion fills the input and moves focus there (AgentInput does this for you), so the user can review the text before sending.',
      'The outline is color.border.input, 4.69:1 on white, so the chip\'s edge meets the 3:1 a control needs (WCAG 1.4.11, decision 0025) on white, the page and AgentInput\'s docked band.',
      'In forced colours the edge is ButtonBorder, and GrayText when disabled (decision 0038).',
      'One chip height, 24px minimum (decision 0035), which meets the 24px target size (decision 0039).',
    ],
    keyboardNavigation: 'Tab: focus the chip | Enter or Space: pick the suggestion',
    screenReader: 'Announced as "[suggestion], button". When disabled, as unavailable.',
    focusManagement: 'Uses component.chip.focus.outline with semantic.border.focusOffset, like the other chips.',
    colorContrast:
      'Default text on the transparent fill is at least 4.5:1 on white and the page. Disabled text is exempt (WCAG 1.4.3).',
  },

  anatomy: {
    description: 'A single outlined button holding the suggestion text.',
    diagram: `
┌──────────────────────────────────────┐
│ ( Swap Tuesday for something lighter ) │  ← button, outlined
└──────────────────────────────────────┘
States: rest (outline) · hover (naked hover fill) · pressed (naked pressed fill) · focus ring · disabled
`,
    parts: [
      {
        name: 'Button',
        description: 'The whole chip is one native button with a transparent fill and a 1px control-border outline. Hover and pressed add the naked fills (decision 0030).',
        tokens: [
          'semantic.color.border.input',
          'semantic.color.fill.none-hover',
          'semantic.color.fill.none-pressed',
          'component.chip.default.borderRadius',
        ],
      },
    ],
  },

  notes: [
    'Use SuggestionChip for text the user can put in an agent input. For an action that happens on click, use a Button. For a toggle, use FilterChip. For a removable value, use InputChip (decision 0016).',
    'Suggestions are not marked as AI, even when the agent wrote them (decision 0046): they change nothing until the user sends them.',
  ],
}
