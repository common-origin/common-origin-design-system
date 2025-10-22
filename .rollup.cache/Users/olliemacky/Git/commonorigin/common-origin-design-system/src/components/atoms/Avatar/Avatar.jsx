import { __makeTemplateObject, __rest } from "tslib";
import React, { useState } from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var AvatarContainer = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  overflow: hidden;\n  flex-shrink: 0;\n"], ["\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: ", ";\n  height: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  overflow: hidden;\n  flex-shrink: 0;\n"])), function (_a) {
    var $size = _a.$size;
    return tokens.semantic.size.avatar[$size];
}, function (_a) {
    var $size = _a.$size;
    return tokens.semantic.size.avatar[$size];
}, tokens.base.border.radius.circle, tokens.semantic.color.background.subtle);
var AvatarImage = styled.img.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: ", ";\n  /* Remove the img role since the container already has role=\"img\" */\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  border-radius: ", ";\n  /* Remove the img role since the container already has role=\"img\" */\n"])), tokens.base.border.radius.circle);
var AvatarInitials = styled.span.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  color: ", ";\n  line-height: 1;\n  text-transform: uppercase;\n  user-select: none;\n"], ["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  color: ", ";\n  line-height: 1;\n  text-transform: uppercase;\n  user-select: none;\n"
    // Helper function to get initials from name
])), tokens.base.fontFamily.body, tokens.base.fontWeight[3], function (_a) {
    var $size = _a.$size;
    var sizeMap = {
        xs: tokens.base.fontSize[1],
        sm: tokens.base.fontSize[2],
        md: tokens.base.fontSize[3],
        lg: tokens.base.fontSize[4],
        xl: tokens.base.fontSize[5]
    };
    return sizeMap[$size];
}, tokens.semantic.color.text.default);
// Helper function to get initials from name
var getInitials = function (name) {
    return name
        .split(' ')
        .map(function (word) { return word.charAt(0); })
        .join('')
        .slice(0, 2)
        .toUpperCase();
};
export var Avatar = function (_a) {
    var name = _a.name, picture = _a.picture, _b = _a.size, size = _b === void 0 ? 'md' : _b, dataTestId = _a["data-testid"], props = __rest(_a, ["name", "picture", "size", 'data-testid']);
    // Remove styled-only props from the rest
    var _c = props, $size = _c.$size, htmlProps = __rest(_c, ["$size"]);
    var _d = useState(false), imageError = _d[0], setImageError = _d[1];
    var _e = useState(false), imageLoaded = _e[0], setImageLoaded = _e[1];
    var handleImageError = function () {
        setImageError(true);
    };
    var handleImageLoad = function () {
        setImageLoaded(true);
    };
    var showImage = picture && !imageError;
    var initials = getInitials(name);
    return (<AvatarContainer $size={size} data-testid={dataTestId} data-size={size} role="img" aria-label={"Avatar for ".concat(name)} {...htmlProps}>
      {showImage ? (<AvatarImage $size={size} src={picture} alt={"Avatar of ".concat(name)} onError={handleImageError} onLoad={handleImageLoad} data-state={imageLoaded ? 'loaded' : 'loading'}/>) : (<AvatarInitials $size={size} data-initials={initials} aria-hidden="true">
          {initials}
        </AvatarInitials>)}
    </AvatarContainer>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Avatar.jsx.map