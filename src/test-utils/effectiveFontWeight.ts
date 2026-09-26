/**
 * Resolve a font property the way a browser would, from the rules styled-components
 * injected. jsdom's getComputedStyle mis-resolves a `font-weight` or `line-height`
 * declared after the `font` shorthand, so tests can't use toHaveStyle for these.
 *
 * Takes the last value set either by the property itself or by the `font` shorthand.
 * Our typography tokens are shorthands of the form `<weight> <size>/<line-height> <family>`.
 */
type FontProperty = 'font-weight' | 'line-height'

function fromShorthand(property: FontProperty, shorthand: string): string | undefined {
  const [weight, sizeAndLineHeight = ''] = shorthand.trim().split(/\s+/)
  return property === 'font-weight' ? weight : sizeAndLineHeight.split('/')[1]
}

export function effectiveFontProperty(element: Element, property: FontProperty): string | undefined {
  const css = Array.from(document.querySelectorAll('style'))
    .map((style) => style.textContent)
    .join('')
  const values = Array.from(element.classList).flatMap((cls) => {
    const escaped = cls.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    return Array.from(css.matchAll(new RegExp(`\\.${escaped}\\{([^}]*)\\}`, 'g'))).flatMap(([, body]) =>
      Array.from(body.matchAll(/(?:^|;)\s*(font-weight|line-height|font)\s*:\s*([^;]+)/g))
        .filter(([, prop]) => prop === property || prop === 'font')
        .map(([, prop, value]) => (prop === 'font' ? fromShorthand(property, value) : value.trim()))
    )
  })
  return values[values.length - 1]
}

export function effectiveFontWeight(element: Element): string | undefined {
  return effectiveFontProperty(element, 'font-weight')
}
