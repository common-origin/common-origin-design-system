#!/usr/bin/env node
// Palette generator (#357, decisions 0040, 0044 and 0054).
//
//   npm run tokens:palette            writes the dark ramps, then rebuilds tokens.css
//   node scripts/generate-palette.mjs --check  fails if the light ramps break the rule, or the file is stale
//
// The light ramps in src/tokens/base/index.json were signed off value by value, and some were
// rounded by hand at the edge of sRGB, so they stay the source for light. The check confirms they
// still follow the rule: each is within 0.005 (OKLab) of what the rule gives, with the same
// contrast on white to 1.5% (at 16:1, one 8-bit step moves the ratio by about 0.2). The dark
// ramps must meet 0040's contrast floors on the dark surfaces.
// The dark ramps are generated, and the script's output is the source of truth for them: change
// scripts/palette/params.mjs, never the generated file.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import * as color from './palette/color.mjs'
import {
  FILL_RAMPS,
  FILL_TEXT_CONTRAST,
  FULL_CHROMA_STEPS,
  DARK_GRAY_LIGHTNESS,
  HUES,
  STEPS,
  TEXT_CHROMA_SHARE,
} from './palette/params.mjs'

const BASE = 'src/tokens/base/index.json'
const DARK_OUT = 'src/tokens/modes/theme/dark.json'

const base = JSON.parse(readFileSync(BASE, 'utf8')).base.color
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

// --- Dark ramps --------------------------------------------------------------------------------

const job = (ramp, step) => base[ramp][step].$description.split(' oklch(')[0]

function darkRamps() {
  const gray = grayRamp('dark')
  const page = gray['100']
  const onFill = gray['1200']
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
  // The most saturated step where on-fill text still meets 4.5:1 (#355)
  for (const ramp of FILL_RAMPS) {
    const candidates = STEPS.filter((step) => color.contrast(ramps[ramp][step], onFill) >= FILL_TEXT_CONTRAST)
    const fillStep = candidates.sort((a, b) => color.hexToOklch(ramps[ramp][b])[1] - color.hexToOklch(ramps[ramp][a])[1])[0]
    out[ramp].$extensions = {
      'studio.commonorigin': {
        fillStep,
        fillStepContrast: Number(fmt(color.contrast(ramps[ramp][fillStep], onFill), 2)),
      },
    }
  }
  return out
}

function darkFile(ramps) {
  const file = {
    $description:
      'Dark theme values for the base colour ramps (decision 0054). Generated by scripts/generate-palette.mjs from scripts/palette/params.mjs: do not edit by hand. Each step keeps its job, so 100 is the page and 1200 primary text. The theme modifier in src/tokens/resolver.json applies it as [data-co-theme="dark"] in tokens.css. $extensions.fillStep on a role ramp is the step its coloured fill uses in dark (#355).',
    base: { color: ramps },
  }
  return `${JSON.stringify(file, null, 2)}\n`
}

// --- Run ---------------------------------------------------------------------------------------

const check = process.argv.includes('--check')
const ramps = darkRamps()
const problems = [...checkLight(), ...checkDark(ramps)]
const outputs = [[DARK_OUT, darkFile(ramps)]]

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
  console.log('\nDark fill steps (on-fill text is gray.1200):')
  for (const ramp of FILL_RAMPS) {
    const { fillStep, fillStepContrast } = ramps[ramp].$extensions['studio.commonorigin']
    console.log(`  ${ramp.padEnd(8)} ${fillStep.padStart(4)}  ${ramps[ramp][fillStep].$value}  ${fillStepContrast}:1`)
  }
}
