// The palette's parameters (decisions 0040, 0044 and 0054). scripts/generate-palette.mjs builds
// the dark ramps from these and checks the light ramps in src/tokens/base/index.json against them.
// To change a dark value, change a parameter here and rerun `npm run tokens:palette`: the
// generated file is never edited by hand (#357).

export const STEPS = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100', '1200']

/**
 * The grey ramp's OKLCH lightness per step (chroma 0, decision 0040). Every hue ramp takes its
 * luminance from these, so each hue step has the grey step's contrast (decision 0044).
 *
 * Light: the signed-off ramp, from #fcfcfc (page) to #222222 (primary text).
 *
 * Dark (owner rulings on #357, 2026-11-08): each step keeps its job (0054), so 100 is the page and
 * 1200 is primary text. The page is near-black and neutral. The floors from 0040 hold against the
 * dark surfaces: 800 is at least 3:1 on 100, 200 and 300 (the page, raised and overlay surfaces
 * from #356), and 1100 at least 4.5:1 on 100 to 500. The lower steps sit wider apart than in light
 * so raised and overlay surfaces read as lighter than the page. 800 also sits under 1200 at 4.5:1
 * or more, so the vivid 800 steps can carry on-fill text (#355): the window between that and 3:1
 * on 300 is narrow, which is why 800 is 0.52.
 */
export const GRAY_LIGHTNESS = {
  light: [0.991, 0.982, 0.961, 0.94, 0.918, 0.895, 0.86, 0.655, 0.615, 0.575, 0.5, 0.25],
  dark: [0.17, 0.205, 0.237, 0.265, 0.292, 0.322, 0.375, 0.52, 0.58, 0.63, 0.74, 0.94],
}

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
 * OKLCH chroma per step. Tints (100 to 700) use these values, as measured from the signed-off
 * light ramps. 0044 caps them from 0.012 at 100 to 0.13 at 700, and lower where a hue's gamut is
 * narrower. Steps 800 to 1100 use the most chroma sRGB allows, and 1200 uses 60% of it.
 *
 * Dark keeps the same hue and chroma, and only lightness moves (owner ruling on #357, 2026-11-08).
 * Where a value falls outside sRGB at the dark lightness, it's capped to the gamut.
 */
export const TINT_CHROMA = {
  accent: [0.002, 0.005, 0.011, 0.019, 0.027, 0.04, 0.055],
  success: [0.006, 0.016, 0.039, 0.065, 0.085, 0.106, 0.13],
  warning: [0.003, 0.007, 0.021, 0.036, 0.052, 0.074, 0.106],
  serious: [0.003, 0.005, 0.013, 0.021, 0.03, 0.043, 0.063],
  danger: [0.002, 0.004, 0.011, 0.019, 0.028, 0.04, 0.057],
  ai: [0.003, 0.006, 0.014, 0.023, 0.033, 0.046, 0.066],
  olive: [0.012, 0.025, 0.045, 0.065, 0.085, 0.105, 0.13],
  periwinkle: [0.001, 0.004, 0.011, 0.019, 0.027, 0.039, 0.055],
  rose: [0.002, 0.004, 0.012, 0.019, 0.029, 0.041, 0.06],
  magenta: [0.003, 0.007, 0.018, 0.03, 0.045, 0.063, 0.092],
}

export const FULL_CHROMA_STEPS = ['800', '900', '1000', '1100']
export const TEXT_CHROMA_SHARE = 0.6

/**
 * Coloured fills that carry `on-fill` text (#355). In dark, each one uses its ramp's most saturated
 * step where on-fill text (dark gray.1200) still meets 4.5:1.
 */
export const FILL_RAMPS = ['accent', 'success', 'warning', 'serious', 'danger']
export const FILL_TEXT_CONTRAST = 4.5
