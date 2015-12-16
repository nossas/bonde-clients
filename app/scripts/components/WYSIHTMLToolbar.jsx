import React from 'react'

import {
  WYSIHTMLToolbarInsertImage,
  WYSIHTMLToolbarInsertHTML,
  WYSIHTMLToolbarCreateLink,
  DropDownMenu,
  DropDownMenuItem
} from './'

export default class WYSIHTMLToolbar extends React.Component {
  render() {
    const { elementId, className, style, buttonClassName } = this.props
    return (
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
        <DropDownMenu
          icon="text-height"
          wrapperClassName="inline"
          buttonClassName="button-transparent white p2"
          menuClassName="bg-darken-4 left-0">
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h6 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h6">
              Super pequeno
            </a>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h5 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h5">
              Bem pequeno
            </a>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h4 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h4">
              Médio
            </a>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h3 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h3">
              Grande
            </a>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h2 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h2">
              Bem grande
            </a>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <a
              className="block button button-transparent white h1 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h1">
              Super grande
            </a>
          </DropDownMenuItem>
        </DropDownMenu>
        <a
          data-wysihtml5-command="createLink"
          className={buttonClassName}>
          <i className="fa fa-link" />
        </a>
        <a
          data-wysihtml5-command="removeLink"
          className={buttonClassName}>
          <i className="fa fa-unlink" />
        </a>
        <a
          data-wysihtml5-command="insertImage"
          className={buttonClassName}>
          <i className="fa fa-image" />
        </a>
        <a
          data-wysihtml5-command="insertHTMLForm"
          className={buttonClassName}>
          <i className="fa fa-code" />
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
        <WYSIHTMLToolbarCreateLink />
        <WYSIHTMLToolbarInsertHTML />
      </div>
    )
  }
}
