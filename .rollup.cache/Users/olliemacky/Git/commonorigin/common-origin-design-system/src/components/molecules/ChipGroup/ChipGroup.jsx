import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Chip, Stack } from '@/components/atoms';
var ChipGroupWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  > div {\n    display: flex;\n    flex-wrap: wrap;\n  }\n"], ["\n  > div {\n    display: flex;\n    flex-wrap: wrap;\n  }\n"])));
export var ChipGroup = function (_a) {
    var labels = _a.labels, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, dataTestId = _a["data-testid"];
    return (<ChipGroupWrapper data-testid={dataTestId}>
      <Stack direction="row" gap="sm">
        {labels && labels.map(function (title, index) { return (<Chip key={index} title={title} variant={variant}/>); })}
      </Stack>
    </ChipGroupWrapper>);
};
var templateObject_1;
//# sourceMappingURL=ChipGroup.jsx.map