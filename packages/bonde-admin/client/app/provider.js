import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { CrossStorageClient } from 'cross-storage'
import AppRouting from '~root/pages/app'
import ApplicationContextTypes from './context/types'

const Loading = () => <h1>Signing...</h1>

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = { signing: true, signed: false, token: undefined }
    // TODO: Check this variable, its coming undefined
    this.storage = new CrossStorageClient(process.env.CROSS_STORAGE_URL || 'http://cross-storage.bonde.devel')
  }

  getChildContext () {
    return { app: this.state }
  }

  componentDidMount () {
    this.storage.onConnect()
      .then(() => {
        return this.storage.get('auth')
      })
      .then(res => {
        const { jwtToken } = JSON.parse(res)
        this.setState({ signing: false, signed: true, token: jwtToken })
      })
      .catch(err => {
        console.log('err', err)
        this.setState({ signing: false, signed: false, token: undefined })
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
