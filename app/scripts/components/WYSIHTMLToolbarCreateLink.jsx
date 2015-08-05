import React from 'react'

export default class WYSIHTMLToolbarCreateLink extends React.Component {
  render(){
    return(
      <div data-wysihtml5-dialog="createLink" style={{display: "none"}} className="white p2 bg-darken-3">
        <input type="text" data-wysihtml5-dialog-field="href" defaultValue="http://" className="field-light mr1" />
        <a data-wysihtml5-dialog-action="save" className="button button-outline">Inserir</a>
      </div>
    )
  }
}
