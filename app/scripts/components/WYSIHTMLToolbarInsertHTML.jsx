import React from 'react'

export default class WYSIHTMLToolbarInsertHTML extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { insertHTMLContent: null }
  }

  handleInsertHTMLChange(e) {
    this.setState({ insertHTMLContent: e.target.value })
  }

  handleInsertHTMLClick() {
    // When the insert button is pressed, the insertHTML dialog is not being closed. So we are forcing it
    // by simulating a click in the cancel button
    React.findDOMNode(this.refs.cancelButton).click()
  }

  render(){
    return(
      <div data-wysihtml5-dialog="insertHTMLForm" style={{display: "none"}} className="white p2 bg-darken-3">
        <label>
          Incorporar
          <input
            type="text"
            className="field-light mr2 ml1"
            value={this.state.insertHTMLContent}
            onChange={::this.handleInsertHTMLChange} />
        </label>
        <a
          data-wysihtml5-command="insertHTML"
          data-wysihtml5-command-value={this.state.insertHTMLContent}
          onClick={::this.handleInsertHTMLClick}
          className="button button-outline mr1">
          Inserir
        </a>
        <a
          ref="cancelButton"
          data-wysihtml5-dialog-action="cancel"
          className="button button-transparent">
          Cancelar
        </a>
      </div>
    )
  }
}
