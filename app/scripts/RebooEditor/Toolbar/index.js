import React, { Component, PropTypes } from 'react'
import { RichUtils } from 'draft-js'

import createColorPlugin, { ColorControls } from './ColorControls'
import createFontPlugin, { FontControls } from './FontControls'
import { HistoryControls } from './HistoryControls'
/*import styles from './styles.css'*/


class Toolbar extends Component {

  toggleInlineStyle(style) {
    const { editorState, setEditorState } = this.props
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  render() {

    const { editorState, setEditorState, buttonClassName } = this.props
    const controlsProps = { editorState, setEditorState }

    return (
      <div className="absolute full-width top-0 left-0 bg-darken-4 flex flex-wrap" style={{ zIndex: 10000 }}>
        {/* InlineStyle buttons */}
        <button type="button" className={buttonClassName} onClick={() => this.toggleInlineStyle('BOLD')}>
          <i className="fa fa-bold" />
        </button>
        <button type="button" className={buttonClassName} onClick={() => this.toggleInlineStyle('ITALIC')}>
          <i className="fa fa-italic" />
        </button>
        <button type="button" className={buttonClassName} onClick={() => this.toggleInlineStyle('UNDERLINE')}>
          <i className="fa fa-underline" />
        </button>
        <ColorControls buttonClassName={buttonClassName} {...controlsProps} />
        <FontControls initialValue={{ fontSize: 15, fontFamily: '' }} {...controlsProps} />
        <HistoryControls buttonClassName={buttonClassName} {...controlsProps} />
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}

const plugins = [
  createColorPlugin(),
  createFontPlugin()
]

export const customStyleFn = (style) => {
  let output = {}
  plugins.map(plugin => {
    if (typeof plugin.customStyleFn === "function") {
      const customStyle = plugin.customStyleFn(style)
      output = {...output, ...customStyle}
    }
  })
  return output
}

export default Toolbar
