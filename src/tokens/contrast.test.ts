import { execFileSync } from 'child_process'
import { readFileSync } from 'fs'
import lightTokens from '@/styles/tokens.json'
import darkTokens from '@/styles/tokens.theme-dark.json'
import { opaque } from '../test-utils/contrast'

// WCAG 2.2 relative luminance and contrast ratio, for hex colours (P2). Translucent fills are
// composited over a backdrop: the surface their theme defines them against (decision 0056)
function luminance(color: string, backdrop?: string) {
  const hex = opaque(color, backdrop)
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function contrastOver(backdrop: string | undefined, a: string, b: string) {
  const [light, dark] = [luminance(a, backdrop), luminance(b, backdrop)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

// Both themes, resolved (#359). One set of colour rules makes the same pairings in each theme
// (decision 0056), so every pairing below runs against both.
const themes = [
  ['light', lightTokens],
  ['dark', darkTokens as unknown as typeof lightTokens],
] as const

describe.each(themes)('token contrast (%s)', (theme, tokens) => {
  const { surface } = tokens.semantic
  const { gray } = tokens.base.color
  // The page, raised and overlay surfaces. Light's raised and overlay are white
  const surfaces = [surface.base, surface.raised, surface.overlay]
  // The surface furthest from primary text: white in light, the page in dark. The alpha twins
  // composite over it to their solid steps, and each ramp step moves further from it
  const backdrop = surfaces.reduce((a, b) =>
    contrastOver(undefined, gray[1200], b) > contrastOver(undefined, gray[1200], a) ? b : a
  )
  const contrast = (a: string, b: string) => contrastOver(backdrop, a, b)
  const { input } = tokens.component

  it('composites over white in light and over the page in dark', () => {
    expect(backdrop).toBe(theme === 'light' ? tokens.base.color.white : gray[100])
  })

  // Placeholder text isn't disabled text, so it isn't exempt from SC 1.4.3 (#145)
  it('keeps input placeholder text at 4.5:1 or more on the input fill', () => {
    expect(contrast(input.placeholder.textColor, input.default.backgroundColor)).toBeGreaterThanOrEqual(4.5)
  })

  // A resting control's border shows where the control is, so it needs 3:1 against the fill and
  // the surfaces (SC 1.4.11, decision 0025). Disabled borders are exempt
  it('keeps the resting input border at 3:1 or more on the input fill and every surface', () => {
    for (const background of [input.default.backgroundColor, ...surfaces]) {
      expect(contrast(input.default.borderColor, background)).toBeGreaterThanOrEqual(3)
    }
  })

  // Each grey step's job sets its contrast (decision 0040): 800 can be a control edge, and 1100 can
  // be text on every background and fill step. Each step moves further from the backdrop.
  describe('the grey ramp', () => {
    const steps = Object.keys(gray).sort((a, b) => Number(a) - Number(b)) as (keyof typeof gray)[]

    it('keeps the strong border at 3:1 or more on the page steps and every surface', () => {
      for (const background of [...surfaces, gray[100], gray[200]]) {
        expect(contrast(gray[800], background)).toBeGreaterThanOrEqual(3)
      }
    })

    it('keeps secondary text at 4.5:1 or more on every background and fill step and surface', () => {
      for (const background of [...surfaces, gray[100], gray[200], gray[300], gray[400], gray[500]]) {
        expect(contrast(gray[1100], background)).toBeGreaterThanOrEqual(4.5)
      }
    })

    it('has 12 steps, each further from the backdrop than the one before', () => {
      expect(steps).toEqual(['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200'])
      const values = steps.map((step) => contrast(gray[step], backdrop))
      values.slice(1).forEach((value, i) => expect(value).toBeGreaterThan(values[i]))
    })

    it('makes each alpha twin the ramp’s 1200 at the opacity that composites over the backdrop to its step', () => {
      const alpha = tokens.base.color['gray-alpha']
      const ink = [1, 3, 5].map((i) => parseInt(gray[1200].slice(i, i + 2), 16))
      for (const step of steps) {
        expect(alpha[step].match(/[\d.]+/g)!.slice(0, 3).map(Number)).toEqual(ink)
        // Rounded to a whole channel value, as a browser would
        expect(opaque(alpha[step], backdrop)).toBe(gray[step])
      }
    })
  })

  // The AI marker's text and icon (decision 0046) on every surface and the AI role's fills
  it('keeps AI text at 4.5:1 and the AI icon at 3:1 or more on every surface and the AI fills', () => {
    const { text, icon } = tokens.semantic.color
    const { ai } = tokens.base.color
    for (const background of [...surfaces, ai[100], ai[200], ai[300], ai[400], ai[500]]) {
      expect(contrast(text.ai, background)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(icon.ai, background)).toBeGreaterThanOrEqual(3)
    }
  })

  // Each hue step has the grey step's job and its contrast with the backdrop (decision 0044), so
  // the grey ramp's floors hold in every hue
  describe.each(['accent', 'success', 'warning', 'serious', 'danger', 'ai', 'olive', 'periwinkle', 'rose', 'magenta'] as const)(
    'the %s ramp',
    (name) => {
      const ramp = tokens.base.color[name]
      // The numbered steps; a role ramp also has its solid fill (decision 0056)
      const steps = Object.keys(ramp)
        .filter((key) => /^\d+$/.test(key))
        .sort((a, b) => Number(a) - Number(b)) as (keyof typeof gray & keyof typeof ramp)[]

      it('matches the grey ramp’s contrast with the backdrop at every step, within 2%', () => {
        expect(steps).toEqual(Object.keys(gray).sort((a, b) => Number(a) - Number(b)))
        for (const step of steps) {
          expect(Math.abs(contrast(ramp[step], backdrop) / contrast(gray[step], backdrop) - 1)).toBeLessThan(0.02)
        }
      })

      it('keeps the strong border at 3:1 or more on its own and the grey page steps and every surface', () => {
        for (const background of [...surfaces, ramp[100], ramp[200], gray[100], gray[200]]) {
          expect(contrast(ramp[800], background)).toBeGreaterThanOrEqual(3)
        }
      })

      it('keeps secondary text at 4.5:1 or more on its own and the grey background and fill steps and every surface', () => {
        const fills = ['100', '200', '300', '400', '500'] as const
        for (const background of [...surfaces, ...fills.map((step) => ramp[step]), ...fills.map((step) => gray[step])]) {
          expect(contrast(ramp[1100], background)).toBeGreaterThanOrEqual(4.5)
        }
      })

      it('makes each alpha twin composite over the backdrop to its step', () => {
        const alpha = tokens.base.color[`${name}-alpha`]
        for (const step of steps) {
            // Rounded to a whole channel value, as a browser would
          expect(opaque(alpha[step], backdrop)).toBe(ramp[step])
        }
      })
    }
  )

  // Chart colours (decision 0043): marks that carry a series or a value clear 3:1 on every
  // surface, so they meet SC 1.4.11. The pale ends of the sequential and diverging scales are
  // exempt: they stand for values near the bottom or the middle, and charts label them.
  describe('the data colours', () => {
    const { data } = tokens.semantic.color

    it('keeps positive, negative and every categorical series at 3:1 or more on every surface', () => {
      for (const colour of [data.positive, data.negative, ...Object.values(data.categorical)]) {
        for (const background of surfaces) expect(contrast(colour, background)).toBeGreaterThanOrEqual(3)
      }
    })

    it('keeps the coloured diverging steps at 3:1 or more, around a neutral centre', () => {
      const { balance } = data.diverging
      for (const step of ['1', '2', '4', '5'] as const) {
        for (const background of surfaces) expect(contrast(balance[step], background)).toBeGreaterThanOrEqual(3)
      }
      expect(balance['3']).toBe(gray[300])
    })

    it('moves the sequential scale further from the backdrop step by step', () => {
      const steps = (['1', '2', '3', '4', '5'] as const).map((step) => contrast(data.sequential.periwinkle[step], backdrop))
      steps.slice(1).forEach((value, i) => expect(value).toBeGreaterThan(steps[i]))
    })
  })

  // Text and icons have two levels from the grey ramp, and emphasis comes from weight (decision 0048).
  // Primary text keeps light's 15:1 on the page; every surface meets P2
  it('keeps primary and secondary text and icons at their contrast floors', () => {
    const { text, icon } = tokens.semantic.color
    expect(contrast(text.default, surface.base)).toBeGreaterThanOrEqual(15)
    for (const background of surfaces) {
      expect(contrast(text.default, background)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(text.muted, background)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(icon.muted, background)).toBeGreaterThanOrEqual(4.5)
    }
  })

  // Inverse content sits on the strong fill, and on-fill content on the solid role fills, whose
  // ink is set for 4.5:1 or more in both themes (decision 0056)
  it('keeps inverse text on the strong fill and on-fill text on the solid fills at 4.5:1 or more', () => {
    const { text, icon, fill } = tokens.semantic.color
    for (const strong of [fill.emphasis, fill.inverse]) {
      expect(contrast(text.inverse, strong)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(icon.inverse, strong)).toBeGreaterThanOrEqual(4.5)
    }
    for (const solid of [fill.accent, fill.danger, fill.success, fill.warning, fill.serious]) {
      expect(contrast(text['on-fill'], solid)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(icon['on-fill'], solid)).toBeGreaterThanOrEqual(4.5)
    }
  })

  // Inverse content is the page end of the grey ramp (decision 0049)
  it('takes inverse content from gray.100', () => {
    const { text, icon } = tokens.semantic.color
    expect(text.inverse).toBe(gray[100])
    expect(icon.inverse).toBe(gray[100])
  })
})

describe('token contrast (either theme)', () => {
  const tokens = lightTokens

  // A strong fill's states mix its content colour in at the state-layer opacity (decision 0048)
  it('builds the strong fill states from fill.emphasis, text.inverse and opacity.state', () => {
    const { button } = tokens.component
    const { opacity, color } = tokens.semantic
    expect(opacity.state).toEqual({ hover: '0.08', pressed: '0.12' })
    expect(button.hover.backgroundColor).toBe(`color-mix(in srgb, ${color.fill.emphasis}, ${color.text.inverse} calc(0.08 * 100%))`)
    expect(button.active.backgroundColor).toBe(`color-mix(in srgb, ${color.fill.emphasis}, ${color.text.inverse} calc(0.12 * 100%))`)
  })

  // White is base.color.white, off the ramps (decision 0049). Light's raised surface is white
  it('takes white from base.color.white', () => {
    const { base, semantic } = tokens
    expect(base.color.white).toBe('#ffffff')
    expect(semantic.surface.raised).toBe(base.color.white)
    // 3.0 removes neutral.*, so the semantic and component tiers must not reference its white
    for (const tier of ['semantic', 'component']) {
      expect(readFileSync(`src/tokens/${tier}/index.json`, 'utf8')).not.toContain('neutral.000')
    }
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
