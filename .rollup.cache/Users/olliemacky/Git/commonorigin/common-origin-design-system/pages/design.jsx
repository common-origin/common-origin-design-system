import { __awaiter, __generator, __makeTemplateObject } from "tslib";
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { Box, Breadcrumbs, Container, DesignGrid, Grid, GridCol, Icon, Layout, Navigation, SectionSeparator, Stack, Typography, } from '../components';
import tokens from '@/styles/tokens.json';
var breakpoint = tokens.base.breakpoint, _a = tokens.semantic, color = _a.color, spacing = _a.spacing;
var DesignSystemCard = styled(Link)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  text-decoration: none;\n  transition: ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"], ["\n  display: block;\n  background-color: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  text-decoration: none;\n  transition: ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"])), color.background.emphasis, tokens.base.border.radius[4], spacing.layout['2xl'], tokens.semantic.motion.hover, tokens.component.button.hover.backgroundColor, breakpoint.md, spacing.layout.lg);
export default function Design(_a) {
    var allPosts = _a.allPosts;
    var morePosts = allPosts;
    return (<>
      <Layout>
        <Head>
          <title>{"Common Origin website"}</title>
        </Head>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Design', url: '/design' }]}/>
        <section>
          <Container>
            <Box my="4xl">
              <Typography variant="h1">Design</Typography>
            </Box>
            <SectionSeparator />
            <Box bg="surface" p='2xl' borderRadius='4'>              
              <Grid cols={3} gap="6">
                <GridCol span={3} spanMd={1}>
                  <Typography variant="h2">Common Origin</Typography>
                  <Typography variant="h4" color="subdued">Design System</Typography>
                </GridCol>
                <GridCol span={3} spanMd={1}>
                  <DesignSystemCard href="/design/components">
                    <Stack direction="row" gap="sm" alignItems="center" justifyContent="space-between">
                      <Typography color="inverse" variant="h4">Components</Typography>
                      <Icon name="directionRight" size="xl"/>
                    </Stack>
                  </DesignSystemCard>
                </GridCol>
                
                <GridCol span={3} spanMd={1}>
                  <DesignSystemCard href="/design/tokens">
                    <Stack direction="row" gap="sm" alignItems="center" justifyContent="space-between">
                      <Typography color="inverse" variant="h4">Design tokens</Typography>
                      <Icon name="directionRight" size="xl"/>
                    </Stack>
                  </DesignSystemCard>
                </GridCol>
                
              </Grid>
            </Box>
          </Container>
        </section>
        <SectionSeparator />
        {morePosts.length > 0 && <DesignGrid posts={morePosts}/>}
      </Layout>
    </>);
}
export var getStaticProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts;
    return __generator(this, function (_a) {
        allPosts = getAllPosts([
            'title',
            'labels',
            'tag',
            'date',
            'slug',
            'author',
            'coverImage',
            'excerpt',
        ]);
        return [2 /*return*/, {
                props: { allPosts: allPosts },
            }];
    });
}); };
var templateObject_1;
//# sourceMappingURL=design.jsx.map