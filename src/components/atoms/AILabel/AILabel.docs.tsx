import type { ComponentDocumentation } from '../../../lib/docgen/types'
import { AILabel } from './AILabel'
import { Stack } from '../Stack'
import { Typography } from '../Typography'

const plan = [
  { night: 'Monday', meal: 'Pasta with greens' },
  { night: 'Tuesday', meal: 'Lemon fish and rice', kind: 'suggested' as const },
  { night: 'Wednesday', meal: 'Leftovers', kind: 'removal' as const },
  { night: 'Thursday', meal: 'Chicken tacos' },
]

export const aiLabelDocs: ComponentDocumentation = {
  id: 'ai-label',
  name: 'AILabel',
  description:
    "Marks content an agent has proposed but the user hasn't accepted yet: the AI icon and a fixed label in the AI colour. \"Suggested\" for a change or addition, \"Will be removed\" for a removal. Place it on each changed item while AgentInput's review bar shows the proposal, and remove it when the proposal is accepted or discarded (decision 0046). AI is shown with its icon and a label, never colour alone (decision 0043).",
  category: 'Atoms',

  props: [
    {
      name: 'kind',
      type: "'suggested' | 'removal'",
      required: false,
      default: "'suggested'",
      description: 'What the agent proposes for the item: "Suggested" (a change or addition) or "Will be removed". The wording is fixed so it reads the same in every product.',
    },
    {
      name: 'size',
      type: "'small' | 'medium'",
      required: false,
      default: "'medium'",
      description: 'Label-scale size (decision 0018): small (20px) for dense lists, medium (24px) elsewhere.',
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
    'semantic.color.text.ai',
    'semantic.color.icon.ai',
    'semantic.size.label.small',
    'semantic.size.label.medium',
    'semantic.typography.caption',
    'semantic.typography.small',
    'semantic.space.100',
    'semantic.space.200',
  ],

  examples: [
    {
      name: 'Suggested',
      description: 'A change or addition the agent proposes.',
      code: `<AILabel />`,
      renderComponent: () => <AILabel />,
    },
    {
      name: 'Will Be Removed',
      description: 'An item the agent proposes to remove. Keep the item readable; dimming it is fine, but the label carries the meaning.',
      code: `<AILabel kind="removal" />`,
      renderComponent: () => <AILabel kind="removal" />,
    },
    {
      name: 'On a Proposed Plan',
      description: 'Each changed item carries the marker until the proposal is accepted or discarded in the review bar above AgentInput.',
      code: `<li>
  Tuesday: Lemon fish and rice <AILabel size="small" />
</li>
<li style={{ opacity: 0.7 }}>
  Wednesday: Leftovers <AILabel kind="removal" size="small" />
</li>`,
      renderComponent: () => (
        <Stack direction="column" gap="sm">
          {plan.map(({ night, meal, kind }) => (
            <Stack key={night} direction="row" gap="sm" alignItems="center">
              <Typography variant="small" color={kind === 'removal' ? 'subdued' : 'default'}>
                {night}: {meal}
              </Typography>
              {kind && <AILabel kind={kind} size="small" />}
            </Stack>
          ))}
        </Stack>
      ),
    },
  ],

  accessibility: {
    notes: [
      'The label is visible text, read in place with the item it marks. It is not a live region: AgentInput\'s review bar announces the proposal (decision 0046).',
      'The AI icon is decorative (aria-hidden, decision 0028), because the label says it.',
      'Text and icon use color.text.ai and color.icon.ai: 5.99:1 on white and 5.68:1 on the page.',
      'Strikethrough on removed content is not required: screen readers don\'t announce it and it is harder to read. "Will be removed" carries the meaning.',
      'Not interactive. An explanation popover, as in Carbon for AI, is left to #22.',
    ],
    keyboardNavigation: 'Not focusable: it is a label, not a control.',
    screenReader: 'Read as "Suggested" or "Will be removed" with the content around it.',
    colorContrast: 'Text at least 4.5:1 and icon at least 3:1 on white and the page; a contrast test pins both tokens.',
  },

  anatomy: {
    description: 'An inline label: the AI icon, then the fixed text, in the AI colour, with no fill or border.',
    diagram: `
✦ Suggested          ✦ Will be removed
↑ icon (aria-hidden)  ↑ fixed label (kind)
`,
    parts: [
      { name: 'Icon', description: 'The ai icon, decorative.', tokens: ['semantic.color.icon.ai'] },
      { name: 'Label', description: 'Fixed text chosen by kind.', tokens: ['semantic.color.text.ai', 'semantic.typography.small'] },
    ],
  },

  notes: [
    'Use AILabel only for proposed content under decision 0046. For a status, use StatusLabel; for a category, CategoryLabel. It is not a badge for AI features in general.',
    'Remove it when the proposal is accepted or discarded: accepted content is the user\'s.',
  ],
}
