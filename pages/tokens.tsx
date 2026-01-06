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

const { base: { breakpoint }, semantic: { color, border, spacing } } = tokens

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
  padding: ${spacing.layout['8xl']} 0;
  
  @media (max-width: ${breakpoint.md}) {
    display: none;
  }
`

const MobileNavigation = styled.div`
  display: none;
  
  @media (max-width: ${breakpoint.md}) {
    display: block;
    padding: ${spacing.layout.lg};
    background-color: ${color.background.subtle};
    border-bottom: ${border.default};
    position: sticky;
    top: 0;
    z-index: 10;
  }
`

const MainContent = styled.main`
  flex: 1;
  padding: ${spacing.layout['2xl']};
  overflow-x: auto;
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${spacing.layout.lg};
  }
`

const TokenTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: ${spacing.layout.lg};
  border-radius: ${tokens.base.border.radius[3]};
  overflow: hidden;
  border: ${border.default};
  background-color: transparent;
`

const TableHeader = styled.th`
  background-color: ${color.background.default};
  border-bottom: ${border.subtle};
  padding: ${spacing.layout.md};
  text-align: left;
  font: ${tokens.semantic.typography.label};
  color: ${color.text.emphasis};
  font-weight: 600;
  
  &:not(:last-child) {
    border-right: ${border.subtle};
  }
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${spacing.layout.sm};
    font: ${tokens.semantic.typography.label};
  }
`

const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: ${border.subtle};
  }
`

const TableCell = styled.td`
  padding: ${spacing.layout.md};
  vertical-align: top;
  
  &:not(:last-child) {
    border-right: ${border.subtle};
  }
  
  @media (max-width: ${breakpoint.md}) {
    padding: ${spacing.layout.sm};
  }
`

const TokenValue = styled.span`
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.subdued};
`

const ColorSwatch = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  background-color: ${props => props.$color};
  border: ${border.subtle};
  border-radius: ${tokens.base.border.radius[2]};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
  
  @media (max-width: ${breakpoint.md}) {
    width: 32px;
    height: 32px;
  }
`

const SpacingSwatch = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${spacing.layout.lg};
  background-color: ${color.background.interactive};
  border-radius: ${tokens.base.border.radius[1]};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
`

const IconSizeSwatch = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  background-color: ${color.text.subdued};
  border-radius: ${tokens.base.border.radius[1]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.layout.sm};
  vertical-align: middle;
  box-shadow: ${tokens.base.shadow[1]};
  
  &::after {
    content: '★';
    color: ${color.background.subtle};
    font-size: calc(${props => props.$size} * 0.6);
    line-height: 1;
  }
`

const FontSample = styled.div<{ $font: string }>`
  font: ${props => props.$font};
  margin: ${spacing.layout.xs} 0;
  color: ${color.text.default};
`

const BorderSample = styled.div<{ $border: string }>`
  border: ${props => props.$border};
  padding: ${spacing.layout.sm};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.background.subtle};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  min-width: 100px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.subdued};
`

const ShadowSample = styled.div<{ $shadow: string }>`
  box-shadow: ${props => props.$shadow};
  padding: ${spacing.layout.md};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.background.subtle};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  min-width: 100px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
  color: ${color.text.subdued};
`

const MotionSample = styled.div<{ $transition: string }>`
  transition: ${props => props.$transition};
  padding: ${spacing.layout.sm};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.background.interactive};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  cursor: pointer;
  font: ${tokens.semantic.typography.caption};
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${color.background['interactive-hover']};
  }
`

const AvatarSizeSample = styled.div<{ $size: string }>`
  width: ${props => props.$size};
  height: ${props => props.$size};
  background-color: ${color.background.interactive};
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.layout.sm};
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
  padding: ${spacing.layout.sm};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.background.emphasis};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  min-width: 80px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
`

