import React from 'react'

export default class WYSIHTMLToolbar extends React.Component {
  render(){
    const { elementId, className, style, buttonClassName } = this.props
    return(
      <div id={elementId} className={className} style={style}>
        <a
          data-wysihtml5-command="bold"
          className={buttonClassName}>
          <i className="fa fa-bold" />
        </a>
        <a
          data-wysihtml5-command="italic"
          className={buttonClassName}>
          <i className="fa fa-italic" />
        </a>
        <a
          data-wysihtml5-command="createLink"
          className={buttonClassName}>
          <i className="fa fa-link" />
        </a>
        <div data-wysihtml5-dialog="createLink" style={{display: "none"}} className="inline-block ml1 mr1">
          <input type="text" data-wysihtml5-dialog-field="href" defaultValue="http://" className="field-light rounded-left" />
          <a data-wysihtml5-dialog-action="save" className="button rounded-right">Inserir</a>
        </div>
        <a
          data-wysihtml5-command="removeLink"
          className={buttonClassName}>
          <i className="fa fa-link" style={{textDecoration: "line-through"}} />
        </a>
        <a
          data-wysihtml5-command="insertImage"
          className={buttonClassName}>
          <i className="fa fa-image" />
        </a>
        <a
          data-wysihtml5-command="formatBlock"
          data-wysihtml5-command-value="h1"
          className={buttonClassName}>
          H1
        </a>
        <a
          data-wysihtml5-command="formatBlock"
          data-wysihtml5-command-value="h2"
          className={buttonClassName}>
          H2
        </a>
        <a
          data-wysihtml5-command="formatBlock"
          data-wysihtml5-command-blank-value="true"
          className={buttonClassName}>
          Normal
        </a>
        <a
          data-wysihtml5-command="insertUnorderedList"
          className={buttonClassName}>
          <i className="fa fa-list-ul" />
        </a>
        <a
          data-wysihtml5-command="insertOrderedList"
          className={buttonClassName}>
          <i className="fa fa-list-ol" />
        </a>
        <a
          data-wysihtml5-command="alignLeftStyle"
          className={buttonClassName}>
          <i className="fa fa-align-left" />
        </a>
        <a
          data-wysihtml5-command="alignCenterStyle"
          className={buttonClassName}>
          <i className="fa fa-align-center" />
        </a>
        <a
          data-wysihtml5-command="alignRightStyle"
          className={buttonClassName}>
          <i className="fa fa-align-right regular" />
        </a>

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
      </div>
    )
  }
}
