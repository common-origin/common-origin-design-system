// Main entry point for documentation generation
export * from './types'
export * from './propExtractor'
export * from './generator'

import { DocumentationGenerator } from './generator'
import { ComponentDocumentation } from './types'
import * as path from 'path'

/**
 * Generate component documentation for the project
 */
export async function getComponentDocumentation(
  componentsDir?: string,
  tsconfigPath?: string
): Promise<ComponentDocumentation[]> {
  const defaultComponentsDir = path.join(process.cwd(), 'components')
  const generator = new DocumentationGenerator(
    componentsDir || defaultComponentsDir,
    tsconfigPath
  )

  try {
    const docs = await generator.generateAllComponentDocs()
    return docs
  } finally {
    generator.dispose()
  }
}

/**
 * Generate documentation for a single component
 */
export async function getComponentDoc(
  componentPath: string,
  tsconfigPath?: string
): Promise<ComponentDocumentation | null> {
  const componentsDir = path.dirname(componentPath)
  const generator = new DocumentationGenerator(componentsDir, tsconfigPath)

  try {
    const doc = await generator.generateComponentDoc(componentPath)
    return doc
  } finally {
    generator.dispose()
  }
}

/**
 * Validate documentation completeness
 */
export async function validateDocumentation(
  componentsDir?: string,
  tsconfigPath?: string
): Promise<Array<{ component: string; issues: string[] }>> {
  const generator = new DocumentationGenerator(
    componentsDir || path.join(process.cwd(), 'components'),
    tsconfigPath
  )

  try {
    const docs = await generator.generateAllComponentDocs()
    return generator.validateDocumentation(docs)
  } finally {
    generator.dispose()
  }
}
