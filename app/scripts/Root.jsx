import React from 'react'
import { Redirect, Router, Route, DefaultRoute } from 'react-router'
import { Provider } from 'redux/react'
import { createDispatcher, createRedux, composeStores } from 'redux'
import * as Paths from './Paths'

// Middlewares
import loggerMiddleware from './middleware/logger.js'
import thunkMiddleware from './middleware/thunk.js'

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

// Stores
import * as stores from './stores'

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), loggerMiddleware ]
)

const redux = createRedux(dispatcher)

export default class Root extends React.Component {
  render () {
    const { history } = this.props
    return (
      <Provider redux={redux}>
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
