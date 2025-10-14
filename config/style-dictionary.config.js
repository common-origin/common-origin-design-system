const StyleDictionary = require('style-dictionary').extend('./config/config.json')

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: 'nameFormatter',
  transformer: (token) => {
    return `${StyleDictionary.transform['name/cti/kebab'].transformer({ path: [token.path] }, { prefix: '' })}`
  },
})

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: 'valueKeyFormatter',
  transformer: (token) => {
      return token.value
  },
})

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'pxToRemConverter',
  matcher: ({ type }) => {
    return ['sizing'].includes(type)
  },
  transformer: (token) => {
    if (token.value && typeof token.value === 'string' && token.value.includes('px')) {
      const px_value = parseInt(token.value)

      const rem_value = px_value / 16

      return `${rem_value}rem`
    }
    return token.value
  },
})

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `baseToken`,
  matcher: ({ type }) => {
    return ['sizing'].includes(type)
  },
  transformer: (token) => {
    if (token.name === 'baseUnit') {
      return `${token.value}rem`
    }
    return token.value
  },
})

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'calculationFormatter',
  matcher: ({ type }) => {
    return ['fontSizes', 'borderRadius', 'borderWidth', 'spacing', 'lineHeights', 'boxShadow', 'sizing'].includes(type)
  },
  transformer: (token) => {
    let value = token.value

    if (typeof token.original.value === 'object' && !Array.isArray(value)) {
      Object.keys(token.original.value).forEach((key) => {
        objValue = token.original.value[key]
        if (objValue.includes(' * ') || objValue.includes(' - ')) {
          token.original.value[key] = `calc(${objValue})`
        }
      })
    } else if (Array.isArray(value)) {
      value.forEach((element) => {
        Object.keys(element).forEach((key) => {
          objValue = element[key]
          if (objValue.includes(' * ') || objValue.includes(' - ')) {
            element[key] = `calc(${objValue})`
          }
        })
      })
    } else if (token.value && typeof token.value === 'string' && token.value.includes(' * ') || token.value.includes(' - ')) {
      value = `calc(${token.value})`
    }

    return value
  },
})

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'boxShadowValueFormatter',
  matcher: ({ type }) => {
    return ['boxShadow'].includes(type)
  },
  transformer: (token) => {
    let tokenValue = token.value

    if (typeof tokenValue === 'string') {
      return tokenValue
    }

    let values = []

    if (Array.isArray(tokenValue)) {
      for (let i = 0; i < tokenValue.length; i++) {
        let tokenValueElement = tokenValue[i]

        if (token.name.includes('inset')) {
          tokenValueElement = Object.assign({ key: 'inset' }, tokenValueElement)
        }

        result = Object.values(tokenValueElement).slice(0, -1)
        values = values.concat(result)
      }
    } else {
      values = Object.values(tokenValue).slice(0, -1)
    }

    for (let i = 0; i < values.length; i++) {
      const colorRegex = /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/
      const isColor = colorRegex.test(values[i]) || values[i].includes('color')

      if (isColor && i != values.length - 1) {
        values[i] = `${values[i]},`
      }

      if (!isNaN(values[i])) {
        values[i] = `${values[i]}rem`
      }
    }

    return values.join(' ')
  },
})

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'typographyFormatter',
  matcher: ({ type }) => {
    return ['typography'].includes(type)
  },
  transformer: ({ name, value }) => {
    const filteredValue = Object.fromEntries(Object.entries(value).filter(([_, v]) => v != ''))
    const entries = Object.entries(filteredValue).slice(1)

    const flattendedValue = entries.reduce(
      (acc, [key, v], index) =>
        `${acc ? `${acc}\n  ` : ''}--${name}-${StyleDictionary.transform['name/cti/kebab'].transformer(
          { path: [key] },
          { prefix: '' },
        )}: ${v}${index + 1 === entries.length ? '' : ';'}`,
      `${Object.values(value)[0]};`,
    )
    return flattendedValue
  },
})

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: 'typographyNameFormatter',
  matcher: ({ type }) => {
    return ['typography'].includes(type)
  },
  transformer: (token) => {
    const key = Object.keys(token.original.value)[0]
    return `${token.name}-${StyleDictionary.transform['name/cti/kebab'].transformer({ path: [key] }, { prefix: '' })}`
  },
})

