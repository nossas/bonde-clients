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

Auth.configure({ apiUrl: process.env.BASE_URL });

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
