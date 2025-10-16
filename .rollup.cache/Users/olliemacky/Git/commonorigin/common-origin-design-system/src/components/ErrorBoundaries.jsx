import { __makeTemplateObject } from "tslib";
import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var semantic = tokens.semantic, base = tokens.base;
// Styled components following the design system patterns
var ErrorContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n  align-items: center;\n  text-align: center;\n  padding: ", ";\n  box-sizing: border-box;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n  align-items: center;\n  text-align: center;\n  padding: ", ";\n  box-sizing: border-box;\n"])), base.spacing[4], base.spacing[8]);
var PageErrorContainer = styled(ErrorContainer)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  min-height: 50vh;\n  justify-content: center;\n"], ["\n  min-height: 50vh;\n  justify-content: center;\n"])));
var ComponentErrorContainer = styled(ErrorContainer)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  min-height: 200px;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  margin: ", " 0;\n"], ["\n  min-height: 200px;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  margin: ", " 0;\n"])), semantic.color.background.subtle, semantic.color.border.subtle, base.border.radius[4], base.spacing[2]);
var LayoutErrorContainer = styled(ErrorContainer)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  min-height: 100vh;\n  background-color: ", ";\n  justify-content: center;\n"], ["\n  min-height: 100vh;\n  background-color: ", ";\n  justify-content: center;\n"
    // Typography components following design system
])), semantic.color.background.surface);
// Typography components following design system
var ErrorIcon = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 4rem;\n  line-height: 1;\n  margin-bottom: ", ";\n  opacity: 0.7;\n"], ["\n  font-size: 4rem;\n  line-height: 1;\n  margin-bottom: ", ";\n  opacity: 0.7;\n"])), base.spacing[4]);
var ErrorTitle = styled.h2(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font: ", ";\n  letter-spacing: ", ";\n  color: ", ";\n  margin: 0 0 ", " 0;\n"], ["\n  font: ", ";\n  letter-spacing: ", ";\n  color: ", ";\n  margin: 0 0 ", " 0;\n"])), semantic.typography.h2, base.letterSpacing[1], semantic.color.text.default, base.spacing[3]);
var ErrorSubtitle = styled.h3(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font: ", ";\n  letter-spacing: ", ";\n  color: ", ";\n  margin: 0 0 ", " 0;\n"], ["\n  font: ", ";\n  letter-spacing: ", ";\n  color: ", ";\n  margin: 0 0 ", " 0;\n"])), semantic.typography.h4, base.letterSpacing[1], semantic.color.text.subdued, base.spacing[2]);
var ErrorText = styled.p(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n  margin: 0;\n  max-width: 500px;\n  line-height: 1.6;\n"], ["\n  font: ", ";\n  color: ", ";\n  margin: 0;\n  max-width: 500px;\n  line-height: 1.6;\n"])), semantic.typography.body, semantic.color.text.subdued);
var ErrorActions = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  gap: ", ";\n  margin-top: ", ";\n  flex-wrap: wrap;\n  justify-content: center;\n"], ["\n  display: flex;\n  gap: ", ";\n  margin-top: ", ";\n  flex-wrap: wrap;\n  justify-content: center;\n"])), base.spacing[3], base.spacing[6]);
var ErrorButton = styled.button(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  font: ", ";\n  padding: ", " ", ";\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n  \n  &:focus {\n    outline: ", ";\n    outline-offset: 2px;\n  }\n  \n  &:active {\n    transform: translateY(1px);\n  }\n"], ["\n  font: ", ";\n  padding: ", " ", ";\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background-color: ", ";\n    border-color: ", ";\n  }\n  \n  &:focus {\n    outline: ", ";\n    outline-offset: 2px;\n  }\n  \n  &:active {\n    transform: translateY(1px);\n  }\n"
    // Enhanced fallback components with proper design system styling
])), semantic.typography.button2, base.spacing[2], base.spacing[4], semantic.color.background.surface, semantic.color.text.default, semantic.color.border.subtle, base.border.radius[3], semantic.color.background.subtle, semantic.color.border.default, semantic.border.focus);
// Enhanced fallback components with proper design system styling
var PageErrorFallback = function (_a) {
    var _b = _a.pageName, pageName = _b === void 0 ? 'page' : _b;
    return (<PageErrorContainer>
    <ErrorIcon>📄</ErrorIcon>
    <ErrorTitle>Page Unavailable</ErrorTitle>
    <ErrorText>
      We couldn't load this {pageName}. This might be a temporary issue or the page may have been moved.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={function () { return window.location.reload(); }}>
        Try Again
      </ErrorButton>
      <ErrorButton onClick={function () { return window.history.back(); }}>
        Go Back
      </ErrorButton>
    </ErrorActions>
  </PageErrorContainer>);
};
export var PageErrorBoundary = function (_a) {
    var children = _a.children, pageName = _a.pageName;
    return (<ErrorBoundary fallback={<PageErrorFallback pageName={pageName}/>} onError={function (error, errorInfo) {
            console.error("Page Error in ".concat(pageName, ":"), error, errorInfo);
        }}>
      {children}
    </ErrorBoundary>);
};
// Component error fallback with better UX
var ComponentErrorFallback = function (_a) {
    var _b = _a.componentName, componentName = _b === void 0 ? 'component' : _b;
    return (<ComponentErrorContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorSubtitle>Component Error</ErrorSubtitle>
    <ErrorText>
      The {componentName} couldn't load properly. Other parts of the page should still work normally.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={function () { return window.location.reload(); }}>
        Refresh Page
      </ErrorButton>
    </ErrorActions>
  </ComponentErrorContainer>);
};
export var ComponentErrorBoundary = function (_a) {
    var children = _a.children, componentName = _a.componentName;
    return (<ErrorBoundary fallback={<ComponentErrorFallback componentName={componentName}/>} onError={function (error, errorInfo) {
            console.error("Component Error in ".concat(componentName, ":"), error, errorInfo);
        }}>
      {children}
    </ErrorBoundary>);
};
// Layout error fallback with critical error handling
var LayoutErrorFallback = function () { return (<LayoutErrorContainer>
    <ErrorIcon>🚧</ErrorIcon>
    <ErrorTitle>Application Error</ErrorTitle>
    <ErrorText>
      We're experiencing technical difficulties. Our team has been notified and is working to resolve this issue.
    </ErrorText>
    <ErrorActions>
      <ErrorButton onClick={function () { return window.location.reload(); }}>
        Reload Application
      </ErrorButton>
      <ErrorButton onClick={function () { return window.location.href = '/'; }}>
        Go to Homepage
      </ErrorButton>
    </ErrorActions>
  </LayoutErrorContainer>); };
export var LayoutErrorBoundary = function (_a) {
    var children = _a.children;
    return (<ErrorBoundary fallback={<LayoutErrorFallback />} onError={function (error, errorInfo) {
            console.error('Layout Error:', error, errorInfo);
        }}>
      {children}
    </ErrorBoundary>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=ErrorBoundaries.jsx.map