import { ComponentDocumentation } from '../../../lib/docgen/types'
import React, { useState } from 'react'
import { Dropdown } from './Dropdown'
import { Stack } from '../../atoms/Stack'

/**
 * Dropdown component documentation
 * A comprehensive interactive dropdown component with full accessibility support
 */

export const dropdownDocs: ComponentDocumentation = {
  id: 'dropdown',
  name: 'Dropdown',
  description: 'A fully accessible dropdown component for selecting from a list of options. Features keyboard navigation, click-outside detection, smooth animations, and consistent design system integration.',
  category: 'Molecules',
  
  props: [
    {
      name: 'options',
      type: 'DropdownOption[]',
      required: true,
      description: 'Array of selectable options. Each option must have a unique id and label. Optional value property for additional data.'
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'The ID of the currently selected option. Use empty string for no selection.'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: true,
      description: 'Callback function fired when the user selects an option. Receives the selected option ID.'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      description: 'Text displayed when no option is selected. Defaults to "Select an option".'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'When true, prevents all user interaction and applies disabled styling.'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS class names to apply to the dropdown container.'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Optional label text displayed above the dropdown for improved accessibility and form structure.'
    }
  ],

  tokens: [
    'base.spacing.3',
    'base.spacing.4', 
    'base.spacing.2',
    'base.spacing.1',
    'base.shadow.3',
    'base.zIndex.3',
    'base.border.radius.2',
    'semantic.color.background.default',
    'semantic.color.background.surface',
    'semantic.color.background.disabled',
    'semantic.color.text.default',
    'semantic.color.text.subdued',
    'semantic.color.text.disabled',
    'semantic.color.border.default',
    'semantic.color.border.strong',
    'semantic.color.border.subtle',
    'semantic.typography.body',
    'semantic.border.focus',
    'semantic.border.default',
    'semantic.border.subtle'
  ],

  examples: [
    {
      name: 'Basic Dropdown with Label',
      description: 'Standard dropdown with a label for better accessibility and form structure',
      code: `<Dropdown
  label="Choose Framework"
  options={[
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue.js' },
    { id: 'angular', label: 'Angular' },
    { id: 'svelte', label: 'Svelte' }
  ]}
  value=""
  onChange={(value) => console.log('Selected:', value)}
  placeholder="Choose a framework..."
/>`,
      renderComponent: () => {
        const BasicDropdownExample = () => {
          const [selectedFramework, setSelectedFramework] = useState('')
          return (
            <div style={{ maxWidth: '300px' }}>
              <Dropdown
                label="Choose Framework"
                options={[
                  { id: 'react', label: 'React' },
                  { id: 'vue', label: 'Vue.js' },
                  { id: 'angular', label: 'Angular' },
                  { id: 'svelte', label: 'Svelte' }
                ]}
                value={selectedFramework}
                onChange={setSelectedFramework}
                placeholder="Choose a framework..."
              />
            </div>
          )
        }
        return <BasicDropdownExample />
      }
    },
    {
      name: 'Dropdown without Label',
      description: 'Dropdown without a label, suitable for contexts where labeling is provided elsewhere',
      code: `<Dropdown
  options={[
    { id: 'sm', label: 'Small (SM)' },
    { id: 'md', label: 'Medium (MD)' },
    { id: 'lg', label: 'Large (LG)' },
    { id: 'xl', label: 'Extra Large (XL)' }
  ]}
  value=""
  onChange={(value) => console.log('Size changed:', value)}
  placeholder="Select size..."
/>`,
      renderComponent: () => {
        const NoLabelDropdownExample = () => {
          const [selectedSize, setSelectedSize] = useState('')
          return (
            <div style={{ maxWidth: '300px' }}>
              <Dropdown
                options={[
                  { id: 'sm', label: 'Small (SM)' },
                  { id: 'md', label: 'Medium (MD)' },
                  { id: 'lg', label: 'Large (LG)' },
                  { id: 'xl', label: 'Extra Large (XL)' }
                ]}
                value={selectedSize}
                onChange={setSelectedSize}
                placeholder="Select size..."
              />
            </div>
          )
        }
        return <NoLabelDropdownExample />
      }
    },
    {
      name: 'Pre-selected Option',
      description: 'Dropdown with a pre-selected option, longer labels, and proper labeling',
      code: `<Dropdown
  label="Item Size"
  options={[
    { id: 'sm', label: 'Small (SM)' },
    { id: 'md', label: 'Medium (MD)' },
    { id: 'lg', label: 'Large (LG)' },
    { id: 'xl', label: 'Extra Large (XL)' }
  ]}
  value="md"
  onChange={(value) => console.log('Size changed:', value)}
  placeholder="Select size..."
/>`,
      renderComponent: () => {
        const PreselectedDropdownExample = () => {
          const [selectedSize, setSelectedSize] = useState('md')
          return (
            <div style={{ maxWidth: '300px' }}>
              <Dropdown
                label="Item Size"
                options={[
                  { id: 'sm', label: 'Small (SM)' },
                  { id: 'md', label: 'Medium (MD)' },
                  { id: 'lg', label: 'Large (LG)' },
                  { id: 'xl', label: 'Extra Large (XL)' }
                ]}
                value={selectedSize}
                onChange={setSelectedSize}
                placeholder="Select size..."
              />
            </div>
          )
        }
        return <PreselectedDropdownExample />
      }
    },
    {
      name: 'Disabled State',
      description: 'Dropdown in disabled state to prevent user interaction',
      code: `<Dropdown
  options={[
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' }
  ]}
  value=""
  onChange={() => {}}
  placeholder="This dropdown is disabled"
  disabled={true}
/>`,
      renderComponent: () => (
        <div style={{ maxWidth: '300px' }}>
          <Dropdown
            options={[
              { id: '1', label: 'Option 1' },
              { id: '2', label: 'Option 2' },
              { id: '3', label: 'Option 3' }
            ]}
            value=""
            onChange={() => {}}
            placeholder="This dropdown is disabled"
            disabled={true}
          />
        </div>
      )
    },
    {
      name: 'Long Options List',
      description: 'Dropdown with many options showing scrollable menu behavior and proper labeling',
      code: `<Dropdown
  label="Country"
  options={[
    { id: 'us', label: 'United States' },
    { id: 'ca', label: 'Canada' },
    { id: 'uk', label: 'United Kingdom' },
    { id: 'de', label: 'Germany' },
    { id: 'fr', label: 'France' },
    { id: 'it', label: 'Italy' },
    { id: 'es', label: 'Spain' },
    { id: 'jp', label: 'Japan' },
    { id: 'kr', label: 'South Korea' },
    { id: 'au', label: 'Australia' },
    { id: 'br', label: 'Brazil' },
    { id: 'mx', label: 'Mexico' }
  ]}
  value=""
  onChange={(value) => console.log('Country:', value)}
  placeholder="Select a country..."
/>`,
      renderComponent: () => {
        const LongOptionsExample = () => {
          const [selectedCountry, setSelectedCountry] = useState('')
          return (
            <div style={{ maxWidth: '300px' }}>
              <Dropdown
                label="Country"
                options={[
                  { id: 'us', label: 'United States' },
                  { id: 'ca', label: 'Canada' },
                  { id: 'uk', label: 'United Kingdom' },
                  { id: 'de', label: 'Germany' },
                  { id: 'fr', label: 'France' },
                  { id: 'it', label: 'Italy' },
                  { id: 'es', label: 'Spain' },
                  { id: 'jp', label: 'Japan' },
                  { id: 'kr', label: 'South Korea' },
                  { id: 'au', label: 'Australia' },
                  { id: 'br', label: 'Brazil' },
                  { id: 'mx', label: 'Mexico' }
                ]}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="Select a country..."
              />
            </div>
          )
        }
        return <LongOptionsExample />
      }
    },
    {
      name: 'Multiple Dropdowns',
      description: 'Multiple dropdowns working independently in a form layout with proper labels',
      code: `<Stack direction="column" gap="md">
  <Dropdown
    label="Color"
    options={[
      { id: 'red', label: 'Red' },
      { id: 'blue', label: 'Blue' },
      { id: 'green', label: 'Green' }
    ]}
    value={color}
    onChange={setColor}
    placeholder="Choose color..."
  />
  <Dropdown
    label="Shape"
    options={[
      { id: 'circle', label: 'Circle' },
      { id: 'square', label: 'Square' },
      { id: 'triangle', label: 'Triangle' }
    ]}
    value={shape}
    onChange={setShape}
    placeholder="Choose shape..."
  />
</Stack>`,
      renderComponent: () => {
        const MultipleDropdownsExample = () => {
          const [color, setColor] = useState('')
          const [shape, setShape] = useState('')
          return (
            <div style={{ maxWidth: '300px' }}>
              <Stack direction="column" gap="md">
                <Dropdown
                  label="Color"
                  options={[
                    { id: 'red', label: 'Red' },
                    { id: 'blue', label: 'Blue' },
                    { id: 'green', label: 'Green' }
                  ]}
                  value={color}
                  onChange={setColor}
                  placeholder="Choose color..."
                />
                <Dropdown
                  label="Shape"
                  options={[
                    { id: 'circle', label: 'Circle' },
                    { id: 'square', label: 'Square' },
                    { id: 'triangle', label: 'Triangle' }
                  ]}
                  value={shape}
                  onChange={setShape}
                  placeholder="Choose shape..."
                />
              </Stack>
            </div>
          )
        }
        return <MultipleDropdownsExample />
      }
    }
  ],

  accessibility: {
    notes: [
      'Fully keyboard accessible with Tab, Space, Enter, and Escape keys',
      'ARIA attributes include expanded, haspopup, selected, and role properties',
      'Screen readers announce the dropdown state and selected options',
      'Focus is properly managed and returns to trigger after selection',
      'Disabled state is communicated to assistive technologies',
      'High contrast mode compatible with proper border and focus styles',
      'Optional label provides proper form structure and improves accessibility',
      'Label is properly associated with the dropdown trigger using htmlFor and id attributes'
    ],
    keyboardNavigation: 'Tab to focus trigger, Space/Enter to toggle dropdown, Escape to close dropdown, click or Enter on options to select',
    screenReader: 'Announced as "combobox" with current selection state and option count. Selected option is clearly identified. Label is announced before the dropdown.',
    focusManagement: 'Focus remains on trigger when dropdown opens/closes. Focus returns to trigger after option selection.'
  },

  notes: [
    'Each option in the options array must have a unique ID for proper functionality',
    'The value prop should match an option ID or be an empty string for no selection',
    'Use the label prop for better accessibility and form structure - it follows WCAG 2.1 AA guidelines',
    'Consider using this component for 5+ options; use radio buttons or toggle groups for fewer options',
    'The dropdown menu has a max-height of 300px and becomes scrollable for long lists',
    'Click outside the dropdown or press Escape to close without selecting',
    'Component supports both controlled and uncontrolled usage patterns',
    'The dropdown menu is positioned absolutely and uses z-index for proper layering',
    'Smooth animations enhance the user experience during open/close transitions',
    'Icon rotation provides visual feedback for the dropdown state',
    'All styling respects the design system tokens for consistency',
    'When label is provided, it is properly associated with the dropdown for screen readers'
  ]
}
