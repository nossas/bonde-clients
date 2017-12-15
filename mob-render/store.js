import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { Reducer as WebviewerReducer } from './webviewer/webviewer'

const GRAPHQL_URL = process.env.GRAPHQL_URL !== undefined ? process.env.GRAPHQL_URL : 'http://localhost:3003'
const API_URL = process.env.API_URL !== undefined ? process.env.API_URL : 'http://localhost:3000'

const api = axios.create({ baseURL: API_URL })

const middlewares = [promise]

const sourceRequestReducerInitialState = {
  host: '',
  protocol: ''
}
const sourceRequestReducer = (state = sourceRequestReducerInitialState, action) => state

// intl
const t = type => `intl/${type}`

export const SET_CURRENT_LOCALE = t('SET_CURRENT_LOCALE')

const intlReducerInitialState = {
  currentLocale: null,
  defaultLocale: null,
  locales: [],
  messages: {}
}

const intlReducer = (state = intlReducerInitialState, action) => {
  switch (action.type) {
    case t.SET_CURRENT_LOCALE:
      return { ...state, currentLocale: action.payload }

    default:
      return state
  }
}

// Only combine reducers needed for initial render, others will be
// added async
export function createReducer (asyncReducers) {
  return combineReducers({
    sourceRequestReducer,
    apollo: client().reducer(),
    mobilizations: WebviewerReducer.reducer,
    intlReducer,
    ...asyncReducers
  })
}

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_URL,
  connectToDevTools: true
})

export const client = (options = {}) =>
  new ApolloClient({
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

  let store = createStore(
    createReducer(),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      f => f // devtools
    )
  )

  store.asyncReducers = {}

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
