import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Avatar, Button, ChipGroup, CoverImage, DateFormatter, PostTitle, Stack, Typography } from './';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, border = _a.border;
var HeaderContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin: ", ";\n  max-width: ", ";\n  margin-left: auto;\n  margin-right: auto;\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"], ["\n  margin: ", ";\n  max-width: ", ";\n  margin-left: auto;\n  margin-right: auto;\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"])), function (props) { return props.$margin || "".concat(spacing[8], " 0"); }, function (props) { return props.$maxWidth || '64rem'; }, spacing[4]);
var DesignHeaderContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: ", " 0;\n  max-width: 64rem;\n  margin-left: auto;\n  margin-right: auto;\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"], ["\n  margin: ", " 0;\n  max-width: 64rem;\n  margin-left: auto;\n  margin-right: auto;\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n"])), spacing[8], spacing[16]);
var ArtHeaderContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-top: ", ";\n  margin-left: auto;\n  margin-right: auto;\n"], ["\n  margin-top: ", ";\n  margin-left: auto;\n  margin-right: auto;\n"])), spacing[8]);
var ArtGrid = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n"], ["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n"])), spacing[8]);
var ArtSidebar = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 3;\n    position: fixed;\n  }\n"], ["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 3;\n    position: fixed;\n  }\n"])));
var ArtMainContent = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 9 / 13;\n    grid-column-start: 4;\n  }\n"], ["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 9 / 13;\n    grid-column-start: 4;\n  }\n"])));
var ContentWrapper = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  max-width: 300px;\n"], ["\n  max-width: 300px;\n"])));
var ImageWrapper = styled.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  border-radius: ", ";\n  overflow: hidden;\n  margin-top: ", ";\n"], ["\n  border-radius: ", ";\n  overflow: hidden;\n  margin-top: ", ";\n"])), border.radius[6], function (props) { return props.$marginTop || '0'; });
var DefaultHeaderContainer = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n  \n  @media (min-width: 640px) {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"], ["\n  margin-bottom: ", ";\n  \n  @media (min-width: 768px) {\n    margin-bottom: ", ";\n  }\n  \n  @media (min-width: 640px) {\n    margin-left: 0;\n    margin-right: 0;\n  }\n"])), spacing[8], spacing[16]);
export var PostHeader = function (_a) {
    var title = _a.title, excerpt = _a.excerpt, author = _a.author, date = _a.date, tag = _a.tag, coverImage = _a.coverImage, labels = _a.labels;
    if (tag === 'portfolio') {
        return (<HeaderContainer>
        <Button variant='secondary' purpose='link' url='/portfolio'>
            Back to Portfolio
        </Button>
        <PostTitle>{title}</PostTitle>
        <Stack direction="column" gap="lg">
          <ChipGroup labels={labels}/>
          <ImageWrapper>
            <CoverImage title={title} src={coverImage}/>
          </ImageWrapper>
        </Stack>
      </HeaderContainer>);
    }
    else if (tag === 'design') {
        return (<DesignHeaderContainer>
        <Button variant='secondary' purpose='link' url='/design'>
            Back to all Design
        </Button>
        <PostTitle>{title}</PostTitle>
        <Stack direction="column">
          <Stack direction="row" alignItems="center" gap="sm">
            <Avatar name={author.name} picture={author.picture}/>
            <Typography variant="small"> | </Typography>
            <DateFormatter dateString={date}/>
          </Stack>
          <ChipGroup labels={labels}/>
        </Stack>
        <ImageWrapper $marginTop={spacing[8]}>
          <CoverImage title={title} src={coverImage}/>
        </ImageWrapper>
      </DesignHeaderContainer>);
    }
    else if (tag === 'art') {
        return (<ArtHeaderContainer>
        <ArtGrid>
          <ArtSidebar>
            <ContentWrapper>
              <Button variant='secondary' purpose='link' url='/art'>
                  Back to all Art
              </Button>
              <PostTitle>{title}</PostTitle>
              <Stack direction="column" gap="md">
                <DateFormatter dateString={date}/>
                <Typography variant="body" color="subdued">{excerpt}</Typography>
                <Stack direction="column">
                  <ChipGroup labels={labels}/>
                </Stack>
              </Stack>
            </ContentWrapper>
          </ArtSidebar>
          <ArtMainContent>
            <ImageWrapper>
              <CoverImage title={title} src={coverImage}/>
            </ImageWrapper>
          </ArtMainContent>
        </ArtGrid>
      </ArtHeaderContainer>);
    }
    else {
        return (<DefaultHeaderContainer>
        <PostTitle>{title}</PostTitle>
        <CoverImage title={title} src={coverImage}/>
      </DefaultHeaderContainer>);
    }
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=postHeader.jsx.map