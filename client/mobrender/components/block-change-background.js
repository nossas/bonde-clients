import React, { PropTypes } from 'react'
import { BasicColorPicker } from '~components/basic-color-picker'
import FileUploader from './file-uploader'


const BlockChangeBackground = ({ block, onChangeBackground, progress, onProgress, onCancelEdit, update }) => (
  <div className='absolute col-12 top-0 z5 bg-darken-4'>
    <BasicColorPicker
      colors={['bg-1', 'bg-2', 'bg-3', 'bg-4']}
      selected={block.bg_class}
      onSelectColor={color => {
        onChangeBackground({...block, bg_class: color})
      }}
    />
    <FileUploader
      file={block.bg_image}
      progress={progress}
      onProgress={onProgress}
      onRemove={() => onChangeBackground({...block, bg_image: undefined})}
      onFinish={file => {
        onProgress(undefined)
        onChangeBackground({...block, bg_image: file})  
      }}
    />
    <div className='absolute right-0 mt2 mr2 nowrap z5'>
      <button
        className='btn caps bg-darken-4 white rounded mr1 save-btn'
        disabled={progress !== undefined}
        onClick={() => update(block)}
      >
        Salvar
      </button>
      <button
        className='btn caps bg-darken-4 white rounded cancel-btn'
        onClick={() => onCancelEdit(block)}
      >
        Cancelar
      </button>
    </div>
    <div
      className='fixed top-0 right-0 bottom-0 left-0 z4'
      onClick={() => onCancelEdit(block)}
    />
  </div>
)

BlockChangeBackground.propTypes = {
  block: PropTypes.object.isRequired,
  // Injected by redux
  update: PropTypes.func.isRequired,
  onChangeBackground: PropTypes.func,
  onCancelEdit: PropTypes.func,
  progress: PropTypes.number,
  onProgress: PropTypes.func,
}

export default BlockChangeBackground
