import React from 'react'

export default class Mobilization extends React.Component {
  renderTopMenu() {
    return this.props.topMenu && React.cloneElement(this.props.topMenu, {...this.props})
  }

  render(){
    return(
      <div>
        { this.renderTopMenu() }
        <div className="flex flex-stretch">
          { this.props.sidebar && React.cloneElement(this.props.sidebar, {...this.props}) }
          { this.props.main && React.cloneElement(this.props.main, {...this.props}) }
        </div>
      </div>
    )
  }
}
