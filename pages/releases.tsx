import Head from 'next/head'
import styled from 'styled-components'
import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import { format } from 'date-fns'
import {
  Box,
  Breadcrumbs,
  Container,
  Stack,
  Typography,
  Chip,
  Layout,
  Navigation,
	Divider,
	Button,
} from '../src/page-components'
import { Grid, GridCol } from '../src/components/layout/GridSystem'
import tokens from '@/styles/tokens.json'
interface Commit {
  hash: string
  author: string
  email: string
  date: string
  message: string
  body: string
  type: CommitType
}

type CommitType = 
  | 'feat'
  | 'fix'
  | 'chore'
  | 'docs'
  | 'style'
  | 'refactor'
  | 'perf'
  | 'test'
  | 'build'
  | 'ci'
  | 'other'

interface Release {
  version: string
  tag: string
  date: string
  commits: Commit[]
  versionType: 'major' | 'minor' | 'patch'
}

interface ReleasesData {
  releases: Release[]
  generatedAt: string
}

const { semantic: { color, spacing, border }, base } = tokens

// Styled Components
const PageWrapper = styled.div`
  max-width: 800px;
	padding-top: 1.5rem;
  margin: 0 auto;
`

const FiltersBar = styled.div`
  display: flex;
  gap: ${spacing.layout.sm};
  flex-wrap: wrap;
	align-items: center;
  padding: ${spacing.layout['lg']} 0;
  position: sticky;
  top: 0;
  background: ${color.background.subtle};
  z-index: 10;
  margin-bottom: ${spacing.layout['2xl']};
	border-bottom: ${border.default};
`

const VersionHeader = styled.div`
  display: flex;
	justify-content: space-between;
	align-items: center;
  gap: ${spacing.layout.md};
  margin-bottom: ${spacing.layout.lg};
  padding-bottom: ${spacing.layout.sm};
`

const DateBadge = styled.div`
  color: ${color.text.subdued};
  font-size: ${base.fontSize['2']};
`

const CommitTypeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.sm};
	margin-bottom: ${spacing.layout.md};
`

const CommitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const CommitItem = styled.li`
  padding-bottom: ${spacing.layout.md};
`

const CommitMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.layout.md};
  flex-wrap: wrap;
  font-size: ${base.fontSize['2']};
  color: ${color.text.subdued};
`

const CommitHash = styled.a`
  font-family: ${base.fontFamily.monospace};
  color: ${color.text.interactive};
  text-decoration: underline;
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${spacing.layout['4xl']} 0;
  color: ${color.text.subdued};
`

