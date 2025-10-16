import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import { Meta } from './meta';
import { ComponentErrorBoundary } from './ErrorBoundaries';
import { Footer } from './organisms/Footer';
var LayoutContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 100vh;\n"], ["\n  min-height: 100vh;\n"])));
var Main = styled.main(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
export var Layout = function (_a) {
    var children = _a.children;
    return (<>
      <Meta />
      <LayoutContainer>
        <Main>{children}</Main>
      </LayoutContainer>
      <ComponentErrorBoundary componentName="Footer">
        <Footer />
      </ComponentErrorBoundary>
    </>);
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=PageLayout.jsx.map