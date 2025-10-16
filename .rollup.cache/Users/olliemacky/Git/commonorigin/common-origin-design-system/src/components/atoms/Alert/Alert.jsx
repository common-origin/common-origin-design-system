import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { EXAMPLE_PATH } from '../../../lib/constants';
import { Container } from '../..';
import tokens from '@/styles/tokens.json';
var base = tokens.base, semantic = tokens.semantic;
var AlertWrapper = styled.div.withConfig({
    shouldForwardProp: function (prop) { return !['$preview'].includes(prop); },
})(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-bottom: ", ";\n  background-color: ", ";\n  border-bottom-color: ", ";\n  color: ", ";\n"], ["\n  border-bottom: ", ";\n  background-color: ", ";\n  border-bottom-color: ", ";\n  color: ", ";\n"])), semantic.border.default, function (_a) {
    var $preview = _a.$preview;
    return $preview ? semantic.color.background.emphasis : semantic.color.background.default;
}, function (_a) {
    var $preview = _a.$preview;
    return $preview ? semantic.color.border.strong : semantic.color.border.default;
}, function (_a) {
    var $preview = _a.$preview;
    return $preview ? semantic.color.text.inverse : semantic.color.text.default;
});
var AlertContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: ", " 0;\n  text-align: center;\n  font: ", ";\n"], ["\n  padding: ", " 0;\n  text-align: center;\n  font: ", ";\n"])), base.spacing[2], semantic.typography.small);
var AlertLink = styled.a.withConfig({
    shouldForwardProp: function (prop) { return !['$preview'].includes(prop); },
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-decoration: underline;\n  color: inherit;\n  transition: color ", " ", ";\n\n  &:hover {\n    color: ", ";\n  }\n\n  &:focus {\n    outline: ", ";\n    outline-offset: ", ";\n  }\n"], ["\n  text-decoration: underline;\n  color: inherit;\n  transition: color ", " ", ";\n\n  &:hover {\n    color: ", ";\n  }\n\n  &:focus {\n    outline: ", ";\n    outline-offset: ", ";\n  }\n"])), base.duration.fast, base.easing.ease, function (_a) {
    var $preview = _a.$preview;
    return $preview ? semantic.color.text.inverse : semantic.color.text.interactive;
}, semantic.border.focus, base.spacing[1]);
export var Alert = function (_a) {
    var _b = _a.preview, preview = _b === void 0 ? false : _b, dataTestId = _a["data-testid"];
    return (<AlertWrapper $preview={preview} data-testid={dataTestId}>
      <Container>
        <AlertContent>
          {preview ? (<>
              This page is a preview.{' '}
              <AlertLink href="/api/exit-preview" $preview={preview} aria-label="Exit preview mode">
                Click here
              </AlertLink>{' '}
              to exit preview mode.
            </>) : (<>
              The source code for this blog is{' '}
              <AlertLink href={"https://github.com/vercel/next.js/tree/canary/examples/".concat(EXAMPLE_PATH)} $preview={preview} target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
                available on GitHub
              </AlertLink>
              .
            </>)}
        </AlertContent>
      </Container>
    </AlertWrapper>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=Alert.jsx.map