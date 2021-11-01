import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { combineReducers } from 'redux'
// Redux Form
import { reducer as form } from 'redux-form'
// Application
import auth, { initialState } from './account/redux/reducers'
import community from './community/reducers'
import wait from './components/await/redux/reducers'
import colorPicker from './components/color-picker/reducers'
import crossStorage from './cross-storage-client'
import intl from './intl/redux/reducers'
import mobilizations from './mobrender/redux/reducers'
import { normalizer as creditCardForm } from './subscriptions/forms/credit-card-form'
import { normalizer as recurringForm } from './subscriptions/forms/recurring-form'
import subscriptions from './subscriptions/redux/reducers'
    
const logoutOnCanary = () => {
  const domain = import.meta.env.VITE_LOGIN_URL || 'http://bonde.devel:5000'
  window.location.href = `${domain}/login?next=${window.location.href}`
}

// const api = axios.create({
//   baseURL: import.meta.env.VITE_DOMAIN_API_REST || 'http://api-rest.bonde.devel'
// })

// const middlewares = [promise]

const networkInterface = createNetworkInterface({
  uri: import.meta.env.VITE_DOMAIN_API_GRAPHQL || 'http://api-graphql-deprecated.bonde.devel/graphql',
  connectToDevTools: true
})

networkInterface.use([
  {
    applyMiddleware(request, next) {
      if (!request.options.headers) {
        request.options.headers = {}
      }
      // Non-use auth for authenticate mutation to make a new JWT Token
      // Donation has a public method { fetchDonationGoalStats }
      const requiredAuth = !['authenticate', 'fetchDonationGoalStats'].find(
        x => x === request.request.operationName
      )
      if (requiredAuth) {
        crossStorage.onConnect()
          .then(async () => crossStorage.get('auth'))
          .then(authJson => {
            const auth = JSON.parse(authJson)
            if (auth) {
              request.options.headers.authorization = `Bearer ${auth.jwtToken || auth.token}`
            }
            next()
          })
      } else {
        next()
      }
    }
  }
])

networkInterface.useAfter([{
  applyAfterware({ response }, next) {
    if (response.status === 401) {
      logoutOnCanary()
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

const sourceRequest = (state = initialState, action = {}) => state

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer(asyncReducers) {
  return combineReducers({
    sourceRequest,
    form: form.normalize({
      creditCardForm,
      recurringForm
    }),
    apollo: client().reducer(),
    auth,
    wait,
    mobilizations,
    community,
    colorPicker,
    subscriptions,
    intl,
    ...asyncReducers
  })
}
