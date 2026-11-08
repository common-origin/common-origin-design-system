import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeMenu } from './ThemeMenu'
import { ThemedLogo } from './ThemedLogo'
import { THEME_STORAGE_KEY, themeScript } from './theme'

// The docs site's theme picker and logo (#360)

let systemDark = false
const listeners = new Set<() => void>()

beforeEach(() => {
  systemDark = false
  listeners.clear()
  window.localStorage.clear()
  document.documentElement.setAttribute('data-co-theme', 'light')
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string) => ({
      get matches() {
        return query.includes('dark') && systemDark
      },
      media: query,
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    }),
  })
})

const theme = () => document.documentElement.getAttribute('data-co-theme')

describe('the head script', () => {
  it('applies a stored choice, and otherwise the system setting', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    new Function(themeScript)()
    expect(theme()).toBe('dark')

    window.localStorage.setItem(THEME_STORAGE_KEY, 'system')
    systemDark = false
    new Function(themeScript)()
    expect(theme()).toBe('light')

    systemDark = true
    new Function(themeScript)()
    expect(theme()).toBe('dark')
  })
})

describe('ThemeMenu', () => {
  it('opens on the first click and applies and remembers the choice', async () => {
    const user = userEvent.setup()
    render(<ThemeMenu />)
    await user.click(screen.getByRole('button', { name: 'Theme' }))
    expect(screen.getByRole('menuitemradio', { name: /System/ })).toHaveAttribute('aria-checked', 'true')

    await user.click(screen.getByRole('menuitemradio', { name: /Dark/ }))
    expect(theme()).toBe('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('keeps every menu on the page in step', async () => {
    const user = userEvent.setup()
    render(
      <>
        <div data-testid="first"><ThemeMenu /></div>
        <div data-testid="second"><ThemeMenu /></div>
      </>
    )
    const [first, second] = screen.getAllByRole('button', { name: 'Theme' })
    await user.click(first)
    await user.click(screen.getByRole('menuitemradio', { name: /Light/ }))
    await user.click(second)
    // The first menu may still be leaving; every Light item on the page is checked
    for (const item of screen.getAllByRole('menuitemradio', { name: /Light/ })) {
      expect(item).toHaveAttribute('aria-checked', 'true')
    }
  })

  it('follows the system setting while on System', async () => {
    const user = userEvent.setup()
    render(<ThemeMenu />)
    await user.click(screen.getByRole('button', { name: 'Theme' }))
    await user.click(screen.getByRole('menuitemradio', { name: /System/ }))
    expect(theme()).toBe('light')
    systemDark = true
    listeners.forEach((listener) => listener())
    expect(theme()).toBe('dark')
  })
})

describe('ThemedLogo', () => {
  it('names the logo in both themes, so a link around it always has a name', () => {
    render(<ThemedLogo alt="Common Origin Logo" />)
    const images = screen.getAllByAltText('Common Origin Logo')
    expect(images.map((image) => image.getAttribute('src'))).toEqual(['/assets/logo/co-logo.svg', '/assets/logo/co-logo-white.svg'])
  })

  it('uses the white logo in light on an inverse fill', () => {
    render(<ThemedLogo tone="inverse" alt="Logo" />)
    expect(screen.getAllByAltText('Logo')[0]).toHaveAttribute('src', '/assets/logo/co-logo-white.svg')
  })
})
