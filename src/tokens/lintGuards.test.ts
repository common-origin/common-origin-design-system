/**
 * @jest-environment node
 */
import { execFileSync } from 'child_process'

// Regression fixtures for the token guards in eslint.config.mjs (P3, decisions 0013 and 0014).
// Jest can't load the ESM flat config in-process, so one child process lints every fixture.
const flagged = [
  ['hex colour in CSS', 'const A = styled.div`\n  color: #fff;\n`'],
  ['rgba colour in CSS', 'const A = styled.div`\n  background: rgba(0, 0, 0, 0.1);\n`'],
  ['uppercase colour function in CSS', 'const A = styled.div`\n  color: RGB(0, 0, 0);\n  background: HSL(0 0% 0%);\n`'],
  ['hex colour string', "const c = '#CAE8FF'"],
  ['z-index layer in CSS', 'const A = styled.div`\n  z-index: 10;\n`'],
  ['single-digit z-index layer in CSS', 'const A = styled.div`\n  z-index: 2;\n`'],
  ['negative z-index layer in CSS', 'const A = styled.div`\n  z-index: -2;\n`'],
  ['uppercase z-index in CSS', 'const A = styled.div`\n  Z-INDEX: 9999;\n`'],
  ['z-index with space before the colon', 'const A = styled.div`\n  z-index : 9999;\n`'],
  ['signed and zero-padded z-index in CSS', 'const A = styled.div`\n  z-index: +2;\n  z-index: 02;\n  z-index: -02;\n`'],
  ['numeric interpolation in CSS', 'const A = styled.div`\n  z-index: ${9999};\n`'],
  ['negative numeric interpolation in CSS', 'const A = styled.div`\n  z-index: ${-2};\n`'],
  ['arrow returning a number in CSS', 'const A = styled.div`\n  z-index: ${() => 9999};\n`'],
  ['arrow returning a negative number in CSS', 'const A = styled.div`\n  z-index: ${() => -2};\n`'],
  ['numeric interpolation in css helper', 'const a = css`\n  z-index: ${10};\n`'],
  ['zIndex style property', 'const a = { zIndex: 9999 }'],
  ['plus-signed zIndex style property', 'const a = { zIndex: +2 }'],
  ['colour in an SVG attribute', 'const a = <path fill="#000" />'],
  ['colour in a style object', "const a = { color: '#fff' }"],
  ['quoted zIndex key', "const a = { 'zIndex': 9999 }"],
  ['negative zIndex style property', 'const a = { zIndex: -5 }'],
  ['base token', 'const a = tokens.base.spacing'],
]

const allowed = [
  ['local stacking in CSS', 'const A = styled.div`\n  z-index: 1;\n  z-index: 0;\n  z-index: -1;\n`'],
  ['token interpolation', 'const A = styled.div`\n  z-index: ${semantic.zIndex.modal};\n`'],
  ['local zIndex style property', 'const a = { zIndex: 1 }'],
  ['computed value in CSS', 'const A = styled.div`\n  width: ${(p) => Math.min(100, p.value)}%;\n  opacity: ${(p) => (p.open ? 1 : 0)};\n`'],
  ['plain template string', 'const a = `item-${2}`'],
  ['hex-like text', "const a = <a href=\"#abc\" aria-label=\"Issue #123\">{`Issue #${n}`}</a>"],
  ['zero-padded local stacking in CSS', 'const A = styled.div`\n  z-index: 01;\n  z-index: +1;\n`'],
  ['hash link', "const href = '#section'"],
]

const lintScript = `
  import { ESLint } from 'eslint'
  const fixtures = JSON.parse(await new Response(process.stdin).text())
  const eslint = new ESLint()
  const counts = {}
  for (const [name, code] of fixtures) {
    const [result] = await eslint.lintText(code, { filePath: 'src/components/atoms/Fixture/Fixture.tsx' })
    counts[name] = result.messages.filter((m) => m.ruleId === 'no-restricted-syntax').length
  }
  console.log(JSON.stringify(counts))
`

const guardCounts: Record<string, number> = JSON.parse(
  execFileSync(process.execPath, ['--input-type=module', '-e', lintScript], {
    input: JSON.stringify([...flagged, ...allowed]),
    encoding: 'utf8',
  })
)

describe('component token lint guards', () => {
  it.each(flagged)('flags %s', (name) => {
    expect(guardCounts[name]).toBe(1)
  })

  it.each(allowed)('allows %s', (name) => {
    expect(guardCounts[name]).toBe(0)
  })
})
