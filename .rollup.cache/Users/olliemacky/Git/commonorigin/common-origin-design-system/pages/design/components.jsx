import { __makeTemplateObject } from "tslib";
import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import { Box, Breadcrumbs, Button, Chip, CodeBlock, Container, Dropdown, Layout, Navigation, Stack, Typography, } from '../../components';
import { staticComponentsData } from '@/lib/componentsData';
import tokens from '@/styles/tokens.json';
var breakpoint = tokens.base.breakpoint, _a = tokens.semantic, color = _a.color, border = _a.border, spacing = _a.spacing;
var ComponentsLayout = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  min-height: 100vh;\n"], ["\n  display: flex;\n  min-height: 100vh;\n"])));
var Sidebar = styled.nav(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 250px;\n  border-right: ", ";\n  position: sticky;\n  top: 0;\n  margin-top: ", ";\n  height: 100vh;\n  overflow-y: auto;\n  padding: ", " 0;\n  \n  @media (max-width:", ") {\n    display: none;\n  }\n"], ["\n  width: 250px;\n  border-right: ", ";\n  position: sticky;\n  top: 0;\n  margin-top: ", ";\n  height: 100vh;\n  overflow-y: auto;\n  padding: ", " 0;\n  \n  @media (max-width:", ") {\n    display: none;\n  }\n"])), border.default, spacing.layout['xs'], spacing.layout['8xl'], breakpoint.md);
var MobileNavigation = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: none;\n  \n  @media (max-width: ", ") {\n    display: block;\n    padding: ", ";\n    background-color: ", ";\n    border-bottom: ", ";\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n"], ["\n  display: none;\n  \n  @media (max-width: ", ") {\n    display: block;\n    padding: ", ";\n    background-color: ", ";\n    border-bottom: ", ";\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n"])), breakpoint.md, spacing.layout.lg, color.background.subtle, border.default);
var MainContent = styled.main(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex: 1;\n  padding: ", ";\n  overflow-x: auto;\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"], ["\n  flex: 1;\n  padding: ", ";\n  overflow-x: auto;\n  \n  @media (max-width: ", ") {\n    padding: ", ";\n  }\n"])), spacing.layout['2xl'], breakpoint.md, spacing.layout.lg);
var ComponentSection = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  background-color: ", ";\n"], ["\n  margin-bottom: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  background-color: ", ";\n"])), spacing.layout['4xl'], border.subtle, tokens.base.border.radius[4], spacing.layout['2xl'], color.background.subtle);
var ComponentShowcase = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  margin: ", " 0;\n"], ["\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  margin: ", " 0;\n"])), color.background.default, border.subtle, tokens.base.border.radius[3], spacing.layout['2xl'], spacing.layout.lg);
var PropsTable = styled.table(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n  border: ", ";\n  background-color: ", ";\n"], ["\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n  margin-top: ", ";\n  border-radius: ", ";\n  overflow: hidden;\n  border: ", ";\n  background-color: ", ";\n"])), spacing.layout.lg, tokens.base.border.radius[3], border.subtle, color.background.default);
var TableHeader = styled.th(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background-color: ", ";\n  border-bottom: ", ";  \n  padding: ", ";\n  text-align: left;\n  font: ", ";\n  color: ", ";\n  font-weight: 600;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n"], ["\n  background-color: ", ";\n  border-bottom: ", ";  \n  padding: ", ";\n  text-align: left;\n  font: ", ";\n  color: ", ";\n  font-weight: 600;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n"])), color.background.subtle, border.subtle, spacing.layout.md, tokens.semantic.typography.label, color.text.emphasis, border.subtle);
var TableRow = styled.tr(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  &:not(:last-child) td {\n    border-bottom: ", ";\n  }\n"], ["\n  &:not(:last-child) td {\n    border-bottom: ", ";\n  }\n"])), border.subtle);
var TableCell = styled.td(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: ", ";\n  vertical-align: top;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n"], ["\n  padding: ", ";\n  vertical-align: top;\n  \n  &:not(:last-child) {\n    border-right: ", ";\n  }\n"])), spacing.layout.md, border.subtle);
var TokenChip = styled(Chip)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin: ", " ", " 0 0;\n"], ["\n  margin: ", " ", " 0 0;\n"])), spacing.layout.xs, spacing.layout.xs);
var componentsData = staticComponentsData;
export default function Components() {
    var _a = useState('avatar'), activeComponent = _a[0], setActiveComponent = _a[1];
    var activeComponentData = componentsData.find(function (comp) { return comp.id === activeComponent; });
    var handleComponentClick = function (componentId) {
        setActiveComponent(componentId);
    };
    var renderPropsTable = function (props) {
        if (props.length === 0) {
            return <Typography color="subdued" variant="caption">No props available</Typography>;
        }
        return (<PropsTable>
        <thead>
          <tr>
            <TableHeader>Prop</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Default</TableHeader>
            <TableHeader>Required</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
        </thead>
        <tbody>
          {props.map(function (prop) { return (<TableRow key={prop.name}>
              <TableCell>
                <code>{prop.name}</code>
              </TableCell>
              <TableCell>
                <code>{prop.type}</code>
              </TableCell>
              <TableCell>
                {prop.default ? <code>{prop.default}</code> : <Typography variant="caption" color="subdued">—</Typography>}
              </TableCell>
              <TableCell>
                {prop.required ? (<Chip title="Required" variant="default"/>) : (<Typography variant="caption" color="subdued">—</Typography>)}
              </TableCell>
              <TableCell>
                <Typography variant="small" color="subdued">{prop.description}</Typography>
              </TableCell>
            </TableRow>); })}
        </tbody>
      </PropsTable>);
    };
    var renderTokenList = function (tokens) {
        return (<Box mt="sm">
        <Stack direction="column" gap="xs">
          {tokens.map(function (token, index) { return (<TokenChip key={index} title={token} variant="default"/>); })}
        </Stack>
      </Box>);
    };
    var renderAccessibilityInfo = function (accessibility) {
        if (!accessibility) {
            return <Typography color="subdued" variant="caption">No accessibility information available</Typography>;
        }
        return (<Stack direction="column" gap="xl">
        {accessibility.notes && accessibility.notes.length > 0 && (<Box>
            <Box mb="xs">
              <Typography variant="subtitle">General Notes:</Typography>
            </Box>
            <Stack direction="column" gap="xs">
              {accessibility.notes.map(function (note, index) { return (<Typography key={index} variant="small" color="subdued">• {note}</Typography>); })}
            </Stack>
          </Box>)}
        
        {accessibility.keyboardNavigation && (<Box>
            <Box mb="xs">
              <Typography variant="subtitle">Keyboard Navigation:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.keyboardNavigation}</Typography>
          </Box>)}
        
        {accessibility.screenReader && (<Box>
            <Box mb="xs">
              <Typography variant="subtitle">Screen Reader:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.screenReader}</Typography>
          </Box>)}
        
        {accessibility.colorContrast && (<Box>
            <Box mb="xs">
              <Typography variant="subtitle">Color Contrast:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.colorContrast}</Typography>
          </Box>)}
        
        {accessibility.focusManagement && (<Box>
            <Box mb="xs">
              <Typography variant="subtitle">Focus Management:</Typography>
            </Box>
            <Typography variant="small" color="subdued">{accessibility.focusManagement}</Typography>
          </Box>)}
      </Stack>);
    };
    var renderNotes = function (notes) {
        if (!notes || notes.length === 0) {
            return <Typography color="subdued" variant="caption">No additional notes available</Typography>;
        }
        return (<Stack direction="column" gap="xs">
        {notes.map(function (note, index) { return (<Typography key={index} variant="small" color="subdued">• {note}</Typography>); })}
      </Stack>);
    };
    var renderExamples = function (examples) {
        return (<Stack direction="column" gap="4xl">
        {examples.map(function (example, index) { return (<Box key={index} mt="lg">
            <Typography variant="h3">
              {example.name}
            </Typography>
            <Typography variant="small" color="subdued">
              {example.description}
            </Typography>
            <ComponentShowcase>
              {example.renderComponent ? example.renderComponent() : example.component}
            </ComponentShowcase>
            <Typography variant="label">
              Code:
            </Typography>
            <CodeBlock>
              {example.code}
            </CodeBlock>
          </Box>); })}
      </Stack>);
    };
    return (<>
      <Layout>
        <Head>
          <title>Components - Common Origin</title>
        </Head>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Design', url: '/design' }, { label: 'Components', url: '/design/components' }]}/>
        
        <section>
          <Container>
            <MobileNavigation>
              <Dropdown options={componentsData.map(function (comp) { return ({ id: comp.id, label: comp.name }); })} value={activeComponent} onChange={handleComponentClick} placeholder="Select a component"/>
            </MobileNavigation>
            
            <ComponentsLayout>
              <Sidebar>
                <Box px="lg">
                  <Stack direction="column" gap="sm">
                    {componentsData.sort(function (a, b) { return a.name.localeCompare(b.name); }).map(function (comp) { return (<Button key={comp.id} variant={activeComponent === comp.id ? 'primary' : 'secondary'} size="medium" onClick={function () { return handleComponentClick(comp.id); }} style={{ justifyContent: 'flex-start', width: '100%' }}>
                        {comp.name}
                      </Button>); })}
                  </Stack>
                </Box>
              </Sidebar>

              <MainContent>
                {activeComponentData && (<>
                    <Box my="4xl">
                      <Stack gap="sm">
                        <Typography variant="h1">{activeComponentData.name}</Typography>
                        <Chip title={activeComponentData.category} variant="default" size="small"/>
                      </Stack>
                      <Box mt="md">
                        <Typography variant="body" color="emphasis">
                          {activeComponentData.description}
                        </Typography>
                      </Box>
                      <Box mt="lg">
                        
                      </Box>
                    </Box>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h2" color="default">
                          Examples
                        </Typography>
                        {renderExamples(activeComponentData.examples)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Props
                        </Typography>
                        {renderPropsTable(activeComponentData.props)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Design Tokens Used
                        </Typography>
                        {renderTokenList(activeComponentData.tokens)}
                      </Stack>
                    </ComponentSection>

                    <ComponentSection>
                      <Stack gap="md" direction="column">
                        <Typography variant="h3" color="default">
                          Accessibility
                        </Typography>
                        {renderAccessibilityInfo(activeComponentData.accessibility)}
                      </Stack>
                    </ComponentSection>

                    {activeComponentData.notes && activeComponentData.notes.length > 0 && (<ComponentSection>
                        <Stack gap="md" direction="column">
                          <Typography variant="h3" color="default">
                            Additional Notes
                          </Typography>
                          {renderNotes(activeComponentData.notes)}
                        </Stack>
                      </ComponentSection>)}
                  </>)}
              </MainContent>
            </ComponentsLayout>
          </Container>
        </section>
      </Layout>
    </>);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
//# sourceMappingURL=components.jsx.map