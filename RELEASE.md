# Releasing

This is the one release document for `@common-origin/design-system`. Commit message conventions are in [CONTRIBUTING.md](CONTRIBUTING.md#commit-message-convention).

## Quick reference

`main` is protected, so every release is a version-bump PR followed by a tag:

```bash
git switch main && git pull
npm run release:create patch   # or minor / major / X.Y.Z: opens the version-bump PR, including the CHANGELOG.md entry
# wait for CI, address every Copilot review comment, merge the PR
git switch main && git pull
npm run release:tag            # tags main as vX.Y.Z and pushes the tag, which publishes to npm
```

Both commands run `scripts/release.sh`.

## Steps

### 1. Choose the version

Follow [Semantic Versioning](https://semver.org/) and principle P7 (stable contracts):

- **Major:** breaking changes, such as removing or renaming a component, prop, export or token
- **Minor:** new components, props or tokens, backwards compatible
- **Patch:** bug fixes, docs, CI and dependency updates

### 2. Open the version-bump PR

```bash
git switch main && git pull
npm run release:create minor
```

The script checks that you're on a clean, up-to-date `main`, previews the new version and lists the commits since the last tag, then asks for confirmation. It creates `chore/release-X.Y.Z`, runs `npm version` (whose `version` script adds and stages the `CHANGELOG.md` entry), commits, pushes and opens the PR.

### 3. Merge the PR

Wait for CI (typecheck, lint, tests, and the package build with `verify:package`), address every Copilot review comment, and merge.

### 4. Tag and publish

```bash
git switch main && git pull
npm run release:tag
```

The script checks that `main` is clean and up to date, that `vX.Y.Z` doesn't exist yet and that `CHANGELOG.md` has the entry, asks for confirmation, then pushes the tag. Publishing can't be undone.

The tag triggers `.github/workflows/publish.yml`, which:

1. checks that the tag equals `v` plus the `package.json` version, and stops otherwise
2. installs dependencies, runs tests and type checking, and builds the package
3. publishes to npm; `prepublishOnly` runs `build:tokens`, `build:package` and `verify:package` first

### 5. Verify

- The **📦 Publish Package** run is green: https://github.com/common-origin/common-origin-design-system/actions/workflows/publish.yml
- `npm view @common-origin/design-system version` shows the new version (the registry can take a few minutes)

## Authentication: npm Trusted Publishing

The publish workflow uses no npm token. npm trusts `.github/workflows/publish.yml` in this repository and authenticates each run with a short-lived GitHub OIDC token, and provenance attestations are generated automatically.

- Configured on npmjs.com: `@common-origin/design-system` → Settings → Trusted Publisher → GitHub Actions (`common-origin` / `common-origin-design-system` / `publish.yml`).
- The workflow needs `permissions: id-token: write` and npm 11.5.1 or later (it upgrades npm itself).
- Renaming `publish.yml` breaks publishing until the trusted publisher is re-created on npmjs.com (connections can't be edited).

## Changelog

`CHANGELOG.md` is updated in the version-bump PR, before the tag exists: `npm version` runs the `version` script (`auto-changelog -p`), which adds an entry for the new version with today's date (UTC). The changelog is reviewed with the bump and ships with the release. The docs site's `/releases` page reads this file.

The template is `scripts/changelog-template.hbs` (auto-changelog's compact template, changed to print the date for the not-yet-tagged release), configured in `.auto-changelog`.

There is no post-release changelog workflow: a PR opened by the workflow's `GITHUB_TOKEN` can't trigger the required CI checks, so it could never merge unattended.

## Troubleshooting

### Publish failed after the tag was pushed

First check whether npm accepted the version anyway: a run can fail or be cancelled after the publish step succeeded.

```bash
npm view @common-origin/design-system@X.Y.Z version
```

- **It prints `X.Y.Z`:** the version is published and immutable. Don't move the tag. Fix any follow-up problem in a new patch release.
- **It prints nothing (or `E404`):** nothing was published. Fix the cause on `main` through a PR, then move the tag to the fixed commit:

```bash
git push origin :refs/tags/vX.Y.Z   # delete the remote tag
git tag -f vX.Y.Z <fixed-commit>
git push origin vX.Y.Z
```

Re-running the old workflow run won't pick up fixes, because it uses the workflow file at the tagged commit.

### Changelog is missing a release

Regenerate the whole file from tags on a branch and open a PR:

```bash
npx auto-changelog -o CHANGELOG.md
```

### Wrong version published

```bash
npm deprecate @common-origin/design-system@X.Y.Z "Accidental publish, use X.Y.Z+1"
```

Then release the correct version with the normal flow.

### Manual publishing (fallback)

If automated publishing can't be fixed, a maintainer can publish from a logged-in npm session (`npm login` with two-factor authentication). This stops working once the package's **Publishing access** is set to "Require two-factor authentication and disallow tokens".

```bash
npm run build:tokens
npm run build:package
npm publish --access public   # prepublishOnly runs the full verify:package first
```

Manual publishes don't get provenance attestations.

## Useful commands

```bash
npm view @common-origin/design-system version            # published version
git tag -l                                               # all tags
git log $(git describe --tags --abbrev=0)..HEAD --oneline # commits since the last tag
```
