# Component documentation types

`types.ts` defines `ComponentDocumentation`, the shape of every component's `.docs.tsx` file. The docs site (`pages/components.tsx`) renders these objects after `src/lib/componentsData.ts` registers them.

Props, tokens, examples, accessibility and anatomy are all written by hand in each `.docs.tsx`. Nothing is extracted from the TypeScript source, so when you change a component's props, update its `.docs.tsx` in the same change.

`propExtractor.ts`, `generator.ts` and `index.ts` are an unused ts-morph prop extractor. Nothing imports them, and removing them is tracked in [#39](https://github.com/common-origin/common-origin-design-system/issues/39). Generated prop tables are being considered in [#41](https://github.com/common-origin/common-origin-design-system/issues/41).

## Adding docs for a component

1. Create `Name.docs.tsx` next to the component, exporting a `ComponentDocumentation`:

   ```tsx
   import { ComponentDocumentation } from '../../../lib/docgen/types'
   import { Name } from './Name'

   export const nameDocs: ComponentDocumentation = {
     id: 'name',            // kebab-case; used in the docs-site URL
     name: 'Name',
     description: '…',
     category: 'Atoms',     // or 'Molecules', 'Layout'
     parentId: 'parent-id', // optional: nests the page under another, e.g. ListItem under List
     props: [/* every public prop, with real names, types and defaults */],
     tokens: [/* exact token paths the component uses */],
     examples: [/* code plus renderComponent */],
     accessibility: { notes: [/* … */] },
     anatomy: { description: '…', parts: [/* … */] }
   }
   ```

2. Register it in `src/lib/componentsData.ts`: import it, and add `convertDocumentationToLegacyFormat(nameDocs)` to `staticComponentsData`.
