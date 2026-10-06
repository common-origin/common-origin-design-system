// Token build on Style Dictionary 5 (decision 0017, step 4 of #24). The token source still uses the
// pre-DTCG format (`value`, `type`, `description`); step 5 converts it to DTCG.
import StyleDictionary from 'style-dictionary'

// Nested TypeScript interfaces for the published `Tokens*` types. Every leaf is a string.
function nestedInterface({ dictionary }) {
  const isToken = (node) => node && typeof node === 'object' && 'value' in node
  const typeName = (parent, key) => `${parent}${key.charAt(0).toUpperCase() + key.slice(1).replace(/[-\s]/g, '')}`
  const safeKey = (key) => (/^[0-9]/.test(key) || key.includes('-') || key.includes(' ') ? `'${key}'` : key)

  const values = (node) =>
    Object.fromEntries(
      Object.entries(node)
        .filter(([, child]) => child && typeof child === 'object')
        .map(([key, child]) => [key, isToken(child) ? child.value : values(child)])
    )

  const interfaces = (node, name = 'Tokens', seen = new Set()) => {
    if (seen.has(name)) return ''
    seen.add(name)
    const children = Object.entries(node)
      .filter(([, child]) => child && typeof child === 'object')
      .map(([key, child]) => interfaces(child, typeName(name, key), seen))
      .join('')
    const fields = Object.entries(node)
      .map(([key, child]) =>
        child && typeof child === 'object'
          ? `  ${safeKey(key)}: ${typeName(name, key)};\n`
          : `  ${safeKey(key)}: string;\n`
      )
      .join('')
    return `${children}export interface ${name} {\n${fields}}\n\n`
  }

  // No timestamp, so a build with no token changes leaves the file untouched (defect 8)
  return `/**
 * Do not edit directly, this file was auto-generated.
 */

${interfaces(values(dictionary.tokens))}
declare const tokens: Tokens;
export default tokens;
`
}

const sd = new StyleDictionary({
  // The three tier folders, in this order so output order stays stable
  source: ['src/tokens/base/**/*.json', 'src/tokens/component/**/*.json', 'src/tokens/semantic/**/*.json'],
  log: { warnings: 'error' },
  hooks: {
    formats: { 'typescript/nested-interface': nestedInterface },
  },
  // No value transforms yet. Style Dictionary 5's built-in groups match on token type, so `js` and
  // `css` would rewrite every colour (#16191C -> #16191c, transparent -> #00000000). Step 4 must
  // leave values unchanged, so each platform names only the transform it needs; value transforms
  // come back deliberately, with their own diff, in later steps.
  platforms: {
    tokens: {
      transforms: ['name/camel'],
      buildPath: 'src/styles/',
      files: [{ format: 'json/nested', destination: 'tokens.json' }],
    },
    custom: {
      transforms: ['name/kebab'],
      buildPath: 'src/styles/',
      files: [{ format: 'css/variables', destination: 'tokens.css' }],
    },
    typescript: {
      transforms: ['name/camel'],
      buildPath: 'src/styles/',
      files: [{ format: 'typescript/nested-interface', destination: 'tokens.d.ts' }],
    },
  },
})

await sd.buildAllPlatforms()
