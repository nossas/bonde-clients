import React from 'react'
import ContentWidget from "./ContentWidget.jsx"

export default class Widget extends React.Component {
  render(){
    var className = "px2 col col-" + this.props.widget.size

    return(
      <div className={className}>
        <ContentWidget {...this.props} />
      </div>
    )
  }
}
