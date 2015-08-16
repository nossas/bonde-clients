import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Router, Route, DefaultRoute } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import * as Paths from './Paths'

// Containers
import Application from './containers/Application.jsx'
import Mobilization from './containers/Mobilization.jsx'
import Mobilizations from './containers/Mobilizations.jsx'

// Pages
import Home from './pages/Home.jsx'
import ListMobilizations from './pages/ListMobilizations.jsx'
import NewMobilization from './pages/NewMobilization.jsx'
import EditMobilization from './pages/EditMobilization.jsx'
import NewBlock from './pages/NewBlock.jsx'
import ShowMobilization from './pages/ShowMobilization.jsx'
import BasicsConfigMobilization from './pages/BasicsConfigMobilization.jsx'
import CityConfigMobilization from './pages/CityConfigMobilization.jsx'
import AnalyticsConfigMobilization from './pages/AnalyticsConfigMobilization.jsx'

// Components
import MobilizationsMenu from './components/MobilizationsMenu.jsx'
import MobilizationMenu from './components/MobilizationMenu.jsx'

// Reducers
import * as reducers from './reducers'

let finalCreateStore;
if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
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
        <Route path="/" component={Home} />
        <Route component={Mobilizations}>
          <Route path="/mobilizations" components={{main: ListMobilizations, sidebar: MobilizationsMenu}} />
          <Route path="/mobilizations/new" components={{main: NewMobilization, sidebar: MobilizationsMenu}} />
          <Route component={Mobilization} >
            <Route path="/mobilizations/:mobilization_id" components={{main: ShowMobilization}} />
            <Route path="/mobilizations/:mobilization_id/edit" components={{main: EditMobilization, sidebar: MobilizationMenu}} />
            <Route path="/mobilizations/:mobilization_id/config/basics" components={{main: BasicsConfigMobilization, sidebar: MobilizationMenu}} />
            <Route path="/mobilizations/:mobilization_id/config/city" components={{main: CityConfigMobilization, sidebar: MobilizationMenu}} />
            <Route path="/mobilizations/:mobilization_id/config/analytics" components={{main: AnalyticsConfigMobilization, sidebar: MobilizationMenu}} />
            <Route path="/mobilizations/:mobilization_id/blocks/new" components={{main: NewBlock, sidebar: MobilizationMenu}} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
