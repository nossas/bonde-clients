import React, { Component, PropTypes } from 'react'
import styleWholeSelectedBlocksModifier from './styleWholeSelectedBlocksModifier'


const alignments = ['left', 'center', 'right']


export class AlignmentControls extends Component {

  handleToggleAlign(alignment) {
    const { editorState, setEditorState } = this.props
    const editorStateWithAlignment = styleWholeSelectedBlocksModifier(
      editorState,
      alignment,
      alignments.filter(align => alignment !== align)
    )
    setEditorState(editorStateWithAlignment)
  }

  render() {
    const { buttonClassName } = this.props

    return (
      <div className="alignmentControls">
        <button
          className={buttonClassName}
          onClick={() => this.handleToggleAlign('left')}
        >
          <i className="fa fa-align-left" />
        </button>
        <button
          className={buttonClassName}
          onClick={() => this.handleToggleAlign('center')}
        >
          <i className="fa fa-align-center" />
        </button>
        <button
          className={buttonClassName}
          onClick={() => this.handleToggleAlign('right')}
        >
          <i className="fa fa-align-right" />
        </button>
      </div>
    )
  }
}


AlignmentControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}
