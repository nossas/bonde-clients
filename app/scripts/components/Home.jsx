var LoginForm = require('./LoginForm.jsx')

var Home = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="lg-col-4">
          <h2>Login</h2>
          <LoginForm />
        </div>
      </div>
    );
  }
});

module.exports = Home;
