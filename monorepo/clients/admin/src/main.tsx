// import App from 'App'
// import { StrictMode } from 'react'
// import ReactDOM from 'react-dom'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { registerSW } from 'virtual:pwa-register'
// import './index.css'

// registerSW()

// const MAX_RETRIES = 1
// const queryClient = new QueryClient({
// 	defaultOptions: {
// 		queries: {
// 			staleTime: Number.POSITIVE_INFINITY,
// 			retry: MAX_RETRIES
// 		}
// 	}
// })

// ReactDOM.render(
// 	<StrictMode>
// 		<QueryClientProvider client={queryClient}>
// 			<App />
// 		</QueryClientProvider>
// 	</StrictMode>,
// 	document.querySelector('#root')
// )

import localeData from 'admin/intl/locale-data';
import { render } from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
import Application from './admin/app';
import { client } from './admin/createReducer';
import { configureStore } from './admin/store';

// const __PROD__ = import.meta.envNODE_ENV === 'production' || import.meta.envNODE_ENV === 'staging'
// const __TEST__ = import.meta.envNODE_ENV === 'test'

// if (__PROD__ || __TEST__) {
// 	Raven.config(import.meta.envREACT_APP_SENTRY_DSN_PUBLIC).install()
// }

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

const initialState = window.INITIAL_STATE || {
	intl: { currentLocale, messages: localeData }
}

// Set up Redux store
export const store = configureStore(initialState, { intl })

render((
	<Application
		locale={locale}
		messages={messages}
		store={store}
		apolloClient={client}
	/>
), document.querySelector('#root'))
