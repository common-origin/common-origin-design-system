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

  // Each grey step's job sets its contrast (decision 0040): 800 can be a control edge, and 1100 can
  // be text on every background and fill step. The ramp only darkens, step by step.
  describe('the grey ramp', () => {
    const { gray } = tokens.base.color
    const white = '#ffffff'
    const steps = Object.keys(gray).sort((a, b) => Number(a) - Number(b))

    it('keeps the strong border at 3:1 or more on the page steps and white', () => {
      for (const surface of [white, gray[100], gray[200]]) {
        expect(contrast(gray[800], surface)).toBeGreaterThanOrEqual(3)
      }
    })

    it('keeps secondary text at 4.5:1 or more on every background and fill step and white', () => {
      for (const surface of [white, gray[100], gray[200], gray[300], gray[400], gray[500]]) {
        expect(contrast(gray[1100], surface)).toBeGreaterThanOrEqual(4.5)
      }
    })

    it('has 12 steps, each darker than the one before', () => {
      expect(steps).toEqual(['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200'])
      const values = steps.map((step) => luminance(gray[step as keyof typeof gray]))
      values.slice(1).forEach((value, i) => expect(value).toBeLessThan(values[i]))
    })

    it('makes each alpha twin composite over white to its step', () => {
      const alpha = tokens.base.color['gray-alpha']
      for (const step of steps) {
        const [r, g, b, a] = alpha[step as keyof typeof alpha].match(/[\d.]+/g)!.map(Number)
        const solid = parseInt(gray[step as keyof typeof gray].slice(1, 3), 16)
        expect([r, g, b]).toEqual([34, 34, 34])
        // Rounded to a whole channel value, as a browser would
        expect(Math.round(a * r + (1 - a) * 255)).toBe(solid)
      }
    })
  })

  // Each hue step has the grey step's job and its contrast with white (decision 0044), so the grey
  // ramp's floors hold in every hue
  describe.each(['accent', 'success', 'warning', 'serious', 'danger', 'ai', 'olive', 'periwinkle', 'rose', 'magenta'] as const)(
    'the %s ramp',
    (name) => {
      const { gray } = tokens.base.color
      const ramp = tokens.base.color[name]
      const white = '#ffffff'
      const steps = Object.keys(ramp).sort((a, b) => Number(a) - Number(b)) as (keyof typeof ramp)[]

      it('matches the grey ramp’s contrast with white at every step, within 2%', () => {
        expect(steps).toEqual(Object.keys(gray).sort((a, b) => Number(a) - Number(b)))
        for (const step of steps) {
          expect(Math.abs(contrast(ramp[step], white) / contrast(gray[step], white) - 1)).toBeLessThan(0.02)
        }
      })

      it('keeps the strong border at 3:1 or more on its own and the grey page steps and white', () => {
        for (const surface of [white, ramp[100], ramp[200], gray[100], gray[200]]) {
          expect(contrast(ramp[800], surface)).toBeGreaterThanOrEqual(3)
        }
      })

      it('keeps secondary text at 4.5:1 or more on its own and the grey background and fill steps and white', () => {
        const fills = ['100', '200', '300', '400', '500'] as const
        for (const surface of [white, ...fills.map((step) => ramp[step]), ...fills.map((step) => gray[step])]) {
          expect(contrast(ramp[1100], surface)).toBeGreaterThanOrEqual(4.5)
        }
      })

      it('makes each alpha twin composite over white to its step', () => {
        const alpha = tokens.base.color[`${name}-alpha`]
        for (const step of steps) {
          const [r, g, b, a] = alpha[step].match(/[\d.]+/g)!.map(Number)
          const solid = [1, 3, 5].map((i) => parseInt(ramp[step].slice(i, i + 2), 16))
          // Rounded to a whole channel value, as a browser would
          expect([r, g, b].map((channel) => Math.round(a * channel + (1 - a) * 255))).toEqual(solid)
        }
      })
    }
  )

  // Emphasis is stronger than default, never softer (decision 0029)
  it('makes emphasis text and icons darker than default', () => {
    const { text, icon } = tokens.semantic.color
    expect(luminance(text.emphasis)).toBeLessThan(luminance(text.default))
    expect(luminance(icon.emphasis)).toBeLessThan(luminance(icon.default))
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
