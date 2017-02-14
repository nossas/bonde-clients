import React from 'react'
import Widget from './widget.connected'


const Block = ({ block, widgets, onMouseOver, onMouseOut, onCancelEdit }) => (
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
  >
    <div className='col-10 mx-auto'>
      <div className='clearfix' style={{ padding: '5em 0' }}>
        {widgets && widgets.map(widget => (
          <Widget widget={widget} />
        ))}
      </div>
      {block.hidden && (
        <div className='relative'>
          <div className='absolute bottom-0 left-0 ml1 mb1 bg-darken-2 p1 white rounded hidden-tag'>
            <i className='fa fa-eye-slash mr1' /> Escondido
          </div>
        </div>
      )}
    </div>
  </div>
)

Block.propTypes = {
  block: PropTypes.object.isRequired,
  widgets: PropTypes.array.isRequired,
  // Injected by redux
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onCancelEdit: PropTypes.func
}

export default Block
