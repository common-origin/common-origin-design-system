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

    it('puts top-level items in a list, and keeps sections as their own lists', () => {
      render(<Example />)
      const lists = within(nav()).getAllByRole('list')
      expect(lists).toHaveLength(2)
      expect(within(lists[0]).getAllByRole('listitem')).toHaveLength(3)
      expect(screen.getByRole('list', { name: 'Chats' })).toBe(lists[1])
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

    it('draws a thin edge on the page background, with no fill (P1)', () => {
      render(<Example />)
      expect(nav()).toHaveStyle({ borderRight: tokens.semantic.border.default })
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
