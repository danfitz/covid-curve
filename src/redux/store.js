import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

// Used to add enhancers alongside Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Initialize saga
const sagaMiddleware = createSagaMiddleware()

// Create store
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

// Start saga
sagaMiddleware.run(rootSaga)

export default store