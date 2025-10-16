import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import tokens from '@/styles/tokens.json';
var _a = tokens.semantic, color = _a.color, border = _a.border, spacing = _a.spacing;
var StyledCodeBlock = styled.pre(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  font-family: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  overflow-x: auto;\n  margin: ", " 0;\n  position: relative;\n"], ["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  font-family: ", ";\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  overflow-x: auto;\n  margin: ", " 0;\n  position: relative;\n"])), color.background.subtle, border.subtle, tokens.base.border.radius[2], spacing.layout.md, tokens.base.fontFamily.monospace, tokens.base.fontSize[1], tokens.base.lineHeight[3], color.text.default, spacing.layout.sm);
var CodeBlockWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  width: 100%;\n"], ["\n  position: relative;\n  display: inline-block;\n  width: 100%;\n"])));
var CopyButtonWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  bottom: ", ";\n  right: ", ";\n"], ["\n  position: absolute;\n  bottom: ", ";\n  right: ", ";\n"])), spacing.layout.lg, spacing.layout.sm);
var CopyButton = function (_a) {
    var text = _a.text, onCopy = _a.onCopy;
    var _b = useState(false), copied = _b[0], setCopied = _b[1];
    var handleCopy = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 1:
                    _a.sent();
                    setCopied(true);
                    onCopy === null || onCopy === void 0 ? void 0 : onCopy();
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy text: ', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<CopyButtonWrapper>
      <Button variant="secondary" size="small" iconName="copy" onClick={handleCopy} data-testid="copy-button">
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </CopyButtonWrapper>);
};
/**
 * CodeBlock component for displaying formatted code with optional copy functionality
 *
 * @param children - The code content to display
 * @param showCopyButton - Whether to show the copy button (default: true)
 * @param onCopy - Optional callback when code is copied
 * @param data-testid - Test identifier for the code block
 */
export var CodeBlock = function (_a) {
    var children = _a.children, _b = _a.showCopyButton, showCopyButton = _b === void 0 ? true : _b, onCopy = _a.onCopy, testId = _a["data-testid"];
    return (<CodeBlockWrapper>
      <StyledCodeBlock data-testid={testId}>
        {children}
      </StyledCodeBlock>
      {showCopyButton && (<CopyButton text={children} onCopy={onCopy}/>)}
    </CodeBlockWrapper>);
};
export default CodeBlock;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=CodeBlock.jsx.map