import React, { Component, PropTypes } from 'react'

import colorPlugin, { ColorControls } from './ColorControls'
import fontPlugin, { FontControls } from './FontControls'
/*import styles from './styles.css'*/


class Toolbar extends Component {

  render() {

    const { editorState, setEditorState } = this.props
    const controlsProps = { editorState, setEditorState }

    return (
      <div className="absolute full-width top-0 left-0 bg-darken-4 flex flex-wrap" style={{ zIndex: 10000 }}>
        <ColorControls buttonClassName="btn white p2" {...controlsProps} />
        <FontControls initialValue={{ fontSize: 15, fontFamily: '' }} {...controlsProps} />
      </div>
    )
  }
}

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired
}

const plugins = [colorPlugin(), fontPlugin()]

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
