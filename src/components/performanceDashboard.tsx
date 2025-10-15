import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { performanceMonitor, getBundleStats } from '../lib/performance'
import { Typography } from './'
import tokens from '../styles/tokens.json'

const { semantic, base } = tokens

const DashboardContainer = styled.div`
  padding: ${base.spacing[6]};
  background-color: ${semantic.color.background.surface};
  border: 1px solid ${semantic.color.border.subtle};
  border-radius: ${base.border.radius[4]};
  margin: ${base.spacing[4]} 0;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${base.spacing[4]};
  margin-top: ${base.spacing[4]};
`

const MetricCard = styled.div<{ rating: 'good' | 'needs-improvement' | 'poor' }>`
  padding: ${base.spacing[4]};
  background-color: ${semantic.color.background.default};
  border-radius: ${base.border.radius[3]};
  border: 1px solid ${({ rating }) => {
    switch (rating) {
      case 'good': return semantic.color.border.success || '#28a745'
      case 'needs-improvement': return semantic.color.border.warning || '#ffc107'
      case 'poor': return semantic.color.border.error || '#dc3545'
      default: return semantic.color.border.subtle
    }
  }};
`

const MetricValue = styled.div<{ rating: 'good' | 'needs-improvement' | 'poor' }>`
  font: ${semantic.typography.display};
  color: ${({ rating }) => {
    switch (rating) {
      case 'good': return semantic.color.text.success || '#28a745'
      case 'needs-improvement': return semantic.color.text.warning || '#ffc107'
      case 'poor': return semantic.color.text.error || '#dc3545'
      default: return semantic.color.text.default
    }
  }};
  margin: ${base.spacing[2]} 0;
`

const MetricLabel = styled.div`
  font: ${semantic.typography.overline};
  color: ${semantic.color.text.subdued};
  text-transform: uppercase;
  letter-spacing: ${base.letterSpacing[3]};
`

const MetricDescription = styled.div`
  font: ${semantic.typography.small};
  color: ${semantic.color.text.subdued};
  margin-top: ${base.spacing[1]};
`

const BundleStatsContainer = styled.div`
  margin-top: ${base.spacing[6]};
  padding: ${base.spacing[4]};
  background-color: ${semantic.color.background.subtle};
  border-radius: ${base.border.radius[3]};
`

const StatsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${base.spacing[3]};
  
  th, td {
    padding: ${base.spacing[2]} ${base.spacing[3]};
    text-align: left;
    border-bottom: 1px solid ${semantic.color.border.subtle};
  }
  
  th {
    font: ${semantic.typography.overline};
    color: ${semantic.color.text.subdued};
    text-transform: uppercase;
  }
  
  td {
    font: ${semantic.typography.body};
    color: ${semantic.color.text.default};
  }
`

const LoadingText = styled.div`
  font: ${semantic.typography.body};
  color: ${semantic.color.text.subdued};
  margin-top: ${base.spacing[4]};
`

const SectionTitle = styled.div`
  font: ${semantic.typography.h5};
  color: ${semantic.color.text.default};
  margin-top: ${base.spacing[4]};
`

const BundleInfo = styled.div`
  font: ${semantic.typography.body};
  color: ${semantic.color.text.default};
  margin-top: ${base.spacing[3]};
`

const ToggleButton = styled.button`
  font: ${semantic.typography.button2};
  padding: ${base.spacing[2]} ${base.spacing[4]};
  background-color: ${semantic.color.background.surface};
  color: ${semantic.color.text.default};
  border: 1px solid ${semantic.color.border.subtle};
  border-radius: ${base.border.radius[3]};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${base.spacing[4]};
  
  &:hover {
    background-color: ${semantic.color.background.subtle};
    border-color: ${semantic.color.border.default};
  }
`

interface PerformanceDashboardProps {
  className?: string
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ 
  className 
}) => {
  const [metrics, setMetrics] = useState<any[]>([])
  const [bundleStats, setBundleStats] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Get initial metrics
    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics()
      setMetrics(currentMetrics)
    }

    updateMetrics()

    // Get bundle stats
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const stats = getBundleStats()
        setBundleStats(stats)
      }, 1000)
    }

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatValue = (name: string, value: number): string => {
    if (name === 'CLS') {
      return value.toFixed(3)
    }
    return `${Math.round(value)}ms`
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
  }

  const getDescription = (name: string): string => {
    const descriptions = {
      LCP: 'Time for largest content element to render',
      FID: 'Time from first user interaction to browser response',
      CLS: 'Visual stability - lower is better',
      TTFB: 'Time to receive first byte from server',
    }
    return descriptions[name as keyof typeof descriptions] || ''
  }

  return (
    <DashboardContainer className={className}>
      <Typography variant="h3">Performance Dashboard</Typography>
      <Typography variant="body" color="subdued">
        Real-time Core Web Vitals and bundle analysis
      </Typography>

      {metrics.length > 0 ? (
        <MetricsGrid>
          {metrics.map((metric) => (
            <MetricCard key={metric.name} rating={metric.rating}>
              <MetricLabel>{metric.name}</MetricLabel>
              <MetricValue rating={metric.rating}>
                {formatValue(metric.name, metric.value)}
              </MetricValue>
              <MetricDescription>
                {getDescription(metric.name)}
              </MetricDescription>
            </MetricCard>
          ))}
        </MetricsGrid>
      ) : (
        <LoadingText>
          Performance metrics are being collected...
        </LoadingText>
      )}

      <ToggleButton onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Bundle Details
      </ToggleButton>

      {showDetails && bundleStats && (
        <BundleStatsContainer>
          <Typography variant="h4">Bundle Analysis</Typography>
          
          <BundleInfo>
            Total Transfer Size: {formatBytes(bundleStats.totalTransferSize)}
          </BundleInfo>

          {bundleStats.scripts && bundleStats.scripts.length > 0 && (
            <>
              <SectionTitle>
                JavaScript Files
              </SectionTitle>
              <StatsTable>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Size</th>
                    <th>Load Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bundleStats.scripts.map((script: any, index: number) => (
                    <tr key={index}>
                      <td>{script.name}</td>
                      <td>{formatBytes(script.size)}</td>
                      <td>{Math.round(script.duration)}ms</td>
                    </tr>
                  ))}
                </tbody>
              </StatsTable>
            </>
          )}

          {bundleStats.stylesheets && bundleStats.stylesheets.length > 0 && (
            <>
              <SectionTitle>
                CSS Files
              </SectionTitle>
              <StatsTable>
                <thead>
                  <tr>
                    <th>File</th>
                    <th>Size</th>
                    <th>Load Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bundleStats.stylesheets.map((stylesheet: any, index: number) => (
                    <tr key={index}>
                      <td>{stylesheet.name}</td>
                      <td>{formatBytes(stylesheet.size)}</td>
                      <td>{Math.round(stylesheet.duration)}ms</td>
                    </tr>
                  ))}
                </tbody>
              </StatsTable>
            </>
          )}
        </BundleStatsContainer>
      )}
    </DashboardContainer>
  )
}

export default PerformanceDashboard
