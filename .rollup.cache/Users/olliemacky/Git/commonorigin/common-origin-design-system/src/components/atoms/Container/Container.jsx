import { __makeTemplateObject, __rest } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { media } from '../../../lib/styleUtils';
import tokens from '@/styles/tokens.json';
var spacing = tokens.semantic.spacing;
var StyledContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: ", ";\n  padding-right: ", ";\n  \n  ", " {\n    max-width: 640px;\n  }\n  \n  ", " {\n    max-width: 768px;\n  }\n  \n  ", " {\n    max-width: 1024px;\n  }\n  \n  ", " {\n    max-width: 1280px;\n  }\n  \n  ", " {\n    max-width: 1536px;\n  }\n"], ["\n  width: 100%;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: ", ";\n  padding-right: ", ";\n  \n  ", " {\n    max-width: 640px;\n  }\n  \n  ", " {\n    max-width: 768px;\n  }\n  \n  ", " {\n    max-width: 1024px;\n  }\n  \n  ", " {\n    max-width: 1280px;\n  }\n  \n  ", " {\n    max-width: 1536px;\n  }\n"])), spacing.layout['2xl'], spacing.layout['2xl'], media.sm, media.md, media.lg, media.xl, media['2xl']);
export var Container = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return <StyledContainer {...props}>{children}</StyledContainer>;
};
var templateObject_1;
//# sourceMappingURL=Container.jsx.map