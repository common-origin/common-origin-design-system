import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { interactiveRow } from '../../../lib/styleUtils'
import { Avatar } from '../../atoms/Avatar'
import { Icon } from '../../atoms/Icon'
import { Tooltip } from '../../atoms/Tooltip'
import { Menu, MenuDivider, MenuGroup, MenuItemRadio } from '../Menu'
import { useSidebarNav } from '../SidebarNavItem/SidebarNavContext'

const { semantic } = tokens
const { space, color, motion, radius, size, border, typography } = semantic

export interface Workspace {
  /** Identifies the workspace in `value` and `onChange` */
  id: string
  /** The workspace's name */
  name: string
  /** The workspace's logo or picture, shown in its Avatar */
  picture?: string
  /** Secondary text in the menu, such as the plan */
  description?: string
}

export interface WorkspaceSwitcherProps {
  /** The workspaces to choose from */
  workspaces: Workspace[]
  /** The current workspace's id */
  value: string
  /** Called with a workspace's id when it's chosen */
  onChange: (id: string) => void
  /**
   * The label of the workspaces group in the menu.
   * @default 'Workspaces'
   */
  label?: string
  /**
   * Actions after the workspaces, such as `<MenuItem>Create workspace</MenuItem>`. They can use
   * everything a Menu item supports.
   */
  children?: React.ReactNode
  /** Test identifier for the trigger */
  'data-testid'?: string
}

const Trigger = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[200]};
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: ${size.row.sm};
  padding: ${space.inset.xs} ${space.inset.sm};
  border: none;
  border-radius: ${radius.sm};
  background: none;
  font: ${typography.label};
  color: ${color.text.default};
  text-align: left;
  cursor: pointer;
  transition: background-color ${motion.duration.fast} ${motion.easing.decelerate};

  ${interactiveRow()}

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      justify-content: center;
      padding: ${space.inset.xs};
    `}

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: ${border.focus};
    outline-offset: calc(-1 * ${border.focusOffset});
  }
`

const Name = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Decoration = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  color: ${color.text.muted};
`

/**
 * Shows the current workspace and switches between workspaces (#330), from SidebarNav's header.
 * Built on Menu: a labelled group of the workspaces as radio items, then any actions.
 */
export const WorkspaceSwitcher = ({
  workspaces,
  value,
  onChange,
  label = 'Workspaces',
  children,
  'data-testid': dataTestId,
}: WorkspaceSwitcherProps) => {
  const { collapsed } = useSidebarNav()
  const current = workspaces.find((workspace) => workspace.id === value) ?? workspaces[0]
  if (!current) return null

  const trigger = (
    <Trigger
      type="button"
      $collapsed={collapsed}
      // In the rail only the Avatar shows, so the name moves to aria-label
      aria-label={collapsed ? current.name : undefined}
      data-testid={dataTestId}
    >
      {/* Avatar names itself as an image; the button's name is the workspace's */}
      <Decoration aria-hidden="true">
        <Avatar name={current.name} picture={current.picture} size="xs" />
      </Decoration>
      {!collapsed && (
        <>
          <Name>{current.name}</Name>
          <Decoration aria-hidden="true">
            <Icon name="caretDown" size="sm" iconColor="inherit" />
          </Decoration>
        </>
      )}
    </Trigger>
  )

  return (
    <Menu
      trigger={collapsed ? <Tooltip text={current.name} side="right">{trigger}</Tooltip> : trigger}
      side={collapsed ? 'right' : 'bottom'}
      align="start"
    >
      <MenuGroup label={label}>
        {workspaces.map((workspace) => (
          <MenuItemRadio
            key={workspace.id}
            checked={workspace.id === current.id}
            onSelect={() => onChange(workspace.id)}
            icon={<Avatar name={workspace.name} picture={workspace.picture} size="xs" />}
            description={workspace.description}
            textValue={workspace.name}
          >
            {workspace.name}
          </MenuItemRadio>
        ))}
      </MenuGroup>
      {children && (
        <>
          <MenuDivider />
          <MenuGroup>{children}</MenuGroup>
        </>
      )}
    </Menu>
  )
}

WorkspaceSwitcher.displayName = 'WorkspaceSwitcher'
