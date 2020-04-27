import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer, { initialState as defaultInitialState } from '../redux/reducers'

// * This function OVERRIDES react testing library's default render method
// Comes from https://testing-library.com/docs/example-react-redux
const render = (
  ui,
  { // redux-specific options
    initialState = defaultInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions // react testing library options
  } = {} // <= default is object, so destructuring above can work
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }