// Icon type definitions for external consumption
// This is a self-contained type that doesn't depend on JSON imports
// to ensure it works correctly in consuming projects

export type IconName = 
  | 'add'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'back'
  | 'caret'
  | 'caretDown'
  | 'caretUp'
  | 'check'
  | 'close'
  | 'copy'
  | 'directionRight'
  | 'export'
  | 'filter'
  | 'lineOut'
  | 'link'
  | 'menu'
  | 'message'
  | 'pause'
  | 'play'
  | 'playBack'
  | 'star'
  | 'starFilled'
  | 'table'
  | 'userBox'

// Also export icons data for runtime use
export { default as iconsData } from '../styles/icons.json'
