import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Box, Container, PortfolioCard, ResponsiveGrid, Typography } from './';
import tokens from '@/styles/tokens.json';
var layout = tokens.semantic.spacing.layout;
var PortfolioGridSection = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  /* Section wrapper */\n"], ["\n  /* Section wrapper */\n"])));
var TitleWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: ", " 0;\n"], ["\n  margin: ", " 0;\n"])), layout['2xl']);
export var PortfolioGrid = function (_a) {
    var posts = _a.posts;
    return (<PortfolioGridSection>
      <Container>
        <TitleWrapper>
          <Typography variant="h2">Recent work</Typography>
        </TitleWrapper>
        <Box mb='8xl'>
          <ResponsiveGrid cols={1} colsMd={2} colsXl={3} gapX="8" gapY="12">
            {posts.map(function (post) { return (<PortfolioCard key={post.slug} title={post.title} tag={post.tag} labels={post.labels} coverImage={post.coverImage} slug={post.slug} excerpt={post.excerpt}/>); })}
          </ResponsiveGrid>
        </Box>
      </Container>
    </PortfolioGridSection>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=portfolioGrid.jsx.map