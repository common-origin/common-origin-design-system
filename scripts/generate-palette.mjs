#!/usr/bin/env node
// Palette generator (#357, decisions 0040, 0044, 0054 and 0056).
//
//   npm run tokens:palette            writes the dark theme, then rebuilds tokens.css
//   node scripts/generate-palette.mjs --check  fails if light breaks a rule, or dark.json is stale
//
// One set of rules for every theme (0056). A theme supplies inputs: its grey ramp's lightness, the
// scrim opacity and the shadow strength, in scripts/palette/params.mjs. The rules derive the rest:
// the hue ramps and alpha twins, the solid fills, the surfaces, the inks, the scrim and shadows.
//
// Light was signed off value by value (some ramp steps rounded by hand at the edge of sRGB), so
// src/tokens/base/index.json stays its source, and the check confirms every light value still
// follows its rule: ramp steps within 0.005 (OKLab) and 1.5% contrast on white (at 16:1 one 8-bit
// step moves the ratio by about 0.2), role tokens exactly. Dark is generated, and this script's
// output is its source of truth: change the parameters, never src/tokens/modes/theme/dark.json.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import * as color from './palette/color.mjs'
import {
  FULL_CHROMA_STEPS,
  DARK_GRAY_LIGHTNESS,
  HUES,
  SCRIM_OPACITY,
  SHADOW_STRENGTH,
  SOLID_RAMPS,
  STEPS,
  TEXT_CHROMA_SHARE,
} from './palette/params.mjs'

const BASE = 'src/tokens/base/index.json'
const DARK_OUT = 'src/tokens/modes/theme/dark.json'

const baseTokens = JSON.parse(readFileSync(BASE, 'utf8')).base
const base = baseTokens.color
const fmt = (n, digits = 3) => n.toFixed(digits)

// --- Ramps -------------------------------------------------------------------------------------

const grayRamp = (theme) =>
  theme === 'light'
    ? Object.fromEntries(STEPS.map((step) => [step, base.gray[step].$value]))
    : Object.fromEntries(STEPS.map((step, i) => [step, color.linearToHex(color.oklchToLinearRgb([DARK_GRAY_LIGHTNESS[i], 0, 0]))]))

// Tint chroma comes from the signed-off light ramps, so dark always keeps light's chroma
const tintChroma = (ramp, step) => Math.round(color.hexToOklch(base[ramp][step].$value)[1] * 1000) / 1000

function chromaFor(ramp, step) {
  const H = HUES[ramp]
  if (FULL_CHROMA_STEPS.includes(step)) return (L) => color.maxChroma(L, H)
  if (step === '1200') return (L) => TEXT_CHROMA_SHARE * color.maxChroma(L, H)
  const tint = tintChroma(ramp, step)
  return (L) => Math.min(tint, color.maxChroma(L, H))
}

/** The OKLCH colour with this hue and chroma rule whose luminance matches the target (0044). */
function solveStep(targetY, H, chroma) {
  let lo = 0
  let hi = 1
  for (let i = 0; i < 60; i++) {
    const L = (lo + hi) / 2
    const y = color.luminanceOfLinear(color.oklchToLinearRgb([L, chroma(L), H]))
    if (y < targetY) lo = L
    else hi = L
  }
  const L = (lo + hi) / 2
  return [L, chroma(L), H]
}

function hueRamp(ramp, gray) {
  return Object.fromEntries(
    STEPS.map((step) => {
      const oklch = solveStep(color.luminance(gray[step]), HUES[ramp], chromaFor(ramp, step))
      return [step, color.linearToHex(color.oklchToLinearRgb(oklch))]
    })
  )
}

// --- Alpha twins -------------------------------------------------------------------------------

const rgb255 = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const ceil3 = (n) => Math.ceil(n * 1000 - 1e-9) / 1000

/** gray-alpha: the ramp's 1200 at the opacity that composites over the surface to the step (0040). */
function grayAlpha(hex, ink, surface) {
  const [t] = rgb255(hex)
  const [i] = rgb255(ink)
  const [s] = rgb255(surface)
  const a = i === s ? 0 : Math.round(((t - s) / (i - s)) * 1000) / 1000
  return `rgba(${i}, ${i}, ${i}, ${a})`
}

