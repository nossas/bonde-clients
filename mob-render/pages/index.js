import React from 'react'
import withRedux from 'next-redux-wrapper'
// React redux
import { Provider } from 'react-redux'
// Intl
import { IntlProvider } from 'react-intl'
import { locale, messages } from '../intlReducer'
// ApolloClient
import { ApolloProvider } from 'react-apollo'
import apolloClient from '../apolloClient'
// Store
import configureStore from '../configureStore'
// Webviewer
import {
  Mobilization as MobilizationApp,
  Reducer as MobilizationRedux
} from '../webviewer/webviewer'
import styles from './../webviewer/main.dba55199cd8fb7024923.css'

class Page extends React.Component {
  static async getInitialProps ({ store }) {
    const { dispatch, getState } = store
    const host = getState()['req']['host']
    const appDomain = 'bonde.devel'
    if (host) {
      const {
        asyncFilterMobilization,
        asyncFilterBlock,
        asyncFilterWidget
      } = MobilizationRedux.actions
      // eslint-disable-next-line
      const regex = host.match(`(.+)\.${appDomain}`)

      const where = regex
        ? { slug: regex[1].replace(/^www\./, '') }
        : { custom_domain: host }

      const promises = []
      await dispatch(asyncFilterMobilization(where))
      await dispatch(asyncFilterBlock(where))
      await dispatch(asyncFilterWidget(where))
    }
    return { store }
  }

  render () {
    return (
      <div>
        <style global jsx>{styles}</style>
        <IntlProvider locale={locale} messages={messages}>
          <Provider store={this.props.store}>
            <ApolloProvider store={this.props.store} client={apolloClient()}>
              <MobilizationApp editable={false} />
            </ApolloProvider>
          </Provider>
        </IntlProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { mobilizations: { list: { currentId, data, isLoaded } } } = state
  if (currentId) {
    return {
      isLoaded: isLoaded,
      mobilization: data.filter(({ id }) => id === currentId)[0]
    }
  }
  return { isLoaded: isLoaded }
}

export default withRedux(configureStore, mapStateToProps)(Page)
