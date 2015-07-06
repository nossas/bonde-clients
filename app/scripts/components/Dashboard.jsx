var DashboardMenu = require("./DashboardMenu.jsx");
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var Dashboard = React.createClass({
  render: function(){
    return (
      <div className="flex flex-stretch">
        <DashboardMenu {...this.props} />
        <RouteHandler {...this.state} />
      </div>
    );
  }
});

module.exports = Dashboard;
