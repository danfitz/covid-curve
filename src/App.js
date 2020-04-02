import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider } from 'styled-components'
import theme from '@rebass/preset'
import ChartsView from './containers/ChartsView'
import CaseLineChart from './components/CaseLineChart'

const App = ({ cases }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ChartsView />
      </ThemeProvider>
    </Provider>
  );
}

export default App