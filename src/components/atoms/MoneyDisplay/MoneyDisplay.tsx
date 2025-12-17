import React from 'react'
import styled from 'styled-components'
import { Typography, type TypographyVariant, type TypographyColor } from '../Typography'

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
  display: inline-block;
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

// Map MoneyDisplay variant to Typography color
const variantToTypographyColor: Record<MoneyDisplayVariant, TypographyColor> = {
  default: 'default',
  positive: 'success',    // Green color for credits/income
  negative: 'error',      // Red color for debits/expenses
  neutral: 'subdued'      // Gray color for informational
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
  
  // Add sign if needed
  let displayText = formattedAmount
  if (showSign && amount !== 0) {
    const signSymbol = amount > 0 ? '+' : '−' // Using minus sign character, not hyphen
    displayText = signSymbol + formattedAmount
  } else if (amount < 0 && !showSign) {
    // Still show negative sign even without showSign
    displayText = '−' + formattedAmount
  }
  
  // Generate accessibility label
  const ariaLabel = generateAriaLabel(amount, currency, locale)
  
  // Get typography variant and color
  const typographyVariant = sizeToTypographyVariant[size]
  const typographyColor = variantToTypographyColor[variant]
  
  return (
    <StyledWrapper 
      $align={align} 
      $weight={weight}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      <Typography
        variant={typographyVariant}
        color={typographyColor}
        as="span"
      >
        {displayText}
      </Typography>
    </StyledWrapper>
  )
}
