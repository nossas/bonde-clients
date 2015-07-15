import React from 'react'
import Widget from "./Widget.jsx"
import classnames from 'classnames'

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
      <div className={classnames("clearfix", "py4", block.bg_class)}>
        { this.renderWidgets(filteredWidgets) }
      </div>
    )
  }
}
