import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Stack } from '../../atoms/Stack';
import { Typography } from '../../atoms/Typography';
import { DateFormatter } from '../../atoms/DateFormatter';
import tokens from '@/styles/tokens.json';
var ReleaseCardStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  a {\n    text-decoration: none;\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  &:hover {\n    img {\n      opacity: 0.8;\n    }\n  }\n\n  &:focus-within {\n    outline: none;\n    box-shadow: 0 0 0 2px ", ";\n  }\n"], ["\n  a {\n    text-decoration: none;\n  }\n\n  img {\n    border-radius: ", ";\n    transition: ease opacity 0.2s;\n    width: 100%;\n    height: auto;\n    display: block;\n  }\n\n  &:hover {\n    img {\n      opacity: 0.8;\n    }\n  }\n\n  &:focus-within {\n    outline: none;\n    box-shadow: 0 0 0 2px ", ";\n  }\n"])), tokens.base.border.radius[2], tokens.semantic.color.border.strong);
export var ReleaseCard = function (_a) {
    var title = _a.title, coverImage = _a.coverImage, artist = _a.artist, date = _a.date, slug = _a.slug;
    if (!coverImage || !date) {
        return null;
    }
    return (<ReleaseCardStyled>
      <Link href={"/releases/".concat(slug)} aria-label={title}>
        <Stack direction="column" gap='sm'>
          <Image alt={title} src={coverImage} width={300} height={300} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, (max-width: 1280px) 16.66vw, 14.28vw" placeholder="blur" blurDataURL={coverImage} style={{
            width: '100%',
            height: 'auto',
        }}/>
          <Stack direction="column" gap='none'>
            <Typography variant="small">{title}</Typography>
            <Typography variant="label" color="subdued">{artist}</Typography>
            <DateFormatter dateString={date}/>
          </Stack>
        </Stack>
      </Link>
    </ReleaseCardStyled>);
};
var templateObject_1;
//# sourceMappingURL=ReleaseCard.jsx.map