import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { Container } from '../../atoms/Container';
import { Stack } from '../../atoms/Stack';
import { Typography } from '../../atoms/Typography';
import tokens from '@/styles/tokens.json';
var spacing = tokens.semantic.spacing, _a = tokens.base, border = _a.border, breakpoint = _a.breakpoint;
var HeroGrid = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: ", ") {\n    margin-bottom: ", ";\n  }\n"], ["\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n  margin-bottom: ", ";\n\n  @media (min-width: ", ") {\n    margin-bottom: ", ";\n  }\n"])), spacing.layout.lg, spacing.layout['4xl'], breakpoint.xl, spacing.layout['10xl']);
var HeroContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  grid-column: span 12;\n  margin: ", " 0;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 5;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 4;\n  }\n"], ["\n  grid-column: span 12;\n  margin: ", " 0;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 5;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 4;\n  }\n"])), spacing.layout.lg, breakpoint.md, breakpoint.lg, breakpoint.xl);
var HeroVideoContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  grid-column: span 12;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 7;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 8;\n  }\n"], ["\n  grid-column: span 12;\n\n  @media (min-width: ", ") {\n    grid-column: span 6;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 7;\n  }\n\n  @media (min-width: ", ") {\n    grid-column: span 8;\n  }\n"])), breakpoint.md, breakpoint.lg, breakpoint.xl);
var HeroVideoStyled = styled.video(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  object-fit: cover;\n  height: 100%;\n  position: absolute;\n  object-position: left;\n"], ["\n  object-fit: cover;\n  height: 100%;\n  position: absolute;\n  object-position: left;\n"])));
var HeroVideoWrapper = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n  height: 50vw;\n  max-height: 768px;\n  margin-top: ", ";\n  overflow: hidden;\n  border-radius: ", ";\n\n  @media (max-width: calc(", " - 1px)) {\n    height: 100vw;\n    border-radius: 0;\n    min-width: calc(100vw + 2px);\n    margin-left: -84px;\n    margin-right: -84px;\n  }\n\n  @media (max-width: calc(", " - 1px)) {\n    margin-left: -", ";\n    margin-right: -", ";\n  }\n"], ["\n  position: relative;\n  height: 50vw;\n  max-height: 768px;\n  margin-top: ", ";\n  overflow: hidden;\n  border-radius: ", ";\n\n  @media (max-width: calc(", " - 1px)) {\n    height: 100vw;\n    border-radius: 0;\n    min-width: calc(100vw + 2px);\n    margin-left: -84px;\n    margin-right: -84px;\n  }\n\n  @media (max-width: calc(", " - 1px)) {\n    margin-left: -", ";\n    margin-right: -", ";\n  }\n"])), spacing.layout.lg, border.radius[5], breakpoint.md, breakpoint.sm, spacing.layout['2xl'], spacing.layout['2xl']);
export var HeroBanner = function (_a) {
    var _b = _a.title, title = _b === void 0 ? "Common Origin" : _b, _c = _a.subtitle, subtitle = _c === void 0 ? "A creative studio" : _c, _d = _a.videoSrc, videoSrc = _d === void 0 ? "./assets/cover/homepage-loop.mp4" : _d;
    return (<Container>
      <HeroGrid role="banner" aria-labelledby="hero-title">
        <HeroContent>
          <Stack direction='column' gap="xl">
            <Stack direction='column' gap="sm">
              <div id="hero-title">
                <Typography variant='display' color='default'>
                  {title}
                </Typography>
              </div>
              <Typography variant='small' color='subdued'>{subtitle}</Typography>
            </Stack>
            <nav role="navigation" aria-label="Explore sections">
              <Stack direction='row' gap="sm">
                <Button variant='secondary' url='/music'>Music</Button>
                <Button variant='secondary' url='/art'>Art</Button>
                <Button variant='secondary' url='/design'>Design</Button>
              </Stack>
            </nav>
          </Stack>
        </HeroContent>
        <HeroVideoContainer>
          <HeroVideoWrapper>
            <HeroVideoStyled autoPlay muted loop playsInline aria-hidden="true" role="presentation">
              <source src={videoSrc} type="video/mp4"/>       
            </HeroVideoStyled>
          </HeroVideoWrapper>
        </HeroVideoContainer>
      </HeroGrid>
    </Container>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=HeroBanner.jsx.map