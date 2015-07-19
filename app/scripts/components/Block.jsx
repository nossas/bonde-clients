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
      editingBackground: false,
      bgClass: props.block.bg_class
    }
    const { dispatch } = this.props
    this.bindedBlockActions = bindActionCreators(BlockActions, dispatch)
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
    if(this.state.editingBackground) {
      return(
        <div className="clearfix bg-white p2">
          <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
        </div>
      )
    }
  }

  handleColorClick(event) {
    this.setState({editingBackground: false})
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        bg_class: event.target.getAttribute('data-bg-class')
      }
    })
  }

  handleEditBackgroundClick() {
    this.setState({editingBackground: true})
  }

  handleMoveUpClick() {
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        position: this.props.block.position - 1
      }
    })
  }

  handleMoveDownClick() {
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        position: this.props.block.position + 1
      }
    })
  }

  render(){
    const { widgets, block } = this.props
    const filteredWidgets = this.filterWidgets(widgets, block)
    return(
      <div className={classnames("clearfix", this.props.block.bg_class)}>
        <div className="right-align py2">
          <button className="button mr2" onClick={::this.handleEditBackgroundClick}>Alterar cor de fundo</button>
          <button className="button mr2" disabled={this.props.block.position == 1} onClick={::this.handleMoveUpClick}>Mover para cima</button>
          <button className="button mr2" disabled={this.props.block.position == this.props.blocks.length} onClick={::this.handleMoveDownClick}>Mover para baixo</button>
        </div>
        { this.renderColorPicker() }
        <div className="clearfix py4">
          { this.renderWidgets(filteredWidgets) }
        </div>
      </div>
    )
  }
}
