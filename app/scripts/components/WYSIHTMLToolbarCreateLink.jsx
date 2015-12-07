import React from 'react'

export default class WYSIHTMLToolbarCreateLink extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { newTab: "_self" }
  }

  handleChange(e) {
    this.setState({ newTab: e.target.checked ? "_blank" : "_self" })
  }

  render(){
    return(
      <div data-wysihtml5-dialog="createLink" style={{display: "none"}} className="white p2 bg-darken-3">
        <span className="mr2">
          <input type="checkbox"
            name="newTab"
            onChange={ this.handleChange.bind(this) }
            value={this.state.newTab}
            data-wysihtml5-dialog-field="target"
          />
          <label htmlFor="newTab">Abrir link em nova aba</label>
        </span>
        <input type="text" data-wysihtml5-dialog-field="href" defaultValue="http://" className="field-light mr1" />
        <a data-wysihtml5-dialog-action="save" className="button button-outline">Inserir</a>
      </div>
    )
  }
}
