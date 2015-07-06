var DashboardMenu = React.createClass({
  render: function(){
    return (
      <div className="bg-gray p2 white">
        <span>{this.props.user.first_name} </span>
        <span>{this.props.user.last_name}</span>
      </div>
    );
  }
});

module.exports = DashboardMenu;
