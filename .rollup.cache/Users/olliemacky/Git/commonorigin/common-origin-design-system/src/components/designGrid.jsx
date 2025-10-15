import React from 'react';
import { Container, DesignCard, ResponsiveGrid } from '@/components';
export var DesignGrid = function (_a) {
    var posts = _a.posts;
    return (<section>
      <Container>
        <ResponsiveGrid cols={1}>
          {posts.map(function (post) { return (<DesignCard key={post.slug} title={post.title} tag={post.tag} labels={post.labels} coverImage={post.coverImage} date={post.date} slug={post.slug} excerpt={post.excerpt}/>); })}
        </ResponsiveGrid>
      </Container>
    </section>);
};
//# sourceMappingURL=designGrid.jsx.map