import React from 'react'
import { ToggleContainer } from './toggle.styled'
import { ThemeContext } from '../../../App'

export const Toggle = () => (
  <ThemeContext.Consumer>
    {({changeThemeHandler}) => (
      <ToggleContainer>
        <label className="switch">
          <input type="checkbox" onClick={changeThemeHandler} />
          <span className="slider round" />
        </label>
      </ToggleContainer>
    )}
  </ThemeContext.Consumer>
)
