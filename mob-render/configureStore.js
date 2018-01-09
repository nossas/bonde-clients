import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import apiClient from './apiClient'
import apolloClient from './apolloClient'
import { intl as intlClient } from './intlReducer'
import createReducer, { sourceReqCreateReducer } from './createReducer'

const middlewares = [
  promise,
  thunk.withExtraArgument({
    intl: intlClient,
    api: apiClient,
    axios
  }),
  apolloClient().middleware()
]

// main function
export default (initialState, options) => {
  // https://github.com/kirill-konshin/next-redux-wrapper
  let host = ''
  if (options && options.req) {
    host = options.req.headers['host']
  }

  return createStore(
    createReducer({
      req: sourceReqCreateReducer({ host })
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  )
}
