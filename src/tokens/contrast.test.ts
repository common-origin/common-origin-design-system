import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import tokens from '@/styles/tokens.json'

// WCAG 2.2 relative luminance and contrast ratio, for hex colours (P2)
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

describe('token contrast', () => {
  const { input } = tokens.component

  // Placeholder text isn't disabled text, so it isn't exempt from SC 1.4.3 (#145)
  it('keeps input placeholder text at 4.5:1 or more on the input fill', () => {
    expect(contrast(input.placeholder.textColor, input.default.backgroundColor)).toBeGreaterThanOrEqual(4.5)
  })

  // A resting control's border shows where the control is, so it needs 3:1 against the fill and
  // the page (SC 1.4.11, decision 0025). Disabled borders are exempt
  it('keeps the resting input border at 3:1 or more on the input fill and the page', () => {
    const { background } = tokens.semantic.color
    expect(contrast(input.default.borderColor, input.default.backgroundColor)).toBeGreaterThanOrEqual(3)
    expect(contrast(input.default.borderColor, background.default)).toBeGreaterThanOrEqual(3)
  })

  // Firefox renders placeholders at 0.54 opacity by default, which would cut that contrast to about
  // 2.6:1, so every ::placeholder rule in the components resets it
  it('sets opacity: 1 in every ::placeholder rule', () => {
    let files = ''
    try {
      files = execFileSync('git', ['grep', '-l', '::placeholder', '--', 'src/components', ':!*.test.tsx', ':!*.docs.tsx'], { encoding: 'utf8' })
    } catch (error) {
      if ((error as { status?: number }).status !== 1) throw error
    }
    const missing = files.trim().split('\n').filter(Boolean).flatMap((file) =>
      // The rule body runs to the brace on its own line; `${…}` interpolations close inside it
      [...readFileSync(file, 'utf8').matchAll(/::placeholder\s*\{([\s\S]*?)\n\s*\}/g)]
        .filter((match) => !/opacity:\s*1\s*;/.test(match[1]))
        .map(() => file)
    )
    expect(missing).toEqual([])
  })
})
