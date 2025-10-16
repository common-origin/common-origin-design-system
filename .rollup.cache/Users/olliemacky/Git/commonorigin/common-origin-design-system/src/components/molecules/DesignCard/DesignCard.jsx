import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Chip } from '../../atoms/Chip';
import { Button } from '../../atoms/Button';
import { CoverImage } from '../../atoms/CoverImage';
import { SectionSeparator } from '../../atoms/SectionSeparator';
import { Stack } from '../../atoms/Stack';
import { Typography } from '../../atoms/Typography';
import { DateFormatter } from '../../dateFormatter';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, border = _a.border;
var DesignCardStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @media (min-width: ", ") {\n    display: grid;\n    grid-template-columns: repeat(12, 1fr);\n  }\n\n  @media (min-width: ", ") {\n    gap: ", ";\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n\n    &:hover {\n      opacity: 0.8;\n    }\n  }\n\n  a {\n    text-decoration: none;\n  }\n"], ["\n  @media (min-width: ", ") {\n    display: grid;\n    grid-template-columns: repeat(12, 1fr);\n  }\n\n  @media (min-width: ", ") {\n    gap: ", ";\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n\n    &:hover {\n      opacity: 0.8;\n    }\n  }\n\n  a {\n    text-decoration: none;\n  }\n"])), tokens.base.breakpoint.md, tokens.base.breakpoint.lg, spacing[12], border.radius[6]);
var ImageWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  grid-column: span 12;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n"], ["\n  grid-column: span 12;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n"])), tokens.base.breakpoint.lg);
var ContentSection = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  grid-column: span 12;\n  margin-top: ", ";\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n    margin-top: 0;\n    padding-right: ", ";\n  }\n\n  @media (min-width: ", ") {\n    padding-right: ", ";\n  }\n"], ["\n  grid-column: span 12;\n  margin-top: ", ";\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n    margin-top: 0;\n    padding-right: ", ";\n  }\n\n  @media (min-width: ", ") {\n    padding-right: ", ";\n  }\n"])), spacing[6], tokens.base.breakpoint.lg, spacing[8], tokens.base.breakpoint.xl, spacing[24]);
var ButtonWrapper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  button {\n    margin-top: ", ";\n  }\n"], ["\n  button {\n    margin-top: ", ";\n  }\n"])), spacing[4]);
var ContentWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 100%;\n"])));
export var DesignCard = function (_a) {
    var title = _a.title, excerpt = _a.excerpt, _b = _a.labels, labels = _b === void 0 ? [] : _b, tag = _a.tag, coverImage = _a.coverImage, date = _a.date, slug = _a.slug;
    if (tag === 'design') {
        return (<>
        <DesignCardStyled>
          <ImageWrapper>
            <CoverImage title={title} src={coverImage} slug={slug}/>
          </ImageWrapper>
          <ContentSection>
            <ContentWrapper>
              <Stack direction="column" gap="md">
                <Typography variant="h3">{title}</Typography>
                <DateFormatter dateString={date}/>
                <Typography variant="small">{excerpt}</Typography>
                <Stack direction="row" gap="xs">
                  {Array.isArray(labels) && labels.map(function (label, index) { return (<Chip key={index} title={label} variant="default"/>); })}
                </Stack>
                <ButtonWrapper>
                  <Button url={"/posts/".concat(slug)}>Read more</Button>
                </ButtonWrapper>
              </Stack>
            </ContentWrapper>
          </ContentSection>
        </DesignCardStyled>
        <SectionSeparator />
      </>);
    }
    return null;
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=DesignCard.jsx.map