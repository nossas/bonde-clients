require('expose?jQuery!jquery');
require('expose?$!jquery');
require('expose?React!react');
require('expose?Auth!j-toker');

// CSS
import '../styles/main.scss';

var App = require('./components/App.jsx');
import HashHistory from 'react-router/lib/HashHistory'

const history = new HashHistory();

React.render(<App history={history} />, document.body);
