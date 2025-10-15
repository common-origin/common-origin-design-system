# Performance Monitoring & Bundle Analysis

This document outlines the performance monitoring and bundle analysis tools implemented for the Common Origin website to optimize loading times and identify performance bottlenecks.

## Overview

The performance monitoring system provides real-time Core Web Vitals tracking, bundle size analysis, and optimization recommendations to ensure the website delivers excellent user experience across all devices.

## Core Web Vitals Monitoring

### Tracked Metrics

#### 1. **Largest Contentful Paint (LCP)**
- **Target**: ≤ 2.5 seconds
- **Measures**: Time for the largest content element to render
- **Impact**: User perception of loading speed

#### 2. **First Input Delay (FID)**
- **Target**: ≤ 100ms
- **Measures**: Time from first user interaction to browser response
- **Impact**: Interactivity and responsiveness

#### 3. **Cumulative Layout Shift (CLS)**
- **Target**: ≤ 0.1
- **Measures**: Visual stability during page load
- **Impact**: User experience and reading comfort

#### 4. **Time to First Byte (TTFB)**
- **Target**: ≤ 800ms
- **Measures**: Server response time
- **Impact**: Initial loading performance

### Rating System

Each metric is categorized into three performance bands:

- **🟢 Good**: Meets performance targets
- **🟡 Needs Improvement**: Close to targets but could be optimized
- **🔴 Poor**: Significantly below targets, needs attention

## Performance Monitoring Implementation

### Components

#### 1. **PerformanceMonitor Class** (`lib/performance.ts`)
- Automatically tracks Core Web Vitals using Performance Observer API
- Reports metrics to console in development
- Sends data to analytics in production
- Provides rating system based on industry standards

#### 2. **PerformanceDashboard Component** (`components/performanceDashboard.tsx`)
- Real-time performance metrics display
- Bundle size analysis and breakdown
- Interactive charts and data visualization
- Design system compliant UI

#### 3. **Performance Integration** (`pages/_app.tsx`)
- Global performance monitoring initialization
- Automatic metric collection across all pages
- Console logging for development debugging

### Usage

#### View Performance Metrics
Visit `/performance` to see real-time performance data and bundle analysis.

#### Development Monitoring
Performance metrics are automatically logged to the browser console during development:

```javascript
✅ LCP: 1247.3ms (good)
⚠️ FID: 156.7ms (needs-improvement)
✅ CLS: 0.053 (good)
```

#### Production Analytics
Metrics are automatically sent to configured analytics endpoints when available.

## Bundle Analysis

### Tools Integration

#### 1. **@next/bundle-analyzer**
- Interactive bundle size visualization
- Dependency analysis and optimization suggestions
- Tree-shaking effectiveness analysis

#### 2. **webpack-bundle-analyzer**
- Detailed module composition breakdown
- Unused code detection
- Import cost analysis

#### 3. **Custom Bundle Stats**
- Real-time transfer size monitoring
- Resource loading performance
- CSS and JavaScript size tracking

### Analysis Commands

#### Interactive Bundle Analyzer
```bash
npm run analyze
```
Opens interactive bundle analyzer with detailed module breakdown.

#### Bundle Statistics
```bash
npm run bundle:stats
```
Generates bundle statistics report for existing build.

#### Performance Audit
```bash
npm run performance:audit
```
Comprehensive performance and bundle analysis.

### Optimization Features

#### 1. **Bundle Splitting** (`next.config.js`)
```javascript
// Automatic code splitting for better caching
splitChunks: {
  cacheGroups: {
    commons: {
      name: 'commons',
      chunks: 'all',
      minChunks: 2,
      enforce: true,
    }
  }
}
```

#### 2. **Modern Output**
- ESM externals for better tree-shaking
- Optimized chunk generation
- Efficient vendor bundling

#### 3. **Production Optimizations**
- Styled-components minification
- Automatic dead code elimination
- Optimal chunk splitting strategy

## Performance Recommendations

### Loading Performance

#### 1. **Critical Resource Optimization**
- Inline critical CSS for above-the-fold content
- Preload key fonts and images
- Minimize render-blocking resources

#### 2. **Image Optimization**
- Use Next.js Image component with automatic optimization
- Implement responsive images with srcset
- Consider WebP format for modern browsers

#### 3. **JavaScript Optimization**
- Dynamic imports for non-critical code
- Bundle size monitoring and alerting
- Regular dependency audits

### Runtime Performance

#### 1. **React Optimization**
- Proper component memoization
- Avoid unnecessary re-renders
- Optimize large lists with virtualization

#### 2. **Layout Stability**
- Reserve space for dynamic content
- Use CSS aspect-ratio for images
- Minimize layout shifts during loading

### Monitoring Strategy

#### Development
- Real-time performance feedback
- Bundle size impact visualization
- Performance regression detection

#### Production
- Continuous Core Web Vitals monitoring
- User experience analytics
- Performance trend analysis

## Configuration

### Environment Variables

```bash
# Analytics endpoint for performance data
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-analytics.com/perf

# Build version for error correlation
NEXT_PUBLIC_BUILD_VERSION=1.0.0

# Enable bundle analysis
ANALYZE=true
```

### Analytics Integration

The performance monitor integrates with:

- **Google Analytics 4**: Automatic Core Web Vitals reporting
- **Custom Analytics**: Configurable endpoint for detailed metrics
- **Error Monitoring**: Performance correlation with error tracking

## Bundle Size Targets

### Current Performance
- **Total First Load JS**: ~129 kB (excellent)
- **Framework Chunks**: 45.2 kB (React + Next.js)
- **Application Code**: ~50.7 kB (optimized)
- **CSS Bundle**: 2.91 kB (minimal)

### Optimization Goals
- Keep total bundle under 150 kB for fast initial loads
- Maintain individual page chunks under 5 kB
- Optimize shared chunks for effective caching
- Monitor and prevent bundle bloat

## Future Enhancements

### Planned Features
- [ ] **Real User Monitoring (RUM)**: Field data collection
- [ ] **Performance Budgets**: Automated size and performance limits
- [ ] **Lighthouse CI**: Automated performance testing
- [ ] **Core Web Vitals API**: Server-side performance aggregation

### Advanced Analysis
- [ ] **Resource Hints**: Intelligent preloading strategies
- [ ] **Critical Path Analysis**: Automated critical CSS generation
- [ ] **Performance Profiling**: Detailed runtime analysis
- [ ] **A/B Testing**: Performance impact measurement

## Troubleshooting

### Common Issues

#### High LCP
- Check image optimization
- Review critical CSS inclusion
- Analyze server response times

#### Poor FID
- Reduce JavaScript execution time
- Optimize event handlers
- Consider code splitting

#### Layout Shifts
- Reserve space for dynamic content
- Use CSS transforms instead of layout properties
- Optimize font loading strategy

### Performance Debugging
1. Use Performance Dashboard for real-time metrics
2. Run bundle analyzer to identify large dependencies
3. Check Network tab for resource loading issues
4. Profile with browser DevTools for runtime analysis

## Conclusion

The performance monitoring system provides comprehensive insights into website performance, enabling data-driven optimization decisions. Regular monitoring and analysis ensure the Common Origin website maintains excellent user experience across all devices and network conditions.
