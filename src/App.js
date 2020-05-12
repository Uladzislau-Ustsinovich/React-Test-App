import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './app/header/Header'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, DARK_THEME, LIGHT_THEME } from './constants/theme'
import { GlobalStyles } from './global.styled'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer'
import { GitRepos } from './app/gitRepos/GitRepos'
import { AppWrapper } from './App.styled'

export const ThemeContext = React.createContext(null)

const App = () => {
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
    if (theme === 'light') {
      window.localStorage.setItem('theme', DARK_THEME)
      setTheme(DARK_THEME)
    } else {
      window.localStorage.setItem('theme', LIGHT_THEME)
      setTheme(LIGHT_THEME)
    }
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
          <ThemeContext.Provider value={{ changeThemeHandler }}>
            <GlobalStyles />
            <AppWrapper>
              <Header />
              <GitRepos />
            </AppWrapper>
          </ThemeContext.Provider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
