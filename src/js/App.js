import React, { useEffect, useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { GitReposChart } from './components/GitReposChart/GitReposChart'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme/theme'
import { GlobalStyles } from './theme/global'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.less'
import { chartPath, tablePath } from './constants/routePaths'
import { transitionTimeout } from './constants/transitionConst'
import { GitReposTable } from './components/GitReposTable/GitReposTable'
import { Provider } from 'react-redux'
import { store } from './redux/rootReducer'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])

  const changeThemeHandler = condition => {
    setTheme(condition)
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <div>
            <GlobalStyles />
            <Header changeThemeHandler={changeThemeHandler} />
            <div className="App">
              <Route
                render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition key={location.key} classNames="fade" timeout={transitionTimeout}>
                      <Switch location={location}>
                        <Route exact path={tablePath} component={GitReposTable} />
                        <Route path={chartPath} component={GitReposChart} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
            </div>
          </div>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
