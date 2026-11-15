# 0058. Lucide is the source of the system's general icons

- **Status:** Accepted
- **Date:** 2026-11-15
- **Decided by:** Ollie (owner)
- **Principles:** P4, P5, P7, P8
- **Issue:** [#374](https://github.com/common-origin/common-origin-design-system/issues/374)

## Context

The package has 64 icons in `src/styles/icons.json`. Each is one filled SVG path on a 24px grid, with our metadata: `aliases`, `intent`, `category`, `decorativeDefault` and `ariaLabelDefault`. Nothing in the repository recorded where they came from. They were copied from a Figma community icon pack: to add one, the owner copied it in Figma, exported an SVG, flattened it to a single path, then added it to `icons.json` and `src/types/icons.ts` by hand. The status icons ([0045](0045-status-indication.md)) and the AI sparkle were drawn for the system instead.

That workflow is slow, so products went without icons they needed. The Figma pack has no versioned release, and its icons can't be exported without signing in to Figma and using an access token, so there's nothing to script against.

Every bundle that uses `Icon` includes every icon, because `Icon` looks icons up by name at run time ([#253](https://github.com/common-origin/common-origin-design-system/issues/253)). More icons in the same format would make that cost grow.

[Lucide](https://lucide.dev) is an open-source icon library under the ISC licence, with over 2,000 icons on a 24px grid, drawn with 2px lines and round ends, like most of our current icons. A few current icons are solid shapes (`ai`, `starFilled`, `stop` and the carets). Of the 54 current icons that aren't status icons, 51 have a Lucide equivalent. The three filled carets don't. The owner compared every current icon with its Lucide match side by side and approved the look.

## Decision

1. **Lucide is the source for the system's general icons.** It's a dev dependency (`lucide-static`, pinned to an exact version), never a runtime dependency (P8). Upgrading Lucide is a deliberate change, reviewed like any other visual change.
2. **The registry stays curated.** An icon is added when a product needs it (P4), never all of Lucide. A script copies the icon's markup from Lucide into our registry and asks for our metadata. Each icon keeps its Common Origin name (`IconName`) and records the Lucide icon it came from.
3. **Lucide icons are used as drawn**: 24px grid, 2px lines, round caps and joins, coloured with `currentColor`. They aren't redrawn or flattened. A filled variant, such as `starFilled`, is Lucide's outline filled with `currentColor`.
4. **The line scales with the icon.** The line is 2px at 24px (`size.icon.lg`) and scales in proportion at the other sizes: 1px at `xs`, about 3.3px at `2xl`. This is Lucide's default, and it's how the current filled icons already scale. `Icon` takes no stroke prop.
5. **Two sets stay as our own drawings** (Exception):
   - the ten status icons, whose shapes come from [0045](0045-status-indication.md). Lucide has no match for serious or in progress, and draws error, info and cancelled with other shapes. The status pattern defines its icons; a library doesn't redefine them.
   - the three filled carets (`caret`, `caretDown`, `caretUp`), which have no Lucide equivalent.

   They're redrawn to sit beside Lucide icons, on the same 24px grid. The status icons use 2px lines with round caps and joins. The carets stay solid triangles, with corners rounded to match Lucide's round joins. The status shape indicators used in small spaces don't change.
6. **The old data is frozen, not changed (P7).** The exported `iconsData` keeps today's 64 filled shapes, unchanged, and is deprecated; it's removed in the next major version. `Icon` and every new icon use a new export in the new format, with a type of its own. `iconsData` keeps its declared type, and the exported `IconRegistry` and `IconMetadata` types stay as they are, deprecated with it. Narrowing any of them to the 64 names would break code that indexes `iconsData` with an `IconName`. Icons added after the freeze have no entry in `iconsData`, and its deprecation note says so and points to the new export.
7. **It ships in a minor release.** No prop, export or icon name is removed. The release notes say that every general icon has changed shape.

## Consequences

- Follow-up work, in order: `Icon` draws the new format, with the new export and `iconsData` frozen ([#375](https://github.com/common-origin/common-origin-design-system/issues/375)); the script that adds an icon from Lucide ([#376](https://github.com/common-origin/common-origin-design-system/issues/376)); moving the 51 general icons to Lucide ([#378](https://github.com/common-origin/common-origin-design-system/issues/378)). Redrawing the status icons and carets ([#377](https://github.com/common-origin/common-origin-design-system/issues/377)) can follow #375.
- The current names map to Lucide as follows. The comparison the owner approved used Lucide 1.66.0.

  | Ours | Lucide | Ours | Lucide | Ours | Lucide |
  |---|---|---|---|---|---|
  | `ai` | `sparkles` | `export` | `upload` | `refresh` | `rotate-ccw` |
  | `add` | `plus` | `fileDocSearch` | `file-search` | `remove` | `circle-minus` |
  | `addRing` | `circle-plus` | `filter` | `sliders-horizontal` | `search` | `search` |
  | `arrowDown` | `chevron-down` | `info` | `info` | `star` | `star` |
  | `arrowUp` | `chevron-up` | `lamp` | `lightbulb` | `starFilled` | `star` (filled) |
  | `arrowLeft` | `chevron-left` | `menu` | `menu` | `table` | `table` |
  | `arrowRight` | `chevron-right` | `paper` | `receipt-text` | `trash` | `trash-2` |
  | `bell` | `bell` | `pause` | `pause` | `userBox` | `square-user` |
  | `back` | `arrow-left` | `stop` | `square` | `view` | `eye` |
  | `cancel` | `ban` | `play` | `play` | `viewHide` | `eye-off` |
  | `check` | `check` | `playBack` | `skip-back` | `kebab` | `ellipsis-vertical` |
  | `checkRing` | `circle-check` | `lineOut` | `external-link` | `meatballs` | `ellipsis` |
  | `close` | `x` | `message` | `mail` | `creditCard` | `credit-card` |
  | `crossCircle` | `circle-x` | `mic` | `mic` | `wallet` | `wallet` |
  | `directionRight` | `arrow-right` | `copy` | `copy` | `move` | `move` |
  | `directionUp` | `arrow-up` | `link` | `link` | `home` | `house` |
  | `edit` | `pencil` | `order` | `file-text` | `sidebar` | `panel-left` |

- Three shapes change in ways to check where they're used: `menu`'s lines become equal width, `lineOut` becomes Lucide's external-link arrow, and `ai` becomes Lucide's sparkles. Our `ai` is a filled sparkle that [0043](0043-data-colours.md) pairs with the AI colour; check it still reads as AI in AILabel.
- Lucide's markup is much smaller than our flattened paths: about 1.6 KB against 15 KB for a sample of ten icons. Moving to Lucide should shrink the cost of every icon, which helps [#253](https://github.com/common-origin/common-origin-design-system/issues/253). That issue still decides whether bundles carry only the icons they use. Measure the change in the migration.
- The owner may still add an icon drawn in Figma when Lucide has nothing suitable. It's drawn in Lucide's style, and the reason is recorded with the icon, as for the status icons.
