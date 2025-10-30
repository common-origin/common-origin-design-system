import * as React from 'react'
import { ComponentDocumentation } from './docgen/types'

// Import all documentation files (mix of default and named exports)
import { cardLargeDocs } from '@/components/molecules/CardLarge/CardLarge.docs'
import { avatarDocs } from '@/components/atoms/Avatar/Avatar.docs'
import { badgeDocs } from '@/components/atoms/Badge/Badge.docs'
import { boxDocs } from '@/components/atoms/Box/Box.docs'
import { buttonDocs } from '@/components/atoms/Button/Button.docs'
import { chipDocs } from '@/components/atoms/Chip/Chip.docs'
import { chipGroupDocs } from '@/components/molecules/ChipGroup/ChipGroup.docs'
import { codeBlockDocs } from '@/components/molecules/CodeBlock/CodeBlock.docs'
import { containerDocs } from '@/components/atoms/Container/Container.docs'
import { pictureDocs } from '@/components/atoms/Picture/Picture.docs'
import { designCardDocs } from '@/components/molecules/DesignCard/DesignCard.docs'
import { dropdownDocs } from '@/components/molecules/Dropdown/Dropdown.docs'
import { iconDocs } from '@/components/atoms/Icon/Icon.docs'
import { iconButtonDocs } from '@/components/atoms/IconButton/IconButton.docs'
import { progressBarDocs } from '@/components/atoms/ProgressBar/ProgressBar.docs'
import { releaseCardDocs } from '@/components/molecules/ReleaseCard/ReleaseCard.docs'
import { dividerDocs } from '@/components/atoms/Divider/Divider.docs'
import { stackDocs } from '@/components/atoms/Stack/Stack.docs'
import { typographyDocs } from '@/components/atoms/Typography/Typography.docs'
import { gridSystemDocs } from '@/components/layout/GridSystem/GridSystem.docs'

// Legacy ComponentData interface for compatibility
export interface ComponentData {
  id: string
  name: string
  description: string
  category: 'Atoms' | 'Molecules' | 'Layout' | 'Components'
  props: Array<{
    name: string
    type: string
    default?: string
    description: string
    required?: boolean
  }>
  tokens: string[]
  examples: Array<{
    name: string
    description: string
    code: string
    component?: React.ReactNode
    renderComponent?: () => React.ReactNode
  }>
  accessibility?: {
    notes: string[]
    keyboardNavigation?: string
    screenReader?: string
    colorContrast?: string
    focusManagement?: string
  }
  notes?: string[]
}

// Helper function to convert new documentation format to legacy format
function convertDocumentationToLegacyFormat(docs: ComponentDocumentation): ComponentData {
  return {
    id: docs.id,
    name: docs.name,
    description: docs.description,
    category: docs.category as 'Atoms' | 'Molecules' | 'Layout' | 'Components',
    props: (docs.props || []).map(prop => ({
      name: prop.name,
      type: prop.type,
      default: prop.default,
      description: prop.description || '',
      required: prop.required
    })),
    tokens: docs.tokens || [],
    examples: docs.examples.map(example => ({
      name: example.name,
      description: example.description || '',
      code: example.code,
      component: example.component,
      renderComponent: example.renderComponent
    })),
    accessibility: docs.accessibility,
    notes: docs.notes
  }
}

// Static components data for immediate use (transition approach)
export const staticComponentsData: ComponentData[] = [
  convertDocumentationToLegacyFormat(cardLargeDocs),
  convertDocumentationToLegacyFormat(avatarDocs),
  convertDocumentationToLegacyFormat(badgeDocs),
  convertDocumentationToLegacyFormat(boxDocs),
  convertDocumentationToLegacyFormat(buttonDocs),
  convertDocumentationToLegacyFormat(chipDocs),
  convertDocumentationToLegacyFormat(chipGroupDocs),
  convertDocumentationToLegacyFormat(codeBlockDocs),
  convertDocumentationToLegacyFormat(containerDocs),
  convertDocumentationToLegacyFormat(pictureDocs),
  convertDocumentationToLegacyFormat(designCardDocs),
  convertDocumentationToLegacyFormat(dropdownDocs),
  convertDocumentationToLegacyFormat(iconDocs),
  convertDocumentationToLegacyFormat(iconButtonDocs),
  convertDocumentationToLegacyFormat(progressBarDocs),
  convertDocumentationToLegacyFormat(releaseCardDocs),
  convertDocumentationToLegacyFormat(dividerDocs),
  convertDocumentationToLegacyFormat(stackDocs),
  convertDocumentationToLegacyFormat(typographyDocs),
  convertDocumentationToLegacyFormat(gridSystemDocs)
]
