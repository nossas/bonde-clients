import React, { Component, PropTypes } from 'react'
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromHTML,
  convertToRaw,
  convertFromRaw
} from 'draft-js'

import Toolbar, {
  toolbarEditorProps,
  decorator,
  getBlockAlignment
} from './Toolbar'

import './styles.scss'


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

  focus() {
    this.setState({
      hasFocus: true,
    }, () => setTimeout(() => this.refs.editor.focus()))
  }

  onChangeEditorState(editorState) {
    this.setState({ editorState })
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    )
    if (newState) {
      this.onChangeEditorState(newState);
      return 'handled'
    }
    return 'not-handled'
  }


  blockStyleFn(block) {
    // TODO: Move to control and receive like plugin
    const { editorState } = this.state

    let alignment = getBlockAlignment(block)
    if (!block.getText()) {
      let previousBlock = editorState.getCurrentContent().getBlockBefore(block.getKey())
      if (previousBlock) {
        alignment = getBlockAlignment(previousBlock)
      }
    }
    return `alignment--${alignment}`
  }

  save() {
    this.props.handleSave(convertToRaw(this.state.editorState.getCurrentContent()))
    this.setState({ hasFocus: false })
  }

  render() {
    const { readOnly, theme } = this.props

    return (
      <div className="reboo-editor">
        {!readOnly ? (
          <div
            className="toolbar-container"
            style={{ display: this.state.hasFocus ? 'block' : 'none' }}
          >
            <Toolbar
              theme={theme}
              buttonClassName="btn white p2"
              popoverClassName="absolute white p2 bg-darken-4 rounded-bottom"
              editorState={this.state.editorState}
              setEditorState={this.onChangeEditorState.bind(this)}
              focusEditor={this.focus.bind(this)}
            />
            <div className="outside" onClick={::this.save} />
          </div>
        ) : null}
        <div className="editor" style={{ outline: this.state.hasFocus ? '1px solid blue' : 'none' }}>
          <div onClick={this.focus.bind(this)}>
            <Editor
              ref="editor"
              readOnly={readOnly}
              editorState={this.state.editorState}
              onChange={this.onChangeEditorState.bind(this)}
              blockStyleFn={this.blockStyleFn.bind(this)}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
              {...toolbarEditorProps}
            />
          </div>
          {!readOnly ? (
            <div className="right mt1" style={{ display: this.state.hasFocus ? 'block' : 'none' }}>
              <button
                className="btn caps bg-darken-4 white rounded"
                onClick={::this.save}
              >
                Salvar
              </button>
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

export { default as createEditorContent } from './createEditorContent'
