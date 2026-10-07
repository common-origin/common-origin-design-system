import tokens from '@/styles/tokens.json'

// WCAG 2.2 relative luminance and contrast ratio, for hex colours (P2)
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

describe('token contrast', () => {
  const { input } = tokens.component

  // Placeholder text isn't disabled text, so it isn't exempt from SC 1.4.3 (#145)
  it('keeps input placeholder text at 4.5:1 or more on the input fill', () => {
    expect(contrast(input.placeholder.textColor, input.default.backgroundColor)).toBeGreaterThanOrEqual(4.5)
  })
})
