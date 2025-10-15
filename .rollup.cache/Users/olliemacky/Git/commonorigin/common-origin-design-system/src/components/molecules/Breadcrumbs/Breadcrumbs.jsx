var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
import { __makeTemplateObject } from "tslib";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, Typography } from '@/components';
import tokens from '@/styles/tokens.json';
var BreadcrumbNavStyled = styled.nav(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-bottom: ", ";\n\n  ol {\n    display: flex;\n    align-items: center;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n"], ["\n  border-bottom: ", ";\n\n  ol {\n    display: flex;\n    align-items: center;\n    list-style: none;\n    margin: 0;\n    padding: 0;\n  }\n"])), ((_b = (_a = tokens.semantic) === null || _a === void 0 ? void 0 : _a.border) === null || _b === void 0 ? void 0 : _b.default) || '0.0625rem solid #e9ecef');
var BreadcrumbStyled = styled.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-transform: uppercase;\n  display: inline-block;\n  margin-right: ", ";\n  padding: ", ";\n  position: relative;\n\n  &:not(:last-of-type)::before {\n    content: '';\n    background-image: url('/assets/icons/caret.svg');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    opacity: 0.5;\n    display: inline-block;\n    width: ", ";\n    height: ", ";\n    right: -", ";\n    position: absolute;\n  }\n\n  &:last-of-type a {\n    text-decoration: none;\n    color: ", ";\n  }\n\n  &:last-of-type p {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 180px;\n  }\n\n  > a {\n    text-decoration: underline;\n    color: ", ";\n  }\n"], ["\n  text-transform: uppercase;\n  display: inline-block;\n  margin-right: ", ";\n  padding: ", ";\n  position: relative;\n\n  &:not(:last-of-type)::before {\n    content: '';\n    background-image: url('/assets/icons/caret.svg');\n    background-size: contain;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: transparent;\n    opacity: 0.5;\n    display: inline-block;\n    width: ", ";\n    height: ", ";\n    right: -", ";\n    position: absolute;\n  }\n\n  &:last-of-type a {\n    text-decoration: none;\n    color: ", ";\n  }\n\n  &:last-of-type p {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 180px;\n  }\n\n  > a {\n    text-decoration: underline;\n    color: ", ";\n  }\n"])), ((_d = (_c = tokens.base) === null || _c === void 0 ? void 0 : _c.spacing) === null || _d === void 0 ? void 0 : _d['2']) || '0.5rem', ((_f = (_e = tokens.base) === null || _e === void 0 ? void 0 : _e.spacing) === null || _f === void 0 ? void 0 : _f['2']) || '0.5rem', ((_h = (_g = tokens.base) === null || _g === void 0 ? void 0 : _g.spacing) === null || _h === void 0 ? void 0 : _h['4']) || '1rem', ((_k = (_j = tokens.base) === null || _j === void 0 ? void 0 : _j.spacing) === null || _k === void 0 ? void 0 : _k['4']) || '1rem', ((_m = (_l = tokens.base) === null || _l === void 0 ? void 0 : _l.spacing) === null || _m === void 0 ? void 0 : _m['3']) || '0.75rem', tokens.semantic.color.text.subdued, tokens.semantic.color.text.default);
var isInternalUrl = function (url) {
    return url.startsWith('/') && !url.startsWith('http');
};
export var Breadcrumbs = function (_a) {
    var breadcrumbs = _a.breadcrumbs;
    return (<Container>
      <BreadcrumbNavStyled aria-label="breadcrumb">
        <ol>
          {breadcrumbs.map(function (breadcrumb, index) { return (<BreadcrumbStyled key={index}>
              {index === breadcrumbs.length - 1 ? (<Typography variant="caption">{breadcrumb.label}</Typography>) : isInternalUrl(breadcrumb.url) ? (<Link href={breadcrumb.url}>
                  <Typography variant="caption">{breadcrumb.label}</Typography>
                </Link>) : (<a href={breadcrumb.url} target="_blank" rel="noopener noreferrer">
                  <Typography variant="caption">{breadcrumb.label}</Typography>
                </a>)}
            </BreadcrumbStyled>); })}
        </ol>
      </BreadcrumbNavStyled>
    </Container>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=Breadcrumbs.jsx.map