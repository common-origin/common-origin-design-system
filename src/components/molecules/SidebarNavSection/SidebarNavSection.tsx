import React, { useId, useState } from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { interactiveRow, reducedMotion, visuallyHidden } from '../../../lib/styleUtils'
import { Icon } from '../../atoms/Icon'
import { useSidebarNav } from '../SidebarNavItem/SidebarNavContext'

const { semantic } = tokens
const { space, color, motion, radius, size, border, typography } = semantic

export interface SidebarNavSectionProps {
  /** The section's visible label, which also names its list */
  label: string
  /** The section's `SidebarNavItem`s */
  children: React.ReactNode
  /**
   * Whether the label is a disclosure button that shows and hides the items.
   * @default false
   */
  collapsible?: boolean
  /** Whether the items are shown (controlled). Use with `onExpandedChange`. */
  expanded?: boolean
  /**
   * Whether the items start shown (uncontrolled).
   * @default true
   */
  defaultExpanded?: boolean
  /** Called when a collapsible section is shown or hidden */
  onExpandedChange?: (expanded: boolean) => void
  /**
   * One action for the section, such as an IconButton for "New chat" or "Search". Hidden in the
   * rail.
   */
  action?: React.ReactElement
  /** Test identifier for the section */
  'data-testid'?: string
}

const Section = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $collapsed: boolean }>`
  /* In the rail there's no label, so a rule separates sections */
  ${({ $collapsed }) =>
    $collapsed &&
    css`
      border-top: ${border.default};
      padding-top: ${space[100]};
      margin-top: ${space[100]};
    `}
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${space[100]};
  min-height: ${size.row.sm};
`

// The label's look: quiet, small and muted, so the items lead
const labelText = css`
  font: ${typography.caption};
  color: ${color.text.muted};
`

const StaticLabel = styled.div`
  ${labelText}
  flex: 1;
  min-width: 0;
  padding: 0 ${space.inset.sm};
`

const HiddenLabel = styled.div`
  ${visuallyHidden}
`

const Disclosure = styled.button.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $expanded: boolean }>`
  ${labelText}
  display: flex;
  align-items: center;
  gap: ${space[100]};
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  min-height: ${size.row.sm};
  padding: 0 ${space.inset.sm};
  border: none;
  border-radius: ${radius.sm};
  background: none;
  text-align: left;
  cursor: pointer;
  transition: background-color ${motion.duration.fast} ${motion.easing.decelerate};

  ${interactiveRow()}

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: ${border.focus};
    outline-offset: calc(-1 * ${border.focusOffset});
  }

  /* The caret points down when shown and right when hidden */
  & > span:first-child {
    transition: transform ${motion.duration.fast} ${motion.easing.standard};
    transform: rotate(${({ $expanded }) => ($expanded ? '0deg' : '-90deg')});
  }

  ${reducedMotion} {
    & > span:first-child {
      transition: none;
    }
  }
`

// The items' height animates from nothing to their own height with grid rows, so no
// "no limit" max-height is needed. Once hidden, the items leave the keyboard and screen readers.
const Collapse = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};
  transition: grid-template-rows ${motion.duration.moderate} ${motion.easing.standard},
    visibility ${motion.duration.moderate} ${motion.easing.standard};

  ${reducedMotion} {
    transition: none;
  }
`

const List = styled.ul`
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`

/**
 * A labelled group of SidebarNavItems (#328), optionally collapsible, with one optional action.
 * In the rail its label and action are hidden and a rule separates it from the section above.
 */
export const SidebarNavSection = ({
  label,
  children,
  collapsible = false,
  expanded: expandedProp,
  defaultExpanded = true,
  onExpandedChange,
  action,
  'data-testid': dataTestId,
}: SidebarNavSectionProps) => {
  const { collapsed } = useSidebarNav()
  const labelId = useId()
  const listId = useId()
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded)
  const isControlled = expandedProp !== undefined
  const expanded = !collapsible || (isControlled ? expandedProp : uncontrolledExpanded)

  const toggle = () => {
    const next = !expanded
    if (!isControlled) setUncontrolledExpanded(next)
    onExpandedChange?.(next)
  }

  const header = collapsed ? (
    // The rail shows no label, but the list keeps its name
    <HiddenLabel id={labelId}>{label}</HiddenLabel>
  ) : (
    <Header>
      {collapsible ? (
        <Disclosure
          type="button"
          id={labelId}
          aria-expanded={expanded}
          aria-controls={listId}
          $expanded={expanded}
          onClick={toggle}
        >
          <Icon name="caretDown" size="sm" iconColor="inherit" />
          {label}
        </Disclosure>
      ) : (
        <StaticLabel id={labelId}>{label}</StaticLabel>
      )}
      {action}
    </Header>
  )

  return (
    <Section $collapsed={collapsed} data-testid={dataTestId}>
      {header}
      <Collapse $expanded={expanded}>
        <List id={listId} aria-labelledby={labelId}>
          {children}
        </List>
      </Collapse>
    </Section>
  )
}

SidebarNavSection.displayName = 'SidebarNavSection'
