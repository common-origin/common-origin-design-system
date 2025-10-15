# PostCSS Configuration

This document outlines the PostCSS configuration and optimization setup for the Common Origin website.

## Configuration Overview

The PostCSS pipeline includes several plugins for enhanced CSS processing:

### Core Plugins

1. **postcss-import** - Handles CSS imports and bundling
   - Processes `@import` statements
   - Enables modular CSS organization
   - Resolves relative and npm package imports

2. **postcss-nesting** - Modern CSS nesting support
   - Allows nested selectors (CSS Nesting Module Level 3)
   - Reduces CSS verbosity
   - Improves maintainability

3. **autoprefixer** - Browser compatibility
   - Automatically adds vendor prefixes
   - Based on browserslist configuration
   - Ensures cross-browser compatibility

### Production Optimizations

4. **cssnano** - CSS optimization and minification (production only)
   - Minifies CSS output
   - Removes redundant rules
   - Optimizes declarations
   - Preserves important comments
   - Safe optimizations only (no breaking changes)

## Environment-Specific Behavior

- **Development**: Only core plugins run for faster builds
- **Production**: Full optimization pipeline including minification

## Performance Benefits

- **Reduced Bundle Size**: CSS minification reduces file size by ~30-40%
- **Modern CSS Features**: Nesting support improves developer experience
- **Optimized Imports**: Better tree-shaking and bundling
- **Browser Compatibility**: Automatic prefixing for target browsers

## CSS Structure Recommendations

```css
/* Use modern nesting */
.component {
  property: value;
  
  &:hover {
    property: value;
  }
  
  & .child {
    property: value;
  }
}

/* Organize imports at the top */
@import './base.css';
@import './components.css';
```

## Build Performance

The optimized PostCSS configuration provides:
- Faster development builds (minimal processing)
- Efficient production builds (full optimization)
- Better CSS organization and maintainability
- Modern CSS feature support
