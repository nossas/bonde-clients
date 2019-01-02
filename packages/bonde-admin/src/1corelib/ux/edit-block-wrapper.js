import React from 'react'


const getBackgroundStyle = block => {
  if (block.bg_image) return { background: `url('${block.bg_image}') no-repeat`, backgroundSize: 'cover' }
  else if (block.bg_class) {
    try {
      const rgba = JSON.parse(block.bg_class)
      return {
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    } catch (ex) {
      // Silent error because use className
      return {}
    }
  }
}


class EditBlockWrapper extends React.Component {

  render () {
    // Wrapper Props
    // - children must always render
    const { block, children, editable } = this.props

    return (
      <div
        onMouseEnter={() => {
          /*if (editable && !editing) onMouseOver(HOVER_MOUSE_KEY, block.id)*/
          if (editable) console.log(`[Block ${block.id}] onMouseEnter`)
        }}
        onMouseLeave={() => {
          /*if (editable && !editing) onMouseOut(HOVER_MOUSE_KEY)*/
          if (editable) console.log(`[Block ${block.id}] onMouseLeavr`)
        }}
        onKeyUp={evt => {
          // ESC keycode
          /*if (evt.keyCode === 27) {
            onCancelEdit(block)
          }*/
        }}
        className={block.bg_class && block.bg_class.indexOf('{') === -1 ? block.bg_class : undefined}
        style={{ ...getBackgroundStyle(block), cursor: 'pointer' }}
      >
        {children}
      </div>
    )
  }
}

export default EditBlockWrapper