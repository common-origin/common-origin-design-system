# Design Token Management Guide

## Overview
This guide provides comprehensive strategies for managing design tokens in the Common Origin Design System, including creation, evolution, validation, and runtime management.

## Token Architecture

### Token Hierarchy (Critical)
```
Base Tokens (Raw values)
    ↓ (Reference)
Semantic Tokens (Contextual meaning)
    ↓ (Reference)  
Component Tokens (Component-specific overrides)
```

### Token Type System
All tokens must include a `"type"` field for proper Style Dictionary generation:
```json
{
  "color": {
    "blue": {
      "500": {
        "value": "#3b82f6",
        "type": "color",
        "description": "Primary blue shade"
      }
    }
  },
  "spacing": {
    "4": {
      "value": "16px",
      "type": "spacing",
      "description": "Medium spacing unit"
    }
  }
}
```

## Token Creation Patterns

### Base Token Structure
Location: `src/tokens/base/`
```json
{
  "color": {
    "neutral": {
      "50": { "value": "#fafafa", "type": "color" },
      "100": { "value": "#f4f4f5", "type": "color" },
      "900": { "value": "#18181b", "type": "color" }
    },
    "blue": {
      "500": { "value": "#3b82f6", "type": "color" },
      "600": { "value": "#2563eb", "type": "color" }
    }
  },
  "spacing": {
    "1": { "value": "4px", "type": "spacing" },
    "2": { "value": "8px", "type": "spacing" },
    "4": { "value": "16px", "type": "spacing" }
  },
  "fontSize": {
    "sm": { "value": "14px", "type": "fontSizes" },
    "base": { "value": "16px", "type": "fontSizes" },
    "lg": { "value": "18px", "type": "fontSizes" }
  }
}
```

### Semantic Token Structure
Location: `src/tokens/semantic/`
```json
{
  "color": {
    "text": {
      "default": {
        "value": "{base.color.neutral.900}",
        "type": "color",
        "description": "Primary text color for body content"
      },
      "subdued": {
        "value": "{base.color.neutral.600}",
        "type": "color", 
        "description": "Secondary text color for less prominent content"
      },
      "interactive": {
        "value": "{base.color.blue.600}",
        "type": "color",
        "description": "Text color for interactive elements like links"
      }
    },
    "background": {
      "default": {
        "value": "{base.color.neutral.50}",
        "type": "color",
        "description": "Default background color"
      },
      "emphasis": {
        "value": "{base.color.blue.500}",
        "type": "color",
        "description": "Emphasized background for important elements"
      }
    }
  },
  "spacing": {
    "component": {
      "xs": {
        "value": "{base.spacing.1}",
        "type": "spacing",
        "description": "Extra small component spacing"
      },
      "sm": {
        "value": "{base.spacing.2}",
        "type": "spacing",
        "description": "Small component spacing"
      }
    },
    "layout": {
      "sm": {
        "value": "{base.spacing.4}",
        "type": "spacing",
        "description": "Small layout spacing"
      }
    }
  }
}
```

### Component Token Structure
Location: `src/tokens/component/`
```json
{
  "button": {
    "primary": {
      "background": {
        "default": {
          "value": "{semantic.color.background.interactive}",
          "type": "color"
        },
        "hover": {
          "value": "{base.color.blue.700}",
          "type": "color"
        }
      },
      "text": {
        "value": "{base.color.neutral.50}",
        "type": "color"
      }
    }
  }
}
```

## Token Usage Patterns

### Preferred Usage Hierarchy
```tsx
import tokens from '@/styles/tokens.json'
const { semantic, base } = tokens

// ✅ PREFERRED: Semantic tokens in components
const Button = styled.button`
  color: ${semantic.color.text.interactive};
  background: ${semantic.color.background.interactive};
  padding: ${semantic.spacing.component.md};
  font: ${semantic.typography.button1};
`

// ⚠️ ACCEPTABLE: Base tokens for creating new semantic tokens
const newSemanticToken = {
  color: {
    background: {
      custom: base.color.purple[500]
    }
  }
}

// ❌ NEVER: Hardcoded values in components
const BadButton = styled.button`
  color: #333;          /* NO */
  background: #007bff;  /* NO */
  padding: 12px 24px;   /* NO */
`
```