/** Hue twins: the smallest opacity, with its own RGB, that composites over the surface to the step (0044). */
function hueAlpha(hex, surface) {
  const t = rgb255(hex)
  const s = rgb255(surface)
  const need = t.map((tc, k) => (tc > s[k] ? (tc - s[k]) / (255 - s[k]) : tc < s[k] ? (s[k] - tc) / s[k] : 0))
  const a = Math.min(1, ceil3(Math.max(...need)))
  if (a === 0) return `rgba(${t.join(', ')}, 0)`
  const rgb = t.map((tc, k) => Math.min(255, Math.max(0, Math.round(s[k] + (tc - s[k]) / a))))
  return `rgba(${rgb.join(', ')}, ${a})`
}

const composite = (rgba, surface) => {
  const [r, g, b, a] = rgba.match(/[\d.]+/g).map(Number)
  const s = rgb255(surface)
  return [r, g, b].map((c, k) => Math.round(a * c + (1 - a) * s[k]))
}

/**
 * gray-alpha-inverse (#354): the inverse end of the grey ramp (gray.100) at gray-alpha's opacity for
 * each step, named by role like text.inverse, so it's dark-based in the dark theme.
 */
const opacityOf = (rgba) => rgba.match(/[\d.]+/g)[3]
const inverseAlpha = (gray100) =>
  Object.fromEntries(
    STEPS.map((step) => {
      const [r, g, b] = rgb255(gray100)
      return [step, `rgba(${r}, ${g}, ${b}, ${opacityOf(base['gray-alpha'][step].$value)})`]
    })
  )

// --- Light check -------------------------------------------------------------------------------

const LIGHT_DISTANCE = 0.005
const LIGHT_CONTRAST = 0.015

function checkLight() {
  const problems = []
  const gray = grayRamp('light')
  const ramps = { gray, ...Object.fromEntries(Object.keys(HUES).map((ramp) => [ramp, hueRamp(ramp, gray)])) }
  for (const [ramp, steps] of Object.entries(ramps)) {
    for (const step of STEPS) {
      const signed = base[ramp][step].$value
      const white = base.white.$value
      const far = color.deltaOk(signed, steps[step]) > LIGHT_DISTANCE
      const contrastGap = Math.abs(color.contrast(signed, white) / color.contrast(steps[step], white) - 1) > LIGHT_CONTRAST
      if (far || contrastGap) problems.push(`${ramp}.${step} is ${signed}, but the rule gives ${steps[step]}`)
      const twin = base[`${ramp}-alpha`][step].$value
      const over = composite(twin, base.white.$value)
      if (Math.max(...over.map((c, k) => Math.abs(c - rgb255(signed)[k]))) > 1) {
        problems.push(`${ramp}-alpha.${step} (${twin}) doesn't composite over white to ${signed}`)
      }
    }
  }
  const expected = inverseAlpha(base.gray['100'].$value)
  for (const step of STEPS) {
    const signed = base['gray-alpha-inverse']?.[step]?.$value
    if (signed !== expected[step]) problems.push(`gray-alpha-inverse.${step} is ${signed}, but the rule gives ${expected[step]}`)
  }
  return problems
}

/**
 * 0040's floors, on the dark surfaces: the page (100), raised (200) and overlay (300) from #356.
 * And every alpha twin composites over the dark page to its solid step, as light's do over white.
 */
function checkDark(ramps) {
  const problems = []
  const page = ramps.gray['100'].$value
  for (const ramp of ['gray', ...Object.keys(HUES)]) {
    for (const s of STEPS) {
      const solid = ramps[ramp][s].$value
      const twin = ramps[`${ramp}-alpha`][s].$value
      const over = composite(twin, page)
      if (Math.max(...over.map((c, k) => Math.abs(c - rgb255(solid)[k]))) > 1) {
        problems.push(`dark ${ramp}-alpha.${s} (${twin}) doesn't composite over the page to ${solid}`)
      }
    }
    const step = (s) => ramps[ramp][s].$value
    const gray = (s) => ramps.gray[s].$value
    for (const surface of ['100', '200', '300']) {
      if (color.contrast(step('800'), gray(surface)) < 3) problems.push(`dark ${ramp}.800 is under 3:1 on gray.${surface}`)
    }
    for (const surface of ['100', '200', '300', '400', '500']) {
      if (color.contrast(step('1100'), gray(surface)) < 4.5) problems.push(`dark ${ramp}.1100 is under 4.5:1 on gray.${surface}`)
    }
  }
  return problems
}

