import { IconButton, Menu, MenuGroup, MenuItemRadio, Tooltip } from '../components'
import { type ThemePreference, useThemePreference } from './theme'

// The docs site's theme picker (#360): light, dark, or follow the system. Docs site only.
const options: { value: ThemePreference; label: string; description: string }[] = [
  { value: 'system', label: 'System', description: 'Follow your device setting' },
  { value: 'light', label: 'Light', description: 'Always light' },
  { value: 'dark', label: 'Dark', description: 'Always dark' },
]

export function ThemeMenu() {
  const { preference, setPreference } = useThemePreference()
  return (
    <Menu
      trigger={
        <Tooltip text="Theme">
          <IconButton iconName="lamp" variant="naked" aria-label="Theme" />
        </Tooltip>
      }
      side="bottom"
      align="end"
    >
      <MenuGroup label="Theme">
        {options.map((option) => (
          <MenuItemRadio
            key={option.value}
            checked={preference === option.value}
            onSelect={() => setPreference(option.value)}
            description={option.description}
          >
            {option.label}
          </MenuItemRadio>
        ))}
      </MenuGroup>
    </Menu>
  )
}
