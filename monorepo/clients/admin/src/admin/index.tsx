// //import 'react-app-polyfill/ie9';
// //
// import { render } from 'react-dom'
// import { IntlProvider, addLocaleData } from 'react-intl'
// import pt from './intl/locale-data/pt-BR'
// import es from './intl/locale-data/es'
// import en from './intl/locale-data/en'
// import Raven from 'raven-js'
// import localeData from './intl/locale-data'
// import Application from './app'
// import { configureStore, client } from './store'

// // const __PROD__ = import.meta.envNODE_ENV === 'production' || import.meta.envNODE_ENV === 'staging'
// // const __TEST__ = import.meta.envNODE_ENV === 'test'

// // Set up React-Intl
// addLocaleData([...pt, ...es, ...en])
// const defaultLocale = 'pt-BR'
// const { languages, language } = window.navigator
// const currentLocale = ((languages && languages[0]) || language) || defaultLocale
// const languageWithoutRegionCode = currentLocale.toLowerCase().split(/[_-]+/)[0]
// const locale = currentLocale
// const messages = (
//   localeData[currentLocale] ||
//   localeData[languageWithoutRegionCode] ||
//   localeData[defaultLocale]
// )
// const intlProvider = new IntlProvider({ locale, messages })
// const { intl } = intlProvider.getChildContext()

// const initialState = window.INITIAL_STATE || {
//   intl: { currentLocale, messages: localeData }
// }

// // Set up Redux store
// export const store = configureStore(initialState, { intl })

// render((
//   <Application
//     locale={locale}
//     messages={messages}
//     store={store}
//     apolloClient={client}
//   />
// ), document.getElementById('root'))
