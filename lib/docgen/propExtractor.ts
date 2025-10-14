import { Project, SourceFile, InterfaceDeclaration, PropertySignature, JSDoc } from 'ts-morph'
import { PropInfo, ComponentMetadata, ExtractionOptions } from './types'
import * as path from 'path'
import * as fs from 'fs'

export class PropExtractor {
  private project: Project
  
  constructor(tsconfigPath?: string) {
    this.project = new Project({
      tsConfigFilePath: tsconfigPath || path.join(process.cwd(), 'tsconfig.json'),
      skipAddingFilesFromTsConfig: true
    })
  }

  /**
   * Extract props from a component file
   */
  async extractPropsFromFile(filePath: string, options: ExtractionOptions = {}): Promise<PropInfo[]> {
    try {
      const sourceFile = this.project.addSourceFileAtPath(filePath)
      const metadata = this.extractComponentMetadata(sourceFile)
      
      if (!metadata.interfaceName) {
        console.warn(`No Props interface found in ${filePath}`)
        return []
      }

      const propsInterface = sourceFile.getInterface(metadata.interfaceName)
      if (!propsInterface) {
        console.warn(`Interface ${metadata.interfaceName} not found in ${filePath}`)
        return []
      }

      return this.extractPropsFromInterface(propsInterface, options)
    } catch (error) {
      console.error(`Error extracting props from ${filePath}:`, error)
      return []
    }
  }

  /**
   * Extract component metadata from source file
   */
  private extractComponentMetadata(sourceFile: SourceFile): ComponentMetadata {
    const fileName = path.basename(sourceFile.getFilePath(), '.tsx')
    const componentName = this.pascalCase(fileName)
    
    // Look for Props interface
    const interfaces = sourceFile.getInterfaces()
    const propsInterface = interfaces.find(i => 
      i.getName() === `${componentName}Props` || 
      i.getName().endsWith('Props')
    )

    // Check exports
    const defaultExport = sourceFile.getDefaultExportSymbol()
    const namedExports = sourceFile.getExportedDeclarations()

    return {
      filePath: sourceFile.getFilePath(),
      componentName,
      interfaceName: propsInterface?.getName() || '',
      hasDefaultExport: !!defaultExport,
      hasNamedExport: namedExports.size > 0,
      dependencies: this.extractDependencies(sourceFile)
    }
  }

  /**
   * Extract props from interface declaration
   */
  private extractPropsFromInterface(
    propsInterface: InterfaceDeclaration, 
    options: ExtractionOptions = {}
  ): PropInfo[] {
    const props: PropInfo[] = []
    
    // Get all properties from the interface
    const properties = propsInterface.getProperties()
    
    for (const prop of properties) {
      const propInfo = this.extractPropInfo(prop, options)
      if (propInfo) {
        props.push(propInfo)
      }
    }

    // Handle inheritance if needed
    if (options.includeInheritedProps) {
      const inheritedProps = this.extractInheritedProps(propsInterface, options)
      props.push(...inheritedProps)
    }

    return props.sort((a, b) => {
      // Sort required props first, then alphabetically
      if (a.required !== b.required) {
        return a.required ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })
  }

  /**
   * Extract prop information from property signature
   */
  private extractPropInfo(prop: PropertySignature, options: ExtractionOptions): PropInfo | null {
    const name = prop.getName()
    
    // Skip private props unless explicitly requested
    if (!options.includePrivateProps && name.startsWith('_')) {
      return null
    }

    const typeText = prop.getTypeNode()?.getText() || prop.getType().getText()
    const required = !prop.hasQuestionToken()
    
    let description: string | undefined
    let defaultValue: string | undefined

    // Extract JSDoc if available
    if (options.extractJSDoc) {
      const jsDocs = prop.getJsDocs()
      if (jsDocs.length > 0) {
        description = this.extractJSDocDescription(jsDocs[0])
      }
    }

    // Try to extract default value
    if (options.extractDefaultValues) {
      defaultValue = this.extractDefaultValue(prop)
    }

    return {
      name,
      type: this.cleanTypeText(typeText),
      default: defaultValue,
      required,
      description
    }
  }

  /**
   * Extract inherited props from extended interfaces
   */
  private extractInheritedProps(
    propsInterface: InterfaceDeclaration, 
    options: ExtractionOptions
  ): PropInfo[] {
    const inheritedProps: PropInfo[] = []
    
    const extendedTypes = propsInterface.getExtends()
    for (const extendedType of extendedTypes) {
      const referencedInterface = extendedType.getExpression().getSymbol()?.getDeclarations()?.[0]
      if (referencedInterface && referencedInterface.getKind() === 253) { // InterfaceDeclaration
        const inheritedInterface = referencedInterface as InterfaceDeclaration
        const props = this.extractPropsFromInterface(inheritedInterface, options)
        inheritedProps.push(...props)
      }
    }

    return inheritedProps
  }

  /**
   * Extract JSDoc description
   */
  private extractJSDocDescription(jsDoc: JSDoc): string {
    const comment = jsDoc.getDescription()
    return comment.trim()
  }

  /**
   * Extract default value from prop (basic implementation)
   */
  private extractDefaultValue(_prop: PropertySignature): string | undefined {
    // This is a simplified implementation
    // In a real-world scenario, you'd want to analyze the component's defaultProps
    // or look for default parameter values
    return undefined
  }

  /**
   * Clean up type text for display
   */
  private cleanTypeText(typeText: string): string {
    return typeText
      .replace(/import\([^)]+\)\./g, '') // Remove import() references
      .replace(/React\./g, '') // Remove React. prefix
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
  }

  /**
   * Extract dependencies from source file
   */
  private extractDependencies(sourceFile: SourceFile): string[] {
    const dependencies: string[] = []
    
    const imports = sourceFile.getImportDeclarations()
    for (const importDecl of imports) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue()
      if (moduleSpecifier && !moduleSpecifier.startsWith('.')) {
        dependencies.push(moduleSpecifier)
      }
    }

    return dependencies
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
   * Find all component files in a directory
   */
  async findComponentFiles(directory: string, pattern: RegExp = /\.tsx?$/): Promise<string[]> {
    const files: string[] = []
    
    const traverse = (dir: string) => {
      const entries = fs.readdirSync(dir)
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        const stat = fs.statSync(fullPath)
        
        if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
          traverse(fullPath)
        } else if (stat.isFile() && pattern.test(entry)) {
          files.push(fullPath)
        }
      }
    }
    
    traverse(directory)
    return files
  }

  /**
   * Clean up project resources
   */
  dispose() {
    // Clean up ts-morph project
    this.project.getSourceFiles().forEach(sourceFile => {
      this.project.removeSourceFile(sourceFile)
    })
  }
}
