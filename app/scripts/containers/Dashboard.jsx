import React from 'react'
import DashboardMenu from './../components/DashboardMenu.jsx'
import { connect } from 'redux/react'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class Dashboard extends React.Component {
  render(){
    const mobilization = this.props.mobilizations[0]

    return (
      <div className="flex flex-stretch">
        <DashboardMenu {...this.props} mobilization={mobilization} />
        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props, mobilization: mobilization})}
      </div>
    )
  }
}
