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

/** Docs-site groups, by purpose (decision 0057). The sidebar order is COMPONENT_GROUPS in src/lib/componentGroups.ts. */
export type ComponentGroup =
  | 'Actions'
  | 'Inputs'
  | 'Navigation'
  | 'Feedback'
  | 'Overlays'
  | 'Labels'
  | 'Data display'
  | 'Content'
  | 'Layout'

/** The atomic tier: the component's folder in src/components (decision 0052) */
export type ComponentTier = 'Atom' | 'Molecule' | 'Organism' | 'Layout'

export interface ComponentDocumentation {
  id: string
  name: string
  description: string
  /** The docs-site group: what the component is for (decision 0057) */
  category: ComponentGroup
  /** How the component is built, matching its folder in src/components */
  tier: ComponentTier
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
  // Docs-site guides that cover this component alongside others, linked from its page
  guides?: { label: string; href: string }[]
  deprecatedProps?: string[]
  migrationGuide?: string
  
  // Meta information
  version?: string
  lastModified?: Date
  filePath?: string
}
