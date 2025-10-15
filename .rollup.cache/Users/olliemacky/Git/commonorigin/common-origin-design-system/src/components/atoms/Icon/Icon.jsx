import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
import iconsData from '@/styles/icons.json';
var IconStyled = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n  \n  svg {\n    width: 100%;\n    height: 100%;\n    display: block;\n  }\n  \n  /* Use semantic icon colors */\n  color: ", ";\n"], ["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n  \n  svg {\n    width: 100%;\n    height: 100%;\n    display: block;\n  }\n  \n  /* Use semantic icon colors */\n  color: ", ";\n"])), function (_a) {
    var $size = _a.$size;
    return tokens.semantic.size.icon[$size];
}, function (_a) {
    var $size = _a.$size;
    return tokens.semantic.size.icon[$size];
}, function (_a) {
    var $iconColor = _a.$iconColor;
    switch ($iconColor) {
        case 'default':
            return tokens.semantic.color.icon.default;
        case 'emphasis':
            return tokens.semantic.color.icon.emphasis;
        case 'subdued':
            return tokens.semantic.color.icon.subdued;
        case 'disabled':
            return tokens.semantic.color.icon.disabled;
        case 'inverse':
            return tokens.semantic.color.icon.inverse;
        case 'interactive':
            return tokens.semantic.color.icon.interactive;
        case 'error':
            return tokens.semantic.color.icon.error;
        case 'success':
            return tokens.semantic.color.icon.success;
        case 'warning':
            return tokens.semantic.color.icon.warning;
        case 'inherit':
            return 'currentColor';
        default:
            return tokens.semantic.color.icon.default;
    }
});
export var Icon = function (_a) {
    var name = _a.name, _b = _a.size, size = _b === void 0 ? 'lg' : _b, _c = _a.iconColor, iconColor = _c === void 0 ? 'default' : _c, dataTestId = _a["data-testid"];
    // Get the icon data from the JSON file
    var iconData = iconsData[name];
    if (!iconData) {
        console.warn("Icon \"".concat(name, "\" not found in icons.json"));
        return <IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId}/>;
    }
    return (<IconStyled $size={size} $iconColor={iconColor} data-testid={dataTestId}>
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={iconData.name}>
        <path d={iconData.path}/>
      </svg>
    </IconStyled>);
};
export default Icon;
var templateObject_1;
//# sourceMappingURL=Icon.jsx.map