const calculateExpressionToRem = (expression) => {
  const components = expression.split(/[\+\-\*\/]/)
  let result = parseFloat(components[0].trim())

  for (let i = 1; i < components.length; i++) {
    const operator = expression[expression.indexOf(components[i]) - 1]
    const value = parseFloat(components[i].trim())

    if (isNaN(value)) {
      throw new Error(`Invalid component: ${components[i]}`)
    }

    switch (operator) {
      case '+':
        result += value
        break
      case '-':
        result -= value
        break
      case '*':
        result *= value
        break
      case '/':
        result /= value
        break
      default:
        throw new Error(`Invalid operator: ${operator}`)
    }
  }

  return `${result}rem`
}

StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'jsCalculationFormatter',
  matcher: ({ type }) => {
    return ['fontSizes', 'borderRadius', 'borderWidth', 'spacing', 'lineHeights', 'sizing'].includes(type)
  },
  transformer: (token) => {
    let calculatedValue = ''

    if (token.value && typeof token.value === 'string' && token.value.includes(' * ' || ' - ' || ' / ' || ' + ')) {
      calculatedValue = calculateExpressionToRem(token.value)
    }

    return calculatedValue || token.value
  },
})

// Enhanced transform for responsive values
StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'responsiveFormatter',
  matcher: ({ type }) => {
    return ['responsive'].includes(type)
  },
  transformer: (token) => {
    if (typeof token.value === 'object') {
      // Convert responsive object to CSS
      const breakpoints = Object.keys(token.value);
      let css = token.value.default || token.value.base;
      
      breakpoints.forEach(bp => {
        if (bp !== 'default' && bp !== 'base') {
          css += `\n  @media (min-width: ${bp}) {\n    ${token.value[bp]}\n  }`;
        }
      });
      
      return css;
    }
    return token.value;
  },
});

