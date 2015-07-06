var DashboardMenu = require("./DashboardMenu.jsx");
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      mobilization: {
        name: "Bicicletada contra a redução da maioridade penal",
        pages: [{
          blocks: [{
            uuid: "ffxx1122A2",
            columns: [{
              size: 12,
              type: "content",
              content: "col-12"
            }]
          },{
            uuid: "21398712983712",
            columns: [{
              size: 6,
              type: "content",
              content: "col-6"
            },{
              size: 6,
              type: "content",
              content: "col-6"
            }]
          },{
            uuid: "aldkashdkajs",
            columns: [{
              size: 4,
              type: "content",
              content: "col-4"
            },{
              size: 4,
              type: "content",
              content: "col-4"
            },{
              size: 4,
              type: "content",
              content: "col-4"
            }]
          }]
        }]
      }
    }
  },

  render: function(){
    return (
      <div className="flex flex-stretch">
        <DashboardMenu user={this.props.user} mobilization={this.state.mobilization} />
        <RouteHandler mobilization={this.state.mobilization} />
      </div>
    );
  }
});

module.exports = Dashboard;
