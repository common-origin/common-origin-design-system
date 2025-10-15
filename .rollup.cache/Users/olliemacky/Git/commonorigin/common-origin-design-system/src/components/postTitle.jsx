import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Typography } from './';
import tokens from '../styles/tokens.json';
var spacing = tokens.base.spacing;
var TitleWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: ", " 0;\n"], ["\n  margin: ", " 0;\n"])), spacing[8]);
export var PostTitle = function (_a) {
    var children = _a.children;
    return (<TitleWrapper>
      <Typography variant="h1">
        {children}
      </Typography>
    </TitleWrapper>);
};
var templateObject_1;
//# sourceMappingURL=postTitle.jsx.map