### Responsive Token Patterns
```tsx
const ResponsiveComponent = styled.div`
  padding: ${semantic.spacing.component.sm};
  
  @media (min-width: ${semantic.breakpoint.md}) {
    padding: ${semantic.spacing.component.md};
  }
  
  @media (min-width: ${semantic.breakpoint.lg}) {
    padding: ${semantic.spacing.component.lg};
  }
`
```

## Token Validation Patterns

### Runtime Token Validation
```tsx
// utils/validateTokens.ts
type TokenPath = string // e.g., 'semantic.color.text.default'

const validateToken = (path: TokenPath, tokens: any): boolean => {
  const keys = path.split('.')
  let current = tokens
  
  for (const key of keys) {
    if (!(key in current)) {
      console.warn(`Token path "${path}" not found`)
      return false
    }
    current = current[key]
  }
  
  return true
}

// Component-level validation
const useValidatedToken = (path: TokenPath) => {
  const tokens = useTokens() // Your token context
  
  if (process.env.NODE_ENV === 'development') {
    if (!validateToken(path, tokens)) {
      return 'transparent' // Fallback in dev
    }
  }
  
  return getTokenValue(path, tokens)
}
```

### Build-Time Token Validation
```javascript
// scripts/validateTokens.js
const fs = require('fs')
const path = require('path')

const validateTokenStructure = (tokenObj, currentPath = '') => {
  const errors = []
  
  for (const [key, value] of Object.entries(tokenObj)) {
    const fullPath = currentPath ? `${currentPath}.${key}` : key
    
    if (typeof value === 'object' && value !== null) {
      if ('value' in value) {
        // This is a token - validate required fields
        if (!value.type) {
          errors.push(`Missing "type" field in token: ${fullPath}`)
        }
        if (!value.description) {
          errors.push(`Missing "description" field in token: ${fullPath}`)
        }
      } else {
        // This is a group - recurse
        errors.push(...validateTokenStructure(value, fullPath))
      }
    }
  }
  
  return errors
}
```

## Token Evolution Strategies

### Versioning Strategy
```json
{
  "meta": {
    "version": "2.1.0",
    "lastUpdated": "2025-10-22",
    "breakingChanges": [
      {
        "version": "2.0.0",
        "changes": ["Renamed color.primary to color.interactive"],
        "migrationGuide": "Replace all instances of semantic.color.primary with semantic.color.interactive"
      }
    ]
  }
}
```

### Migration Patterns
```tsx
// Migration utility for token changes
const migrationMap = {
  'semantic.color.primary': 'semantic.color.interactive',
  'semantic.spacing.tight': 'semantic.spacing.component.sm'
}

const migrateTokenPath = (oldPath: string): string => {
  if (migrationMap[oldPath]) {
    console.warn(`Token "${oldPath}" is deprecated. Use "${migrationMap[oldPath]}" instead.`)
    return migrationMap[oldPath]
  }
  return oldPath
}
```

### Deprecation Strategy
```json
{
  "color": {
    "primary": {
      "value": "{semantic.color.interactive}",
      "type": "color",
      "deprecated": true,
      "deprecatedIn": "2.0.0",
      "removeIn": "3.0.0",
      "replacement": "semantic.color.interactive",
      "description": "DEPRECATED: Use semantic.color.interactive instead"
    }
  }
}
```

## Advanced Token Patterns

### Conditional Token Values
```json
{
  "color": {
    "background": {
      "adaptive": {
        "light": {
          "value": "{base.color.neutral.50}",
          "type": "color"
        },
        "dark": {
          "value": "{base.color.neutral.900}",
          "type": "color"
        }
      }
    }
  }
}
```

### Calculated Token Values
```json
{
  "spacing": {
    "golden": {
      "value": "calc({base.spacing.4} * 1.618)",
      "type": "spacing",
      "description": "Golden ratio spacing"
    }
  }
}
```

### Token Composition
```json
{
  "typography": {
    "heading": {
      "large": {
        "fontFamily": {
          "value": "{base.fontFamily.sans}",
          "type": "fontFamily"
        },
        "fontSize": {
          "value": "{base.fontSize.2xl}",
          "type": "fontSize"
        },
        "fontWeight": {
          "value": "{base.fontWeight.bold}",
          "type": "fontWeight"
        },
        "lineHeight": {
          "value": "{base.lineHeight.tight}",
          "type": "lineHeight"
        },
        "letterSpacing": {
          "value": "{base.letterSpacing.tight}",
          "type": "letterSpacing"
        }
      }
    }
  }
}
```

## Style Dictionary Configuration

