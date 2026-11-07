import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SidebarNavSection, type SidebarNavSectionProps } from './SidebarNavSection'
import { SidebarNavItem } from '../SidebarNavItem'
import { SidebarNavContext } from '../SidebarNavItem/SidebarNavContext'
import { IconButton } from '../../atoms/IconButton'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const renderSection = (props: Partial<SidebarNavSectionProps> = {}, collapsed = false) =>
  render(
    <SidebarNavContext.Provider value={{ collapsed, glide: false }}>
      <SidebarNavSection label="Chats" {...props}>
        <SidebarNavItem label="Supplier records" url="/chats/1" />
        <SidebarNavItem label="Flavour page ticket" icon="message" url="/chats/2" />
      </SidebarNavSection>
    </SidebarNavContext.Provider>
  )

describe('SidebarNavSection', () => {
  it('names its list with its visible label', () => {
    renderSection()
    const list = screen.getByRole('list', { name: 'Chats' })
    expect(list.querySelectorAll('li')).toHaveLength(2)
    expect(screen.getByText('Chats')).toHaveStyle({ color: tokens.semantic.color.text.muted })
  })

  it('shows its action beside the label', () => {
    renderSection({ action: <IconButton variant="naked" size="small" iconName="search" aria-label="Search chats" /> })
    expect(screen.getByRole('button', { name: 'Search chats' })).toBeInTheDocument()
  })

  describe('collapsible', () => {
    it('turns the label into a disclosure button that controls the list', () => {
      renderSection({ collapsible: true })
      const toggle = screen.getByRole('button', { name: 'Chats' })
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      expect(toggle).toHaveAttribute('aria-controls', screen.getByRole('list', { name: 'Chats' }).id)
    })

    it('hides and shows the items, removing hidden ones from the keyboard and screen readers', async () => {
      const user = userEvent.setup()
      renderSection({ collapsible: true })
      const toggle = screen.getByRole('button', { name: 'Chats' })
      await user.click(toggle)
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(getComputedStyle(screen.getByRole('list', { hidden: true }).parentElement as HTMLElement).visibility).toBe('hidden')
      await user.keyboard('{Enter}')
      expect(toggle).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByRole('link', { name: 'Supplier records' })).toBeVisible()
    })

    it('can start hidden, or be controlled', async () => {
      const user = userEvent.setup()
      const { unmount } = renderSection({ collapsible: true, defaultExpanded: false })
      expect(screen.getByRole('button', { name: 'Chats' })).toHaveAttribute('aria-expanded', 'false')
      unmount()
      const onExpandedChange = jest.fn()
      function Controlled() {
        const [open, setOpen] = useState(true)
        return (
          <SidebarNavSection
            label="Chats"
            collapsible
            expanded={open}
            onExpandedChange={(next) => {
              onExpandedChange(next)
              setOpen(next)
            }}
          >
            <SidebarNavItem label="Supplier records" url="/chats/1" />
          </SidebarNavSection>
        )
      }
      render(<Controlled />)
      await user.click(screen.getByRole('button', { name: 'Chats' }))
      expect(onExpandedChange).toHaveBeenCalledWith(false)
      expect(screen.getByRole('button', { name: 'Chats' })).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('in the rail', () => {
    it('hides its label and action, keeps its list named, and draws a rule above', () => {
      renderSection(
        {
          collapsible: true,
          action: <IconButton variant="naked" size="small" iconName="search" aria-label="Search chats" />,
          'data-testid': 'section',
        },
        true
      )
      expect(screen.queryByRole('button', { name: 'Chats' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Search chats' })).not.toBeInTheDocument()
      expect(screen.getByRole('list', { name: 'Chats' })).toBeInTheDocument()
      expect(screen.getByTestId('section')).toHaveStyle({ borderTop: tokens.semantic.border.default })
      // Items without an icon are hidden in the rail; the one with an icon stays
      expect(screen.queryByRole('link', { name: 'Supplier records' })).not.toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Flavour page ticket' })).toBeInTheDocument()
    })
  })

  it('has no axe violations, static or collapsible', async () => {
    const { container, unmount } = renderSection()
    expect(await axe(container)).toHaveNoViolations()
    unmount()
    const collapsible = renderSection({ collapsible: true, action: <IconButton variant="naked" size="small" iconName="search" aria-label="Search chats" /> })
    expect(await axe(collapsible.container)).toHaveNoViolations()
  })
})
