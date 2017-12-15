import React from 'react'
import fetch from 'isomorphic-fetch'
import qs from 'qs'
import { Mobilization } from '../webviewer/webviewer'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { configureStore, client } from '../store'

import { IntlProvider, addLocaleData } from 'react-intl'
import pt from 'react-intl/locale-data/pt'
import es from 'react-intl/locale-data/es'
import en from 'react-intl/locale-data/en'
import localeData from '../intl/locale-data'

const APP_DOMAIN = 'localhost:8000'
const API_URL = 'https://api.staging.bonde.org'

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

export const store = configureStore(initialState, { intl })

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    if (req) {
      const host = req.headers['host']
      // eslint-disable-next-line
      const regex = host.match(`(.+)\.${APP_DOMAIN}`)

      const where = regex
        ? { slug: regex[1].replace(/^www\./, '') }
        : { custom_domain: host }
      const urls = ['/mobilizations', '/blocks', '/widgets']
      const endpoints = urls.map(endpoint =>
        `${API_URL}${endpoint}?${qs.stringify(where)}`)
      // fetch mobilizations
      let res = await fetch(endpoints[0])
      const mobilization = (await res.json())[0]
      // fetch blocks
      res = await fetch(endpoints[1])
      const blocks = await res.json()
      // fetch widgets
      res = await fetch(endpoints[2])
      const widgets = await res.json()

      return { mobilization, blocks, widgets }
    }
  }

  render () {
    return this.props.mobilization ? (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ApolloProvider store={store} client={client()}>
            <Mobilization editable={false} {...this.props} />
          </ApolloProvider>
        </Provider>
      </IntlProvider>
    ) : (<h1>Not found!</h1>)
  }
}
