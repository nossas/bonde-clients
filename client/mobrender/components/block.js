import React from 'react'


const Block = ({ block, onMouseOver, onMouseOut, onCancelEdit }) => (
  <div
    id={`block-${block.id}`}
    onMouseOver={() => onMouseOver('block', block.id)}
    onMouseOut={() => onMouseOut('block')}
    onKeyUp={evt => {
      // ESC keycode
      if (evt.keyCode === 27) {
        onCancelEdit(block)
      }
    }}
  />
)

Block.propTypes = {
  block: PropTypes.object.isRequired,
  // Injected by redux
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onCancelEdit: PropTypes.func
}

export default Block
