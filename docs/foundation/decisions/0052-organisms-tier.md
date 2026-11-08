# 0052. An organisms tier for components that compose molecules into a region

- **Status:** Accepted; point 1's docs-site grouping amended by [0057](0057-docs-groups-by-purpose.md)
- **Date:** 2026-11-08
- **Decided by:** Ollie (owner)
- **Principles:** P4, P5, P7
- **Issue:** [#322](https://github.com/common-origin/common-origin-design-system/issues/322), part of [#333](https://github.com/common-origin/common-origin-design-system/issues/333)

## Context

The package has `atoms/`, `molecules/` and `layout/`. An earlier organisms folder held product-specific components and was removed, and the `new-component` skill said "larger components are molecules". SidebarNav composes molecules (SidebarNavItem, SidebarNavSection, WorkspaceSwitcher, Menu) into a whole region of a product's UI. Calling it a molecule would hide that from consumers and from the docs.

## Decision

1. **Add `src/components/organisms/`.** It's exported from the package entry like the other tiers, and the docs site lists it as "Organisms", between Molecules and Layout.
2. **An organism composes molecules into a self-contained region of a product's UI**, such as a navigation sidebar. The test: it renders a region a product places once on a screen, and it's built mostly from the system's own molecules. A component that is one control or one row stays an atom or a molecule, however large.
3. **Organisms are system components, not product components.** They follow every rule the other tiers do (P4 earns its place, P8 framework-agnostic). Product-specific layouts stay in products.
4. **Nothing moves now.** Whether Modal, Sheet or ActionSheet belong here is a separate decision; moving them would change nothing for consumers, because every tier is exported from the same entry (P7).

## Consequences

- SidebarNav ([#331](https://github.com/common-origin/common-origin-design-system/issues/331)) is the first organism.
- `CLAUDE.md`, the `new-component` skill and the docs site's component categories name the tier.
