import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import Raven from 'raven-js'

import localeData from '~root/intl/locale-data'
import App from '~root/pages/app'
import { configureStore, client } from '~client/store'

const __PROD__ = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
const __TEST__ = process.env.NODE_ENV === 'test'

if (__PROD__ || __TEST__) {
  Raven.config(process.env.SENTRY_DSN_PUBLIC).install()
}

// Set up React-Intl
addLocaleData([...pt, ...es, ...en])
const defaultLocale = 'pt-BR'
const { languages, language } = window.navigator
const currentLocale = ((languages && languages[0]) || language) || defaultLocale
const languageWithoutRegionCode = currentLocale.toLowerCase().split(/[_-]+/)[0]
const locale = currentLocale
const messages = (
  localeData[currentLocale] ||
  localeData[languageWithoutRegionCode] ||
  localeData[defaultLocale]
)
const intlProvider = new IntlProvider({ locale, messages })
const { intl } = intlProvider.getChildContext()

// Set up redux initial state
const hydrateInitialState = keys => {
  const extracted = {}
  keys.forEach(key => {
    const data = window.localStorage.getItem(key) || '{}'
    const parsed = JSON.parse(data)
    if (Object.keys(parsed).length > 0) {
      extracted[key] = parsed
    }
  })
  return extracted
}

const initialState = window.INITIAL_STATE || {
  intl: { currentLocale, messages: localeData },
  ...hydrateInitialState(['auth', 'community'])
}

// Set up Redux store
export const store = configureStore(initialState, { intl })

const AppRouter = () => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <ApolloProvider store={store} client={client()}>
          <App />
        </ApolloProvider>
      </Provider>
    </IntlProvider>
  )
}

render(<AppRouter />, document.getElementById('root'))
