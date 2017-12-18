import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { configureStore, client } from '../store'

import { IntlProvider, addLocaleData } from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import localeData from './../locale-data'

const APP_DOMAIN = process.env.APP_DOMAIN !== undefined ? process.env.APP_DOMAIN : 'localhost:8000'
// const API_URL = process.env.API_URL !== undefined ? process.env.API_URL : 'http://localhost:3000'

const initialState = {} || {
  intl: { currentLocale: 'pt-BR', messages: localeData }
}

addLocaleData([...pt, ...es, ...en])
// const { intl: { currentLocale, messages: localeMessages } } = initialState
const currentLocale = 'pt-BR'
const locale = currentLocale
const messages = {}
const intlProvider = new IntlProvider({ locale, messages })
const { intl } = intlProvider.getChildContext()

const store = configureStore(initialState, { intl })

const ProviderStore = (Page) => {
  return class extends React.Component {
    static getInitialProps ({ req }) {
      return { headers: req.headers }
    }

    render () {
      return (
        <IntlProvider locale={locale} messages={messages}>
          <Provider store={store}>
            <ApolloProvider store={store} client={client()}>
              <Page
                headers={this.props.headers}
                appDomain={APP_DOMAIN}
              />
            </ApolloProvider>
          </Provider>
        </IntlProvider>
      )
    }
  }
}

export default ProviderStore