### Advanced Transform Configuration
```javascript
// config/style-dictionary.config.js
const StyleDictionary = require('style-dictionary')

// Custom transforms
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: (token) => token.type === 'spacing' || token.type === 'fontSize',
  transformer: (token) => {
    const val = parseFloat(token.value)
    return `${val / 16}rem`
  }
})

StyleDictionary.registerTransform({
  name: 'color/css-custom-property',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => `var(--color-${token.name})`
})

module.exports = {
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['size/pxToRem', 'color/css-custom-property'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested'
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations'
        }
      ]
    }
  }
}
```

## Token Testing Patterns

### Visual Regression Testing for Tokens
```tsx
// stories/TokenVisualTests.stories.tsx
export const AllColorTokens = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
    {Object.entries(semantic.color).map(([category, colors]) => (
      <div key={category}>
        <h3>{category}</h3>
        {Object.entries(colors).map(([name, value]) => (
          <div
            key={name}
            style={{
              backgroundColor: value,
              padding: '1rem',
              marginBottom: '0.5rem'
            }}
          >
            {name}: {value}
          </div>
        ))}
      </div>
    ))}
  </div>
)
```

### Token Integration Tests
```tsx
describe('Token Integration', () => {
  it('semantic tokens resolve to valid CSS values', () => {
    const tokenPaths = [
      'semantic.color.text.default',
      'semantic.spacing.component.md',
      'semantic.typography.body'
    ]
    
    tokenPaths.forEach(path => {
      const value = getNestedValue(tokens, path)
      expect(value).toBeDefined()
      expect(typeof value).toBe('string')
      expect(value).not.toBe('')
    })
  })
  
  it('base tokens are not used directly in components', () => {
    const componentFiles = glob.sync('src/components/**/*.tsx')
    
    componentFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8')
      
      // Check for base token usage (should be minimal)
      const baseTokenMatches = content.match(/base\.[a-zA-Z]/g) || []
      
      if (baseTokenMatches.length > 0) {
        console.warn(`File ${file} uses base tokens directly: ${baseTokenMatches.join(', ')}`)
      }
    })
  })
})
```

## Runtime Theme Management

### Theme Provider Pattern
```tsx
import { createContext, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

interface Theme {
  semantic: typeof semanticTokens
  base: typeof baseTokens
  mode: 'light' | 'dark'
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Partial<Theme>) => void
}>({} as any)

export const TokenThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    semantic: semanticTokens,
    base: baseTokens,
    mode: 'light'
  })
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```

### Dynamic Token Switching
```tsx
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  
  const toggleMode = () => {
    const newMode = theme.mode === 'light' ? 'dark' : 'light'
    const newTokens = newMode === 'dark' ? darkSemanticTokens : lightSemanticTokens
    
    setTheme({
      ...theme,
      mode: newMode,
      semantic: newTokens
    })
  }
  
  return <button onClick={toggleMode}>Toggle Theme</button>
}
```

## Token Documentation Patterns

### Automated Token Documentation
```tsx
// scripts/generateTokenDocs.ts
const generateTokenDoc = (tokenObj: any, category: string) => {
  return {
    category,
    tokens: Object.entries(tokenObj).map(([name, token]) => ({
      name,
      value: token.value,
      type: token.type,
      description: token.description,
      usage: `tokens.${category}.${name}`,
      cssCustomProperty: `--${category}-${name}`,
      examples: generateUsageExamples(category, name)
    }))
  }
}
```

### Token Usage Guidelines
```markdown
## Token Usage Guidelines

### DO ✅
- Use semantic tokens in components: `semantic.color.text.default`
- Create new semantic tokens from base tokens when needed
- Include descriptions for all new tokens
- Use consistent naming patterns

### DON'T ❌
- Use base tokens directly in components (except for creating semantic tokens)
- Hardcode values: `color: #333`
- Skip the type field in token definitions
- Create single-use tokens (prefer existing semantic tokens)

### Example Usage
```tsx
// ✅ Good
const Button = styled.button`
  background: ${({theme}) => theme.semantic.color.background.interactive};
  color: ${({theme}) => theme.semantic.color.text.inverse};
  padding: ${({theme}) => theme.semantic.spacing.component.md};
`

// ❌ Bad  
const Button = styled.button`
  background: #3b82f6;
  color: white;
  padding: 16px;
`
```

This comprehensive token management system ensures consistency, maintainability, and scalability across the entire design system.