#!/usr/bin/env node
// Palette generator (#357, decisions 0040, 0044 and 0054).
//
//   npm run tokens:palette            writes the dark ramps and the docs preview's CSS
//   npm run tokens:palette -- --check fails if the light ramps break the rule, or the files are stale
//
// npm run build:tokens runs it too (with --quiet), because the preview CSS is built from
// tokens.css and must follow every token change.
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
const TOKENS_CSS = 'src/styles/tokens.css'
const DARK_OUT = 'src/tokens/modes/theme/dark.json'
const PREVIEW_OUT = 'src/page-components/DarkPalettePreview/darkPreviewCss.ts'
const PREVIEW_SELECTOR = '[data-co-preview-theme="dark"]'

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
  return problems
}

/**
 * 0040's floors, on the dark surfaces: the page (100), raised (200) and overlay (300) from #356.
 * And every alpha twin composites over the dark page to its solid step, as light's do over white.
 */
function checkDark(ramps) {
  const problems = []
  const page = ramps.gray['100'].$value
  for (const ramp of Object.keys(ramps).filter((name) => !name.endsWith('-alpha'))) {
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
      'Dark theme values for the base colour ramps (decision 0054). Generated by scripts/generate-palette.mjs from scripts/palette/params.mjs: do not edit by hand. Each step keeps its job, so 100 is the page and 1200 primary text. Not wired into a mode yet: the theme modifier is #358. $extensions.fillStep on a role ramp is the step its coloured fill uses in dark (#355).',
    base: { color: ramps },
  }
  return `${JSON.stringify(file, null, 2)}\n`
}

// --- Docs preview CSS --------------------------------------------------------------------------

const cssName = (ramp, step) => `--co-base-color-${ramp}-${step}`

/**
 * The CSS that applies the dark ramps to a region of the docs site, for review before the theme
 * mode exists (#358). A variable that references another is resolved where it's declared (decision
 * 0041, rule 6), so the region redeclares every variable that depends on a changed one.
 */
function previewCss(ramps) {
  const root = readFileSync(TOKENS_CSS, 'utf8').match(/:root \{\n([\s\S]*?)\n\}/)[1]
  const declared = new Map()
  for (const line of root.split('\n')) {
    const m = line.match(/^\s*(--co-[a-z0-9-]+):\s*(.*?);(?:\s*\/\*\*.*\*\/)?\s*$/)
    if (m) declared.set(m[1], m[2])
  }
  // Every declaration must parse, or its dependents would silently keep their light values
  const lines = root.split('\n').filter((line) => /^\s*--co-/.test(line)).length
  if (declared.size !== lines) {
    throw new Error(`Parsed ${declared.size} of ${lines} declarations in ${TOKENS_CSS}: update the parser in previewCss`)
  }
  const overrides = new Map()
  for (const [ramp, steps] of Object.entries(ramps)) {
    for (const step of STEPS) overrides.set(cssName(ramp, step), steps[step].$value)
  }
  // Provisional, until #356 lands: raised surfaces sit one step above the page in dark
  overrides.set('--co-semantic-surface-raised', 'var(--co-base-color-gray-200)')

  const changed = new Set(overrides.keys())
  const dependents = new Set()
  let grew = true
  while (grew) {
    grew = false
    for (const [name, value] of declared) {
      if (changed.has(name)) continue
      const refs = [...value.matchAll(/var\((--co-[a-z0-9-]+)/g)].map((m) => m[1])
      if (refs.some((ref) => changed.has(ref))) {
        changed.add(name)
        dependents.add(name)
        grew = true
      }
    }
  }
  const block = [
    ...[...overrides].map(([name, value]) => `  ${name}: ${value};`),
    ...[...declared].filter(([name]) => dependents.has(name)).map(([name, value]) => `  ${name}: ${value};`),
  ]
  const css = `${PREVIEW_SELECTOR} {\n  color-scheme: dark;\n${block.join('\n')}\n}\n`
  return `// Generated by scripts/generate-palette.mjs (#357): do not edit by hand.
// The dark ramps applied to a region of the docs site for review, before the theme mode (#358).
export const darkPreviewSelector = '${PREVIEW_SELECTOR}'

export const darkPreviewCss = \`${css}\`
`
}

// --- Run ---------------------------------------------------------------------------------------

const check = process.argv.includes('--check')
const quiet = process.argv.includes('--quiet')
const ramps = darkRamps()
const problems = [...checkLight(), ...checkDark(ramps)]
const outputs = [
  [DARK_OUT, darkFile(ramps)],
  [PREVIEW_OUT, previewCss(ramps)],
]

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
  console.log('Palette check passed: the light ramps follow the rule, and the dark files are current.')
} else {
  if (problems.length) console.warn(`The palette breaks the rule:\n${problems.map((p) => `  - ${p}`).join('\n')}`)
  for (const [file, content] of outputs) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, content)
    if (!quiet) console.log(`Wrote ${file}`)
  }
  if (quiet) process.exit(problems.length ? 1 : 0)
  const gray = ramps.gray
  console.log('\nDark grey ramp:')
  for (const step of STEPS) console.log(`  ${step.padStart(4)}  ${gray[step].$value}  ${gray[step].$description.split('), ')[1]}`)
  console.log('\nDark fill steps (on-fill text is gray.1200):')
  for (const ramp of FILL_RAMPS) {
    const { fillStep, fillStepContrast } = ramps[ramp].$extensions['studio.commonorigin']
    console.log(`  ${ramp.padEnd(8)} ${fillStep.padStart(4)}  ${ramps[ramp][fillStep].$value}  ${fillStepContrast}:1`)
  }
}
