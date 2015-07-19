import React from 'react'
import { bindActionCreators } from 'redux'
import * as BlockActions from './../actions/BlockActions'
import classnames from 'classnames'
import ColorPicker from "./../components/ColorPicker.jsx"

export default class NewContentBlock extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedBlock: 'first',
      selectedClass: 'bg-white'
    }
  }

  handleFirstBlockClick() {
    this.setState({selectedBlock: 'first'})
  }

  handleSecondBlockClick() {
    this.setState({selectedBlock: 'second'})
  }

  handleThirdBlockClick() {
    this.setState({selectedBlock: 'third'})
  }

  handleFourthBlockClick() {
    this.setState({selectedBlock: 'fourth'})
  }

  handleColorClick(event) {
    this.setState({selectedClass: event.target.getAttribute('data-bg-class')})
  }

  handleAddBlockClick() {
    const { dispatch } = this.props
    const bindedBlockActions = bindActionCreators(BlockActions, dispatch)
    bindedBlockActions.addBlock({
      mobilization_id: this.props.mobilization.id,
      bg_class: this.state.selectedClass,
      widgets: this.mountWidgets()
    })
  }

  mountWidgets() {
    switch (this.state.selectedBlock) {
      case 'first':
        return [{ kind: 'content', size: 12 }]
      case 'second':
        return [
          { kind: 'content', size: 6 },
          { kind: 'content', size: 6 }
        ]
      case 'third':
        return [
          { kind: 'content', size: 4 },
          { kind: 'content', size: 8 }
        ]
      case 'fourth':
        return [
          { kind: 'content', size: 4 },
          { kind: 'content', size: 4 },
          { kind: 'content', size: 4 }
        ]
    }
  }

  render(){
    return (
      <div className="flex-auto p2 center">
        <h2>Adicione um bloco de conteúdo</h2>
        <p className="mb3">Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento</p>
        <div className="col col-6 px3 mb3">
          <div className={classnames("clearfix", "border", "p2", "button", "block", (this.state.selectedBlock == 'first' ? "bg-silver" : "bg-white"))} style={{lineHeight: '50%'}} onClick={::this.handleFirstBlockClick}>
            <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 bg-blue"><br/></div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className={classnames("clearfix", "border", "py2", "button", "block", (this.state.selectedBlock == 'second' ? "bg-silver" : "bg-white"))} style={{lineHeight: '50%'}} onClick={::this.handleSecondBlockClick}>
            <div className="clearfix col col-6 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-6 px2">
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className={classnames("clearfix", "border", "py2", "button", "block", (this.state.selectedBlock == 'third' ? "bg-silver" : "bg-white"))} style={{lineHeight: '50%'}} onClick={::this.handleThirdBlockClick}>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-8 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className={classnames("clearfix", "border", "py2", "button", "block", (this.state.selectedBlock == 'fourth' ? "bg-silver" : "bg-white"))} style={{lineHeight: '50%'}} onClick={::this.handleFourthBlockClick}>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="clearfix px3 mb3">
          <h3>Cor de fundo</h3>
          <ColorPicker {...this.props} selectedClass={this.state.selectedClass} onClick={::this.handleColorClick} />
        </div>
        <div className="col col-12 px3">
          <button className="col col-12 button bg-blue" onClick={::this.handleAddBlockClick}>Adicionar</button>
        </div>
      </div>
    )
  }
}
