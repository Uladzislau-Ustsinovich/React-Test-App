import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './app/header/Header'
import { GitReposChart } from './app/gitReposChart/GitReposChart'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme, DARK_THEME, LIGHT_THEME } from './constants/theme'
import { GlobalStyles } from './global.styled'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ROUTE_PATHS } from './constants/routePaths'
import { GitReposTable } from './app/gitReposTable/GitReposTable'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer'
import { AppWrapper } from './App.styled'

const TRANSITION_TIMEOUT = 1000

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
                          <Route exact path={ROUTE_PATHS.table} component={GitReposTable} />
                          <Route path={ROUTE_PATHS.chart} component={GitReposChart} />
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
