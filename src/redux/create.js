import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createMiddleware from './clientMiddleware'
import thunk from 'redux-thunk'

export default function createApiClientStore(client, initialState) {
  const middleware = createMiddleware(client)
  let finalCreateStore
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { devTools, persistState } = require('redux-devtools')
    finalCreateStore = compose(
      applyMiddleware(thunk),
      applyMiddleware(middleware),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    )(createStore)
  } else {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      applyMiddleware(middleware)
    )(createStore)
  }

  const rootReducer = require('../ducks/reducer')
  const store = finalCreateStore(rootReducer, initialState)
  store.client = client

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../ducks/reducer', () => {
      store.replaceReducer(require('../ducks/reducer'))
    })
  }

  return store
}
