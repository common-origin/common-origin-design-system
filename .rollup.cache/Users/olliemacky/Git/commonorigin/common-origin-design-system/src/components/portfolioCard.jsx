import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Chip, Stack, Typography } from './';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, border = _a.border;
var PortfolioCardStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* Card container */\n"], ["\n  /* Card container */\n"])));
var PortfolioImageLink = styled(Link)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: none;\n  }\n"], ["\n  display: block;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: none;\n  }\n"])));
var PortfolioImage = styled(Image)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-radius: ", ";\n  transition: ease opacity 0.2s;\n  width: 100%;\n  height: auto;\n  display: block;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"], ["\n  border-radius: ", ";\n  transition: ease opacity 0.2s;\n  width: 100%;\n  height: auto;\n  display: block;\n\n  &:hover {\n    opacity: 0.8;\n  }\n"])), border.radius[6]);
var PortfolioTitleLink = styled(Link)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-decoration: none;\n  color: inherit;\n\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  text-decoration: none;\n  color: inherit;\n\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
var ChipWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: ", ";\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  gap: ", ";\n"])), spacing[1]);
export var PortfolioCard = function (_a) {
    var title = _a.title, tag = _a.tag, _b = _a.labels, labels = _b === void 0 ? [] : _b, coverImage = _a.coverImage, excerpt = _a.excerpt, slug = _a.slug;
    if (tag === 'portfolio') {
        return (<PortfolioCardStyled>
        <Stack direction="column" gap="md">
          <PortfolioImageLink href={"/posts/".concat(slug)}>
            <PortfolioImage src={coverImage} alt={title} width={650} height={315} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33.33vw" placeholder="blur" blurDataURL={coverImage} style={{
                width: '100%',
                height: 'auto',
            }}/>
          </PortfolioImageLink>
          <PortfolioTitleLink href={"/posts/".concat(slug)}>
            <Typography variant="h4" color="default">{title}</Typography>
          </PortfolioTitleLink>
          <Stack direction="column" gap="md">
            <Typography variant="small" color="subdued">{excerpt}</Typography>
            <ChipWrapper>
              {Array.isArray(labels) && labels.map(function (label, index) { return (<Chip key={index} title={label} variant="default"/>); })}
            </ChipWrapper>
          </Stack>
        </Stack>
      </PortfolioCardStyled>);
    }
    return null;
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=portfolioCard.jsx.map