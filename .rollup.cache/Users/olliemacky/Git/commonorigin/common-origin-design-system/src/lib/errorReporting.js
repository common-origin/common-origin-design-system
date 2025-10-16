import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
var ErrorReportingService = /** @class */ (function () {
    function ErrorReportingService() {
        this.queue = [];
        this.isReporting = false;
    }
    ErrorReportingService.getInstance = function () {
        if (!ErrorReportingService.instance) {
            ErrorReportingService.instance = new ErrorReportingService();
        }
        return ErrorReportingService.instance;
    };
    ErrorReportingService.prototype.captureException = function (error, options) {
        if (options === void 0) { options = {}; }
        var report = {
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack || '',
            },
            errorInfo: options.errorInfo,
            timestamp: new Date().toISOString(),
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
            userId: options.userId,
            sessionId: options.sessionId || this.getSessionId(),
            buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION,
        };
        // Add to queue
        this.queue.push(report);
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error Report:', report);
        }
        // Send reports in production
        if (process.env.NODE_ENV === 'production') {
            this.sendReports();
        }
    };
    ErrorReportingService.prototype.sendReports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var reports, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isReporting || this.queue.length === 0)
                            return [2 /*return*/];
                        this.isReporting = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        reports = __spreadArray([], this.queue, true);
                        this.queue = [];
                        // Send to your error reporting service
                        // This could be Sentry, LogRocket, custom endpoint, etc.
                        return [4 /*yield*/, this.sendToService(reports)];
                    case 2:
                        // Send to your error reporting service
                        // This could be Sentry, LogRocket, custom endpoint, etc.
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        console.error('Failed to send error reports:', error_1);
                        // Put reports back in queue to retry later
                        (_a = this.queue).unshift.apply(_a, this.queue);
                        return [3 /*break*/, 5];
                    case 4:
                        this.isReporting = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ErrorReportingService.prototype.sendToService = function (reports) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = process.env.NEXT_PUBLIC_ERROR_REPORTING_ENDPOINT;
                        if (!endpoint) {
                            console.warn('No error reporting endpoint configured');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(endpoint, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    reports: reports,
                                    metadata: {
                                        timestamp: new Date().toISOString(),
                                        environment: process.env.NODE_ENV,
                                        buildVersion: process.env.NEXT_PUBLIC_BUILD_VERSION,
                                    },
                                }),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP ".concat(response.status, ": ").concat(response.statusText));
                        }
                        if (process.env.NODE_ENV === 'development') {
                            console.log("Successfully sent ".concat(reports.length, " error reports"));
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error reporting service failed:', error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ErrorReportingService.prototype.getSessionId = function () {
        if (typeof window === 'undefined')
            return 'server';
        var sessionId = sessionStorage.getItem('error-session-id');
        if (!sessionId) {
            sessionId = "session-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
            sessionStorage.setItem('error-session-id', sessionId);
        }
        return sessionId;
    };
    // Manual error reporting for custom errors
    ErrorReportingService.prototype.reportError = function (message, context) {
        var error = new Error(message);
        this.captureException(error, { context: context });
    };
    // Performance monitoring
    ErrorReportingService.prototype.reportPerformanceIssue = function (metric, value, context) {
        if (process.env.NODE_ENV === 'production') {
            this.reportError("Performance issue: ".concat(metric, " = ").concat(value), __assign({ metric: metric, value: value }, context));
        }
    };
    return ErrorReportingService;
}());
// Export singleton instance
export var errorReporting = ErrorReportingService.getInstance();
// Utility functions
export var captureException = function (error, options) {
    errorReporting.captureException(error, options);
};
export var reportError = function (message, context) {
    errorReporting.reportError(message, context);
};
export var reportPerformanceIssue = function (metric, value, context) {
    errorReporting.reportPerformanceIssue(metric, value, context);
};
//# sourceMappingURL=errorReporting.js.map