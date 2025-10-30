import styled from 'styled-components'
import { Chip } from '../../atoms/Chip'
import { Picture } from '../../atoms/Picture'
import { Stack } from '../../atoms/Stack'
import { Typography } from '../../atoms/Typography'
import tokens from '@/styles/tokens.json'

const { base: { border } } = tokens

export type CardLargeProps = {
  title: string
  excerpt: string
  subtitle?: string
  labels?: string[]
  picture: string
  onImageClick?: () => void
  imageHref?: string
}

const CardLargeStyled = styled.div`
  max-width: 768px;

  a {
    text-decoration: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }

  img {
    border-radius: ${border.radius[6]};
    transition: ease opacity 0.2s;
    width: 100%;
  }
`

export const CardLarge = ({
  title,
  excerpt,
  subtitle,
  labels = [],
  picture,
  onImageClick,
  imageHref,
}: CardLargeProps) => {
  return (
    <CardLargeStyled>
      <Stack direction="column" gap="md">
        <Picture 
          title={title} 
          src={picture} 
          onClick={onImageClick}
          href={imageHref}
        />
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap="xs">
          <Stack direction="column" gap="xs">
            <Typography variant="h5">{title}</Typography>
            {subtitle && (
              <Typography variant="small" color="subdued">{subtitle}</Typography>
            )}
            {excerpt && (
              <Typography variant="body">{excerpt}</Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" gap="xs">
            {Array.isArray(labels) && labels.map((label, index) => (
              <Chip key={index} title={label} variant="default" />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </CardLargeStyled>
  )
}
