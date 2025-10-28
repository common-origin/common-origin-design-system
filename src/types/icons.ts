// Icon type definitions for external consumption
// This is a self-contained type that doesn't depend on JSON imports
// to ensure it works correctly in consuming projects

export type IconName = 
  | 'add'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowLeft'
  | 'arrowRight'
  | 'back'
  | 'caret'
	| 'check'
  | 'close'
  | 'directionRight'
	| 'export'
  | 'menu'
  | 'pause'
  | 'play'
  | 'playBack'
  | 'lineOut'
  | 'message'
  | 'copy'
  | 'link'
	|'table'
  | 'userBox'

// Also export icons data for runtime use
export { default as iconsData } from '../styles/icons.json'
