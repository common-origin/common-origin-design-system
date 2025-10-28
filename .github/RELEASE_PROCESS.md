# Release Process

This document outlines the standardized process for creating releases, ensuring the changelog is always up-to-date.

## Quick Reference

**For every release, follow these steps in order:**

1. Ensure all changes are committed with conventional commit messages
2. Bump version in `package.json`
3. Commit the version bump
4. Create and push git tag
5. GitHub Actions automatically publishes to npm
6. Releases page auto-updates on next deployment

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
# Manually edit package.json or use npm version
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

**Or manually:**
```json
{
  "version": "1.6.0"  // Update this
}
```

### 3. Commit Version Bump

```bash
git add package.json
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
1. ✅ Run type checking
2. 🏗️ Build the package
3. 📢 Publish to npm with provenance
4. 🎉 Release is live!

### 6. Verify Release

1. Check npm: `npm view @common-origin/design-system version`
2. Check GitHub releases page
3. Verify changelog will update on next site deployment

## Site Deployment and Changelog

The releases page (`/releases`) automatically updates when the site is deployed:

1. **Build process** runs `npm run build:releases`
2. **Script scans** all git tags (e.g., v1.6.0, v1.5.0, etc.)
3. **Generates** `public/data/releases.json` with all commits grouped by tag
4. **Next.js** pre-renders the static `/releases` page
5. **Page displays** all releases with categorized commits

### Manual Changelog Update (if needed)

```bash
# Regenerate releases data locally
npm run build:releases

# Rebuild the site
npm run build

# Or just run the dev server (auto-generates)
npm run docs:dev
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
# Regenerate releases data
npm run build:releases

# Commit if needed for local preview, but public/ is gitignored
# It auto-generates during deployment
```

### Wrong version published
```bash
# Deprecate the bad version
npm deprecate @common-origin/design-system@1.6.0 "Accidental publish, use 1.6.1"

# Release correct version
npm version patch
# ... follow normal release process
```

## Automation Status

### ✅ Currently Automated
- 📦 NPM publishing when tag is pushed
- 🧪 Type checking before publish
- 🏗️ Package building
- 📊 Changelog generation during site build

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
npm run build:releases

# Test build locally
npm run build
```

## Resources

- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [npm version docs](https://docs.npmjs.com/cli/v8/commands/npm-version)
