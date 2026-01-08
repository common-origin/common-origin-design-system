import React from 'react'
import styled from 'styled-components'
import { Typography, type TypographyVariant, type TypographyColor } from '../Typography'
import { Icon, type IconProps } from '../Icon'

export type MoneyDisplayVariant = 'default' | 'positive' | 'negative' | 'neutral'
export type MoneyDisplaySize = 'small' | 'medium' | 'large' | 'xlarge'
export type MoneyDisplayWeight = 'regular' | 'medium' | 'bold'
export type MoneyDisplayAlign = 'left' | 'center' | 'right'

export interface MoneyDisplayProps {
  /** The monetary amount to display */
  amount: number
  /** Currency code (ISO 4217) */
  currency?: string
  /** Visual variant affecting color and style */
  variant?: MoneyDisplayVariant
  /** Show +/- sign prefix */
  showSign?: boolean
  /** Size of the amount display */
  size?: MoneyDisplaySize
  /** Font weight */
  weight?: MoneyDisplayWeight
  /** Locale for number formatting */
  locale?: string
  /** Align text */
  align?: MoneyDisplayAlign
  /** Data test id for testing */
  'data-testid'?: string
}

interface StyledWrapperProps {
  $align: MoneyDisplayAlign
  $weight: MoneyDisplayWeight
}

const StyledWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$')
})<StyledWrapperProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  text-align: ${({ $align }) => $align};
  font-weight: ${({ $weight }) => 
    $weight === 'regular' ? 400 : 
    $weight === 'medium' ? 500 : 
    700
  };
`

// Map size to Typography variant
const sizeToTypographyVariant: Record<MoneyDisplaySize, TypographyVariant> = {
  small: 'caption',
  medium: 'body',
  large: 'h3',
  xlarge: 'h2'
}

// Map size to Icon size for consistent visual alignment
const sizeToIconSize: Record<MoneyDisplaySize, IconProps['size']> = {
  small: 'xs',
  medium: 'sm',
  large: 'md',
  xlarge: 'lg'
}

/**
 * Generates aria-label with spelled out amount
 */
const generateAriaLabel = (amount: number, currency: string, locale: string): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  // Get parts to spell out the amount
  const parts = formatter.formatToParts(Math.abs(amount))
  const integerPart = parts.find(p => p.type === 'integer')?.value || '0'
  const fractionPart = parts.find(p => p.type === 'fraction')?.value || '00'
  
  const sign = amount < 0 ? 'negative ' : ''
  return `${sign}${integerPart} dollars and ${fractionPart} cents`
}

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  amount,
  currency = 'AUD',
  variant = 'default',
  showSign = false,
  size = 'medium',
  weight = 'regular',
  locale = 'en-AU',
  align = 'left',
  'data-testid': dataTestId
}) => {
  // Format the number with Intl.NumberFormat
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  
  const formattedAmount = formatter.format(Math.abs(amount))
  
  // Determine if we need to show a sign icon
  const showPositiveIcon = (showSign && amount > 0) || variant === 'positive'
  const showNegativeIcon = amount < 0 || variant === 'negative'
  
  // Generate accessibility label
  const ariaLabel = generateAriaLabel(amount, currency, locale)
  
  // Get typography variant and icon size
  const typographyVariant = sizeToTypographyVariant[size]
  const iconSize = sizeToIconSize[size]
  
  // Determine icon color based on variant
  const iconColor: IconProps['iconColor'] = 
    variant === 'positive' || showPositiveIcon ? 'success' :
    variant === 'negative' || showNegativeIcon ? 'error' :
    variant === 'neutral' ? 'subdued' :
    'default'
  
  // Amount always uses default color (except neutral which stays subdued)
  const amountColor: TypographyColor = variant === 'neutral' ? 'subdued' : 'default'
  
  return (
    <StyledWrapper 
      $align={align} 
      $weight={weight}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {showPositiveIcon && !showNegativeIcon && (
        <Icon name="addRing" size={iconSize} iconColor={iconColor} />
      )}
      {showNegativeIcon && (
        <Icon name="remove" size={iconSize} iconColor={iconColor} />
      )}
      <Typography
        variant={typographyVariant}
        color={amountColor}
        as="span"
      >
        {formattedAmount}
      </Typography>
    </StyledWrapper>
  )
}
