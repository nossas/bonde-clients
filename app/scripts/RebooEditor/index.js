import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { Editor, EditorState, ContentState, convertFromHTML, convertToRaw, convertFromRaw } from 'draft-js'

import Toolbar, { toolbarEditorProps, decorator, getBlockAlignment } from './Toolbar'

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

class RebooEditor extends Component {

  constructor(props) {
    super(props)

    let editorState = EditorState.createEmpty(decorator)
    if (this.props.value) {
      let contentState
      if (typeof this.props.value === 'string') {
        // initialValue is a string with syntax HTML, we need transform in contentState
        contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.value))
      } else if (typeof this.props.value === "object") {
        contentState = convertFromRaw(this.props.value)
      } else {
        throw new Error('Value invalid')
      }

      editorState = EditorState.createWithContent(contentState, decorator)
    }

    this.state = { editorState, hasFocus: false }
  }

  focusEditor() {
    this.setState({
      hasFocus: true,
    }, () => setTimeout(() => ReactDOM.findDOMNode(this.editor).focus()))
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

  handleSaveButton() {
    this.props.handleSave(convertToRaw(this.state.editorState.getCurrentContent()))
    this.setState({ hasFocus: false })
  }

  render() {

    const { readOnly, theme } = this.props

    const toolbarStyle = {
      ...styles.toolbar,
      display: this.state.hasFocus ? 'block' : 'none'
    }

    return (
      <div>
        {!readOnly ? (
          <div style={toolbarStyle}>
            <Toolbar
              theme={theme}
              buttonClassName="button button-transparent white p2"
              popoverClassName="absolute white p2 bg-darken-3"
              editorState={this.state.editorState}
              setEditorState={this.onChangeEditorState.bind(this)}
            />
            <div style={styles.outside} onClick={this.outsideClick.bind(this)} />
          </div>
        ) : null}
        <div style={styles.editor}>
          <div onClick={this.focusEditor.bind(this)}>
            <Editor
              ref={input => this.editor = input}
              readOnly={readOnly}
              editorState={this.state.editorState}
              onChange={this.onChangeEditorState.bind(this)}
              blockStyleFn={this.blockStyleFn.bind(this)}
              {...toolbarEditorProps}
            />
          </div>
          {!readOnly ? (
            <div className="right mt1" style={{ display: this.state.hasFocus ? 'block' : 'none' }}>
              <button className="button button-transparent caps bg-darken-4 white rounded" onClick={this.handleSaveButton.bind(this)}>Salvar</button>
            </div>
          ) : null}
        </div>

      </div>
    )
  }
}


RebooEditor.propTypes = {
  handleSave: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  value: PropTypes.any,
  theme: PropTypes.string
}

RebooEditor.defaultProps = {
  readOnly: false
}

export default RebooEditor
