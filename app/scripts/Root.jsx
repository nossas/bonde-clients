import React from 'react'
import { Provider } from 'react-redux'
import { Redirect, Router, Route, DefaultRoute } from 'react-router'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as Paths from './Paths'

// Middleware
import default as logger from './middleware/logger.js'

// Containers
import Application from './containers/Application.jsx'
import Mobilization from './containers/Mobilization.jsx'

// Pages
import Home from './pages/Home.jsx'
import EditMobilization from './pages/EditMobilization.jsx'
import NewContentBlock from './pages/NewContentBlock.jsx'
import ShowMobilization from './pages/ShowMobilization.jsx'

// Components
import MobilizationMenu from './components/MobilizationMenu.jsx'

// Reducers
import * as reducers from './reducers'

const reducer = combineReducers(reducers)
const finalCreateStore = applyMiddleware(thunk, logger)(createStore)
const store = finalCreateStore(reducer)

export default class Root extends React.Component {
  render () {
    const { history } = this.props
    return (
      <Provider store={store}>
        {renderRoutes.bind(null, history)}
      </Provider>
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
          <Route path="blocks">
            <Route path="new" components={{main: NewContentBlock, sidebar: MobilizationMenu}} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
