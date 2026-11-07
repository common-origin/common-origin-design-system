import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { interactiveRow } from '../../../lib/styleUtils'
import { Icon } from '../../atoms/Icon'
import { Tooltip } from '../../atoms/Tooltip'
import type { IconName } from '../../../types/icons'
import { useSidebarNav } from './SidebarNavContext'

const { semantic } = tokens
const { space, color, motion, radius, size, border, typography } = semantic

export interface SidebarNavItemProps {
  /** The item's label. In the rail it becomes the accessible name and shows in a Tooltip. */
  label: string
  /** A leading icon. Items without one are hidden in the rail. */
  icon?: IconName
  /**
   * Where the item goes. With a `url` the item is a link (using SidebarNav's `linkComponent`
   * for internal URLs, decision 0008); without one it's a button for `onClick`.
   */
  url?: string
  /** Called when the item is activated. Without a `url`, the item is a button. */
  onClick?: (event: React.MouseEvent) => void
  /**
   * The page the user is on: `aria-current="page"` and the light-blue selected treatment
   * (decisions 0016, 0030).
   * @default false
   */
  current?: boolean
  /**
   * Content at the end of the row: a Badge (a count or dot meaning new or unread, decision 0045)
   * or quiet meta text, such as "3/10". A string is shown as meta text.
   */
  trailing?: React.ReactNode
  /** Test identifier for the item's link or button */
  'data-testid'?: string
}

const isInternalUrl = (url: string) => url.startsWith('/') && !url.startsWith('//')

const Row = styled.a.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $current: boolean; $glide: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[200]};
  box-sizing: border-box;
  width: 100%;
  min-height: ${size.row.sm};
  padding: ${space.inset.xs} ${space.inset.sm};
  border: none;
  border-radius: ${radius.sm};
  background: none;
  font: ${typography.small};
  color: ${color.text.default};
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color ${motion.duration.fast} ${motion.easing.decelerate},
    color ${motion.duration.fast} ${motion.easing.decelerate};

  /* The shared row states (0030); the current page takes the light-blue selected ladder */
  ${({ $current }) => interactiveRow({ selected: $current })}

  /* Inside SidebarNav one highlight glides to the hovered row, so an unselected row stays clear
     underneath it; pressed and selected rows keep their own fills (0053) */
  ${({ $glide, $current }) =>
    $glide &&
    !$current &&
    css`
      &:hover:not(:active) {
        background-color: transparent;
      }
    `}

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

const Label = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Meta = styled.span`
  flex-shrink: 0;
  font: ${typography.caption};
  color: ${color.text.muted};
`

const Trailing = styled.span`
  display: inline-flex;
  flex-shrink: 0;
`

/**
 * One row of a SidebarNav (#327): a link to a page, or a button for an action such as "New chat".
 * Renders an `li`, so it sits in SidebarNav's or a SidebarNavSection's list.
 */
export const SidebarNavItem = ({
  label,
  icon,
  url,
  onClick,
  current = false,
  trailing,
  'data-testid': dataTestId,
}: SidebarNavItemProps) => {
  const { collapsed, linkComponent, glide } = useSidebarNav()

  // The rail shows icons only: an item without one has nothing to show there
  if (collapsed && !icon) return null

  const content = (
    <>
      {icon && <Icon name={icon} size="md" iconColor="inherit" />}
      {!collapsed && (
        <>
          <Label>{label}</Label>
          {trailing !== undefined &&
            (typeof trailing === 'string' || typeof trailing === 'number' ? (
              <Meta>{trailing}</Meta>
            ) : (
              <Trailing>{trailing}</Trailing>
            ))}
        </>
      )}
    </>
  )

  const shared = {
    $current: current,
    $glide: glide,
    $collapsed: collapsed,
    // In the rail the label is the name; the icon is decorative (0028)
    'aria-label': collapsed ? label : undefined,
    'data-testid': dataTestId,
    onClick,
  }

  const row = url ? (
    <Row
      {...shared}
      {...(linkComponent && isInternalUrl(url) ? { as: linkComponent } : {})}
      href={url}
      aria-current={current ? 'page' : undefined}
    >
      {content}
    </Row>
  ) : (
    <Row {...shared} as="button" type="button" aria-current={current ? 'page' : undefined}>
      {content}
    </Row>
  )

  return (
    <li>
      {collapsed ? (
        <Tooltip text={label} side="right">
          {row}
        </Tooltip>
      ) : (
        row
      )}
    </li>
  )
}

SidebarNavItem.displayName = 'SidebarNavItem'
