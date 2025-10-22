import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
import { media } from '../../../lib/styleUtils';
var base = tokens.base;
var PictureWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0 auto;\n  \n  ", " {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"], ["\n  margin: 0 auto;\n  \n  ", " {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"])), media.sm);
var ImageLink = styled.a(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  cursor: pointer;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: block;\n  cursor: pointer;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"])), base.duration.normal, base.easing.easeInOut);
var ImageButton = styled.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border: none;\n  background: none;\n  padding: 0;\n  cursor: pointer;\n  display: block;\n  width: 100%;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  border: none;\n  background: none;\n  padding: 0;\n  cursor: pointer;\n  display: block;\n  width: 100%;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"])), base.duration.normal, base.easing.easeInOut);
var StyledImage = styled.img(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n  border-radius: ", ";\n  display: block;\n"], ["\n  width: 100%;\n  height: auto;\n  border-radius: ", ";\n  display: block;\n"])), base.border.radius[2]);
export var Picture = function (_a) {
    var title = _a.title, src = _a.src, _b = _a.width, width = _b === void 0 ? 1300 : _b, _c = _a.height, height = _c === void 0 ? 630 : _c, onClick = _a.onClick, href = _a.href, dataTestId = _a["data-testid"];
    var image = (<StyledImage src={src} alt={"Cover Image for ".concat(title)} width={width} height={height}/>);
    return (<PictureWrapper data-testid={dataTestId}>
      {href ? (<ImageLink href={href} aria-label={"Read more about ".concat(title)}>
          {image}
        </ImageLink>) : onClick ? (<ImageButton onClick={onClick} aria-label={"Read more about ".concat(title)}>
          {image}
        </ImageButton>) : (image)}
    </PictureWrapper>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Picture.jsx.map