import React from 'react'
import Widget from "./Widget.jsx"
import ColorPicker from "./../components/ColorPicker.jsx"
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'

export default class Block extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      bgClass: props.block.bg_class
    }
  }

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

  renderColorPicker(){
    if(this.state.editing) {
      return(
        <div className="clearfix bg-white p2">
          <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
        </div>
      )
    }
  }

  handleColorClick(event) {
    this.setState({editing: false, bgClass: event.target.getAttribute('data-bg-class')})
    const { dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        bg_class: event.target.getAttribute('data-bg-class')
      }
    })
  }

  handleEditBackgroundClick() {
    this.setState({editing: true})
  }

  render(){
    const { widgets, block } = this.props
    const filteredWidgets = this.filterWidgets(widgets, block)
    return(
      <div className={classnames("clearfix", this.state.bgClass)}>
        <div className="right-align">
          <button className="button" onClick={::this.handleEditBackgroundClick}>Alterar cor de fundo</button>
        </div>
        { this.renderColorPicker() }
        <div className="clearfix py4">
          { this.renderWidgets(filteredWidgets) }
        </div>
      </div>
    )
  }
}
