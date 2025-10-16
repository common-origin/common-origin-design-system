import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Stack, Typography } from './';
import tokens from '@/styles/tokens.json';
var MoreReleaseCardStyled = styled(Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  border-radius: ", ";\n  background-color: ", ";\n  transition: background-color 0.15s ease;\n  text-decoration: none;\n  color: inherit;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  display: flex;\n  width: 100%;\n  flex-direction: row;\n  border-radius: ", ";\n  background-color: ", ";\n  transition: background-color 0.15s ease;\n  text-decoration: none;\n  color: inherit;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), tokens.base.border.radius[3], tokens.semantic.color.background.default, tokens.base.color.neutral[300]);
var ReleaseImage = styled(Image)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  border-radius: ", ";\n  margin-right: ", ";\n  flex-shrink: 0;\n"], ["\n  border-radius: ", ";\n  margin-right: ", ";\n  flex-shrink: 0;\n"])), tokens.base.border.radius[2], tokens.base.spacing[4]);
export var MoreReleaseCard = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'Release name' : _b, _c = _a.artistName, artistName = _c === void 0 ? 'Artist name' : _c, image = _a.image, releaseUrl = _a.releaseUrl;
    // Use design token for image size - spacing[10] = 8rem = 128px is close to original 96px
    // Or use a more appropriate size like spacing[9] = 6rem = 96px
    var imageSize = 96; // Keep original size for now, could be tokens.base.spacing[9] converted to pixels
    return (<MoreReleaseCardStyled href={releaseUrl || '#'}>
      <ReleaseImage src={image} alt={title} width={imageSize} height={imageSize} placeholder="blur" blurDataURL={image}/>
      <Stack direction="column" gap="xs" justifyContent='center'>
        <Typography variant="subtitle">{title}</Typography>
        <Typography variant="small" color="subdued">{artistName}</Typography>
      </Stack>
    </MoreReleaseCardStyled>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=moreReleaseCard.jsx.map