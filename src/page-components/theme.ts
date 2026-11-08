import { useCallback, useEffect, useSyncExternalStore } from 'react'

// The docs site's colour theme (#360, decisions 0054 and 0056). The site follows the system
// setting unless the reader picks light or dark, and remembers that choice. It's applied as
// data-co-theme on <html>, which switches the [data-co-theme] blocks in tokens.css. Docs site
// only: the package never turns dark by itself, so a product decides this for itself.

export type ThemePreference = 'light' | 'dark' | 'system'
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'co-docs-theme'

const isPreference = (value: unknown): value is ThemePreference => value === 'light' || value === 'dark' || value === 'system'

/**
 * Runs in <head> before the page paints, so the first frame is already in the right theme. Kept
 * as a plain string: it can't import anything, and it must not throw where storage is blocked.
 */
export const themeScript = `(function () {
  var preference = 'system'
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}')
    if (stored === 'light' || stored === 'dark' || stored === 'system') preference = stored
  } catch (e) {}
  var dark = preference === 'dark' || (preference === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-co-theme', dark ? 'dark' : 'light')
})()`

const systemTheme = (): Theme =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

// Where storage is blocked, the choice lasts for this visit
let memoryPreference: ThemePreference | null = null

const readPreference = (): ThemePreference => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isPreference(stored) ? stored : memoryPreference ?? 'system'
  } catch {
    return memoryPreference ?? 'system'
  }
}

const resolve = (preference: ThemePreference): Theme => (preference === 'system' ? systemTheme() : preference)

const apply = (theme: Theme) => document.documentElement.setAttribute('data-co-theme', theme)

// One preference for the whole page: every theme menu reads the same store, and hears changes
// made in another menu or another tab
const CHANGE_EVENT = 'co-docs-theme-change'

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/** The reader's theme preference, and a setter that applies and remembers it. */
export function useThemePreference() {
  // 'system' while server rendering and hydrating, then the stored choice; the head script has
  // already applied the real theme
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'system' as ThemePreference)

  // A choice made in another tab applies here too
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) apply(resolve(readPreference()))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // While following the system, follow its changes
  useEffect(() => {
    if (preference !== 'system' || !window.matchMedia) return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => {
      if (readPreference() === 'system') apply(query.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [preference])

  const setPreference = useCallback((next: ThemePreference) => {
    memoryPreference = next
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be blocked; the choice still applies for this visit
    }
    apply(resolve(next))
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }, [])

  return { preference, setPreference }
}
