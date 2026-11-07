import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Sheet, SidebarNav, SidebarNavItem, SidebarNavSection } from '../components'
import tokens from '@/styles/tokens.json'

const { base: { breakpoint }, semantic: { space, border, surface, layer } } = tokens

export interface DocsSidebarItem {
  id: string
  label: string
  url: string
}

export interface DocsSidebarSection {
  /** A section label, or none for items that sit at the top */
  label?: string
  items: DocsSidebarItem[]
}

interface DocsSidebarProps {
  /** Names the nav, such as "Components" */
  label: string
  sections: DocsSidebarSection[]
  /** The id of the page being shown */
  currentId: string
}

// Sticky beside the page on wide screens; hidden on narrow ones, where the Sheet takes over
const Desktop = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;

  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const Mobile = styled.div`
  display: none;

  @media (max-width: ${breakpoint.md}) {
    display: block;
    padding: ${space[400]};
    background-color: ${surface.raised};
    border-bottom: ${border.default};
    position: sticky;
    top: 0;
    z-index: ${layer.sticky};
  }
`

function Body({
  sections,
  currentId,
  onNavigate,
}: Pick<DocsSidebarProps, 'sections' | 'currentId'> & { onNavigate?: () => void }) {
  return (
    <>
      {sections.map((section, index) =>
        section.label ? (
          <SidebarNavSection key={section.label} label={section.label} collapsible>
            {section.items.map((item) => (
              <SidebarNavItem key={item.id} label={item.label} url={item.url} current={item.id === currentId} onClick={onNavigate} />
            ))}
          </SidebarNavSection>
        ) : (
          section.items.map((item) => (
            <SidebarNavItem
              key={`${index}-${item.id}`}
              label={item.label}
              url={item.url}
              current={item.id === currentId}
              onClick={onNavigate}
            />
          ))
        )
      )}
    </>
  )
}

/**
 * The docs site's sidebar (#332): the system's own SidebarNav, with Next's Link for client-side
 * navigation, and a Sheet on small screens. Docs items have no icons, so it doesn't collapse.
 */
export function DocsSidebar({ label, sections, currentId }: DocsSidebarProps) {
  const desktopRef = useRef<HTMLDivElement>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  // Bring the current page's item into view, on load and whenever it changes, by scrolling the
  // nav's own body only (scrollIntoView would scroll the page too)
  useEffect(() => {
    const item = desktopRef.current?.querySelector<HTMLElement>('[aria-current="page"]')
    let body = item?.parentElement ?? null
    while (body && !(body.scrollHeight > body.clientHeight && getComputedStyle(body).overflowY === 'auto')) {
      body = body.parentElement
    }
    if (!item || !body) return
    const itemBox = item.getBoundingClientRect()
    const bodyBox = body.getBoundingClientRect()
    if (itemBox.top < bodyBox.top || itemBox.bottom > bodyBox.bottom) {
      body.scrollTop += itemBox.top - bodyBox.top - (bodyBox.height - itemBox.height) / 2
    }
  }, [currentId])

  const current = sections.flatMap((section) => section.items).find((item) => item.id === currentId)

  return (
    <>
      <Mobile>
        <Button variant="secondary" iconName="menu" onClick={() => setSheetOpen(true)}>
          {current ? current.label : label}
        </Button>
        <Sheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} position="left" title={label}>
          <SidebarNav label={label} collapsible={false} linkComponent={Link}>
            {/* Choosing a page closes the Sheet */}
            <Body sections={sections} currentId={currentId} onNavigate={() => setSheetOpen(false)} />
          </SidebarNav>
        </Sheet>
      </Mobile>
      <Desktop ref={desktopRef}>
        <SidebarNav label={label} collapsible={false} linkComponent={Link}>
          <Body sections={sections} currentId={currentId} />
        </SidebarNav>
      </Desktop>
    </>
  )
}
