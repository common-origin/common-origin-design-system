import { __makeTemplateObject } from "tslib";
import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import { Box, Breadcrumbs, Button, Container, Dropdown, Layout, Navigation, Typography, Stack, Chip, } from '../../components';
import tokens from '@/styles/tokens.json';
var breakpoint = tokens.base.breakpoint, _a = tokens.semantic, color = _a.color, border = _a.border, spacing = _a.spacing;
var TokensLayout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  min-height: 100vh;\n"], ["\n  display: flex;\n  min-height: 100vh;\n"])));
var Sidebar = styled.nav(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 250px;\n  border-right: ", ";\n  position: sticky;\n  top: 0;\n  margin-top: ", ";\n  height: 100vh;\n  overflow-y: auto;\n  padding: ", " 0;\n  \n  @media (max-width: ", ") {\n    display: none;\n  }\n"], ["\n  width: 250px;\n  border-right: ", ";\n  position: sticky;\n  top: 0;\n  margin-top: ", ";\n  height: 100vh;\n  overflow-y: auto;\n  padding: ", " 0;\n  \n  @media (max-width: ", ") {\n    display: none;\n  }\n"])), border.default, spacing.layout['xs'], spacing.layout['8xl'], breakpoint.md);
var MobileNavigation = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: none;\n  \n  @media (max-width: ", ") {\n    display: block;\n    padding: ", ";\n    background-color: ", ";\n    border-bottom: ", ";\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n"], ["\n  display: none;\n  \n  @media (max-width: ", ") {\n    display: block;\n    padding: ", ";\n    background-color: ", ";\n    border-bottom: ", ";\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n"])), breakpoint.md, spacing.layout.lg, color.background.subtle, border.default);
var MainContent = styled.main(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex: 1;\n  padding: ", ";\n  overflow-x: auto;\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"], ["\n  flex: 1;\n  padding: ", ";\n  overflow-x: auto;\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"])), spacing.layout['2xl'], breakpoint.md, spacing.layout.lg);
var TokenTable = styled.table(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n  border: ", ";\n  background-color: transparent;\n"], ["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n  border: ", ";\n  background-color: transparent;\n"])), spacing.layout.lg, tokens.base.border.radius[3], border.default);
var TableHeader = styled.th(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background-color: ", ";\n  border-bottom: ", ";\n  padding: ", ";\n  text-align: left;\n  font: ", ";\n  color: ", ";\n  font-weight: 600;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n    font: ", ";\n  }\n"], ["\n  background-color: ", ";\n  border-bottom: ", ";\n  padding: ", ";\n  text-align: left;\n  font: ", ";\n  color: ", ";\n  font-weight: 600;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n    font: ", ";\n  }\n"])), color.background.default, border.subtle, spacing.layout.md, tokens.semantic.typography.label, color.text.emphasis, border.subtle, breakpoint.md, spacing.layout.sm, tokens.semantic.typography.label);
var TableRow = styled.tr(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  &:not(:last-child) td {\n    border-bottom: ", ";\n  }\n"], ["\n  &:not(:last-child) td {\n    border-bottom: ", ";\n  }\n"])), border.subtle);
var TableCell = styled.td(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: ", ";\n  vertical-align: top;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"], ["\n  padding: ", ";\n  vertical-align: top;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"])), spacing.layout.md, border.subtle, breakpoint.md, spacing.layout.sm);
var TokenValue = styled.span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font: ", ";\n  color: ", ";\n"], ["\n  font: ", ";\n  color: ", ";\n"])), tokens.semantic.typography.caption, color.text.subdued);
var ColorSwatch = styled.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: 40px;\n  height: 40px;\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  \n  @media (max-width: ", ") {\n    width: 32px;\n    height: 32px;\n  }\n"], ["\n  width: 40px;\n  height: 40px;\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  \n  @media (max-width: ", ") {\n    width: 32px;\n    height: 32px;\n  }\n"])), function (props) { return props.$color; }, border.subtle, tokens.base.border.radius[2], spacing.layout.sm, tokens.base.shadow[1], breakpoint.md);
var SpacingSwatch = styled.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n"])), function (props) { return props.$size; }, spacing.layout.lg, color.background.interactive, tokens.base.border.radius[1], spacing.layout.sm, tokens.base.shadow[1]);
var IconSizeSwatch = styled.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  \n  &::after {\n    content: '\u2605';\n    color: ", ";\n    font-size: calc(", " * 0.6);\n    line-height: 1;\n  }\n"], ["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  \n  &::after {\n    content: '\u2605';\n    color: ", ";\n    font-size: calc(", " * 0.6);\n    line-height: 1;\n  }\n"])), function (props) { return props.$size; }, function (props) { return props.$size; }, color.text.subdued, tokens.base.border.radius[1], spacing.layout.sm, tokens.base.shadow[1], color.background.subtle, function (props) { return props.$size; });
var FontSample = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  font: ", ";\n  margin: ", " 0;\n  color: ", ";\n"], ["\n  font: ", ";\n  margin: ", " 0;\n  color: ", ";\n"])), function (props) { return props.$font; }, spacing.layout.xs, color.text.default);
var BorderSample = styled.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  border: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 100px;\n  text-align: center;\n  font: ", ";\n  color: ", ";\n"], ["\n  border: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 100px;\n  text-align: center;\n  font: ", ";\n  color: ", ";\n"])), function (props) { return props.$border; }, spacing.layout.sm, tokens.base.border.radius[2], color.background.subtle, spacing.layout.sm, tokens.semantic.typography.caption, color.text.subdued);
var ShadowSample = styled.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  box-shadow: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 100px;\n  text-align: center;\n  font: ", ";\n  color: ", ";\n"], ["\n  box-shadow: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 100px;\n  text-align: center;\n  font: ", ";\n  color: ", ";\n"])), function (props) { return props.$shadow; }, spacing.layout.md, tokens.base.border.radius[2], color.background.subtle, spacing.layout.sm, tokens.semantic.typography.caption, color.text.subdued);
var MotionSample = styled.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  transition: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  cursor: pointer;\n  font: ", ";\n  \n  &:hover {\n    transform: translateY(-2px);\n    background-color: ", ";\n  }\n"], ["\n  transition: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  cursor: pointer;\n  font: ", ";\n  \n  &:hover {\n    transform: translateY(-2px);\n    background-color: ", ";\n  }\n"])), function (props) { return props.$transition; }, spacing.layout.sm, tokens.base.border.radius[2], color.background.interactive, color.text.inverse, spacing.layout.sm, tokens.semantic.typography.caption, color.background['interactive-hover']);
var AvatarSizeSample = styled.div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  color: ", ";\n  font: ", ";\n  \n  &::after {\n    content: '\uD83D\uDC64';\n    font-size: calc(", " * 0.5);\n  }\n"], ["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: 50%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: ", ";\n  vertical-align: middle;\n  box-shadow: ", ";\n  color: ", ";\n  font: ", ";\n  \n  &::after {\n    content: '\uD83D\uDC64';\n    font-size: calc(", " * 0.5);\n  }\n"])), function (props) { return props.$size; }, function (props) { return props.$size; }, color.background.interactive, spacing.layout.sm, tokens.base.shadow[1], color.text.inverse, tokens.semantic.typography.caption, function (props) { return props.$size; });
var OpacitySample = styled.div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  opacity: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 80px;\n  text-align: center;\n  font: ", ";\n"], ["\n  opacity: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 80px;\n  text-align: center;\n  font: ", ";\n"])), function (props) { return props.$opacity; }, spacing.layout.sm, tokens.base.border.radius[2], color.background.emphasis, color.text.inverse, spacing.layout.sm, tokens.semantic.typography.caption);
var ZIndexSample = styled.div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  position: relative;\n  z-index: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 60px;\n  text-align: center;\n  font: ", ";\n"], ["\n  position: relative;\n  z-index: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  margin-right: ", ";\n  min-width: 60px;\n  text-align: center;\n  font: ", ";\n"
    // Helper function to render color tokens as table
])), function (props) { return props.$zIndex; }, spacing.layout.sm, tokens.base.border.radius[2], color.background.interactive, color.text.inverse, spacing.layout.sm, tokens.semantic.typography.caption);
// Helper function to render color tokens as table
var renderColorTokensTable = function (colorTokens, categoryName, idPrefix) {
    return (<Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '80px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(colorTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"color.".concat(idPrefix.replace('color-', ''), ".").concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getColorUsageDescription(idPrefix, key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ColorSwatch $color={value}/>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render base color tokens as table
var renderBaseColorTokensTable = function (colorTokens, categoryName, idPrefix) {
    return (<Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader style={{ width: '80px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(colorTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"color.".concat(idPrefix.replace('color-', ''), ".").concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <ColorSwatch $color={value}/>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render spacing tokens as table
var renderSpacingTokensTable = function (spacingTokens, title) {
    if (title === void 0) { title = 'Spacing'; }
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">{title}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(spacingTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"semantic.spacing.".concat(title.toLowerCase().replace(' ', '.'), ".").concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getSemanticSpacingUsageDescription(key, title)}</TokenValue>
              </TableCell>
              <TableCell>
                <SpacingSwatch $size={value}/>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render icon size tokens as table
var renderIconSizeTokensTable = function (iconSizeTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Icon Sizes</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(iconSizeTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"semantic.size.icon.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getIconSizeUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <IconSizeSwatch $size={value}/>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render typography tokens as table
var renderTypographyTokensTable = function (typographyTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Typography</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(typographyTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"typography.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getTypographyUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <FontSample $font={value}>
                  Aa Bb Cc
                </FontSample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render border tokens as table
var renderBorderTokensTable = function (borderTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Border</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(borderTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"border.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getBorderUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <BorderSample $border={value}>
                  Sample
                </BorderSample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render generic tokens as table
var renderGenericTokensTable = function (tokenObj, categoryName, prefix, idPrefix) {
    return (<Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokenObj).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"".concat(prefix, ".").concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getGenericUsageDescription(prefix, key)}</TokenValue>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render shadow tokens as table
var renderShadowTokensTable = function (shadowTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Shadow</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(shadowTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"shadow.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getShadowUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ShadowSample $shadow={value}>
                  Shadow
                </ShadowSample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render motion tokens as table
var renderMotionTokensTable = function (motionTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Motion</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(motionTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"motion.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getMotionUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <MotionSample $transition={value}>
                  Hover me
                </MotionSample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render avatar size tokens as table
var renderAvatarSizeTokensTable = function (avatarSizeTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Avatar Sizes</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(avatarSizeTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"semantic.size.avatar.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getAvatarSizeUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <AvatarSizeSample $size={value}/>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render opacity tokens as table
var renderOpacityTokensTable = function (opacityTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Opacity</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(opacityTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"opacity.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getOpacityUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <OpacitySample $opacity={value}>
                  {Math.round(parseFloat(value) * 100)}%
                </OpacitySample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Helper function to render z-index tokens as table
var renderZIndexTokensTable = function (zIndexTokens) {
    return (<Box mb="7xl">
      <Typography variant="h3" color="default">Z-Index</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(zIndexTokens).map(function (_a) {
            var key = _a[0], value = _a[1];
            return (<TableRow key={key}>
              <TableCell>
                <Chip title={"zIndex.".concat(key)} variant="default"/>
              </TableCell>
              <TableCell>
                <TokenValue>{value}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getZIndexUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ZIndexSample $zIndex={value}>
                  {value}
                </ZIndexSample>
              </TableCell>
            </TableRow>);
        })}
        </tbody>
      </TokenTable>
    </Box>);
};
// Usage description helpers
var getColorUsageDescription = function (category, key) {
    var _a;
    var descriptions = {
        'color-text': {
            'default': 'Primary text content',
            'emphasis': 'Important text that needs emphasis',
            'subdued': 'Secondary or supporting text',
            'inverse': 'Text on dark backgrounds',
            'disabled': 'Disabled or inactive text',
            'interactive': 'Links and interactive text',
            'error': 'Error messages and validation',
            'success': 'Success messages and confirmations',
            'warning': 'Warning messages and alerts'
        },
        'color-background': {
            'default': 'Default page background',
            'subtle': 'Card and component backgrounds',
            'emphasis': 'High contrast backgrounds',
            'surface': 'Elevated surface backgrounds',
            'inverse': 'Dark theme backgrounds',
            'interactive': 'Interactive elements like buttons',
            'interactive-hover': 'Hover state for interactive elements',
            'interactive-active': 'Active/pressed state for interactive elements',
            'error': 'Error state backgrounds',
            'error-subtle': 'Subtle error state backgrounds',
            'success': 'Success state backgrounds',
            'success-subtle': 'Subtle success state backgrounds',
            'warning': 'Warning state backgrounds',
            'warning-subtle': 'Subtle warning state backgrounds',
            'disabled': 'Disabled element backgrounds'
        },
        'color-border': {
            'default': 'Standard borders and dividers',
            'subtle': 'Subtle borders and separators',
            'strong': 'Strong borders for emphasis',
            'interactive': 'Interactive element borders',
            'error': 'Error state borders',
            'success': 'Success state borders',
            'warning': 'Warning state borders'
        },
        'color-icon': {
            'default': 'Standard icon color',
            'emphasis': 'Important or emphasized icons',
            'subdued': 'Secondary or supporting icons',
            'disabled': 'Disabled or inactive icons',
            'inverse': 'Icons on dark backgrounds',
            'interactive': 'Interactive icons and buttons',
            'error': 'Error state icons',
            'success': 'Success state icons',
            'warning': 'Warning state icons'
        }
    };
    return ((_a = descriptions[category]) === null || _a === void 0 ? void 0 : _a[key]) || 'Design token usage';
};
var getSemanticSpacingUsageDescription = function (key, category) {
    var layoutDescriptions = {
        'xs': 'Extra small layout spacing (4px) - tight element spacing',
        'sm': 'Small layout spacing (8px) - compact component spacing',
        'md': 'Medium layout spacing (16px) - default component spacing',
        'lg': 'Large layout spacing (24px) - section spacing',
        'xl': 'Extra large layout spacing (32px) - large section spacing',
        '2xl': 'Double extra large spacing (48px) - major section spacing',
        '3xl': 'Triple extra large spacing (64px) - page section spacing',
        '4xl': 'Quadruple extra large spacing (80px) - large page sections',
        '5xl': 'Quintuple extra large spacing (96px) - hero sections',
        '6xl': 'Sextuple extra large spacing (128px) - major page divisions',
        '7xl': 'Septuple extra large spacing (160px) - maximum page spacing',
        '8xl': 'Octuple extra large spacing (192px) - maximum layout spacing'
    };
    var separatorDescriptions = {
        'xs': 'Extra small separator spacing (8px) - minimal visual separation',
        'sm': 'Small separator spacing (16px) - subtle content separation',
        'md': 'Medium separator spacing (24px) - standard content separation',
        'lg': 'Large separator spacing (32px) - emphasized content separation',
        'xl': 'Extra large separator spacing (48px) - strong visual separation',
        '2xl': 'Double extra large separator spacing (64px) - major section separation',
        '3xl': 'Triple extra large separator spacing (80px) - page-level separation',
        '4xl': 'Quadruple extra large separator spacing (96px) - maximum separation'
    };
    if (category.toLowerCase().includes('layout')) {
        return layoutDescriptions[key] || 'Layout spacing value';
    }
    else if (category.toLowerCase().includes('separator')) {
        return separatorDescriptions[key] || 'Separator spacing value';
    }
    return 'Semantic spacing value';
};
var getTypographyUsageDescription = function (key) {
    var descriptions = {
        'h1': 'Main page headings',
        'h2': 'Section headings',
        'h3': 'Subsection headings',
        'h4': 'Component headings',
        'h5': 'Small headings',
        'h6': 'Caption headings',
        'body': 'Body text and paragraphs',
        'caption': 'Small supporting text',
        'code': 'Code snippets and technical text',
        'display': 'Large display text'
    };
    return descriptions[key] || 'Typography style';
};
var getIconSizeUsageDescription = function (key) {
    var descriptions = {
        'xs': 'Extra small icons for tight spaces and inline text',
        'sm': 'Small icons for compact UI elements',
        'md': 'Medium icons for general use (default)',
        'lg': 'Large icons for emphasis and headers',
        'xl': 'Extra large icons for prominent features',
        '2xl': 'Largest icons for hero sections and branding'
    };
    return descriptions[key] || 'Icon sizing';
};
var getBorderUsageDescription = function (key) {
    var descriptions = {
        'default': 'Standard component borders',
        'subtle': 'Subtle dividers and separators',
        'strong': 'Emphasized borders',
        'focus': 'Focus indicators',
        'tooltip': 'Tooltip borders'
    };
    return descriptions[key] || 'Border style';
};
var getShadowUsageDescription = function (key) {
    var descriptions = {
        '1': 'Subtle elevation (cards)',
        '2': 'Low elevation (buttons)',
        '3': 'Medium elevation (dropdowns)',
        '4': 'High elevation (modals)',
        '5': 'Very high elevation (overlays)',
        '6': 'Maximum elevation (tooltips)',
        'none': 'No shadow'
    };
    return descriptions[key] || 'Shadow effect';
};
var getMotionUsageDescription = function (key) {
    var descriptions = {
        'transition': 'Generic transition settings',
        'fast': 'Fast transitions for subtle interactions',
        'normal': 'Standard transitions for most interactions',
        'slow': 'Slow transitions for emphasized interactions',
        'hover': 'Hover state transitions',
        'focus': 'Focus state transitions',
        'interactive': 'Interactive element transitions'
    };
    return descriptions[key] || 'Motion effect';
};
var getAvatarSizeUsageDescription = function (key) {
    var descriptions = {
        'xs': 'Extra small avatars for inline use',
        'sm': 'Small avatars for compact lists',
        'md': 'Medium avatars for general use',
        'lg': 'Large avatars for profiles',
        'xl': 'Extra large avatars for headers'
    };
    return descriptions[key] || 'Avatar sizing';
};
var getOpacityUsageDescription = function (key) {
    var descriptions = {
        '0': 'Completely transparent',
        '5': 'Very faint transparency',
        '10': 'Subtle transparency',
        '20': 'Light transparency',
        '25': 'Quarter opacity',
        '30': 'Light to medium transparency',
        '40': 'Medium transparency',
        '50': 'Half opacity',
        '60': 'Medium to strong transparency',
        '70': 'Strong transparency',
        '75': 'Three-quarter opacity',
        '80': 'Strong opacity',
        '90': 'Very strong opacity',
        '95': 'Nearly opaque',
        '100': 'Completely opaque'
    };
    return descriptions[key] || 'Opacity level';
};
var getZIndexUsageDescription = function (key) {
    var descriptions = {
        '0': 'Base layer (default)',
        '1': 'Slightly elevated content',
        '2': 'Elevated content (cards)',
        '3': 'Floating content (dropdowns)',
        '4': 'Overlay content (modals)',
        '5': 'High priority overlays',
        '6': 'Notifications and alerts',
        '7': 'Tooltips and popovers',
        '8': 'Maximum elevation (system UI)'
    };
    return descriptions[key] || 'Z-index layering';
};
var getGenericUsageDescription = function (prefix, _key) {
    if (prefix.includes('fontSize'))
        return 'Font size value';
    if (prefix.includes('fontWeight'))
        return 'Font weight value';
    if (prefix.includes('lineHeight'))
        return 'Line height value';
    if (prefix.includes('letterSpacing'))
        return 'Letter spacing value';
    if (prefix.includes('radius'))
        return 'Border radius value';
    if (prefix.includes('width'))
        return 'Border width value';
    if (prefix.includes('size'))
        return 'Size value';
    if (prefix.includes('duration'))
        return 'Animation duration';
    if (prefix.includes('easing'))
        return 'Animation easing function';
    if (prefix.includes('breakpoint'))
        return 'Responsive breakpoint';
    return 'Design token value';
};
export default function Tokens() {
    var _a = useState('border'), activeTab = _a[0], setActiveTab = _a[1];
    // Navigation items organized as tabs (alphabetically ordered)
    var navigationTabs = [
        {
            id: 'border',
            label: 'Border',
            isHeader: true,
            content: [
                { id: 'border-styles', type: 'border', data: tokens.semantic.border, title: 'Border Style' },
                { id: 'border-radius', type: 'generic', data: tokens.base.border.radius, title: 'Border Radius', prefix: 'border.radius' },
                { id: 'border-width', type: 'generic', data: tokens.base.border.width, title: 'Border Width', prefix: 'border.width' },
            ]
        },
        {
            id: 'color',
            label: 'Color',
            isHeader: true,
            content: [
                { id: 'color-text', type: 'color', data: tokens.semantic.color.text, title: 'Text' },
                { id: 'color-background', type: 'color', data: tokens.semantic.color.background, title: 'Background' },
                { id: 'color-border', type: 'color', data: tokens.semantic.color.border, title: 'Border' },
                { id: 'color-icon', type: 'color', data: tokens.semantic.color.icon, title: 'Icon' },
                { id: 'color-blue', type: 'base-color', data: tokens.base.color.blue, title: 'Blue' },
                { id: 'color-neutral', type: 'base-color', data: tokens.base.color.neutral, title: 'Neutral' },
                { id: 'color-green', type: 'base-color', data: tokens.base.color.green, title: 'Green' },
                { id: 'color-orange', type: 'base-color', data: tokens.base.color.orange, title: 'Orange' },
                { id: 'color-red', type: 'base-color', data: tokens.base.color.red, title: 'Red' },
            ]
        },
        {
            id: 'motion',
            label: 'Motion',
            isHeader: true,
            content: [
                { id: 'motion-transition', type: 'motion', data: tokens.semantic.motion.transition, title: 'Transition' },
                { id: 'motion-special', type: 'generic', data: { hover: tokens.semantic.motion.hover, focus: tokens.semantic.motion.focus, interactive: tokens.semantic.motion.interactive }, title: 'Special Motion', prefix: 'motion' },
                { id: 'duration', type: 'generic', data: tokens.base.duration, title: 'Duration', prefix: 'duration' },
                { id: 'easing', type: 'generic', data: tokens.base.easing, title: 'Easing', prefix: 'easing' },
            ]
        },
        {
            id: 'opacity',
            label: 'Opacity',
            isHeader: true,
            content: [
                { id: 'opacity', type: 'opacity', data: tokens.base.opacity, title: 'Opacity' },
            ]
        },
        {
            id: 'shadow',
            label: 'Shadow',
            isHeader: true,
            content: [
                { id: 'shadow', type: 'shadow', data: tokens.base.shadow, title: 'Shadow' },
            ]
        },
        {
            id: 'size',
            label: 'Size',
            isHeader: true,
            content: [
                { id: 'icon-sizes', type: 'icon-size', data: tokens.semantic.size.icon, title: 'Icon Sizes' },
                { id: 'avatar-sizes', type: 'avatar-size', data: tokens.semantic.size.avatar, title: 'Avatar Sizes' },
                { id: 'base-sizes', type: 'generic', data: tokens.base.size, title: 'Base Sizes', prefix: 'size' },
            ]
        },
        {
            id: 'spacing',
            label: 'Spacing',
            isHeader: true,
            content: [
                { id: 'layout-spacing', type: 'spacing', data: tokens.semantic.spacing.layout, title: 'Layout Spacing' },
                { id: 'separator-spacing', type: 'spacing', data: tokens.semantic.spacing.separator, title: 'Separator Spacing' },
            ]
        },
        {
            id: 'system',
            label: 'System',
            isHeader: true,
            content: [
                { id: 'z-index', type: 'z-index', data: tokens.base.zIndex, title: 'Z-Index' },
                { id: 'breakpoint', type: 'generic', data: tokens.base.breakpoint, title: 'Breakpoints', prefix: 'breakpoint' },
            ]
        },
        {
            id: 'typography',
            label: 'Typography',
            isHeader: true,
            content: [
                { id: 'semantic-typography', type: 'typography', data: tokens.semantic.typography, title: 'Typography Style' },
                { id: 'font-size', type: 'generic', data: tokens.base.fontSize, title: 'Font Size', prefix: 'fontSize' },
                { id: 'font-weight', type: 'generic', data: tokens.base.fontWeight, title: 'Font Weight', prefix: 'fontWeight' },
                { id: 'line-height', type: 'generic', data: tokens.base.lineHeight, title: 'Line Height', prefix: 'lineHeight' },
                { id: 'letter-spacing', type: 'generic', data: tokens.base.letterSpacing, title: 'Letter Spacing', prefix: 'letterSpacing' },
            ]
        },
    ];
    var activeTabData = navigationTabs.find(function (tab) { return tab.id === activeTab; });
    var handleTabClick = function (tabId) {
        setActiveTab(tabId);
    };
    var renderTabContent = function (content) {
        return content.map(function (item) {
            switch (item.type) {
                case 'color':
                    return renderColorTokensTable(item.data, item.title, item.id);
                case 'base-color':
                    return renderBaseColorTokensTable(item.data, item.title, item.id);
                case 'typography':
                    return renderTypographyTokensTable(item.data);
                case 'border':
                    return renderBorderTokensTable(item.data);
                case 'spacing':
                    return renderSpacingTokensTable(item.data, item.title);
                case 'icon-size':
                    return renderIconSizeTokensTable(item.data);
                case 'avatar-size':
                    return renderAvatarSizeTokensTable(item.data);
                case 'shadow':
                    return renderShadowTokensTable(item.data);
                case 'motion':
                    return renderMotionTokensTable(item.data);
                case 'opacity':
                    return renderOpacityTokensTable(item.data);
                case 'z-index':
                    return renderZIndexTokensTable(item.data);
                case 'generic':
                    return renderGenericTokensTable(item.data, item.title, item.prefix, item.id);
                default:
                    return null;
            }
        });
    };
    return (<>
      <Layout>
        <Head>
          <title>Design Tokens - Common Origin</title>
        </Head>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Design', url: '/design' }, { label: 'Tokens', url: '/design/tokens' }]}/>
        
        <section>
          <Container>
            <MobileNavigation>
              <Dropdown options={navigationTabs.map(function (tab) { return ({ id: tab.id, label: tab.label }); })} value={activeTab} onChange={handleTabClick} placeholder="Select a token category"/>
            </MobileNavigation>
            
            <TokensLayout>
              <Sidebar>
                <Box px="lg">
                  <Stack direction="column" gap="sm">
                    {navigationTabs.map(function (tab) { return (<Button key={tab.id} variant={activeTab === tab.id ? 'primary' : 'secondary'} size="medium" onClick={function () { return handleTabClick(tab.id); }} style={{ justifyContent: 'flex-start', width: '100%' }}>
                        {tab.label}
                      </Button>); })}
                  </Stack>
                </Box>
              </Sidebar>

              <MainContent>
                <Box my="4xl">
                  <Typography variant="h1">Design Tokens</Typography>
                  <Box mt="md">
                    <Typography variant="body" color="emphasis">
                      A comprehensive reference of all design tokens used throughout the Common Origin design system.
                    </Typography>
                  </Box>
                </Box>

                {/* Render active tab content */}
                {activeTabData && renderTabContent(activeTabData.content)}
              </MainContent>
            </TokensLayout>
          </Container>
        </section>
      </Layout>
    </>);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
//# sourceMappingURL=tokens.jsx.map