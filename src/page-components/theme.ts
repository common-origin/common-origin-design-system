import { useCallback, useEffect, useState } from 'react'

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

const readPreference = (): ThemePreference => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return isPreference(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

const apply = (theme: Theme) => document.documentElement.setAttribute('data-co-theme', theme)

/** The reader's theme preference, and a setter that applies and remembers it. */
export function useThemePreference() {
  // The stored choice in the browser, 'system' on the server. Nothing renders from it until the
  // theme menu opens, so the two never disagree in server-rendered markup; the head script has
  // already applied the real theme
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'system' : readPreference()
  )

  // While following the system, follow its changes. Only changes: the head script applied the
  // initial theme, and applying here on mount would override a stored choice before it's read
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
    setPreferenceState(next)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage can be blocked; the choice still applies for this visit
    }
    apply(next === 'system' ? systemTheme() : next)
  }, [])

  return { preference, setPreference }
}
