import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Button, CoverImage, PageTitle, Stack, TrackItem } from './';
import tokens from '../styles/tokens.json';
var spacing = tokens.base.spacing;
var GridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", " ", ";\n"], ["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", " ", ";\n"])), spacing[8], spacing[8]);
var ContentColumn = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  grid-column: span 12;\n\n  @media (min-width: 1024px) {\n    grid-column: span 6;\n  }\n\n  @media (min-width: 1280px) {\n    grid-column: span 5;\n  }\n"], ["\n  grid-column: span 12;\n\n  @media (min-width: 1024px) {\n    grid-column: span 6;\n  }\n\n  @media (min-width: 1280px) {\n    grid-column: span 5;\n  }\n"])));
var ImageColumn = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  grid-column: span 12;\n\n  @media (min-width: 1024px) {\n    grid-column: span 6;\n  }\n\n  @media (min-width: 1280px) {\n    grid-column: span 7;\n  }\n"], ["\n  grid-column: span 12;\n\n  @media (min-width: 1024px) {\n    grid-column: span 6;\n  }\n\n  @media (min-width: 1280px) {\n    grid-column: span 7;\n  }\n"])));
var RecordCoverWrapper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n\n  @media (max-width: 640px) {\n    height: 100%;\n    border-radius: 0;\n    min-width: 100vw;\n    margin-left: -", ";\n    margin-right: -", ";\n  }\n"], ["\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n\n  @media (max-width: 640px) {\n    height: 100%;\n    border-radius: 0;\n    min-width: 100vw;\n    margin-left: -", ";\n    margin-right: -", ";\n  }\n"])), spacing[4], tokens.base.border.radius[6], spacing[6], spacing[6]);
var ContentWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-top: ", ";\n"], ["\n  margin-top: ", ";\n"])), spacing[4]);
export var ReleaseHeader = function (_a) {
    var title = _a.title, recordLabel = _a.recordLabel, coverImage = _a.coverImage, link = _a.link, artist = _a.artist, tracks = _a.tracks, content = _a.content;
    var subtitleString = "".concat(artist, " | ").concat(recordLabel);
    return (<GridContainer>
      <ContentColumn>
        <PageTitle title={title} subtitle={subtitleString}/>
        <Stack direction='column' gap="xs">
          {tracks.map(function (track) { return (<TrackItem track={track} key={track.id}/>); })}
        </Stack>
        <ContentWrapper>
          <Stack direction='column' gap="lg">
            <div className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
            <Button url={link} purpose='link' target='_blank' style={{ width: 'max-content' }}>
              Get this release
            </Button>
          </Stack>
        </ContentWrapper>
      </ContentColumn>
      <ImageColumn>
        <RecordCoverWrapper>
          <CoverImage title={title} src={coverImage}/>
        </RecordCoverWrapper>
      </ImageColumn>
    </GridContainer>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=releaseHeader.jsx.map