# 0028. Icons are decorative by default

- **Status:** Accepted
- **Date:** 2026-10-01 (decided), 2026-10-09 (recorded)
- **Decided by:** Ollie (owner)
- **Principles:** P2, P7

## Context

`Icon` always rendered its SVG as `role="img"`, with `aria-label` set to the icon's internal name. It had no way to be decorative, and an `aria-hidden` passed to it was silently dropped. So screen readers announced internal names throughout the system, for example a Dropdown trigger read as "Select an option arrowDown", and CategoryBadge's icon read as "bell". That fails WCAG 1.1.1: decorative icons shouldn't be announced, and names like "addRing" aren't text alternatives ([#85](https://github.com/common-origin/common-origin-design-system/issues/85)).

## Decision

1. **`Icon` is decorative by default.** Without an `aria-label` or `title`, its SVG has `aria-hidden="true"`, `focusable="false"` and no role. A blank label counts as no label.
2. **A meaningful icon gets a human-readable name.** With `aria-label` or `title`, the SVG is `role="img"` with that name, and `title` is also the tooltip. A component names an icon only when the icon is the only way something is shown. `icons.json`'s `ariaLabelDefault` is a starting point, never the internal name.
3. **No component announces an internal icon name.**
4. **It ships as a bug fix in a minor release.** The release notes say that standalone icons without a label are now silent.

## Consequences

- The rule is in `visual-language.md` under Icons. `Icon.test.tsx` and `iconAnnouncements.test.tsx` enforce it.
- Two components name their icons, because the icon carries information nothing else shows:
  - MoneyDisplay: "Plus" and "Minus". The amount is shown without a sign.
  - TransactionListItem: "Has receipt" and "Has note".
- SearchField's loading icon is now announced as "Loading". Its `aria-label` used to be dropped.
- Consumers who rely on a standalone icon being announced must now pass `aria-label`.
