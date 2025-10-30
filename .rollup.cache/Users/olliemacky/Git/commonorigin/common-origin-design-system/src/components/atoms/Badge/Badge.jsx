import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled, { keyframes } from 'styled-components';
import tokens from '@/styles/tokens.json';
import { Typography } from '../Typography';
var color = tokens.semantic.color, shadow = tokens.base.shadow;
var scaleIn = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n"], ["\n  from {\n    transform: scale(0.8);\n    opacity: 0;\n  }\n  to {\n    transform: scale(1);\n    opacity: 1;\n  }\n"])));
var BadgeWrapper = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle;\n  flex-shrink: 0;\n"], ["\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle;\n  flex-shrink: 0;\n"])));
var BadgeIndicator = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(50%, -50%);\n  display: ", ";\n  align-items: center;\n  justify-content: center;\n  min-width: ", ";\n  height: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  line-height: 1;\n  white-space: nowrap;\n  box-shadow: 0 0 0 2px ", ";\n  animation: ", " 0.2s ease-out;\n  \n  ", "\n"], ["\n  position: absolute;\n  top: 0;\n  right: 0;\n  transform: translate(50%, -50%);\n  display: ", ";\n  align-items: center;\n  justify-content: center;\n  min-width: ", ";\n  height: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  line-height: 1;\n  white-space: nowrap;\n  box-shadow: 0 0 0 2px ", ";\n  animation: ", " 0.2s ease-out;\n  \n  ", "\n"])), function (props) { return props.$isVisible ? 'flex' : 'none'; }, function (props) { return props.$isDot ? '8px' : '16px'; }, function (props) { return props.$isDot ? '8px' : '16px'; }, function (props) { return props.$isDot ? '0' : '0 4px'; }, tokens.base.border.radius.circle, color.background.default, scaleIn, function (props) {
    switch (props.$variant) {
        case 'primary':
            return "\n          background-color: ".concat(color.background.interactive, ";\n          color: ").concat(color.text.inverse, ";\n        ");
        case 'error':
            return "\n          background-color: ".concat(color.background.error, ";\n          color: ").concat(color.text.inverse, ";\n        ");
        case 'warning':
            return "\n          background-color: ".concat(color.background.warning, ";\n          color: ").concat(color.text.inverse, ";\n        ");
        case 'success':
            return "\n          background-color: ".concat(color.background.success, ";\n          color: ").concat(color.text.inverse, ";\n        ");
        default:
            return "\n          background-color: ".concat(color.background.emphasis, ";\n          color: ").concat(color.text.inverse, ";\n        ");
    }
});
var ScreenReaderOnly = styled.span(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n"], ["\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n"])));
export var Badge = function (_a) {
    var children = _a.children, _b = _a.count, count = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 99 : _c, _d = _a.variant, variant = _d === void 0 ? 'default' : _d, _e = _a.dot, dot = _e === void 0 ? false : _e, ariaLabel = _a["aria-label"], className = _a.className;
    var isVisible = dot || count > 0;
    var displayCount = count > max ? "".concat(max, "+") : count.toString();
    // Generate default aria-label if not provided
    var defaultAriaLabel = dot
        ? 'New notification indicator'
        : count === 1
            ? '1 notification'
            : "".concat(count, " notifications");
    var label = ariaLabel || defaultAriaLabel;
    return (<BadgeWrapper className={className}>
      {children}
      <BadgeIndicator $variant={variant} $isDot={dot} $isVisible={isVisible} role="status" aria-live="polite">
        {!dot && (<Typography variant="caption" color="inverse">
            {displayCount}
          </Typography>)}
        <ScreenReaderOnly>{label}</ScreenReaderOnly>
      </BadgeIndicator>
    </BadgeWrapper>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Badge.jsx.map