// --- Theme roles -------------------------------------------------------------------------------
//
// One set of rules gives every theme the role tokens the semantic tier reads (decision 0056), so
// semantic tokens reference the same paths in light and dark. Light's results must match the
// signed-off base tokens; dark's are generated.

const lum = color.luminance
const ref = (path) => `{base.color.${path}}`
const refValue = (value) => {
  const m = String(value).match(/^\{base\.(.+)\}$/)
  if (!m) return value
  return refValue(m[1].split('.').reduce((node, key) => node[key], baseTokens).$value)
}

/** The light theme's label contrast: secondary text (gray.1100) on the page (gray.100). */
const solidContrast = () => color.contrast(base.gray['100'].$value, base.gray['1100'].$value)

function themeRoles(theme, gray) {
  // Inks: the light and dark ends of the neutral ramp
  const [inkDark, inkLight] = ['100', '1200'].sort((a, b) => lum(gray[a]) - lum(gray[b]))
  // Surfaces: higher is lighter. Raised and overlay are the next neutrals lighter than the page,
  // in order; where the scale runs out (white in light), they share the lightest
  const neutrals = [...STEPS.map((step) => ({ path: `gray.${step}`, hex: gray[step] })), { path: 'white', hex: base.white.$value }]
  const lighter = neutrals.filter((n) => lum(n.hex) > lum(gray['100'])).sort((a, b) => lum(a.hex) - lum(b.hex))
  const surface = {
    page: 'gray.100',
    raised: (lighter[0] ?? { path: 'gray.100' }).path,
    overlay: (lighter[1] ?? lighter[0] ?? { path: 'gray.100' }).path,
  }
  // Solid fills: full chroma at the luminance where the light ink reads at the label contrast
  const label = gray[inkLight]
  const targetY = (lum(label) + 0.05) / solidContrast() - 0.05
  const solid = Object.fromEntries(
    SOLID_RAMPS.map((ramp) => {
      const oklch = solveStep(targetY, HUES[ramp], (L) => color.maxChroma(L, HUES[ramp]))
      return [ramp, color.linearToHex(color.oklchToLinearRgb(oklch))]
    })
  )
  return { ink: { light: `gray.${inkLight}`, dark: `gray.${inkDark}` }, surface, solid, scrim: SCRIM_OPACITY[theme] }
}

