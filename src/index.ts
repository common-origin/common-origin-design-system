// Main design system exports
export * from './components'

export {
  tokens,
  type Tokens,
  type TokensBase,
  type TokensSemantic,
  type TokensComponent,
} from './types/tokens'

// Icons (decision 0058): iconSet is what Icon draws; iconsData is frozen and deprecated
export { iconSet } from './types/iconSet'
export {
  iconsData,
  type IconName,
  type IconCategory,
  type IconDescription,
  type IconDefinition,
  type IconElement,
  type IconElementTag,
  type IconPaint,
  type IconSet,
  type IconSource,
  type IconMetadata,
  type IconRegistry,
} from './types/icons'