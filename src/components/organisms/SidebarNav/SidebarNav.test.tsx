import React, { useState } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SidebarNav, type SidebarNavProps } from './SidebarNav'
import { SidebarNavItem } from '../../molecules/SidebarNavItem'
import { SidebarNavSection } from '../../molecules/SidebarNavSection'
import { Button } from '../../atoms/Button'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const { width } = tokens.component.sidebarNav

function Example(props: Partial<SidebarNavProps>) {
  return (
    <SidebarNav label="Main" header={<span>Creamery Ops</span>} footer={<Button variant="secondary">Upgrade</Button>} {...props}>
      <SidebarNavItem label="New chat" icon="edit" onClick={() => {}} />
      <SidebarNavItem label="Home" icon="home" url="/" current />
      <SidebarNavItem label="Invite users" icon="userBox" url="/invite" meta="3/10" />
      <SidebarNavSection label="Chats" collapsible>
        <SidebarNavItem label="Supplier records" url="/chats/1" />
        <SidebarNavItem label="Flavour page ticket" icon="message" url="/chats/2" />
      </SidebarNavSection>
    </SidebarNav>
  )
}

const nav = () => screen.getByRole('navigation', { name: 'Main' })
const highlight = () => nav().querySelector('[data-sidebar-highlight]') as HTMLElement

