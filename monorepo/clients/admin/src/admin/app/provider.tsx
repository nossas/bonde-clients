import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import urljoin from 'url-join'
import * as authTypes from '../account/redux/action-types'
import * as communityTypes from '../community/action-types'
import crossStorage from "../cross-storage-client"
// routing app
import AppRouting from '../pages/app'
// save on store
import { createAction } from '../utils/redux'
import ApplicationContextTypes from './context/types'

function Loading(): JSX.Element {
  return <h1>Signing...</h1>
}

interface MyProperties {
  app: {
    signing: boolean,
    signed: boolean,
    token: string
  }
}

interface MyState {
  signing: boolean
  signed: boolean
  token: string
}
class Application extends React.Component<MyProperties, MyState> {
  state: MyState = { signing: false, signed: false, token: undefined }

  getChildContext() {
    return { app: this.state }
  }

  componentDidMount() {
    const { location: { pathname } } = window
    const publicPaths = [/\/register\/?/, /\/subscriptions\/\d+\/edit\/?/, /\/playground\/?/]

    if (!publicPaths.some(pathRegex => pathRegex.test(pathname))) {
      crossStorage.onConnect()
        .then(async () => crossStorage.get('auth', 'community'))
        .then(async parameters => {
          const authJson = parameters[0]
          const communityJson = parameters[1]

          if (!authJson) {
            const error = new Error('unauthorized')
            error.status = 401
            return Promise.reject(error)
          }
          const { store } = this.props
          const { token } = JSON.parse(authJson)
          // authenticate on store
          const auth = { credentials: { 'access-token': token } }
          store.dispatch(createAction(authTypes.SIGN_SUCCESS, auth))

          // select community on store
          const community = JSON.parse(communityJson)
          if (community) {
            store.dispatch(createAction(communityTypes.REHYDRATE, community))
          }
          // authenticate on context
          this.setState({ signing: false, signed: true, token })

          return Promise.resolve()
        })
        .catch(error => {
          if (error && error.status === 401) {
            const domain = import.meta.env.VITELOGIN_URL || 'http://bonde.devel:5000/login'
            // TODO: Fix redirect, removed for change flux to select communities
            window.location.href = urljoin(domain, `?next=${window.location.href}`)
          } else {
            console.log('err', error)
            this.setState({ signing: false, signed: false, token: undefined })
          }
        })
    }
  }

  render() {
    const { signing } = this.state
    const { locale, messages, store, apolloClient } = this.props

    return signing ? <Loading /> : (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ApolloProvider store={store} client={apolloClient()}>
            <AppRouting />
          </ApolloProvider>
        </Provider>
      </IntlProvider>
    )
  }
}

Application.childContextTypes = ApplicationContextTypes

export default Application
