import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { ArtCard } from './molecules/ArtCard';
import { Box } from './atoms/Box';
import { Container } from './atoms/Container';
import { ResponsiveGrid } from './layout/GridSystem';
var Section = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
export var ArtGrid = function (_a) {
    var posts = _a.posts;
    return (<Section>
      <Container>
        <Box mb='8xl'>
          <ResponsiveGrid cols={1} colsMd={2} gapX="8" gapY="12">
            {posts.map(function (post) { return (<ArtCard key={post.slug} title={post.title} tag={post.tag} artist={post.artist} labels={post.labels} coverImage={post.coverImage} excerpt={post.excerpt} slug={post.slug}/>); })}
          </ResponsiveGrid>
        </Box>
      </Container>
    </Section>);
};
var templateObject_1;
//# sourceMappingURL=artGrid.jsx.map