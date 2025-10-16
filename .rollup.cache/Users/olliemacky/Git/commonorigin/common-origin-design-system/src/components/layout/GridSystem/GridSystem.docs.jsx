import React from 'react';
import { Grid, GridCol, ResponsiveGrid } from './GridSystem';
import { Typography } from '@/components';
export var gridSystemDocs = {
    id: 'grid-system',
    name: 'GridSystem',
    description: 'Flexible, responsive CSS Grid layout utilities for building complex layouts. Includes Grid, GridCol, and ResponsiveGrid components for systematic layout design.',
    category: 'Layout',
    props: [
        // Grid
        { name: 'cols', type: 'number', required: false, description: 'Number of columns in the grid (default: 12)' },
        { name: 'gap', type: 'SpacingToken', required: false, description: 'Gap between grid items (uses spacing tokens)' },
        { name: 'gapX', type: 'SpacingToken', required: false, description: 'Horizontal gap between columns' },
        { name: 'gapY', type: 'SpacingToken', required: false, description: 'Vertical gap between rows' },
        // GridCol
        { name: 'span', type: 'number', required: false, description: 'Number of columns to span' },
        { name: 'spanSm', type: 'number', required: false, description: 'Columns to span at sm breakpoint' },
        { name: 'spanMd', type: 'number', required: false, description: 'Columns to span at md breakpoint' },
        { name: 'spanLg', type: 'number', required: false, description: 'Columns to span at lg breakpoint' },
        { name: 'spanXl', type: 'number', required: false, description: 'Columns to span at xl breakpoint' },
        { name: 'order', type: 'number', required: false, description: 'Order of the column' },
        // ResponsiveGrid
        { name: 'colsSm', type: 'number', required: false, description: 'Columns at sm breakpoint' },
        { name: 'colsMd', type: 'number', required: false, description: 'Columns at md breakpoint' },
        { name: 'colsLg', type: 'number', required: false, description: 'Columns at lg breakpoint' },
        { name: 'colsXl', type: 'number', required: false, description: 'Columns at xl breakpoint' },
        // Flex
        { name: 'gapYLg', type: 'SpacingToken', required: false, description: 'Vertical gap between rows at lg breakpoint' },
        { name: 'gapYXl', type: 'SpacingToken', required: false, description: 'Vertical gap between rows at xl breakpoint' },
        { name: 'className', type: 'string', required: false, description: 'Custom className for styling' },
        { name: 'children', type: 'React.ReactNode', required: true, description: 'Child nodes' }
    ],
    tokens: [
        'base.spacing.*',
        'base.breakpoint.*',
        'base.border.radius.*',
        'semantic.color.background.*',
        'semantic.color.border.*'
    ],
    examples: [
        {
            name: 'Basic Grid',
            description: 'A 12-column grid with two columns.',
            code: "<Grid cols={12} gap=\"4\">\n  <GridCol span={6}><Typography>Left</Typography></GridCol>\n  <GridCol span={6}><Typography>Right</Typography></GridCol>\n</Grid>",
            renderComponent: function () { return (<Grid cols={12} gap="4">
          <GridCol span={6}><Typography>Left</Typography></GridCol>
          <GridCol span={6}><Typography>Right</Typography></GridCol>
        </Grid>); }
        },
        {
            name: 'Responsive Grid',
            description: 'Grid with different columns at breakpoints.',
            code: "<ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap=\"4\">\n  <div><Typography>Item 1</Typography></div>\n  <div><Typography>Item 2</Typography></div>\n  <div><Typography>Item 3</Typography></div>\n</ResponsiveGrid>",
            renderComponent: function () { return (<ResponsiveGrid cols={1} colsMd={2} colsXl={3} gap="4">
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 1</Typography></div>
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 2</Typography></div>
          <div style={{ background: '#e9ecef', padding: 16 }}><Typography>Item 3</Typography></div>
        </ResponsiveGrid>); }
        },
        {
            name: 'Complex Grid Layout',
            description: 'Advanced grid with mixed column spans and responsive behavior.',
            code: "<Grid cols={12} gap=\"4\">\n  <GridCol span={12} spanMd={8} spanLg={9}>\n    <Typography variant=\"h3\">Main Content</Typography>\n    <div style={{ marginTop: '1rem' }}>\n      <Grid cols={6} gap=\"2\">\n        <GridCol span={2}>\n          <Typography variant=\"caption\">Sub 1</Typography>\n        </GridCol>\n        <GridCol span={2}>\n          <Typography variant=\"caption\">Sub 2</Typography>\n        </GridCol>\n        <GridCol span={2}>\n          <Typography variant=\"caption\">Sub 3</Typography>\n        </GridCol>\n        <GridCol span={3}>\n          <Typography variant=\"caption\">Sub 4</Typography>\n        </GridCol>\n        <GridCol span={3}>\n          <Typography variant=\"caption\">Sub 5</Typography>\n        </GridCol>\n      </Grid>\n    </div>\n  </GridCol>\n  <GridCol span={12} spanMd={4} spanLg={3}>\n    <Typography variant=\"body\">Sidebar</Typography>\n  </GridCol>\n  <GridCol span={6} spanMd={4}>\n    <Typography variant=\"body\">Card 1</Typography>\n  </GridCol>\n  <GridCol span={6} spanMd={4}>\n    <Typography variant=\"body\">Card 2</Typography>\n  </GridCol>\n  <GridCol span={12} spanMd={4}>\n    <Typography variant=\"body\">Card 3</Typography>\n  </GridCol>\n  <GridCol span={12}>\n    <Typography variant=\"body\">Footer Content</Typography>\n  </GridCol>\n</Grid>",
            renderComponent: function () { return (<Grid cols={12} gap="4">
          <GridCol span={12} spanMd={8} spanLg={9}>
            <div style={{ background: '#007bff', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="h3">Main Content</Typography>
              <div style={{ marginTop: '1rem' }}>
                <Grid cols={6} gap="2">
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 1</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 2</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={2}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 3</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={3}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 4</Typography>
                    </div>
                  </GridCol>
                  <GridCol span={3}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 2 }}>
                      <Typography variant="caption">Sub 5</Typography>
                    </div>
                  </GridCol>
                </Grid>
              </div>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={4} spanLg={3}>
            <div style={{ background: '#6c757d', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Sidebar</Typography>
            </div>
          </GridCol>
          <GridCol span={6} spanMd={4}>
            <div style={{ background: '#28a745', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 1</Typography>
            </div>
          </GridCol>
          <GridCol span={6} spanMd={4}>
            <div style={{ background: '#ffc107', color: 'black', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 2</Typography>
            </div>
          </GridCol>
          <GridCol span={12} spanMd={4}>
            <div style={{ background: '#dc3545', color: 'white', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Card 3</Typography>
            </div>
          </GridCol>
          <GridCol span={12}>
            <div style={{ background: '#e9ecef', padding: 16, borderRadius: 4 }}>
              <Typography variant="body">Footer Content</Typography>
            </div>
          </GridCol>
        </Grid>); }
        }
    ],
    accessibility: {
        notes: [
            'Grid layouts are purely presentational and do not affect accessibility tree.',
            'Ensure semantic HTML structure for content inside grid containers.'
        ]
    },
    notes: [
        'GridSystem provides CSS Grid-based layout utilities for responsive design.',
        'Use ResponsiveGrid for breakpoint-based layouts similar to Tailwind CSS patterns.',
        'All spacing and breakpoints are tokenized for design consistency.',
        'For flexbox layouts, use the Stack component from the atoms collection.'
    ]
};
//# sourceMappingURL=GridSystem.docs.jsx.map