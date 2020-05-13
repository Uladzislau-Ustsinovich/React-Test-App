import React, { useEffect, useState } from 'react'
import { THEME_STYLES_CONFIG, THEMES } from './theme'

const DARK_THEME = THEMES.DARK
const LIGHT_THEME = THEMES.LIGHT

export const useTheme = () => {
  const [theme, setTheme] = useState(LIGHT_THEME)

  useEffect(() => {
    if (
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
      window.localStorage.getItem('theme') === DARK_THEME
    )
      setTheme(DARK_THEME)
    else setTheme(LIGHT_THEME)
  }, [])

  const changeThemeHandler = () => {
    if (theme === LIGHT_THEME) {
      window.localStorage.setItem('theme', DARK_THEME)
      setTheme(DARK_THEME)
    } else {
      window.localStorage.setItem('theme', LIGHT_THEME)
      setTheme(LIGHT_THEME)
    }
  }

  return [THEME_STYLES_CONFIG[theme], changeThemeHandler]
}
