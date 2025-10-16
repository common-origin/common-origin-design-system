import { __makeTemplateObject } from "tslib";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CoverImage, DateFormatter } from '.';
import tokens from '../styles/tokens.json';
var spacing = tokens.base.spacing, semantic = tokens.semantic;
var HeroSection = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* Section wrapper */\n"], ["\n  /* Section wrapper */\n"])));
var CoverImageWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"], ["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"])), spacing[4], spacing[6]);
var ContentGrid = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: ", ";\n    margin-bottom: ", ";\n  }\n\n  @media (min-width: 1024px) {\n    gap: ", ";\n  }\n"], ["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: ", ";\n    margin-bottom: ", ";\n  }\n\n  @media (min-width: 1024px) {\n    gap: ", ";\n  }\n"])), spacing[6], spacing[8], spacing[12], spacing[6]);
var TitleSection = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  /* Title and date container */\n"], ["\n  /* Title and date container */\n"])));
var HeroTitle = styled.h3(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  color: ", ";\n  font: ", ";\n  line-height: 1.1;\n\n  @media (min-width: 1024px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n"], ["\n  margin-bottom: ", ";\n  color: ", ";\n  font: ", ";\n  line-height: 1.1;\n\n  @media (min-width: 1024px) {\n    font-size: ", ";\n    line-height: ", ";\n  }\n"])), spacing[4], semantic.color.text.default, semantic.typography.h1, tokens.base.fontSize[10], tokens.base.lineHeight[10]);
var TitleLink = styled(Link)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: inherit;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n"], ["\n  color: inherit;\n  text-decoration: none;\n\n  &:hover {\n    text-decoration: underline;\n  }\n"])));
var DateContainer = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n  letter-spacing: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: 0;\n  }\n"], ["\n  margin-bottom: ", ";\n  font: ", ";\n  color: ", ";\n  text-transform: uppercase;\n  letter-spacing: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: 0;\n  }\n"])), spacing[4], semantic.typography.caption, semantic.color.text.subdued, tokens.base.letterSpacing[3]);
var ExcerptSection = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), spacing[4]);
var ExcerptText = styled.p(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font: ", ";\n  line-height: 1.6;\n  margin-bottom: ", ";\n  color: ", ";\n"], ["\n  font: ", ";\n  line-height: 1.6;\n  margin-bottom: ", ";\n  color: ", ";\n"])), semantic.typography.small, spacing[4], semantic.color.text.default);
export var HeroPost = function (_a) {
    var title = _a.title, coverImage = _a.coverImage, date = _a.date, excerpt = _a.excerpt, slug = _a.slug;
    return (<HeroSection>
      <CoverImageWrapper>
        <CoverImage title={title} src={coverImage} slug={slug}/>
      </CoverImageWrapper>
      <ContentGrid>
        <TitleSection>
          <HeroTitle>
            <TitleLink href={"/posts/".concat(slug)}>
              {title}
            </TitleLink>
          </HeroTitle>
          <DateContainer>
            <DateFormatter dateString={date}/>
          </DateContainer>
        </TitleSection>
        <ExcerptSection>
          <ExcerptText>{excerpt}</ExcerptText>
        </ExcerptSection>
      </ContentGrid>
    </HeroSection>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=heroPost.jsx.map