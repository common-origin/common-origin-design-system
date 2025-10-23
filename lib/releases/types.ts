/**
 * Type definitions for the releases system
 */

export interface Commit {
  hash: string
  author: string
  email: string
  date: string
  message: string
  body: string
  type: CommitType
}

export type CommitType = 
  | 'feat'     // New features
  | 'fix'      // Bug fixes
  | 'chore'    // Maintenance tasks
  | 'docs'     // Documentation changes
  | 'style'    // Code style changes (formatting, etc)
  | 'refactor' // Code refactoring
  | 'perf'     // Performance improvements
  | 'test'     // Test additions or fixes
  | 'build'    // Build system changes
  | 'ci'       // CI/CD changes
  | 'other'    // Uncategorized

export interface Release {
  version: string
  tag: string
  date: string
  commits: Commit[]
  versionType: 'major' | 'minor' | 'patch'
}

export interface ReleasesData {
  releases: Release[]
  generatedAt: string
}

export const COMMIT_TYPE_LABELS: Record<CommitType, string> = {
  feat: '✨ Features',
  fix: '🐛 Bug Fixes',
  chore: '🔧 Chores',
  docs: '📚 Documentation',
  style: '💎 Styles',
  refactor: '♻️ Refactoring',
  perf: '⚡ Performance',
  test: '✅ Tests',
  build: '📦 Build',
  ci: '👷 CI/CD',
  other: '📝 Other Changes',
}

export const COMMIT_TYPE_ORDER: CommitType[] = [
  'feat',
  'fix',
  'perf',
  'refactor',
  'docs',
  'style',
  'test',
  'build',
  'ci',
  'chore',
  'other',
]