const scaleShadow = (value, strength) =>
  value.replace(/rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/g, (_, r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${Math.round(Number(a) * strength * 1000) / 1000})`)

function checkLightRoles() {
  const problems = []
  const roles = themeRoles('light', grayRamp('light'))
  const col = base
  for (const [name, path] of Object.entries(roles.ink)) {
    if (col.ink?.[name]?.$value !== ref(path)) problems.push(`ink.${name} should be ${ref(path)}`)
  }
  for (const [name, path] of Object.entries(roles.surface)) {
    if (col.surface?.[name]?.$value !== ref(path)) problems.push(`surface.${name} should be ${ref(path)}`)
  }
  for (const [ramp, hex] of Object.entries(roles.solid)) {
    const signed = refValue(col[ramp]?.solid?.$value)
    if (!signed || color.deltaOk(signed, hex) > LIGHT_DISTANCE) problems.push(`${ramp}.solid is ${signed}, but the rule gives ${hex}`)
  }
  if (Number(refValue(baseTokens.opacity.scrim?.$value)) !== roles.scrim) problems.push(`opacity.scrim should be ${roles.scrim}`)
  return problems
}

// --- Dark theme ----------------------------------------------------------------------------------

const job = (ramp, step) => base[ramp][step].$description.split(' oklch(')[0]

function darkTheme() {
  const gray = grayRamp('dark')
  const page = gray['100']
  const describe = (ramp, step, hex) => {
    const [L, C, H] = color.hexToOklch(hex)
    const hue = C < 0.0005 ? 0 : Math.round(H)
    return `${job(ramp, step)} oklch(${fmt(L)} ${fmt(C)} ${hue}), ${fmt(color.contrast(hex, page), 2)}:1 on the dark page.`
  }
  const out = {}
  const ramps = { gray, ...Object.fromEntries(Object.keys(HUES).map((ramp) => [ramp, hueRamp(ramp, gray)])) }
  for (const [ramp, steps] of Object.entries(ramps)) {
    out[ramp] = Object.fromEntries(STEPS.map((step) => [step, { $value: steps[step], $description: describe(ramp, step, steps[step]) }]))
    out[`${ramp}-alpha`] = Object.fromEntries(
      STEPS.map((step) => [
        step,
        {
          $value: ramp === 'gray' ? grayAlpha(steps[step], gray['1200'], page) : hueAlpha(steps[step], page),
          $description: `${job(ramp, step)} Composites to ${ramp}.${step} over the dark page.`,
        },
      ])
    )
  }
  const darkInverse = inverseAlpha(page)
  out['gray-alpha-inverse'] = Object.fromEntries(
    STEPS.map((step) => [
      step,
      { $value: darkInverse[step], $description: `${job('gray', step)} The dark page's grey at gray-alpha.${step}'s opacity.` },
    ])
  )
  const roles = themeRoles('dark', gray)
  const label = gray[roles.ink.light.split('.')[1]]
  for (const [ramp, hex] of Object.entries(roles.solid)) {
    out[ramp].solid = {
      $value: hex,
      $description: `Solid fill that carries a label: the light ink reads on it at ${fmt(color.contrast(hex, label), 2)}:1, the light theme's secondary-text contrast.`,
    }
  }
  out.surface = Object.fromEntries(
    Object.entries(roles.surface).map(([name, path]) => [name, { $value: ref(path), $description: `Surface ${name}: higher surfaces are lighter.` }])
  )
  out.ink = Object.fromEntries(
    Object.entries(roles.ink).map(([name, path]) => [name, { $value: ref(path), $description: `The ${name} end of the neutral ramp.` }])
  )
  const shadow = Object.fromEntries(
    Object.entries(baseTokens.shadow)
      .filter(([key]) => !key.startsWith('$'))
      .map(([key, token]) => [key, { $value: scaleShadow(token.$value, SHADOW_STRENGTH.dark), $description: `Light shadow ${key} at ${SHADOW_STRENGTH.dark}× the opacity: shadows barely show on a dark page.` }])
  )
  return {
    color: out,
    opacity: { scrim: { $value: String(SCRIM_OPACITY.dark), $description: 'How strongly the scrim dims the dark page.' } },
    shadow,
  }
}

function darkFile(theme) {
  const file = {
    $description:
      'The dark theme (decisions 0054 and 0056). Generated by scripts/generate-palette.mjs from scripts/palette/params.mjs: do not edit by hand. Each ramp step keeps its job, so 100 is the page and 1200 primary text, and the role tokens (solid fills, surfaces, inks, the scrim opacity and shadows) come from the same rules as light. Semantic tokens read the same paths in both themes. The theme modifier in src/tokens/resolver.json applies it as [data-co-theme="dark"] in tokens.css.',
    base: theme,
  }
  return `${JSON.stringify(file, null, 2)}\n`
}

// --- Run ---------------------------------------------------------------------------------------

const check = process.argv.includes('--check')
const theme = darkTheme()
const ramps = theme.color
const problems = [...checkLight(), ...checkLightRoles(), ...checkDark(ramps)]
const outputs = [[DARK_OUT, darkFile(theme)]]

if (check) {
  for (const [file, content] of outputs) {
    let current = ''
    try {
      current = readFileSync(file, 'utf8')
    } catch {
      // A missing file is reported as out of date below
    }
    if (current !== content) problems.push(`${file} is out of date: run npm run tokens:palette`)
  }
  if (problems.length) {
    console.error(`Palette check failed:\n${problems.map((p) => `  - ${p}`).join('\n')}`)
    process.exit(1)
  }
  console.log('Palette check passed: the light ramps follow the rule, and dark.json is current.')
} else {
  if (problems.length) console.warn(`The palette breaks the rule:\n${problems.map((p) => `  - ${p}`).join('\n')}`)
  for (const [file, content] of outputs) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
    console.log(`Wrote ${file}`)
  }
  const gray = ramps.gray
  console.log('\nDark grey ramp:')
  for (const step of STEPS) console.log(`  ${step.padStart(4)}  ${gray[step].$value}  ${gray[step].$description.split('), ')[1]}`)
  console.log('\nDark solid fills:')
  for (const ramp of SOLID_RAMPS) console.log(`  ${ramp.padEnd(8)} ${ramps[ramp].solid.$value}  ${ramps[ramp].solid.$description.match(/at ([\d.]+:1)/)[1]}`)
}
