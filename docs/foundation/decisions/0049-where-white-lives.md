# 0049. Where white lives: `base.color.white` off the ramps, inverse content on `gray.100`

- **Status:** Accepted
- **Date:** 2026-10-25
- **Decided by:** Ollie (owner)
- **Principles:** P2, P3, P7
- **Amends:** [0048](0048-emphasis-leaves-the-colour-tokens.md) (the strong fill's states mix in `text.inverse`, now `gray.100`, not white)
- **Issue:** [#306](https://github.com/common-origin/common-origin-design-system/issues/306), from [#190](https://github.com/common-origin/common-origin-design-system/issues/190) question 22

## Context

3.0 removes the old Bootstrap ramp, `neutral.*` ([#99](https://github.com/common-origin/common-origin-design-system/issues/99), [0040](0040-own-oklch-palette.md)). Its step `000` was the system's only white, and four semantic tokens still referenced it: `surface.raised`, `color.text.inverse`, `color.icon.inverse` and the deprecated `color.background.subtle`. The new grey ramp starts at `gray.100` (`#fcfcfc`, the same as Radix's `gray1`), which is also the page (`surface.base`).

Radix and Geist keep white off their grey ramps (Radix Themes uses plain white for the light page, solid panels and text on solid fills; Geist has separate background tokens). Primer puts white on its neutral ramp as step 0.

Inverse content doesn't need pure white. On `gray.100`, every pairing still meets AA: primary text on `fill.emphasis` is 15.51:1 (15.91:1 on white), and the accent, danger and success fills at step 1100 are about 5.85:1 (6.0:1). Raised surfaces do need white, or they become the same colour as the page.

## Decision

1. **`base.color.white`** (`#ffffff`) is a base token outside the ramps, like `base.color.transparent`. Its job is raised surfaces on the `gray.100` page. The ramps' "contrast on white" figures are measured against it.
2. **`surface.raised` references `base.color.white`**, as does the deprecated `color.background.subtle`. No visual change.
3. **`color.text.inverse` and `color.icon.inverse` reference `gray.100`.** Content on dark or coloured fills uses the ramp's lightest step, not a separate white.
4. **No semantic or component token references `neutral.000`**, so 3.0 can remove the ramp. A test guards this.

Rejected: putting everything on `gray.100`, because raised surfaces would match the page; and moving the page to `gray.200` with raised on `gray.100`, a visible page change that deserves its own decision.

## Consequences

- Text and icons on dark or coloured fills move from `#ffffff` to `#fcfcfc`. The accent, danger and strong fills' hover and pressed states mix in `text.inverse`, so they shift by a fraction of a percent. Nothing else changes value.
- Ships in a 2.x minor, so 3.0 only removes `neutral.*`.
- A future change to the page colour (option c above) is a separate decision.
