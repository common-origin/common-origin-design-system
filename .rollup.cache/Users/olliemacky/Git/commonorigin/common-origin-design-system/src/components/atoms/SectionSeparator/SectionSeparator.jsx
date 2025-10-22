import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var StyledSeparator = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border: none;\n  border-top: 1px solid;\n  \n  /* Apply variant styles */\n  ", "\n  \n  /* Apply size styles */\n  ", "\n"], ["\n  border: none;\n  border-top: 1px solid;\n  \n  /* Apply variant styles */\n  ", "\n  \n  /* Apply size styles */\n  ", "\n"
    /**
     * SectionSeparator is an atomic component that provides visual separation between content sections.
     *
     * Features:
     * - Multiple variants (default, strong, minimal)
     * - Size variations for different spacing needs
     * - Semantic token usage for consistent styling
     * - Full accessibility support
     *
     * @example
     * ```tsx
     * <SectionSeparator />
     * <SectionSeparator variant="strong" size="xlarge" />
     * <SectionSeparator variant="minimal" />
     * ```
     */
])), function (_a) {
    var _b = _a.$variant, $variant = _b === void 0 ? 'default' : _b;
    switch ($variant) {
        case 'strong':
            return "border-top: ".concat(tokens.component.separator.variants.strong.border, ";");
        case 'minimal':
            return "border-top: ".concat(tokens.component.separator.variants.minimal.border, ";");
        case 'default':
        default:
            return "border-top: ".concat(tokens.component.separator.variants.default.border, ";");
    }
}, function (_a) {
    var _b = _a.$size, $size = _b === void 0 ? 'large' : _b, _c = _a.$variant, $variant = _c === void 0 ? 'default' : _c;
    if ($variant === 'minimal') {
        // Minimal variant always uses its predefined spacing
        return "margin: ".concat(tokens.component.separator.variants.minimal.margin, ";");
    }
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
 * SectionSeparator is an atomic component that provides visual separation between content sections.
 *
 * Features:
 * - Multiple variants (default, strong, minimal)
 * - Size variations for different spacing needs
 * - Semantic token usage for consistent styling
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <SectionSeparator />
 * <SectionSeparator variant="strong" size="xlarge" />
 * <SectionSeparator variant="minimal" />
 * ```
 */
export var SectionSeparator = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.size, size = _c === void 0 ? 'large' : _c, dataTestId = _a["data-testid"];
    return (<StyledSeparator $variant={variant} $size={size} data-testid={dataTestId} role="separator" aria-orientation="horizontal"/>);
};
var templateObject_1;
//# sourceMappingURL=SectionSeparator.jsx.map