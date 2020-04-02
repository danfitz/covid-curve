import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  // SETUP
  html { font-size: 125%; }
  * { box-sizing: border-box; }

  // COLORS
  body { background: ${({ theme }) => theme.colors.bg}; }
  // h1, h2, h3, h4, h5, h6 {
  //   color: ${({ theme }) => theme.colors.blue};
  // }
  // p, li, label {
  //   color: ${({ theme }) => theme.colors.white};
  // }
  // table {
  //   color: ${({ theme }) => theme.colors.white};
  // }

  // FONTS
  body { font-family: ${({ theme }) => theme.fonts.main}; }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.main};
  }
  //   font-weight: ${({ theme }) => theme.fonts.boldWeight};
  //   text-transform: uppercase;
  // p, li, label {
  //   font-weight: ${({ theme }) => theme.fonts.normalWeight};
  // }
  // h1 { font-size: 2rem; }
  // h2 { font-size: 1.2rem; }
  // h3 { font-size: 1rem; }
  // p, li { font-size: 0.8rem; }
`

export default GlobalStyle