import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import { Widget, ColorPicker, DropDownMenu, DropDownMenuItem, Progress, Loading } from './'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'

export default class Block extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasMouseOver: false,
      editingBackground: false,
      editingWidget: false,
      bgClass: props.block.bg_class,
      bgImage: props.block.bg_image,
      uploadProgress: null,
      loading: false
    }
    const { dispatch } = this.props
    this.bindedBlockActions = bindActionCreators(BlockActions, dispatch)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loading) {
      this.setState({loading: false})
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
          widget={widget} onEdit={::this.handleWidgetEdit} onCancelEdit={::this.handleWidgetCancelEdit} />
      )
    }.bind(this))
  }

  renderColorPicker(){
    if(this.state.editingBackground) {
      return(
        <div>
          <div className="absolute full-width top-0 left-0 bg-darken-4" style={{zIndex: 9999}}>
            <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
            {this.renderBgImage()}
            <div className="col col-2 p1" style={{overflow: 'hidden'}}>
              {this.renderUploader()}
              {this.renderProgress()}
            </div>
          </div>
          <div className="absolute right-0 mt2 mr2 nowrap" style={{top: '3em', zIndex: 9999}}>
            <button className="button button-transparent bg-darken-4 white rounded mr1" disabled={!!this.state.uploadProgress} onClick={::this.handleSaveEdit}><i className="fa fa-cloud-upload mr1" />Salvar</button>
            <button className="button button-transparent bg-darken-4 white rounded" disabled={!!this.state.uploadProgress} onClick={::this.handleCancelEdit}><i className="fa fa-undo mr1" />Cancelar</button>
          </div>
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={::this.handleCancelEdit}
            style={{zIndex: 9998}} />
        </div>
      )
    }
  }

  handleUploadProgress(percent) {
    this.setState({uploadProgress: percent})
  }

  handleUploadError() {
    this.setState({uploadProgress: null})
  }

  handleUploadFinish(image) {
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.setState({bgImage: imageUrl, uploadProgress: null})
  }

  renderUploader() {
    if (!this.state.uploadProgress) {
      return (
        <ReactS3Uploader
          signingUrl={`${process.env.BASE_URL}/uploads`}
          accept="image/*"
          onProgress={::this.handleUploadProgress}
          onError={::this.handleUploadError}
          onFinish={::this.handleUploadFinish}/>
      )
    }
  }

  renderProgress() {
    if (this.state.uploadProgress) {
      return (
        <Progress className="bg-blue" percent={this.state.uploadProgress} />
      )
    }
  }

  renderHiddenTag() {
    if (this.props.block.hidden) {
      return (
        <div className="absolute bottom-0 right-0 mr2 mb2 bg-darken-2 py1 px2 white">
          <i className="fa fa-eye-slash mr1" />
          Escondido
        </div>
      )
    }
  }

  renderBgImage() {
    if (this.state.bgImage) {
      return (
        <div>
          <div className="col col-1 p1">
            <img src={this.state.bgImage} style={{maxHeight: '36px'}} />
          </div>
          <div className="col col-1 p1">
            <button className="button button-transparent bg-darken-4 white rounded" onClick={::this.handleClearBgImage}><i className="fa fa-trash" /></button>
          </div>
        </div>
      )
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <Loading />
      )
    }
  }

  handleClearBgImage() {
    if (confirm('Deseja remover a imagem de fundo?')) {
      this.setState({bgImage: null})
    }
  }

  handleKeyUp(event){
    if (event.keyCode == 27) {
      this.setState({editingBackground: false})
    }
  }

  handleCancelEdit(){
    this.setState({
      editingBackground: false,
      bgClass: this.props.block.bg_class,
      bgImage: this.props.block.bg_image
    })
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleSaveEdit() {
    this.setState({editingBackground: false, loading: true})
    this.bindedBlockActions.editBlock({
      mobilization_id: this.props.mobilization.id,
      block_id: this.props.block.id,
      block: {
        bg_class: this.state.bgClass,
        bg_image: this.state.bgImage
      }
    })
  }

  handleEditBackgroundClick() {
    this.setState({editingBackground: true})
  }

  handleWidgetEdit() {
    this.setState({editingWidget: true})
  }

  handleWidgetCancelEdit() {
    this.setState({editingWidget: false})
  }

  handleMoveUpClick() {
    this.setState({loading: true})
    this.bindedBlockActions.moveBlockUp({
      mobilization_id: this.props.mobilization.id,
      block: this.props.block,
      blocks: this.props.blocks
    })
  }

  handleMoveDownClick() {
    this.setState({loading: true})
    this.bindedBlockActions.moveBlockDown({
      mobilization_id: this.props.mobilization.id,
      block: this.props.block,
      blocks: this.props.blocks
    })
  }

  handleToggleHiddenClick() {
    this.setState({loading: true})
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
      this.setState({loading: true})
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

  displayDropDownMenu() {
    return this.state.hasMouseOver && !this.state.editingBackground && !this.state.editingWidget && !this.state.loading
  }

  render(){
    const { widgets, block, blocks, canMoveUp, canMoveDown } = this.props
    const filteredWidgets = this.filterWidgets(widgets, block)
    return(
      <div
        className={classnames("clearfix", "relative", block.bg_class, (block.bg_image ? 'bg-cover' : null))}
        onKeyUp={::this.handleKeyUp}
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}
        style={(block.bg_image ? {backgroundImage: `url(${block.bg_image})`} : null)}>
        <DropDownMenu className={(this.displayDropDownMenu() ? "" : "display-none")} icon="cog">
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
        { this.renderHiddenTag() }
        { this.renderLoading() }
      </div>
    )
  }
}
