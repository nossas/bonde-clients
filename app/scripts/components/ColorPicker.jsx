import React from 'react'
import Color from "./Color.jsx"

export default class ColorPicker extends React.Component {
  renderColors(bgClasses) {
    return bgClasses.map(function(bgClass){
      return(
        <Color {...this.props} key={"color-" + bgClass} bgClass={bgClass} selectedClass={this.props.selectedClass} onClick={this.props.onClick} />
      )
    }.bind(this))    
  }

  render() {
    const bgClasses = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6", "bg-7", "bg-8"]
    return (
      <div>
        {this.renderColors(bgClasses)}
      </div>
    )
  }
}
