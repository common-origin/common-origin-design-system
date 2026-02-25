# Release Process

This document outlines the standardized process for creating releases, ensuring the changelog is always up-to-date.

## Quick Reference

**For every release, follow these steps in order:**

1. Ensure all changes are committed with conventional commit messages
2. Bump version in `package.json`
3. Commit the version bump
4. Create and push git tag
5. GitHub Actions automatically publishes to npm
6. GitHub Actions automatically generates and commits `CHANGELOG.md` on each release tag
7. Verify publish + changelog workflows completed successfully

## Conventional Commit Messages

**All commits MUST follow the Conventional Commits specification** to ensure proper changelog generation.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

Use these commit types (they map to changelog sections):

- `feat:` - New features (✨ Features)
- `fix:` - Bug fixes (🐛 Bug Fixes)
- `perf:` - Performance improvements (⚡ Performance)
- `refactor:` - Code refactoring (♻️ Refactoring)
- `docs:` - Documentation changes (📚 Documentation)
- `style:` - Code style changes (💎 Styles)
- `test:` - Test changes (✅ Tests)
- `build:` - Build system changes (📦 Build)
- `ci:` - CI/CD changes (👷 CI/CD)
- `chore:` - Maintenance tasks (🔧 Chores)

### Examples

```bash
# Good examples
git commit -m "feat(Chip): add FilterChip selected state with checkmark"
git commit -m "fix(Button): correct disabled state styling"
git commit -m "docs: update component documentation standards"
git commit -m "chore: bump version to 1.6.0"

# Bad examples (avoid)
git commit -m "update stuff"
git commit -m "fixed it"
git commit -m "WIP"
```

### Multi-line Commits

For complex changes, include a body:

```bash
git commit -m "feat(Chip): split into specialized components

- Created Chip, FilterChip, and BooleanChip
- Added shared utilities folder
- Removed large size variant
- All 85 tests passing"
```

## Release Workflow

### 1. Determine Version Bump

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backwards compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backwards compatible)

### 2. Update Version in package.json

```bash
# Use --no-git-tag-version to avoid npm auto-creating commit/tag
npm version patch --no-git-tag-version   # 1.0.0 -> 1.0.1
npm version minor --no-git-tag-version   # 1.0.0 -> 1.1.0
npm version major --no-git-tag-version   # 1.0.0 -> 2.0.0
```

**Or manually:**
```json
{
  "version": "1.6.0"  // Update this
}
```

### 3. Commit Version Bump

```bash
git add package.json package-lock.json
git commit -m "chore: bump version to 1.6.0"
```

### 4. Create and Push Git Tag

```bash
# Create tag matching package.json version
git tag v1.6.0

# Push commits and tag
git push origin main
git push origin v1.6.0
```

**Important:** The tag MUST start with `v` (e.g., `v1.6.0`) to trigger automation.

### 5. Automatic Publishing

Once the tag is pushed, GitHub Actions will:
1. ✅ Install dependencies
2. 🔍 Run type checking
3. 🏗️ Build the package
4. 📢 Publish to npm with provenance

Note: the current publish workflow skips tests.

### 6. Verify Release

1. Check npm: `npm view @common-origin/design-system version`
2. Check GitHub Actions runs for `📦 Publish Package` and `🚀 Update Changelog After Release`
3. Check `CHANGELOG.md` was updated on `main`


## Changelog Automation (GitHub Actions)

The releases page (`/releases`) now updates automatically via a GitHub Actions workflow:

1. **Workflow triggers** on push of a new tag (e.g., v1.8.6)
2. **Checks out repo** with full history/tags
3. **Generates changelog** using auto-changelog
4. **Commits and pushes** the changelog file (CHANGELOG.md) to the repo
5. **Pushes** the changelog commit to `main`

No Vercel-specific configuration is required. The changelog is always available for any static host.

### Manual Changelog Update (if needed)

```bash
# Regenerate changelog locally
npx auto-changelog -o CHANGELOG.md

# Commit and push
git add CHANGELOG.md
git commit -m "chore: update changelog manually"
git push
```

## Complete Release Example

Here's a full example of releasing v1.7.0:

```bash
# 1. Make sure all changes are committed
git status  # Should be clean

# 2. Update package.json version to 1.7.0
# Edit package.json manually or:
npm version minor --no-git-tag-version

# 3. Commit version bump
git add package.json
git commit -m "chore: bump version to 1.7.0"

# 4. Create and push tag
git tag v1.7.0
git push origin main
git push origin v1.7.0

# 5. Wait for GitHub Actions to publish (check Actions tab)
# 6. Verify: npm view @common-origin/design-system version
# Should show: 1.7.0

# 7. Site will auto-update changelog on next deployment
```

## Troubleshooting

### Tag already exists
```bash
# Delete local tag
git tag -d v1.6.0

# Delete remote tag
git push origin :refs/tags/v1.6.0

# Create tag again
git tag v1.6.0
git push origin v1.6.0
```

### Forgot to create tag
```bash
# Find the commit where version was bumped
git log --oneline

# Create tag at that commit
git tag v1.6.0 <commit-hash>
git push origin v1.6.0
```

### Changelog missing a release
```bash
# Regenerate changelog
npx auto-changelog -o CHANGELOG.md

# Commit and push the updated changelog if needed
git add CHANGELOG.md
git commit -m "chore(changelog): regenerate changelog"
git push
```

### Wrong version published
```bash
# Deprecate the bad version
npm deprecate @common-origin/design-system@1.6.0 "Accidental publish, use 1.6.1"

# Release correct version
npm version patch --no-git-tag-version
# ... follow normal release process
```

## Automation Status

### ✅ Currently Automated
- 📦 NPM publishing when tag is pushed
- 🧪 Type checking before publish
- 🏗️ Package building
- 📊 Changelog generation on tag push (`CHANGELOG.md` commit)

### 🔄 Manual Steps Required
- 📝 Writing commit messages (must be conventional)
- 🔢 Bumping version in package.json
- 🏷️ Creating and pushing git tags
- 🚀 Deploying documentation site

## Future Improvements

Consider adding:
- [ ] Automated version bumping based on commit types
- [ ] Automated changelog in GitHub Releases
- [ ] Pre-commit hooks to enforce conventional commits
- [ ] Release notes auto-generation
- [ ] Automated site deployment on tag push

## Commit Message Enforcement

To enforce conventional commits, consider installing:

```bash
# Install commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Install husky for git hooks
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

## Quick Commands Reference

```bash
# Check current version
npm view @common-origin/design-system version

# View all tags
git tag -l

# View commits since last tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Regenerate changelog
npx auto-changelog -o CHANGELOG.md

# Test build locally
npm run build
```

## Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [npm version docs](https://docs.npmjs.com/cli/v8/commands/npm-version)
