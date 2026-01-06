import React from 'react'
import styled from 'styled-components'
import { Container } from '../../atoms/Container'
import { Typography } from '../../atoms/Typography'
import { Icon } from '../../atoms/Icon'
import tokens from '@/styles/tokens.json'

interface Breadcrumb {
  label: string
  url: string
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[]
  'data-testid'?: string
  /**
   * Custom link component (e.g., Next.js Link)
   * @example linkComponent={NextLink}
   */
  linkComponent?: React.ComponentType<any>
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
  display: inline-flex;
  align-items: center;
  gap: ${tokens.base?.spacing?.['2'] || '0.5rem'};
  padding: ${tokens.base?.spacing?.['2'] || '0.5rem'};

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
    display: inline-flex;
    align-items: center;
    text-decoration: underline;
    color: ${tokens.semantic.color.text.default};
  }
`

const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  opacity: 0.5;
`

const isInternalUrl = (url: string) => {
  return url.startsWith('/') && !url.startsWith('http')
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  breadcrumbs, 
  linkComponent: LinkComponent 
}) => {
  return (
    <Container>
      <BreadcrumbNavStyled aria-label="breadcrumb">
        <ol>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbStyled>
                {index === breadcrumbs.length - 1 ? (
                  <Typography variant="caption">{breadcrumb.label}</Typography>
                ) : LinkComponent && isInternalUrl(breadcrumb.url) ? (
                  <LinkComponent href={breadcrumb.url}>
                    <Typography variant="caption">{breadcrumb.label}</Typography>
                  </LinkComponent>
                ) : (
                  <a 
                    href={breadcrumb.url} 
                    {...(!isInternalUrl(breadcrumb.url) && { 
                      target: "_blank", 
                      rel: "noopener noreferrer" 
                    })}
                  >
                    <Typography variant="caption">{breadcrumb.label}</Typography>
                  </a>
                )}
              </BreadcrumbStyled>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator aria-hidden="true">
                  <Icon name="arrowRight" size="xs" iconColor="subdued" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </ol>
      </BreadcrumbNavStyled>
    </Container>
  )
}
