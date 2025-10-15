import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Grid } from '../layout/GridSystem';
import tokens from '@/styles/tokens.json';
var spacing = tokens.semantic.spacing;
var DesignGridContainer = styled(Grid)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  gap: ", ";\n  margin: ", " 0;\n"], ["\n  gap: ", ";\n  margin: ", " 0;\n"])), spacing.layout.lg, spacing.layout.lg);
export var DesignGrid = function (_a) {
    var children = _a.children, testId = _a["data-testid"];
    return (<DesignGridContainer data-testid={testId}>
      {children}
    </DesignGridContainer>);
};
var templateObject_1;
//# sourceMappingURL=DesignGrid.jsx.map