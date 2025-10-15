import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { FeaturedReleaseCard } from './';
import tokens from '@/styles/tokens.json';
var Container = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: ", ";\n"], ["\n  margin-top: ", ";\n"])), tokens.base.spacing[4]);
var FilterMessage = styled.p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  color: ", ";\n  font-size: ", ";\n  font-style: italic;\n"], ["\n  margin-bottom: ", ";\n  color: ", ";\n  font-size: ", ";\n  font-style: italic;\n"])), tokens.base.spacing[6], tokens.semantic.color.text.subdued, tokens.base.fontSize[2]);
var ReleaseGrid = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n\n  @media (min-width: 768px) {\n    gap: ", ";\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: ", ";\n\n  @media (min-width: 768px) {\n    gap: ", ";\n  }\n"])), tokens.base.spacing[4], tokens.base.spacing[6]);
export var FilterReleaseList = function (_a) {
    var releases = _a.releases, _b = _a.showFilterMessage, showFilterMessage = _b === void 0 ? false : _b;
    var hasReleases = releases && releases.length > 0;
    return (<Container>
      {showFilterMessage && (<FilterMessage>
          {hasReleases
                ? "Showing ".concat(releases.length, " release").concat(releases.length !== 1 ? 's' : '')
                : 'No releases found matching your criteria'}
        </FilterMessage>)}
      
      {hasReleases ? (<ReleaseGrid>
          {releases.map(function (release, index) { return (<FeaturedReleaseCard key={release.slug} title={release.title} artistName={release.artist} image={release.coverImage} recordLabel={release.recordLabel} featuredChip={index === 0 ? 'Latest' : 'Featured'} releaseUrl={"/releases/".concat(release.slug)}/>); })}
        </ReleaseGrid>) : !showFilterMessage && (<FilterMessage>
          No releases available
        </FilterMessage>)}
    </Container>);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=filterReleaseList.jsx.map