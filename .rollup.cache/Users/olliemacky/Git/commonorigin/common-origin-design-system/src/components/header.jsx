import { __makeTemplateObject } from "tslib";
import Link from 'next/link';
import styled from 'styled-components';
import tokens from '@/styles/tokens.json';
var HeaderTitle = styled.h2(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: ", ";\n  color: ", ";\n  font-weight: ", ";\n  letter-spacing: ", ";\n  line-height: ", ";\n  margin-bottom: ", ";\n  margin-top: ", ";\n  \n  @media (min-width: ", ") {\n    font-size: ", ";\n    letter-spacing: ", ";\n  }\n"], ["\n  font-size: ", ";\n  color: ", ";\n  font-weight: ", ";\n  letter-spacing: ", ";\n  line-height: ", ";\n  margin-bottom: ", ";\n  margin-top: ", ";\n  \n  @media (min-width: ", ") {\n    font-size: ", ";\n    letter-spacing: ", ";\n  }\n"])), tokens.base.fontSize[7], tokens.base.color.neutral[700], tokens.base.fontWeight[5], tokens.base.letterSpacing[1], tokens.base.lineHeight[5], tokens.base.spacing[20], tokens.base.spacing[8], tokens.base.breakpoint.md, tokens.base.fontSize[9], tokens.base.letterSpacing[0]);
var HeaderLink = styled.a(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
export var Header = function () {
    return (<HeaderTitle>
      <Link href="/" passHref legacyBehavior>
        <HeaderLink>
          Home
        </HeaderLink>
      </Link>
      .
    </HeaderTitle>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=header.jsx.map