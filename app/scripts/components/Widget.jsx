import React from 'react'
import WidgetContent from "./WidgetContent.jsx"

export default class Widget extends React.Component {
  render(){
    var className = "border p2 col col-" + this.props.widget.size

    return(
      <div className={className}>
        <WidgetContent {...this.props} />
      </div>
    )
  }
}
