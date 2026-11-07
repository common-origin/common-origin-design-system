import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import tokens from '@/lib/cssTokens'
import { forcedColors, reducedMotion } from '../../../lib/styleUtils'
import { IconButton } from '../../atoms/IconButton'
import { Tooltip } from '../../atoms/Tooltip'
import { isKeyboardFocus } from '../../../lib/keyboardFocus'
import { SidebarNavContext, type SidebarNavContextValue } from '../../molecules/SidebarNavItem/SidebarNavContext'

const { semantic, component } = tokens
const { space, motion, radius, border, color } = semantic
const { width: widths } = component.sidebarNav

export type SidebarNavWidth = 'narrow' | 'default' | 'wide'

export interface SidebarNavProps {
  /** Names the navigation landmark, such as "Main" or "Workspace" */
  label: string
  /**
   * The body: SidebarNavItems and SidebarNavSections, in order, wrapped in components or Fragments
   * if you like. It's one list, and scrolls when it's too tall.
   */
  children: React.ReactNode
  /** Content above the body, such as a WorkspaceSwitcher. The collapse toggle sits beside it. */
  header?: React.ReactNode
  /** Content below the body, such as an upgrade prompt. Hidden in the rail. */
  footer?: React.ReactNode
  /**
   * The expanded width. Collapsed, it's always the rail.
   * @default 'default'
   */
  width?: SidebarNavWidth
  /** Whether it's the icon rail (controlled). Use with `onCollapsedChange`. */
  collapsed?: boolean
  /**
   * Whether it starts as the rail (uncontrolled). Saving the state between visits is the
   * product's job.
   * @default false
   */
  defaultCollapsed?: boolean
  /** Called when the toggle collapses or expands it */
  onCollapsedChange?: (collapsed: boolean) => void
  /**
   * Whether it has a collapse toggle. Turn it off where it can't collapse, such as inside a Sheet.
   * @default true
   */
  collapsible?: boolean
  /**
   * A router's link component for internal URLs, such as Next's `Link`, used by every item
   * (decision 0008). Without one, items render plain links.
   */
  linkComponent?: SidebarNavContextValue['linkComponent']
  /** Test identifier for the nav */
  'data-testid'?: string
}

const Nav = styled.nav.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $width: string }>`
  display: flex;
  flex-direction: column;
  gap: ${space[200]};
  box-sizing: border-box;
  /* Its width is set; in a flex app shell it mustn't shrink to make room */
  flex-shrink: 0;
  width: ${({ $width }) => $width};
  height: 100%;
  padding: ${space[200]};
  overflow: hidden;
  /* Quiet chrome (P1): the page's own background, with a thin edge */
  border-right: ${border.default};
  transition: width ${motion.duration.moderate} ${motion.easing.standard};

  ${reducedMotion} {
    transition: none;
  }
`

const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${space[100]};

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      flex-direction: column;
    `}
`

const HeaderContent = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
`

const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
`

// The rows and the highlight share this box, so the highlight scrolls with the rows
const Content = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;

  & [data-sidebar-row] {
    position: relative;
    z-index: 1;
  }
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`

interface HighlightBox {
  top: number
  left: number
  width: number
  height: number
}

// One highlight glides to the hovered or keyboard-focused row (0053): the row hover colour,
// moving over duration.fast. It jumps under reduced motion and hides in forced colours, where
// rows outline themselves instead.
const Highlight = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $visible: boolean; $instant: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: ${radius.sm};
  background-color: ${color.fill.muted};
  pointer-events: none;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: ${({ $instant }) =>
    $instant
      ? `opacity ${motion.duration.fast} ${motion.easing.decelerate}`
      : `transform ${motion.duration.fast} ${motion.easing.decelerate},
    height ${motion.duration.fast} ${motion.easing.decelerate},
    width ${motion.duration.fast} ${motion.easing.decelerate},
    opacity ${motion.duration.fast} ${motion.easing.decelerate}`};

  ${reducedMotion} {
    transition: opacity ${motion.duration.fast} ${motion.easing.decelerate};
  }

  ${forcedColors} {
    display: none;
  }
`

const Footer = styled.div`
  flex-shrink: 0;
`

