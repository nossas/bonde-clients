import React from 'react'
import Widget from "./Widget.jsx"

export default class Block extends React.Component {
  render(){
    const { widgets } = this.props

    return(
      <div className="clearfix mb4">
        {
          widgets.map(function(widget){
            return(
              <Widget
                {...this.props}
                key={"widget-" + widget.id}
                widget={widget} />
            )
          }.bind(this))
        }
      </div>
    )
  }
}
