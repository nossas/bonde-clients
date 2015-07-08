import { Redirect, Router, Route, DefaultRoute } from 'react-router'
import { Provider } from 'redux/react'
import { createDispatcher, createRedux, composeStores } from 'redux'

// Middlewares
import { loggerMiddleware, thunkMiddleware } from './../middleware'

// Components
import Application from './Application.jsx'
import AppMenu from './AppMenu.jsx'
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import PageEdit from './PageEdit.jsx'

// Stores
import * as stores from './../stores'

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), loggerMiddleware ]
)

const redux = createRedux(dispatcher);

var App = React.createClass({
  render: function () {
    const { history } = this.props

    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }
});

function renderRoutes(history) {
  return(
    <Router history={history}>
      <Route component={Application}>
        <Route path="/" component={Home}/>
        <Route path="dashboard" component={Dashboard}>
          <Route path="/edit" component={PageEdit} />
        </Route>
      </Route>
    </Router>
  )
}

module.exports = App;
