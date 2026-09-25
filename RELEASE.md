# Release Process

## Automated Publishing with GitHub Actions

This repository uses GitHub Actions to automatically publish new versions to NPM when version tags are pushed.

### Prerequisites

Publishing uses **npm Trusted Publishing** — the publish workflow uses no npm token. npm trusts `.github/workflows/publish.yml` in this repository and authenticates each run with a short-lived GitHub OIDC token; provenance attestations are generated automatically.

- Configured on npmjs.com: `@common-origin/design-system` → Settings → Trusted Publisher → GitHub Actions (`common-origin` / `common-origin-design-system` / `publish.yml`).
- The workflow needs `permissions: id-token: write` and npm ≥ 11.5.1 (it upgrades npm itself).
- Renaming `publish.yml` breaks publishing until the trusted publisher is re-created on npmjs.com (connections can't be edited).


### Changelog Automation

After each release/tag is pushed, GitHub Actions automatically generates and commits the latest `CHANGELOG.md` to the repository. The releases page and documentation site will always display up-to-date release information from this file. Manual changelog updates can be performed with:

```bash
npx auto-changelog -o CHANGELOG.md
git add CHANGELOG.md
git commit -m "chore: update changelog manually"
git push
```

### Release Process

`main` is protected, so the version bump goes through a pull request.

1. **Bump the version on a branch and open a PR**:
   ```bash
   git switch -c chore/release-X.Y.Z main
   npm version patch --no-git-tag-version  # or minor / major
   git commit -am "chore: bump version to X.Y.Z"
   git push -u origin chore/release-X.Y.Z
   ```
   Merge once CI is green and Copilot review comments are addressed.

2. **Tag the merge commit on `main`**:
   ```bash
   git switch main && git pull
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```
   The tag must equal `v` + the `package.json` version, or the workflow stops before publishing.

3. **Monitor workflow**:
   - Visit: https://github.com/common-origin/common-origin-design-system/actions
   - Check the "📦 Publish Package" workflow, then `npm view @common-origin/design-system version`

### Manual Publishing (Fallback)

If automated publishing fails, a maintainer can publish manually from a logged-in npm session (`npm login` with two-factor authentication). Once the package's **Publishing access** is set to "Require two-factor authentication and disallow tokens" — planned after the first successful Trusted Publishing release (#40) — publishing with a token no longer works:

```bash
npm run build:tokens
npm run build:package
npm publish --access public   # prepublishOnly runs the full verify:package first
```

Manual publishes don't get provenance attestations.

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