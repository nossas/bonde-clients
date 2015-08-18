import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Router, Route, DefaultRoute } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as Paths from './Paths'
import ua from 'universal-analytics'

// Containers
import Application from './containers/Application.jsx'
import Mobilization from './containers/Mobilization.jsx'
import Mobilizations from './containers/Mobilizations.jsx'

// Pages
import Login from './pages/Login.jsx'
import ListMobilizations from './pages/ListMobilizations.jsx'
import NewMobilization from './pages/NewMobilization.jsx'
import EditMobilization from './pages/EditMobilization.jsx'
import NewBlock from './pages/NewBlock.jsx'
import ShowMobilization from './pages/ShowMobilization.jsx'
import MobilizationBasics from './pages/MobilizationBasics.jsx'
import MobilizationCity from './pages/MobilizationCity.jsx'
import MobilizationAnalytics from './pages/MobilizationAnalytics.jsx'

// Components
import MobilizationsMenu from './components/MobilizationsMenu.jsx'
import MobilizationMenu from './components/MobilizationMenu.jsx'
import TopMenu from './components/TopMenu.jsx'

// Reducers
import * as reducers from './reducers'

let finalCreateStore
if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools')
  finalCreateStore = compose(
    applyMiddleware(thunk, logger),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    createStore
 )
} else {
  finalCreateStore = applyMiddleware(thunk)(createStore)
}

const reducer = combineReducers(reducers)
const store = finalCreateStore(reducer)

export default class Root extends React.Component {
  render () {
    const { history } = this.props

    history.addChangeListener(() => {
      ua(process.env.GOOGLE_ANALYTICS_CODE, {https: true}).
        pageview(history.location.pathname).send()
    })

    let debugPanel
    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
      debugPanel = (
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      )
    }

    return (
      <div>
        <Provider store={store}>
          {renderRoutes.bind(null, history)}
        </Provider>
        {debugPanel}
      </div>
    )
  }
}

function renderRoutes(history) {
  return(
    <Router history={history}>
      <Route component={Application}>
        <Route path="/" component={Login} />
        <Route component={Mobilizations}>
          <Route path="/mobilizations" components={{main: ListMobilizations, topMenu: TopMenu}} />
          <Route path="/mobilizations/new" components={{main: NewMobilization, topMenu: TopMenu}} />
          <Route component={Mobilization} >
            <Route path="/mobilizations/:mobilization_id" components={{main: ShowMobilization}} />
            <Route path="/mobilizations/:mobilization_id/edit" components={{main: EditMobilization, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/basics" components={{main: MobilizationBasics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/city" components={{main: MobilizationCity, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/cityNew" components={{main: MobilizationCity, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/analytics" components={{main: MobilizationAnalytics, sidebar: MobilizationMenu, topMenu: TopMenu}} />
            <Route path="/mobilizations/:mobilization_id/blocks/new" components={{main: NewBlock, sidebar: MobilizationMenu, topMenu: TopMenu}} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
