import StyleDictionary from 'style-dictionary'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Read the config file
const config = JSON.parse(readFileSync(join(__dirname, 'config.json'), 'utf8'))
const sd = StyleDictionary.extend(config)

// The platforms use Style Dictionary's built-in js and css transform groups. Values are
// already resolved strings, so the build resolves references and writes files (#24).

// Custom TypeScript format for nested tokens
sd.registerFormat({
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

sd.buildAllPlatforms()
