import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { WorkspaceSwitcher, type WorkspaceSwitcherProps } from './WorkspaceSwitcher'
import { MenuItem } from '../Menu'
import { SidebarNavContext } from '../SidebarNavItem/SidebarNavContext'

expect.extend(toHaveNoViolations)

const workspaces = [
  { id: 'ops', name: 'Creamery Ops', description: 'Pro plan' },
  { id: 'lab', name: 'Flavour Lab', description: 'Free plan' },
]

function Switcher({ collapsed = false, ...props }: Partial<WorkspaceSwitcherProps> & { collapsed?: boolean }) {
  const [value, setValue] = useState('ops')
  return (
    <SidebarNavContext.Provider value={{ collapsed, glide: false }}>
      <WorkspaceSwitcher workspaces={workspaces} value={value} onChange={setValue} {...props} />
    </SidebarNavContext.Provider>
  )
}

const closed = () => waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())

describe('WorkspaceSwitcher', () => {
  it('names its trigger with the current workspace, not its Avatar, and opens a menu', async () => {
    const user = userEvent.setup()
    render(<Switcher />)
    const trigger = screen.getByRole('button', { name: 'Creamery Ops' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    await user.click(trigger)
    expect(screen.getByRole('menu', { name: 'Creamery Ops' })).toBeInTheDocument()
  })

  it('lists the workspaces as a labelled radio group, the current one checked', async () => {
    const user = userEvent.setup()
    render(<Switcher />)
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    const group = screen.getByRole('group', { name: 'Workspaces' })
    expect(group).toBeInTheDocument()
    expect(screen.getByRole('menuitemradio', { name: /Creamery Ops/ })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menuitemradio', { name: /Flavour Lab/ })).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByText('Pro plan')).toBeInTheDocument()
  })

  it('calls onChange and closes when a workspace is chosen', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<WorkspaceSwitcher workspaces={workspaces} value="ops" onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    await user.click(screen.getByRole('menuitemradio', { name: /Flavour Lab/ }))
    expect(onChange).toHaveBeenCalledWith('lab')
    await closed()
  })

  it('shows the new workspace once it changes', async () => {
    const user = userEvent.setup()
    render(<Switcher />)
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    await user.click(screen.getByRole('menuitemradio', { name: /Flavour Lab/ }))
    expect(screen.getByRole('button', { name: 'Flavour Lab' })).toBeInTheDocument()
  })

  it('puts actions after the workspaces, past a divider', async () => {
    const user = userEvent.setup()
    const onCreate = jest.fn()
    render(
      <Switcher label="Teams">
        <MenuItem onSelect={onCreate}>Create workspace</MenuItem>
      </Switcher>
    )
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    expect(screen.getByRole('group', { name: 'Teams' })).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
    await user.click(screen.getByRole('menuitem', { name: 'Create workspace' }))
    expect(onCreate).toHaveBeenCalledTimes(1)
  })

  it('shows only the Avatar in the rail, named by the workspace, with a tooltip', async () => {
    const user = userEvent.setup()
    render(<Switcher collapsed />)
    const trigger = screen.getByRole('button', { name: 'Creamery Ops' })
    expect(trigger).toHaveAttribute('aria-label', 'Creamery Ops')
    expect(screen.queryByText('Creamery Ops')).not.toBeInTheDocument()
    await user.tab()
    expect(screen.getByText('Creamery Ops')).toHaveAttribute('aria-hidden', 'true')
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it("doesn't call onChange when the current workspace is chosen again", async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(<WorkspaceSwitcher workspaces={workspaces} value="ops" onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    await user.click(screen.getByRole('menuitemradio', { name: /Creamery Ops/ }))
    expect(onChange).not.toHaveBeenCalled()
    await closed()
  })

  it('warns and shows the first workspace when value matches none, and renders nothing without workspaces', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const { unmount } = render(<WorkspaceSwitcher workspaces={workspaces} value="gone" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Creamery Ops' })).toBeInTheDocument()
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"gone"'))
    warn.mockRestore()
    unmount()
    const { container } = render(<WorkspaceSwitcher workspaces={[]} value="" onChange={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('has no axe violations, closed or open', async () => {
    const user = userEvent.setup()
    const { container } = render(<Switcher />)
    expect(await axe(container)).toHaveNoViolations()
    await user.click(screen.getByRole('button', { name: 'Creamery Ops' }))
    expect(await axe(container)).toHaveNoViolations()
  })
})
