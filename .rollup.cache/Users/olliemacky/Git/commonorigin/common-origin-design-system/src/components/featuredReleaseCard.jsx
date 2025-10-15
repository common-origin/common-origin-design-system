import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Chip, Stack, Typography } from './';
import tokens from '@/styles/tokens.json';
var CardContainer = styled(Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  border-radius: ", ";\n  background-color: ", ";\n  overflow: hidden;\n  transition: ", ";\n  text-decoration: none;\n  box-shadow: ", ";\n\n  @media (min-width: 640px) {\n    flex-direction: row;\n    height: 200px;\n  }\n\n  &:hover {\n    background-color: ", ";\n    box-shadow: ", ";\n    transform: translateY(-2px);\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  border-radius: ", ";\n  background-color: ", ";\n  overflow: hidden;\n  transition: ", ";\n  text-decoration: none;\n  box-shadow: ", ";\n\n  @media (min-width: 640px) {\n    flex-direction: row;\n    height: 200px;\n  }\n\n  &:hover {\n    background-color: ", ";\n    box-shadow: ", ";\n    transform: translateY(-2px);\n  }\n"])), tokens.base.border.radius[3], tokens.semantic.color.background.surface, tokens.semantic.motion.transition.normal, tokens.base.shadow[3], tokens.semantic.color.background.default, tokens.base.shadow[4]);
var ImageContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  flex-shrink: 0;\n  width: 100%;\n  height: 200px;\n  \n  @media (min-width: 640px) {\n    width: 200px;\n    height: 100%;\n  }\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n"], ["\n  position: relative;\n  flex-shrink: 0;\n  width: 100%;\n  height: 200px;\n  \n  @media (min-width: 640px) {\n    width: 200px;\n    height: 100%;\n  }\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n  }\n"])));
var ContentWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex: 1;\n  padding: ", ";\n\n  h5 {\n    color: ", ";\n  }\n\n  p {\n    color: ", ";\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex: 1;\n  padding: ", ";\n\n  h5 {\n    color: ", ";\n  }\n\n  p {\n    color: ", ";\n  }\n"])), tokens.semantic.spacing.layout.lg, tokens.semantic.color.text.default, tokens.semantic.color.text.subdued);
export var FeaturedReleaseCard = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Release name' : _b, _c = _a.recordLabel, recordLabel = _c === void 0 ? 'Record label' : _c, _d = _a.artistName, artistName = _d === void 0 ? 'Artist name' : _d, featuredChip = _a.featuredChip, image = _a.image, _e = _a.releaseUrl, releaseUrl = _e === void 0 ? '#' : _e;
    return (<CardContainer href={releaseUrl}>
      <ImageContainer>
        <Image src={image} alt={"Album cover for ".concat(title)} fill sizes="(max-width: 640px) 100vw, 200px" style={{ objectFit: 'cover' }} placeholder="blur" blurDataURL={image}/>
      </ImageContainer>
      <ContentWrapper>
        <Stack direction="column" gap="sm">
          {featuredChip && (<Chip title={featuredChip} variant="dark"/>)}
          <Stack direction="column" gap="xs">
            <Typography variant="h5">{title}</Typography>
            <Typography variant="caption">{recordLabel}</Typography>
            {artistName && (<Typography variant="small">{artistName}</Typography>)}
          </Stack>
        </Stack>
      </ContentWrapper>
    </CardContainer>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=featuredReleaseCard.jsx.map