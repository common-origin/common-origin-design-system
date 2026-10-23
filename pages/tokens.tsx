import Head from 'next/head'
import styled from 'styled-components'
import { useState } from 'react'
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dropdown,
  Icon,
  Layout,
  Navigation,
  Typography,
  Stack,
  Chip,
} from '../src/page-components'
import tokens from '@/styles/tokens.json'
import semanticSource from '@/tokens/semantic/index.json'

// The token source carries each token's description and deprecation (decision 0033). The page
// shows the tokens in use under decision 0031's names and leaves deprecated names out.
type SourceNode = { [key: string]: SourceNode | string | undefined }
const sourceAt = (path: string) =>
  path.split('.').reduce<SourceNode | undefined>((node, key) => node?.[key] as SourceNode | undefined, semanticSource as unknown as SourceNode)
const sourceDescription = (path: string) => {
  const description = sourceAt(path)?.$description
  return typeof description === 'string' ? description : undefined
}
/** The tokens of a group that aren't deprecated, without nested groups */
const inUse = (path: string, group: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(group).filter(([key, value]) => typeof value === 'string' && sourceAt(`${path}.${key}`)?.$deprecated === undefined)
  )

const { base: { breakpoint }, semantic: { color, border } } = tokens

const TokensLayout = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.nav`
  width: 250px;
  border-right: ${border.default};
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: ${tokens.semantic.space[1400]} 0;
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const MobileNavigation = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
    padding: ${tokens.semantic.space[400]};
    background-color: ${tokens.semantic.surface.raised};
    border-bottom: ${border.default};
    position: sticky;
    top: 0;
    z-index: ${tokens.semantic.layer.sticky};
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: ${tokens.semantic.space[600]};
  overflow-x: auto;
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${tokens.semantic.space[400]};
  }
`

const TokenTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: ${tokens.semantic.space[400]};
  border-radius: ${tokens.base.border.radius[3]};
  overflow: hidden;
  border: ${border.default};
  background-color: transparent;
`

const TableHeader = styled.th`
  background-color: ${tokens.semantic.surface.base};
  border-bottom: ${border.default};
  padding: ${tokens.semantic.space[300]};
  text-align: left;
  font: ${tokens.semantic.typography.label};
  color: ${color.text.default};
  font-weight: 600;
  
  &:not(:last-child) {
    border-right: ${border.default};
  }
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${tokens.semantic.space[200]};
    font: ${tokens.semantic.typography.label};
  }
`

const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: ${border.default};
  }
`

const TableCell = styled.td`
  padding: ${tokens.semantic.space[300]};
  vertical-align: top;
  
  &:not(:last-child) {
    border-right: ${border.default};
  }
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${tokens.semantic.space[200]};
  }
`

const TokenValue = styled.span`
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.muted};
`

const ColorSwatch = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${props => props.$color};
  border: ${border.default};
  border-radius: ${tokens.base.border.radius[2]};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
  
  @media (max-width: ${breakpoint.md}) {
    width: 32px;
    height: 32px;
  }
`

const SpacingSwatch = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${tokens.semantic.space[400]};
  background-color: ${color.fill.accent};
  border-radius: ${tokens.base.border.radius[1]};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
`

const IconSizeSwatch = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  background-color: ${color.text.muted};
  border-radius: ${tokens.base.border.radius[1]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${tokens.semantic.space[200]};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
  
  &::after {
    content: '★';
    color: ${color.text.inverse};
    font-size: calc(${props => props.$size} * 0.6);
    line-height: 1;
  }
`

const FontSample = styled.div<{ $font: string }>`
  font: ${props => props.$font};
  margin: ${tokens.semantic.space[100]} 0;
  color: ${color.text.default};
`

const BorderSample = styled.div<{ $border: string }>`
  border: ${props => props.$border};
  padding: ${tokens.semantic.space[200]};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${tokens.semantic.surface.raised};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 100px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.muted};