// Type Labels and Order
const COMMIT_TYPE_LABELS: Record<CommitType, string> = {
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

const COMMIT_TYPE_ORDER: CommitType[] = [
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

interface ReleasesPageProps {
  releasesData: ReleasesData
}

export default function ReleasesPage({ releasesData }: ReleasesPageProps) {
  const [versionFilter, setVersionFilter] = useState<'all' | 'major' | 'minor' | 'patch'>('all')
  
  const filteredReleases = useMemo(() => {
    if (versionFilter === 'all') {
      return releasesData.releases
    }
    return releasesData.releases.filter(release => release.versionType === versionFilter)
  }, [releasesData.releases, versionFilter])
  
  const versionTypeCounts = useMemo(() => {
    return {
      major: releasesData.releases.filter(r => r.versionType === 'major').length,
      minor: releasesData.releases.filter(r => r.versionType === 'minor').length,
      patch: releasesData.releases.filter(r => r.versionType === 'patch').length,
    }
  }, [releasesData.releases])
  
  const groupCommitsByType = (commits: Commit[]) => {
    const grouped: Partial<Record<CommitType, Commit[]>> = {}
    
    commits.forEach(commit => {
      if (!grouped[commit.type]) {
        grouped[commit.type] = []
      }
      grouped[commit.type]!.push(commit)
    })
    
    // Sort by predefined order
    const sorted: [CommitType, Commit[]][] = []
    COMMIT_TYPE_ORDER.forEach(type => {
      if (grouped[type] && grouped[type]!.length > 0) {
        sorted.push([type, grouped[type]!])
      }
    })
    
    return sorted
  }
  
  return (
    <>
      <Head>
        <title>Releases & Changelog | Common Origin Design System</title>
        <meta 
          name="description" 
          content="View all releases and changes to the Common Origin Design System. Track new features, bug fixes, and improvements." 
        />
      </Head>
      
      <Layout>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Releases', url: '/releases' }]} />
        
				<section>
					<Container>
						<PageWrapper>
							<Box my="4xl">
								<Typography variant="h1">Releases & Changelog</Typography>
								<Box mt="md">
									<Stack gap="lg" direction="column">
										<Typography variant="body" color="emphasis">
											Track all releases, updates, and improvements to the Common Origin Design System.
											View detailed commit history, categorized changes, and version information.
										</Typography>
										<Stack direction="row" gap="md" wrap>
											<Chip variant="light">{releasesData.releases.length} Total Releases</Chip>
											<Chip variant="emphasis">
												Latest: v{releasesData.releases[0]?.version}
											</Chip>
										</Stack>
									</Stack>
								</Box>
								<Divider size="small" />
							</Box>							
						
						<FiltersBar>
							<Typography
								variant="label"
							>
								Filter by type:
							</Typography>
							<Button 
								variant={versionFilter === 'all' ? 'primary' : 'secondary'} 
								size="small"
								onClick={() => setVersionFilter('all')}
							>
								All ({releasesData.releases.length})
							</Button>
							<Button 
								variant={versionFilter === 'major' ? 'primary' : 'secondary'} 
								size="small"
								onClick={() => setVersionFilter('major')}
							>
								Major ({versionTypeCounts.major})
							</Button>
							<Button 
								variant={versionFilter === 'minor' ? 'primary' : 'secondary'} 
								size="small"
								onClick={() => setVersionFilter('minor')}
							>
								Minor ({versionTypeCounts.minor})
							</Button>
							<Button 
								variant={versionFilter === 'patch' ? 'primary' : 'secondary'} 
								size="small"
								onClick={() => setVersionFilter('patch')}
							>
								Patch ({versionTypeCounts.patch})
							</Button>
							<Divider size="small" />
						</FiltersBar>
						
						<Grid cols={1}>
							{filteredReleases.length === 0 ? (
								<GridCol span={1}>
									<EmptyState>
										<Typography variant="h3" color="subdued">
											No releases found for this filter
										</Typography>
									</EmptyState>
								</GridCol>
							) : (
								filteredReleases.map(release => (
									<GridCol key={release.tag} span={1}>
										<Box p="2xl" border="default" borderRadius="3" mb="7xl">
											<VersionHeader>
												<Typography variant="h3">{release.version}</Typography>
												<Typography variant="label" color="subdued">
													{format(new Date(release.date), 'MMMM d, yyyy')}
												</Typography>
											</VersionHeader>
											<Divider size="small" />
											
											{release.commits.length === 0 ? (
												<Typography variant="body" color="subdued">
													No commits in this release
												</Typography>
											) : (
												<Stack gap="none" direction="column">
													{groupCommitsByType(release.commits).map(([type, commits], index, array) => (
														<div key={type}>
															<CommitTypeHeader>
																<Typography variant="h5" as="h3">
																	{COMMIT_TYPE_LABELS[type]}
																</Typography>
																<Chip>{commits.length}</Chip>
															</CommitTypeHeader>
															
															<CommitList>
																{commits.map(commit => (
																	<CommitItem key={commit.hash}>
																		<Typography variant="small">{commit.message}</Typography>
																		<CommitMeta>
																			<CommitHash
																				href={`https://github.com/common-origin/common-origin-design-system/commit/${commit.hash.trim()}`}
																				target="_blank"
																				rel="noopener noreferrer"
																			>
																				{commit.hash.trim().substring(0, 7)}
																			</CommitHash>
																			<Typography variant="small" color="subdued">by {commit.author}</Typography>
																			<Typography variant="small" color="subdued">{format(new Date(commit.date), 'MMM d, yyyy')}</Typography>
																		</CommitMeta>
																	</CommitItem>
																))}
															</CommitList>
															{index < array.length - 1 && <Divider size="small" />}
														</div>
													))}
												</Stack>
											)}
										</Box>
									</GridCol>
								))
							)}
						</Grid>
						
						<Box style={{ padding: `${spacing.layout['4xl']} 0` }}>
							<Typography variant="caption" color="subdued">
								Last updated: {format(new Date(releasesData.generatedAt), 'PPpp')}
							</Typography>
							</Box>
						</PageWrapper>
					</Container>
				</section>
      </Layout>
    </>
  )
}export const getStaticProps: GetStaticProps<ReleasesPageProps> = async () => {
  const fs = await import('fs')
  const path = await import('path')
  
  const releasesPath = path.join(process.cwd(), 'public', 'data', 'releases.json')
  const releasesData: ReleasesData = JSON.parse(
    fs.readFileSync(releasesPath, 'utf-8')
  )
  
  return {
    props: {
      releasesData,
    },
  }
}
