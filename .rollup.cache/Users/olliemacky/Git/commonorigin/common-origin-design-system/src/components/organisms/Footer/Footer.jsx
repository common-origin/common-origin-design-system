import { __makeTemplateObject } from "tslib";
import React from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Link from 'next/link';
import { Container } from '../../atoms/Container';
import tokens from '@/styles/tokens.json';
var _a = tokens.semantic, color = _a.color, spacing = _a.spacing;
var FooterStyled = styled.footer(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n  color: ", ";\n  width: 100%;\n"], ["\n  background-color: ", ";\n  color: ", ";\n  width: 100%;\n"])), color.background.emphasis, color.text.inverse);
var FooterContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: ", " 0;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: ", " 0;\n"])), spacing.layout['2xl']);
var LogoLink = styled(Link)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-right: ", ";\n  display: flex;\n  align-items: center;\n  text-decoration: ", ";\n  border-radius: 0.25rem;\n  \n  /* Focus styles for WCAG 2.4.7 Focus Visible */\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n  \n  /* High contrast mode support */\n  @media (prefers-contrast: high) {\n    &:focus {\n      outline: 3px solid;\n    }\n  }\n"], ["\n  margin-right: ", ";\n  display: flex;\n  align-items: center;\n  text-decoration: ", ";\n  border-radius: 0.25rem;\n  \n  /* Focus styles for WCAG 2.4.7 Focus Visible */\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n  \n  /* High contrast mode support */\n  @media (prefers-contrast: high) {\n    &:focus {\n      outline: 3px solid;\n    }\n  }\n"])), spacing.layout.lg, function (props) { return props.$isActive ? 'underline' : 'none'; }, color.text.inverse);
var LogoImage = styled.img(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: auto;\n  width: auto;\n  \n  /* Ensure image doesn't become too small for accessibility */\n  min-width: 44px;\n  min-height: 44px;\n"], ["\n  height: auto;\n  width: auto;\n  \n  /* Ensure image doesn't become too small for accessibility */\n  min-width: 44px;\n  min-height: 44px;\n"])));
export var Footer = function (_a) {
    var _b = _a.logoSrc, logoSrc = _b === void 0 ? "/assets/logo/co-logo-white.svg" : _b, _c = _a.logoAlt, logoAlt = _c === void 0 ? "Common Origin Logo" : _c;
    var router = useRouter();
    var asPath = router.asPath;
    return (<FooterStyled role="contentinfo" aria-label="Site footer">
      <Container>
        <FooterContent>
          <LogoLink href="/" $isActive={asPath === '/'} aria-label={"".concat(logoAlt, " - Navigate to homepage")}>
            <LogoImage src={logoSrc} alt=""/>
          </LogoLink>
        </FooterContent>
      </Container>
    </FooterStyled>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=Footer.jsx.map