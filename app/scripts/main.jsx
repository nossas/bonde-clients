require('expose?jQuery!jquery');
require('expose?$!jquery');
require('expose?React!react');
require('expose?Auth!j-toker');

// CSS
import '../styles/main.scss';

// Router
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;

// Pages
// TODO: rename page components to "ComponentPage"
var Home = require('./components/Home.jsx');
var Dashboard = require('./components/Dashboard.jsx');
var App = require('./components/App.jsx');
var PageEdit = require('./components/PageEdit.jsx')

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="dashboard" path="dashboard" handler={Dashboard}>
      <DefaultRoute name="pageEdit" path="/" handler={PageEdit} />
    </Route>
  </Route>
);

ReactRouter.run(routes, function(Handler) {
  var params = { user: Auth.user };
  React.render(<Handler />, document.body);
})
