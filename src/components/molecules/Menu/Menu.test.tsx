import { useState } from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Menu, MenuDivider, MenuGroup, MenuItem, MenuItemCheckbox, MenuItemRadio } from './Menu'
import { Button } from '../../atoms/Button'
import { Tooltip } from '../../atoms/Tooltip'
import { IconButton } from '../../atoms/IconButton'
import { Avatar } from '../../atoms/Avatar'
import tokens from '@/styles/tokens.json'

expect.extend(toHaveNoViolations)

const closed = () => waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())

function Example({ onRename = jest.fn(), onDelete = jest.fn() }: { onRename?: () => void; onDelete?: () => void }) {
  const [workspace, setWorkspace] = useState('ops')
  const [archived, setArchived] = useState(false)
  return (
    <>
      <Menu trigger={<Button variant="secondary">Options</Button>} data-testid="menu">
        <MenuGroup label="Workspaces">
          <MenuItemRadio checked={workspace === 'ops'} onSelect={() => setWorkspace('ops')} description="Pro plan">
            Creamery Ops
          </MenuItemRadio>
          <MenuItemRadio checked={workspace === 'lab'} onSelect={() => setWorkspace('lab')}>
            Flavour Lab
          </MenuItemRadio>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItemCheckbox checked={archived} onCheckedChange={setArchived}>
            Show archived
          </MenuItemCheckbox>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onSelect={onRename} shortcut={{ label: '⌘R', keys: 'Meta+R' }}>
          Rename
        </MenuItem>
        <MenuItem disabled>Duplicate</MenuItem>
        <MenuItem destructive onSelect={onDelete}>
          Delete
        </MenuItem>
      </Menu>
      <button type="button">After</button>
      <p data-testid="state">
        {workspace} {String(archived)}
      </p>
    </>
  )
}

const trigger = () => screen.getByRole('button', { name: 'Options' })