// Enhanced color transform with opacity support
StyleDictionary.registerTransform({
  type: 'value',
  transitive: true,
  name: 'colorWithOpacity',
  matcher: ({ type }) => {
    return ['color'].includes(type)
  },
  transformer: (token) => {
    const value = token.value;
    
    // If it's a hex color, ensure it's properly formatted
    if (typeof value === 'string' && value.startsWith('#')) {
      return value.toLowerCase();
    }
    
    // If it's an object with opacity, convert to rgba/hsla
    if (typeof value === 'object' && value.hex && value.opacity) {
      const hex = value.hex.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, ${value.opacity})`;
    }
    
    return value;
  },
});

// Custom format for styled-components utilities
StyleDictionary.registerFormat({
  name: 'javascript/styled-components',
  formatter: function(dictionary) {
    // Clean up the tokens object to only include values
    const cleanTokens = (obj) => {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'value' in value) {
          result[key] = value.value;
        } else if (value && typeof value === 'object') {
          result[key] = cleanTokens(value);
        }
      }
      return result;
    };
    
    const tokens = cleanTokens(dictionary.tokens);
    
    return `// Auto-generated styled-components utilities
export const tokens = ${JSON.stringify(tokens, null, 2)};

// Utility functions for styled-components
export const spacing = (value) => {
  const token = tokens.base?.spacing?.[value];
  return token || value;
};

export const color = (path) => {
  const keys = path.split('.');
  let value = tokens;
  for (const key of keys) {
    value = value?.[key];
  }
  return value || path;
};

export const borderRadius = (value) => {
  const token = tokens.base?.border?.radius?.[value];
  return token || value;
};

export const shadow = (value) => {
  const token = tokens.base?.shadow?.[value];
  return token || value;
};

export const fontSize = (value) => {
  const token = tokens.base?.fontSize?.[value];
  return token || value;
};

export const fontWeight = (value) => {
  const token = tokens.base?.fontWeight?.[value];
  return token || value;
};

export const typography = (value) => {
  const token = tokens.semantic?.typography?.[value];
  return token || value;
};

// Default export for convenience
export default tokens;
`;
  }
});

// Custom format for CSS utilities
StyleDictionary.registerFormat({
  name: 'css/utilities',
  formatter: function(dictionary) {
    let css = `/* Auto-generated CSS utilities */\n\n`;
    
    // Generate spacing utilities
    css += `/* Spacing utilities */\n`;
    dictionary.allTokens
      .filter(token => token.path[0] === 'base' && token.path[1] === 'spacing')
      .forEach(token => {
        const key = token.path[2];
        const value = token.value;
        css += `.m-${key} { margin: ${value}; }\n`;
        css += `.mt-${key} { margin-top: ${value}; }\n`;
        css += `.mb-${key} { margin-bottom: ${value}; }\n`;
        css += `.ml-${key} { margin-left: ${value}; }\n`;
        css += `.mr-${key} { margin-right: ${value}; }\n`;
        css += `.mx-${key} { margin-left: ${value}; margin-right: ${value}; }\n`;
        css += `.my-${key} { margin-top: ${value}; margin-bottom: ${value}; }\n`;
        css += `.p-${key} { padding: ${value}; }\n`;
        css += `.pt-${key} { padding-top: ${value}; }\n`;
        css += `.pb-${key} { padding-bottom: ${value}; }\n`;
        css += `.pl-${key} { padding-left: ${value}; }\n`;
        css += `.pr-${key} { padding-right: ${value}; }\n`;
        css += `.px-${key} { padding-left: ${value}; padding-right: ${value}; }\n`;
        css += `.py-${key} { padding-top: ${value}; padding-bottom: ${value}; }\n`;
        css += `\n`;
      });
    
    // Generate color utilities
    css += `/* Color utilities */\n`;
    dictionary.allTokens
      .filter(token => token.path[0] === 'base' && token.path[1] === 'color')
      .forEach(token => {
        const colorGroup = token.path[2];
        const shade = token.path[3];
        css += `.text-${colorGroup}-${shade} { color: ${token.value}; }\n`;
        css += `.bg-${colorGroup}-${shade} { background-color: ${token.value}; }\n`;
        css += `.border-${colorGroup}-${shade} { border-color: ${token.value}; }\n`;
      });
    
    return css;
  }
});

// Custom TypeScript format for nested tokens
StyleDictionary.registerFormat({
  name: 'typescript/nested-interface',
  formatter: function(dictionary) {
    const buildInterface = (obj, interfaceName = 'Tokens') => {
      let result = `export interface ${interfaceName} {\n`;
      
      for (const [key, value] of Object.entries(obj)) {
        const safeKey = /^[0-9]/.test(key) || key.includes('-') || key.includes(' ') ? `'${key}'` : key;
        
        if (value && typeof value === 'object' && !('value' in value)) {
          // Nested object - create sub-interface
          const subInterfaceName = `${interfaceName}${key.charAt(0).toUpperCase() + key.slice(1)}`;
          result += `  ${safeKey}: ${subInterfaceName};\n`;
        } else {
          // Leaf node - string value
          result += `  ${safeKey}: string;\n`;
        }
      }
      
      result += `}\n\n`;
      return result;
    };
    
    const buildAllInterfaces = (obj, interfaceName = 'Tokens', processed = new Set()) => {
      if (processed.has(interfaceName)) return '';
      processed.add(interfaceName);
      
      let result = '';
      
      // Build sub-interfaces first
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && !('value' in value)) {
          const subInterfaceName = `${interfaceName}${key.charAt(0).toUpperCase() + key.slice(1).replace(/[-\s]/g, '')}`;
          result += buildAllInterfaces(value, subInterfaceName, processed);
        }
      }
      
      // Build current interface
      result += buildInterface(obj, interfaceName);
      
      return result;
    };
    
    const cleanTokens = (obj) => {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object' && 'value' in value) {
          result[key] = value.value;
        } else if (value && typeof value === 'object') {
          result[key] = cleanTokens(value);
        }
      }
      return result;
    };
    
    const tokens = cleanTokens(dictionary.tokens);
    
    return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

${buildAllInterfaces(tokens)}
declare const tokens: Tokens;
export default tokens;
`;
  }
});

StyleDictionary.buildAllPlatforms()
