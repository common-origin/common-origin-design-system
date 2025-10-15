import { __makeTemplateObject } from "tslib";
import React from 'react';
import { parseISO, format } from 'date-fns';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var _a = tokens.semantic, typography = _a.typography, color = _a.color;
var TimeStyled = styled.time(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n"])), typography.label, color.text.subdued);
export var DateFormatter = function (_a) {
    var dateString = _a.dateString, _b = _a.formatString, formatString = _b === void 0 ? 'yyyy' : _b;
    var date = parseISO(dateString);
    return (<TimeStyled dateTime={dateString}>
      {format(date, formatString)}
    </TimeStyled>);
};
var templateObject_1;
//# sourceMappingURL=dateFormatter.jsx.map