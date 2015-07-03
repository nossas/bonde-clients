require('expose?jQuery!jquery');
require('expose?$!jquery');
require('expose?React!react')

// CSS
import '../styles/main.scss';

// Router
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

// Components
var App = require('./components/App.jsx');
var Home = require('./components/Home.jsx');

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Home}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
