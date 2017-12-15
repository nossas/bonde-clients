import React from 'react'
// import fetch from 'isomorphic-fetch'
// import qs from 'qs'
import { Mobilization, Reducer as MobilizationReducer } from '../webviewer/webviewer'
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

export const store = configureStore(initialState, { intl })

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const { actions: MobilizationActions } = MobilizationReducer
    const host = req.headers['host']
    // eslint-disable-next-line
    const regex = host.match(`(.+)\.${APP_DOMAIN}`)

    const where = regex
      ? { slug: regex[1].replace(/^www\./, '') }
      : { custom_domain: host }

    const promises = []
    console.log()
    promises.push(store.dispatch(MobilizationActions.asyncFilterMobilization(where)))
    promises.push(store.dispatch(MobilizationActions.asyncFilterBlock(where)))
    promises.push(store.dispatch(MobilizationActions.asyncFilterWidget(where)))
    return Promise.all(promises).then((values) => ({
      mobilization: values[0],
      blocks: values[1],
      widgets: values[2]
    }))
  }

  render () {
    return this.props.mobilization ? (
      <IntlProvider locale={locale} messages={messages}>
        <Provider store={store}>
          <ApolloProvider store={store} client={client()}>
            <Mobilization editable={false} />
          </ApolloProvider>
        </Provider>
      </IntlProvider>
    ) : (<h2>Loading...</h2>)
  }
}
