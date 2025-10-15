import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Button, SectionSeparator } from '.';
import tokens from '@/styles/tokens.json';
var spacing = tokens.base.spacing;
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  max-width: ", ";\n  margin: 0 auto;\n"], ["\n  max-width: ", ";\n  margin: 0 auto;\n"])), function (props) { return props.$maxWidth || '64rem'; });
var GridContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n"], ["\n  margin: 0 auto;\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: ", ";\n"])), spacing[8]);
var GridContent = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 9 / 13;\n    grid-column-start: 4;\n  }\n"], ["\n  grid-column: span 12;\n  \n  @media (min-width: 1280px) {\n    grid-column: span 9 / 13;\n    grid-column-start: 4;\n  }\n"])));
export var PostBody = function (_a) {
    var content = _a.content, tag = _a.tag;
    if (tag === 'portfolio') {
        return (<Container $maxWidth="64rem">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
        <SectionSeparator />
        <Button purpose='link' url='/portfolio'>
          Back to Portfolio
        </Button>
      </Container>);
    }
    else if (tag === 'design') {
        return (<Container $maxWidth="64rem">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
        <SectionSeparator />
        <Button purpose='link' url='/design'>
          Back to all Design
        </Button>
      </Container>);
    }
    else if (tag === 'art') {
        return (<GridContainer>
        <GridContent className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
      </GridContainer>);
    }
    else if (tag === 'release') {
        return (<Container $maxWidth="48rem">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
      </Container>);
    }
    else {
        return (<Container $maxWidth="64rem">
        <div className="markdown" dangerouslySetInnerHTML={{ __html: content }}/>
      </Container>);
    }
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=postBody.jsx.map