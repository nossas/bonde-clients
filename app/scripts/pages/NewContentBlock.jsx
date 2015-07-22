import React from 'react'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'
import ColorPicker from "./../components/ColorPicker.jsx"
import BlockMiniature from "./../components/BlockMiniature.jsx"

export default class NewContentBlock extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedSizes: [12],
      bgClass: 'bg-white'
    }
  }

  handleMiniatureClick(event) {
    this.setState({selectedSizes: event.currentTarget.getAttribute('data-sizes').split(',').map(Number)})
  }

  handleColorClick(event) {
    this.setState({bgClass: event.currentTarget.getAttribute('data-bg-class')})
  }

  handleAddBlockClick() {
    const { dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.addBlock({
      mobilization_id: this.props.mobilization.id,
      bg_class: this.state.bgClass,
      widgets: this.state.selectedSizes.map((size) => {
        return { kind: 'content', size }
      })
    })
  }

  render(){
    return (
      <div className="flex-auto p2 center">
        <h2>Adicione um bloco de conteúdo</h2>
        <p className="mb3">Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento</p>
        <BlockMiniature sizes={[12]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[6, 6]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[4, 8]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <BlockMiniature sizes={[4, 4, 4]} selectedSizes={this.state.selectedSizes} onClick={::this.handleMiniatureClick} />
        <div className="clearfix px3 mb3">
          <h3>Cor de fundo</h3>
          <ColorPicker {...this.props} selectedClass={this.state.bgClass} onClick={::this.handleColorClick} />
        </div>
        <div className="col col-12 px3">
          <button className="col col-12 button bg-blue" onClick={::this.handleAddBlockClick}>Adicionar</button>
        </div>
      </div>
    )
  }
}
