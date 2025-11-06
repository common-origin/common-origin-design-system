import type { ComponentDocumentation } from '@/lib/docgen/types'
import { Slider } from './Slider'

export const sliderDocs: ComponentDocumentation = {
  id: 'slider',
  name: 'Slider',
  description: 'An accessible slider component for selecting single values or ranges with keyboard and mouse support',
  category: 'Molecules',
  
  props: [
    {
      name: 'min',
      type: 'number',
      required: false,
      default: '0',
      description: 'Minimum value of the slider range'
    },
    {
      name: 'max',
      type: 'number',
      required: false,
      default: '100',
      description: 'Maximum value of the slider range'
    },
    {
      name: 'step',
      type: 'number',
      required: false,
      default: '1',
      description: 'Step increment for value changes when using keyboard navigation or mouse interactions'
    },
    {
      name: 'value',
      type: 'number',
      required: false,
      default: undefined,
      description: 'Controlled value for single slider mode. When provided, component operates in controlled mode'
    },
    {
      name: 'defaultValue',
      type: 'number',
      required: false,
      default: 'min',
      description: 'Default value for uncontrolled single slider mode'
    },
    {
      name: 'rangeValue',
      type: '[number, number]',
      required: false,
      default: undefined,
      description: 'Controlled values [min, max] for range slider mode. Presence of this prop enables range mode'
    },
    {
      name: 'defaultRangeValue',
      type: '[number, number]',
      required: false,
      default: undefined,
      description: 'Default values for uncontrolled range slider mode. Enables range mode when provided'
    },
    {
      name: 'onChange',
      type: '(value: number) => void',
      required: false,
      default: undefined,
      description: 'Callback fired when the value changes in single slider mode. Receives the new value'
    },
    {
      name: 'onRangeChange',
      type: '(values: [number, number]) => void',
      required: false,
      default: undefined,
      description: 'Callback fired when values change in range slider mode. Receives array of [min, max] values. Presence of this prop enables range mode'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Whether the slider is disabled. Prevents all interactions and applies disabled styling'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Label text displayed above the slider. Also used for ARIA labeling'
    },
    {
      name: 'showValueLabel',
      type: 'boolean',
      required: false,
      default: 'true',
      description: 'Whether to show value label(s) above the thumb(s)'
    },
    {
      name: 'formatValue',
      type: '(value: number) => string',
      required: false,
      default: '(val) => val.toString()',
      description: 'Custom formatter function for displaying values in labels and ARIA attributes'
    },
    {
      name: 'aria-label',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Accessible name for the slider. Falls back to label prop if not provided'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      required: false,
      default: undefined,
      description: 'ID of element providing additional description for the slider'
    },
    {
      name: 'data-testid',
      type: 'string',
      required: false,
      default: undefined,
      description: 'Test identifier for automated testing'
    }
  ],
  
  tokens: [
    // Colors
    'semantic.color.background.default',
    'semantic.color.background.disabled',
    'semantic.color.background.interactive',
    'semantic.color.background.subtle',
    'semantic.color.background.emphasis',
    'semantic.color.border.default',
    'semantic.color.border.interactive',
    'semantic.color.text.default',
    'semantic.color.text.disabled',
    'semantic.color.text.subdued',
    'semantic.color.text.inverse',
    
    // Spacing
    'base.spacing[1]',
    'base.spacing[2]',
    'base.spacing[5]',
    'base.spacing[8]',
    'base.spacing[10]',
    
    // Border
    'base.border.radius[2]',
    'base.border.radius.circle',
    'base.border.width[2]',
    
    // Typography
    'semantic.typography.label',
    'semantic.typography.caption',
    
    // Effects
    'base.shadow[2]',
    'base.shadow[3]',
    'base.shadow[4]',
    
    // Motion
    'semantic.motion.transition.fast',
    
    // Opacity
    'base.opacity[50]',
    'base.opacity[100]'
  ],
  
  examples: [
    {
      name: 'Basic Slider',
      description: 'A simple single-value slider with default settings',
      code: `<Slider 
  label="Volume" 
  defaultValue={50} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Volume" 
          defaultValue={50} 
        />
      )
    },
    {
      name: 'Range Slider',
      description: 'A slider with two thumbs for selecting a range of values',
      code: `<Slider 
  label="Price Range" 
  defaultRangeValue={[25, 75]} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Price Range" 
          defaultRangeValue={[25, 75]} 
        />
      )
    },
    {
      name: 'Budget Range Selector',
      description: 'Real-world example for filtering products by budget range with currency formatting',
      code: `<Slider 
  label="Budget Range" 
  min={0} 
  max={5000} 
  step={100} 
  defaultRangeValue={[1000, 3000]} 
  formatValue={(val) => \`$\${val}\`} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Budget Range" 
          min={0} 
          max={5000} 
          step={100} 
          defaultRangeValue={[1000, 3000]} 
          formatValue={(val) => `$${val}`} 
        />
      )
    },
    {
      name: 'Cooking Time Filter',
      description: 'Filter recipes by preparation time in minutes',
      code: `<Slider 
  label="Preparation Time (minutes)" 
  min={0} 
  max={120} 
  step={5} 
  defaultRangeValue={[15, 45]} 
  formatValue={(val) => \`\${val} min\`} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Preparation Time (minutes)" 
          min={0} 
          max={120} 
          step={5} 
          defaultRangeValue={[15, 45]} 
          formatValue={(val) => `${val} min`} 
        />
      )
    },
    {
      name: 'With Custom Step Increments',
      description: 'Slider with larger step increments for coarser value selection',
      code: `<Slider 
  label="Rating" 
  min={0} 
  max={5} 
  step={0.5} 
  defaultValue={3.5} 
  formatValue={(val) => \`\${val} ★\`} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Rating" 
          min={0} 
          max={5} 
          step={0.5} 
          defaultValue={3.5} 
          formatValue={(val) => `${val} ★`} 
        />
      )
    },
    {
      name: 'Disabled State',
      description: 'A disabled slider that cannot be interacted with',
      code: `<Slider 
  label="Locked Value" 
  disabled 
  defaultValue={60} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Locked Value" 
          disabled 
          defaultValue={60} 
        />
      )
    },
    {
      name: 'Without Value Labels',
      description: 'Slider with value labels hidden for a cleaner appearance',
      code: `<Slider 
  label="Opacity" 
  min={0} 
  max={100} 
  defaultValue={80} 
  showValueLabel={false} 
  formatValue={(val) => \`\${val}%\`} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Opacity" 
          min={0} 
          max={100} 
          defaultValue={80} 
          showValueLabel={false} 
          formatValue={(val) => `${val}%`} 
        />
      )
    },
    {
      name: 'Temperature Range',
      description: 'Selecting a comfortable temperature range with unit display',
      code: `<Slider 
  label="Comfortable Temperature Range" 
  min={60} 
  max={80} 
  step={1} 
  defaultRangeValue={[68, 72]} 
  formatValue={(val) => \`\${val}°F\`} 
/>`,
      renderComponent: () => (
        <Slider 
          label="Comfortable Temperature Range" 
          min={60} 
          max={80} 
          step={1} 
          defaultRangeValue={[68, 72]} 
          formatValue={(val) => `${val}°F`} 
        />
      )
    }
  ],
  
  accessibility: {
    notes: [
      'Uses semantic HTML with proper ARIA slider role',
      'Fully keyboard navigable using Arrow keys, Home, End, PageUp, and PageDown',
      'Arrow keys (Up/Right) increase value by one step, (Down/Left) decrease by one step',
      'PageUp/PageDown jump by 10 steps for faster navigation',
      'Home key jumps to minimum value, End key jumps to maximum value',
      'All interactive states communicated via aria-valuenow, aria-valuemin, aria-valuemax',
      'Formatted values announced via aria-valuetext for better screen reader experience',
      'Label automatically associated with slider via aria-label',
      'Disabled state properly communicated with aria-disabled and tabIndex=-1',
      'Range mode provides separate ARIA labels for minimum and maximum thumbs',
      'Focus indicators visible on all interactive thumbs',
      'Color contrast maintained in all states (WCAG 2.2 AA compliant)'
    ],
    keyboardNavigation: 'Tab to focus thumb(s), Arrow keys to adjust value by step increment, PageUp/Down to jump by 10 steps, Home/End to jump to min/max values. In range mode, Tab moves between min and max thumbs',
    screenReader: 'Announces slider label, current value, minimum, maximum, and formatted value. In range mode, announces "minimum value" and "maximum value" for respective thumbs'
  },
  
  anatomy: {
    description: 'The Slider consists of a track with filled portion, draggable thumb(s), value labels, and min/max range labels',
    diagram: `
┌─────────────────────────────────────────┐
│ Slider Container                        │
│  ┌───────────────────────────┐          │
│  │ Label                     │          │
│  └───────────────────────────┘          │
│  ┌───────────────────────────┐          │
│  │ Track Container           │          │
│  │  ┌────────────────────┐   │          │
│  │  │ Track (unfilled)   │   │          │
│  │  │ ┌──────┐           │   │          │
│  │  │ │ Fill │           │   │          │
│  │  │ └──────┘           │   │          │
│  │  │   ┌────┐           │   │          │
│  │  │   │ ▼  │ Value Label│  │          │
│  │  │   └────┘           │   │          │
│  │  │    ⬤  Thumb        │   │          │
│  │  └────────────────────┘   │          │
│  └───────────────────────────┘          │
│  ┌───────────────────────────┐          │
│  │ Min         Max           │          │
│  └───────────────────────────┘          │
└─────────────────────────────────────────┘
    `,
    parts: [
      {
        name: 'Container',
        description: 'Root wrapper organizing label, track, and range labels',
        tokens: ['base.spacing[2]']
      },
      {
        name: 'Label',
        description: 'Text label displayed above the slider with semantic typography',
        tokens: [
          'semantic.typography.label',
          'semantic.color.text.default',
          'semantic.color.text.disabled'
        ]
      },
      {
        name: 'Track Container',
        description: 'Wrapper for track and thumbs with relative positioning',
        tokens: ['base.spacing[10]']
      },
      {
        name: 'Track',
        description: 'Background track showing the full slider range',
        tokens: [
          'base.spacing[1]',
          'base.border.radius.circle',
          'semantic.color.border.default',
          'semantic.color.background.disabled'
        ]
      },
      {
        name: 'Track Fill',
        description: 'Filled portion of track indicating selected value or range',
        tokens: [
          'semantic.color.background.interactive',
          'base.border.radius.circle'
        ]
      },
      {
        name: 'Thumb',
        description: 'Draggable circular control for adjusting values with focus and hover states',
        tokens: [
          'base.spacing[5]',
          'base.border.radius.circle',
          'base.border.width[2]',
          'semantic.color.background.subtle',
          'semantic.color.background.interactive',
          'semantic.motion.transition.fast',
          'base.shadow[2]',
          'base.shadow[3]',
          'base.shadow[4]'
        ]
      },
      {
        name: 'Value Label',
        description: 'Tooltip-style label showing current value above thumb',
        tokens: [
          'base.spacing[1]',
          'base.spacing[2]',
          'base.spacing[8]',
          'semantic.color.background.emphasis',
          'semantic.color.text.inverse',
          'semantic.typography.caption',
          'base.border.radius[2]',
          'base.opacity[50]',
          'base.opacity[100]'
        ]
      },
      {
        name: 'Min/Max Labels',
        description: 'Range labels showing minimum and maximum values',
        tokens: [
          'semantic.typography.caption',
          'semantic.color.text.subdued',
          'base.spacing[1]'
        ]
      }
    ]
  }
}
