import { ComponentDocumentation } from '../../../lib/docgen/types'
import React, { useState } from 'react'
import { Dropdown } from './Dropdown'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'

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
      description: 'Array of selectable options. Each option requires: id (unique identifier), label (display text), and optional value (additional data). Interface: { id: string, label: string, value?: any }'
    },
    {
      name: 'value',
      type: 'string',
      required: true,
      description: 'Currently selected option ID (controlled component). Use empty string for no selection. Must match an option.id or be empty'
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      required: true,
      description: 'Selection change handler. Called with selected option.id when user makes selection. Required for controlled component behavior'
    },
    {
      name: 'placeholder',
      type: 'string',
      required: false,
      default: 'Select an option',
      description: 'Text displayed when no option is selected (value is empty string). Should be descriptive of the expected selection'
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      default: 'false',
      description: 'Disables all user interaction, applies disabled styling, and communicates disabled state to assistive technologies'
    },
    {
      name: 'className',
      type: 'string',
      required: false,
      description: 'Additional CSS class names applied to the dropdown container for custom styling extensions'
    },
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Label text displayed above dropdown. Creates proper form structure with htmlFor association. Recommended for accessibility and UX'
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
      name: 'Keyboard Navigation Demo',
      description: 'Interactive example demonstrating comprehensive keyboard navigation support',
      code: `{/* Try these keyboard interactions:
- Tab: Focus the dropdown trigger
- Space/Enter: Open dropdown menu  
- Arrow Up/Down: Navigate through options
- Home: Jump to first option
- End: Jump to last option
- Escape: Close dropdown without selecting
- Enter/Space: Select focused option */}

<Dropdown
  label="Keyboard Navigation Test"
  options={[
    { id: 'option1', label: '1. First Option (Home key jumps here)' },
    { id: 'option2', label: '2. Second Option' },
    { id: 'option3', label: '3. Third Option' },
    { id: 'option4', label: '4. Fourth Option' },
    { id: 'option5', label: '5. Last Option (End key jumps here)' }
  ]}
  value={selectedOption}
  onChange={setSelectedOption}
  placeholder="Try keyboard navigation..."
/>`,
      renderComponent: () => {
        const KeyboardNavExample = () => {
          const [selectedOption, setSelectedOption] = useState('')
          return (
            <Stack direction="column" gap="md">
              <div style={{ maxWidth: '400px' }}>
                <Dropdown
                  label="Keyboard Navigation Test"
                  options={[
                    { id: 'option1', label: '1. First Option (Home key jumps here)' },
                    { id: 'option2', label: '2. Second Option' },
                    { id: 'option3', label: '3. Third Option' },
                    { id: 'option4', label: '4. Fourth Option' },
                    { id: 'option5', label: '5. Last Option (End key jumps here)' }
                  ]}
                  value={selectedOption}
                  onChange={setSelectedOption}
                  placeholder="Try keyboard navigation..."
                />
              </div>
              <Stack direction="column" gap="xs">
                <Typography variant="label" color="subdued">KEYBOARD SHORTCUTS:</Typography>
                <Typography variant="small" color="subdued">Tab: Focus • Space/Enter: Open • ↑↓: Navigate • Home/End: Jump • Escape: Close</Typography>
                {selectedOption && (
                  <Typography variant="small" color="success">✓ Selected: {selectedOption}</Typography>
                )}
              </Stack>
            </Stack>
          )
        }
        return <KeyboardNavExample />
      }
    },
    {
      name: 'Form Layout Example',
      description: 'Multiple dropdowns in a realistic form context with proper spacing and labels',
      code: `<Stack direction="column" gap="lg">
  <Typography variant="h3">User Preferences</Typography>
  
  <Stack direction="column" gap="md">
    <Dropdown
      label="Preferred Language"
      options={[
        { id: 'en', label: 'English' },
        { id: 'es', label: 'Español' },
        { id: 'fr', label: 'Français' },
        { id: 'de', label: 'Deutsch' }
      ]}
      value={language}
      onChange={setLanguage}
      placeholder="Select your language..."
    />
    
    <Dropdown
      label="Time Zone"
      options={[
        { id: 'pst', label: 'Pacific Standard Time (PST)' },
        { id: 'mst', label: 'Mountain Standard Time (MST)' },
        { id: 'cst', label: 'Central Standard Time (CST)' },
        { id: 'est', label: 'Eastern Standard Time (EST)' }
      ]}
      value={timezone}
      onChange={setTimezone}
      placeholder="Select your timezone..."
    />
    
    <Dropdown
      label="Theme Preference"
      options={[
        { id: 'light', label: 'Light Mode' },
        { id: 'dark', label: 'Dark Mode' },
        { id: 'auto', label: 'Auto (Follow System)' }
      ]}
      value={theme}
      onChange={setTheme}
      placeholder="Choose theme..."
    />
  </Stack>
</Stack>`,
      renderComponent: () => {
        const FormLayoutExample = () => {
          const [language, setLanguage] = useState('')
          const [timezone, setTimezone] = useState('')
          const [theme, setTheme] = useState('')
          return (
            <div style={{ maxWidth: '400px' }}>
              <Stack direction="column" gap="lg">
                <Typography variant="h3">User Preferences</Typography>
                
                <Stack direction="column" gap="md">
                  <Dropdown
                    label="Preferred Language"
                    options={[
                      { id: 'en', label: 'English' },
                      { id: 'es', label: 'Español' },
                      { id: 'fr', label: 'Français' },
                      { id: 'de', label: 'Deutsch' }
                    ]}
                    value={language}
                    onChange={setLanguage}
                    placeholder="Select your language..."
                  />
                  
                  <Dropdown
                    label="Time Zone"
                    options={[
                      { id: 'pst', label: 'Pacific Standard Time (PST)' },
                      { id: 'mst', label: 'Mountain Standard Time (MST)' },
                      { id: 'cst', label: 'Central Standard Time (CST)' },
                      { id: 'est', label: 'Eastern Standard Time (EST)' }
                    ]}
                    value={timezone}
                    onChange={setTimezone}
                    placeholder="Select your timezone..."
                  />
                  
                  <Dropdown
                    label="Theme Preference"
                    options={[
                      { id: 'light', label: 'Light Mode' },
                      { id: 'dark', label: 'Dark Mode' },
                      { id: 'auto', label: 'Auto (Follow System)' }
                    ]}
                    value={theme}
                    onChange={setTheme}
                    placeholder="Choose theme..."
                  />
                </Stack>
              </Stack>
            </div>
          )
        }
        return <FormLayoutExample />
      }
    }
  ],

  accessibility: {
    notes: [
      'WCAG 2.2 AA Compliant: Full keyboard accessibility and proper ARIA implementation for form controls',
      'Comprehensive Keyboard Support: Tab (focus), Space/Enter (toggle), Arrow keys (navigate), Home/End (jump to first/last), Escape (close)',
      'ARIA Implementation: Uses role="listbox" for menu, role="option" for items, aria-expanded, aria-haspopup, and aria-selected attributes',
      'Screen Reader Integration: Announced as combobox with current selection state, option count, and clear selection feedback',
      'Focus Management: Focus preserved on trigger during interaction, returns after selection, visual focus indicators on all interactive elements',
      'Label Association: Proper htmlFor/id relationship when label provided, creating accessible form structure',
      'Disabled State: Communicated through aria-disabled, disabled attribute, and visual styling changes',
      'High Contrast Support: Focus outlines, borders, and hover states work in Windows High Contrast and similar modes',
      'Motion Sensitivity: Smooth animations respect user motion preferences and can be disabled via prefers-reduced-motion',
      'Touch Accessibility: Adequate touch targets (44px minimum) and touch-friendly interaction patterns',
      'Error Prevention: Validates option selection and provides clear feedback for invalid states',
      'Cognitive Accessibility: Clear visual hierarchy, predictable behavior, and optional labels for context'
    ],
    keyboardNavigation: 'Tab: Focus trigger | Space/Enter: Open/close dropdown | Arrow Up/Down: Navigate options | Home: First option | End: Last option | Escape: Close without selection | Enter/Space on option: Select',
    screenReader: 'Announced as "combobox, expanded/collapsed" with current selection. Options announced as "option X of Y" with selection state. Label provides context when present.',
    focusManagement: 'Focus remains on trigger when dropdown opens/closes. Visual focus indicator shows current option during keyboard navigation. Focus returns to trigger after selection or Escape.',
    colorContrast: 'All interactive states meet WCAG AA contrast requirements. Focus indicators, hover states, and text maintain 4.5:1 contrast ratio minimum.'
  },

  notes: [
    'Controlled Component: Always controlled via value/onChange props - no uncontrolled mode. Value must match option.id or be empty string',
    'Option Data Structure: Each option requires unique id (string), label (display text), and optional value (any additional data)',
    'Selection Scenarios: Use for 5+ options with single selection. Consider Radio buttons (<5 options) or Multi-select for multiple selections',
    'Label Accessibility: Always provide label prop for form accessibility. Creates proper association and improves screen reader experience',
    'Keyboard Navigation: Full WASD-style navigation plus Home/End keys. Follows ARIA Authoring Practices Guide patterns',
    'Performance Optimization: Dropdown menu rendered on mount but hidden via CSS for smooth animations and keyboard navigation',
    'Scroll Behavior: Menu max-height of 300px with auto-scroll. Large option lists become scrollable with proper focus management',
    'Click Outside Handling: Automatic click-outside detection closes dropdown. Escape key also closes without selection',
    'Visual Feedback: Smooth animations (0.15s ease), icon rotation, and focus indicators provide clear interaction feedback',
    'Design Token Integration: All spacing, colors, borders, shadows derive from semantic design tokens ensuring theme consistency',
    'Browser Support: Works in all modern browsers. Fallbacks ensure functionality even without CSS custom property support',
    'Form Integration: Works with form libraries (Formik, React Hook Form) via standard controlled component patterns',
    'Error Handling: Gracefully handles missing options, invalid values, and provides console warnings in development',
    'Mobile Responsiveness: Touch-friendly interaction with appropriate tap targets and mobile-optimized spacing'
  ]
}
