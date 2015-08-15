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

// Pages
import Home from './pages/Home.jsx'
import EditMobilization from './pages/EditMobilization.jsx'
import NewContentBlock from './pages/NewContentBlock.jsx'
import ShowMobilization from './pages/ShowMobilization.jsx'
import ConfigMobilization from './pages/ConfigMobilization.jsx'

// Components
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
        <Route path="/" component={Home}/>
        <Route path={Paths.mobilization(':mobilization_id')} component={Mobilization}>
          <Route path="show" components={{main: ShowMobilization}} />
          <Route path="edit" components={{main: EditMobilization, sidebar: MobilizationMenu}} />
          <Route path="config" components={{main: ConfigMobilization, sidebar: MobilizationMenu}} />
          <Route path="blocks">
            <Route path="new" components={{main: NewContentBlock, sidebar: MobilizationMenu}} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
