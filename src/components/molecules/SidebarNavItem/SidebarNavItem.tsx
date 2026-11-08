import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { interactiveRow } from '../../../lib/styleUtils'
import { Icon } from '../../atoms/Icon'
import { Tooltip } from '../../atoms/Tooltip'
import { Badge } from '../../atoms/Badge'
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
  /** Quiet text at the end of the row, such as "3/10". Hidden in the rail. */
  meta?: string
  /**
   * New or unread items (decision 0045): a count, or `'dot'` for "something new". Shown as an
   * accent Badge count at the end of the row, or as a dot inside the icon's corner in the rail, and
   * added to the item's name.
   */
  badge?: number | 'dot'
  /**
   * How the badge reads in the item's name, such as "3 unread".
   * @default "{count} new", or "new" for a dot
   */
  badgeLabel?: string
  /** Test identifier for the item's link or button */
  'data-testid'?: string
}

// Anything without a scheme (https:, mailto:) or a protocol-relative start is the app's own URL,
// relative ones included, so it goes through the router's link
const isInternalUrl = (url: string) => !/^[a-z][a-z\d+.-]*:/i.test(url) && !url.startsWith('//')

const Row = styled.a.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $current: boolean; $glide: boolean; $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[200]};
  box-sizing: border-box;
  width: 100%;
  /* The row's height is its token, with the content centred (as controls, 0034): vertical
     padding would hold a compact row above its 24px (0051) */
  min-height: ${size.row.sm};
  padding: 0 ${space.inset.sm};
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
      padding: 0 ${space.inset.xs};
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

// A badge needs something to sit on: the icon, or this mark at the end of an item without one
// Badge sits centred on its anchor's top-right corner (0045). Expanded, the anchor is a point in
// the row's vertical middle, held half a count's width in from the end, so the count sits at the
// end of the row, inside it in every density, and never reaches the rows around it
const EndSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  padding-right: calc(${tokens.component.badge.count.minWidth} / 2);
`

const EndAnchor = styled.span`
  display: inline-flex;
  width: 0;
  height: 0;
`

// In the rail there's no room for a count, so a dot sits inside the icon's top-right corner
const IconBox = styled.span`
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
`

const Corner = styled.span`
  position: absolute;
  top: 25%;
  right: 25%;
  display: inline-flex;
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
  meta,
  badge,
  badgeLabel,
  'data-testid': dataTestId,
}: SidebarNavItemProps) => {
  const { collapsed, linkComponent, glide } = useSidebarNav()

  // The rail shows icons only: an item without one has nothing to show there
  if (collapsed && !icon) return null

  const hasBadge = badge === 'dot' || (typeof badge === 'number' && badge > 0)
  const badgeText = badgeLabel ?? (badge === 'dot' ? 'new' : `${badge} new`)
  // The badge's own text would make a noisy name, so a badged item is named outright; so is an
  // item in the rail, where the label isn't shown
  const name = hasBadge ? `${label}, ${badgeText}` : collapsed ? label : undefined

  const count = typeof badge === 'number' ? badge : 0

  const content = (
    <>
      {icon && (
        <IconBox>
          <Icon name={icon} size="md" iconColor="inherit" />
          {collapsed && hasBadge && (
            <Corner>
              <Badge variant="accent" dot aria-label={badgeText}>
                <span />
              </Badge>
            </Corner>
          )}
        </IconBox>
      )}
      {!collapsed && (
        <>
          <Label>{label}</Label>
          {meta && <Meta>{meta}</Meta>}
          {hasBadge && (
            <EndSlot>
              <Badge variant="accent" dot={badge === 'dot'} count={count} aria-label={badgeText}>
                <EndAnchor />
              </Badge>
            </EndSlot>
          )}
        </>
      )}
    </>
  )

  const shared = {
    $current: current,
    $glide: glide,
    $collapsed: collapsed,
    // The icon is decorative (0028)
    'aria-label': name,
    'data-testid': dataTestId,
    // SidebarNav's gliding highlight finds rows by this (0053)
    'data-sidebar-row': '',
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
    // aria-current="page" marks a link to the current page; a button isn't one
    <Row {...shared} as="button" type="button">
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
