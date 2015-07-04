var Dashboard = React.createClass({
  render: function(){
    return (
      <div>
        <span>{Auth.user.first_name} {Auth.user.last_name}</span>
      </div>
    );
  }
});

module.exports = Dashboard;
