import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var _a = tokens.semantic, typography = _a.typography, color = _a.color;
var getTypographyStyles = function (variant) {
    var styles = {
        display: "font: ".concat(typography.display, "; letter-spacing: ").concat(tokens.base.letterSpacing[0], ";"),
        h1: "font: ".concat(typography.h1, "; letter-spacing: ").concat(tokens.base.letterSpacing[0], ";"),
        h2: "font: ".concat(typography.h2, "; letter-spacing: ").concat(tokens.base.letterSpacing[1], ";"),
        h3: "font: ".concat(typography.h3, "; letter-spacing: ").concat(tokens.base.letterSpacing[1], ";"),
        h4: "font: ".concat(typography.h4, "; letter-spacing: ").concat(tokens.base.letterSpacing[1], ";"),
        h5: "font: ".concat(typography.h5, "; letter-spacing: ").concat(tokens.base.letterSpacing[2], ";"),
        h6: "font: ".concat(typography.h6, "; letter-spacing: ").concat(tokens.base.letterSpacing[2], ";"),
        subtitle: "font: ".concat(typography.subtitle, ";"),
        body: "font: ".concat(typography.body, ";"),
        small: "font: ".concat(typography.small, ";"),
        overline: "font: ".concat(typography.overline, ";"),
        caption: "font: ".concat(typography.caption, "; text-transform: uppercase;"),
        button1: "font: ".concat(typography.button1, ";"),
        button2: "font: ".concat(typography.button2, ";"),
        button3: "font: ".concat(typography.button3, ";"),
        label: "font: ".concat(typography.label, ";"),
    };
    return styles[variant] || styles.body;
};
var getTextColor = function (colorVariant) {
    var colorMap = {
        default: color.text.default,
        emphasis: color.text.emphasis,
        subdued: color.text.subdued,
        inverse: color.text.inverse,
        disabled: color.text.disabled,
        interactive: color.text.interactive,
        error: color.text.error,
        success: color.text.success,
        warning: color.text.warning,
    };
    return colorMap[colorVariant] || colorMap.default;
};
var getDefaultElement = function (variant) {
    var elementMap = {
        display: 'h1',
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        subtitle: 'p',
        body: 'p',
        small: 'span',
        overline: 'span',
        caption: 'span',
        button1: 'span',
        button2: 'span',
        button3: 'span',
        label: 'span',
    };
    return elementMap[variant] || 'span';
};
var StyledTypography = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !['$variant', '$color'].includes(prop); },
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  color: ", ";\n  margin: 0;\n  \n  /* Ensure proper line height for readability */\n  ", "\n"], ["\n  ", "\n  color: ", ";\n  margin: 0;\n  \n  /* Ensure proper line height for readability */\n  ", "\n"
    /**
     * Typography is an atomic component for rendering text with semantic meaning and consistent styling.
     *
     * Features:
     * - Semantic variants (h1-h6, body, subtitle, etc.)
     * - Color variants for different contexts
     * - Automatic semantic HTML element selection
     * - Manual element override support
     * - Direct semantic token usage (no component tokens needed)
     * - Full accessibility support
     *
     * @example
     * ```tsx
     * <Typography variant="h1">Main Heading</Typography>
     * <Typography variant="body" color="subdued">Body text</Typography>
     * <Typography variant="caption" as="figcaption">Image caption</Typography>
     * ```
     */
])), function (_a) {
    var $variant = _a.$variant;
    return getTypographyStyles($variant);
}, function (_a) {
    var $color = _a.$color;
    return getTextColor($color);
}, function (_a) {
    var $variant = _a.$variant;
    if (['body', 'subtitle', 'small'].includes($variant)) {
        return 'line-height: 1.5;';
    }
    return '';
});
/**
 * Typography is an atomic component for rendering text with semantic meaning and consistent styling.
 *
 * Features:
 * - Semantic variants (h1-h6, body, subtitle, etc.)
 * - Color variants for different contexts
 * - Automatic semantic HTML element selection
 * - Manual element override support
 * - Direct semantic token usage (no component tokens needed)
 * - Full accessibility support
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Main Heading</Typography>
 * <Typography variant="body" color="subdued">Body text</Typography>
 * <Typography variant="caption" as="figcaption">Image caption</Typography>
 * ```
 */
export var Typography = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'body' : _b, children = _a.children, _c = _a.color, color = _c === void 0 ? 'default' : _c, as = _a.as, dataTestId = _a["data-testid"];
    // $variant and $color are only used for styled-components prop filtering
    var defaultElement = getDefaultElement(variant);
    var elementType = as || defaultElement;
    return (<StyledTypography as={elementType} $variant={variant} $color={color} data-testid={dataTestId}>
      {children}
    </StyledTypography>);
};
var templateObject_1;
//# sourceMappingURL=Typography.jsx.map