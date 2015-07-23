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
import Dashboard from './containers/Dashboard.jsx'

// Pages
import Home from './pages/Home.jsx'
import PageEdit from './pages/PageEdit.jsx'
import NewContentBlock from './pages/NewContentBlock.jsx'

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
        <Route path={Paths.mobilization(':mobilization_id')} component={Dashboard}>
          <Route path="edit" component={PageEdit} />
          <Route path="blocks">         
            <Route path="new" component={NewContentBlock} />
          </Route>
        </Route>
      </Route>
    </Router>
  )
}
