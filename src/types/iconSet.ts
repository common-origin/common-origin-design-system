import iconSetJson from '../styles/iconSet.json'
import type { IconSet } from './icons'

/**
 * Every icon `Icon` draws, keyed by `IconName`, with its metadata, its source and its shapes
 * (decision 0058). Read it to list icons or to draw one outside `Icon`.
 */
// Cast through unknown: JSON imports infer arrays, not the element tuples. iconSet.test.ts checks
// the data really has this shape. Typed so emitted .d.ts files don't import JSON.
export const iconSet = iconSetJson as unknown as IconSet
