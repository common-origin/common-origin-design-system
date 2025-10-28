# Release Cheatsheet

Quick reference for common tasks.

## 🚀 Creating a Release

### Automated (Recommended)
```bash
npm run release:create
# Follow prompts to select patch/minor/major
```

### Manual
```bash
# 1. Bump version
npm version patch  # or minor/major

# 2. Commit
git add package.json package-lock.json
git commit -m "chore: bump version to X.Y.Z"

# 3. Tag and push
git tag vX.Y.Z
git push origin main && git push origin vX.Y.Z
```

## 📝 Commit Messages

```bash
feat(Component): add new feature       # New feature
fix(Component): fix bug                # Bug fix
docs: update documentation             # Documentation
refactor: restructure code             # Refactoring
chore: bump version to X.Y.Z          # Maintenance
perf: improve performance              # Performance
test: add tests                        # Tests
style: format code                     # Code style
build: update build config             # Build system
ci: update CI config                   # CI/CD
```

## 🔍 Check Release Status

```bash
# View published version
npm view @common-origin/design-system version

# View all tags
git tag -l

# Commits since last tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Regenerate changelog
npm run build:releases
```

## 🧪 Testing Before Release

```bash
# Run all checks
npm test && npm run typecheck && npm run build:package

# Or individually
npm test                # Unit tests
npm run typecheck       # TypeScript
npm run build:package   # Package build
npm run test:coverage   # Coverage report
```

## 🏷️ Tag Management

```bash
# Delete local tag
git tag -d vX.Y.Z

# Delete remote tag
git push origin :refs/tags/vX.Y.Z

# Tag specific commit
git tag vX.Y.Z <commit-hash>
git push origin vX.Y.Z
```

## 📦 Build Commands

```bash
npm run build:package   # Build npm package
npm run build:tokens    # Generate design tokens
npm run build:releases  # Generate changelog
npm run build           # Build docs site (includes releases)
npm run docs:dev        # Dev server with releases
```

## 🐛 Troubleshooting

### "Tag already exists"
```bash
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z
# Try again
```

### "Working directory not clean"
```bash
git status
git add . && git commit -m "fix: commit pending changes"
# Or stash: git stash
```

### "Release not showing on changelog"
```bash
# Check tag exists
git tag -l | grep vX.Y.Z

# Regenerate
npm run build:releases
```

### "Wrong version published"
```bash
npm deprecate @common-origin/design-system@X.Y.Z "Use X.Y.Z+1 instead"
# Create new release
```

## 📚 Component Checklist

New component requires:
- [ ] `ComponentName.tsx` - Implementation
- [ ] `ComponentName.test.tsx` - Tests (incl. jest-axe)
- [ ] `ComponentName.docs.tsx` - Documentation
- [ ] `index.ts` - Exports
- [ ] Add to `src/lib/componentsData.ts`
- [ ] Export from `src/components/[category]/index.ts`

## 🔗 Quick Links

- [Full Release Process](./.github/RELEASE_PROCESS.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Documentation Standards](./.github/DOCUMENTATION_STANDARDS.md)
- [GitHub Actions](https://github.com/common-origin/common-origin-design-system/actions)
- [npm Package](https://www.npmjs.com/package/@common-origin/design-system)
