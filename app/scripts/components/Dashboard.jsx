var Dashboard = React.createClass({
  render: function(){
    return (
      <div>
        <span>{this.props.user.first_name} {this.props.user.last_name}</span>
      </div>
    );
  }
});

module.exports = Dashboard;
