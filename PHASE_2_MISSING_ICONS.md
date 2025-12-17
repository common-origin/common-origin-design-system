# Phase 2 Missing Icons

## Overview
The following icons are required for Phase 2 banking components but are currently missing from `src/styles/icons.json`. These need to be added following the existing icon structure format.

## Required Icons

### 1. **clock**
- **Used in**: StatusBadge component
- **Purpose**: Indicates "pending" status
- **Status Type**: pending
- **Visual**: Clock face or time indicator
- **Recommended source**: Heroicons, Lucide, or Material Icons
- **Priority**: HIGH (blocks StatusBadge pending variant)

### 2. **calendar**
- **Used in**: StatusBadge component  
- **Purpose**: Indicates "scheduled" status
- **Status Type**: scheduled
- **Visual**: Calendar page or date indicator
- **Recommended source**: Heroicons, Lucide, or Material Icons
- **Priority**: HIGH (blocks StatusBadge scheduled variant)

### 3. **restaurant** (or "utensils")
- **Used in**: CategoryBadge component
- **Purpose**: Food & Dining category
- **Category**: food
- **Visual**: Fork and knife, or restaurant building
- **Recommended source**: Heroicons, Lucide, or Material Icons
- **Priority**: MEDIUM (CategoryBadge will work with other icons)

### 4. **plane** (or "airplane")
- **Used in**: CategoryBadge component
- **Purpose**: Travel category
- **Category**: travel
- **Visual**: Airplane side view or taking off
- **Recommended source**: Heroicons, Lucide, or Material Icons
- **Priority**: MEDIUM (CategoryBadge will work with other icons)

### 5. **cart** (or "shopping-cart")
- **Used in**: CategoryBadge component
- **Purpose**: Shopping category
- **Category**: shopping
- **Visual**: Shopping cart or bag
- **Recommended source**: Heroicons, Lucide, or Material Icons
- **Priority**: MEDIUM (CategoryBadge will work with other icons)

## Icon Format

Add icons to `src/styles/icons.json` following this structure:

```json
"iconName": {
  "path": "M12 5C14.1099 5...",
  "name": "iconName"
}
```

### Example (from existing refresh icon):
```json
"refresh": {
  "path": "M14.707 15.707L11.4141 19L14.707 22.293L13.293 23.707L8.58594 19L13.293 14.293L14.707 15.707Z M16 5.07227C14.4749 4.19178 12.702 3.83857 10.9561 4.06836C9.21005 4.29823 7.58805 5.09751 6.34278 6.34278C5.09751 7.58804 4.29823 9.21005 4.06836 10.9561C3.83857 12.702 4.19178 14.4749 5.07227 16C5.34841 16.478 5.95933 16.6421 6.4375 16.3662C6.9158 16.0901 7.07986 15.4783 6.80372 15C6.14334 13.8562 5.87937 12.5263 6.05176 11.2168C6.22418 9.90733 6.82389 8.69174 7.75782 7.75782C8.69174 6.82389 9.90733 6.22418 11.2168 6.05176C12.5263 5.87937 13.8562 6.14334 15 6.80372C16.1439 7.46412 17.0375 8.48384 17.543 9.70411C18.0484 10.9243 18.1377 12.277 17.7959 13.5527C17.4541 14.8285 16.7002 15.9557 15.6523 16.7598C14.6045 17.5638 13.3208 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C13.7611 20 15.473 19.4188 16.8701 18.3467C18.2672 17.2746 19.2718 15.7713 19.7275 14.0703C20.1833 12.3693 20.0645 10.5654 19.3906 8.93848C18.7167 7.31162 17.525 5.95278 16 5.07227Z",
  "name": "refresh"
}
```

## Recommended Icon Libraries

1. **Heroicons** (https://heroicons.com/)
   - MIT license, free to use
   - Designed by Tailwind team
   - Clean, modern style
   - 24x24 viewBox

2. **Lucide** (https://lucide.dev/)
   - Fork of Feather Icons
   - ISC license
   - Consistent stroke width
   - 24x24 viewBox

3. **Material Icons** (https://fonts.google.com/icons)
   - Apache 2.0 license
   - Comprehensive library
   - Multiple styles (outlined, filled, etc.)
   - 24x24 viewBox

## Implementation Notes

### Temporary Fallback Strategy
Until icons are added, components will use fallback icons from existing set:
- **clock** → fallback to "refresh" icon (temporary)
- **calendar** → fallback to "bell" icon (temporary)
- **restaurant** → no fallback (optional icon in CategoryBadge)
- **plane** → no fallback (optional icon in CategoryBadge)
- **cart** → no fallback (optional icon in CategoryBadge)

### Post-Addition Tasks
After adding icons:
1. Update icon type definitions in `src/types/icons.ts` (if exists)
2. Verify icons render correctly at all sizes (16px, 20px, 24px)
3. Test icons in both light and dark mode contexts
4. Update component examples to use new icons
5. Run `npm run build:package` to verify no build issues

## Status Tracking

- [ ] clock icon added
- [ ] calendar icon added
- [ ] restaurant icon added
- [ ] plane icon added
- [ ] cart icon added
- [ ] Icon types updated
- [ ] Visual verification complete
- [ ] Component examples updated

---

**Created**: December 17, 2025  
**For**: Phase 2 Banking Components Release  
**By**: GitHub Copilot
