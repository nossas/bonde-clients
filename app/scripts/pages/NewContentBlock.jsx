import React from 'react'
import classnames from 'classnames'

export default class NewContentBlock extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { selectedBlock: 'first' }
  }

  handleFirstBlockClick(e) {
    this.setState({selectedBlock: 'first'})
  }

  handleSecondBlockClick(e) {
    this.setState({selectedBlock: 'second'})
  }

  handleThirdBlockClick(e) {
    this.setState({selectedBlock: 'third'})
  }

  handleFourthBlockClick(e) {
    this.setState({selectedBlock: 'fourth'})
  }

  render(){
    return (
      <div className="flex-auto p2 center">
        <h2>Adicione um bloco de conteúdo</h2>
        <p>Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento</p>
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
        <div className="col col-12 px3">
          <button className="col col-12 button bg-blue">Adicionar</button>
        </div>
      </div>
    )
  }
}
