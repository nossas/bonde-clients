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
    const bgClasses = ["bg-white", "bg-silver", "bg-gray", "bg-black", "bg-aqua", "bg-blue", "bg-navy", "bg-teal", "bg-green", "bg-olive", "bg-lime", "bg-yellow", "bg-orange", "bg-red", "bg-fuchsia", "bg-purple", "bg-maroon", "bg-darken-1", "bg-darken-2", "bg-darken-3", "bg-darken-4"]
    return (
      <div>
        {this.renderColors(bgClasses)}
      </div>
    )
  }
}
