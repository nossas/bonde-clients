var DashboardMenu = require("./DashboardMenu.jsx");
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;
import { connect } from 'redux/react';

@connect(state => ({
  mobilization: state.mobilization
}))

export default class Dashboard extends React.Component {
  render(){
    return (
      <div className="flex flex-stretch">
        <DashboardMenu user={this.props.user} mobilization={this.props.mobilization} />
        {this.props.children &&
          React.cloneElement(this.props.children, {user: this.props.user})}
      </div>
    );
  }
}
