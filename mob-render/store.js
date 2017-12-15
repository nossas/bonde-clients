import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
// import cookie from 'react-cookie'
// import DefaultServerConfig from '~server/config'
// import createReducer from './createReducer'
// import DevTools from './components/dev-tools'
// import { logout } from '~client/account/redux/action-creators'
import { Reducer as WebviewerReducer } from './webviewer/webviewer'

const GRAPHQL_URL = process.env.GRAPHQL_URL !== undefined ? process.env.GRAPHQL_URL : 'http://localhost:3003'
const API_URL = process.env.API_URL !== undefined ? process.env.API_URL : 'http://localhost:3000'

const api = axios.create({ baseURL: API_URL })

const middlewares = [promise]

// Redux Form
// import { reducer as form } from 'redux-form'
// import { normalizer as creditCardForm } from '~client/subscriptions/forms/credit-card-form'
// import { normalizer as recurringForm } from '~client/subscriptions/forms/recurring-form'

// Reapop
// import { reducer as notificationsReducer } from 'reapop'

// Apollo
// import { client } from './store'

// Application
// import auth from '~client/account/redux/reducers'
// import wait from '~client/components/await/redux/reducers'
// import mobilizations from '~client/mobrender/redux/reducers'
// import community from '~client/community/reducers'
// import colorPicker from '~client/components/color-picker/reducers'
// import subscriptions from '~client/subscriptions/redux/reducers'
// import intl from '../intl/redux/reducers'

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
    // form: form.normalize({
    //   creditCardForm,
    //   recurringForm
    // }),
    apollo: client().reducer(),
    // notifications: notificationsReducer(),
    // auth,
    // wait,
    mobilizations: WebviewerReducer.reducer(),
    // community,
    // colorPicker,
    // subscriptions,
    intlReducer,
    ...asyncReducers
  })
}

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_URL,
  connectToDevTools: true
})

// networkInterface.use([
//   {
//     applyMiddleware (req, next) {
//       if (!req.options.headers) {
//         req.options.headers = {}
//       }
//       // Non-use auth for authenticate mutation to make a new JWT Token
//       const requiredAuth = req.request.operationName !== 'authenticate'

//       // cookie.plugToRequest(req)
//       // const state = cookie.load('auth') || {}
//       // if (state.auth && state.auth.credentials && requiredAuth) {
//       //   const token = state.auth.credentials['access-token']
//       //   req.options.headers.authorization = `Bearer ${token}`
//       // }
//       next()
//     }
//   }
// ])

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

  // api.interceptors.response.use(
  //   response => {
  //     return response
  //   },
  //   ({ response, ...error }) => {
  //     if (response && response.status === 401) {
  //       store.dispatch(logout())
  //     }
  //     // eslint-disable-next-line prefer-promise-reject-errors
  //     return Promise.reject({ response, ...error })
  //   }
  // )

  // if (process.env.NODE_ENV === 'development') {
  //   if (module.hot) {
  //     module.hot.accept('./createReducer', () =>
  //       store.replaceReducer(require('./createReducer').default)
  //     )
  //   }
  // }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
