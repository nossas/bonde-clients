import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import {
  WYSIHTMLToolbarInsertImage,
  WYSIHTMLToolbarInsertHTML,
  WYSIHTMLToolbarCreateLink,
  WYSIHTMLToolbarColorPicker,
  DropDownMenu,
  DropDownMenuItem
} from './'
import * as WidgetActions from '../Widget/actions'

export class WYSIHTMLToolbar extends Component {
  componentDidMount() {
    const { googleFonts, fetchGoogleFonts } = this.props
    if (!googleFonts.items.length) fetchGoogleFonts()
  }

  render() {
    const { elementId, className, style, buttonClassName, googleFonts } = this.props
    return (
      <div id={elementId} className={classnames('wysihtml-toolbar', className)} style={style}>
        {!googleFonts.items.length ? null : (
          <div className="google-fonts inline">
            <select className="ml1 field-light h4 px1" style={{ height: '30px' }}>
              {googleFonts.items.map(({ family }) => (
                <option key={family} value={family}>{family}</option>
              ))}
            </select>
          </div>
        )}
        <a className={buttonClassName} data-wysihtml5-command="createLink">
          <i className="fa fa-link" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="removeLink">
          <i className="fa fa-unlink" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="insertImage">
          <i className="fa fa-image" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="insertHTMLForm">
          <i className="fa fa-code" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="insertUnorderedList">
          <i className="fa fa-list-ul" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="insertOrderedList">
          <i className="fa fa-list-ol" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="alignLeftStyle">
          <i className="fa fa-align-left" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="alignCenterStyle">
          <i className="fa fa-align-center" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="alignRightStyle">
          <i className="fa fa-align-right regular" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="undo">
          <i className="fa fa-undo regular" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="redo">
          <i className="fa fa-repeat regular" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="bold">
          <i className="fa fa-bold" />
        </a>
        <a className={buttonClassName} data-wysihtml5-command="italic">
          <i className="fa fa-italic" />
        </a>
        <DropDownMenu
          icon="text-height"
          wrapperClassName="inline"
          buttonClassName="button-transparent white p2"
          menuClassName="bg-darken-4 left-0">
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h6 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h6">
              8
            </span>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h5 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h5">
              16
            </span>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h4 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h4">
              24
            </span>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h3 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h3">
              48
            </span>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h2 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h2">
              72
            </span>
          </DropDownMenuItem>
          <DropDownMenuItem>
            <span
              className="block button button-transparent white h1 p2"
              data-wysihtml5-command="fontSize"
              data-wysihtml5-command-value="h1">
              80
            </span>
          </DropDownMenuItem>
        </DropDownMenu>
        <a
          data-wysihtml5-command="foreColorStyle"
          className={buttonClassName}>
          <i className="fa fa-eyedropper" />
        </a>
        <WYSIHTMLToolbarInsertImage />
        <WYSIHTMLToolbarCreateLink />
        <WYSIHTMLToolbarInsertHTML />
        <WYSIHTMLToolbarColorPicker />
      </div>
    )
  }
}

WYSIHTMLToolbar.propTypes = {
  elementId: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  buttonClassName: PropTypes.string,
  googleFonts: PropTypes.object.isRequired,
  // Actions
  fetchGoogleFonts: PropTypes.func.isRequired
}

WYSIHTMLToolbar.defaultProps = {
  googleFonts: { items: [] }
}

const mapStateToProps = state => ({
  googleFonts: state.widgets.googleFonts
})

export default connect(mapStateToProps, WidgetActions)(WYSIHTMLToolbar)