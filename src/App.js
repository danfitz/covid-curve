import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
import ChartsView from './containers/ChartsView'

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ChartsView />
    </ThemeProvider>
  </Provider>
)

export default App