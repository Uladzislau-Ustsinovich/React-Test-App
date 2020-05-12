import React from 'react'
import { Slider, Switch, ToggleContainer } from './toggle.styled'
import { ThemeContext } from '../../../App'

export const Toggle = () => (
  <ThemeContext.Consumer>
    {({ changeThemeHandler }) => (
      <ToggleContainer>
        <Switch>
          <input type="checkbox" onClick={changeThemeHandler} />
          <Slider />
        </Switch>
      </ToggleContainer>
    )}
  </ThemeContext.Consumer>
)
