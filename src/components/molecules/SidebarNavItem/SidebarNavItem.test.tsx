import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SidebarNavItem, type SidebarNavItemProps } from './SidebarNavItem'
import { SidebarNavContext, type SidebarNavContextValue } from './SidebarNavContext'
import { pseudoClassDeclarations } from '@/test-utils/contrast'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const renderItem = (props: Partial<SidebarNavItemProps> = {}, context: Partial<SidebarNavContextValue> = {}) =>
  render(
    <SidebarNavContext.Provider value={{ collapsed: false, glide: false, ...context }}>
      <ul>
        <SidebarNavItem label="Home" icon="home" url="/home" {...props} />
      </ul>
    </SidebarNavContext.Provider>
  )

// A stand-in router link: renders an <a> and marks it, as Next's or React Router's Link would
const RouterLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ children, ...props }, ref) => (
    <a ref={ref} data-router="" {...props}>
      {children}
    </a>
  )
)
RouterLink.displayName = 'RouterLink'

describe('SidebarNavItem', () => {
  describe('links and buttons', () => {
    it('is a link with a url, in a list item', () => {
      renderItem()
      const link = screen.getByRole('link', { name: 'Home' })
      expect(link).toHaveAttribute('href', '/home')
      expect(link.closest('li')).not.toBeNull()
    })

    it('marks the current page and gives it the selected treatment (0016, 0030)', () => {
      renderItem({ current: true })
      const link = screen.getByRole('link', { name: 'Home' })
      expect(link).toHaveAttribute('aria-current', 'page')
      expect(link).toHaveStyle({ backgroundColor: tokens.semantic.color.fill['accent-muted'] })
    })

    it('uses the linkComponent from SidebarNav for internal URLs, relative ones included (0008)', () => {
      const internal = ['/home', 'settings', './chats', '#top']
      internal.forEach((url) => {
        const { unmount } = renderItem({ url }, { linkComponent: RouterLink })
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-router')
        unmount()
      })
      ;['https://example.com', '//cdn.example.com', 'mailto:hello@example.com'].forEach((url) => {
        const { unmount } = renderItem({ url }, { linkComponent: RouterLink })
        expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('data-router')
        unmount()
      })
    })

    it('is a button without a url', async () => {
      const user = userEvent.setup()
      const onClick = jest.fn()
      renderItem({ url: undefined, label: 'New chat', icon: 'edit', onClick })
      await user.click(screen.getByRole('button', { name: 'New chat' }))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it("doesn't mark a button item as the current page", () => {
      renderItem({ url: undefined, label: 'New chat', icon: 'edit', current: true })
      expect(screen.getByRole('button', { name: 'New chat' })).not.toHaveAttribute('aria-current')
    })
  })

  describe('content', () => {
    it('shows meta as quiet text at the end', () => {
      renderItem({ label: 'Invite users', meta: '3/10' })
      expect(screen.getByText('3/10')).toHaveStyle({ color: tokens.semantic.color.text.muted })
    })

    it('shows a badge on the icon and adds it to the name (0045)', () => {
      renderItem({ label: 'Chats', badge: 3, badgeLabel: '3 unread' })
      expect(screen.getByRole('link', { name: 'Chats, 3 unread' })).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('names a dot badge "new" by default, and shows nothing for a zero count', () => {
      const { unmount } = renderItem({ label: 'Chats', badge: 'dot' })
      expect(screen.getByRole('link', { name: 'Chats, new' })).toBeInTheDocument()
      unmount()
      renderItem({ label: 'Chats', badge: 0 })
      expect(screen.getByRole('link', { name: 'Chats' })).toBeInTheDocument()
    })

    it('truncates a long label to one line; the full label stays its name', () => {
      const label = 'Urgent to-dos this morning before the supplier call'
      renderItem({ label })
      expect(screen.getByText(label)).toHaveStyle({ whiteSpace: 'nowrap', textOverflow: 'ellipsis' })
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })

    it('takes its height from the dense row token (0051)', () => {
      renderItem()
      expect(screen.getByRole('link', { name: 'Home' })).toHaveStyle({ minHeight: tokens.semantic.size.row.sm })
    })
  })

  describe('in the rail', () => {
    it('shows the icon only, named by its label, with the label in a tooltip', async () => {
      const user = userEvent.setup()
      renderItem({}, { collapsed: true })
      const link = screen.getByRole('link', { name: 'Home' })
      expect(link).toHaveAttribute('aria-label', 'Home')
      expect(screen.queryByText('Home')).not.toBeInTheDocument()
      await user.tab()
      expect(screen.getByText('Home')).toHaveAttribute('aria-hidden', 'true')
    })

    it('keeps its badge, and says so in its name', () => {
      renderItem({ label: 'Chats', badge: 2, badgeLabel: '2 unread' }, { collapsed: true })
      expect(screen.getByRole('link', { name: 'Chats, 2 unread' })).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('hides an item without an icon', () => {
      renderItem({ icon: undefined, label: 'Supplier records' }, { collapsed: true })
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  it("leaves hover to SidebarNav's gliding highlight when it draws one (0053)", () => {
    const { unmount } = renderItem({}, { glide: true })
    expect(pseudoClassDeclarations(screen.getByRole('link', { name: 'Home' }), ':hover:not(:active)')).toContain(
      'background-color:transparent;'
    )
    unmount()
    renderItem({ current: true }, { glide: true })
    expect(pseudoClassDeclarations(screen.getByRole('link', { name: 'Home' }), ':hover:not(:active)')).toBe('')
  })

  it('has no axe violations, expanded or in the rail', async () => {
    const { container, unmount } = renderItem({ current: true, meta: '3/10', badge: 4 })
    expect(await axe(container)).toHaveNoViolations()
    unmount()
    const rail = renderItem({}, { collapsed: true })
    expect(await axe(rail.container)).toHaveNoViolations()
  })
})
