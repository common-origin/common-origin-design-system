import { createContext, useContext, type ComponentType } from 'react'

// What SidebarNav (#331) tells the rows and sections inside it. Outside a SidebarNav, the
// defaults apply: expanded, plain links, and each row's own hover colour.
export interface SidebarNavContextValue {
  /** The nav is the icon rail: rows show their icon only */
  collapsed: boolean
  /** A router's link component for internal URLs, set once on SidebarNav (decision 0008) */
  linkComponent?: ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  /** SidebarNav draws one gliding hover highlight, so rows don't colour their own hover (0053) */
  glide: boolean
  /** Inside a SidebarNav, whose body is one list: a section is one of its items */
  inNav?: boolean
}

export const SidebarNavContext = createContext<SidebarNavContextValue>({ collapsed: false, glide: false })

export const useSidebarNav = () => useContext(SidebarNavContext)
