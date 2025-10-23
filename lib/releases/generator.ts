/**
 * Releases Generator
 * 
 * Generates a structured releases.json file from git history.
 * Parses tags and commits to create a comprehensive changelog.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import type { 
  Commit, 
  CommitType, 
  Release, 
  ReleasesData 
} from './types'

/**
 * Execute a git command and return the output
 */
function execGit(command: string): string {
  try {
    return execSync(`git ${command}`, { 
      encoding: 'utf-8',
      cwd: process.cwd(),
    }).trim()
  } catch (error) {
    console.error(`Error executing git command: ${command}`)
    throw error
  }
}

/**
 * Get all version tags sorted by version (newest first)
 */
function getVersionTags(): string[] {
  const tags = execGit('tag --list --sort=-version:refname')
  return tags
    .split('\n')
    .filter(tag => tag.match(/^v?\d+\.\d+\.\d+$/))
    .filter(Boolean)
}

/**
 * Determine the version type (major, minor, patch) from a version string
 */
function getVersionType(version: string): 'major' | 'minor' | 'patch' {
  const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)$/)
  if (!match) return 'patch'
  
  const [, major, minor, patch] = match
  
  if (major !== '0' && minor === '0' && patch === '0') return 'major'
  if (patch === '0') return 'minor'
  return 'patch'
}

/**
 * Parse commit type from commit message
 * Supports conventional commits format: type(scope): message
 */
function parseCommitType(message: string): CommitType {
  const match = message.match(/^(feat|fix|chore|docs|style|refactor|perf|test|build|ci)(\(.+?\))?:/)
  
  if (match) {
    return match[1] as CommitType
  }
  
  return 'other'
}

/**
 * Get commits between two tags (or from tag to HEAD)
 */
function getCommitsBetweenTags(fromTag: string, toTag?: string): Commit[] {
  const range = toTag ? `${fromTag}..${toTag}` : `${fromTag}..HEAD`
  
  try {
    const log = execGit(
      `log ${range} --pretty=format:"%H|%an|%ae|%aI|%s|%b%x00" --no-merges`
    )
    
    if (!log) return []
    
    const commits = log.split('\x00').filter(Boolean).map(entry => {
      const [hash, author, email, date, message, ...bodyParts] = entry.split('|')
      const body = bodyParts.join('|').trim()
      
      return {
        hash,
        author,
        email,
        date,
        message,
        body,
        type: parseCommitType(message),
      }
    })
    
    return commits
  } catch (error) {
    console.warn(`No commits found for range ${range}`)
    return []
  }
}

/**
 * Get the date of a tag
 */
function getTagDate(tag: string): string {
  try {
    return execGit(`log -1 --format=%aI ${tag}`)
  } catch {
    return new Date().toISOString()
  }
}

/**
 * Generate releases data from git history
 */
export function generateReleases(): ReleasesData {
  console.log('🔍 Scanning git history for releases...')
  
  const tags = getVersionTags()
  
  if (tags.length === 0) {
    console.warn('⚠️  No version tags found in repository')
    return {
      releases: [],
      generatedAt: new Date().toISOString(),
    }
  }
  
  console.log(`📋 Found ${tags.length} version tags`)
  
  const releases: Release[] = []
  
  for (let i = 0; i < tags.length; i++) {
    const currentTag = tags[i]
    const previousTag = tags[i + 1]
    
    console.log(`📦 Processing ${currentTag}...`)
    
    const commits = previousTag 
      ? getCommitsBetweenTags(previousTag, currentTag)
      : getCommitsBetweenTags(currentTag)
    
    const version = currentTag.replace(/^v/, '')
    
    releases.push({
      version,
      tag: currentTag,
      date: getTagDate(currentTag),
      commits,
      versionType: getVersionType(currentTag),
    })
    
    console.log(`  ✅ ${commits.length} commits`)
  }
  
  console.log(`\n✨ Generated changelog for ${releases.length} releases`)
  
  return {
    releases,
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Write releases data to JSON file
 */
export function writeReleasesFile(data: ReleasesData, outputPath: string): void {
  const dir = path.dirname(outputPath)
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(
    outputPath,
    JSON.stringify(data, null, 2),
    'utf-8'
  )
  
  console.log(`\n💾 Wrote releases data to ${outputPath}`)
}

/**
 * Main function to generate and write releases file
 */
export async function main() {
  try {
    const data = generateReleases()
    const outputPath = path.join(process.cwd(), 'public', 'data', 'releases.json')
    writeReleasesFile(data, outputPath)
    console.log('✅ Releases generation complete!')
  } catch (error) {
    console.error('❌ Error generating releases:', error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}
