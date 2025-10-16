import { __makeTemplateObject } from "tslib";
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container, CoverImage } from './';
import tokens from '../styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, color = _a.color, semantic = tokens.semantic;
var FeatureSection = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: ", ";\n"], ["\n  background-color: ", ";\n"])), color.neutral[200]);
var ContentWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: ", " 0;\n\n  @media (min-width: 768px) {\n    padding: ", " 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: ", ";\n  }\n\n  @media (min-width: 1024px) {\n    gap: ", ";\n  }\n"], ["\n  padding: ", " 0;\n\n  @media (min-width: 768px) {\n    padding: ", " 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: ", ";\n  }\n\n  @media (min-width: 1024px) {\n    gap: ", ";\n  }\n"])), spacing[6], spacing[12], spacing[12], spacing[12]);
var ImageWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: 0;\n  }\n"], ["\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    margin-bottom: 0;\n  }\n"])), spacing[3]);
var TextContent = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), spacing[3]);
var FeatureLabel = styled.h2(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  font-size: 0.75rem;\n  color: ", ";\n  line-height: 1.25;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n\n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"], ["\n  margin-bottom: ", ";\n  font-size: 0.75rem;\n  color: ", ";\n  line-height: 1.25;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n\n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"])), spacing[6], color.neutral[600], spacing[6]);
var FeatureTitle = styled.h3(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  font-size: 2.25rem;\n  color: ", ";\n  line-height: 1.25;\n\n  @media (min-width: 1024px) {\n    font-size: 3rem;\n  }\n"], ["\n  margin-bottom: ", ";\n  font-size: 2.25rem;\n  color: ", ";\n  line-height: 1.25;\n\n  @media (min-width: 1024px) {\n    font-size: 3rem;\n  }\n"])), spacing[3], color.neutral[900]);
var FeatureDescription = styled.p(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 0.875rem;\n  line-height: 1.625;\n  margin-bottom: ", ";\n  color: ", ";\n"], ["\n  font-size: 0.875rem;\n  line-height: 1.625;\n  margin-bottom: ", ";\n  color: ", ";\n"])), spacing[3], color.neutral[700]);
var FeatureLink = styled(Link)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  text-decoration: underline;\n  color: ", ";\n  \n  &:hover {\n    color: ", ";\n  }\n"], ["\n  text-decoration: underline;\n  color: ", ";\n  \n  &:hover {\n    color: ", ";\n  }\n"])), semantic.color.text.default, semantic.color.text.subdued);
export var FeatureRelease = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Disappear Here - Particles EP" : _b, _c = _a.description, description = _c === void 0 ? "The debut self-released EP from Disappear Here, featuring five tracks of deep, textured atmospheres. Only available for digital download through BandCamp, this EP is a taste of what's to come for Disappear Here." : _c, _d = _a.coverImage, coverImage = _d === void 0 ? "/assets/releases/commonorigin-particles.jpg" : _d, _e = _a.linkUrl, linkUrl = _e === void 0 ? "/" : _e, _f = _a.linkText, linkText = _f === void 0 ? "Listen on BandCamp" : _f;
    return (<FeatureSection>
      <Container>
        <ContentWrapper>
          <ImageWrapper>
            <CoverImage title={title} src={coverImage}/>
          </ImageWrapper>
          <TextContent>
            <FeatureLabel>
              Featured release
            </FeatureLabel>
            <FeatureTitle>
              {title}
            </FeatureTitle>
            <FeatureDescription>
              {description}
            </FeatureDescription>
            <FeatureLink href={linkUrl}>
              {linkText}
            </FeatureLink>
          </TextContent>
        </ContentWrapper>
      </Container>
    </FeatureSection>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=featureRelease.jsx.map