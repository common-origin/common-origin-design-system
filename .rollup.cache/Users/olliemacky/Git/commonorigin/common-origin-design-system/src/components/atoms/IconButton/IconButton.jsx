import { __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import tokens from '@/styles/tokens.json';
var motion = tokens.semantic.motion, iconButton = tokens.component.iconButton;
var IconButtonStyled = styled.button.withConfig({
    shouldForwardProp: function (prop) { return !['$variant', '$size'].includes(prop); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  border: none;\n  border-radius: ", ";\n  transition: ", ";\n  box-sizing: border-box;\n  display: ", ";\n  justify-content: ", ";\n  align-items: ", ";\n  height: max-content;\n  cursor: pointer;\n  position: relative;\n\n  /* Size-specific dimensions from component tokens */\n  min-width: ", ";\n  min-height: ", ";\n  padding: ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  &:active {\n    background-color: ", ";\n  }\n\n  &:focus {\n    outline: ", ";\n    outline-offset: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    cursor: not-allowed;\n  }\n\n  /* High contrast mode support */\n  @media (prefers-contrast: high) {\n    border: 1px solid;\n  }\n\n  /* Reduced motion support */\n  @media (prefers-reduced-motion: reduce) {\n    transition: none;\n  }\n"], ["\n  background-color: ", ";\n  border: none;\n  border-radius: ", ";\n  transition: ", ";\n  box-sizing: border-box;\n  display: ", ";\n  justify-content: ", ";\n  align-items: ", ";\n  height: max-content;\n  cursor: pointer;\n  position: relative;\n\n  /* Size-specific dimensions from component tokens */\n  min-width: ", ";\n  min-height: ", ";\n  padding: ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  &:active {\n    background-color: ", ";\n  }\n\n  &:focus {\n    outline: ", ";\n    outline-offset: ", ";\n  }\n\n  &:disabled {\n    background-color: ", ";\n    cursor: not-allowed;\n  }\n\n  /* High contrast mode support */\n  @media (prefers-contrast: high) {\n    border: 1px solid;\n  }\n\n  /* Reduced motion support */\n  @media (prefers-reduced-motion: reduce) {\n    transition: none;\n  }\n"])), function (_a) {
    var $variant = _a.$variant;
    switch ($variant) {
        case 'primary':
            return iconButton.primary.backgroundColor;
        case 'secondary':
            return iconButton.variants.secondary.backgroundColor;
        case 'naked':
            return iconButton.variants.naked.backgroundColor;
        default:
            return iconButton.primary.backgroundColor;
    }
}, iconButton.primary.borderRadius, motion.transition.normal, iconButton.primary.display, iconButton.primary.justifyContent, iconButton.primary.alignItems, function (_a) {
    var $size = _a.$size;
    return iconButton.sizes[$size].minWidth;
}, function (_a) {
    var $size = _a.$size;
    return iconButton.sizes[$size].minHeight;
}, function (_a) {
    var $size = _a.$size;
    return iconButton.sizes[$size].padding;
}, function (_a) {
    var $variant = _a.$variant;
    switch ($variant) {
        case 'primary':
            return iconButton.hover.backgroundColor;
        case 'secondary':
            return iconButton.variants.secondary.hover.backgroundColor;
        case 'naked':
            return iconButton.variants.naked.hover.backgroundColor;
        default:
            return iconButton.hover.backgroundColor;
    }
}, iconButton.active.backgroundColor, iconButton.focus.outline, iconButton.focus.outlineOffset, iconButton.disabled.backgroundColor);
export var IconButton = function (_a) {
    var variant = _a.variant, _b = _a.size, size = _b === void 0 ? 'medium' : _b, url = _a.url, _c = _a.iconName, iconName = _c === void 0 ? 'close' : _c, onClick = _a.onClick, ariaLabel = _a["aria-label"], ariaDescribedBy = _a["aria-describedby"], ariaExpanded = _a["aria-expanded"], ariaPressed = _a["aria-pressed"], dataTestId = _a["data-testid"], disabled = _a.disabled, _d = _a.type, type = _d === void 0 ? 'button' : _d, htmlProps = __rest(_a, ["variant", "size", "url", "iconName", "onClick", 'aria-label', 'aria-describedby', 'aria-expanded', 'aria-pressed', 'data-testid', "disabled", "type"]);
    var handleClick = function (event) {
        // Prevent default if disabled
        if (disabled) {
            event.preventDefault();
            return;
        }
        if (onClick) {
            onClick();
        }
        else if (url && url.trim() !== '') {
            // Use proper navigation instead of direct href assignment
            if (url.startsWith('http') || url.startsWith('//')) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
            else {
                window.location.assign(url);
            }
        }
    };
    var handleKeyDown = function (event) {
        // Handle keyboard activation (Enter and Space)
        if (disabled)
            return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick(event);
        }
    };
    var iconSize = size === 'large' ? 'lg' : size === 'small' ? 'sm' : 'md';
    var getIconColor = function (variant) {
        switch (variant) {
            case 'primary':
                return 'inverse';
            case 'secondary':
                return 'default';
            case 'naked':
                return 'default';
            default:
                return 'default';
        }
    };
    return (<IconButtonStyled $variant={variant} $size={size} onClick={handleClick} onKeyDown={handleKeyDown} disabled={disabled} type={type} role="button" aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-expanded={ariaExpanded} aria-pressed={ariaPressed} aria-disabled={disabled} tabIndex={disabled ? -1 : 0} data-testid={dataTestId} {...htmlProps}>
      <Icon name={iconName} size={iconSize} iconColor={getIconColor(variant)} aria-hidden="true" // Hide icon from screen readers since button has aria-label
    />
    </IconButtonStyled>);
};
var templateObject_1;
//# sourceMappingURL=IconButton.jsx.map