import { __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
import { Icon } from '../Icon';
var button = tokens.component.button, semantic = tokens.semantic;
// Base styles shared between button and link
var baseButtonStyles = "\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: ".concat(tokens.semantic.spacing.layout.xs, ";\n  height: max-content;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: ").concat(semantic.motion.hover, ";\n  white-space: nowrap;\n  user-select: none;\n  \n  &:focus {\n    outline: ").concat(button.focus.outline, ";\n    outline-offset: ").concat(button.focus.outlineOffset, ";\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n");
// Dynamic variant styles using component tokens
var getVariantStyles = function (_a) {
    var $variant = _a.$variant;
    return "\n  background-color: ".concat($variant === 'primary'
        ? button.primary.backgroundColor
        : $variant === 'secondary'
            ? button.variants.secondary.backgroundColor
            : button.variants.naked.backgroundColor, ";\n  color: ").concat($variant === 'primary'
        ? button.primary.textColor
        : $variant === 'secondary'
            ? button.variants.secondary.textColor
            : button.variants.naked.textColor, ";\n  \n  &:hover:not(:disabled) {\n    background-color: ").concat($variant === 'primary'
        ? button.hover.backgroundColor
        : $variant === 'secondary'
            ? button.variants.secondary.hover.backgroundColor
            : button.variants.naked.hover.backgroundColor, ";\n  }\n\n  &:active:not(:disabled) {\n    background-color: ").concat($variant === 'primary'
        ? button.active.backgroundColor
        : $variant === 'secondary'
            ? button.variants.secondary.active.backgroundColor
            : button.variants.naked.active.backgroundColor, ";\n  }\n\n  &:disabled {\n    background-color: ").concat($variant === 'primary'
        ? button.disabled.backgroundColor
        : $variant === 'secondary'
            ? button.variants.secondary.disabled.backgroundColor
            : button.variants.naked.disabled.backgroundColor, ";\n    color: ").concat($variant === 'primary'
        ? button.disabled.textColor
        : $variant === 'secondary'
            ? button.variants.secondary.disabled.textColor
            : button.variants.naked.disabled.textColor, ";\n  }\n");
};
// Dynamic size styles using component tokens
var getSizeStyles = function (_a) {
    var $size = _a.$size;
    switch ($size) {
        case 'small':
            return "\n        font: ".concat(button.sizes.small.font, ";\n        padding: ").concat(button.sizes.small.padding, ";\n      ");
        case 'medium':
            return "\n        font: ".concat(button.sizes.medium.font, ";\n        padding: ").concat(button.sizes.medium.padding, ";\n      ");
        case 'large':
            return "\n        font: ".concat(button.sizes.large.font, ";\n        padding: ").concat(button.sizes.large.padding, ";\n      ");
        default:
            return "\n        font: ".concat(button.sizes.large.font, ";\n        padding: ").concat(button.sizes.large.padding, ";\n      ");
    }
};
var StyledButton = styled.button.withConfig({
    shouldForwardProp: function (prop) { return !['$variant', '$size'].includes(prop); },
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n  border-radius: ", ";\n  \n  ", "\n  ", "\n"], ["\n  ", "\n  border-radius: ", ";\n  \n  ", "\n  ", "\n"])), baseButtonStyles, button.primary.borderRadius, getVariantStyles, getSizeStyles);
var StyledLink = styled.a.withConfig({
    shouldForwardProp: function (prop) { return !['$variant', '$size'].includes(prop); },
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  border-radius: ", ";\n  \n  ", "\n  ", "\n"], ["\n  ", "\n  border-radius: ", ";\n  \n  ", "\n  ", "\n"
    // Helper function to get icon size based on button size
])), baseButtonStyles, button.primary.borderRadius, getVariantStyles, getSizeStyles);
// Helper function to get icon size based on button size
var getIconSize = function (buttonSize) {
    switch (buttonSize) {
        case 'small':
            return 'xs';
        case 'medium':
            return 'sm';
        case 'large':
            return 'md';
        default:
            return 'md';
    }
};
// Helper function to render button content with optional icon
var renderButtonContent = function (children, iconName, size) {
    if (!iconName)
        return children;
    var iconSize = getIconSize(size);
    return (<>
      <Icon name={iconName} size={iconSize} iconColor="inherit"/>
      {children}
    </>);
};
export var Button = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.size, size = _c === void 0 ? "large" : _c, url = _a.url, _d = _a.purpose, purpose = _d === void 0 ? 'button' : _d, children = _a.children, target = _a.target, iconName = _a.iconName, dataTestId = _a["data-testid"], rest = __rest(_a, ["variant", "size", "url", "purpose", "children", "target", "iconName", 'data-testid']);
    // For internal links, use Next.js Link
    if (purpose === 'link' && url && !url.startsWith('http') && !target) {
        var linkProps = rest;
        return (<Link href={url} passHref legacyBehavior>
        <StyledLink $variant={variant} $size={size} data-testid={dataTestId} {...linkProps}>
          {renderButtonContent(children, iconName, size)}
        </StyledLink>
      </Link>);
    }
    // For external links or links with target
    if (purpose === 'link' && url) {
        var linkProps = rest;
        return (<StyledLink href={url} target={target} $variant={variant} $size={size} data-testid={dataTestId} {...linkProps}>
        {renderButtonContent(children, iconName, size)}
      </StyledLink>);
    }
    // For button with URL (legacy support)
    if (purpose === 'button' && url) {
        var buttonProps_1 = rest;
        var handleClick = function (e) {
            // Call any existing onClick handler first
            if (buttonProps_1.onClick) {
                buttonProps_1.onClick(e);
            }
            // Handle navigation
            if (url.startsWith('http') || target) {
                window.open(url, target || '_self');
            }
            else {
                window.location.href = url;
            }
        };
        return (<StyledButton {...buttonProps_1} $variant={variant} $size={size} data-testid={dataTestId} onClick={handleClick}>
        {renderButtonContent(children, iconName, size)}
      </StyledButton>);
    }
    // Regular button
    var buttonProps = rest;
    return (<StyledButton $variant={variant} $size={size} data-testid={dataTestId} {...buttonProps}>
      {renderButtonContent(children, iconName, size)}
    </StyledButton>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=Button.jsx.map