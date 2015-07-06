var PubSub = require('pubsub-js');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

Auth.configure({
  apiUrl: process.env.BASE_URL,
  handleTokenValidationResponse: function(resp) {
    // https://github.com/lynndylanhurley/j-toker/issues/10
    PubSub.publish("auth.validation.success", resp.data)
    return resp.data;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      user: Auth.user
    };
  },

  componentWillMount: function() {
    PubSub.subscribe('auth', function() {
      this.setState({user: Auth.user});
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <RouteHandler {...this.state} />
      </div>
    );
  }
});

module.exports = App;
