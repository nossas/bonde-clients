import React from 'react'
import { Widget, ColorPicker, DropDownMenu, DropDownMenuItem } from './'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'

export default class Block extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
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
        <div>
          <div className="absolute full-width top-0 left-0 bg-darken-4" style={{zIndex: 9999}}>
            <ColorPicker {...this.props} selectedClass={this.props.block.bg_class} onClick={::this.handleColorClick} />
            <button className="button button-transparent border rounded white mt1 ml1" onClick={::this.handleCancelEdit}>Cancelar</button>
          </div>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleCancelEdit}
            style={{zIndex: 9998}} />
        </div>
      )
    }
  }

  handleKeyUp(event){
    if (event.keyCode == 27) {
      this.setState({editingBackground: false})
    }
  }

  handleCancelEdit(){
    this.setState({editingBackground: false})
  }

  handleColorClick(event) {
    this.setState({editingBackground: false})
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        bg_class: event.currentTarget.getAttribute('data-bg-class')
      }
    })
  }

  handleEditBackgroundClick() {
    this.setState({editingBackground: true})
  }

  handleMoveUpClick() {
    this.bindedBlockActions.moveBlockUp({
      mobilization_id: this.props.mobilization.id,
      block: this.props.block,
      blocks: this.props.blocks
    })
  }

  handleMoveDownClick() {
    this.bindedBlockActions.moveBlockDown({
      mobilization_id: this.props.mobilization.id,
      block: this.props.block,
      blocks: this.props.blocks
    })
  }

  handleToggleHiddenClick() {
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        hidden: !this.props.block.hidden
      }
    })
  }

  handleRemoveClick() {
    if (confirm("Você tem certeza que quer remover este bloco?")) {
      this.bindedBlockActions.removeBlock({
        mobilization_id: this.props.mobilization.id,
        block_id: this.props.block.id
      })
    }
  }

  handleMouseOver() {
    this.setState({hasMouseOver: true})
  }

  handleMouseOut() {
    this.setState({hasMouseOver: false})
  }
  
  render(){
    const { widgets, block, blocks, canMoveUp, canMoveDown } = this.props
    const filteredWidgets = this.filterWidgets(widgets, block)
    return(
      <div className={classnames("clearfix", "relative", block.bg_class)} onKeyUp={::this.handleKeyUp} onMouseOver={::this.handleMouseOver} onMouseOut={::this.handleMouseOut} style={(block.bg_image ? {backgroundImage: `url(${block.bg_image})`} : null)}>
        <DropDownMenu className={(this.state.hasMouseOver ? "" : "display-none")} icon="cog">
          <DropDownMenuItem onClick={::this.handleEditBackgroundClick}><i className="fa fa-eyedropper" /> Alterar cor de fundo</DropDownMenuItem>
          <DropDownMenuItem onClick={::this.handleToggleHiddenClick}><i className={classnames("fa", (block.hidden ? 'fa-eye' : 'fa-eye-slash'))} /> {(block.hidden ? 'Mostrar' : 'Esconder')}</DropDownMenuItem>
          <DropDownMenuItem onClick={::this.handleRemoveClick}><i className="fa fa-trash" />&nbsp;&nbsp;Remover</DropDownMenuItem>
          <DropDownMenuItem disabled={!canMoveUp} onClick={::this.handleMoveUpClick}><i className="fa fa-chevron-up" /> Mover para cima</DropDownMenuItem>
          <DropDownMenuItem disabled={!canMoveDown} onClick={::this.handleMoveDownClick}><i className="fa fa-chevron-down" /> Mover para baixo</DropDownMenuItem>
        </DropDownMenu>
        { this.renderColorPicker() }
        <div className="clearfix py4">
          { this.renderWidgets(filteredWidgets) }
        </div>
      </div>
    )
  }
}
