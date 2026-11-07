import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Tooltip } from './Tooltip'
import { IconButton } from '../IconButton'
import { Stack } from '../Stack'

export const tooltipDocs: ComponentDocumentation = {
  id: 'tooltip',
  name: 'Tooltip',
  description:
    'A short label or hint that appears beside a control on hover or keyboard focus. Use it to show the name of an icon-only control, such as an IconButton or a collapsed sidebar item, or to add non-essential help. It renders in the browser\'s top layer, so it is never clipped by a scrolling container and always sits above the page and any Modal.',
  category: 'Atoms',

  props: [
    {
      name: 'text',
      type: 'string',
      required: true,
      description: 'The tooltip\'s text. In label mode it repeats the name the trigger already has.',
    },
    {
      name: 'kind',
      type: "'label' | 'description'",
      required: false,
      default: "'label'",
      description:
        'label shows the trigger\'s existing accessible name and is hidden from assistive technology, so the name isn\'t announced twice. description adds non-essential help, linked to the trigger with aria-describedby.',
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      required: false,
      default: "'top'",
      description: 'The side of the trigger it opens on. It flips to the opposite side when there is no room.',
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      required: false,
      default: "'center'",
      description: 'Where it lines up along the trigger\'s edge. It shifts to stay inside the viewport.',
    },
    {
      name: 'children',
      type: 'ReactElement',
      required: true,
      description: 'One focusable element: the trigger. In label mode it must already have an accessible name.',
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      description: 'Test identifier for the tooltip bubble',
    },
  ],

  tokens: [
    'semantic.color.fill.inverse',
    'semantic.color.text.inverse',
    'semantic.typography.small',
    'semantic.radius.sm',
    'semantic.space.inset.xs',
    'semantic.space.inset.sm',
    'semantic.space.100',
    'semantic.space.200',
    'semantic.size.7500',
    'semantic.motion.delay.hint',
    'semantic.motion.duration.fast',
    'semantic.motion.duration.slow',
    'semantic.motion.easing.decelerate',
    'semantic.motion.easing.accelerate',
  ],

  examples: [
    {
      name: 'Label an icon-only control',
      description: 'The IconButton already has its name in aria-label; the tooltip shows it to sighted users',
      code: `<Tooltip text="Search">
  <IconButton variant="naked" iconName="search" aria-label="Search" />
</Tooltip>`,
      renderComponent: () => (
        <Tooltip text="Search">
          <IconButton variant="naked" iconName="search" aria-label="Search" />
        </Tooltip>
      ),
    },
    {
      name: 'Sides',
      description: 'Choose the side; a rail of icons opens its tooltips to the right',
      code: `<Tooltip text="Home" side="right">
  <IconButton variant="naked" iconName="home" aria-label="Home" />
</Tooltip>`,
      renderComponent: () => (
        <Stack direction="row" gap="lg">
          <Tooltip text="Top" side="top">
            <IconButton variant="secondary" iconName="arrowUp" aria-label="Top" />
          </Tooltip>
          <Tooltip text="Right" side="right">
            <IconButton variant="secondary" iconName="arrowRight" aria-label="Right" />
          </Tooltip>
          <Tooltip text="Bottom" side="bottom">
            <IconButton variant="secondary" iconName="arrowDown" aria-label="Bottom" />
          </Tooltip>
          <Tooltip text="Left" side="left">
            <IconButton variant="secondary" iconName="arrowLeft" aria-label="Left" />
          </Tooltip>
        </Stack>
      ),
    },
    {
      name: 'Non-essential help',
      description: 'A description adds a hint. It can\'t be reached on touch screens, so never put anything a user needs in it',
      code: `<Tooltip text="Copies a link anyone in the workspace can open" kind="description">
  <IconButton variant="naked" iconName="link" aria-label="Copy link" />
</Tooltip>`,
      renderComponent: () => (
        <Tooltip text="Copies a link anyone in the workspace can open" kind="description">
          <IconButton variant="naked" iconName="link" aria-label="Copy link" />
        </Tooltip>
      ),
    },
  ],

  accessibility: {
    notes: [
      'Follows WCAG 1.4.13 (content on hover or focus): it closes on Escape without moving focus, stays open while the pointer is over it, and stays until the pointer leaves, focus moves or it is dismissed',
      'label mode supplements an accessible name and never replaces it: the trigger needs its own name (such as aria-label), and the bubble is aria-hidden',
      'description mode links its text with aria-describedby, which works whether or not the bubble is showing',
      'Hover text cannot be reached on touch screens, and the tooltip does not open on touch, so a description may only add non-essential help',
      'Escape is handled before anything else hears it, so dismissing a tooltip inside a Modal does not also close the Modal',
    ],
    keyboardNavigation: 'Opens at once when its trigger receives keyboard focus; Escape closes it and focus stays on the trigger',
    screenReader: 'Label mode adds nothing (the trigger is already named). Description mode is announced as the trigger\'s description.',
    colorContrast: 'Inverse text on the inverse fill, about 15:1',
    focusManagement: 'Never takes focus. A click\'s focus does not open it; the pointer\'s hover already does',
  },

  anatomy: {
    description: 'A trigger, wrapped without adding a box of its own, and a bubble placed beside it in the top layer.',
    parts: [
      {
        name: 'Trigger',
        description: 'The one focusable child. In description mode it gains aria-describedby',
      },
      {
        name: 'Bubble',
        description:
          'The inverse bubble: small text, a small radius, no arrow, and a maximum width so long text wraps. Opens after motion.delay.hint of hover, at once on focus, and at once when moving on from another tooltip within motion.duration.slow. Fades in decelerating and out accelerating over motion.duration.fast. Has a visible edge in forced-colours mode',
        tokens: [
          'semantic.color.fill.inverse',
          'semantic.color.text.inverse',
          'semantic.typography.small',
          'semantic.radius.sm',
          'semantic.size.7500',
          'semantic.motion.delay.hint',
        ],
      },
      {
        name: 'Description',
        description: 'In description mode, a visually hidden copy of the text that aria-describedby points at',
      },
    ],
  },
}
