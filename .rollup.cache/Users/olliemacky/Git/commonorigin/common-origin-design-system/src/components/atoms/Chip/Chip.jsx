import { __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var chip = tokens.component.chip;
// Dynamic variant styles using component tokens
var getVariantStyles = function (_a) {
    var variant = _a.variant;
    switch (variant) {
        case 'emphasis':
            return "\n        background-color: ".concat(chip.variants.emphasis.backgroundColor, ";\n        color: ").concat(chip.variants.emphasis.textColor, ";\n      ");
        case 'subtle':
            return "\n        background-color: ".concat(chip.variants.subtle.backgroundColor, ";\n        color: ").concat(chip.variants.subtle.textColor, ";\n      ");
        case 'interactive':
            return "\n        background-color: ".concat(chip.variants.interactive.backgroundColor, ";\n        color: ").concat(chip.variants.interactive.textColor, ";\n      ");
        case 'default':
        default:
            return "\n        background-color: ".concat(chip.default.backgroundColor, ";\n        color: ").concat(chip.default.textColor, ";\n      ");
    }
};
// Dynamic size styles using component tokens
var getSizeStyles = function (_a) {
    var size = _a.size;
    switch (size) {
        case 'small':
            return "\n        font: ".concat(chip.sizes.small.font, ";\n        padding: ").concat(chip.sizes.small.padding, ";\n      ");
        case 'large':
            return "\n        font: ".concat(chip.sizes.large.font, ";\n        padding: ").concat(chip.sizes.large.padding, ";\n      ");
        case 'medium':
        default:
            return "\n        font: ".concat(chip.sizes.medium.font, ";\n        padding: ").concat(chip.sizes.medium.padding, ";\n      ");
    }
};
// Base styled component that only receives styling props
var BaseChip = styled.span.withConfig({
    shouldForwardProp: function (prop) {
        // Explicitly list props that should NOT be forwarded to the DOM
        var excludedProps = ['variant', 'size', 'disabled', 'clickable'];
        return !excludedProps.includes(prop);
    }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: ", ";\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: ", ";\n  \n  ", "\n  ", "\n  \n  ", "\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: ", ";\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: ", ";\n  \n  ", "\n  ", "\n  \n  ", "\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"
    // Wrapper component that handles prop filtering
])), chip.default.borderRadius, tokens.semantic.motion.interactive, getVariantStyles, getSizeStyles, function (_a) {
    var clickable = _a.clickable, disabled = _a.disabled;
    if (disabled) {
        return "\n        opacity: 0.6;\n        cursor: not-allowed;\n      ";
    }
    if (clickable) {
        return "\n        cursor: pointer;\n        \n        &:hover {\n          opacity: 0.8;\n        }\n        \n        &:active {\n          opacity: 0.9;\n        }\n      ";
    }
    return '';
}, chip.variants.interactive.backgroundColor);
// Wrapper component that handles prop filtering
var StyledChip = function (_a) {
    var variant = _a.variant, size = _a.size, disabled = _a.disabled, clickable = _a.clickable, children = _a.children, htmlProps = __rest(_a, ["variant", "size", "disabled", "clickable", "children"]);
    // Filter out any remaining non-HTML props to ensure they don't reach the DOM
    var cleanHtmlProps = __rest(htmlProps, []);
    return (<BaseChip variant={variant} size={size} disabled={disabled} clickable={clickable} {...cleanHtmlProps}>
      {children}
    </BaseChip>);
};
export var Chip = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _e = _a.size, size = _e === void 0 ? 'medium' : _e, onClick = _a.onClick, _f = _a.disabled, disabled = _f === void 0 ? false : _f, dataTestId = _a["data-testid"], ariaLabel = _a["aria-label"], ariaDescribedBy = _a["aria-describedby"], role = _a.role, title = _a.title, // Legacy prop support
    props = __rest(_a, ["children", "variant", "size", "onClick", "disabled", 'data-testid', 'aria-label', 'aria-describedby', "role", "title"]);
    var isClickable = Boolean(onClick && !disabled);
    // Map legacy variants to new variants for backward compatibility
    var normalizedVariant = variant === 'light' ? 'default' :
        variant === 'dark' ? 'emphasis' :
            variant;
    // Support legacy title prop - prioritize children over title
    var content = children !== undefined ? children : title;
    // Remove styled-only props from the rest
    var _g = props, _v = _g.variant, _s = _g.size, _d = _g.disabled, _c = _g.clickable, htmlProps = __rest(_g, ["variant", "size", "disabled", "clickable"]);
    var handleClick = function () {
        if (onClick && !disabled) {
            onClick();
        }
    };
    var handleKeyDown = function (event) {
        if (isClickable && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            handleClick();
        }
    };
    return (<StyledChip variant={normalizedVariant} size={size} disabled={disabled} clickable={isClickable} onClick={isClickable ? handleClick : undefined} onKeyDown={isClickable ? handleKeyDown : undefined} tabIndex={isClickable ? 0 : undefined} role={role || (isClickable ? 'button' : undefined)} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-disabled={disabled ? 'true' : undefined} data-testid={dataTestId} {...htmlProps}>
      {content}
    </StyledChip>);
};
// Legacy component for backward compatibility
export var LegacyChip = function (_a) {
    var title = _a.title, _b = _a.variant, variant = _b === void 0 ? 'light' : _b;
    // Map legacy variants to new variants
    var newVariant = variant === 'dark' ? 'emphasis' : 'default';
    return (<Chip variant={newVariant}>
      {title}
    </Chip>);
};
var templateObject_1;
//# sourceMappingURL=Chip.jsx.map