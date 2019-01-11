import React from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw
} from 'draft-js'


class RebooEditor extends React.Component {
  constructor (props) {
    super(props)

    let contentState
    if (typeof this.props.value === 'string') {
      // initialValue is a string with syntax HTML, we need transform in contentState
      contentState = ContentState.createFromBlockArray(convertFromHTML(this.props.value))
    } else if (typeof this.props.value === 'object') {
      contentState = convertFromRaw(this.props.value)
    } else {
      throw new Error('Value invalid')
    }

    const editorState = EditorState.createWithContent(contentState, props.decorator)

    this.state = { editorState }
  }

  render () {
    return (
      <div className='reboo-editor'>
        <div className='editor'>
          <div>
            <Editor ref='editor' readOnly editorState={this.state.editorState} />
            <div style={{ 'clear': 'both' }} />
          </div>
        </div>

      </div>
    )
  }
}

RebooEditor.propTypes = {
  value: PropTypes.any,
  decorator: PropTypes.object.isRequired
}

export default RebooEditor
