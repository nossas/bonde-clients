import React from 'react'

export default class WYSIHTMLToolbarColorPicker extends React.Component {
  render(){
    return(
      <div data-wysihtml5-dialog="foreColorStyle"
        style={{display: "none"}}
        className="white p2 bg-darken-3">
        Cor (ex.: #FFFFF): <input type="text" data-wysihtml5-dialog-field="color"
          defaultValue="#000000"
          className="field-light mr1" />
        <a data-wysihtml5-dialog-action="save" className="button button-outline">
          Inserir</a>&nbsp;<a data-wysihtml5-dialog-action="cancel" className="button button-transparent white">Cancelar</a>
      </div>
    )
  }
}
