import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

   h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    } 
    
  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    transition: all 0.25s linear;
    font-family: 'Baloo Bhaina 2', cursive;
    font-size: 15px;

  }

    .container {
      width: 100%;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    a {
      text-decoration: none;
    }
  `
