import { ReactNode } from 'react'

export interface PropInfo {
  name: string
  type: string
  default?: string
  required: boolean
  description?: string
}

export interface ComponentExample {
  name: string
  description?: string
  code: string
  component?: ReactNode // to be removed later
  renderComponent?: () => ReactNode
}

export interface AccessibilityInfo {
  notes: string[]
  keyboardNavigation?: string
  screenReader?: string
  colorContrast?: string
  focusManagement?: string
}

export interface ComponentDocumentation {
  id: string
  name: string
  description: string
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Templates' | 'Layout' | 'Components'
  
  // Props can be auto-extracted or manually specified
  props?: PropInfo[]
  
  // Curated content
  tokens: string[]
  examples: ComponentExample[]
  
  // Optional extended documentation
  accessibility?: AccessibilityInfo
  notes?: string[]
  deprecatedProps?: string[]
  migrationGuide?: string
  
  // Meta information
  version?: string
  lastModified?: Date
  filePath?: string
}

export interface ComponentMetadata {
  filePath: string
  componentName: string
  interfaceName: string
  hasDefaultExport: boolean
  hasNamedExport: boolean
  dependencies: string[]
}

export interface ExtractionOptions {
  includePrivateProps?: boolean
  includeInheritedProps?: boolean
  extractJSDoc?: boolean
  extractDefaultValues?: boolean
}
