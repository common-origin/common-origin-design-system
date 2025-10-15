import { __makeTemplateObject } from "tslib";
import styled from 'styled-components';
import { MoreReleaseCard, Typography, Stack } from './';
import tokens from '@/styles/tokens.json';
var spacing = tokens.base.spacing;
var ContainerStyled = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: ", ";\n  background-color: ", ";\n  height: 100%;\n"], ["\n  padding: ", ";\n  background-color: ", ";\n  height: 100%;\n"])), spacing[4], tokens.semantic.color.background.surface);
export var ReleaseBody = function (_a) {
    var title = _a.title, coverImage = _a.coverImage, artist = _a.artist, slug = _a.slug;
    return (<ContainerStyled>
      <Stack direction='column' gap="md">
        <Typography variant='h5'>More releases</Typography>
        <MoreReleaseCard key={slug} title={title} artistName={artist} image={coverImage} releaseUrl={"/releases/".concat(slug)}/>
        <MoreReleaseCard key={slug} title={title} artistName={artist} image={coverImage} releaseUrl={"/releases/".concat(slug)}/>
        <MoreReleaseCard key={slug} title={title} artistName={artist} image={coverImage} releaseUrl={"/releases/".concat(slug)}/>
      </Stack>
    </ContainerStyled>);
};
var templateObject_1;
//# sourceMappingURL=releaseBody.jsx.map