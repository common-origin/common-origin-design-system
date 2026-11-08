// OKLCH, OKLab and sRGB conversions, WCAG luminance and contrast (decisions 0040 and 0044).
// Formulas from Björn Ottosson's OKLab definition and the sRGB transfer function in IEC 61966-2-1.

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

export function oklchToLinearRgb([L, C, H]) {
  const h = (H * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

export function linearRgbToOklch([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const C = Math.hypot(A, B)
  const H = ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360
  return [L, C, H]
}

const EPS = 1e-7
export const inGamut = (rgb) => rgb.every((c) => c >= -EPS && c <= 1 + EPS)

export const luminanceOfLinear = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b

export function hexToLinear(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => toLinear(v / 255))
}

export function linearToHex(rgb) {
  return `#${rgb
    .map((c) => Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255).toString(16).padStart(2, '0'))
    .join('')}`
}

export const hexToOklch = (hex) => linearRgbToOklch(hexToLinear(hex))
export const luminance = (hex) => luminanceOfLinear(hexToLinear(hex))

export function contrast(hexA, hexB) {
  const [a, b] = [luminance(hexA), luminance(hexB)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}

/** The most chroma sRGB allows at this OKLCH lightness and hue. */
export function maxChroma(L, H) {
  let lo = 0
  let hi = 0.5
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2
    if (inGamut(oklchToLinearRgb([L, mid, H]))) lo = mid
    else hi = mid
  }
  return lo
}

/** Euclidean distance in OKLab. */
export function deltaOk(hexA, hexB) {
  const lab = (hex) => {
    const [L, C, H] = hexToOklch(hex)
    const h = (H * Math.PI) / 180
    return [L, C * Math.cos(h), C * Math.sin(h)]
  }
  const [a, b] = [lab(hexA), lab(hexB)]
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
}
