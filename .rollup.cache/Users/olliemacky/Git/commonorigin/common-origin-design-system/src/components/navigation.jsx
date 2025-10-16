import { __makeTemplateObject } from "tslib";
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { Container } from './atoms/Container';
import { IconButton } from './atoms/IconButton';
import { Typography } from './atoms/Typography';
import tokens from '@/styles/tokens.json';
var spacing = tokens.base.spacing, _a = tokens.semantic, border = _a.border, color = _a.color;
var NavigationWrapper = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: ", ";\n\n  @media (min-width: ", ") {\n    justify-content: flex-start;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: ", ";\n\n  @media (min-width: ", ") {\n    justify-content: flex-start;\n  }\n"])), border.default, tokens.base.breakpoint.md);
var MobileNavWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: ", " 0;\n  width: 100%;\n  z-index: ", ";\n\n  @media (min-width: ", ") {\n    display: none;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: ", " 0;\n  width: 100%;\n  z-index: ", ";\n\n  @media (min-width: ", ") {\n    display: none;\n  }\n"])), spacing[4], tokens.base.zIndex[6], tokens.base.breakpoint.md);
var NavigationWrapperDefault = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: ", ";\n  transition: all 0.3s ease-in-out;\n  display: none;\n  z-index: ", ";\n  width: 100%;\n\n  @media (min-width: ", ") {\n    display: flex;\n  }\n"], ["\n  background-color: ", ";\n  transition: all 0.3s ease-in-out;\n  display: none;\n  z-index: ", ";\n  width: 100%;\n\n  @media (min-width: ", ") {\n    display: flex;\n  }\n"])), color.background.default, tokens.base.zIndex[8], tokens.base.breakpoint.md);
var LogoLink = styled(Link)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-right: auto;\n  text-decoration: ", ";\n  \n  @media (max-width: calc(", " - 1px)) {\n    margin-right: 0;\n  }\n"], ["\n  margin-right: auto;\n  text-decoration: ", ";\n  \n  @media (max-width: calc(", " - 1px)) {\n    margin-right: 0;\n  }\n"])), function (props) { return props.$isActive ? 'underline' : 'none'; }, tokens.base.breakpoint.md);
var LogoImage = styled.img(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: auto;\n  width: auto;\n"], ["\n  height: auto;\n  width: auto;\n"])));
var DesktopNav = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  height: 100%;\n  width: 100%;\n"])));
var DesktopNavMenu = styled.nav(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  height: 100%;\n"])));
var DesktopNavLink = styled(Link)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: ", " ", ";\n  border-left: ", ";\n  background-color: ", ";\n  transition: background-color 0.15s ease-in-out;\n  text-decoration: ", ";\n\n  &:last-child {\n    border-right: ", ";\n  }\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  padding: ", " ", ";\n  border-left: ", ";\n  background-color: ", ";\n  transition: background-color 0.15s ease-in-out;\n  text-decoration: ", ";\n\n  &:last-child {\n    border-right: ", ";\n  }\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), spacing[6], spacing[12], border.default, color.background.default, function (props) { return props.$isActive ? 'underline' : 'none'; }, border.default, color.background.surface);
var MobileNav = styled.nav(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  z-index: ", ";\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  z-index: ", ";\n"])), tokens.base.zIndex[6]);
var SidePanel = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 100vw;\n  background-color: ", ";\n  transform: ", ";\n  transition: transform 0.15s ease-in-out;\n  z-index: ", ";\n\n  @media (min-width: ", ") {\n    display: none;\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 100vw;\n  background-color: ", ";\n  transform: ", ";\n  transition: transform 0.15s ease-in-out;\n  z-index: ", ";\n\n  @media (min-width: ", ") {\n    display: none;\n  }\n"])), color.background.default, function (_a) {
    var $isOpen = _a.$isOpen;
    return ($isOpen ? 'translateX(0)' : 'translateX(100%)');
}, tokens.base.zIndex[6], tokens.base.breakpoint.md);
var MobileMenuItems = styled.nav(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"], ["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n"])));
var MobileNavLink = styled(Link)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  padding: ", " 0;\n  margin-bottom: ", ";\n  text-decoration: ", ";\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  padding: ", " 0;\n  margin-bottom: ", ";\n  text-decoration: ", ";\n  color: ", ";\n\n  &:hover {\n    text-decoration: underline;\n  }\n"])), spacing[2], spacing[4], function (props) { return props.$isActive ? 'underline' : 'none'; }, color.text.default);
var MobileCloseButton = styled(IconButton)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  position: absolute;\n  right: 0;\n  top: ", ";\n"], ["\n  position: absolute;\n  right: 0;\n  top: ", ";\n"])), spacing[4]);
export var Navigation = function () {
    var _a = useState(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var router = useRouter();
    var asPath = router.asPath;
    var toggleMenu = function () {
        setIsMenuOpen(!isMenuOpen);
    };
    return (<NavigationWrapper>
      <MobileNavWrapper>
        <Container>
          <MobileNav>
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo"/>
            </LogoLink>
            <IconButton onClick={toggleMenu} iconName="menu" variant="naked" size="large" aria-label="Toggle navigation menu"/>
          </MobileNav>
        </Container>
      </MobileNavWrapper>
      <SidePanel $isOpen={isMenuOpen}>
        <Container>
          <MobileMenuItems>
            <MobileCloseButton onClick={toggleMenu} iconName="close" variant="naked" size="large" aria-label="Close navigation menu"/>
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo"/>
            </LogoLink>
            <MobileNavLink href="/components" $isActive={asPath === '/components'}>
              <Typography variant="h6" color="default">Components</Typography>
            </MobileNavLink>
            <MobileNavLink href="/tokens" $isActive={asPath === '/tokens'}>
              <Typography variant="h6" color="default">Tokens</Typography>
            </MobileNavLink>
          </MobileMenuItems>
        </Container>
      </SidePanel>
      <NavigationWrapperDefault>
        <Container>
          <DesktopNav>
            <LogoLink href="/" $isActive={asPath === '/'}>
              <LogoImage src="/assets/logo/co-logo.svg" alt="Common Origin Logo"/>
            </LogoLink>
            <DesktopNavMenu>
              <DesktopNavLink href="/components" $isActive={asPath === '/components'}>
                <Typography variant="subtitle" color={asPath === '/components' ? 'default' : 'subdued'}>Components</Typography>
              </DesktopNavLink>
              <DesktopNavLink href="/tokens" $isActive={asPath === '/tokens'}>
                <Typography variant="subtitle" color={asPath === '/tokens' ? 'default' : 'subdued'}>Tokens</Typography>
              </DesktopNavLink>
            </DesktopNavMenu>
          </DesktopNav>
        </Container>
      </NavigationWrapperDefault>
    </NavigationWrapper>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
//# sourceMappingURL=navigation.jsx.map