# Releases System

An automated changelog and release tracking system for the Common Origin Design System.

## Overview

The releases system automatically generates a comprehensive changelog from your git commit history, displaying all releases with categorized commits on a beautiful, filterable page.

## Features

- ✅ **Automated Generation** - Extracts releases from git tags and commit history
- ✅ **Conventional Commits** - Parses commit messages to categorize changes (feat, fix, chore, etc.)
- ✅ **Version Filtering** - Filter releases by type (major, minor, patch)
- ✅ **Build-time Generation** - Static data generated during build for fast page loads
- ✅ **Beautiful UI** - Uses the design system's Grid, Typography, Chip, and Stack components
- ✅ **Responsive Design** - Mobile-first design with full responsiveness
- ✅ **GitHub Links** - Direct links to commits on GitHub

## How It Works

### 1. Git History Parsing

The system scans your git repository for version tags (e.g., `v1.0.0`, `v1.2.3`) and extracts commits between each version:

```bash
git tag --list --sort=-version:refname  # Get all version tags
git log v1.0.0..v1.1.0 --no-merges     # Get commits between versions
```

### 2. Commit Categorization

Commits are parsed using conventional commit format:

- `feat:` - ✨ Features
- `fix:` - 🐛 Bug Fixes
- `chore:` - 🔧 Chores
- `docs:` - 📚 Documentation
- `style:` - 💎 Styles
- `refactor:` - ♻️ Refactoring
- `perf:` - ⚡ Performance
- `test:` - ✅ Tests
- `build:` - 📦 Build
- `ci:` - 👷 CI/CD

### 3. Static Generation

During `npm run build`, the system:

1. Executes `lib/releases/build.cjs`
2. Generates `public/data/releases.json`
3. Next.js reads this data at build time via `getStaticProps`

### 4. Page Rendering

The `/releases` page displays:

- Version badges with color-coded types (major = purple, minor = pink, patch = blue)
- Release dates
- Commits grouped by type
- Commit details with GitHub links
- Filter chips for version types

## File Structure

```
lib/releases/
├── types.ts          # TypeScript type definitions
├── generator.ts      # Core generation logic (TypeScript)
├── build.cjs         # Build script (CommonJS for Node.js)
└── index.ts          # Export file

pages/
└── releases.tsx      # Releases page component

public/data/
└── releases.json     # Generated releases data
```

## Usage

### Development

```bash
# Generate releases data
npm run build:releases

# Start dev server (automatically generates releases)
npm run dev
```

### Production Build

```bash
# Build includes automatic releases generation
npm run build
```

### Manual Generation

```bash
# Run the generator directly
node lib/releases/build.cjs
```

## Data Structure

### releases.json

```json
{
  "releases": [
    {
      "version": "1.3.0",
      "tag": "v1.3.0",
      "date": "2025-10-23T16:51:07+11:00",
      "versionType": "minor",
      "commits": [
        {
          "hash": "7f94165...",
          "author": "Common Origin",
          "email": "ollie@commonorigin.studio",
          "date": "2025-10-23T16:51:07+11:00",
          "message": "chore: bump version to 1.3.0",
          "body": "Detailed commit body...",
          "type": "chore"
        }
      ]
    }
  ],
  "generatedAt": "2025-10-23T17:00:00.000Z"
}
```

## Customization

### Modify Commit Types

Edit `lib/releases/types.ts`:

```typescript
export const COMMIT_TYPE_LABELS: Record<CommitType, string> = {
  feat: '✨ Features',
  fix: '🐛 Bug Fixes',
  // Add your own types...
}
```

### Change Styling

The releases page uses styled-components. Modify `pages/releases.tsx`:

```typescript
const VersionBadge = styled.div<{ $versionType: 'major' | 'minor' | 'patch' }>`
  // Customize badge styling...
`
```

### Filter Logic

Customize filtering in `pages/releases.tsx`:

```typescript
const filteredReleases = useMemo(() => {
  // Add custom filter logic...
}, [releasesData.releases, versionFilter])
```

## Best Practices

### Commit Messages

Use conventional commit format for best results:

```bash
git commit -m "feat: add new component"
git commit -m "fix: resolve accessibility issue"
git commit -m "chore: update dependencies"
```

### Version Tags

Create semantic version tags:

```bash
git tag v1.0.0
git tag v1.1.0  # Minor version
git tag v1.1.1  # Patch version
git tag v2.0.0  # Major version
```

### Commit Bodies

Include detailed descriptions in commit bodies:

```bash
git commit -m "feat: add Button component" -m "
Implements a fully accessible Button component with:
- Multiple variants (primary, secondary, ghost)
- Size options (small, medium, large)
- WCAG 2.2 AA compliance
"
```

## Integration with CI/CD

### GitHub Actions

The releases generation automatically runs during build in your existing workflow:

```yaml
- name: Build
  run: npm run build  # Includes npm run build:releases
```

### Deployment

The generated `releases.json` file is included in the Next.js build output and deployed with your site.

## Troubleshooting

### No Releases Found

**Issue**: "No version tags found in repository"

**Solution**: 
```bash
git tag v1.0.0  # Create at least one version tag
```

### Missing Commits

**Issue**: Commits not appearing in releases

**Solution**: Ensure commits are between tagged versions:
```bash
git log v1.0.0..v1.1.0  # Verify commits exist
```

### Build Errors

**Issue**: Build fails during releases generation

**Solution**:
```bash
# Test generator directly
node lib/releases/build.cjs

# Check git repository status
git status
git log --oneline
```

## Future Enhancements

Potential improvements for the releases system:

- [ ] Generate CHANGELOG.md file automatically
- [ ] Support for breaking changes detection
- [ ] Integration with GitHub Releases API
- [ ] Release notes templates
- [ ] Contributor statistics
- [ ] Component-specific changelogs
- [ ] Search functionality
- [ ] RSS feed for releases
- [ ] Email notifications for new releases

## Learn More

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Next.js Static Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- [Git Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
