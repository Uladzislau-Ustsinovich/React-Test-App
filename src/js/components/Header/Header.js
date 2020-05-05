import React from 'react'
import { Link } from 'react-router-dom'
import { Toggle } from './Toggle/Toggle'
import { HeaderContainer, HeaderInner } from './Header.styled'

export const Header = props => {
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderInner>
          <div className="header__inner_links">
            <Link to="/" className="header__settings_link">
              <p>Table</p>
            </Link>
            <Link to="/chart" className="header__settings_link">
              <p>Chart</p>
            </Link>
          </div>
          <Toggle changeThemeHandler={props.changeThemeHandler} />
        </HeaderInner>
      </div>
    </HeaderContainer>
  )
}
