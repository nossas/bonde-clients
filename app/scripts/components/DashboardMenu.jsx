import React from 'react'

export default class DashboardMenu extends React.Component {
  render(){
    var user = this.props.user
    var mobilization = this.props.mobilization

    return (
      <div className="bg-gray p2 white">
        <div>
          {user.first_name} {user.last_name}
        </div>
        <div>
          <h3 className="silver">Mobilização</h3>
          {mobilization.name}
        </div>
      </div>
    )
  }
}
