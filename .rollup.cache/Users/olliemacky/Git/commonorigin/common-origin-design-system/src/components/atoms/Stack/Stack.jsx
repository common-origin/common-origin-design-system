import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var StyledStack = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: var(--stack-direction);\n  align-items: var(--stack-align-items);\n  justify-content: var(--stack-justify-content);\n  gap: var(--stack-gap);\n  flex-wrap: var(--stack-wrap);\n"], ["\n  display: flex;\n  flex-direction: var(--stack-direction);\n  align-items: var(--stack-align-items);\n  justify-content: var(--stack-justify-content);\n  gap: var(--stack-gap);\n  flex-wrap: var(--stack-wrap);\n"
    // Helper function to convert gap prop to CSS value
])));
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
    // Create CSS custom properties object with proper typing
    var cssProps = {
        '--stack-direction': direction,
        '--stack-align-items': alignItems || 'initial',
        '--stack-justify-content': justifyContent || 'initial',
        '--stack-gap': gapValue,
        '--stack-wrap': wrap ? 'wrap' : 'nowrap'
    };
    return (<StyledStack style={cssProps} data-testid={dataTestId}>
      {children}
    </StyledStack>);
};
export default Stack;
var templateObject_1;
//# sourceMappingURL=Stack.jsx.map