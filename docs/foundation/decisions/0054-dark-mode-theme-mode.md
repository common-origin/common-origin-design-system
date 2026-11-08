# 0054. Dark mode is a theme token mode; each ramp step keeps its role

- **Status:** Accepted; rule 3 amended by [0056](0056-one-set-of-colour-rules.md): the theme is base values only, with no semantic exceptions
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner)
- **Principles:** P2, P3, P4, P7, P8
- **Amends:** [0032](0032-token-modes.md) rule 8 (dark mode was out of scope) and [purpose](../purpose.md) ("Future, not current: dark mode")
- **Issue:** [#353](https://github.com/common-origin/common-origin-design-system/issues/353), part of [#352](https://github.com/common-origin/common-origin-design-system/issues/352)

## Context

When dark mode was ruled out, components baked token values in at build time, so a theme would have touched every component ([0009](0009-styling-architecture.md)). That's no longer true:

- Components read tokens as CSS variables with resolved fallbacks ([0041](0041-components-read-css-variables.md), #245).
- The density mode ([0032](0032-token-modes.md), #191) proved the mechanism: a DTCG Resolver modifier in `src/tokens/resolver.json`, published as `[data-co-density]` blocks in `tokens.css` that also redeclare dependent aliases.
- Component tokens reference semantic tokens only, and components hold no hard-coded colours.

So dark mode needs new token **values**, not new token names. That's what [0040](0040-own-oklch-palette.md) anticipated ("Dark mode becomes a set of values under the same names, applied as a mode").

The open question was how the dark values map onto the existing names. There were two options:

- **Each step keeps its role.** In the dark ramps, step 100 is still the page and 1200 is still primary text, with dark values. A dark context overrides base values, and almost every semantic reference stays the same. Radix Colors works this way: each step has the same job in light and dark.
- **Separate dark ramps** (for example `base.color.dark.gray.*`), with a dark context that overrides about 100 semantic references. This is more explicit, but there's more to keep in step.

No product needs dark mode yet (P4), so it's proven on the docs site first.

## Decision

1. **Dark mode is a `theme` token mode** on the mechanism in 0032, with the contexts `light` (the default) and `dark`. Components never branch on the theme and take no theme prop.
2. **Each ramp step keeps its role.** The dark ramps use the same step names with dark values: 100 is the page, 1200 is primary text, and the steps between keep the jobs [`docs/tokens/base.md`](../../tokens/base.md) gives them. The dark context overrides base colour values.
3. **Semantic overrides only for the exceptions:** tokens that hold literal values instead of references ([#354](https://github.com/common-origin/common-origin-design-system/issues/354)), text on coloured fills ([#355](https://github.com/common-origin/common-origin-design-system/issues/355)), and surfaces and shadows ([#356](https://github.com/common-origin/common-origin-design-system/issues/356)). Each of these is decided in its own issue.
4. **The theme changes colour and shadow only**, never size, space, radius, typography or motion.
5. **Dark values follow the palette rule in 0040 and [0044](0044-hue-ramps.md):** OKLCH, each step matched by contrast, against the dark page instead of white. A script generates both themes from the rule ([#357](https://github.com/common-origin/common-origin-design-system/issues/357)).
6. **Light stays the default.** A product that doesn't opt in, or doesn't load `tokens.css`, renders exactly as it does today (0041 rule 3). That makes dark mode a minor release (P7).
7. **The docs site is the first consumer.** No product adopts dark mode until it's proven there ([#360](https://github.com/common-origin/common-origin-design-system/issues/360)).
8. **P2 applies in both themes.** Every contrast pairing that's tested in light is tested in dark too ([#359](https://github.com/common-origin/common-origin-design-system/issues/359)).

## Consequences

- [purpose.md](../purpose.md) no longer lists dark mode as future, and 0032 rule 8 is amended by this record.
- How a product turns dark mode on (the attribute, and whether `tokens.css` follows `prefers-color-scheme` automatically) is settled in the build issue, [#358](https://github.com/common-origin/common-origin-design-system/issues/358).
- Some light-mode rules are stated in light terms, such as pure black reserved for the logo, white living off the grey ramp ([0049](0049-where-white-lives.md)) and black shadows ([0012](0012-shadows-use-black.md)). #354, #355 and #356 decide what each one means in dark. Until then they apply to the light theme as written.
- Copy that names a light-mode colour ("near-black") describes the role instead, because the colour changes with the theme.
