import iconDrawingsJson from '../styles/iconDrawings.json'
import type { IconDefinition, IconName } from './icons'

/** How to draw an icon: its paint and its shapes, without the metadata */
export type IconDrawing = Pick<IconDefinition, 'paint' | 'elements'>

/**
 * The drawings `Icon` needs, kept apart from the metadata (decision 0058) so a bundle that only
 * draws icons doesn't carry every icon's description, intent and aliases. Internal: products read
 * `iconSet`, which joins this with the metadata.
 */
// Cast through unknown: JSON imports infer arrays, not the element tuples. iconSet.test.ts checks
// the data really has this shape. Typed so emitted .d.ts files don't import JSON.
export const iconDrawings = iconDrawingsJson as unknown as Record<IconName, IconDrawing>
