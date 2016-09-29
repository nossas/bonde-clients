import React, { Component, PropTypes } from 'react'
import { Entity, AtomicBlockUtils } from 'draft-js'
import Media from './Media'


export class MediaControls extends Component {

  handleInsertMedia(mediaType) {
    const { editorState, setEditorState } = this.props
    const src = "https://s-media-cache-ak0.pinimg.com/originals/93/ad/dd/93adddb93a157f48b7df3bd0b1d95253.jpg"

    const entityKey = Entity.create(mediaType, 'IMMUTABLE', { src })
    const editorStateWithMedia = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    setEditorState(editorStateWithMedia)
  }

  render() {

    const { buttonClassName } = this.props

    return (
      <div className="mediaControls">
        <button className={buttonClassName} onClick={() => this.handleInsertMedia('image')}>
          <i className="fa fa-image" />
        </button>
      </div>
    )
  }
}

MediaControls.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  buttonClassName: PropTypes.string
}


const createMediaPlugins = (config = {}) => {
  return {
    blockRendererFn: (block) => {
      if (block.getType() === 'atomic') {
        return {
          component: Media,
          editable: false
        }
      }
    }
  }
}

export default createMediaPlugins
