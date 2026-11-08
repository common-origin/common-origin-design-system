import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import tokens from '@/lib/cssTokens'
import { forcedColors, reducedMotion } from '../../../lib/styleUtils'
import { IconButton } from '../../atoms/IconButton'
import { Tooltip } from '../../atoms/Tooltip'
import { isKeyboardFocus } from '../../../lib/keyboardFocus'
import { SidebarNavContext, type SidebarNavContextValue } from '../../molecules/SidebarNavItem/SidebarNavContext'
import { EXPANDED_WIDTH_VAR, NAV_PADDING, SCROLLBAR_VAR, fade } from '../../molecules/SidebarNavItem/sidebarNavMotion'

const { semantic, component } = tokens
const { space, motion, radius, color, size } = semantic
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
  /* Quiet chrome (P1): the page's own background, with no edge of its own (issue 348). The width
     moves with everything inside it, decelerating (0037) */
  transition: width ${motion.duration.moderate} ${motion.easing.decelerate};

  ${reducedMotion} {
    transition: none;
  }
`

// The header holds two toggles in fixed places that cross-fade (issue 348): collapse beside the
// header content, and expand in the content's place, where the rail shows it. Nothing moves.
const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${space[100]};
  min-height: ${size.control.sm};
`

const HeaderContent = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  ${({ $hidden }) => fade($hidden)}

  /* Keeps its expanded width, so the nav's edge clips it rather than it reflowing mid-move */
  & > div {
    width: calc(var(${EXPANDED_WIDTH_VAR}) - 2 * ${NAV_PADDING} - ${size.control.sm} - ${space[100]});
  }
`

const CollapseSlot = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  margin-left: auto;
  ${({ $hidden }) => fade($hidden)}
`

// Centred in the rail, where the header content starts
const ExpandSlot = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc((${component.sidebarNav.width.rail} - 2 * ${NAV_PADDING} - ${size.control.sm}) / 2);
  display: flex;
  align-items: center;
  ${({ $hidden }) => fade($hidden)}
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

// The footer fades out in the rail, keeping its expanded width so it doesn't reflow mid-move
const Footer = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $hidden: boolean }>`
  flex-shrink: 0;
  overflow: hidden;
  ${({ $hidden }) => fade($hidden)}

  & > div {
    width: calc(var(${EXPANDED_WIDTH_VAR}) - 2 * ${NAV_PADDING});
  }
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
  const navRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // A classic scrollbar narrows every row, so rows need its width. Measured while expanded (the rail
  // only clips what rows hold) and written straight to a CSS variable, so it re-renders nothing.
  useEffect(() => {
    const nav = navRef.current
    const body = bodyRef.current
    if (!nav || !body || collapsed) return
    const measure = () => nav.style.setProperty(SCROLLBAR_VAR, `${body.offsetWidth - body.clientWidth}px`)
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(body)
    if (contentRef.current) observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [collapsed])
  const [highlight, setHighlight] = useState<{ box: HighlightBox | null; visible: boolean; instant: boolean }>({
    box: null,
    visible: false,
    instant: true,
  })

  // Focus follows the toggle: the one pressed fades away, so focus moves to the one now shown
  const collapseSlot = useRef<HTMLSpanElement>(null)
  const expandSlot = useRef<HTMLSpanElement>(null)
  // Which state a toggle asked for, and when: focus moves only if that state arrives promptly, so a
  // controlled parent that declined the change can't have focus jump on some later change
  const focusToggle = useRef<{ to: boolean; at: number } | null>(null)

  const toggle = () => {
    const next = !collapsed
    focusToggle.current = { to: next, at: Date.now() }
    if (!isControlled) setUncontrolledCollapsed(next)
    onCollapsedChange?.(next)
  }

  useEffect(() => {
    const request = focusToggle.current
    focusToggle.current = null
    if (!request || request.to !== collapsed || Date.now() - request.at > 1000) return
    const slot = collapsed ? expandSlot.current : collapseSlot.current
    slot?.querySelector('button')?.focus()
  }, [collapsed])

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

  // The header content keeps its expanded layout: it fades out in the rail rather than turning into
  // a rail version of itself mid-move
  const headerContext: SidebarNavContextValue = { ...context, collapsed: false }

  return (
    <SidebarNavContext.Provider value={context}>
      <Nav
        ref={navRef}
        aria-label={label}
        $width={collapsed ? widths.rail : widths[width]}
        data-collapsed={collapsed || undefined}
        data-testid={dataTestId}
        style={{ [EXPANDED_WIDTH_VAR]: widths[width] } as React.CSSProperties}
      >
        {(header || collapsible) && (
          <Header>
            {header && (
              <HeaderContent $hidden={collapsed}>
                <div>
                  <SidebarNavContext.Provider value={headerContext}>{header}</SidebarNavContext.Provider>
                </div>
              </HeaderContent>
            )}
            {collapsible && (
              <>
                <CollapseSlot ref={collapseSlot} $hidden={collapsed}>
                  <Tooltip text="Collapse sidebar" side="bottom">
                    <IconButton
                      variant="naked"
                      size="small"
                      iconName="sidebar"
                      aria-label="Collapse sidebar"
                      aria-expanded
                      onClick={toggle}
                    />
                  </Tooltip>
                </CollapseSlot>
                <ExpandSlot ref={expandSlot} $hidden={!collapsed}>
                  <Tooltip text="Expand sidebar" side="right">
                    <IconButton
                      variant="naked"
                      size="small"
                      iconName="sidebar"
                      aria-label="Expand sidebar"
                      aria-expanded={false}
                      onClick={toggle}
                    />
                  </Tooltip>
                </ExpandSlot>
              </>
            )}
          </Header>
        )}
        <Body ref={bodyRef}>
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
        {footer && (
          <Footer $hidden={collapsed}>
            <div>{footer}</div>
          </Footer>
        )}
      </Nav>
    </SidebarNavContext.Provider>
  )
}

SidebarNav.displayName = 'SidebarNav'
