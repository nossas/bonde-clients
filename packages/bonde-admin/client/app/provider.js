import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import crossStorage from '~client/cross-storage-client'
// save on store
import { createAction } from '~client/utils/redux'
import * as authTypes from '~client/account/redux/action-types'
import * as communityTypes from '~client/community/action-types'
// routing app
import AppRouting from '~root/pages/app'
import ApplicationContextTypes from './context/types'

const Loading = () => <h1>Signing...</h1>

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signing: false, signed: false, token: undefined }
  }

  getChildContext () {
    return { app: this.state }
  }

  componentDidMount () {
    crossStorage.onConnect()
      .then(() => {
        return crossStorage.get('auth', 'community')
      })
      .then(params => {
        const authJson = params[0]
        const communityJson = params[1]

        if (!authJson) {
          const err = new Error('unauthorized')
          err.status = 401
          return Promise.reject(err)
        }
        const { store } = this.props
        const { jwtToken } = JSON.parse(authJson)
        // authenticate on store
        const auth = { credentials: { 'access-token': jwtToken } }
        store.dispatch(createAction(authTypes.SIGN_SUCCESS, auth))

        // select community on store
        const community = JSON.parse(communityJson)
        if (community) {
          store.dispatch(createAction(communityTypes.REHYDRATE, community))
        }
        // authenticate on context
        this.setState({ signing: false, signed: true, token: jwtToken })

        return Promise.resolve()
      })
      .catch(err => {
        if (err && err.status === 401) {
          const loginUrl = process.env.LOGIN_URL || 'http://admin-canary.bonde.devel:5002/auth/login'
          window.location.href = `${loginUrl}?next=${window.location.href}`
        } else {
          console.log('err', err)
          this.setState({ signing: false, signed: false, token: undefined })
        }
      })
  }

  render () {
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
