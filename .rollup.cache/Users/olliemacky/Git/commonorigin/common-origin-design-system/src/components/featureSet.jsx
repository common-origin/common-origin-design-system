import { __makeTemplateObject } from "tslib";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Button, Container } from './';
import tokens from '@/styles/tokens.json';
var FeatureSection = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  z-index: ", ";\n"], ["\n  position: relative;\n  z-index: ", ";\n"])), tokens.base.zIndex[1]);
var ContentGrid = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: ", ";\n  margin-top: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    grid-template-columns: 1fr 1fr;\n    gap: ", " ", ";\n\n    & > :nth-child(odd) {\n      margin-bottom: ", ";\n    }\n  }\n"], ["\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: ", ";\n  margin-top: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: 768px) {\n    grid-template-columns: 1fr 1fr;\n    gap: ", " ", ";\n\n    & > :nth-child(odd) {\n      margin-bottom: ", ";\n    }\n  }\n"])), tokens.base.spacing[32], tokens.base.spacing[32], tokens.base.spacing[32], tokens.base.spacing[8], tokens.base.spacing[8], tokens.base.spacing[32]);
var FeatureItem = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var ImageContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), tokens.base.spacing[6]);
var StyledImage = styled(Image)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  border-radius: ", ";\n  box-shadow: ", ";\n"], ["\n  width: 100%;\n  border-radius: ", ";\n  box-shadow: ", ";\n"])), tokens.base.border.radius[6], tokens.base.shadow[6]);
var ContentRow = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: ", ";\n  gap: ", ";\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: ", ";\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: ", ";\n  gap: ", ";\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: ", ";\n  }\n"])), tokens.base.spacing[6], tokens.base.spacing[4], tokens.base.spacing[3]);
var FeatureTitle = styled.h3(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  \n  a {\n    color: inherit;\n    text-decoration: none;\n    transition: text-decoration 0.15s ease;\n    \n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"], ["\n  font-size: ", ";\n  line-height: ", ";\n  color: ", ";\n  \n  a {\n    color: inherit;\n    text-decoration: none;\n    transition: text-decoration 0.15s ease;\n    \n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"])), tokens.base.fontSize[9], tokens.base.lineHeight[3], tokens.semantic.color.text.default);
export var FeatureSet = function (_a) {
    var _b = _a.musicImage, musicImage = _b === void 0 ? '/assets/art/art-desire-path_1.jpg' : _b, _c = _a.artImage, artImage = _c === void 0 ? '/assets/art/art-residual-simulation_1.jpg' : _c;
    return (<FeatureSection>
      <Container>
        <ContentGrid>
          <FeatureItem>
            <ImageContainer>
              <Link href="/music" aria-label="View Common Origin Music">
                <StyledImage src={musicImage} alt="Cover Image for Particles EP" width={400} height={400} placeholder="blur" blurDataURL={musicImage}/>
              </Link>
            </ImageContainer>
            <ContentRow>
              <FeatureTitle>
                <Link href="/music">
                  Music
                </Link>
              </FeatureTitle>
              <Button url="/music" purpose="button">
                Listen to the latest releases
              </Button>
            </ContentRow>
          </FeatureItem>
          <FeatureItem>
            <ImageContainer>
              <Link href="/art" aria-label="View Common Origin Art">
                <StyledImage src={artImage} alt="Image of generative artwork" width={400} height={400} placeholder="blur" blurDataURL={artImage}/>
              </Link>
            </ImageContainer>
            <ContentRow>
              <FeatureTitle>
                <Link href="/art">
                  Artwork
                </Link>
              </FeatureTitle>
              <Button url="/art" purpose="button">
                See the gallery
              </Button>
            </ContentRow>
          </FeatureItem>
        </ContentGrid>
      </Container>
    </FeatureSection>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=featureSet.jsx.map