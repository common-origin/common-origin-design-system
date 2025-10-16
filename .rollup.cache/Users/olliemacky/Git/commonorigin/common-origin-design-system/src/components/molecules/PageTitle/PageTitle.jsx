import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { IconButton } from '../../atoms/IconButton';
import { Stack } from '../../atoms/Stack';
import { Typography } from '../../atoms/Typography';
import tokens from '@/styles/tokens.json';
var PageTitleStyled = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !['$hasBackButton'].includes(prop); },
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  margin-top: ", ";\n"], ["\n  margin-bottom: ", ";\n  margin-top: ", ";\n"])), tokens.base.spacing[6], function (_a) {
    var $hasBackButton = _a.$hasBackButton;
    return $hasBackButton ? tokens.base.spacing[0] : tokens.base.spacing[12];
});
export var PageTitle = function (_a) {
    var title = _a.title, _b = _a.hasBackButton, hasBackButton = _b === void 0 ? false : _b, subtitle = _a.subtitle;
    return (<PageTitleStyled $hasBackButton={hasBackButton}>
      {hasBackButton && <IconButton iconName='back' size='large' variant='naked' url='/music' aria-label='Go back to music page'/>}
      <Stack direction='column' gap="md">
        <Typography variant="h1">{title}</Typography>
        {subtitle && <Typography variant='caption' color='subdued'>{subtitle}</Typography>}
      </Stack>
    </PageTitleStyled>);
};
var templateObject_1;
//# sourceMappingURL=PageTitle.jsx.map