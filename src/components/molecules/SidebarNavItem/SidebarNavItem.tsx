import React from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { interactiveRow } from '../../../lib/styleUtils'
import { Icon } from '../../atoms/Icon'
import { Tooltip } from '../../atoms/Tooltip'
import { Badge } from '../../atoms/Badge'
import type { IconName } from '../../../types/icons'
import { useSidebarNav } from './SidebarNavContext'
import { EXPANDED_WIDTH_VAR, Fold, NAV_PADDING, ROW_INSET, fade } from './sidebarNavMotion'

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
})<{ $current: boolean; $glide: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[200]};
  box-sizing: border-box;
  width: 100%;
  /* The row's height is its token, with the content centred (as controls, 0034): vertical
     padding would hold a compact row above its 24px (0051) */
  min-height: ${size.row.sm};
  /* The left inset is the same expanded and in the rail, so the icon never moves (issue 348); the row
     clips what the rail doesn't show as the nav narrows */
  padding: 0 ${space.inset.sm} 0 ${ROW_INSET};
  overflow: hidden;
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

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: ${border.focus};
    outline-offset: calc(-1 * ${border.focusOffset});
  }
`

// The row's content keeps the nav's expanded width (when it's in a SidebarNav), so the nav's edge
// clips it as the nav narrows, instead of the label reflowing or ellipsising mid-move
const Inner = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $withIcon: boolean }>`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  gap: ${space[200]};
  min-width: 0;
  /* The row's content width when expanded: the nav's width less its padding, the row's insets and,
     beside an icon, the icon and its gap */
  width: calc(
    var(${EXPANDED_WIDTH_VAR}, 0px) - 2 * ${NAV_PADDING} - ${ROW_INSET} - ${space.inset.sm}
      ${({ $withIcon }) => ($withIcon ? `- ${size.icon.md} - ${space[200]}` : '')}
  );
`

const Label = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ $hidden }) => fade($hidden)}
`

const Meta = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  flex-shrink: 0;
  font: ${typography.caption};
  color: ${color.text.muted};
  ${({ $hidden }) => fade($hidden)}
`

// A badge needs something to sit on: the icon, or this mark at the end of an item without one
// Badge normally sits centred on its anchor's top-right corner (0045). At the end of the row the
// count is laid out in place instead, so a count of any width ("3", "12", "99+") stays inside the
// row in every density and never reaches the rows around it
const EndSlot = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  ${({ $hidden }) => fade($hidden)}

  & [role='status'] {
    position: static;
    transform: none;
  }
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

const Corner = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  position: absolute;
  top: 25%;
  right: 25%;
  display: inline-flex;
  ${({ $hidden }) => fade($hidden)}
`

// An item folds away in the rail when it has no icon to show there
const Item = styled(Fold).attrs({ as: 'li' })``

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

  const hasBadge = badge === 'dot' || (typeof badge === 'number' && badge > 0)
  const badgeText = badgeLabel ?? (badge === 'dot' ? 'new' : `${badge} new`)
  // The badge's own text would make a noisy name, so a badged item is named outright; so is an
  // item in the rail, where the label isn't shown
  const name = hasBadge ? `${label}, ${badgeText}` : collapsed ? label : undefined

  const count = typeof badge === 'number' ? badge : 0

  // Everything stays mounted and fades, so collapsing and expanding never jump (issue 348). Hidden
  // content leaves screen readers once its fade ends; the rail names the row with aria-label.
  const content = (
    <>
      {icon && (
        <IconBox>
          <Icon name={icon} size="md" iconColor="inherit" />
          {hasBadge && (
            <Corner $hidden={!collapsed}>
              <Badge variant="accent" dot aria-label={badgeText}>
                <span />
              </Badge>
            </Corner>
          )}
        </IconBox>
      )}
      <Inner $withIcon={Boolean(icon)}>
        <Label $hidden={collapsed}>{label}</Label>
        {meta && <Meta $hidden={collapsed}>{meta}</Meta>}
        {hasBadge && (
          <EndSlot $hidden={collapsed}>
            <Badge variant="accent" dot={badge === 'dot'} count={count} aria-label={badgeText}>
              <EndAnchor />
            </Badge>
          </EndSlot>
        )}
      </Inner>
    </>
  )

  const shared = {
    $current: current,
    $glide: glide,
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
    // The Tooltip is always there, turned off while the label is visible, so collapsing never
    // remounts the row (which would lose focus and skip its transitions)
    <Item $open={!collapsed || Boolean(icon)}>
      <div>
        <Tooltip text={label} side="right" disabled={!collapsed}>
          {row}
        </Tooltip>
      </div>
    </Item>
  )
}

SidebarNavItem.displayName = 'SidebarNavItem'
