import React from 'react'
import { ToggleContainer } from './Toggle.styled'

export const Toggle = ({ changeThemeHandler }) => {
  const changeHandler = () => {
    const theme = window.localStorage.getItem('theme')
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      changeThemeHandler('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      changeThemeHandler('light')
    }
  }

  return (
    <ToggleContainer>
      <label className="switch">
        <input type="checkbox" onClick={changeHandler} />
        <span className="slider round" />
      </label>
    </ToggleContainer>
  )
}
