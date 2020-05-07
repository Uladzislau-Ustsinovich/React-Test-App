import React from 'react'
import { Link } from 'react-router-dom'
import { Toggle } from './toggle/Toggle'
import { HeaderContainer, HeaderInner } from './header.styled'
import {ROUTE_PATHS} from "../../constants/routePaths";

export const Header = () => {
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderInner>
          <div className="header__inner_links">
            <Link to={ROUTE_PATHS.TABLE} className="header__settings_link">
              <p>Table</p>
            </Link>
            <Link to={ROUTE_PATHS.CHART} className="header__settings_link">
              <p>Chart</p>
            </Link>
          </div>
          <Toggle />
        </HeaderInner>
      </div>
    </HeaderContainer>
  )
}