/**
 * A product's sidebar navigation (#331): a header, a scrolling body of items and sections, and a
 * footer, that collapses to an icon rail. Row heights follow density (0051); the width is a prop.
 * On small screens, place it in a Sheet with `collapsible={false}`.
 */
export const SidebarNav = ({
  label,
  children,
  header,
  footer,
  width = 'default',
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  collapsible = true,
  linkComponent,
  'data-testid': dataTestId,
}: SidebarNavProps) => {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = useState(defaultCollapsed)
  const isControlled = collapsedProp !== undefined
  const collapsed = collapsible && (isControlled ? collapsedProp : uncontrolledCollapsed)

  const contentRef = useRef<HTMLDivElement>(null)
  const [highlight, setHighlight] = useState<{ box: HighlightBox | null; visible: boolean; instant: boolean }>({
    box: null,
    visible: false,
    instant: true,
  })

  const toggle = () => {
    const next = !collapsed
    if (!isControlled) setUncontrolledCollapsed(next)
    onCollapsedChange?.(next)
  }

  const hide = () => setHighlight((state) => ({ ...state, visible: false }))

  // Collapsing or expanding moves every row, so the highlight's box is stale: hide it until the
  // pointer or focus finds a row again (adjusted during render, React's pattern for a prop change)
  const [layout, setLayout] = useState(collapsed)
  if (layout !== collapsed) {
    setLayout(collapsed)
    setHighlight((state) => ({ ...state, visible: false, instant: true }))
  }

  // Move the highlight to a row, or step aside for the current page's row, which has its own fill
  const highlightRow = (target: EventTarget | null) => {
    const content = contentRef.current
    const row = target instanceof Element ? target.closest<HTMLElement>('[data-sidebar-row]') : null
    if (!content || !row || !content.contains(row) || row.getAttribute('aria-current') === 'page') return hide()
    const outer = content.getBoundingClientRect()
    const box = row.getBoundingClientRect()
    setHighlight((state) => ({
      box: { top: box.top - outer.top, left: box.left - outer.left, width: box.width, height: box.height },
      visible: true,
      // Appearing, it starts at the row rather than sliding from where it last was
      instant: !state.visible,
    }))
  }

  const context: SidebarNavContextValue = { collapsed, linkComponent, glide: true, inNav: true }

  const toggleLabel = collapsed ? 'Expand sidebar' : 'Collapse sidebar'
  const toggleButton = collapsible && (
    <Tooltip text={toggleLabel} side={collapsed ? 'right' : 'bottom'}>
      <IconButton
        variant="naked"
        size="small"
        iconName="sidebar"
        aria-label={toggleLabel}
        aria-expanded={!collapsed}
        onClick={toggle}
      />
    </Tooltip>
  )

  return (
    <SidebarNavContext.Provider value={context}>
      <Nav
        aria-label={label}
        $width={collapsed ? widths.rail : widths[width]}
        data-collapsed={collapsed || undefined}
        data-testid={dataTestId}
      >
        {(header || toggleButton) && (
          <Header $collapsed={collapsed}>
            {header && <HeaderContent>{header}</HeaderContent>}
            {toggleButton}
          </Header>
        )}
        <Body>
          <Content
            ref={contentRef}
            onPointerOver={(event) => event.pointerType !== 'touch' && highlightRow(event.target)}
            onPointerLeave={hide}
            onFocus={(event) => isKeyboardFocus(event.target) && highlightRow(event.target)}
            onBlur={(event) => {
              if (!contentRef.current?.contains(event.relatedTarget as Node)) hide()
            }}
          >
            <Highlight
              aria-hidden="true"
              data-sidebar-highlight=""
              $visible={highlight.visible}
              $instant={highlight.instant}
              style={
                highlight.box
                  ? {
                      transform: `translate(${highlight.box.left}px, ${highlight.box.top}px)`,
                      width: highlight.box.width,
                      height: highlight.box.height,
                    }
                  : undefined
              }
            />
            {/* One list: items are its items, and each section is an item holding its own list */}
            <List>{children}</List>
          </Content>
        </Body>
        {footer && !collapsed && <Footer>{footer}</Footer>}
      </Nav>
    </SidebarNavContext.Provider>
  )
}

SidebarNav.displayName = 'SidebarNav'
