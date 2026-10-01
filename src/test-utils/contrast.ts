/**
 * WCAG 2.2 contrast ratio between two hex colours (#rgb or #rrggbb).
 * jsdom doesn't lay out or paint, so jest-axe's colour-contrast rule can't check
 * rendered colours; tests use this to check the token pairs a component renders.
 */
function relativeLuminance(hex: string): number {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(full.slice(i, i + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * The declarations styled-components injected for one of an element's classes under a
 * pseudo-class such as `:hover`, since getComputedStyle can't apply pseudo-classes.
 */
export function pseudoClassDeclarations(element: Element, pseudoClass: string): string {
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('')
  return Array.from(element.classList)
    .map((cls) => {
      const match = css.match(new RegExp(`\\.${cls}${pseudoClass}\\{([^}]*)\\}`))
      return match ? match[1] : ''
    })
    .join('')
}
