# 0057. The docs site groups components by purpose, not by atomic tier

- **Status:** Accepted
- **Date:** 2026-11-09
- **Decided by:** Ollie (owner)
- **Principles:** P4, P5, P7
- **Issue:** [#371](https://github.com/common-origin/common-origin-design-system/issues/371)
- **Amends:** [0052](0052-organisms-tier.md), point 1 (the docs site's "Organisms" group)

## Context

The docs site's component sidebar was grouped by atomic tier: Atoms, Molecules, Organisms and Layout. The tier describes how a component is built, which helps the people building the system. It doesn't help someone looking for a component: they know what they need to do, such as take an input or show a status, not which tier the component sits in.

Mature systems group by purpose. Material 3 uses action, communication, containment, navigation, selection and text input. Spectrum uses actions, containers, data visualization, feedback, inputs, navigation, status and typography. Polaris has groups such as "Selection and input" and "Feedback indicators". Each component sits in one group.

## Decision

1. **The docs site groups components into nine groups by purpose**, in this order: Actions, Inputs, Navigation, Feedback, Overlays, Labels, Data display, Content and Layout.
2. **A component goes in the group for the job someone uses it for, not how it works.** ActionSheet is a list of actions, so it's in Actions even though it's an overlay. Menu is in Actions too. Overlays holds containers that show any content above the page: Modal, Sheet and Tooltip.
3. **Chips are grouped by job, following [0016](0016-accent-selection-and-chip-types.md):**
   - Chip goes in Labels.
   - FilterChip and InputChip go in Inputs.
   - SuggestionChip goes in Actions.

   The variants are no longer children of Chip on the site.
4. **The tier stays as metadata.** Each docs page records its `tier`, and the component page shows it beside the group.
5. **A child page stays in its parent's group** and is listed straight after its parent (ListItem after List, InlineAlert after Alert).
6. **The source folders don't change.** `src/components/{atoms,molecules,organisms,layout}` and the organisms tier from 0052 stay as they are. Only the docs site's grouping changes, so nothing changes for consumers (P7).

## Consequences

- `category` in each `.docs.tsx` holds the group, and a new `tier` field holds the tier. A test fails if a page has an unknown group, a tier that doesn't match its folder, or a `parentId` that names a missing page or one in another group.
- A new component needs a group as well as a tier. The `new-component` and `component-docs` skills and the documentation checklist say so.
- If a component doesn't clearly fit one group, the owner decides; don't add a tenth group for one component (P4).
