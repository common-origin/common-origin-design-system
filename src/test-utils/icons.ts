import { iconSet } from '../types/iconSet'
import type { IconName } from '../types/icons'

/**
 * Asserts that an SVG draws exactly the named icon: the same shapes, in order, with the same
 * attributes as its `iconSet` entry. Checks every shape, not just the first, so icons that share
 * an outline (success and in progress share the circle) can't pass for each other.
 */
export function expectDrawnIcon(svg: Element | null, name: IconName) {
  expect(svg).not.toBeNull()
  const shapes = Array.from(svg?.children ?? []).filter((child) => child.tagName.toLowerCase() !== 'title')
  const { elements } = iconSet[name]
  expect(shapes.map((shape) => shape.tagName.toLowerCase())).toEqual(elements.map(([tag]) => tag))
  elements.forEach(([, attributes], index) => {
    for (const [attribute, value] of Object.entries(attributes)) expect(shapes[index]).toHaveAttribute(attribute, value)
  })
}
