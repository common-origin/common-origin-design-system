// Icon type definitions for external consumption
// This is a self-contained type that doesn't depend on JSON imports
// to ensure it works correctly in consuming projects

export type IconName =
  | 'add'
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
  | 'crossCircle'
  | 'directionRight'
  | 'directionUp'
  | 'edit'
  | 'export'
  | 'fileDocSearch'
  | 'filter'
  | 'info'
  | 'lamp'
  | 'lineOut'
  | 'link'
  | 'menu'
  | 'message'
  | 'mic'
  | 'order'
  | 'paper'
  | 'pause'
  | 'play'
  | 'playBack'
  | 'refresh'
  | 'remove'
  | 'search'
  | 'star'
  | 'starFilled'
  | 'table'
  | 'trash'
  | 'userBox'
  | 'view'
  | 'viewHide'

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

/** Enriched metadata for each icon entry in icons.json */
export interface IconMetadata {
  /** SVG path data */
  path: string
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

/** The full icon registry keyed by IconName */
export type IconRegistry = Record<IconName, IconMetadata>

// Also export icons data for runtime use
export { default as iconsData } from '../styles/icons.json'
