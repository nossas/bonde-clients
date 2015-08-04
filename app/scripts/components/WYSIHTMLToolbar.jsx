import React from 'react'
import WYSIHTMLToolbarInsertImage from './../components/WYSIHTMLToolbarInsertImage.jsx'

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
        <a
          data-wysihtml5-command="undo"
          className={buttonClassName}>
          <i className="fa fa-undo regular" />
        </a>
        <a
          data-wysihtml5-command="redo"
          className={buttonClassName}>
          <i className="fa fa-repeat regular" />
        </a>
        <WYSIHTMLToolbarInsertImage />
        <div data-wysihtml5-dialog="createLink" style={{display: "none"}} className="white p2 bg-darken-3">
          <input type="text" data-wysihtml5-dialog-field="href" defaultValue="http://" className="field-light mr1" />
          <a data-wysihtml5-dialog-action="save" className="button button-outline">Inserir</a>
        </div>
      </div>
    )
  }
}
