import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
import ChartsView from './containers/ChartsView'
import Wrapper from './components/UI/Wrapper'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <ChartsView />
        <Footer />
      </Wrapper>
    </ThemeProvider>
  </Provider>
)

export default App