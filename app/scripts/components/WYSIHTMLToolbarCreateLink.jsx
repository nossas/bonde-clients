import React from 'react'
import $ from 'jquery'

export default class WYSIHTMLToolbarCreateLink extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { newTab: "_self" }
  }

  handleChange(e) {
    this.setState({ newTab: e.target.checked ? "_blank" : "_self" })
  }

  handleClick(e) {
    console.log(e.target)
    if(this.state.newTab == "_blank") { return }
    e.preventDefault()

    const targetId = e.target.href.match(/#.+/)[0]
    const target = $(targetId)
    const scrollable = $('#blocks-list')
    const yPosition = target.position().top + scrollable.scrollTop() - scrollable.position().top

    scrollable.animate({scrollTop: yPosition}, 500, () => {
      window.location.hash = targetId
    })
  }

  render(){
    return(
      <div data-wysihtml5-dialog="createLink" style={{display: "none"}} className="white p2 bg-darken-3">
        <input type="text" data-wysihtml5-dialog-field="href" defaultValue="http://" className="field-light mr1" />
        <a data-wysihtml5-dialog-action="save" className="button button-outline">Inserir</a>
        <input type="hidden" name="click" data-wysihtml5-dialog-field="onClick" value={ ::this.handleClick } />
        <span className="ml2">
          <input type="checkbox"
            name="newTab"
            onChange={ this.handleChange.bind(this) }
            value={this.state.newTab}
            data-wysihtml5-dialog-field="target"
          />
          <label htmlFor="newTab">Abrir link em nova aba</label>
        </span>
      </div>
    )
  }
}
