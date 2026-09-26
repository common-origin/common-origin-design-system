/**
 * The font-weight a browser would apply to an element, read from the rules
 * styled-components injected. jsdom's getComputedStyle mis-resolves a
 * `font-weight` declared after the `font` shorthand, so tests can't use toHaveStyle.
 *
 * Takes the last weight set by either `font-weight` or the `font` shorthand
 * (whose first value is the weight in our typography tokens).
 */
export function effectiveFontWeight(element: Element): string | undefined {
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('')
  const weights = Array.from(element.classList).flatMap((cls) => {
    const escaped = cls.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    return Array.from(css.matchAll(new RegExp(`\\.${escaped}\\{([^}]*)\\}`, 'g'))).flatMap(([, body]) =>
      Array.from(body.matchAll(/(?:^|;)\s*(font-weight|font)\s*:\s*([^;]+)/g)).map(([, prop, value]) =>
        prop === 'font-weight' ? value.trim() : value.trim().split(/\s+/)[0]
      )
    )
  })
  return weights[weights.length - 1]
}
