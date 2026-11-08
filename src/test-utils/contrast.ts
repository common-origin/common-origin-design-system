/**
 * WCAG 2.2 contrast ratio between two hex colours (#rgb or #rrggbb).
 * jsdom doesn't lay out or paint, so jest-axe's colour-contrast rule can't check
 * rendered colours; tests use this to check the token pairs a component renders.
 */
/** #rgb or #rrggbb as [r, g, b], 0–255 */
function channels(hex: string): number[] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16))
}

/**
 * A colour as #rrggbb. Translucent colours (the alpha twins, decision 0056) are composited over
 * `backdrop`, by default white: the surface light's twins are defined against, where each equals
 * its solid step. Dark's twins are defined against the dark page.
 */
export function opaque(color: string, backdrop = '#ffffff'): string {
  const rgba = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/)
  if (!rgba) return color
  const a = Number(rgba[4])
  const under = channels(backdrop)
  return `#${[1, 2, 3].map((i, k) => Math.round(a * Number(rgba[i]) + (1 - a) * under[k]).toString(16).padStart(2, '0')).join('')}`
}

export function relativeLuminance(color: string, backdrop?: string): number {
  const [r, g, b] = channels(opaque(color, backdrop)).map((value) => {
    const channel = value / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Translucent colours are composited over `backdrop` first (see `opaque`) */
export function contrastRatio(foreground: string, background: string, backdrop?: string): number {
  const [lighter, darker] = [relativeLuminance(foreground, backdrop), relativeLuminance(background, backdrop)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * The declarations styled-components injected for an element's classes under a pseudo-class
 * such as `:hover`, since getComputedStyle can't apply pseudo-classes. Every matching rule is
 * included, since a component can style the same state in more than one block.
 */
export function pseudoClassDeclarations(element: Element, pseudoClass: string): string {
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('')
  return Array.from(element.classList)
    .map((cls) => {
      const escaped = pseudoClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return Array.from(css.matchAll(new RegExp(`\\.${cls}${escaped}\\{([^}]*)\\}`, 'g')), (match) => match[1]).join('')
    })
    .join('')
}
