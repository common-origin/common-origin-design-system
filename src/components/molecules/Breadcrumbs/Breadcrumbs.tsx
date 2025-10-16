import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Container } from '../../atoms/Container'
import { Typography } from '../../atoms/Typography'
import tokens from '@/styles/tokens.json'



interface Breadcrumb {
  label: string
  url: string
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[]
  'data-testid'?: string
}

const BreadcrumbNavStyled = styled.nav`
  border-bottom: ${tokens.semantic?.border?.default || '0.0625rem solid #e9ecef'};

  ol {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

const BreadcrumbStyled = styled.li`
  text-transform: uppercase;
  display: inline-block;
  margin-right: ${tokens.base?.spacing?.['2'] || '0.5rem'};
  padding: ${tokens.base?.spacing?.['2'] || '0.5rem'};
  position: relative;

  &:not(:last-of-type)::before {
    content: '';
    background-image: url('/assets/icons/caret.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    opacity: 0.5;
    display: inline-block;
    width: ${tokens.base?.spacing?.['4'] || '1rem'};
    height: ${tokens.base?.spacing?.['4'] || '1rem'};
    right: -${tokens.base?.spacing?.['3'] || '0.75rem'};
    position: absolute;
  }

  &:last-of-type a {
    text-decoration: none;
    color: ${tokens.semantic.color.text.subdued};
  }

  &:last-of-type p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }

  > a {
    text-decoration: underline;
    color: ${tokens.semantic.color.text.default};
  }
`

const isInternalUrl = (url: string) => {
  return url.startsWith('/') && !url.startsWith('http')
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <Container>
      <BreadcrumbNavStyled aria-label="breadcrumb">
        <ol>
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbStyled key={index}>
              {index === breadcrumbs.length - 1 ? (
                <Typography variant="caption">{breadcrumb.label}</Typography>
              ) : isInternalUrl(breadcrumb.url) ? (
                <Link href={breadcrumb.url}>
                  <Typography variant="caption">{breadcrumb.label}</Typography>
                </Link>
              ) : (
                <a href={breadcrumb.url} target="_blank" rel="noopener noreferrer">
                  <Typography variant="caption">{breadcrumb.label}</Typography>
                </a>
              )}
            </BreadcrumbStyled>
          ))}
        </ol>
      </BreadcrumbNavStyled>
    </Container>
  )
}
