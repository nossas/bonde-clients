import React from 'react'

export default class WYSIHTMLToolbarInsertImage extends React.Component {
  render(){
    return(
      <div data-wysihtml5-dialog="insertImage" style={{display: "none"}}>
        <label>
          Image:
          <input data-wysihtml5-dialog-field="src" defaultValue="http://" />
        </label>
        <label>
          Align:
          <select data-wysihtml5-dialog-field="className">
            <option value="">default</option>
            <option value="wysiwyg-float-left">left</option>
            <option value="wysiwyg-float-right">right</option>
          </select>
        </label>
        <a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>
      </div>
    )
  }
}
