import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '../../../styles/tokens.json';
var ProgressBarContainer = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n\n  ", "\n\n  ", "\n"], ["\n  background-color: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n\n  ", "\n\n  ", "\n"])), tokens.semantic.color.background.disabled, tokens.base.border.radius[1], function (props) { return props.$variant === 'horizontal' && css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    width: 100%;\n    height: ", ";\n  "], ["\n    width: 100%;\n    height: ", ";\n  "])), props.$height ? tokens.component.progressBar.sizes[props.$height].height : tokens.component.progressBar.sizes.md.height); }, function (props) { return props.$variant === 'vertical' && css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: ", ";\n    height: 100%;\n  "], ["\n    width: ", ";\n    height: 100%;\n  "])), props.$width ? tokens.component.progressBar.sizes[props.$width].height : tokens.component.progressBar.sizes.md.height); });
var ProgressBarFill = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !prop.startsWith('$'); }
})(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 100%;\n  transition: ", ";\n\n  ", "\n\n  ", "\n\n  ", "\n"], ["\n  height: 100%;\n  transition: ", ";\n\n  ", "\n\n  ", "\n\n  ", "\n"])), tokens.semantic.motion.transition.normal, function (props) {
    var backgroundColor;
    switch (props.$color) {
        case 'success':
            backgroundColor = tokens.semantic.color.background.success;
            break;
        case 'error':
            backgroundColor = tokens.semantic.color.background.error;
            break;
        case 'default':
        default:
            backgroundColor = tokens.semantic.color.background.interactive;
            break;
    }
    return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["background-color: ", ";"], ["background-color: ", ";"])), backgroundColor);
}, function (props) { return props.$variant === 'horizontal' && css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    width: ", "%;\n  "], ["\n    width: ", "%;\n  "])), Math.min(100, Math.max(0, props.$value))); }, function (props) { return props.$variant === 'vertical' && css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    width: 100%;\n    height: ", "%;\n  "], ["\n    width: 100%;\n    height: ", "%;\n  "])), Math.min(100, Math.max(0, props.$value))); });
export var ProgressBar = function (_a) {
    var value = _a.value, _b = _a.variant, variant = _b === void 0 ? 'horizontal' : _b, _c = _a.color, color = _c === void 0 ? 'default' : _c, height = _a.height, width = _a.width, dataTestId = _a["data-testid"];
    return (<ProgressBarContainer $variant={variant} $height={height} $width={width} data-testid={dataTestId} role="progressbar" aria-valuenow={Math.min(100, Math.max(0, value))} aria-valuemin={0} aria-valuemax={100}>
      <ProgressBarFill $value={value} $variant={variant} $color={color}/>
    </ProgressBarContainer>);
};
export default ProgressBar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=ProgressBar.jsx.map