const ZIndexSample = styled.div<{ $zIndex: string }>`
  position: relative;
  z-index: ${props => props.$zIndex};
  padding: ${spacing.layout.sm};
  border-radius: ${tokens.base.border.radius[2]};
  background-color: ${color.background.interactive};
  color: ${color.text.inverse};
  display: inline-block;
  margin-right: ${spacing.layout.sm};
  min-width: 60px;
  text-align: center;
  font: ${tokens.semantic.typography.caption};
`

// Helper function to render color tokens as table
const renderColorTokensTable = (colorTokens: any, categoryName: string, idPrefix: string) => {
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
                <Chip title={`color.${idPrefix.replace('color-', '')}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getColorUsageDescription(idPrefix, key)}</TokenValue>
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
const renderSpacingTokensTable = (spacingTokens: any, title: string = 'Spacing') => {
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
                <Chip title={`semantic.spacing.${title.toLowerCase().replace(' ', '.')}.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getSemanticSpacingUsageDescription(key, title)}</TokenValue>
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
const renderBorderTokensTable = (borderTokens: any) => {
  return (
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
          {Object.entries(borderTokens).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>
                <Chip title={`border.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getBorderUsageDescription(key)}</TokenValue>
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
                <TokenValue>{getGenericUsageDescription(prefix, key)}</TokenValue>
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
                <Chip title={`motion.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getMotionUsageDescription(key)}</TokenValue>
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
const renderZIndexTokensTable = (zIndexTokens: any) => {
  return (
    <Box mb="7xl">
      <Typography variant="h3" color="default">Z-Index</Typography>
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
                <Chip title={`zIndex.${key}`} variant="default" />
              </TableCell>
              <TableCell>
                <TokenValue>{value as string}</TokenValue>
              </TableCell>
              <TableCell>
                <TokenValue>{getZIndexUsageDescription(key)}</TokenValue>
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
    'color-background': {
      'default': 'Default page background',
      'subtle': 'Card and component backgrounds',
      'emphasis': 'High contrast backgrounds',
      'surface': 'Elevated surface backgrounds',
      'inverse': 'Dark theme backgrounds',
      'interactive': 'Interactive elements like buttons',
      'interactive-hover': 'Hover state for interactive elements',
      'interactive-active': 'Active/pressed state for interactive elements',
      'error': 'Error state backgrounds',
      'error-subtle': 'Subtle error state backgrounds',
      'success': 'Success state backgrounds',
      'success-subtle': 'Subtle success state backgrounds',
      'warning': 'Warning state backgrounds',
      'warning-subtle': 'Subtle warning state backgrounds',
      'disabled': 'Disabled element backgrounds'
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

const getSemanticSpacingUsageDescription = (key: string, category: string): string => {
  const layoutDescriptions: Record<string, string> = {
    'xs': 'Extra small layout spacing (4px) - tight element spacing',
    'sm': 'Small layout spacing (8px) - compact component spacing',
    'md': 'Medium layout spacing (16px) - default component spacing',
    'lg': 'Large layout spacing (24px) - section spacing',
    'xl': 'Extra large layout spacing (32px) - large section spacing',
    '2xl': 'Double extra large spacing (48px) - major section spacing',
    '3xl': 'Triple extra large spacing (64px) - page section spacing',
    '4xl': 'Quadruple extra large spacing (80px) - large page sections',
    '5xl': 'Quintuple extra large spacing (96px) - hero sections',
    '6xl': 'Sextuple extra large spacing (128px) - major page divisions',
    '7xl': 'Septuple extra large spacing (160px) - maximum page spacing',
    '8xl': 'Octuple extra large spacing (192px) - maximum layout spacing'
  }
  
  const separatorDescriptions: Record<string, string> = {
    'xs': 'Extra small separator spacing (8px) - minimal visual separation',
    'sm': 'Small separator spacing (16px) - subtle content separation',
    'md': 'Medium separator spacing (24px) - standard content separation',
    'lg': 'Large separator spacing (32px) - emphasized content separation',
    'xl': 'Extra large separator spacing (48px) - strong visual separation',
    '2xl': 'Double extra large separator spacing (64px) - major section separation',
    '3xl': 'Triple extra large separator spacing (80px) - page-level separation',
    '4xl': 'Quadruple extra large separator spacing (96px) - maximum separation'
  }
  
  if (category.toLowerCase().includes('layout')) {
    return layoutDescriptions[key] || 'Layout spacing value'
  } else if (category.toLowerCase().includes('separator')) {
    return separatorDescriptions[key] || 'Separator spacing value'
  }
  
  return 'Semantic spacing value'
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
  const descriptions: Record<string, string> = {
    '0': 'Base layer (default)',
    '1': 'Slightly elevated content',
    '2': 'Elevated content (cards)',
    '3': 'Floating content (dropdowns)',
    '4': 'Overlay content (modals)',
    '5': 'High priority overlays',
    '6': 'Notifications and alerts',
    '7': 'Tooltips and popovers',
    '8': 'Maximum elevation (system UI)'
  }
  
  return descriptions[key] || 'Z-index layering'
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
      label: 'Border',
      isHeader: true,
      content: [
        { id: 'border-styles', type: 'border', data: tokens.semantic.border, title: 'Border Style' },
      ]
    },
    {
      id: 'color',
      label: 'Color',
      isHeader: true,
      content: [
        { id: 'color-text', type: 'color', data: tokens.semantic.color.text, title: 'Text' },
        { id: 'color-background', type: 'color', data: tokens.semantic.color.background, title: 'Background' },
        { id: 'color-border', type: 'color', data: tokens.semantic.color.border, title: 'Border' },
        { id: 'color-icon', type: 'color', data: tokens.semantic.color.icon, title: 'Icon' },
      ]
    },
    {
      id: 'motion',
      label: 'Motion',
      isHeader: true,
      content: [
        { id: 'motion-transition', type: 'motion', data: tokens.semantic.motion.transition, title: 'Transition' },
        { id: 'motion-special', type: 'generic', data: { hover: tokens.semantic.motion.hover, focus: tokens.semantic.motion.focus, interactive: tokens.semantic.motion.interactive }, title: 'Motion', prefix: 'motion' },
      ]
    },
    {
      id: 'size',
      label: 'Size',
      isHeader: true,
      content: [
        { id: 'icon-sizes', type: 'icon-size', data: tokens.semantic.size.icon, title: 'Icon Sizes' },
        { id: 'avatar-sizes', type: 'avatar-size', data: tokens.semantic.size.avatar, title: 'Avatar Sizes' },
      ]
    },
    {
      id: 'spacing',
      label: 'Spacing',
      isHeader: true,
      content: [
        { id: 'layout-spacing', type: 'spacing', data: tokens.semantic.spacing.layout, title: 'Layout Spacing' },
        { id: 'separator-spacing', type: 'spacing', data: tokens.semantic.spacing.separator, title: 'Separator Spacing' },
      ]
    },
    {
      id: 'typography',
      label: 'Typography',
      isHeader: true,
      content: [
        { id: 'semantic-typography', type: 'typography', data: tokens.semantic.typography, title: 'Typography Style' },
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
          return renderColorTokensTable(item.data, item.title, item.id)
        case 'base-color':
          return renderBaseColorTokensTable(item.data, item.title, item.id)
        case 'typography':
          return renderTypographyTokensTable(item.data)
        case 'border':
          return renderBorderTokensTable(item.data)
        case 'spacing':
          return renderSpacingTokensTable(item.data, item.title)
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
          return renderZIndexTokensTable(item.data)
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
                  <Stack direction="column" gap="sm">
                    {navigationTabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? 'primary' : 'secondary'}
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
                    <Typography variant="body" color="emphasis">
                      A comprehensive reference of all design tokens used throughout the Common Origin design system.
                    </Typography>
                  </Box>
                </Box>

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
