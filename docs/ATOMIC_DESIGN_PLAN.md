# Atomic Design Component Categorization & Refactoring Plan

## Overview
This document outlines the reorganization of components using Atomic Design methodology and the systematic approach for design token refactoring.

## Atomic Design Structure

### 🔬 **ATOMS** (Smallest, foundational components)
**Priority: Refactor FIRST** - These have no component dependencies and are used by everything else.

1. **icon.tsx** - Basic icon display
2. **typography.tsx** - Text rendering with semantic variants
3. **button.tsx** - Core button component
4. **chip.tsx** - Small status/label indicators
5. **avatar.tsx** - User profile images
6. **sectionSeparator.tsx** - Visual dividers
7. **container.tsx** - Layout wrapper

### 🧬 **MOLECULES** (Simple groups of atoms)
**Priority: Refactor SECOND** - Depend on atoms, compose basic functionality.

1. **iconButton.tsx** - Button + Icon combination
2. **chipGroup.tsx** - Multiple chips together
3. **dateFormatter.tsx** - Text formatting with typography
4. **breadcrumbs.tsx** - Navigation path with links
5. **stack.tsx** - Layout container for atoms
6. **dropdown.tsx** - Interactive selection component
7. **modal.tsx** - Overlay container
8. **trackItem.tsx** - Music track display

### 🧩 **ORGANISMS** (Complex UI sections)
**Priority: Refactor THIRD** - Combine molecules and atoms into distinct sections.

1. **alert.tsx** ✅ (Already completed - preview banner)
2. **navigation.tsx** - Site navigation
3. **header.tsx** - Site header section
4. **footer.tsx** - Site footer section
5. **heroBanner.tsx** - Landing page hero
6. **pageTitle.tsx** - Page header section
7. **performanceDashboard.tsx** - Analytics display

### 🏗️ **TEMPLATES** (Page-level layouts)
**Priority: Refactor FOURTH** - Overall page structure and layout.

1. **layout.tsx** - Main page template
2. **layout/** - Additional layout components

### 🎯 **SPECIALIZED COMPONENTS** (Domain-specific)
**Priority: Refactor LAST** - Feature-specific components.

#### Content Cards & Grids
- **artCard.tsx**, **artGrid.tsx**
- **designCard.tsx**, **designGrid.tsx** 
- **portfolioCard.tsx**, **portfolioGrid.tsx**
- **postCard.tsx**, **releaseCard.tsx**
- **featuredReleaseCard.tsx**, **moreReleaseCard.tsx**

#### Content Display
- **coverImage.tsx**, **heroPost.tsx**
- **postHeader.tsx**, **postTitle.tsx**, **postBody.tsx**
- **releaseHeader.tsx**, **releaseBody.tsx**, **releaseFeatured.tsx**
- **releaseGrid.tsx**, **markdownContent.tsx**

#### Features & Utilities
- **filterReleaseList.tsx**, **featureRelease.tsx**, **featureSet.tsx**
- **intro.tsx**, **autoSEO.tsx**, **meta.tsx**, **seoHead.tsx**
- **ErrorBoundary.tsx**, **ErrorBoundaries.tsx**

## 🎯 **RECOMMENDED REFACTORING ORDER**

### Phase 1: Atoms (Highest Impact)
1. **icon.tsx** - Foundation for all other components
2. **typography.tsx** - Text system foundation  
3. **button.tsx** - Interactive foundation
4. **container.tsx** - Layout foundation

### Phase 2: Simple Molecules
5. **iconButton.tsx** - Uses icon + button
6. **stack.tsx** - Layout helper
7. **chip.tsx** + **chipGroup.tsx** - Status indicators

### Phase 3: Complex Molecules
8. **breadcrumbs.tsx** - Navigation helper
9. **dropdown.tsx** - Form controls
10. **modal.tsx** - Overlay patterns

### Phase 4: Core Organisms
11. **navigation.tsx** - Site structure
12. **header.tsx** / **footer.tsx** - Page framing
13. **pageTitle.tsx** - Page headers

## Migration Strategy

1. **Create atomic structure** ✅
2. **Start with atoms** - Refactor design tokens, create test pages
3. **Move files gradually** - One component at a time to avoid breaking imports
4. **Update index.ts** - Maintain export compatibility  
5. **Verify no regressions** - Test page for each component
6. **Commit incrementally** - One component per commit

## Next Steps

1. Start with `icon.tsx` as the foundational atom
2. Create comprehensive test page for each refactored component
3. Ensure proper design token usage at each level
4. Move components to appropriate atomic folders as we refactor them

This approach ensures we build a solid foundation before tackling more complex components.
