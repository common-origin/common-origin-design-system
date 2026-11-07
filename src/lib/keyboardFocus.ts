/**
 * Whether focus arrived from the keyboard rather than a click or tap, so a component can show
 * something on keyboard focus only (a Tooltip, SidebarNav's highlight). Browsers without
 * `:focus-visible` treat every focus as keyboard focus.
 */
export function isKeyboardFocus(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false
  try {
    return target.matches(':focus-visible')
  } catch {
    return true
  }
}
