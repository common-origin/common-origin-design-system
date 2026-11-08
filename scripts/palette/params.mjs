// The palette's parameters (decisions 0040, 0044 and 0054). scripts/generate-palette.mjs builds
// the dark ramps from these and checks the light ramps in src/tokens/base/index.json against them.
// To change a dark value, change a parameter here and rerun `npm run tokens:palette`: the
// generated file is never edited by hand (#357).

export const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200']

/**
 * The dark grey ramp's OKLCH lightness per step (chroma 0, decision 0040). Every dark hue ramp
 * takes its luminance from these, so each hue step has the grey step's contrast (decision 0044).
 * The light grey ramp needs no parameters: it's the signed-off ramp in src/tokens/base/index.json.
 *
 * Dark (owner rulings on #357, 2026-11-08): each step keeps its job (0054), so 100 is the page and
 * 1200 is primary text. The page is near-black and neutral. The floors from 0040 hold against the
 * dark surfaces: 800 is at least 3:1 on 100, 200 and 300 (the page, raised and overlay surfaces
 * from #356), and 1100 at least 4.5:1 on 100 to 500. The lower steps sit wider apart than in light
 * so raised and overlay surfaces read as lighter than the page. 800 also sits under 1200 at 4.5:1
 * or more, so the vivid 800 steps can carry on-fill text (#355): the window between that and 3:1
 * on 300 is narrow, which is why 800 is 0.52.
 */
export const DARK_GRAY_LIGHTNESS = [0.17, 0.205, 0.237, 0.265, 0.292, 0.322, 0.375, 0.52, 0.58, 0.63, 0.74, 0.94]

/** Each ramp's OKLCH hue (decision 0044). */
export const HUES = {
  accent: 255,
  success: 160,
  warning: 80,
  serious: 47,
  danger: 29,
  ai: 305,
  olive: 117,
  periwinkle: 277,
  rose: 4,
  magenta: 329,
}

/**
 * OKLCH chroma per step. Tints (100 to 700) take their chroma from the signed-off light ramps in
 * src/tokens/base/index.json: 0044 caps them from 0.012 at 100 to 0.13 at 700, lower where a hue's
 * gamut is narrower. Steps 800 to 1100 use the most chroma sRGB allows, and 1200 uses 60% of it.
 *
 * Dark keeps the same hue and chroma, and only lightness moves (owner ruling on #357, 2026-11-08).
 * Where a value falls outside sRGB at the dark lightness, it's capped to the gamut.
 */
export const FULL_CHROMA_STEPS = ['800', '900', '1000', '1100']
export const TEXT_CHROMA_SHARE = 0.6

/**
 * Solid fills that carry a label (decision 0056): each role's `solid` sits where its label (the
 * light ink) reads at the contrast secondary text has with the page in light, gray.1100 on gray.100.
 * In light that is step 1100 itself; in dark it's a vivid mid-tone. Every hover and pressed state,
 * which mixes the label in at 8% and 12%, then stays above 4.5:1.
 */
export const SOLID_RAMPS = ['accent', 'success', 'warning', 'serious', 'danger']

/**
 * The two theme parameters that aren't ramps (owner rulings on #354 and #356): how strongly the
 * scrim dims the page, and how strong shadows are. Shadows stay black (decision 0012); the light
 * values in src/tokens/base/index.json are multiplied by the strength.
 */
export const SCRIM_OPACITY = { light: 0.5, dark: 0.7 }
export const SHADOW_STRENGTH = { light: 1, dark: 2 }
