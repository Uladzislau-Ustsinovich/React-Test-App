export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
}

export const THEME_STYLES_CONFIG = {
  [THEMES.LIGHT]: {
    body: '#ffffff',
    text: '#363537',
    toggleBorder: '#FFF',
    toggleBackground: '#2196F3',
    header: '#3026c5',
    tableBorder: '#30475e',
    buttonBackground: '#4d55f7',
    chartBackground: '#FAFAFA',
    chartBarBackground: '#4d55f7'
  },
  [THEMES.DARK]: {
    body: '#222831',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    toggleBackground: '#ccc',
    header: '#30475e',
    tableBorder: '#ffffff',
    buttonBackground: '#6B8096',
    chartBackground: '#9ebcd8',
    chartBarBackground: '#363d47'
  }
}
