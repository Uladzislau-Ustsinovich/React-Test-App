import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './app/header/Header'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './global.styled'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer'
import { GitRepos } from './app/gitRepos/GitRepos'
import { AppWrapper } from './App.styled'
import { useTheme } from './theme/useTheme'

const App = () => {
  const [theme, changeThemeHandler] = useTheme()

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
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

export const ThemeContext = React.createContext(null)

export default App
