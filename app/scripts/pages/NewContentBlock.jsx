import React from 'react'
import ReactS3Uploader from 'react-s3-uploader'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'
import { BlockMiniature, ColorPicker, Progress } from './../components'
import { BLOCK_LAYOUTS } from '../constants/BlockLayouts'

export default class NewContentBlock extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedLayout: BLOCK_LAYOUTS[0],
      bgClass: 'bg-1',
      bgImage: null,
      uploadProgress: null
    }
  }

  handleMiniatureClick(layout) {
    this.setState({selectedLayout: layout})
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleAddBlockClick() {
    const { dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.addBlock({
      router: this.context.router,
      mobilization_id: this.props.mobilization.id,
      block: {
        bg_class: this.state.bgClass,
        bg_image: this.state.bgImage,
        widgets_attributes: this.state.selectedLayout.map((column) => {
          return { kind: 'content', ...column }
        })
      }
    })
  }

  handleCancelClick() {
    this.context.router.goBack()
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

  handleClearBgImage() {
    if (confirm('Deseja remover a imagem de fundo?')) {
      this.setState({bgImage: null})
    }
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

  renderBgImage() {
    if (this.state.bgImage) {
      return (
        <div>
          <div className="col col-1 p1">
            <img src={this.state.bgImage} />
          </div>
          <div className="col col-1 p1">
            <button className="button button-transparent bg-darken-4 white rounded" onClick={::this.handleClearBgImage}><i className="fa fa-trash" /></button>
          </div>
        </div>
      )
    }
  }

  render(){
    return (
      <div className={classnames("flex-auto", "bg-silver", "gray", this.props.mobilization.color_scheme)}>
        <h2 className="bg-white mt0 py3 px4">Adicione um bloco de conteúdo</h2>
        <div className="py3 px4">
          <p
            className="mb3">
            Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento
          </p>
          <label className="bold mb1 block">Tipo de bloco</label>
          <div className="mxn1">
            {BLOCK_LAYOUTS.map((layout, index) => {
              return(
                <BlockMiniature
                  key={index}
                  layout={layout}
                  selectedLayout={this.state.selectedLayout}
                  onClick={::this.handleMiniatureClick}
                />
              )
            })}
          </div>
          <div className="clearfix mb3">
            <label className="bold mb1 block">Cor de fundo</label>
            <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
            {this.renderBgImage()}
            <div className="col col-2 p1" style={{overflow: 'hidden'}}>
              {this.renderUploader()}
              {this.renderProgress()}
            </div>
          </div>
          <div className="clearfix">
            <button
              className="button bg-darken-3 rounded white button-transparent mr1"
              disabled={!!this.state.uploadProgress}
              onClick={::this.handleCancelClick}>
              Cancelar
            </button>
            <button
              className="button bg-aqua"
              disabled={!!this.state.uploadProgress}
              onClick={::this.handleAddBlockClick}>
              <i className="fa fa-cloud-upload mr1" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    )
  }
}

NewContentBlock.contextTypes = {
  router: React.PropTypes.object.isRequired
}