`

const BorderRadiusSample = styled.div<{ $radius: string }>`
  border: ${border.default};
  padding: ${tokens.semantic.space[200]};
  border-radius: ${props => props.$radius};
  background-color: ${tokens.semantic.surface.raised};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 60px;
  min-height: 60px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.muted};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ShadowSample = styled.div<{ $shadow: string }>`
  box-shadow: ${props => props.$shadow};
  padding: ${tokens.semantic.space[300]};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${tokens.semantic.surface.raised};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 100px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.muted};
`

const ElevationSample = styled.div<{ $elevation: string }>`
  box-shadow: ${props => props.$elevation};
  padding: ${tokens.semantic.space[400]};
  border-radius: ${tokens.semantic.radius.md};
  background-color: ${tokens.semantic.surface.raised};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 80px;
  min-height: 60px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.muted};
  display: flex;
  align-items: center;
  justify-content: center;
`

const MotionSample = styled.div<{ $transition: string }>`
  transition: ${props => props.$transition};
  padding: ${tokens.semantic.space[200]};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.fill.accent};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  cursor: pointer;
  font: ${tokens.semantic.typography.caption};
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${color.fill['accent-hover']};
  }
`

const AvatarSizeSample = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  background-color: ${color.fill.accent};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${tokens.semantic.space[200]};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
  color: ${color.text.inverse};
  font: ${tokens.semantic.typography.caption};
  
  &::after {
    content: 'CO';
    font-size: calc(${props => props.$size} * 0.5);
  }
`

const OpacitySample = styled.div<{ $opacity: string }>`
  opacity: ${props => props.$opacity};
  padding: ${tokens.semantic.space[200]};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.fill.emphasis};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 80px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
`

// Contains the z-index examples in their own stacking context, so a sample at
// e.g. 1020 can't paint over the page's sticky bar or the mobile menu.
const ZIndexExamples = styled.div`
  isolation: isolate;
`

const ZIndexSample = styled.div<{ $zIndex: string }>`
  position: relative;
  z-index: ${props => props.$zIndex};
  padding: ${tokens.semantic.space[200]};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.fill.accent};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${tokens.semantic.space[200]};
  min-width: 60px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
