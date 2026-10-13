# 0038. Forced colours: system-colour edges and states, scoped to the mode

- **Status:** Accepted
- **Date:** 2026-10-13
- **Decided by:** Ollie (owner)
- **Principles:** P2, P1, P5, P8
- **Issue:** [#155](https://github.com/common-origin/common-origin-design-system/issues/155) (research and options in its comments)

## Context

In a forced-colours mode (Windows Contrast Themes, Firefox's high-contrast setting), the browser swaps author colours for the user's system colours. It drops background colours and box-shadows, and keeps borders and outlines, recoloured. Controls that show their edge or their state with a fill alone lose it. Emulated in Chromium before this decision:
- every Button, IconButton and chip floated as bare text or an icon;
- a checked Checkbox looked like an unchecked one;
- the ProgressBar and the dot Badge vanished;
- the Slider kept only its thumb;
- TabBar's selected underline disappeared;
- selected rows and options looked unselected.

About 4% of Windows devices use a Contrast Theme, including about 30% of low-vision users. WCAG doesn't require forced-colours support, but technique G156 asks authors not to defeat user colour overrides, EN 301 549 §11.7 covers user preferences, and P2 puts accessibility first. Fluent and Spectrum handle forced colours in every component; Primer, Carbon and GOV.UK use targeted fixes. They agree on the same practice, summarised on #155.

## Decision

1. **Scoped to the mode** (1a). Every forced-colours style sits in `@media (forced-colors: active)`, through `forcedColors` in `src/lib/styleUtils.ts`. Nothing changes for anyone not using forced colours.
2. **Edges.** A control that shows its edge with a fill alone gets `forcedColorsEdge`: a thin border in `currentColor`. The border then follows the colour the browser picks: `ButtonText` on a button, `LinkText` on a link, `GrayText` when a native control is disabled. Controls built on `span` or `div` that can be disabled (chips, Slider) set `GrayText` themselves.
3. **Selected and checked** (2a) use the system selection colours, `Highlight` with `HighlightText`, as Fluent and Spectrum do. That covers selected chips, checked and indeterminate boxes, selected rows and options (in the shared `interactiveRow`), and TabBar's selected underline. The existing non-colour marks stay: the checkmark, the tick and the underline. A hovered or keyboard-active row gets a `Highlight` outline.
4. **Fills that carry a value or state keep a fill**, with `forced-color-adjust: none` on that element only:
   - the ProgressBar and Slider fills are `Highlight`;
   - a disabled checked box is `GrayText`;
   - the dot Badge is `CanvasText`.

   The ProgressBar and Slider tracks get an edge. Outlines stay reserved for the focus ring (`focusRing.test.ts`), apart from the `Highlight` outline on hovered rows in `src/lib`. Nowhere else uses `forced-color-adjust: none`.
5. **Not done, by design:** no hard-coded colours, no opacity changes and no colour inversion in forced colours, and no forced-colours styles outside the media query.
6. **Tested in a browser** (3a). Playwright is a dev dependency. `e2e/forced-colors.spec.ts` emulates forced colours, in a dark and a light palette, on the fixture page `pages/fixtures/forced-colors.tsx`. It checks that every control has a visible edge, that selected and checked states and value fills use the system colours, and that unselected and static rows don't. CI runs it on the production docs build and keeps screenshots in the Playwright report. A real Windows Contrast Theme is the final manual check.

## Consequences

- A new control that draws an edge or a state with a fill needs `forcedColorsEdge` or system colours, and a case in the fixture. The `visual-language.md` rule records this.
- Emulation uses one fixed palette per scheme; custom user palettes can differ, which is why only system colours are used.
- Playwright adds a dev dependency and a CI step, not a runtime dependency (P8).
