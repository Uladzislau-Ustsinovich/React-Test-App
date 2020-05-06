import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './app/header/Header'
import { GitReposChart } from './app/gitReposChart/GitReposChart'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './constants/theme'
import { GlobalStyles } from './global.styled'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ROUTE_PATHS } from './constants/routePaths'
import { GitReposTable } from './app/gitReposTable/GitReposTable'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer'
import { AppWrapper } from './App.styled'

const TRANSITION_TIMEOUT = 1000

export const ThemeContext = React.createContext()

const App = () => {
  const [theme, setTheme] = useState('light') // Set default theme

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])

  const changeThemeHandler = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <ThemeContext.Provider value={{ changeThemeHandler }}>
            <GlobalStyles />
            <AppWrapper>
              <Header />
              <AppWrapper>
                <Route
                  render={({ location }) => (
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={TRANSITION_TIMEOUT}
                      >
                        <Switch location={location}>
                          <Route exact path={ROUTE_PATHS.TABLE} component={GitReposTable} />
                          <Route path={ROUTE_PATHS.CHART} component={GitReposChart} />
                        </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                  )}
                />
              </AppWrapper>
            </AppWrapper>
          </ThemeContext.Provider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
