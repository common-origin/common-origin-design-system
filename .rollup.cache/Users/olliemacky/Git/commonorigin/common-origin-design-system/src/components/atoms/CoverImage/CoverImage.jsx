import { __makeTemplateObject } from "tslib";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
import { media } from '../../../lib/styleUtils';
var base = tokens.base;
var CoverImageWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: 0 auto;\n  \n  ", " {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"], ["\n  margin: 0 auto;\n  \n  ", " {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"])), media.sm);
var ImageLink = styled(Link)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  display: block;\n  transition: opacity ", " ", ";\n  \n  &:hover {\n    opacity: 0.8;\n  }\n"])), base.duration.normal, base.easing.easeInOut);
var StyledImage = styled(Image)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n  border-radius: ", ";\n"], ["\n  width: 100%;\n  height: auto;\n  border-radius: ", ";\n"])), base.border.radius[2]);
export var CoverImage = function (_a) {
    var title = _a.title, src = _a.src, slug = _a.slug, _b = _a.width, width = _b === void 0 ? 1300 : _b, _c = _a.height, height = _c === void 0 ? 630 : _c, dataTestId = _a["data-testid"];
    var image = (<StyledImage src={src} alt={"Cover Image for ".concat(title)} width={width} height={height} placeholder="blur" blurDataURL={src} priority={!!slug}/>);
    return (<CoverImageWrapper data-testid={dataTestId}>
      {slug ? (<ImageLink href={"/posts/".concat(slug)} aria-label={"Read more about ".concat(title)}>
          {image}
        </ImageLink>) : (image)}
    </CoverImageWrapper>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CoverImage.jsx.map