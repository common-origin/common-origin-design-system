import React from 'react'
import styled from 'styled-components'
import { Typography, type TypographyVariant, type TypographyColor } from '../Typography'
import tokens from '@/lib/cssTokens'

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
  text-align: ${({ $align }) => $align};
  font-weight: ${({ $weight }) => tokens.semantic.fontWeight[$weight]};
`

// Map size to Typography variant
const sizeToTypographyVariant: Record<MoneyDisplaySize, TypographyVariant> = {
  small: 'caption',
  medium: 'body',
  large: 'h3',
  xlarge: 'h2'
}

// The minus sign, not a hyphen, so it reads and copies as minus (decision 0045)
const MINUS = '\u2212'

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
  
  // A signed amount carries its sign as text, so the sign survives copying and is read aloud, and the
  // role colour repeats it (decision 0045). Negative amounts always show their sign.
  const isNegative = amount < 0 || variant === 'negative'
  const isPositive = !isNegative && ((showSign && amount > 0) || variant === 'positive')
  const sign = isNegative ? MINUS : isPositive ? '+' : ''

  const typographyVariant = sizeToTypographyVariant[size]
  const amountColor: TypographyColor =
    isNegative ? 'error' :
    isPositive ? 'success' :
    variant === 'neutral' ? 'subdued' :
    'default'

  return (
    <StyledWrapper
      $align={align}
      $weight={weight}
      data-testid={dataTestId}
    >
      <Typography
        variant={typographyVariant}
        color={amountColor}
        as="span"
      >
        {sign}{formattedAmount}
      </Typography>
    </StyledWrapper>
  )
}
