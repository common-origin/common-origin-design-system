// Icon type definitions for external consumption
// This is a self-contained type that doesn't depend on JSON imports
// to ensure it works correctly in consuming projects

import iconsJson from '../styles/icons.json'

/** Every icon `Icon` can draw: the keys of `iconSet` (decision 0058) */
export type IconName =
  | 'add'
  | 'ai'
  | 'addRing'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'back'
  | 'bell'
  | 'cancel'
  | 'caret'
  | 'caretDown'
  | 'caretUp'
  | 'check'
  | 'checkRing'
  | 'close'
  | 'copy'
  | 'creditCard'
  | 'crossCircle'
  | 'directionRight'
  | 'directionUp'
  | 'edit'
  | 'export'
  | 'fileDocSearch'
  | 'filter'
  | 'home'
  | 'info'
  | 'kebab'
  | 'lamp'
  | 'lineOut'
  | 'link'
  | 'meatballs'
  | 'menu'
  | 'message'
  | 'move'
  | 'mic'
  | 'order'
  | 'paper'
  | 'pause'
  | 'play'
  | 'playBack'
  | 'refresh'
  | 'remove'
  | 'search'
  | 'sidebar'
  | 'star'
  | 'starFilled'
  | 'statusCancelled'
  | 'statusError'
  | 'statusInProgress'
  | 'statusInfo'
  | 'statusNotStarted'
  | 'statusPending'
  | 'statusScheduled'
  | 'statusSerious'
  | 'statusSuccess'
  | 'statusWarning'
  | 'stop'
  | 'table'
  | 'trash'
  | 'userBox'
  | 'view'
  | 'viewHide'
  | 'wallet'

/** Semantic category for grouping icons by purpose */
export type IconCategory =
  | 'action'
  | 'communication'
  | 'content'
  | 'feedback'
  | 'media'
  | 'navigation'
  | 'object'
  | 'status'
  | 'user'

/** Metadata every icon carries, whatever its format */
export interface IconDescription {
  /** Display name of the icon */
  name: string
  /** What the icon visually depicts */
  description: string
  /** Semantic category for grouping */
  category: IconCategory
  /** Alternative names and search terms */
  aliases: string[]
  /** When and why to use this icon */
  intent: string
  /** Whether the icon is typically decorative (true) or informative (false) */
  decorativeDefault: boolean
  /** Suggested accessible label when the icon conveys meaning */
  ariaLabelDefault: string
}

/** The SVG shapes an icon is drawn from */
export type IconElementTag = 'path' | 'circle' | 'ellipse' | 'rect' | 'line' | 'polyline' | 'polygon'

/**
 * One shape of an icon: its tag and its geometry attributes (`d`, `cx`, `points`…), on a 24px
 * grid. Lucide's own format, so icons copy across unchanged.
 */
export type IconElement = [tag: IconElementTag, attributes: Record<string, string>]

/**
 * How an icon is painted, always in `currentColor`:
 * - `stroke`: 2px lines with round caps and joins, no fill (Lucide icons)
 * - `fill`: solid shapes, no line
 * - `both`: lines and a fill, such as a filled star
 */
export type IconPaint = 'stroke' | 'fill' | 'both'

/**
 * Where an icon comes from (decision 0058): copied from Lucide, with its Lucide name, or
 * maintained in this repository. Icons carried over from 3.2.0 are `common-origin` until they move
 * to Lucide.
 */
export type IconSource = { library: 'lucide'; name: string } | { library: 'common-origin' }

/** An icon in `iconSet`: its metadata, where it comes from, and how to draw it */
export interface IconDefinition extends IconDescription {
  source: IconSource
  paint: IconPaint
  elements: IconElement[]
}

/** The icon set keyed by IconName */
export type IconSet = Record<IconName, IconDefinition>

/**
 * An entry in the frozen `iconsData`: one filled path and its metadata.
 * @deprecated Use `IconDefinition` and `iconSet`. Removed in 4.0 (decision 0058).
 */
export interface IconMetadata extends IconDescription {
  /** SVG path data */
  path: string
}

/**
 * The type of the frozen `iconsData`.
 * @deprecated Use `IconSet` and `iconSet`. Removed in 4.0 (decision 0058).
 */
export type IconRegistry = Record<IconName, IconMetadata>

/**
 * The 64 icons as they were in 3.2.0, each one filled path. Frozen: icons added since have no
 * entry here, and `Icon` no longer reads it.
 * @deprecated Use `iconSet`, which holds every icon `Icon` draws. Removed in 4.0 (decision 0058).
 */
// Typed as IconRegistry so emitted .d.ts files don't import JSON (needs `resolveJsonModule` in consumers).
export const iconsData = iconsJson as IconRegistry
