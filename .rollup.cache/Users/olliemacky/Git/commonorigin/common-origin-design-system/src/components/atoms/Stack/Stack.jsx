import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var StyledStack = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !['$direction', '$gap', '$alignItems', '$justifyContent', '$wrap'].includes(prop); },
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: ", ";\n  align-items: ", ";\n  justify-content: ", ";\n  gap: ", ";\n  flex-wrap: ", ";\n"], ["\n  display: flex;\n  flex-direction: ", ";\n  align-items: ", ";\n  justify-content: ", ";\n  gap: ", ";\n  flex-wrap: ", ";\n"
    // Helper function to convert gap prop to CSS value
])), function (_a) {
    var $direction = _a.$direction;
    return $direction;
}, function (_a) {
    var $alignItems = _a.$alignItems;
    return $alignItems || 'initial';
}, function (_a) {
    var $justifyContent = _a.$justifyContent;
    return $justifyContent || 'initial';
}, function (_a) {
    var $gap = _a.$gap;
    return $gap;
}, function (_a) {
    var $wrap = _a.$wrap;
    return $wrap ? 'wrap' : 'nowrap';
});
// Helper function to convert gap prop to CSS value
var getGapValue = function (gap) {
    // Get semantic layout spacing token
    var semanticSpacing = tokens.semantic.spacing.layout;
    if (gap in semanticSpacing) {
        return semanticSpacing[gap];
    }
    // Fallback to medium layout spacing if token not found
    return tokens.semantic.spacing.layout.md;
};
export var Stack = function (_a) {
    var children = _a.children, _b = _a.direction, direction = _b === void 0 ? 'row' : _b, _c = _a.gap, gap = _c === void 0 ? 'md' : _c, alignItems = _a.alignItems, justifyContent = _a.justifyContent, _d = _a.wrap, wrap = _d === void 0 ? false : _d, dataTestId = _a["data-testid"];
    var gapValue = getGapValue(gap);
    return (<StyledStack $direction={direction} $gap={gapValue} $alignItems={alignItems} $justifyContent={justifyContent} $wrap={wrap} data-testid={dataTestId}>
      {children}
    </StyledStack>);
};
export default Stack;
var templateObject_1;
//# sourceMappingURL=Stack.jsx.map