import { __makeTemplateObject } from "tslib";
import styled from 'styled-components';
import { Chip } from '../../atoms/Chip';
import { CoverImage } from '../../atoms/CoverImage';
import { Stack } from '../../atoms/Stack';
import { Typography } from '../../atoms/Typography';
import tokens from '@/styles/tokens.json';
var border = tokens.base.border;
var ArtCardStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: 768px;\n\n  a {\n    text-decoration: none;\n  }\n\n  &:hover {\n    img {\n      opacity: 0.8;\n    }\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n    width: 100%;\n  }\n"], ["\n  max-width: 768px;\n\n  a {\n    text-decoration: none;\n  }\n\n  &:hover {\n    img {\n      opacity: 0.8;\n    }\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n    width: 100%;\n  }\n"])), border.radius[6]);
export var ArtCard = function (_a) {
    var title = _a.title, excerpt = _a.excerpt, tag = _a.tag, artist = _a.artist, labels = _a.labels, coverImage = _a.coverImage, slug = _a.slug;
    if (tag === 'art') {
        return (<>
        <ArtCardStyled title={title} excerpt={excerpt} tag={tag} labels={labels} artist={artist} coverImage={coverImage}>
          <Stack direction="column" gap="md">
            <CoverImage title={title} src={coverImage} slug={slug}/>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap="xs">
              <Stack direction="column" gap="xs">
                <Typography variant="h6">{title}</Typography>
                <Typography variant="small" color="subdued">{artist}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="xs">
                {Array.isArray(labels) && labels.map(function (label, index) { return (<Chip key={index} title={label} variant="default"/>); })}
              </Stack>
            </Stack>
          </Stack>
        </ArtCardStyled>
      </>);
    }
    return null;
};
var templateObject_1;
//# sourceMappingURL=ArtCard.jsx.map