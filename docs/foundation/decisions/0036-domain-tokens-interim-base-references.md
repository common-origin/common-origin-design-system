# 0036. Domain component tokens may reference base values, for now

- **Status:** Resolved (2026-10-24, [#224](https://github.com/common-origin/common-origin-design-system/issues/224) with part (e) of [#190](https://github.com/common-origin/common-origin-design-system/issues/190)): every listed token now references a semantic token or is a deprecated alias of one. The exception list is empty, and rule 4 of [0014](0014-token-tiers.md) holds with no exceptions besides Button's `emphasis` aliases
- **Date:** 2026-10-13
- **Decided by:** Ollie (owner)
- **Principles:** P3, P7
- **Amends:** rule 4 of [0014](0014-token-tiers.md), for the tokens listed below only
- **Issue:** [#189](https://github.com/common-origin/common-origin-design-system/issues/189), part of [#187](https://github.com/common-origin/common-origin-design-system/issues/187)

## Context

[0031](0031-semantic-token-grammar.md) §6 moves the domain tokens out of the semantic tier and into the component tier, keeping their values:
- the status colours become `component.status.*`;
- the financial amount colours become `component.transaction.*`;
- the progress track becomes `component.track.background`;
- the tooltip border becomes `component.tooltip.border`;
- the Button and breadcrumb fonts become `component.button.sizes.*.font` and `component.breadcrumbs.font`;
- Slider's thumb becomes `component.slider.thumb.background`.

[0014](0014-token-tiers.md) rule 4 says component tokens reference semantic tokens, never base, and that a missing semantic token gets added first.

Most of these values have no semantic token with the same value and meaning. Following rule 4 would mean adding semantic tokens only to keep the old approach, which undoes 0031 §6. The new token approach should be followed, not bent to fit the old one.

## Decision

1. **Where a semantic token has the same value and a fitting meaning, the component token references it:**
   - the completed, failed and cancelled statuses use `color.text.success`/`color.fill.success-muted`, `color.text.danger`/`color.fill.danger-muted` and `color.text.muted`/`color.fill.muted`;
   - the large and medium Button fonts are built from `semantic.fontWeight`, `fontSize`, `lineHeight` and `fontFamily`.
2. **Otherwise, for now, the component token may reference base values.** Each one is listed by exact path in `src/tokens/componentTier.test.ts`. The test also fails if a listed token stops needing base. The list:
   - the pending, processing and scheduled status colours;
   - all six transaction colours;
   - the track background;
   - the tooltip border's dotted style;
   - Slider's thumb;
   - the small Button and breadcrumb fonts, whose line heights have no semantic step.
3. **This is interim.** [#224](https://github.com/common-origin/common-origin-design-system/issues/224) resolves it, either by changing values or by re-pointing tokens at semantic tokens, both acceptable to the owner. Any visible change is listed with before and after values. Rule 4 holds everywhere else.
4. **The old semantic names are deprecated** (`replacedBy` the component tokens) and removed in 3.0 ([#99](https://github.com/common-origin/common-origin-design-system/issues/99)). Every value is unchanged.

## Consequences

- No component reads `semantic.color.status.*`, `semantic.color.financial.*`, `color.background.progressTrack`, `border.tooltip` or `typography.breadcrumb` or `typography.button1–3`.
- Typography's `button1`–`button3` variants keep their names (P7) and read Button's font tokens.
- The exception list only shrinks; #224 empties it.
