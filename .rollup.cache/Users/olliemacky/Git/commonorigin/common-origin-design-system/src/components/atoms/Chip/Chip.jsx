import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var chip = tokens.component.chip;
// Helper functions to get styles as objects for CSS custom properties
var getVariantStylesAsObject = function (variant) {
    switch (variant) {
        case 'emphasis':
            return {
                backgroundColor: chip.variants.emphasis.backgroundColor,
                color: chip.variants.emphasis.textColor
            };
        case 'subtle':
            return {
                backgroundColor: chip.variants.subtle.backgroundColor,
                color: chip.variants.subtle.textColor
            };
        case 'interactive':
            return {
                backgroundColor: chip.variants.interactive.backgroundColor,
                color: chip.variants.interactive.textColor
            };
        case 'default':
        default:
            return {
                backgroundColor: chip.default.backgroundColor,
                color: chip.default.textColor
            };
    }
};
var getSizeStylesAsObject = function (size) {
    switch (size) {
        case 'small':
            return {
                font: chip.sizes.small.font,
                padding: chip.sizes.small.padding
            };
        case 'large':
            return {
                font: chip.sizes.large.font,
                padding: chip.sizes.large.padding
            };
        case 'medium':
        default:
            return {
                font: chip.sizes.medium.font,
                padding: chip.sizes.medium.padding
            };
    }
};
// Base styled component using CSS variables to avoid prop leaking
var BaseChip = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: ", ";\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: ", ";\n  \n  /* Use CSS custom properties set by wrapper */\n  background-color: var(--chip-bg-color);\n  color: var(--chip-text-color);\n  font: var(--chip-font);\n  padding: var(--chip-padding);\n  opacity: var(--chip-opacity, 1);\n  cursor: var(--chip-cursor, default);\n  \n  &:hover {\n    opacity: var(--chip-hover-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:active {\n    opacity: var(--chip-active-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: ", ";\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: ", ";\n  \n  /* Use CSS custom properties set by wrapper */\n  background-color: var(--chip-bg-color);\n  color: var(--chip-text-color);\n  font: var(--chip-font);\n  padding: var(--chip-padding);\n  opacity: var(--chip-opacity, 1);\n  cursor: var(--chip-cursor, default);\n  \n  &:hover {\n    opacity: var(--chip-hover-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:active {\n    opacity: var(--chip-active-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"
    // Wrapper component that applies styles via CSS custom properties
])), chip.default.borderRadius, tokens.semantic.motion.interactive, chip.variants.interactive.backgroundColor);
// Wrapper component that applies styles via CSS custom properties
var StyledChip = function (_a) {
    var $variant = _a.$variant, $size = _a.$size, $disabled = _a.$disabled, $clickable = _a.$clickable, children = _a.children, style = _a.style, htmlProps = __rest(_a, ["$variant", "$size", "$disabled", "$clickable", "children", "style"]);
    // Get styles for variant and size
    var variantStyles = getVariantStylesAsObject($variant);
    var sizeStyles = getSizeStylesAsObject($size);
    // Create CSS custom properties object
    var cssProps = {
        '--chip-bg-color': variantStyles.backgroundColor,
        '--chip-text-color': variantStyles.color,
        '--chip-font': sizeStyles.font,
        '--chip-padding': sizeStyles.padding,
        '--chip-opacity': $disabled ? '0.6' : '1',
        '--chip-cursor': $disabled ? 'not-allowed' : ($clickable ? 'pointer' : 'default'),
        '--chip-hover-opacity': $disabled ? '0.6' : ($clickable ? '0.8' : '1'),
        '--chip-active-opacity': $disabled ? '0.6' : ($clickable ? '0.9' : '1')
    };
    return (<BaseChip style={__assign(__assign({}, cssProps), style)} {...htmlProps}>
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
    return (<StyledChip $variant={normalizedVariant} $size={size} $disabled={disabled || undefined} $clickable={isClickable || undefined} onClick={isClickable ? handleClick : undefined} onKeyDown={isClickable ? handleKeyDown : undefined} tabIndex={isClickable ? 0 : undefined} role={role || (isClickable ? 'button' : undefined)} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-disabled={disabled ? 'true' : undefined} data-testid={dataTestId} {...htmlProps}>
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