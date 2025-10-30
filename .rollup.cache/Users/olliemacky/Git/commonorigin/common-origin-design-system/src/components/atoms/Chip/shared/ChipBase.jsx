import { __assign, __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '../../../../styles/tokens.json';
import { getVariantStylesAsObject, getSizeStylesAsObject, chipTokens } from './utils';
// Base styled component using CSS variables to avoid prop leaking
export var BaseChipStyled = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: 12px;\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: width ", ";\n  \n  /* Use CSS custom properties set by wrapper */\n  background-color: var(--chip-bg-color);\n  color: var(--chip-text-color);\n  font: var(--chip-font);\n  padding: var(--chip-padding);\n  opacity: var(--chip-opacity, 1);\n  cursor: var(--chip-cursor, default);\n  \n  &:hover {\n    opacity: var(--chip-hover-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:active {\n    opacity: var(--chip-active-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  height: max-content;\n  border-radius: 12px;\n  box-sizing: border-box;\n  user-select: none;\n  white-space: nowrap;\n  transition: width ", ";\n  \n  /* Use CSS custom properties set by wrapper */\n  background-color: var(--chip-bg-color);\n  color: var(--chip-text-color);\n  font: var(--chip-font);\n  padding: var(--chip-padding);\n  opacity: var(--chip-opacity, 1);\n  cursor: var(--chip-cursor, default);\n  \n  &:hover {\n    opacity: var(--chip-hover-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:active {\n    opacity: var(--chip-active-opacity, var(--chip-opacity, 1));\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"
    // Icon container for selected indicator or leading icons
])), tokens.semantic.motion.interactive, chipTokens.variants.interactive.backgroundColor);
// Icon container for selected indicator or leading icons
export var IconContainer = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  margin-right: ", ";\n"], ["\n  display: inline-flex;\n  align-items: center;\n  margin-right: ", ";\n"
    // Close button for dismissible chips
])), tokens.semantic.spacing.layout.sm);
// Close button for dismissible chips
export var CloseButton = styled.button.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: ", ";\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: ", ";\n  opacity: ", ";\n  color: inherit;\n  transition: ", ";\n  \n  &:hover:not(:disabled) {\n    opacity: 0.7;\n  }\n  \n  &:active:not(:disabled) {\n    opacity: 0.9;\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n    border-radius: 2px;\n  }\n"], ["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: ", ";\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: ", ";\n  opacity: ", ";\n  color: inherit;\n  transition: ", ";\n  \n  &:hover:not(:disabled) {\n    opacity: 0.7;\n  }\n  \n  &:active:not(:disabled) {\n    opacity: 0.9;\n  }\n  \n  &:focus-visible {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n    border-radius: 2px;\n  }\n"
    // Wrapper component that applies styles via CSS custom properties
])), tokens.semantic.spacing.layout.sm, function (props) { return props.$disabled ? 'not-allowed' : 'pointer'; }, function (props) { return props.$disabled ? '0.6' : '1'; }, tokens.semantic.motion.transition.fast, chipTokens.variants.interactive.backgroundColor);
// Wrapper component that applies styles via CSS custom properties
export var StyledChipWrapper = function (_a) {
    var $variant = _a.$variant, $size = _a.$size, $disabled = _a.$disabled, $clickable = _a.$clickable, $selected = _a.$selected, children = _a.children, style = _a.style, htmlProps = __rest(_a, ["$variant", "$size", "$disabled", "$clickable", "$selected", "children", "style"]);
    // Get styles for variant and size
    var variantStyles = getVariantStylesAsObject($variant, $selected);
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
    return (<BaseChipStyled style={__assign(__assign({}, cssProps), style)} {...htmlProps}>
      {children}
    </BaseChipStyled>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=ChipBase.jsx.map