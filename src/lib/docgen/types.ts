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

export interface AnatomyPart {
  name: string
  description: string
  tokens?: string[]
}

export interface AnatomyInfo {
  description: string
  diagram?: string
  parts: AnatomyPart[]
}

export interface ComponentDocumentation {
  id: string
  name: string
  description: string
  category: 'Atoms' | 'Molecules' | 'Organisms' | 'Templates' | 'Layout' | 'Components'
  parentId?: string
  
  // Written by hand; nothing is extracted from the source
  props?: PropInfo[]
  
  // Curated content
  tokens: string[]
  examples: ComponentExample[]
  
  // Optional extended documentation
  accessibility?: AccessibilityInfo
  anatomy?: AnatomyInfo
  notes?: string[]
  deprecatedProps?: string[]
  migrationGuide?: string
  
  // Meta information
  version?: string
  lastModified?: Date
  filePath?: string
}
