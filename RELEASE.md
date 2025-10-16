# Release Process

## Automated Publishing with GitHub Actions

This repository uses GitHub Actions to automatically publish new versions to NPM when version tags are pushed.

### Prerequisites

1. **NPM Token**: Repository must have `NPM_TOKEN` secret configured
   - Go to: https://github.com/common-origin/common-origin-design-system/settings/secrets/actions
   - Create NPM automation token at: https://www.npmjs.com/settings/tokens
   - Add as repository secret named `NPM_TOKEN`

2. **Organization Permissions**: Your NPM account must have publish permissions to `@common-origin` organization

### Release Process

1. **Update version** in `package.json`:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. **Create and push tag**:
   ```bash
   git push origin main
   git push --tags
   ```

3. **Monitor workflow**:
   - Visit: https://github.com/common-origin/common-origin-design-system/actions
   - Check the "📦 Publish Package" workflow

### Manual Publishing (Fallback)

If automated publishing fails, you can publish manually:

```bash
npm run build:tokens
npm run build:package
npm publish --access public
```

### Package Information

- **NPM Package**: `@common-origin/design-system`
- **Current Version**: 1.1.0
- **NPM URL**: https://www.npmjs.com/package/@common-origin/design-system

### Installation

```bash
npm install @common-origin/design-system
```

### Usage

```tsx
import { Button, Typography, Stack } from '@common-origin/design-system'

export function MyComponent() {
  return (
    <Stack direction="column" spacing="md">
      <Typography variant="heading1">Hello World</Typography>
      <Button variant="primary" size="md">Click me</Button>
    </Stack>
  )
}
```