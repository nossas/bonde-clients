import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { logout } from '~client/account/redux/action-creators'
import crossStorage from '~client/cross-storage-client'
import createReducer from './createReducer'
// import DevTools from './components/dev-tools'

const api = axios.create({
  baseURL: process.env.API_URL || 'http://api-v1.bonde.devel'
})

const middlewares = [promise]

const networkInterface = createNetworkInterface({
  uri: process.env.GRAPHQL_URL || 'http://api-v2.bonde.devel/graphql',
  connectToDevTools: true
})

networkInterface.use([
  {
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // Non-use auth for authenticate mutation to make a new JWT Token
      const requiredAuth = req.request.operationName !== 'authenticate'
      if (require('exenv').canUseDOM && requiredAuth) {
        crossStorage.onConnect()
          .then(() => {
            return crossStorage.get('auth')
          })
          .then(authJson => {
            const { jwtToken } = JSON.parse(authJson)
            req.options.headers.authorization = `Bearer ${jwtToken}`
            next()
          })
      } else {
        next()
      }
    }
  }
])

networkInterface.useAfter([{
  applyAfterware ({ response }, next) {
    if (response.status === 401) {
      // TODO: redirect to logout page on admin-canary
      logout()
    }
    next()
  }
}])

export const client = (options = {}) =>
  new ApolloClient({
    ssrMode: true,
    networkInterface,
    ...options
  })

export function configureStore (initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument
    })
  )

  middlewares.push(client().middleware())

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  let store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  store.asyncReducers = {}

  api.interceptors.response.use(
    response => {
      return response
    },
    ({ response, ...error }) => {
      if (response && response.status === 401) {
        // TODO: redirect to logout page on admin-canary
        store.dispatch(logout())
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response, ...error })
    }
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      )
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