`

// Helper function to render color tokens as table
const renderColorTokensTable = (colorTokens: any, categoryName: string, idPrefix: string, path?: string) => {
  return (
    <Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '80px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(colorTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={path ? `${path.replace(/^semantic\./, '')}.${key}` : `color.${idPrefix.replace('color-', '')}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{(path && sourceDescription(`${path}.${key}`)) || getColorUsageDescription(idPrefix, key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ColorSwatch $color={value as string} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render base color tokens as table
const renderBaseColorTokensTable = (colorTokens: any, categoryName: string, idPrefix: string) => {
  return (
    <Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader style={{ width: '80px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(colorTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`color.${idPrefix.replace('color-', '')}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <ColorSwatch $color={value as string} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render spacing tokens as table
const renderSpacingTokensTable = (spacingTokens: any, title: string, path: string) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">{title}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(spacingTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`${path.replace(/^semantic\./, '')}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{sourceDescription(`${path}.${key}`) ?? 'Semantic spacing value'}</TokenValue>
              </TableCell>
              <TableCell>
                <SpacingSwatch $size={value as string} />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render icon size tokens as table
const renderIconSizeTokensTable = (iconSizeTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Icon Sizes</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(iconSizeTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`semantic.size.icon.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getIconSizeUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <Icon size={key as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} name="message" iconColor="default" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render typography tokens as table
const renderTypographyTokensTable = (typographyTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Typography</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(typographyTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`typography.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getTypographyUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <FontSample $font={value as string}>
                  Aa Bb Cc
                </FontSample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render border tokens as table
const renderBorderTokensTable = (borderTokens: Record<string, unknown>, radiusTokens?: Record<string, string>) => {
  const stringTokens = Object.entries(borderTokens)
  
  return (
    <>
      <Box mb="7xl">
        <Typography variant="h3" color="default">Border</Typography>
        <TokenTable>
          <thead>
            <tr>
              <TableHeader>Token Name</TableHeader>
              <TableHeader>Value</TableHeader>
              <TableHeader>Usage</TableHeader>
              <TableHeader style={{ width: '150px' }}>Example</TableHeader>
            </tr>
          </thead>
          <tbody>
            {stringTokens.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <Chip title={`border.${key}`} variant="default" />
                </TableCell>
                <TableCell>
                  <TokenValue>{value as string}</TokenValue>
                </TableCell>
                <TableCell>
                  <TokenValue>{sourceDescription(`semantic.border.${key}`) ?? getBorderUsageDescription(key)}</TokenValue>
                </TableCell>
                <TableCell>
                  <BorderSample $border={value as string}>
                    Sample
                  </BorderSample>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </TokenTable>
      </Box>
      
      {radiusTokens && (
        <Box mb="7xl">
          <Typography variant="h3" color="default">Radius</Typography>
          <TokenTable>
            <thead>
              <tr>
                <TableHeader>Token Name</TableHeader>
                <TableHeader>Value</TableHeader>
                <TableHeader style={{ width: '150px' }}>Example</TableHeader>
              </tr>
            </thead>
            <tbody>
              {Object.entries(radiusTokens).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>
                    <Chip title={`radius.${key}`} variant="default" />
                  </TableCell>
                  <TableCell>
                    <TokenValue>{value}</TokenValue>
                  </TableCell>
                  <TableCell>
                    <BorderRadiusSample $radius={value}>
                      Sample
                    </BorderRadiusSample>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </TokenTable>
        </Box>
      )}
    </>
  )
}

// Helper function to render generic tokens as table
const renderGenericTokensTable = (tokenObj: any, categoryName: string, prefix: string, idPrefix: string) => {
  return (
    <Box key={idPrefix} mb="7xl">
      <Typography variant="h3" color="default">{categoryName}</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokenObj).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`${prefix}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{sourceDescription(`${prefix.startsWith('semantic.') ? prefix : `semantic.${prefix}`}.${key}`) ?? getGenericUsageDescription(prefix, key)}</TokenValue>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render shadow tokens as table
const renderShadowTokensTable = (shadowTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Shadow</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(shadowTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`shadow.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getShadowUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ShadowSample $shadow={value as string}>
                  Shadow
                </ShadowSample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render elevation tokens as table
const renderElevationTokensTable = (elevationTokens: any) => {
  const getElevationDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      'none': 'Flat surfaces, default state',
      'inset': 'Sunken/pressed states, input fields, wells',
      'raised': 'Cards, buttons with subtle depth',
      'floating': 'Tooltips, popovers, dropdowns',
      'overlay': 'Modals, dialogs, action sheets',
      'sticky': 'Fixed headers, sticky navigation'
    }
    return descriptions[key] || 'Elevation level'
  }

  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Elevation</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(elevationTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`elevation.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getElevationDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ElevationSample $elevation={value as string}>
                  {key}
                </ElevationSample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render motion tokens as table
const renderMotionTokensTable = (motionTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Speed</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '150px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(motionTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`motion.transition.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{sourceDescription(`semantic.motion.transition.${key}`) ?? getMotionUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <MotionSample $transition={value as string}>
                  Hover me
                </MotionSample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render avatar size tokens as table
const renderAvatarSizeTokensTable = (avatarSizeTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Avatar Sizes</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(avatarSizeTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`semantic.size.avatar.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getAvatarSizeUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <Avatar size={key as 'xs' | 'sm' | 'md' | 'lg' | 'xl'} name="C O" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render opacity tokens as table
const renderOpacityTokensTable = (opacityTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Opacity</Typography>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(opacityTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`opacity.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getOpacityUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <OpacitySample $opacity={value as string}>
                  {Math.round(parseFloat(value as string) * 100)}%
                </OpacitySample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
    </Box>
  )
}

// Helper function to render z-index tokens as table
const renderZIndexTokensTable = (zIndexTokens: any, title = 'Z-Index', prefix = 'zIndex') => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">{title}</Typography>
      <ZIndexExamples>
      <TokenTable>
        <thead>
          <tr>
            <TableHeader>Token Name</TableHeader>
            <TableHeader>Value</TableHeader>
            <TableHeader>Usage</TableHeader>
            <TableHeader style={{ width: '120px' }}>Example</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Object.entries(zIndexTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`${prefix}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{sourceDescription(`${prefix}.${key}`) ?? getZIndexUsageDescription(key)}</TokenValue>
              </TableCell>
              <TableCell>
                <ZIndexSample $zIndex={value as string}>
                  {value as string}
                </ZIndexSample>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TokenTable>
      </ZIndexExamples>
    </Box>
  )
}


// Usage description helpers
const getColorUsageDescription = (category: string, key: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    'color-text': {
      'default': 'Primary text content',
      'emphasis': 'Important text that needs emphasis',
      'subdued': 'Secondary or supporting text',
      'inverse': 'Text on dark backgrounds',
      'disabled': 'Disabled or inactive text',
      'interactive': 'Links and interactive text',
      'error': 'Error messages and validation',
      'success': 'Success messages and confirmations',
      'warning': 'Warning messages and alerts'
    },
    'color-border': {
      'default': 'Standard borders and dividers',
      'subtle': 'Subtle borders and separators',
      'strong': 'Strong borders for emphasis',
      'interactive': 'Interactive element borders',
      'error': 'Error state borders',
      'success': 'Success state borders',
      'warning': 'Warning state borders'
    },
    'color-icon': {
      'default': 'Standard icon color',
      'emphasis': 'Important or emphasized icons',
      'subdued': 'Secondary or supporting icons',
      'disabled': 'Disabled or inactive icons',
      'inverse': 'Icons on dark backgrounds',
      'interactive': 'Interactive icons and buttons',
      'error': 'Error state icons',
      'success': 'Success state icons',
      'warning': 'Warning state icons'
    }
  }
  
  return descriptions[category]?.[key] || 'Design token usage'
}

const getTypographyUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'h1': 'Main page headings',
    'h2': 'Section headings',
    'h3': 'Subsection headings',
    'h4': 'Component headings',
    'h5': 'Small headings',
    'h6': 'Caption headings',
    'body': 'Body text and paragraphs',
    'caption': 'Small supporting text',
    'code': 'Code snippets and technical text',
    'display': 'Large display text'
  }
  
  return descriptions[key] || 'Typography style'
}

const getIconSizeUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'xs': 'Extra small icons for tight spaces and inline text',
    'sm': 'Small icons for compact UI elements',
    'md': 'Medium icons for general use (default)',
    'lg': 'Large icons for emphasis and headers',
    'xl': 'Extra large icons for prominent features',
    '2xl': 'Largest icons for hero sections and branding'
  }
  
  return descriptions[key] || 'Icon sizing'
}

const getBorderUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'default': 'Standard component borders',
    'subtle': 'Subtle dividers and separators',
    'strong': 'Emphasized borders',
    'focus': 'Focus indicators',
    'tooltip': 'Tooltip borders'
  }
  
  return descriptions[key] || 'Border style'
}

const getShadowUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    '1': 'Subtle elevation (cards)',
    '2': 'Low elevation (buttons)',
    '3': 'Medium elevation (dropdowns)',
    '4': 'High elevation (modals)',
    '5': 'Very high elevation (overlays)',
    '6': 'Maximum elevation (tooltips)',
    'none': 'No shadow'
  }
  
  return descriptions[key] || 'Shadow effect'
}

const getMotionUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'transition': 'Generic transition settings',
    'fast': 'Fast transitions for subtle interactions',
    'normal': 'Standard transitions for most interactions',
    'slow': 'Slow transitions for emphasized interactions',
    'hover': 'Hover state transitions',
    'focus': 'Focus state transitions',
    'interactive': 'Interactive element transitions'
  }
  
  return descriptions[key] || 'Motion effect'
}

const getAvatarSizeUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    'xs': 'Extra small avatars for inline use',
    'sm': 'Small avatars for compact lists',
    'md': 'Medium avatars for general use',
    'lg': 'Large avatars for profiles',
    'xl': 'Extra large avatars for headers'
  }
  
  return descriptions[key] || 'Avatar sizing'
}

const getOpacityUsageDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    '0': 'Completely transparent',
    '5': 'Very faint transparency',
    '10': 'Subtle transparency',
    '20': 'Light transparency',
    '25': 'Quarter opacity',
    '30': 'Light to medium transparency',
    '40': 'Medium transparency',
    '50': 'Half opacity',
    '60': 'Medium to strong transparency',
    '70': 'Strong transparency',
    '75': 'Three-quarter opacity',
    '80': 'Strong opacity',
    '90': 'Very strong opacity',
    '95': 'Nearly opaque',
    '100': 'Completely opaque'
  }
  
  return descriptions[key] || 'Opacity level'
}

const getZIndexUsageDescription = (key: string): string => {
  // Semantic layers, in stacking order (decision 0013). Each pairs with an elevation token.
  const descriptions: Record<string, string> = {
    sticky: 'Sticky and fixed chrome: sticky headers, navigation bars. Pairs with elevation.sticky',
    dropdown: 'Floating menus: Dropdown, SearchField suggestions. Pairs with elevation.floating',
    overlay: 'Panels over the page and their backdrop: Sheet. Pairs with elevation.overlay',
    modal: 'Blocking dialogs and their backdrop: Modal, ActionSheet. Pairs with elevation.overlay',
  }

  return descriptions[key] || 'Base z-index step: use a semantic layer instead'
}

const getGenericUsageDescription = (prefix: string, _key: string): string => {
  if (prefix.includes('fontSize')) return 'Font size value'
  if (prefix.includes('fontWeight')) return 'Font weight value'
  if (prefix.includes('lineHeight')) return 'Line height value'
  if (prefix.includes('letterSpacing')) return 'Letter spacing value'
  if (prefix.includes('radius')) return 'Border radius value'
  if (prefix.includes('width')) return 'Border width value'
  if (prefix.includes('size')) return 'Size value'
  if (prefix.includes('duration')) return 'Animation duration'
  if (prefix.includes('easing')) return 'Animation easing function'
  if (prefix.includes('breakpoint')) return 'Responsive breakpoint'
  return 'Design token value'
}

export default function Tokens() {
  const [activeTab, setActiveTab] = useState('border')

  // Only semantic category tokens are displayed
  const navigationTabs = [
    {
      id: 'border',
      intent: "Borders separate content and mark edges. A divider uses the default border, which is quiet (1.53:1). A control's edge uses the input border, which is at least 3:1, so it shows where the control is. There is one near-black focus ring. Radius matches the size of the object: small controls, cards, then modals.",
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#border',
      label: 'Border',
      isHeader: true,
      content: [
        { id: 'border-styles', type: 'border', data: inUse('semantic.border', tokens.semantic.border), radius: tokens.semantic.radius, title: 'Border Style' },
      ]
    },
    {
      id: 'elevation',
      intent: 'Elevation lifts a surface off the page, and each level pairs with a surface. Layers set stacking order by name, so menus, sheets and modals stack correctly without numbers.',
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#elevation-and-layer',
      label: 'Elevation',
      isHeader: true,
      content: [
        { id: 'elevation-levels', type: 'elevation', data: tokens.semantic.elevation, title: 'Elevation' },
        { id: 'layers', type: 'z-index', data: tokens.semantic.layer, title: 'Layers', prefix: 'semantic.layer' },
      ]
    },
    {
      id: 'color',
      intent: 'Colour carries meaning, never decoration. Each role hue means one thing everywhere: accent, success, warning, serious, danger and AI, plus neutral grey. Tokens are split by what they paint: text, icon, border, fill and surface. Text has two levels, primary and secondary, and emphasis comes from weight, not a darker colour. Status always adds text and a shape or symbol.',
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#colour',
      label: 'Color',
      isHeader: true,
      content: [
        { id: 'surface', type: 'color', data: tokens.semantic.surface, title: 'Surface', path: 'semantic.surface' },
        { id: 'color-text', type: 'color', data: inUse('semantic.color.text', tokens.semantic.color.text), title: 'Text', path: 'semantic.color.text' },
        { id: 'color-fill', type: 'color', data: inUse('semantic.color.fill', tokens.semantic.color.fill), title: 'Fill', path: 'semantic.color.fill' },
        { id: 'color-border', type: 'color', data: inUse('semantic.color.border', tokens.semantic.color.border), title: 'Border', path: 'semantic.color.border' },
        { id: 'color-icon', type: 'color', data: inUse('semantic.color.icon', tokens.semantic.color.icon), title: 'Icon', path: 'semantic.color.icon' },
      ]
    },
    {
      id: 'motion',
      intent: "Motion explains change. It's quick, eased and never decorative. Durations run from instant to 300ms, curves are named by their job (standard, decelerate, accelerate), and transitions name the properties they animate.",
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#motion',
      label: 'Motion',
      isHeader: true,
      content: [
        { id: 'motion-transition', type: 'motion', data: inUse('semantic.motion.transition', tokens.semantic.motion.transition), title: 'Transition' },
        { id: 'motion-duration', type: 'generic', data: inUse('semantic.motion.duration', tokens.semantic.motion.duration), title: 'Duration', prefix: 'motion.duration' },
        { id: 'motion-easing', type: 'generic', data: inUse('semantic.motion.easing', tokens.semantic.motion.easing), title: 'Easing', prefix: 'motion.easing' },
        { id: 'motion-distance', type: 'generic', data: tokens.semantic.motion.distance, title: 'Distance', prefix: 'motion.distance' },
      ]
    },
    {
      id: 'size',
      intent: 'Sizes come from one 4px scale, plus named roles shared across components: control heights (32, 40 and 48px), label heights, icons, avatars and overlays. Small controls keep a 24px hit area, and touch rows a 44px one.',
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#size',
      label: 'Size',
      isHeader: true,
      content: [
        { id: 'icon-sizes', type: 'icon-size', data: tokens.semantic.size.icon, title: 'Icon Sizes' },
        { id: 'avatar-sizes', type: 'avatar-size', data: tokens.semantic.size.avatar, title: 'Avatar Sizes' },
      ]
    },
    {
      id: 'spacing',
      intent: "Space comes from one 4px scale: small steps inside groups, larger ones between sections. Inset tokens are the padding inside components, and they're what density changes. Components have no spacing tokens of their own.",
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#space',
      label: 'Spacing',
      isHeader: true,
      content: [
        { id: 'space', type: 'spacing', data: inUse('semantic.space', tokens.semantic.space), title: 'Space', path: 'semantic.space' },
        { id: 'space-inset', type: 'spacing', data: tokens.semantic.space.inset, title: 'Inset', path: 'semantic.space.inset' },
      ]
    },
    {
      id: 'typography',
      intent: 'Use a complete text style wherever one fits, with heading levels that follow the page outline. The named parts (sizes, weights, line heights) are for the rare component that departs from a style. Hierarchy comes from weight and scale, not colour.',
      docs: 'https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/semantic.md#typography',
      label: 'Typography',
      isHeader: true,
      content: [
        { id: 'semantic-typography', type: 'typography', data: inUse('semantic.typography', tokens.semantic.typography), title: 'Typography Style' },
        { id: 'semantic-font-weight', type: 'generic', data: tokens.semantic.fontWeight, title: 'Font Weight', prefix: 'semantic.fontWeight' },
      ]
    },
  ]

  const activeTabData = navigationTabs.find(tab => tab.id === activeTab)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderTabContent = (content: any[]) => {
    return content.map((item) => {
      switch (item.type) {
        case 'color':
          return renderColorTokensTable(item.data, item.title, item.id, item.path)
        case 'base-color':
          return renderBaseColorTokensTable(item.data, item.title, item.id)
        case 'typography':
          return renderTypographyTokensTable(item.data)
        case 'border':
          return renderBorderTokensTable(item.data, item.radius)
        case 'elevation':
          return renderElevationTokensTable(item.data)
        case 'spacing':
          return renderSpacingTokensTable(item.data, item.title, item.path)
        case 'icon-size':
          return renderIconSizeTokensTable(item.data)
        case 'avatar-size':
          return renderAvatarSizeTokensTable(item.data)
        case 'shadow':
          return renderShadowTokensTable(item.data)
        case 'motion':
          return renderMotionTokensTable(item.data)
        case 'opacity':
          return renderOpacityTokensTable(item.data)
        case 'z-index':
          return renderZIndexTokensTable(item.data, item.title, item.prefix)
        case 'generic':
          return renderGenericTokensTable(item.data, item.title, item.prefix, item.id)
        default:
          return null
      }
    })
  }

  return (
    <>
      <Layout>
        <Head>
          <title>Design Tokens - Common Origin</title>
        </Head>
        <Navigation />
        <Breadcrumbs breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Tokens', url: '/tokens' }]} />
        
        <section>
          <Container>
            <MobileNavigation>
              <Dropdown 
                options={navigationTabs.map(tab => ({ id: tab.id, label: tab.label }))}
                value={activeTab}
                onChange={handleTabClick}
                placeholder="Select a token category"
              />
            </MobileNavigation>
            
            <TokensLayout>
              <Sidebar>
                <Box px="lg">
                  <Stack direction="column" gap="xs">
                    {navigationTabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? 'primary' : 'naked'}
                        size="medium"
                        onClick={() => handleTabClick(tab.id)}
                        style={{ justifyContent: 'flex-start', width: '100%' }}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              </Sidebar>

              <MainContent>
                <Box my="4xl">
                  <Typography variant="h1">Design Tokens</Typography>
                  <Box mt="md">
                    <Stack direction="column" gap="sm">
                      <Typography variant="body">
                        Tokens are the named decisions the system is built from, in three tiers. Base tokens are the raw palette and scales. Semantic tokens say what a value is for, and they're what components read. Component tokens hold a component&apos;s own departures. This page lists the semantic tokens.
                      </Typography>
                      <Typography variant="body" color="subdued">
                        For the theory behind them (the tiers, the naming grammar and how the colour ramps work), read the 
                        <a href="https://github.com/common-origin/common-origin-design-system/blob/main/docs/tokens/README.md">token documentation</a>.
                      </Typography>
                    </Stack>
                  </Box>
                </Box>

                {activeTabData?.intent && (
                  <Box mb="2xl">
                    <Stack direction="column" gap="xs">
                      <Typography variant="body">{activeTabData.intent}</Typography>
                      <Typography variant="small" color="subdued">
                        <a href={activeTabData.docs}>How to choose {activeTabData.label.toLowerCase()} tokens</a>
                      </Typography>
                    </Stack>
                  </Box>
                )}

                {/* Render active tab content */}
                {activeTabData && renderTabContent(activeTabData.content)}
              </MainContent>
            </TokensLayout>
          </Container>
        </section>
      </Layout>
    </>
  )
}
