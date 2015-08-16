import React from 'react'

export default class Mobilization extends React.Component {
  render(){
    return(
      <div className="flex flex-stretch">
        { this.props.sidebar && React.cloneElement(this.props.sidebar, {...this.props}) }
        { this.props.main && React.cloneElement(this.props.main, {...this.props}) }
      </div>
    )
  }
}