describe('SidebarNav', () => {
  describe('structure', () => {
    it('is a named navigation landmark with a header, body and footer', () => {
      render(<Example />)
      expect(nav()).toBeInTheDocument()
      expect(within(nav()).getByText('Creamery Ops')).toBeInTheDocument()
      expect(within(nav()).getByRole('button', { name: 'Upgrade' })).toBeInTheDocument()
    })

    it('is one list: items are its items, and a section is an item holding its own list', () => {
      render(<Example />)
      const [body, chats] = within(nav()).getAllByRole('list')
      expect(Array.from(body.children).every((child) => child.tagName === 'LI')).toBe(true)
      expect(body.children).toHaveLength(4)
      expect(screen.getByRole('list', { name: 'Chats' })).toBe(chats)
    })

    it('keeps valid list markup when items and sections are wrapped in a component or Fragment', async () => {
      function Wrapped() {
        return (
          <>
            <SidebarNavItem label="Home" icon="home" url="/" />
            <SidebarNavSection label="Chats">
              <SidebarNavItem label="Supplier records" url="/chats/1" />
            </SidebarNavSection>
          </>
        )
      }
      const { container } = render(<SidebarNav label="Main"><Wrapped /></SidebarNav>)
      const body = within(nav()).getAllByRole('list')[0]
      expect(Array.from(body.children).map((child) => child.tagName)).toEqual(['LI', 'LI'])
      expect(await axe(container)).toHaveNoViolations()
    })

    it('marks the current page', () => {
      render(<Example />)
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    })

    it('passes its linkComponent to every item (0008)', () => {
      const RouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
        ({ children, ...props }, ref) => (
          <a ref={ref} data-router="" {...props}>
            {children}
          </a>
        )
      )
      RouterLink.displayName = 'RouterLink'
      render(<Example linkComponent={RouterLink} />)
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-router')
      expect(screen.getByRole('link', { name: 'Supplier records' })).toHaveAttribute('data-router')
    })
  })

  describe('width', () => {
    it.each(['narrow', 'default', 'wide'] as const)('takes the %s width from its token', (step) => {
      render(<Example width={step} />)
      expect(nav()).toHaveStyle({ width: width[step] })
    })

    it("keeps its width in a flex layout instead of shrinking", () => {
      render(<Example />)
      expect(nav()).toHaveStyle({ flexShrink: '0' })
    })

    it('sits on the page background with no edge or fill (P1, issue 348)', () => {
      render(<Example />)
      expect(getComputedStyle(nav()).borderRightStyle).toMatch(/^(none|)$/)
      expect(getComputedStyle(nav()).backgroundColor).toMatch(/^(rgba\(0, 0, 0, 0\)|transparent|)$/)
    })
  })

  describe('collapsing', () => {
    it('collapses to the rail with a toggle that says what it will do', async () => {
      const user = userEvent.setup()
      const onCollapsedChange = jest.fn()
      render(<Example onCollapsedChange={onCollapsedChange} />)
      const toggle = screen.getByRole('button', { name: 'Collapse sidebar' })
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await user.click(toggle)
      expect(onCollapsedChange).toHaveBeenCalledWith(true)
      expect(nav()).toHaveStyle({ width: width.rail })
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute('aria-expanded', 'false')
    })

    it('shows icon rows only in the rail, and hides the footer', () => {
      render(<Example defaultCollapsed />)
      expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-label', 'Home')
      expect(screen.queryByRole('link', { name: 'Supplier records' })).not.toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Flavour page ticket' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Upgrade' })).not.toBeInTheDocument()
    })

    it('swaps the header for the expand toggle in the rail, the two toggles cross-fading in place', async () => {
      const user = userEvent.setup()
      render(<Example />)
      expect(screen.queryByRole('button', { name: 'Expand sidebar' })).not.toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
      expect(screen.queryByRole('button', { name: 'Collapse sidebar' })).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toBeInTheDocument()
      // The header content fades out in the rail rather than unmounting
      expect(within(nav()).getByText('Creamery Ops')).not.toBeVisible()
    })

    it('moves focus to the toggle now shown, so focus is never lost', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.tab()
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(screen.getByRole('button', { name: 'Collapse sidebar' })).toHaveFocus()
    })

    it("doesn't move focus later when a controlled parent declined the change", async () => {
      const user = userEvent.setup()
      const { rerender } = render(<Example collapsed={false} onCollapsedChange={() => {}} />)
      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
      // The parent declined: still expanded. Later it collapses for its own reason, with focus elsewhere
      const outside = document.createElement('button')
      document.body.append(outside)
      outside.focus()
      jest.spyOn(Date, 'now').mockReturnValue(Date.now() + 5000)
      rerender(<Example collapsed onCollapsedChange={() => {}} />)
      expect(outside).toHaveFocus()
      jest.restoreAllMocks()
      outside.remove()
    })

    it('keeps every row element when it collapses, so nothing remounts mid-move', async () => {
      const user = userEvent.setup()
      render(<Example />)
      const home = screen.getByRole('link', { name: 'Home' })
      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
      expect(screen.getByRole('link', { name: 'Home' })).toBe(home)
    })

    it('can be controlled', async () => {
      const user = userEvent.setup()
      function Controlled() {
        const [collapsed, setCollapsed] = useState(true)
        return <Example collapsed={collapsed} onCollapsedChange={setCollapsed} />
      }
      render(<Controlled />)
      expect(nav()).toHaveStyle({ width: width.rail })
      await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
      expect(nav()).toHaveStyle({ width: width.default })
    })

    it('has no toggle and never collapses when it isn\'t collapsible, as inside a Sheet', () => {
      render(<Example collapsible={false} defaultCollapsed />)
      expect(screen.queryByRole('button', { name: /sidebar/ })).not.toBeInTheDocument()
      expect(nav()).toHaveStyle({ width: width.default })
    })
  })

  describe('the gliding highlight (0053)', () => {
    it('moves to the hovered row', () => {
      render(<Example />)
      expect(highlight()).toHaveStyle({ opacity: '0' })
      fireEvent.pointerOver(screen.getByRole('link', { name: /Invite users/ }))
      expect(highlight()).toHaveStyle({ opacity: '1' })
      expect(highlight().style.transform).toMatch(/^translate\(/)
    })

    it('steps aside for the current page, and hides when the pointer leaves', () => {
      render(<Example />)
      fireEvent.pointerOver(screen.getByRole('link', { name: /Invite users/ }))
      fireEvent.pointerOver(screen.getByRole('link', { name: 'Home' }))
      expect(highlight()).toHaveStyle({ opacity: '0' })
      fireEvent.pointerOver(screen.getByRole('link', { name: /Invite users/ }))
      fireEvent.pointerLeave(highlight().parentElement as HTMLElement)
      expect(highlight()).toHaveStyle({ opacity: '0' })
    })

    it('hides when the nav collapses, since every row moves', async () => {
      const user = userEvent.setup()
      render(<Example />)
      fireEvent.pointerOver(screen.getByRole('link', { name: /Invite users/ }))
      expect(highlight()).toHaveStyle({ opacity: '1' })
      await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
      expect(highlight()).toHaveStyle({ opacity: '0' })
    })

    it('follows keyboard focus', async () => {
      const user = userEvent.setup()
      render(<SidebarNav label="Main" collapsible={false}><SidebarNavItem label="Invite users" url="/invite" /></SidebarNav>)
      await user.tab()
      expect(screen.getByRole('link', { name: 'Invite users' })).toHaveFocus()
      expect(highlight()).toHaveStyle({ opacity: '1' })
      await user.tab()
      expect(highlight()).toHaveStyle({ opacity: '0' })
    })

    it('is hidden from assistive technology', () => {
      render(<Example />)
      expect(highlight()).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('reaches every control with Tab, in order', async () => {
    const user = userEvent.setup()
    render(<Example />)
    for (const name of ['Collapse sidebar', 'New chat', 'Home', 'Invite users', 'Chats']) {
      await user.tab()
      expect(document.activeElement).toHaveAccessibleName(new RegExp(`^${name}`))
    }
  })

  it('has no axe violations, expanded or in the rail', async () => {
    const { container, unmount } = render(<Example />)
    expect(await axe(container)).toHaveNoViolations()
    unmount()
    const rail = render(<Example defaultCollapsed />)
    expect(await axe(rail.container)).toHaveNoViolations()
  })
})
