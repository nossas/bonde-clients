import React, { Component, PropTypes } from 'react'

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor'
import Toolbar, { plugins, customStyleFn, getBlockAlignment } from './Toolbar'
/*import styles from './styles.css'*/

const styles = {
  editor: {
    position: "relative",
    zIndex: 9999,
  },
  toolbar: {
    display: "block",
    width: "100%",
  },
  outside: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9998,
  }
}


const text = `#TIL: This editor can have all sorts of #hashtags. Pretty #cool :)
Try it yourself by starting a word with a # (hash character) …
`

class RebooEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editorState: createEditorStateWithText(text),
      hasFocus: false
    }
  }

  focusEditor() {
    this.setState({
      hasFocus: true,
    }, () => setTimeout(() => this.refs.editor.focus()))
  }

  outsideClick() {
    this.setState({ hasFocus: false })
  }

  onChangeEditorState(editorState) {
    this.setState({ editorState })
  }

  blockStyleFn(block) {
    // TODO: Move to control and receive like plugin
    let alignment = getBlockAlignment(block)
    if (!block.getText()) {
      let previousBlock = this.state.editorState.getCurrentContent().getBlockBefore(block.getKey())
      if (previousBlock) {
        alignment = getBlockAlignment(previousBlock)
      }
    }
    return `alignment--${alignment}`
  }

  render() {

    const { readOnly } = this.props

    const toolbarStyle = {
      ...styles.toolbar,
      display: this.state.hasFocus ? 'block' : 'none'
    }

    return (
      <div>
        {!readOnly ? (
          <div style={toolbarStyle}>
            <Toolbar
              buttonClassName="button button-transparent white p2"
              popoverClassName="absolute white p2 bg-darken-3"
              editorState={this.state.editorState}
              setEditorState={this.onChangeEditorState.bind(this)}
            />
            <div style={styles.outside} onClick={this.outsideClick.bind(this)} />
          </div>
        ) : null}
        <div style={styles.editor} onClick={this.focusEditor.bind(this)}>
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChangeEditorState.bind(this)}
            customStyleFn={customStyleFn}
            blockStyleFn={this.blockStyleFn.bind(this)}
            plugins={plugins}
            readOnly={readOnly}
          />
        </div>
      </div>
    )
  }
}


RebooEditor.propTypes = {
  readOnly: PropTypes.bool.isRequired,
}

RebooEditor.defaultProps = {
  readOnly: false
}

export default RebooEditor
