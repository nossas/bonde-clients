import React from 'react'
import Widget from "./Widget.jsx"

export default class Block extends React.Component {
  filterWidgets(widgets, block){
    return widgets.filter(function(widget){
      return widget.block_id == block.id
    }.bind(this))
  }

  renderWidgets(widgets){
    return widgets.map(function(widget){
      return(
        <Widget
          {...this.props}
          key={"widget-" + widget.id}
          widget={widget} />
      )
    }.bind(this))
  }

  render(){
    const { widgets, block } = this.props
    const filteredWidgets = this.filterWidgets(widgets, block)
    return(
      <div className="clearfix py4">
        { this.renderWidgets(filteredWidgets) }
      </div>
    )
  }
}
