import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var StyledDivider = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: none;\n  \n  /* Apply orientation */\n  ", "\n  \n  /* Apply variant styles */\n  ", "\n  \n  /* Apply size styles (spacing) */\n  ", "\n"], ["\n  border: none;\n  \n  /* Apply orientation */\n  ", "\n  \n  /* Apply variant styles */\n  ", "\n  \n  /* Apply size styles (spacing) */\n  ", "\n"
    /**
     * Divider is an atomic component that provides visual separation between content sections.
     *
     * Features:
     * - Multiple variants (default, strong, minimal)
     * - Size variations for different spacing needs
     * - Horizontal and vertical orientations
     * - Semantic token usage for consistent styling
     * - Full accessibility support
     *
     * @example
     * ```tsx
     * <Divider />
     * <Divider variant="strong" size="xlarge" />
     * <Divider variant="minimal" />
     * <Divider orientation="vertical" />
     * ```
     */
])), function (_a) {
    var _b = _a.$orientation, $orientation = _b === void 0 ? 'horizontal' : _b;
    if ($orientation === 'vertical') {
        return "\n        display: inline-block;\n        height: auto;\n        align-self: stretch;\n        border-left: 1px solid;\n        border-top: none;\n      ";
    }
    return "border-top: 1px solid;";
}, function (_a) {
    var _b = _a.$variant, $variant = _b === void 0 ? 'default' : _b, _c = _a.$orientation, $orientation = _c === void 0 ? 'horizontal' : _c;
    var borderProperty = $orientation === 'vertical' ? 'border-left' : 'border-top';
    switch ($variant) {
        case 'strong':
            return "".concat(borderProperty, ": ").concat(tokens.component.separator.variants.strong.border, ";");
        case 'minimal':
            return "".concat(borderProperty, ": ").concat(tokens.component.separator.variants.minimal.border, ";");
        case 'default':
        default:
            return "".concat(borderProperty, ": ").concat(tokens.component.separator.variants.default.border, ";");
    }
}, function (_a) {
    var _b = _a.$size, $size = _b === void 0 ? 'large' : _b, _c = _a.$variant, $variant = _c === void 0 ? 'default' : _c, _d = _a.$orientation, $orientation = _d === void 0 ? 'horizontal' : _d;
    if ($variant === 'minimal' && $orientation === 'horizontal') {
        // Minimal variant always uses its predefined spacing for horizontal
        return "margin: ".concat(tokens.component.separator.variants.minimal.margin, ";");
    }
    if ($orientation === 'vertical') {
        // Vertical orientation uses horizontal margins (left/right)
        switch ($size) {
            case 'small':
                return "margin: 0 ".concat(tokens.semantic.spacing.separator.sm, ";");
            case 'medium':
                return "margin: 0 ".concat(tokens.semantic.spacing.separator.md, ";");
            case 'xlarge':
                return "margin: 0 ".concat(tokens.semantic.spacing.separator.xl, ";");
            case 'large':
            default:
                return "margin: 0 ".concat(tokens.semantic.spacing.separator.lg, ";");
        }
    }
    // Horizontal orientation uses vertical margins (top/bottom)
    switch ($size) {
        case 'small':
            return "margin: ".concat(tokens.component.separator.sizes.small.margin, ";");
        case 'medium':
            return "margin: ".concat(tokens.component.separator.sizes.medium.margin, ";");
        case 'xlarge':
            return "margin: ".concat(tokens.component.separator.sizes.xlarge.margin, ";");
        case 'large':
        default:
            return "margin: ".concat(tokens.component.separator.sizes.large.margin, ";");
    }
});
/**
 * Divider is an atomic component that provides visual separation between content sections.
 *
 * Features:
 * - Multiple variants (default, strong, minimal)
 * - Size variations for different spacing needs
 * - Horizontal and vertical orientations
 * - Semantic token usage for consistent styling
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider variant="strong" size="xlarge" />
 * <Divider variant="minimal" />
 * <Divider orientation="vertical" />
 * ```
 */
export var Divider = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.size, size = _c === void 0 ? 'large' : _c, _d = _a.orientation, orientation = _d === void 0 ? 'horizontal' : _d, dataTestId = _a["data-testid"];
    return (<StyledDivider $variant={variant} $size={size} $orientation={orientation} data-testid={dataTestId} role="separator" aria-orientation={orientation}/>);
};
var templateObject_1;
//# sourceMappingURL=Divider.jsx.map