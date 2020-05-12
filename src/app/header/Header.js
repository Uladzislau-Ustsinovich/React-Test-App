import React from 'react'
import { Toggle } from './toggle/Toggle'
import { HeaderInner, HeaderWrapper, LinkWrapper, StyledLink } from './header.styled'
import { ROUTE_PATHS } from '../../constants/routePaths'
import { Container } from '../../App.styled'

export const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderInner>
          <LinkWrapper>
            <StyledLink to={ROUTE_PATHS.table}>
              <p>Table</p>
            </StyledLink>
            <StyledLink to={ROUTE_PATHS.chart}>
              <p>Chart</p>
            </StyledLink>
          </LinkWrapper>
          <Toggle />
        </HeaderInner>
      </Container>
    </HeaderWrapper>
  )
}
