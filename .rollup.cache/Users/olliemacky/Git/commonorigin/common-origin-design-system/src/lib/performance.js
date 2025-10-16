/**
 * Performance Monitoring Utilities
 * Provides tools for monitoring Core Web Vitals and performance metrics
 */
import { __assign, __awaiter, __generator } from "tslib";
var PerformanceMonitor = /** @class */ (function () {
    function PerformanceMonitor() {
        this.metrics = new Map();
        this.observers = new Map();
        if (typeof window !== 'undefined') {
            this.initializeObservers();
        }
    }
    /**
     * Initialize performance observers for various metrics
     */
    PerformanceMonitor.prototype.initializeObservers = function () {
        var _this = this;
        // Largest Contentful Paint (LCP)
        this.observeMetric('largest-contentful-paint', function (entries) {
            var lastEntry = entries[entries.length - 1];
            _this.reportMetric('LCP', lastEntry.startTime);
        });
        // First Input Delay (FID) - using 'first-input' if available
        if ('PerformanceEventTiming' in window) {
            this.observeMetric('first-input', function (entries) {
                var firstInput = entries[0];
                if (firstInput.processingStart) {
                    var fid = firstInput.processingStart - firstInput.startTime;
                    _this.reportMetric('FID', fid);
                }
            });
        }
        // Cumulative Layout Shift (CLS)
        this.observeMetric('layout-shift', function (entries) {
            var clsValue = 0;
            entries.forEach(function (entry) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            _this.reportMetric('CLS', clsValue);
        });
        // Time to First Byte (TTFB)
        this.observeMetric('navigation', function (entries) {
            var navigation = entries[0];
            var ttfb = navigation.responseStart - navigation.fetchStart;
            _this.reportMetric('TTFB', ttfb);
        });
    };
    /**
     * Observe a specific performance metric
     */
    PerformanceMonitor.prototype.observeMetric = function (type, callback) {
        try {
            var observer = new PerformanceObserver(function (list) {
                callback(list.getEntries());
            });
            observer.observe({ type: type, buffered: true });
            this.observers.set(type, observer);
        }
        catch (error) {
            console.warn("Failed to observe ".concat(type, ":"), error);
        }
    };
    /**
     * Report a performance metric with rating
     */
    PerformanceMonitor.prototype.reportMetric = function (name, value) {
        var rating = this.getRating(name, value);
        var metric = {
            name: name,
            value: value,
            rating: rating,
            delta: value,
            id: "".concat(name, "-").concat(Date.now()),
        };
        this.metrics.set(name, metric);
        this.logMetric(metric);
        // Report to analytics if available
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', name, {
                event_category: 'Web Vitals',
                value: Math.round(value),
                custom_parameter_1: rating,
            });
        }
        // Report to custom analytics endpoint
        this.sendToAnalytics(metric);
    };
    /**
     * Get performance rating based on thresholds
     */
    PerformanceMonitor.prototype.getRating = function (name, value) {
        var thresholds = {
            LCP: { good: 2500, poor: 4000 },
            FID: { good: 100, poor: 300 },
            CLS: { good: 0.1, poor: 0.25 },
            TTFB: { good: 800, poor: 1800 },
        };
        var threshold = thresholds[name];
        if (!threshold)
            return 'good';
        if (value <= threshold.good)
            return 'good';
        if (value <= threshold.poor)
            return 'needs-improvement';
        return 'poor';
    };
    /**
     * Log metric to console in development
     */
    PerformanceMonitor.prototype.logMetric = function (metric) {
        if (process.env.NODE_ENV === 'development') {
            var emoji = {
                good: '✅',
                'needs-improvement': '⚠️',
                poor: '❌',
            }[metric.rating];
            if (process.env.NODE_ENV === 'development') {
                console.log("".concat(emoji, " ").concat(metric.name, ": ").concat(metric.value.toFixed(2), "ms (").concat(metric.rating, ")"));
            }
        }
    };
    /**
     * Send metrics to analytics endpoint
     */
    PerformanceMonitor.prototype.sendToAnalytics = function (metric) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Only send in production
                        if (process.env.NODE_ENV !== 'production')
                            return [2 /*return*/];
                        endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
                        if (!endpoint)
                            return [2 /*return*/];
                        return [4 /*yield*/, fetch(endpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(__assign(__assign({}, metric), { url: window.location.href, userAgent: navigator.userAgent, timestamp: Date.now() })),
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.warn('Failed to send analytics:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all collected metrics
     */
    PerformanceMonitor.prototype.getMetrics = function () {
        return Array.from(this.metrics.values());
    };
    /**
     * Get a specific metric
     */
    PerformanceMonitor.prototype.getMetric = function (name) {
        return this.metrics.get(name);
    };
    /**
     * Disconnect all observers
     */
    PerformanceMonitor.prototype.disconnect = function () {
        this.observers.forEach(function (observer) { return observer.disconnect(); });
        this.observers.clear();
    };
    return PerformanceMonitor;
}());
// Bundle size analysis utilities
export var getBundleStats = function () {
    if (typeof window === 'undefined')
        return {};
    return {
        // Calculate approximate bundle sizes from performance entries
        scripts: performance.getEntriesByType('resource')
            .filter(function (entry) { return entry.name.includes('.js'); })
            .map(function (entry) { return ({
            name: entry.name.split('/').pop(),
            size: entry.transferSize || 0,
            duration: entry.duration,
        }); }),
        stylesheets: performance.getEntriesByType('resource')
            .filter(function (entry) { return entry.name.includes('.css'); })
            .map(function (entry) { return ({
            name: entry.name.split('/').pop(),
            size: entry.transferSize || 0,
            duration: entry.duration,
        }); }),
        // Total page weight
        totalTransferSize: performance.getEntriesByType('resource')
            .reduce(function (total, entry) { return total + (entry.transferSize || 0); }, 0),
    };
};
// Export singleton instance
export var performanceMonitor = new PerformanceMonitor();
// Export utilities for use in components
export var reportWebVitals = function (metric) {
    if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
    }
    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            value: Math.round(metric.value),
            custom_parameter_1: metric.rating,
        });
    }
};
export default PerformanceMonitor;
//# sourceMappingURL=performance.js.map