import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Typography } from './';
import tokens from '@/styles/tokens.json';
var spacing = tokens.base.spacing;
var IntroSection = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: ", ") {\n    flex-direction: row;\n    justify-content: space-between;\n    margin-bottom: ", ";\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-top: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: ", ") {\n    flex-direction: row;\n    justify-content: space-between;\n    margin-bottom: ", ";\n  }\n"])), spacing[32], spacing[32], tokens.base.breakpoint.md, spacing[24]);
export var Intro = function () {
    return (<IntroSection>
      <Typography variant="h1">
        Common Origin
      </Typography>
    </IntroSection>);
};
var templateObject_1;
//# sourceMappingURL=intro.jsx.map