describe('Menu', () => {
  describe('the trigger', () => {
    it('announces the menu it controls', async () => {
      const user = userEvent.setup()
      render(<Example />)
      expect(trigger()).toHaveAttribute('aria-haspopup', 'menu')
      expect(trigger()).toHaveAttribute('aria-expanded', 'false')
      await user.click(trigger())
      const menu = screen.getByRole('menu', { name: 'Options' })
      expect(trigger()).toHaveAttribute('aria-expanded', 'true')
      expect(trigger()).toHaveAttribute('aria-controls', menu.id)
    })

    it('opens on click with the first item focused, and closes on a second click', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      expect(screen.getByRole('menuitemradio', { name: /Creamery Ops/ })).toHaveFocus()
      await user.click(trigger())
      await closed()
    })

    it('opens with Arrow Down on the first item and Arrow Up on the last', async () => {
      const user = userEvent.setup()
      render(<Example />)
      trigger().focus()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('menuitemradio', { name: /Creamery Ops/ })).toHaveFocus()
      await user.keyboard('{Escape}')
      await closed()
      await user.keyboard('{ArrowUp}')
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()
    })

    it('reaches the real control when the trigger is wrapped in a Tooltip', async () => {
      const user = userEvent.setup()
      render(
        <Menu
          trigger={
            <Tooltip text="More">
              <IconButton variant="naked" iconName="meatballs" aria-label="More" />
            </Tooltip>
          }
        >
          <MenuItem>Rename</MenuItem>
        </Menu>
      )
      const button = screen.getByRole('button', { name: 'More' })
      expect(button).toHaveAttribute('aria-haspopup', 'menu')
      await user.click(button)
      expect(screen.getByRole('menu', { name: 'More' })).toBeInTheDocument()
    })
  })

  describe('keyboard', () => {
    it('moves with the arrow keys, wrapping, and with Home and End', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      await user.keyboard('{ArrowUp}')
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()
      await user.keyboard('{ArrowDown}')
      expect(screen.getByRole('menuitemradio', { name: /Creamery Ops/ })).toHaveFocus()
      await user.keyboard('{End}')
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()
      await user.keyboard('{Home}')
      expect(screen.getByRole('menuitemradio', { name: /Creamery Ops/ })).toHaveFocus()
    })

    it('jumps to an item by typing the start of its label', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      await user.keyboard('re')
      expect(screen.getByRole('menuitem', { name: /Rename/ })).toHaveFocus()
      await user.keyboard('{Home}')
      await new Promise((resolve) => setTimeout(resolve, 600))
      await user.keyboard('d')
      expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus()
    })

    it('matches typeahead against the label alone, not a leading Avatar or the description', async () => {
      const user = userEvent.setup()
      render(
        <Menu trigger={<Button variant="secondary">Workspace</Button>}>
          <MenuGroup label="Workspaces">
            <MenuItemRadio checked icon={<Avatar name="Creamery Ops" size="xs" />} description="Pro plan">
              Creamery Ops
            </MenuItemRadio>
            <MenuItemRadio checked={false} icon={<Avatar name="Flavour Lab" size="xs" />}>
              Flavour Lab
            </MenuItemRadio>
          </MenuGroup>
        </Menu>
      )
      await user.click(screen.getByRole('button', { name: 'Workspace' }))
      await user.keyboard('fla')
      expect(screen.getByRole('menuitemradio', { name: /Flavour Lab/ })).toHaveFocus()
    })

    it('activates an item with Enter, closes, and returns focus to the trigger', async () => {
      const user = userEvent.setup()
      const onRename = jest.fn()
      render(<Example onRename={onRename} />)
      await user.click(trigger())
      await user.keyboard('{End}{ArrowUp}{ArrowUp}{Enter}')
      expect(onRename).toHaveBeenCalledTimes(1)
      await closed()
      expect(trigger()).toHaveFocus()
    })

    it('closes on Escape, returning focus, without the key reaching anything else', async () => {
      const user = userEvent.setup()
      const onDocumentKeyDown = jest.fn()
      document.addEventListener('keydown', onDocumentKeyDown)
      render(<Example />)
      await user.click(trigger())
      await user.keyboard('{Escape}')
      await closed()
      expect(trigger()).toHaveFocus()
      expect(onDocumentKeyDown.mock.calls.filter(([event]) => event.key === 'Escape')).toHaveLength(0)
      document.removeEventListener('keydown', onDocumentKeyDown)
    })

    it('closes on Tab without pulling focus back to the trigger', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      await user.tab()
      await closed()
      expect(trigger()).not.toHaveFocus()
    })
  })

  describe('placement', () => {
    it('closes when the page scrolls, since the trigger moves away', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      fireEvent.scroll(window)
      await closed()
    })

    it("doesn't close when the menu itself scrolls", async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      fireEvent.scroll(screen.getByRole('menu'))
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('can be at least as wide as its trigger, within the usual range (issue 350)', async () => {
      const user = userEvent.setup()
      const { unmount } = render(
        <Menu matchTriggerWidth trigger={<Button variant="secondary">Options</Button>}>
          <MenuItem>Rename</MenuItem>
        </Menu>
      )
      jest.spyOn(trigger(), 'getBoundingClientRect').mockReturnValue({ width: 240, height: 32, top: 0, left: 0, right: 240, bottom: 32, x: 0, y: 0, toJSON: () => ({}) })
      await user.click(trigger())
      expect(screen.getByRole('menu').style.getPropertyValue('--co-floating-anchor-width')).toBe('240px')
      expect(getComputedStyle(screen.getByRole('menu')).minWidth).toContain('--co-floating-anchor-width')
      unmount()
    })

    it("sizes to its content alone by default, whatever its trigger's width", async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      expect(screen.getByRole('menu').style.getPropertyValue('--co-floating-anchor-width')).toBe('')
    })

    it("doesn't take focus when it starts open", () => {
      const { rerender } = render(<input aria-label="Search" />)
      screen.getByRole('textbox', { name: 'Search' }).focus()
      rerender(
        <>
          <input aria-label="Search" />
          <Menu defaultOpen trigger={<Button variant="secondary">Options</Button>}>
            <MenuItem>Rename</MenuItem>
          </Menu>
        </>
      )
      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: 'Search' })).toHaveFocus()
    })
  })

  describe('pointer', () => {
    it('closes when pressed outside', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      await user.click(screen.getByTestId('state'))
      await closed()
    })

    it('runs an action on click and closes', async () => {
      const user = userEvent.setup()
      const onDelete = jest.fn()
      render(<Example onDelete={onDelete} />)
      await user.click(trigger())
      await user.click(screen.getByRole('menuitem', { name: 'Delete' }))
      expect(onDelete).toHaveBeenCalledTimes(1)
      await closed()
    })
  })

  describe('item kinds', () => {
    it('marks the checked radio item, with a checkmark, and closes when one is chosen', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      const ops = screen.getByRole('menuitemradio', { name: /Creamery Ops/ })
      const lab = screen.getByRole('menuitemradio', { name: 'Flavour Lab' })
      expect(ops).toHaveAttribute('aria-checked', 'true')
      expect(lab).toHaveAttribute('aria-checked', 'false')
      expect(ops.querySelector('svg')).not.toBeNull()
      await user.click(lab)
      await closed()
      expect(screen.getByTestId('state')).toHaveTextContent('lab false')
    })

    it('toggles a checkbox item and stays open', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Show archived' }))
      expect(screen.getByRole('menuitemcheckbox', { name: 'Show archived' })).toHaveAttribute('aria-checked', 'true')
      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(screen.getByTestId('state')).toHaveTextContent('ops true')
    })

    it('keeps a disabled item focusable but inactive', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      const duplicate = screen.getByRole('menuitem', { name: 'Duplicate' })
      expect(duplicate).toHaveAttribute('aria-disabled', 'true')
      await user.keyboard('{End}{ArrowUp}')
      expect(duplicate).toHaveFocus()
      await user.keyboard('{Enter}')
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('shows a destructive item in the danger colour', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveStyle({ color: tokens.semantic.color.text.danger })
    })

    it('exposes a shortcut with aria-keyshortcuts and hides its display text', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      const rename = screen.getByRole('menuitem', { name: 'Rename' })
      expect(rename).toHaveAttribute('aria-keyshortcuts', 'Meta+R')
      expect(within(rename).getByText('⌘R')).toHaveAttribute('aria-hidden', 'true')
    })

    it('sizes items to the dense row height (decision 0051)', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveStyle({ minHeight: tokens.semantic.size.row.sm })
    })
  })

  describe('structure', () => {
    it('names a group by its visible label and separates groups', async () => {
      const user = userEvent.setup()
      render(<Example />)
      await user.click(trigger())
      expect(screen.getByRole('group', { name: 'Workspaces' })).toBeInTheDocument()
      expect(screen.getAllByRole('separator')).toHaveLength(2)
    })

    it('can be controlled', async () => {
      const user = userEvent.setup()
      const onOpenChange = jest.fn()
      const { rerender } = render(
        <Menu open={false} onOpenChange={onOpenChange} trigger={<Button variant="secondary">Options</Button>}>
          <MenuItem>Rename</MenuItem>
        </Menu>
      )
      await user.click(trigger())
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      rerender(
        <Menu open onOpenChange={onOpenChange} trigger={<Button variant="secondary">Options</Button>}>
          <MenuItem>Rename</MenuItem>
        </Menu>
      )
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('throws when an item is used outside a Menu', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {})
      expect(() => render(<MenuItem>Orphan</MenuItem>)).toThrow('MenuItem must be used inside a Menu')
      jest.restoreAllMocks()
    })
  })

  it('has no axe violations when open', async () => {
    const user = userEvent.setup()
    const { container } = render(<Example />)
    await user.click(trigger())
    expect(await axe(container)).toHaveNoViolations()
  })
})
