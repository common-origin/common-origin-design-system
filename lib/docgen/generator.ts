import { ComponentDocumentation, PropInfo } from './types'
import { PropExtractor } from './propExtractor'
import * as path from 'path'
import * as fs from 'fs'

export class DocumentationGenerator {
  private propExtractor: PropExtractor
  private componentsDir: string
  private docsCache: Map<string, ComponentDocumentation> = new Map()

  constructor(componentsDir: string, tsconfigPath?: string) {
    this.componentsDir = componentsDir
    this.propExtractor = new PropExtractor(tsconfigPath)
  }

  /**
   * Generate documentation for all components
   */
  async generateAllComponentDocs(): Promise<ComponentDocumentation[]> {
    const componentFiles = await this.findComponentFiles()
    const docs: ComponentDocumentation[] = []

    for (const filePath of componentFiles) {
      const doc = await this.generateComponentDoc(filePath)
      if (doc) {
        docs.push(doc)
      }
    }

    return docs.sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Generate documentation for a single component
   */
  async generateComponentDoc(filePath: string): Promise<ComponentDocumentation | null> {
    try {
      const cacheKey = filePath
      
      // Check cache first
      if (this.docsCache.has(cacheKey)) {
        return this.docsCache.get(cacheKey)!
      }

      // Extract props from TypeScript
      const extractedProps = await this.propExtractor.extractPropsFromFile(filePath, {
        extractJSDoc: true,
        extractDefaultValues: true,
        includePrivateProps: false
      })

      // Look for accompanying .docs.ts file
      const docsPath = this.getDocsPath(filePath)
      let curatedDocs: Partial<ComponentDocumentation> = {}
      
      if (fs.existsSync(docsPath)) {
        curatedDocs = await this.loadCuratedDocs(docsPath)
      }

      // Generate base documentation
      const baseDoc = this.generateBaseDoc(filePath, extractedProps)
      
      // Merge extracted props with curated documentation
      const mergedDoc: ComponentDocumentation = {
        ...baseDoc,
        ...curatedDocs,
        props: this.mergeProps(extractedProps, curatedDocs.props || []),
        filePath
      }

      // Cache the result
      this.docsCache.set(cacheKey, mergedDoc)
      
      return mergedDoc
    } catch (error) {
      console.error(`Error generating documentation for ${filePath}:`, error)
      return null
    }
  }

  /**
   * Generate base documentation from file analysis
   */
  private generateBaseDoc(filePath: string, extractedProps: PropInfo[]): ComponentDocumentation {
    const fileName = path.basename(filePath, '.tsx')
    const componentName = this.pascalCase(fileName)
    
    // Determine category based on file path
    const category = this.inferCategory(filePath)
    
    // Generate basic ID
    const id = fileName.toLowerCase()

    return {
      id,
      name: componentName,
      description: `${componentName} component`,
      category,
      props: extractedProps,
      tokens: [],
      examples: [],
      lastModified: new Date(),
      filePath
    }
  }

  /**
   * Infer component category from file path
   */
  private inferCategory(filePath: string): ComponentDocumentation['category'] {
    const pathParts = filePath.split(path.sep)
    
    if (pathParts.includes('atoms')) return 'Atoms'
    if (pathParts.includes('molecules')) return 'Molecules'
    if (pathParts.includes('organisms')) return 'Organisms'
    if (pathParts.includes('templates')) return 'Templates'
    if (pathParts.includes('layout')) return 'Layout'
    
    return 'Components'
  }

  /**
   * Load curated documentation from .docs.ts file
   */
  private async loadCuratedDocs(docsPath: string): Promise<Partial<ComponentDocumentation>> {
    try {
      // Dynamic import of the docs file
      const docsModule = await import(docsPath)
      return docsModule.default || {}
    } catch (error) {
      console.warn(`Could not load curated docs from ${docsPath}:`, error)
      return {}
    }
  }

  /**
   * Merge extracted props with curated props
   */
  private mergeProps(extractedProps: PropInfo[], curatedProps: PropInfo[]): PropInfo[] {
    const mergedProps: PropInfo[] = []
    const curatedPropsMap = new Map(curatedProps.map(p => [p.name, p]))

    // Start with extracted props and enhance with curated information
    for (const extractedProp of extractedProps) {
      const curatedProp = curatedPropsMap.get(extractedProp.name)
      
      mergedProps.push({
        ...extractedProp,
        ...curatedProp, // Curated props override extracted ones
        // Preserve extracted type if not overridden
        type: curatedProp?.type || extractedProp.type,
        required: curatedProp?.required ?? extractedProp.required
      })
      
      curatedPropsMap.delete(extractedProp.name)
    }

    // Add any remaining curated props that weren't found in extracted props
    curatedPropsMap.forEach((curatedProp) => {
      mergedProps.push(curatedProp)
    })

    return mergedProps.sort((a, b) => {
      // Sort required props first, then alphabetically
      if (a.required !== b.required) {
        return a.required ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })
  }

  /**
   * Get the path to the .docs.ts file for a component
   */
  private getDocsPath(componentPath: string): string {
    const ext = path.extname(componentPath)
    const basePath = componentPath.replace(ext, '')
    return `${basePath}.docs.ts`
  }

  /**
   * Find all component files in the components directory
   */
  private async findComponentFiles(): Promise<string[]> {
    const files = await this.propExtractor.findComponentFiles(this.componentsDir)
    
    // Filter to only include component files (not test files, etc.)
    return files.filter(file => {
      const fileName = path.basename(file)
      return !fileName.includes('.test.') && 
             !fileName.includes('.spec.') && 
             !fileName.includes('.stories.') &&
             !fileName.includes('.docs.') &&
             !fileName.startsWith('index.')
    })
  }

  /**
   * Convert string to PascalCase
   */
  private pascalCase(str: string): string {
    return str
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  }

  /**
   * Get cached documentation (useful for development)
   */
  getCachedDocs(): ComponentDocumentation[] {
    return Array.from(this.docsCache.values())
  }

  /**
   * Clear documentation cache
   */
  clearCache(): void {
    this.docsCache.clear()
  }

  /**
   * Validate documentation completeness
   */
  validateDocumentation(docs: ComponentDocumentation[]): Array<{
    component: string
    issues: string[]
  }> {
    const validationResults: Array<{ component: string; issues: string[] }> = []

    for (const doc of docs) {
      const issues: string[] = []

      if (!doc.description || doc.description.trim() === `${doc.name} component`) {
        issues.push('Missing meaningful description')
      }

      if (doc.examples.length === 0) {
        issues.push('No examples provided')
      }

      if (doc.tokens.length === 0) {
        issues.push('No design tokens specified')
      }

      if (doc.props?.some(prop => !prop.description)) {
        issues.push('Some props missing descriptions')
      }

      if (issues.length > 0) {
        validationResults.push({
          component: doc.name,
          issues
        })
      }
    }

    return validationResults
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.propExtractor.dispose()
    this.clearCache()
  }
}
