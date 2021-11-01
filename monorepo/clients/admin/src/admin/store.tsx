import axios from 'axios'
import { applyMiddleware, compose, createStore } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
// import DevelopmentTools from './components/dev-tools'
import createReducer, { client } from './createReducer'

const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_API_REST || 'http://api-rest.bonde.devel'
})

const middlewares = [promise]

// const networkInterface = createNetworkInterface({
//   uri: import.meta.env.VITE_DOMAIN_API_GRAPHQL || 'http://api-graphql-deprecated.bonde.devel/graphql',
//   connectToDevTools: true
// })

// networkInterface.use([
//   {
//     applyMiddleware(request, next) {
//       if (!request.options.headers) {
//         request.options.headers = {}
//       }
//       // Non-use auth for authenticate mutation to make a new JWT Token
//       // Donation has a public method { fetchDonationGoalStats }
//       const requiredAuth = !['authenticate', 'fetchDonationGoalStats'].find(
//         x => x === request.request.operationName
//       )
//       if (requiredAuth) {
//         crossStorage.onConnect()
//           .then(async () => crossStorage.get('auth'))
//           .then(authJson => {
//             const auth = JSON.parse(authJson)
//             if (auth) {
//               request.options.headers.authorization = `Bearer ${auth.jwtToken || auth.token}`
//             }
//             next()
//           })
//       } else {
//         next()
//       }
//     }
//   }
// ])

// networkInterface.useAfter([{
//   applyAfterware({ response }, next) {
//     if (response.status === 401) {
//       logoutOnCanary()
//     }
//     next()
//   }
// }])

// export const client = (options = {}) =>
//   new ApolloClient({
//     ssrMode: true,
//     networkInterface,
//     ...options
//   })

export function configureStore(initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument
    })
  )

  middlewares.push(client().middleware())

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = import.meta.env.DEV ? createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  ) : createStore(
    createReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  store.asyncReducers = {}

  api.interceptors.response.use(
    response => response,
    async ({ response, ...error }) => {
      if (response && response.status === 401) {
        logoutOnCanary()
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response, ...error })
    }
  )

  // if (import.meta.envNODE_ENV === 'development' && module.hot) {
  //   module.hot.accept('./createReducer', () =>
  //     store.replaceReducer(require('./createReducer').default)
  //   )
  // }

  return store
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
