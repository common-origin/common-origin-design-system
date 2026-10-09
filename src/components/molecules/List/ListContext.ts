import { createContext } from 'react'

export type ListSpacing = 'compact' | 'comfortable'

/**
 * The spacing a List gives its items (#77). A ListItem without its own `spacing` uses it; outside
 * a List it's `comfortable`. Internal: not exported from the package.
 */
export const ListSpacingContext = createContext<ListSpacing>('comfortable')
