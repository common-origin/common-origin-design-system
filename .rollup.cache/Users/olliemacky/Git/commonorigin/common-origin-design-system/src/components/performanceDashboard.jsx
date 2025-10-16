import { __makeTemplateObject } from "tslib";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { performanceMonitor, getBundleStats } from '../lib/performance';
import { Typography } from './';
import tokens from '../styles/tokens.json';
var semantic = tokens.semantic, base = tokens.base;
var DashboardContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  margin: ", " 0;\n"], ["\n  padding: ", ";\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  margin: ", " 0;\n"])), base.spacing[6], semantic.color.background.surface, semantic.color.border.subtle, base.border.radius[4], base.spacing[4]);
var MetricsGrid = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: ", ";\n  margin-top: ", ";\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: ", ";\n  margin-top: ", ";\n"])), base.spacing[4], base.spacing[4]);
var MetricCard = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  border: 1px solid ", ";\n"], ["\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  border: 1px solid ", ";\n"])), base.spacing[4], semantic.color.background.default, base.border.radius[3], function (_a) {
    var rating = _a.rating;
    switch (rating) {
        case 'good': return semantic.color.border.success || '#28a745';
        case 'needs-improvement': return semantic.color.border.warning || '#ffc107';
        case 'poor': return semantic.color.border.error || '#dc3545';
        default: return semantic.color.border.subtle;
    }
});
var MetricValue = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin: ", " 0;\n"], ["\n  font: ", ";\n  color: ", ";\n  margin: ", " 0;\n"])), semantic.typography.display, function (_a) {
    var rating = _a.rating;
    switch (rating) {
        case 'good': return semantic.color.text.success || '#28a745';
        case 'needs-improvement': return semantic.color.text.warning || '#ffc107';
        case 'poor': return semantic.color.text.error || '#dc3545';
        default: return semantic.color.text.default;
    }
}, base.spacing[2]);
var MetricLabel = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n  letter-spacing: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n  letter-spacing: ", ";\n"])), semantic.typography.overline, semantic.color.text.subdued, base.letterSpacing[3]);
var MetricDescription = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"])), semantic.typography.small, semantic.color.text.subdued, base.spacing[1]);
var BundleStatsContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin-top: ", ";\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n"], ["\n  margin-top: ", ";\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n"])), base.spacing[6], base.spacing[4], semantic.color.background.subtle, base.border.radius[3]);
var StatsTable = styled.table(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: ", ";\n  \n  th, td {\n    padding: ", " ", ";\n    text-align: left;\n    border-bottom: 1px solid ", ";\n  }\n  \n  th {\n    font: ", ";\n    color: ", ";\n    text-transform: uppercase;\n  }\n  \n  td {\n    font: ", ";\n    color: ", ";\n  }\n"], ["\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: ", ";\n  \n  th, td {\n    padding: ", " ", ";\n    text-align: left;\n    border-bottom: 1px solid ", ";\n  }\n  \n  th {\n    font: ", ";\n    color: ", ";\n    text-transform: uppercase;\n  }\n  \n  td {\n    font: ", ";\n    color: ", ";\n  }\n"])), base.spacing[3], base.spacing[2], base.spacing[3], semantic.color.border.subtle, semantic.typography.overline, semantic.color.text.subdued, semantic.typography.body, semantic.color.text.default);
var LoadingText = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"])), semantic.typography.body, semantic.color.text.subdued, base.spacing[4]);
var SectionTitle = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"])), semantic.typography.h5, semantic.color.text.default, base.spacing[4]);
var BundleInfo = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n  margin-top: ", ";\n"])), semantic.typography.body, semantic.color.text.default, base.spacing[3]);
var ToggleButton = styled.button(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  font: ", ";\n  padding: ", " ", ";\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-top: ", ";\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n"], ["\n  font: ", ";\n  padding: ", " ", ";\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-top: ", ";\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n"])), semantic.typography.button2, base.spacing[2], base.spacing[4], semantic.color.background.surface, semantic.color.text.default, semantic.color.border.subtle, base.border.radius[3], base.spacing[4], semantic.color.background.subtle, semantic.color.border.default);
export var PerformanceDashboard = function (_a) {
    var className = _a.className;
    var _b = useState([]), metrics = _b[0], setMetrics = _b[1];
    var _c = useState(null), bundleStats = _c[0], setBundleStats = _c[1];
    var _d = useState(false), showDetails = _d[0], setShowDetails = _d[1];
    useEffect(function () {
        // Get initial metrics
        var updateMetrics = function () {
            var currentMetrics = performanceMonitor.getMetrics();
            setMetrics(currentMetrics);
        };
        updateMetrics();
        // Get bundle stats
        if (typeof window !== 'undefined') {
            setTimeout(function () {
                var stats = getBundleStats();
                setBundleStats(stats);
            }, 1000);
        }
        // Update metrics periodically
        var interval = setInterval(updateMetrics, 2000);
        return function () { return clearInterval(interval); };
    }, []);
    var formatValue = function (name, value) {
        if (name === 'CLS') {
            return value.toFixed(3);
        }
        return "".concat(Math.round(value), "ms");
    };
    var formatBytes = function (bytes) {
        if (bytes === 0)
            return '0 B';
        var k = 1024;
        var sizes = ['B', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(1)), " ").concat(sizes[i]);
    };
    var getDescription = function (name) {
        var descriptions = {
            LCP: 'Time for largest content element to render',
            FID: 'Time from first user interaction to browser response',
            CLS: 'Visual stability - lower is better',
            TTFB: 'Time to receive first byte from server',
        };
        return descriptions[name] || '';
    };
    return (<DashboardContainer className={className}>
      <Typography variant="h3">Performance Dashboard</Typography>
      <Typography variant="body" color="subdued">
        Real-time Core Web Vitals and bundle analysis
      </Typography>

      {metrics.length > 0 ? (<MetricsGrid>
          {metrics.map(function (metric) { return (<MetricCard key={metric.name} rating={metric.rating}>
              <MetricLabel>{metric.name}</MetricLabel>
              <MetricValue rating={metric.rating}>
                {formatValue(metric.name, metric.value)}
              </MetricValue>
              <MetricDescription>
                {getDescription(metric.name)}
              </MetricDescription>
            </MetricCard>); })}
        </MetricsGrid>) : (<LoadingText>
          Performance metrics are being collected...
        </LoadingText>)}

      <ToggleButton onClick={function () { return setShowDetails(!showDetails); }}>
        {showDetails ? 'Hide' : 'Show'} Bundle Details
      </ToggleButton>

      {showDetails && bundleStats && (<BundleStatsContainer>
          <Typography variant="h4">Bundle Analysis</Typography>
          
          <BundleInfo>
            Total Transfer Size: {formatBytes(bundleStats.totalTransferSize)}
          </BundleInfo>

          {bundleStats.scripts && bundleStats.scripts.length > 0 && (<>
              <SectionTitle>
                JavaScript Files
              </SectionTitle>
              <StatsTable>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Size</th>
                    <th>Load Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bundleStats.scripts.map(function (script, index) { return (<tr key={index}>
                      <td>{script.name}</td>
                      <td>{formatBytes(script.size)}</td>
                      <td>{Math.round(script.duration)}ms</td>
                    </tr>); })}
                </tbody>
              </StatsTable>
            </>)}

          {bundleStats.stylesheets && bundleStats.stylesheets.length > 0 && (<>
              <SectionTitle>
                CSS Files
              </SectionTitle>
              <StatsTable>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Size</th>
                    <th>Load Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bundleStats.stylesheets.map(function (stylesheet, index) { return (<tr key={index}>
                      <td>{stylesheet.name}</td>
                      <td>{formatBytes(stylesheet.size)}</td>
                      <td>{Math.round(stylesheet.duration)}ms</td>
                    </tr>); })}
                </tbody>
              </StatsTable>
            </>)}
        </BundleStatsContainer>)}
    </DashboardContainer>);
};
export default PerformanceDashboard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
//# sourceMappingURL=performanceDashboard.jsx.map